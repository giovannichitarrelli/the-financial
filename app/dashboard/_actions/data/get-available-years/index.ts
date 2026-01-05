import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";

export const getAvailableYears = async (): Promise<string[]> => {
  const session = await getServerSession(auth);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;

  // Buscar todas as transações do usuário
  const transactions = await db.transactions.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
    },
  });

  // Extrair anos únicos das transações
  const yearsSet = new Set<number>();
  transactions.forEach((transaction) => {
    const year = transaction.date.getFullYear();
    yearsSet.add(year);
  });

  // Converter para array de strings e ordenar do mais recente ao mais antigo
  const years = Array.from(yearsSet)
    .map((year) => year.toString())
    .sort((a, b) => parseInt(b) - parseInt(a));

  return years;
};
