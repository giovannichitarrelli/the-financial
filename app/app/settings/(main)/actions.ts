"use server";

import { z } from "zod";
import { updateProfileSchema } from "./schemas";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";

export async function updateProfile(
  input: z.infer<typeof updateProfileSchema>,
) {
  const session = await getServerSession(auth);
  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: input.name,
      password: input.password,
    },
  });
}
