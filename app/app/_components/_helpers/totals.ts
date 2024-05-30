import { getUserMonthExpenses } from "../../despesas/actions";
import {
  getUserInvestments,
  getUserMonthInvestments,
  getUserMonthWithdraws,
  getUserWithdraws,
} from "../../investimentos/actions";
import { getUserWishlist } from "../../metas/actions";
import { getUserMonthSalary } from "../../recebidos/actions";
import { formatCurrency } from "./formatCurrency";

export async function getTotalExpenses(month: number, year: number) {
  const expenses = await getUserMonthExpenses(month, year);

  let totalExpenses = 0;
  expenses.forEach((expense) => {
    totalExpenses += Number(expense.price);
  });

  return totalExpenses;
}

export async function getTotalPendingExpenses(month: number, year: number) {
  const expenses = await getUserMonthExpenses(month, year);

  const pendingExpenses = expenses.filter((expense) => expense.doneAt === null);

  let totalPending = 0;
  pendingExpenses.forEach((expense) => {
    totalPending += Number(expense.price);
  });

  return totalPending;
}

export async function getTotalPaidExpenses(month: number, year: number) {
  const expenses = await getUserMonthExpenses(month, year);

  const paidExpenses = expenses.filter((expense) => expense.doneAt);

  let totalPaid = 0;
  paidExpenses.forEach((expense) => {
    totalPaid += Number(expense.price);
  });

  return totalPaid;
}

export async function getTotalSalary(month: number, year: number) {
  const salary = await getUserMonthSalary(month, year);

  let totalSalary = 0;
  salary.forEach((salaryItem) => {
    totalSalary += Number(salaryItem.price);
  });

  return totalSalary;
}

export async function getTotalReceived(month: number, year: number) {
  const salary = await getUserMonthSalary(month, year);

  const receivedSalary = salary.filter((salaryItem) => salaryItem.doneAt);

  let totalReceived = 0;
  receivedSalary.forEach((salaryItem) => {
    totalReceived += Number(salaryItem.price);
  });

  return totalReceived;
}

export async function getTotalInvestments(month: number, year: number) {
  const investments = await getUserMonthInvestments(month, year);

  const invested = investments.filter((investment) => investment.doneAt);

  let totalInvestments = 0;
  invested.forEach((investment) => {
    totalInvestments += Number(investment.price);
  });

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
    (total, investment) => total + parseFloat(investment.price),
    0,
  );
  const totalWithdraws = withdraws.reduce(
    (total, withdraw) => total + parseFloat(withdraw.price),
    0,
  );

  const totalMonthSaved = formatCurrency(totalInvestments - totalWithdraws);

  return totalMonthSaved;
}

export async function getTotalSaved() {
  const investments = await getUserInvestments();
  const withdraws = await getUserWithdraws();
  const totalInvestments = investments.reduce(
    (total, investment) => total + parseFloat(investment.price),
    0,
  );
  const totalWithdraws = withdraws.reduce(
    (total, withdraw) => total + parseFloat(withdraw.price),
    0,
  );

  const totalSaved = formatCurrency(totalInvestments - totalWithdraws);

  return totalSaved;
}

export async function calculateGoalsProgress() {
  const investments = await getUserInvestments();
  const withdraws = await getUserWithdraws();

  const totalInvestments = investments.reduce(
    (total, investment) => total + parseFloat(investment.price),
    0,
  );

  const totalWithdraws = withdraws.reduce(
    (total, withdraw) => total + parseFloat(withdraw.price),
    0,
  );

  const totalSaved = totalInvestments - totalWithdraws;
  const wishlist = await getUserWishlist();

  const totalWishlist = wishlist.reduce(
    (total, item) => total + parseFloat(item.price),
    0,
  );

  return ((totalSaved / totalWishlist) * 100).toFixed(2);
}
