import { z } from "zod";

export const deleteInvestmentSchema = z.object({
  investmentId: z.string().uuid(),
});

export type DeleteInvestmentSchema = z.infer<typeof deleteInvestmentSchema>;
