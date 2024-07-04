import React from "react";
import { getUserInvestments, getUserWithdraws } from "./actions";
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
  ArrowRightCircle,
} from "lucide-react";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "../_components/dashboard/dashboard-page";
import CtaButtonPro from "../_components/cta-button-pro";
import { FreeAlert } from "../_components/plan-alert";
import { isAvailable } from "@/app/_lib/utils";
import { InvestmentsDataTable } from "./_components/investments-data-table";
import { WithdrawsDataTable } from "./_components/withdraw-data-table";
import { Filters } from "../_components/filters";
import { InvestmentsUpsertSheet } from "../_components/_upserts/investments-upersert-sheet";
import { WithdrawUpsertSheet } from "../_components/_upserts/withdraw-upersert-sheet";
import {
  getTotalMonthSaved,
  getTotalSaved,
} from "../_components/_helpers/totals";

export default async function Page() {
  const investments = await getUserInvestments();
  const withdraws = await getUserWithdraws();
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();

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
          {plan.name === "free" ||
          (status.status !== "active" && status.status !== "trialing") ? (
            <CtaButtonPro />
          ) : (
            <div className="flex gap-2">
              <InvestmentsUpsertSheet />
              <WithdrawUpsertSheet />
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          {plan.name === "free" ||
          (status.status !== "active" && status.status !== "trialing") ? (
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
        {plan.name === "free" ||
        (status.status !== "active" && status.status !== "trialing") ? (
          <FreeAlert />
        ) : (
          " "
        )}

        <Filters />

        <Card>
          <CardContent className="flex flex-col items-center justify-between gap-2 py-2 md:flex-row">
            <p className="flex items-center">
              <HandCoins className="mr-2 h-4 w-4" /> Saldo total:
              <span className="ml-2 font-bold text-blue-500">
                {initialTotalSaved}
              </span>
            </p>
            <p className="flex items-center">
              <HandCoins className="mr-2 h-4 w-4" /> Saldo mensal:
              <span className="ml-2 font-bold text-blue-500">
                {initialTotalMonthSaved}
              </span>
            </p>
          </CardContent>
        </Card>

        <InvestmentsDataTable data={investments} />

        <Card className="border-red-500 shadow-red-500">
          <CardHeader>
            <div className="flex items-center">
              <h3 className="text-lg font-bold"> Saques / Prejuízos</h3>
              <ArrowRightCircle className="ml-2 h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <WithdrawsDataTable data={withdraws} />
        </Card>

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
