"use client";

import { usePathname } from "next/navigation";
import {
  DashboardSideBarNav,
  DashboardSideBarNavLink,
} from "../../_components/dashboard/sidebar";

export function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside>
      <DashboardSideBarNav className="flex items-center">
        <DashboardSideBarNavLink
          href="/app/settings"
          active={isActive("/app/settings")}
        >
          Perfil
        </DashboardSideBarNavLink>
        <DashboardSideBarNavLink
          href="/app/settings/theme"
          active={isActive("/app/settings/theme")}
        >
          Aparência
        </DashboardSideBarNavLink>
        <DashboardSideBarNavLink
          href="/app/settings/billing"
          active={isActive("/app/settings/billing")}
        >
          Assinatura
        </DashboardSideBarNavLink>
        <DashboardSideBarNavLink
          href="/app/settings/support"
          active={isActive("/app/settings/support")}
        >
          Suporte
        </DashboardSideBarNavLink>
      </DashboardSideBarNav>
    </aside>
  );
}
