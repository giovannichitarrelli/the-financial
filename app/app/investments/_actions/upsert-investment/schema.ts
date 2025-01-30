import { InvestmentsObjectType, InvestmentsType } from "@prisma/client";
import { z } from "zod";

export const upsertInvestmentSchema = z.object({
  title: z.string().trim().min(1),
  amount: z.number().positive(),
  done: z.boolean(),
  type: z.nativeEnum(InvestmentsType),
  object: z.nativeEnum(InvestmentsObjectType),
});
