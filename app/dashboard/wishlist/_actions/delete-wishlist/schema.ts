import { z } from "zod";

export const deleteWishlistSchema = z.object({
  wishlistId: z.string().uuid(),
});

export type DeleteWishlistSchema = z.infer<typeof deleteWishlistSchema>;
