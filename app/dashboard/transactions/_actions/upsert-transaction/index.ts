"use server";

import {
  TransactionCategory,
  TransactionEssentialType,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import { db } from "@/services/database";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  essentialType: TransactionEssentialType;
  category: TransactionCategory;
  done: boolean;
  isFixed: boolean;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;
  await db.transactions.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/dashboard/transactions");
};
