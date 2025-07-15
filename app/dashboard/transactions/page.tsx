import { transactionColumns } from "./_columns";
import { redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { DataTable } from "@/app/_components/ui/data-table";
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
import { TransactionCategory } from "@prisma/client";
import TimeSelect from "../(main)/_components/time-select";

interface Props {
  searchParams: {
    month: string;
    category: string;
  };
}

const TransactionsPage = async ({
  searchParams: { month, category },
}: Props) => {
  const session = await getServerSession(auth);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/auth");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/dashboard/transactions?month=0${new Date().getMonth() + 1}`);
  }

  const transactions = await db.transactions.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(`2025-${month}-31`),
      },
      ...(category ? { category: category as TransactionCategory } : {}),
    },

    orderBy: {
      date: "desc",
    },
  });

  const member = await db.member.findMany({
    where: {
      userId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <>
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>

        <Tabs defaultValue="cards">
          <div className="flex items-center justify-between gap-2">
            <TabsList className="grid max-w-[200px] grid-cols-2">
              <TabsTrigger value="cards">
                <AppWindowMac className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="table">
                <Table className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <TimeSelect />
              <TransactionsCategorySelect />
            </div>
          </div>

          <TabsContent value="cards" className="space-y-2">
            {transactions.length > 0 ? (
              transactions.map((transactions) => (
                <>
                  <CardsTransactions
                    transactions={transactions}
                    members={member}
                  />
                </>
              ))
            ) : (
              <MsgNoData />
            )}
          </TabsContent>
          <TabsContent value="table">
            <DataTable
              columns={transactionColumns}
              data={JSON.parse(JSON.stringify(transactions))}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default TransactionsPage;
