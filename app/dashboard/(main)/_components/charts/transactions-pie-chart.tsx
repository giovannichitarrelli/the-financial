"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

import { TransactionType } from "@prisma/client";
import { TrendingDownIcon, TrendingUp, TrendingUpIcon } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";

import PercentageItem from "../percentage-item";
import { TransactionPercentagePerType } from "@/app/dashboard/_actions/data/get-dashboard/types";

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    label: "Deposits",
    color: "#2dd4bf",
  },
  [TransactionType.EXPENSE]: {
    label: "Expenses",
    color: "#0d9488",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  depositsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#2dd4bf",
      stroke: "#2dd4bf",
      strokeOpacity: 0.8,
      strokeWidth: 5,
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#0d9488",
      stroke: "#0d9488",
      strokeOpacity: 0.8,
      strokeWidth: 5,
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="w-full text-sm">
          <div className="flex  items-center justify-between gap-2 font-medium leading-none  ">
            {depositsTotal > expensesTotal ? (
              <>
                Deposits are{" "}
                {(
                  (100 * (depositsTotal - expensesTotal)) /
                  (expensesTotal || 1)
                ).toFixed(1)}
                % higher than expenses this month
                <TrendingUp className="h-4 w-4 text-green-500" />
              </>
            ) : depositsTotal < expensesTotal ? (
              <>
                Expenses are{" "}
                {(
                  (100 * (expensesTotal - depositsTotal)) /
                  (depositsTotal || 1)
                ).toFixed(1)}
                % higher than deposits this month
                <TrendingDownIcon className="h-4 w-4 text-red-500" />
              </>
            ) : (
              <>No change this month</>
            )}
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            {depositsTotal > expensesTotal ? (
              <span>Congratulations! 🥳 </span>
            ) : (
              <span>you need to cut down on expenses! 😥</span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1  ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart width={180} height={180}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              outerRadius={80}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Deposits"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Expenses"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
