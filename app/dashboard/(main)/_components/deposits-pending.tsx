import { Badge } from "@/app/_components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { formatCurrency } from "@/app/_utils/currency";
import { Transactions, TransactionType } from "@prisma/client";
import { AlertCircleIcon } from "lucide-react";

interface Props {
  transactions: Transactions[];
}

const DepositsPending = ({ transactions }: Props) => {
  const getAmountPrefix = (transaction: Transactions) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold">Deposits Pending</CardTitle>
        <Badge variant="outline" className="bg-green-400">
          {formatCurrency(
            transactions.reduce((acc, tx) => acc + Number(tx.amount), 0),
          )}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="flex items-center gap-1   text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  {new Date(transaction.date) < new Date() && (
                    <AlertCircleIcon className="size-4 text-red-500" />
                  )}
                </p>
              </div>
            </div>
            <p className={`text-xs`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default DepositsPending;
