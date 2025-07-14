"use server";

import { db } from "@/services/database";
import { DeleteMemberSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteMember = async ({ memberId }: DeleteMemberSchema) => {
  await db.wishlist.delete({
    where: {
      id: memberId,
    },
  });
  revalidatePath("/app/wishlist");
  revalidatePath("/app");
};
