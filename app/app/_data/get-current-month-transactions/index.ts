import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { endOfMonth, startOfMonth } from "date-fns";
import { getServerSession } from "next-auth";

export const getCurrentMonthTransactions = async () => {
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;
  return db.transactions.count({
    where: {
      userId,
      createAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};
