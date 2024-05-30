import { z } from "zod";

export const upsertWishlistSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  ammount: z.string().optional(),
  doneAt: z.date().optional().nullable(),
});
export const DeleteWishlistSchema = z.object({
  id: z.string(),
});
