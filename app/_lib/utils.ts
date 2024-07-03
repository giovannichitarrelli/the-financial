import { auth } from "@/services/auth";
import { getUserCurrentPlan, getUserCurrentStatus } from "@/services/stripe";
import { type ClassValue, clsx } from "clsx";
import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
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

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};
export function formatDateRange(period?: Period) {
  const defaultTo = addMonths(new Date(), 1);
  const defaultFrom = new Date();

  if (!period?.from) {
    return `${format(defaultFrom, "dd LLL")} - ${format(
      defaultTo,
      "dd LLL, yyyy",
      { locale: ptBR },
    )}`;
  }

  if (period.to) {
    return `${format(period.from, "dd LLL")} - ${format(
      period.to,
      "dd LLL, yyyy",
      { locale: ptBR },
    )}`;
  }

  return format(period.from, "dd LLL, yyyy", { locale: ptBR });
}
