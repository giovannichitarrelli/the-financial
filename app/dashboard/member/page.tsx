import { redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { canUserAddTransaction } from "../_actions/data/can-user-add-transaction";
import { DataTable } from "@/app/_components/ui/data-table";
import { MemberColumns } from "./_columns";
import AddMemberButton from "./_components/add-member-button";
import MsgNoData from "../_components/no-data-table";
import CardsMember from "./_components/cards-member";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { AppWindowMac, Table } from "lucide-react";

const MemberPage = async () => {
  const session = await getServerSession(auth);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/auth");
  }
  const member = await db.member.findMany({
    where: {
      userId,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <div className="flex flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Family Members</h1>
        <AddMemberButton userCanAddTransaction={userCanAddTransaction} />
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
        </div>

        <TabsContent value="cards" className="space-y-2">
          {member.length > 0 ? (
            member.map((member) => (
              <>
                <CardsMember member={member} />
              </>
            ))
          ) : (
            <MsgNoData />
          )}
        </TabsContent>
        <TabsContent value="table">
          <DataTable
            columns={MemberColumns}
            data={JSON.parse(JSON.stringify(member))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberPage;
