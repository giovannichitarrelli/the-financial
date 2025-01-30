import { TransactionEssentialType, TransactionType } from "@prisma/client";
import {
  TotalExpensePerCategory,
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
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));
  const lastTransactions = await db.transactions.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
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
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};
