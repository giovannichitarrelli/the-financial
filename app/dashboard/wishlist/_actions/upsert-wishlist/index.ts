"use server";

import { upsertWishlistSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import { db } from "@/services/database";

interface UpsertWishlistParams {
  id?: string;
  title: string;
  amount: number;
  done: boolean;
}

export const upsertWishlist = async (params: UpsertWishlistParams) => {
  upsertWishlistSchema.parse(params);
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;
  await db.wishlist.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/dashboard/wishlist");
};
