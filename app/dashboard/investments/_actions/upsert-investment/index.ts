"use server";

import { upsertInvestmentSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { InvestmentsObjectType, InvestmentsType } from "@prisma/client";

interface Props {
  id?: string;
  title: string;
  amount: number;
  done: boolean;
  type: InvestmentsType;
  object: InvestmentsObjectType;
}

export const upsertInvestment = async (params: Props) => {
  upsertInvestmentSchema.parse(params);
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;
  await db.investments.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/dashboard/investments");
};
