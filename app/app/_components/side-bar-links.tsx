"use client";

import {
  ClipboardList,
  HandCoins,
  Heart,
  HomeIcon,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { Session } from "next-auth";

import {
  DashboardSideBarMain,
  DashboardSideBarNav,
  DashboardSideBarNavFooter,
  DashboardSideBarNavLink,
  DashboardSideBarNavMain,
} from "./dashboard/sidebar";

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
              href="/app/transactions"
              active={isActive("/app/transactions")}
            >
              <ClipboardList className="h-4 w-4" />
              Transações
            </DashboardSideBarNavLink>

            <DashboardSideBarNavLink
              href="/app/investments"
              active={isActive("/app/investments")}
            >
              <HandCoins className="h-4 w-4" />
              Investimentos
            </DashboardSideBarNavLink>

            <DashboardSideBarNavLink
              href="/app/wishlist"
              active={isActive("/app/wishlist")}
            >
              <Heart className="h-4 w-4" />
              Lista de desejos
            </DashboardSideBarNavLink>

            <DashboardSideBarNavLink
              href="/app/settings"
              active={isActive("/app/settings")}
            >
              <Settings className="h-4 w-4" />
              Configurações
            </DashboardSideBarNavLink>
          </DashboardSideBarNav>
        </DashboardSideBarNavMain>
      </DashboardSideBarMain>

      <DashboardSideBarNavFooter>
        <UserDropdown user={user} />
      </DashboardSideBarNavFooter>
    </>
  );
}
