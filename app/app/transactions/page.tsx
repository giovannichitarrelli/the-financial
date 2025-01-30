import { transactionColumns } from "./_columns";
import AddTransactionButton from "./_components/add-transaction-button";
import { redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
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
import TransactionsTimeSelect from "./_components/transactions-time-select";

interface Props {
  searchParams: {
    month: string;
  };
}

const TransactionsPage = async ({ searchParams: { month } }: Props) => {
  const session = await getServerSession(auth);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/auth");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/app/transactions?month=0${new Date().getMonth() + 1}`);
  }

  const where = {
    userId,
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const transactions = await db.transactions.findMany({
    where: { ...where },

    orderBy: {
      date: "desc",
    },
  });

  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
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

            <TransactionsTimeSelect />
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
