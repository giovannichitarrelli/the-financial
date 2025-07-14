"use server";

import { db } from "@/services/database";
import { DeleteInvestmentSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteInvestment = async ({
  investmentId,
}: DeleteInvestmentSchema) => {
  await db.investments.delete({
    where: {
      id: investmentId,
    },
  });
  revalidatePath("/app/investment");
  revalidatePath("/app");
};
