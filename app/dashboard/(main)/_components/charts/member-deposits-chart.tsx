"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { Users } from "lucide-react";
import PercentageItem from "../percentage-item";

const memberColors = ["#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#042f2e"];

interface Props {
  totalDepositsPerMember: {
    memberId: string;
    memberName: string;
    totalAmount: number;
    percentageOfTotal: number;
  }[];
}

const MemberDepositsPieChart = ({ totalDepositsPerMember }: Props) => {
  const dynamicChartConfig = totalDepositsPerMember.reduce(
    (acc, member, index) => {
      acc[member.memberName] = {
        label: member.memberName,
        color: memberColors[index % memberColors.length],
      };
      return acc;
    },
    {} as ChartConfig,
  );

  const chartData = totalDepositsPerMember.map((item, index) => ({
    type: item.memberName,
    amount: item.totalAmount,
    fill: memberColors[index % memberColors.length],
    stroke: memberColors[index % memberColors.length],
    name: item.memberName,
    strokeOpacity: 0.8,
    strokeWidth: 5,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2 font-medium leading-none">
              <span>Deposits by family member</span>
              <Users className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <span>Now, you can see deposits by family member! 🤑</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {totalDepositsPerMember.length > 0 ? (
          <>
            <ChartContainer
              config={dynamicChartConfig}
              className="mx-auto aspect-square max-h-[220px]"
            >
              <PieChart className="max-h-[100px] max-w-[100px]">
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
              {totalDepositsPerMember.map((member) => (
                <PercentageItem
                  key={member.memberId}
                  icon={<Users className="h-4 w-4" />}
                  title={member.memberName}
                  value={member.percentageOfTotal}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Users className="mx-auto mb-2 h-12 w-12 opacity-50" />
              <p>No deposit by member</p>
              <p className="text-sm">Add transactions to see the chart</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberDepositsPieChart;
