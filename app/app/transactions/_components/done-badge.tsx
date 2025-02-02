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
      <Badge className="border-blue-500" variant="outline">
        <Check className="mr-2  size-3" />
        Concluído
      </Badge>
    );
  }
  if (transaction.done === false && transaction.date < pastDate) {
    return (
      <Badge className="border-orange-500" variant="outline">
        <Clock className="mr-2  size-3" />
        Atrasado
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <Clock className="mr-2  size-3" />
      Pendente
    </Badge>
  );
};

export default DoneBadge;
