"use client";

import {
  CircleFadingPlus,
  ClipboardList,
  HandCoins,
  Heart,
  HomeIcon,
  Settings,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { Session } from "next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  DashboardSideBarMain,
  DashboardSideBarNav,
  DashboardSideBarNavFooter,
  DashboardSideBarNavLink,
  DashboardSideBarNavMain,
} from "./dashboard/sidebar";
import { ShareLink } from "./share";

type MainSideBarProps = {
  user: Session["user"];
};

export function SideBarNavLinks({ user }: MainSideBarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <>
      <DashboardSideBarMain>
        <DashboardSideBarNavMain className="">
          <DashboardSideBarNav>
            <DashboardSideBarNavLink href="/app" active={isActive("/app")}>
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </DashboardSideBarNavLink>

            <DashboardSideBarNavLink
              href="/app/despesas"
              active={isActive("/app/despesas")}
            >
              <ClipboardList className="h-4 w-4" />
              Despesas
            </DashboardSideBarNavLink>

            <DashboardSideBarNavLink
              href="/app/receitas"
              active={isActive("/app/receitas")}
            >
              <CircleFadingPlus className="h-4 w-4" />
              Receitas
            </DashboardSideBarNavLink>
            <DashboardSideBarNavLink
              href="/app/investimentos"
              active={isActive("/app/investimentos")}
            >
              <HandCoins className="h-4 w-4" />
              Investimentos
            </DashboardSideBarNavLink>
            <DashboardSideBarNavLink
              href="/app/metas"
              active={isActive("/app/metas")}
            >
              <Heart className="h-4 w-4" />
              Metas
            </DashboardSideBarNavLink>
            <DashboardSideBarNavLink
              href="/app/settings"
              active={isActive("/app/settings")}
            >
              <Settings className="h-4 w-4" />
              Configurações
            </DashboardSideBarNavLink>
          </DashboardSideBarNav>

          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-4">
              <CardTitle className="text-md flex items-center justify-between">
                Compartilhe com amigos <Users className="ml-1 size-4" />
              </CardTitle>
              <CardDescription className="text-sm">
                Ajude a promover a organização financeira!
              </CardDescription>
            </CardHeader>

            <CardContent className="p-3 pt-0">
              <ShareLink />
            </CardContent>
          </Card>
        </DashboardSideBarNavMain>
      </DashboardSideBarMain>

      <DashboardSideBarNavFooter>
        <UserDropdown user={user} />
      </DashboardSideBarNavFooter>
    </>
  );
}
