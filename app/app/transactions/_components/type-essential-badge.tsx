import { Badge } from "@/app/_components/ui/badge";
import { TransactionEssentialType, Transactions } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transactions;
}

const TransactionEssentialTypeBadge = ({
  transaction,
}: TransactionTypeBadgeProps) => {
  if (transaction.essentialType === TransactionEssentialType.ESSENTIAL) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Essencial
      </Badge>
    );
  }

  return (
    <Badge className="font bold bg-danger bg-opacity-10 text-danger hover:bg-danger hover:bg-opacity-10">
      <CircleIcon className="mr-2 fill-danger" size={10} />
      Não essencial
    </Badge>
  );
};

export default TransactionEssentialTypeBadge;
