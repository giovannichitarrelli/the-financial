import {
  ArrowUpDownIcon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";

interface SummaryCards {
  month: string;
  balance: number;
  depositsTotal: number;
  expensesTotal: number;
  investmentsTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
}: SummaryCards) => {
  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4   *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  xl:grid-cols-2 2xl:grid-cols-4">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Balance</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(balance)}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex   rounded-lg  p-2">
                <ArrowUpDownIcon className="size-5" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <WalletIcon className="size-4" />
              <span className="text-xs text-muted-foreground">
                Balance for this month
              </span>
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Deposits</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(depositsTotal)}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex  rounded-lg p-2">
                <TrendingUpIcon className="size-5 text-green-500" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <TrendingUpIcon className="size-4" />
              <span className="text-xs text-muted-foreground">
                Deposits for this month
              </span>
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Expenses</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(expensesTotal)}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex  rounded-lg p-2">
                <TrendingDownIcon className="size-5  text-red-500" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <TrendingDownIcon className="size-4" />

              <span className="text-xs text-muted-foreground">
                Expenses for this month
              </span>
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Investments</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(investmentsTotal)}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex rounded-lg p-2 ">
                <PiggyBankIcon className="size-5 text-blue-500" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <PiggyBankIcon className="size-4" />
              <span className="text-xs text-muted-foreground">
                Investments for this month
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SummaryCards;
