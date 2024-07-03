import { Metadata } from "next";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { ExpensesUpsertSheet } from "../_components/_upserts/expenses-upersert-sheet";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "../_components/dashboard/dashboard-page";
import CtaButtonPro from "../_components/cta-button-pro";
import { HeaderAddButtons } from "./_components/header-add-buttons";
import { FreeAlert } from "../_components/plan-alert";
import { CurrentMonthName } from "./_components/current-month-name";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { isAvailable } from "@/app/_lib/utils";
import Resume from "./_components/Resume";
import ResumeLists from "./_components/resume.lists";
import Charts from "./_components/charts";

export const metadata: Metadata = {
  title: "DinDin - Dashboard",
  description: "Dashboard de resumo financeiro.",
};

export default async function AppPage() {
  const session = await getServerSession(auth);
  if (!session || !session.user || !session.user.id) {
    redirect("/erro");
  }
  const { plan, status } = await isAvailable();

  if (!plan || !status) {
    return (
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Gerenciar assinatura</CardTitle>
          <CardDescription>
            Não foi possível carregar as informações da sua assinatura.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const firstName = session?.user?.name?.split(" ")[0];
  const formattedFirstName = firstName ? capitalizeFirstLetter(firstName) : "";

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>
          Olá {formattedFirstName} 👋
        </DashboardPageHeaderTitle>
        <div>
          {plan.name === "free" ||
          (status.status !== "active" && status.status !== "trialing") ? (
            <CtaButtonPro />
          ) : (
            <>
              <div className="lg:hidden">
                <ExpensesUpsertSheet />
              </div>
              <div className="hidden lg:block">
                <HeaderAddButtons />
              </div>
            </>
          )}
        </div>
      </DashboardPageHeader>

      <DashboardPageMain>
        <FreeAlert />
        <div className="flex-col lg:flex">
          <div className="flex-1 space-y-4 p-3 pt-6">
            <Tabs defaultValue="dashboard" className="space-y-4">
              <div className="flex items-center justify-between gap-2 ">
                <TabsList>
                  <TabsTrigger value="dashboard">Dashboard </TabsTrigger>
                  <TabsTrigger value="charts-months">Análises</TabsTrigger>
                </TabsList>
                <CurrentMonthName />
              </div>

              <TabsContent value="dashboard" className="space-y-4">
                <Resume />
                <ResumeLists />
              </TabsContent>

              <TabsContent value="charts-months" className="space-y-4">
                <Charts />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
