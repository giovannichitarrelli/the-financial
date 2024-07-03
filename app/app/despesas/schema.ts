import { z } from "zod";

export const upsertExpensesSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  price: z.string().optional(),
  categoriesId: z.string().optional(),
  expiryAt: z.date().optional().nullable(),
  isFixed: z.boolean().optional(),
  doneAt: z.date().optional().nullable(),
});

export const DeleteExpensesSchema = z.object({
  id: z.string(),
});
