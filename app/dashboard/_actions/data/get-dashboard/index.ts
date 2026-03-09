import { TransactionCategory, TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";

export const getDashboard = async (month: string, year?: string) => {
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;

  // Usar o ano fornecido ou o ano atual
  const selectedYear = year || new Date().getFullYear().toString();
  const monthNum = parseInt(month);

  // Calcular o primeiro e último dia do mês corretamente
  // monthNum é 1-12, então monthNum - 1 é o índice do mês (0-11)
  const startDate = new Date(parseInt(selectedYear), monthNum - 1, 1);
  // Para obter o último dia do mês, usamos o mês seguinte com dia 0
  const endDate = new Date(parseInt(selectedYear), monthNum, 0);

  const where = {
    userId,
    date: {
      gte: startDate,
      lte: endDate,
    },
  };

  const depositsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const investmentsTotal = Number(
    (
      await db.investments.aggregate({
        where: {
          userId,
          createAt: {
            gte: startDate,
            lte: endDate,
          },
          type: "DEPOSIT",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await db.transactions.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const Allinvestments = Number(
    (
      await db.investments.aggregate({
        where: {
          userId,
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transactions.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category as TransactionCategory,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const paymentPending = await db.transactions.findMany({
    where: {
      ...where,
      type: TransactionType.EXPENSE,
      done: false,
    },
    orderBy: { date: "asc" },
    take: 15,
  });

  const depositsPending = await db.transactions.findMany({
    where: {
      ...where,
      type: TransactionType.DEPOSIT,
      done: false,
    },
    orderBy: { date: "asc" },
    take: 15,
  });

  return {
    balance,
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    typesPercentage,
    totalExpensePerCategory,
    Allinvestments,
    paymentPending: JSON.parse(JSON.stringify(paymentPending)),
    depositsPending: JSON.parse(JSON.stringify(depositsPending)),
  };
};

export const getYearDashboard = async (year: string) => {
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;

  const yearlyData = [];

  // Gerar dados para cada mês do ano
  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, "0");
    const startDate = new Date(parseInt(year), month - 1, 1);
    const endDate = new Date(parseInt(year), month, 0);

    // Buscar depósitos do mês
    const depositsTotal = Number(
      (
        await db.transactions.aggregate({
          where: {
            userId,
            type: "DEPOSIT",
            date: {
              gte: startDate,
              lt: endDate,
            },
          },
          _sum: { amount: true },
        })
      )?._sum?.amount || 0,
    );

    // Buscar despesas do mês
    const expensesTotal = Number(
      (
        await db.transactions.aggregate({
          where: {
            userId,
            type: "EXPENSE",
            date: {
              gte: startDate,
              lt: endDate,
            },
          },
          _sum: { amount: true },
        })
      )?._sum?.amount || 0,
    );

    // Buscar investimentos do mês
    const investmentsTotal = Number(
      (
        await db.investments.aggregate({
          where: {
            userId,
            type: "DEPOSIT",
            createAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          _sum: { amount: true },
        })
      )?._sum?.amount || 0,
    );

    yearlyData.push({
      month: `${year}-${monthStr}`,
      deposits: depositsTotal,
      expenses: expensesTotal,
      investments: investmentsTotal,
    });
  }

  return { yearlyData };
};
