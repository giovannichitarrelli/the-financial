import { redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { canUserAddTransaction } from "../_actions/data/can-user-add-transaction";
import { DataTable } from "@/app/_components/ui/data-table";
import { investmentsColumns } from "./_columns";
import AddInvestmentsButton from "./_components/add-investment-button";
import MsgNoData from "../_components/no-data-table";
import CardsInvestments from "./_components/cards-investment";
import { Card, CardContent } from "@/app/_components/ui/card";
import { AppWindowMac, HandCoins, Table } from "lucide-react";
import { getTotalMonthSaved, getTotalSaved } from "../_helpers/totals";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";

const InvestmentPage = async () => {
  const session = await getServerSession(auth);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/auth");
  }
  const investments = await db.investments.findMany({
    where: {
      userId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();

  const initialTotalSaved = await getTotalSaved();
  const initialTotalMonthSaved = await getTotalMonthSaved(
    parseInt(currentMonth),
    parseInt(currentYear),
  );

  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <div className="flex flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Investments</h1>
        <AddInvestmentsButton userCanAddTransaction={userCanAddTransaction} />
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-between gap-2 py-2 md:flex-row">
          <p className="flex items-center">
            <HandCoins className="mr-2 h-4 w-4" /> Saldo total:
            <span className="ml-2 font-bold text-blue-500">
              {initialTotalSaved}
            </span>
          </p>
          <p className="flex items-center">
            <HandCoins className="mr-2 h-4 w-4" /> Saldo mensal:
            <span className="ml-2 font-bold text-blue-500">
              {initialTotalMonthSaved}
            </span>
          </p>
        </CardContent>
      </Card>

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
        </div>

        <TabsContent value="cards" className="space-y-2">
          {investments.length > 0 ? (
            investments.map((investments) => (
              <>
                <CardsInvestments investments={investments} />
              </>
            ))
          ) : (
            <MsgNoData />
          )}
        </TabsContent>
        <TabsContent value="table">
          <DataTable
            columns={investmentsColumns}
            data={JSON.parse(JSON.stringify(investments))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentPage;
