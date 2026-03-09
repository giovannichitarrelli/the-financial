import {
  TransactionCategory,
  TransactionType,
  TransactionDepositCategory,
} from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory).nullable().optional(),
  depositCategory: z
    .nativeEnum(TransactionDepositCategory)
    .nullable()
    .optional(),
  date: z.date(),
  done: z.boolean(),
  isFixed: z.boolean(),
});
