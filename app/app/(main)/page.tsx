import { Metadata } from "next";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import {
  BarChart2,
  CircleArrowRight,
  CircleCheckBig,
  CircleHelp,
} from "lucide-react";
import {
  getPercentInvestments,
  getPercentPaid,
  getPercentPendingPaid,
  getPercentSalary,
  getTotalExpenses,
  getTotalInvestments,
  getTotalPaidExpenses,
  getTotalPendingExpenses,
  getTotalReceived,
  getTotalSalary,
} from "../_components/_helpers/totals";
import { ExpensesUpsertSheet } from "../_components/_upserts/expenses-upersert-sheet";
import { formatCurrency } from "../_components/_helpers/formatCurrency";
import { MonthReceived } from "./_components/month-received";
import { MonthExpenses } from "./_components/month-expenses";
import {
  MonthComparative,
  OverviewExpenses,
  PizzaChart,
  PizzaChartYear,
  ProgressChartsYear,
} from "./_components/charts/data-charts";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "../_components/dashboard/dashboard-page";
import CtaButtonPro from "../_components/cta-button-pro";
import { HeaderAddButtons } from "./_components/header-add-buttons";
import { FreeAlert } from "../_components/plan-alert";
import {
  CurrentMonth,
  CurrentMonthName,
} from "./_components/current-month-name";
import ResumeCards from "./_components/resume-cards";
import ResumeList from "./_components/resume-list";
import ChartsCards from "./_components/charts-cards";
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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const totalReceived = await getTotalReceived(currentMonth, currentYear);
  const totalInvestments = await getTotalInvestments(currentMonth, currentYear);
  const totalPaid = await getTotalPaidExpenses(currentMonth, currentYear);
  const totalPending = await getTotalPendingExpenses(currentMonth, currentYear);
  const totalSalary = await getTotalSalary(currentMonth, currentYear);
  const totalExpenses = await getTotalExpenses(currentMonth, currentYear);

  const percentPaid = await getPercentPaid(totalExpenses, totalPaid);
  const percentPendingPaid = await getPercentPendingPaid(
    totalPending,
    totalExpenses,
  );
  const percentInvestments = await getPercentInvestments(
    totalInvestments,
    totalSalary,
  );
  const percentSalary = await getPercentSalary(totalReceived, totalSalary);
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
        <div className="lg:hidden">
          {plan.name === "free" ||
          (status.status !== "active" && status.status !== "trialing") ? (
            <CtaButtonPro />
          ) : (
            <ExpensesUpsertSheet />
          )}
        </div>
        <div className="hidden lg:flex">
          {plan.name === "free" ||
          (status.status !== "active" && status.status !== "trialing") ? (
            <CtaButtonPro />
          ) : (
            <HeaderAddButtons />
          )}
        </div>
      </DashboardPageHeader>

      <DashboardPageMain>
        {plan.name === "free" ||
        (status.status !== "active" && status.status !== "trialing") ? (
          <FreeAlert />
        ) : (
          " "
        )}

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
                <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-4">
                  <ResumeCards
                    title=" Total Recebidos"
                    icon={<CircleCheckBig className="h-4 w-4 text-green-500" />}
                    total={totalReceived}
                    percent={`${percentSalary}% do total previsto.`}
                    progress={percentSalary}
                  />

                  <ResumeCards
                    title="Total Investimentos"
                    icon={<BarChart2 className="h-4 w-4 text-yellow-500" />}
                    total={totalInvestments}
                    percent={`${percentInvestments}% do salário.`}
                    progress={percentInvestments}
                  />

                  <ResumeCards
                    title="Pagamentos concluídos"
                    icon={
                      <CircleArrowRight className=" h-4 w-4 text-blue-500" />
                    }
                    total={totalPaid}
                    percent={`${percentPaid}% do total previsto.`}
                    progress={percentPaid}
                  />

                  <ResumeCards
                    title="Pagamentos Pendentes"
                    icon={<CircleHelp className="h-4 w-4 text-red-500" />}
                    total={totalPending}
                    percent={`${percentPendingPaid}% do total previsto.`}
                    progress={percentPendingPaid}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <ResumeList
                    title="Recebidos no mês"
                    description={`  Você tem ${formatCurrency(totalSalary)} previstos para
                          receber esse mês.`}
                    component={<MonthReceived />}
                  />
                  <ResumeList
                    title="Despesas no mês"
                    description={`Você tem ${formatCurrency(totalExpenses)} de despesas
                      previstas esse mês.`}
                    component={<MonthExpenses />}
                  />
                </div>
              </TabsContent>

              <TabsContent value="charts-months" className="space-y-4">
                <ChartsCards
                  title="Overview geral"
                  component={<MonthComparative />}
                />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <ChartsCards
                    title="Gastos por categoria"
                    component={<PizzaChartYear />}
                  />
                  <ChartsCards
                    title="Gastos por categoria /  "
                    month={<CurrentMonth />}
                    component={<PizzaChart />}
                  />
                  <ChartsCards
                    title="Progresso de metas"
                    component={<ProgressChartsYear />}
                  />
                </div>

                <ChartsCards
                  title="Resumo de gastos"
                  component={<OverviewExpenses />}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
