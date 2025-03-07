import { Badge } from "@/app/_components/ui/badge";
import { Transactions } from "@prisma/client";
import { Check, Clock } from "lucide-react";

interface DoneBadgeProps {
  transaction: Transactions;
}

const DoneBadge = ({ transaction }: DoneBadgeProps) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

  if (transaction.done === true) {
    return (
      <Badge className="bg-blue-800" variant="outline">
        <Check className="mr-1  size-3" />
        CONCLUÍDO
      </Badge>
    );
  }
  if (transaction.done === false && transaction.date < pastDate) {
    return (
      <Badge className="bg-orange-600 " variant="outline">
        <Clock className="mr-1  size-3" />
        ATRASADO
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <Clock className="mr-1  size-3" />
      PENDENTE
    </Badge>
  );
};

export default DoneBadge;
