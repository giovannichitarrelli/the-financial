import { auth } from "@/services/auth";
import { getUserCurrentPlan, getUserCurrentStatus } from "@/services/stripe";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function isAvailable() {
  const session = await getServerSession(auth);
  if (!session) return { plan: null, status: null };

  const userId = session.user.id as string;
  const plan = await getUserCurrentPlan(userId);
  const status = await getUserCurrentStatus(userId);

  return { plan, status };
}
