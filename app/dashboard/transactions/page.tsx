import { redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { AppWindowMac, Table } from "lucide-react";
import MsgNoData from "../_components/no-data-table";
import CardsTransactions from "./_components/cards-transactions";
import { isMatch } from "date-fns";
import TransactionsCategorySelect from "./_components/transactions-category-select";
import { TransactionCategory, TransactionType } from "@prisma/client";
import TimeSelect from "../_components/time-select";
import TransactionsTypeSelect from "./_components/transactions-type-select";
import TransactionsDoneSelect from "./_components/transactions-done-select";
import YearSelect from "../_components/year-select";
import { getAvailableYears } from "../_actions/data/get-available-years";
import { TransactionsDataTable } from "./_components/transactions-data-table";

interface Props {
  searchParams: {
    month: string;
    year?: string;
    category: string;
    type: string;
    done?: string;
  };
}

const TransactionsPage = async ({
  searchParams: { month, year, category, type, done },
}: Props) => {
  const session = await getServerSession(auth);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/auth");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    redirect(
      `/dashboard/transactions?month=${currentMonth}&year=${currentYear}`,
    );
  }

  // Usar o ano fornecido ou o ano atual
  const selectedYear = year || new Date().getFullYear().toString();

  // Se não houver ano na URL, redirecionar para incluir o ano atual
  if (!year) {
    redirect(`/dashboard/transactions?month=${month}&year=${selectedYear}`);
  }
  const monthNum = parseInt(month);

  // Calcular o primeiro e último dia do mês corretamente
  const startDate = new Date(parseInt(selectedYear), monthNum - 1, 1);
  // Para obter o último dia do mês, usamos o mês seguinte com dia 0
  const endDate = new Date(parseInt(selectedYear), monthNum, 0);

  const transactions = await db.transactions.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
      ...(category && category !== "all"
        ? { category: category as TransactionCategory }
        : {}),
      ...(type && type !== "all" ? { type: type as TransactionType } : {}),
      ...(done !== undefined && done !== "all"
        ? { done: done === "true" }
        : {}),
    },

    orderBy: {
      date: "desc",
    },
  });

  const availableYears = await getAvailableYears();

  return (
    <>
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>

        <Tabs defaultValue="cards">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <TabsList className="grid max-w-[200px] grid-cols-2">
              <TabsTrigger value="cards">
                <AppWindowMac className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="table">
                <Table className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap items-center gap-2">
              <YearSelect availableYears={availableYears} />
              <TimeSelect />
              <TransactionsCategorySelect />
              <TransactionsTypeSelect />
              <TransactionsDoneSelect />
            </div>
          </div>

          <TabsContent value="cards" className="space-y-2">
            {transactions.length > 0 ? (
              transactions.map((transactions) => (
                <>
                  <CardsTransactions transactions={transactions} />
                </>
              ))
            ) : (
              <MsgNoData />
            )}
          </TabsContent>
          <TabsContent value="table">
            <TransactionsDataTable transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default TransactionsPage;
