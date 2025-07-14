import { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider } from "../_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { SiteHeader } from "./_components/site-header";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import { canUserAddTransaction } from "./_data/can-user-add-transaction";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(auth);
  const userCanAddTransaction = await canUserAddTransaction();

  if (!session) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={session.user} />
      <SidebarInset>
        <SiteHeader
          user={session.user}
          userCanAddTransaction={userCanAddTransaction}
        />

        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
