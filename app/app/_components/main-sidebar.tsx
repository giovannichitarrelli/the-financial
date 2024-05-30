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
          <Logo />
        </DashboardSideBarHeader>
        <SideBarNavLinks user={user} />
      </DashboardSideBar>

      <DashboardMenuMobile>
        <Logo />
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

          <SheetContent side="right" className="flex flex-col">
            <DashboardSideBarHeader>
              <Logo />
            </DashboardSideBarHeader>

            <SideBarNavLinks user={user} />
          </SheetContent>
        </Sheet>
      </DashboardMenuMobile>
    </>
  );
}
