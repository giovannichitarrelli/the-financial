import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ReactElement } from "react";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import { ProgressBar } from "./progress-bar";

interface CardsProps {
  title: string;
  icon: ReactElement<any>;
  total: number;
  percent: string;
  progress: string;
}
const ResumeCards = ({ title, icon, total, percent, progress }: CardsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <div className="text-2xl font-bold">{formatCurrency(total)}</div>
        <p className="py-2 text-xs text-muted-foreground">{percent}</p>
        <ProgressBar percent={progress} />
      </CardContent>
    </Card>
  );
};

export default ResumeCards;
