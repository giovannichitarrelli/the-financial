"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

export const description = "An interactive area chart";

const chartConfig = {
  deposits: {
    label: "Deposits",
    color: "#042f2e",
  },
  expenses: {
    label: "Expenses",
    color: "#0f766e",
  },
  investments: {
    label: "Investments",
    color: "#2dd4bf",
  },
} satisfies ChartConfig;

interface Props {
  yearlyData: Array<{
    month: string;
    deposits: number;
    expenses: number;
    investments: number;
  }>;
}

export function ChartAreaInteractive({ yearlyData }: Props) {
  // Extrair anos únicos com transações
  const availableYears = React.useMemo(() => {
    const yearsWithTransactions = new Set<string>();
    yearlyData.forEach((item) => {
      // Verificar se há transações (depósitos, despesas ou investimentos) no mês
      if (item.deposits > 0 || item.expenses > 0 || item.investments > 0) {
        const year = item.month.split("-")[0]; // Extrair o ano de "YYYY-MM"
        yearsWithTransactions.add(year);
      }
    });
    return Array.from(yearsWithTransactions).sort(
      (a, b) => parseInt(b) - parseInt(a),
    ); // Ordenar do mais recente ao mais antigo
  }, [yearlyData]);

  // Definir o ano inicial como o mais recente com transações, ou o ano atual se não houver transações
  const [selectedYear, setSelectedYear] = React.useState(
    availableYears[0] || new Date().getFullYear().toString(),
  );

  const filteredData = yearlyData.filter((item) =>
    item.month.startsWith(selectedYear),
  );
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <span className="text-sm">Total Balance</span>
          <CardDescription>
            Showing total balance for the year selected
          </CardDescription>
        </div>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDeposits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#042f2e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#042f2e" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillInvestments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const [, month] = value.split("-");
                const monthNames = [
                  "Jan",
                  "Fev",
                  "Mar",
                  "Abr",
                  "Mai",
                  "Jun",
                  "Jul",
                  "Ago",
                  "Set",
                  "Out",
                  "Nov",
                  "Dez",
                ];
                return monthNames[parseInt(month) - 1];
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    const monthYear = date.toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    });
                    return (
                      monthYear.charAt(0).toUpperCase() + monthYear.slice(1)
                    );
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="deposits"
              type="natural"
              fill="url(#fillDeposits)"
              stroke="#042f2e"
              stackId="a"
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="url(#fillExpenses)"
              stroke="#0f766e"
              stackId="b"
            />
            <Area
              dataKey="investments"
              type="natural"
              fill="url(#fillInvestments)"
              stroke="#2dd4bf"
              stackId="c"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
