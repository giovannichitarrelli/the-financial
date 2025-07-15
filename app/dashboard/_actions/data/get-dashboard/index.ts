import {
  TransactionCategory,
  TransactionEssentialType,
  TransactionType,
} from "@prisma/client";
import {
  TotalDepositsPerMember,
  TotalExpensePerCategory,
  TotalExpensePerMember,
  TransactionEssentialPercentagePerType,
  TransactionPercentagePerType,
} from "./types";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";

export const getDashboard = async (month: string) => {
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;

  const where = {
    userId,
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
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
            gte: new Date(`2025-${month}-01`),
            lt: new Date(`2025-${month}-31`),
          },
          type: "DEPOSIT",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const essentialsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, essentialType: "ESSENTIAL" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const notEssentialsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, essentialType: "NOT_ESSENTIAL" },
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

  const transactionsTotalWithoutSalary = Number(
    (
      await db.transactions.aggregate({
        where: {
          ...where,
          essentialType: { in: ["ESSENTIAL", "NOT_ESSENTIAL"] },
        },

        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const essentialTypesPercentage: TransactionEssentialPercentagePerType = {
    [TransactionEssentialType.ESSENTIAL]: Math.round(
      (Number(essentialsTotal || 0) / Number(transactionsTotalWithoutSalary)) *
        100,
    ),
    [TransactionEssentialType.NOT_ESSENTIAL]: Math.round(
      (Number(notEssentialsTotal || 0) /
        Number(transactionsTotalWithoutSalary)) *
        100,
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

  const members = await db.member.findMany({
    where: { userId },
    select: { id: true, name: true },
  });

  const totalExpensePerMember = (
    await db.transactions.groupBy({
      by: ["memberId"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((member) => ({
    memberId: member.memberId,
    totalAmount: Number(member._sum.amount),
    percentageOfTotal: Math.round(
      (Number(member._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const totalExpensePerMemberWithNames: TotalExpensePerMember[] =
    totalExpensePerMember
      .filter((expense) => expense.memberId !== null)
      .map((expense) => {
        const member = members.find((m) => m.id === expense.memberId);
        return {
          memberId: expense.memberId!,
          memberName: member?.name || "Member not found",
          totalAmount: expense.totalAmount,
          percentageOfTotal: expense.percentageOfTotal,
        };
      });

  const totalDepositsPerMember = (
    await db.transactions.groupBy({
      by: ["memberId"],
      where: {
        ...where,
        type: TransactionType.DEPOSIT,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((member) => ({
    memberId: member.memberId,
    totalAmount: Number(member._sum.amount),
    percentageOfTotal: Math.round(
      (Number(member._sum.amount) / Number(depositsTotal)) * 100,
    ),
  }));

  const totalDepositsPerMemberWithNames: TotalDepositsPerMember[] =
    totalDepositsPerMember
      .filter((deposit) => deposit.memberId !== null)
      .map((deposit) => {
        const member = members.find((m) => m.id === deposit.memberId);
        return {
          memberId: deposit.memberId!,
          memberName: member?.name || "Member not found",
          totalAmount: deposit.totalAmount,
          percentageOfTotal: deposit.percentageOfTotal,
        };
      });

  return {
    balance,
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    typesPercentage,
    totalExpensePerCategory,
    essentialTypesPercentage,
    notEssentialsTotal,
    essentialsTotal,
    Allinvestments,
    totalExpensePerMember: totalExpensePerMemberWithNames,
    totalDepositsPerMember: totalDepositsPerMemberWithNames,
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
