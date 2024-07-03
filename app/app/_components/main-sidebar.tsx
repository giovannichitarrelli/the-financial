"use client";

import { Menu } from "lucide-react";
import Logo from "@/app/_components/logo";
import { Session } from "next-auth";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { SideBarNavLinks } from "./side-bar-links";
import DashboardSideBar, {
  DashboardMenuMobile,
  DashboardSideBarHeader,
} from "./dashboard/sidebar";
import Link from "next/link";

type MainSideBarProps = {
  user?: Session["user"];
};

export function MainSideBar({ user }: MainSideBarProps) {
  if (!user) {
    return <div>Usuário não encontrado...</div>;
  }

  return (
    <>
      <DashboardSideBar>
        <DashboardSideBarHeader>
          <Link href="/app">
            <Logo />
          </Link>
        </DashboardSideBarHeader>
        <SideBarNavLinks user={user} />
      </DashboardSideBar>

      <DashboardMenuMobile>
        <Link href="/app">
          <Logo />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex flex-col justify-between pb-0"
          >
            <Logo />
            <SideBarNavLinks user={user} />
          </SheetContent>
        </Sheet>
      </DashboardMenuMobile>
    </>
  );
}
