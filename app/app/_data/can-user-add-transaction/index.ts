import { getServerSession } from "next-auth";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";
import { auth } from "@/services/auth";
import { isAvailable } from "@/app/_lib/utils";

export const canUserAddTransaction = async () => {
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await isAvailable();
  if (user?.plan?.name === "pro") {
    return true;
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
