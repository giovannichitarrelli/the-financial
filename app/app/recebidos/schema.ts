import { z } from "zod";

export const upsertSalarySchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  ammount: z.string().optional(),
  expiryAt: z.date().optional(),
  isFixed: z.boolean().optional(),

  doneAt: z.date().optional().nullable(),
});
export const DeleteSalarySchema = z.object({
  id: z.string(),
});
