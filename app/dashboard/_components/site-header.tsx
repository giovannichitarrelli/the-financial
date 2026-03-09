"use client";
import { Separator } from "@/app/_components/ui/separator";
import { SidebarTrigger } from "@/app/_components/ui/sidebar";

import { Session } from "next-auth";
import AddTransactionButton from "../transactions/_components/add-transaction-button";
type Props = {
  user: Session["user"];
  userCanAddTransaction?: boolean;
};
export function SiteHeader({ userCanAddTransaction, user }: Props) {
  const userName = user.name.split(" ")[0];

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 h-4 w-4" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <span className="text-xs">Olá, {userName} 👋</span>
        <div className="ml-auto flex items-center gap-2">
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
      </div>
    </header>
  );
}
