"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { TransactionEssentialType } from "@prisma/client";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import PercentageItem from "../percentage-item";
import { TransactionEssentialPercentagePerType } from "@/app/dashboard/_actions/data/get-dashboard/types";

const chartConfig = {
  [TransactionEssentialType.ESSENTIAL]: {
    label: "Essential",
    color: "#00CC66",
  },
  [TransactionEssentialType.NOT_ESSENTIAL]: {
    label: "Non-essential",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  essentialTypesPercentage: TransactionEssentialPercentagePerType;
  essentialsTotal: number;
  notEssentialsTotal: number;
}

const TransactionsEssentialsPieChart = ({
  essentialsTotal,
  notEssentialsTotal,
  essentialTypesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionEssentialType.ESSENTIAL,
      amount: essentialsTotal,
      fill: "#2dd4bf",
      stroke: "#2dd4bf",
      strokeOpacity: 0.8,
      strokeWidth: 5,
    },
    {
      type: TransactionEssentialType.NOT_ESSENTIAL,
      amount: notEssentialsTotal,
      fill: "#0d9488",
      stroke: "#0d9488",
      strokeOpacity: 0.8,
      strokeWidth: 5,
    },
  ];
  return (
    <Card className="flex flex-col  ">
      <CardHeader>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2 font-medium leading-none">
              {essentialTypesPercentage[
                TransactionEssentialType.NOT_ESSENTIAL
              ] > 30 ? (
                <>
                  <span>You need to pay attention to your expenses! </span>
                  <TrendingDownIcon className="h-4 w-4 text-red-500" />
                </>
              ) : (
                <>
                  <span>Your expenses are well managed!</span>
                  <TrendingDownIcon className="h-4 w-4 text-green-500" />
                </>
              )}
            </div>

            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {essentialTypesPercentage[
                TransactionEssentialType.NOT_ESSENTIAL
              ] > 20 ? (
                <span>Non-essential are above 30%! 😥</span>
              ) : (
                <span>Congratulations! You are spending wisely! 🥳 </span>
              )}
            </div>
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

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Essential"
            value={essentialTypesPercentage[TransactionEssentialType.ESSENTIAL]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Non-essential"
            value={
              essentialTypesPercentage[TransactionEssentialType.NOT_ESSENTIAL]
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsEssentialsPieChart;
