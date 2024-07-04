import React from "react";
import { getUserExpenses } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  BadgeAlert,
  ShoppingBasket,
  ShoppingBag,
  CarFront,
  Pizza,
  Sun,
  Gift,
} from "lucide-react";
import CtaButtonPro from "../_components/cta-button-pro";
import { ExpensesUpsertSheet } from "../_components/_upserts/expenses-upersert-sheet";
import { FreeAlert } from "../_components/plan-alert";
import { db } from "@/services/database";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "../_components/dashboard/dashboard-page";

import { isAvailable } from "@/app/_lib/utils";
import { ExpensesDataTable } from "./_components/expenses-data-table";
import { Filters } from "../_components/filters";
import CategoriesFilter from "../_components/categories-filter";

export default async function Page() {
  const expenses = await getUserExpenses();

  const categories = await db.categories.findMany({});
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

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Despesas</DashboardPageHeaderTitle>

        {plan.name === "free" ||
        (status.status !== "active" && status.status !== "trialing") ? (
          <CtaButtonPro />
        ) : (
          <ExpensesUpsertSheet />
        )}
      </DashboardPageHeader>

      <DashboardPageMain>
        {plan.name === "free" ||
        (status.status !== "active" && status.status !== "trialing") ? (
          <FreeAlert />
        ) : (
          " "
        )}

        <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2">
          <Filters />
          <CategoriesFilter />
        </div>

        <ExpensesDataTable data={expenses} categories={categories} />

        <Card className="mt-auto">
          <CardHeader className="mb-4 border-b border-border ">
            <CardTitle className="text-md flex items-center justify-between">
              Confira exemplos de despesas{" "}
              <BadgeAlert className="mr-2 h-5 w-5 text-red-500 " />
            </CardTitle>
            <CardDescription>
              Veja abaixo uma lista de despesas usadas para auxiliar na criação
              das suas despesas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2  gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Card className="bg-background p-3  ">
              <CardTitle className="flex items-center text-sm">
                <ShoppingBasket className="mr-2 h-3 w-3" /> Mercado
              </CardTitle>
            </Card>
            <Card className="bg-background p-3  ">
              <CardTitle className="flex items-center text-sm">
                <ShoppingBag className="mr-2 h-3 w-3" /> Shopping
              </CardTitle>
            </Card>
            <Card className="bg-background p-3  ">
              <CardTitle className="flex items-center text-sm">
                <CarFront className="mr-2 h-3 w-3" /> Gasolina
              </CardTitle>
            </Card>
            <Card className="bg-background p-3  ">
              <CardTitle className="flex items-center text-sm">
                <Pizza className="mr-2 h-3 w-3" /> Lanches
              </CardTitle>
            </Card>
            <Card className="bg-background p-3  ">
              <CardTitle className="flex items-center text-sm">
                <Sun className="mr-2 h-3 w-3" /> Praia
              </CardTitle>
            </Card>
            <Card className="bg-background p-3  ">
              <CardTitle className="flex items-center text-sm">
                <Gift className="mr-2 h-3 w-3" /> Presentes
              </CardTitle>
            </Card>
          </CardContent>
        </Card>
      </DashboardPageMain>
    </DashboardPage>
  );
}
