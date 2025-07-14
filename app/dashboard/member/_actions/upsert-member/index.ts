"use server";

import { upsertMemberSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import { db } from "@/services/database";

interface UpsertMemberParams {
  id?: string;
  name: string;
}

export const upsertMember = async (params: UpsertMemberParams) => {
  upsertMemberSchema.parse(params);
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;
  await db.member.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/dashboard/member");
};
