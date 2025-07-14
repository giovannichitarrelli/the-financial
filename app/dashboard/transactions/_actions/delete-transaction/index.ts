"use server";

import { db } from "@/services/database";
import { DeleteTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchema) => {
  await db.transactions.delete({
    where: {
      id: transactionId,
    },
  });
  revalidatePath("/app/transactions");
  revalidatePath("/app");
};
