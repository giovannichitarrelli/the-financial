import { Badge } from "@/app/_components/ui/badge";
import { Transactions, TransactionType } from "@prisma/client";

interface TransactionTypeBadgeProps {
  transaction: Transactions;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="text-green-500" variant="outline">
        Deposit
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="text-red-600" variant="outline">
        Expense
      </Badge>
    );
  }
  return (
    <Badge className=" text-blue-500" variant="outline">
      Investment
    </Badge>
  );
};

export default TransactionTypeBadge;
