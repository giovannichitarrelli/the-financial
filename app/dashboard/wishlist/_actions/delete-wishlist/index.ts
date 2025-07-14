"use server";

import { db } from "@/services/database";
import { DeleteWishlistSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteWishlist = async ({ wishlistId }: DeleteWishlistSchema) => {
  await db.wishlist.delete({
    where: {
      id: wishlistId,
    },
  });
  revalidatePath("/dashboard/wishlist");
  revalidatePath("/dashboard");
};
