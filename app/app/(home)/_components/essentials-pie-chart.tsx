"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/app/_components/ui/card";
import { TransactionEssentialType } from "@prisma/client";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";
import { TransactionEssentialPercentagePerType } from "../../_data/get-dashboard/types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";

const chartConfig = {
  [TransactionEssentialType.ESSENTIAL]: {
    label: "Essencial",
    color: "#00CC66",
  },
  [TransactionEssentialType.NOT_ESSENTIAL]: {
    label: "Não essencial",
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
      fill: "#00CC66",
    },
    {
      type: TransactionEssentialType.NOT_ESSENTIAL,
      amount: notEssentialsTotal,
      fill: "#E93030",
    },
  ];
  return (
    <Card className="flex flex-col  p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Essencial"
            value={essentialTypesPercentage[TransactionEssentialType.ESSENTIAL]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Não essencial"
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
