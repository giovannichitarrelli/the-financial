import React from "react";
import { getUserMonthSalary } from "./actions";
import { getUserCurrentPlan } from "@/services/stripe";
import { auth } from "@/services/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { SalaryUpsertSheet } from "../_components/_upserts/salary-upersert-sheet";
import ClientComponent from "./_components/filter-component";
import { BadgeAlert, CircleDollarSign } from "lucide-react";
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

  const salary = await getUserMonthSalary(
    parseInt(currentMonth),
    parseInt(currentYear),
  );

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Receitas / Entradas</DashboardPageHeaderTitle>

        {plan.name === "free" ? <CtaButtonPro /> : <SalaryUpsertSheet />}
      </DashboardPageHeader>

      <DashboardPageMain>
        {plan.name === "free" ? <FreeAlert /> : " "}
        <ClientComponent
          initialMonth={currentMonth}
          initialYear={currentYear}
          initialSalary={salary}
        />

        <Card className="mt-auto">
          <CardHeader className="mb-4 border-b border-border ">
            <CardTitle className="text-md flex items-center justify-between">
              Confira exemplos de recebimentos{" "}
              <BadgeAlert className="mr-2 h-5 w-5 text-red-500 " />
            </CardTitle>
            <CardDescription>
              Veja abaixo alguns exemplos de recebimentos para auxiliar na
              criação dos seus recebimentos.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-2  lg:grid-cols-4">
            <Card className="bg-background p-3  ">
              <CardTitle className="flex items-center text-sm">
                <CircleDollarSign className="mr-2 h-3 w-3" /> Salário fixo
              </CardTitle>
            </Card>
            <Card className="bg-background p-3  ">
              {" "}
              <CardTitle className="flex items-center text-sm">
                <CircleDollarSign className="mr-2 h-3 w-3" /> Renda extra
              </CardTitle>
            </Card>
            <Card className="bg-background p-3  ">
              <CardTitle className="flex items-center text-sm">
                <CircleDollarSign className="mr-2 h-3 w-3" /> Rendimentos
              </CardTitle>
            </Card>
            <Card className="bg-background p-3  ">
              {" "}
              <CardTitle className="flex items-center text-sm">
                <CircleDollarSign className="mr-2 h-3 w-3" /> Benefícios
              </CardTitle>
            </Card>
          </CardContent>
        </Card>
      </DashboardPageMain>
    </DashboardPage>
  );
}
