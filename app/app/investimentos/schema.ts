import { z } from "zod";

export const upsertInvestmentsSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  price: z.string().optional(),
  doneAt: z.date().optional().nullable(),
});
export const DeleteInvestmentsSchema = z.object({
  id: z.string(),
});

export const upsertWithdrawsSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  amount: z.string().optional(),
  doneAt: z.date().optional().nullable(),
});
export const DeleteWithdrawsSchema = z.object({
  id: z.string(),
});
