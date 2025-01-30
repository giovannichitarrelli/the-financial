import { db } from "@/services/database";
import { formatCurrency } from "./formatCurrency";
import { InvestmentsType, TransactionType } from "@prisma/client";
import {
  getUserInvestments,
  getUserMonthInvestments,
  getUserMonthWithdraws,
  getUserWithdraws,
} from "../../investments/_actions/resume-totals";

export async function getTotalPendingExpenses(month: number, year: number) {
  const expenses = await db.transactions.findMany({
    where: {
      type: TransactionType.EXPENSE,
      done: false,
      date: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
  });

  const totalPending = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  return totalPending;
}

export async function getTotalPaidExpenses(month: number, year: number) {
  const expenses = await db.transactions.findMany({
    where: {
      type: TransactionType.EXPENSE,
      done: true,
      date: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
  });

  const totalPaid = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  return totalPaid;
}

export async function getTotalSalary(month: number, year: number) {
  const salary = await db.transactions.findMany({
    where: {
      type: TransactionType.DEPOSIT,
      date: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
  });

  const totalSalary = salary.reduce(
    (total, salaryItem) => total + salaryItem.amount,
    0,
  );
  return totalSalary;
}

export async function getTotalReceived(month: number, year: number) {
  const receivedSalary = await db.transactions.findMany({
    where: {
      type: TransactionType.DEPOSIT,
      done: true,
      date: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
  });

  const totalReceived = receivedSalary.reduce(
    (total, salaryItem) => total + salaryItem.amount,
    0,
  );
  return totalReceived;
}

export async function getTotalInvestments(month: number, year: number) {
  const investments = await db.investments.findMany({
    where: {
      type: InvestmentsType.DEPOSIT,

      done: true,
      createAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
  });

  const totalInvestments = investments.reduce(
    (total, investment) => total + investment.amount,
    0,
  );
  return totalInvestments;
}

export async function getPercentPaid(totalExpenses: number, totalPaid: number) {
  return ((totalPaid / totalExpenses) * 100).toFixed(2);
}

export async function getPercentPendingPaid(
  totalPending: number,
  totalExpenses: number,
) {
  return ((totalPending / totalExpenses) * 100).toFixed(2);
}

export async function getPercentInvestments(
  totalInvestments: number,
  totalSalary: number,
) {
  return ((totalInvestments / totalSalary) * 100).toFixed(2);
}

export async function getPercentSalary(
  totalReceived: number,
  totalSalary: number,
) {
  return ((totalReceived / totalSalary) * 100).toFixed(2);
}

export async function getTotalMonthSaved(month: number, year: number) {
  const investments = await getUserMonthInvestments(month, year);
  const withdraws = await getUserMonthWithdraws(month, year);

  const totalInvestments = investments.reduce(
    (total, investment) => total + investment.amount,
    0,
  );
  const totalWithdraws = withdraws.reduce(
    (total, withdraw) => total + withdraw.amount,
    0,
  );

  const totalMonthSaved = formatCurrency(totalInvestments - totalWithdraws);
  return totalMonthSaved;
}

export async function getTotalSaved() {
  const investments = await getUserInvestments();
  const withdraws = await getUserWithdraws();

  const totalInvestments = investments.reduce(
    (total, investment) => total + investment.amount,
    0,
  );
  const totalWithdraws = withdraws.reduce(
    (total, withdraw) => total + withdraw.amount,
    0,
  );

  const totalSaved = formatCurrency(totalInvestments - totalWithdraws);

  return totalSaved;
}

export async function calculateGoalsProgress() {
  const transactions = await db.transactions.findMany();

  const totalInvestments = transactions.reduce(
    (total, transaction) =>
      total +
      (transaction.type === InvestmentsType.DEPOSIT ? transaction.amount : 0),
    0,
  );

  const totalWithdraws = transactions.reduce(
    (total, transaction) =>
      total +
      (transaction.type === TransactionType.EXPENSE ? transaction.amount : 0),
    0,
  );

  const totalSaved = totalInvestments - totalWithdraws;
  const wishlist = await db.wishlist.findMany();

  const totalWishlist = wishlist.reduce(
    (total, item) => total + item.amount,
    0,
  );

  return ((totalSaved / totalWishlist) * 100).toFixed(2);
}
