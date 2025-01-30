import { z } from "zod";

export const upsertWishlistSchema = z.object({
  title: z.string().trim().min(1),
  amount: z.number().positive(),
  done: z.boolean(),
});
