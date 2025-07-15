"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { TransactionCategory } from "@prisma/client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { SquareActivityIcon } from "lucide-react";

const chartConfig = {
  [TransactionCategory.HOUSING]: {
    label: "Housing",
    color: "#1e293b",
  },
  [TransactionCategory.TRANSPORTATION]: {
    label: "Transportation",
    color: "#facc15",
  },
  [TransactionCategory.FOOD]: {
    label: "Food",
    color: "#0d9488",
  },
  [TransactionCategory.FAST_FOOD]: {
    label: "Fast Food",
    color: "#dc2626",
  },
  [TransactionCategory.ENTERTAINMENT]: {
    label: "Entertainment",
    color: "#86efac",
  },
  [TransactionCategory.PUBLIC_SERVICES]: {
    label: "Public Services",
    color: "#422006",
  },
  [TransactionCategory.COMMUNICATIONS]: {
    label: "Communications",
    color: "#1e40af",
  },
  [TransactionCategory.PERSONAL_CARE]: {
    label: "Personal Care",
    color: "#f472b6",
  },
  [TransactionCategory.SHOPPING]: {
    label: "Shopping",
    color: "#042f2e",
  },

  [TransactionCategory.EDUCATION]: {
    label: "Education",
    color: "#f4f4f5",
  },
  [TransactionCategory.DONATIONS_AND_PRESENTS]: {
    label: "Donations & Presents",
    color: "#f87171",
  },
  [TransactionCategory.SECURITIES]: {
    label: "Securities",
    color: "#09090b",
  },
  [TransactionCategory.SUBSCRIPTIONS]: {
    label: "Subscriptions",
    color: "#c026d3",
  },
  [TransactionCategory.PET]: {
    label: "Pet",
    color: "#facc15",
  },
  [TransactionCategory.HEALTH]: {
    label: "Health",
    color: "#4c0519",
  },
  [TransactionCategory.HOME_RENOVATION]: {
    label: "Home Renovation",
    color: "#f97316",
  },
  [TransactionCategory.OTHER]: {
    label: "Other",
    color: "#64748b",
  },
} satisfies ChartConfig;

interface Props {
  totalExpensePerCategory: {
    category: string;
    totalAmount: number;
    percentageOfTotal: number;
  }[];
}

const ExpensesPerCategory = ({ totalExpensePerCategory }: Props) => {
  const chartData = totalExpensePerCategory.map((item) => ({
    type: item.category,
    amount: item.totalAmount,
    fill:
      chartConfig[item.category as keyof typeof chartConfig]?.color ??
      "#64748b",
    stroke:
      chartConfig[item.category as keyof typeof chartConfig]?.color ??
      "#64748b",
    name: item.category,
  }));

  return (
    <Card className="flex flex-col ">
      <CardHeader>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2 font-medium leading-none">
              <span>Categories for a clearer financial overview.</span>
              <SquareActivityIcon className="h-4 w-4  " />
            </div>

            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <span>Overview complete! 🧐 </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className=" aspect-square">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="amount" nameKey="type" />

            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className=" flex-wrap gap-2 "
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensesPerCategory;
