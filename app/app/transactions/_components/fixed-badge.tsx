import { Badge } from "@/app/_components/ui/badge";
import { Transactions } from "@prisma/client";
import { CheckCircleIcon, AlertCircleIcon } from "lucide-react";

interface DoneBadgeProps {
  transaction: Transactions;
}

const FixedBadge = ({ transaction }: DoneBadgeProps) => {
  if (transaction.isFixed === true) {
    return (
      <Badge variant="outline">
        <CheckCircleIcon className="mr-1 h-3 w-3" /> RECORRENTE
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <AlertCircleIcon className="mr-1 h-3 w-3" /> NÃO RECORRENTE
    </Badge>
  );
};

export default FixedBadge;
