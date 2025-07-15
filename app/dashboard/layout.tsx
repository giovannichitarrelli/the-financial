import { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider } from "../_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { SiteHeader } from "./_components/site-header";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import { canUserAddTransaction } from "./_actions/data/can-user-add-transaction";
import { db } from "@/services/database";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(auth);
  const userCanAddTransaction = await canUserAddTransaction();

  const member = await db.member.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  if (!session) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={session.user} />
      <SidebarInset>
        <SiteHeader
          members={member}
          user={session.user}
          userCanAddTransaction={userCanAddTransaction}
        />

        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
