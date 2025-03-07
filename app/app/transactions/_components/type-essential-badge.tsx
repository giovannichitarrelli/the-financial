import { Badge } from "@/app/_components/ui/badge";
import { TransactionEssentialType, Transactions } from "@prisma/client";
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transactions;
}

const TransactionEssentialTypeBadge = ({
  transaction,
}: TransactionTypeBadgeProps) => {
  if (transaction.essentialType === TransactionEssentialType.ESSENTIAL) {
    return (
      <Badge variant="outline">
        <CheckCircleIcon className="mr-1 h-3 w-3" /> ESSENCIAL
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <AlertCircleIcon className="mr-1 h-3 w-3" /> NÃO ESSENCIAL
    </Badge>
  );
};

export default TransactionEssentialTypeBadge;
