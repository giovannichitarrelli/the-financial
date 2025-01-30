import { Badge } from "@/app/_components/ui/badge";
import { Transactions } from "@prisma/client";
import { Check, Clock } from "lucide-react";

interface DoneBadgeProps {
  transaction: Transactions;
}

const FixedBadge = ({ transaction }: DoneBadgeProps) => {
  if (transaction.isFixed === true) {
    return (
      <Badge variant="foreground">
        <Check className="mr-2  size-3" />
        Recorrente
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <Clock className="mr-2  size-3" />
      Sem recorrência
    </Badge>
  );
};

export default FixedBadge;
