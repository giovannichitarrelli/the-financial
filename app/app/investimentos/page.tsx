import React from "react";
import { getUserMonthInvestments, getUserMonthWithdraws } from "./actions";
import { getUserCurrentPlan } from "@/services/stripe";
import { auth } from "@/services/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  BadgeAlert,
  HandCoins,
  CandlestickChart,
  ShieldPlus,
  PieChart,
} from "lucide-react";
import {
  getTotalMonthSaved,
  getTotalSaved,
} from "../_components/_helpers/totals";
import { WithdrawUpsertSheet } from "../_components/_upserts/withdraw-upersert-sheet";
import { InvestmentsUpsertSheet } from "../_components/_upserts/investments-upersert-sheet";
import FilterComponentInvestments from "./_components/filter-component-investments";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "../_components/dashboard/dashboard-page";
import CtaButtonPro from "../_components/cta-button-pro";
import { FreeAlert } from "../_components/plan-alert";
export default async function Page() {
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);

  const investments = await getUserMonthInvestments(
    parseInt(currentMonth),
    parseInt(currentYear),
  );
  const withdraws = await getUserMonthWithdraws(
    parseInt(currentMonth),
    parseInt(currentYear),
  );
  const initialTotalSaved = await getTotalSaved();
  const initialTotalMonthSaved = await getTotalMonthSaved(
    parseInt(currentMonth),
    parseInt(currentYear),
  );

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Investimentos</DashboardPageHeaderTitle>

        <div className="lg:hidden ">
          {plan.name === "free" ? (
            <CtaButtonPro />
          ) : (
            <div className="flex gap-2">
              <InvestmentsUpsertSheet />
              <WithdrawUpsertSheet />
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          {plan.name === "free" ? (
            <CtaButtonPro />
          ) : (
            <div className="flex gap-2">
              <InvestmentsUpsertSheet />
              <WithdrawUpsertSheet />
            </div>
          )}
        </div>
      </DashboardPageHeader>

      <DashboardPageMain>
        {plan.name === "free" ? <FreeAlert /> : " "}
        <FilterComponentInvestments
          initialMonth={currentMonth}
          initialYear={currentYear}
          initialInvestments={investments}
          initialWithdraws={withdraws}
          initialTotalSaved={initialTotalSaved}
          initialTotalMonthSaved={initialTotalMonthSaved}
        />

        <Card className="mt-auto">
          <CardHeader className="mb-4 border-b border-border">
            <CardTitle className="text-md flex items-center justify-between">
              Ideias de Investimentos{" "}
              <BadgeAlert className="mr-2 h-5 w-5 text-red-500" />
            </CardTitle>
            <CardDescription>
              Veja abaixo uma lista de categorias mais usadas para auxiliar na
              criação das suas categorias.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-background p-3">
              <CardTitle className="flex items-center text-sm">
                <HandCoins className="mr-2 h-3 w-3" /> Renda Fixa
              </CardTitle>
              <CardDescription className="text-sm font-light">
                Poupança, Tesouro Direto, CDB, LCI, LCA...
              </CardDescription>
            </Card>
            <Card className="bg-background p-3">
              <CardTitle className="flex items-center text-sm">
                <CandlestickChart className="mr-2 h-3 w-3" /> Renda Variável
              </CardTitle>
              <CardDescription className="text-sm font-light">
                Futuros, Ações, Criptomoedas...
              </CardDescription>
            </Card>
            <Card className="bg-background p-3">
              <CardTitle className="flex items-center text-sm">
                <ShieldPlus className="mr-2 h-3 w-3" /> Reserva de emergência
              </CardTitle>
              <CardDescription className="text-sm font-light">
                Para eventuais problemas inesperados...
              </CardDescription>
            </Card>
            <Card className="bg-background p-3">
              <CardTitle className="flex items-center text-sm">
                <PieChart className="mr-2 h-3 w-3" /> Previdência privada
              </CardTitle>
              <CardDescription className="text-sm font-light">
                Para sua aposentadoria de sucesso...
              </CardDescription>
            </Card>
          </CardContent>
        </Card>
      </DashboardPageMain>
    </DashboardPage>
  );
}
