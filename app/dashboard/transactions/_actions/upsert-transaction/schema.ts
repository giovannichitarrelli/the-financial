import {
  TransactionCategory,
  TransactionEssentialType,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  essentialType: z.nativeEnum(TransactionEssentialType),
  category: z.nativeEnum(TransactionCategory),
  date: z.date(),
  done: z.boolean(),
  isFixed: z.boolean(),
});
