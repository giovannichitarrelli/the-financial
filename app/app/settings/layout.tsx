import { PropsWithChildren } from "react";
import { SettingsSidebar } from "./_components/settings-sidebar";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "../_components/dashboard/dashboard-page";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Configurações</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div>
          <SettingsSidebar />
          <div>{children}</div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
