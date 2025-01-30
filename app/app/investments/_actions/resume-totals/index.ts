"use server";
import { db } from "@/services/database";

import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import { InvestmentsType } from "@prisma/client";

// investments
export async function getUserInvestments() {
  const session = await getServerSession(auth);
  const investments = await db.investments.findMany({
    where: {
      type: InvestmentsType.DEPOSIT,
      userId: session?.user?.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return investments;
}
export async function getUserMonthInvestments(month: number, year: number) {
  const session = await getServerSession(auth);
  const monthInvestments = await db.investments.findMany({
    where: {
      type: InvestmentsType.DEPOSIT,
      userId: session?.user?.id,
      createAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 0),
      },
    },
  });
  return monthInvestments;
}

// withdraw
export async function getUserWithdraws() {
  const session = await getServerSession(auth);
  const withdraws = await db.investments.findMany({
    where: {
      type: InvestmentsType.WITHDRAW,
      userId: session?.user?.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return withdraws;
}

export async function getUserMonthWithdraws(month: number, year: number) {
  const session = await getServerSession(auth);
  const monthWithdraws = await db.investments.findMany({
    where: {
      type: InvestmentsType.WITHDRAW,
      userId: session?.user?.id,
      createAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 0),
      },
    },
  });
  return monthWithdraws;
}
