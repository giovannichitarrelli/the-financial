import { Badge } from "@/app/_components/ui/badge";
import { Investments, InvestmentsType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface Props {
  investments: Investments;
}

const InvestmentTypeBadge = ({ investments }: Props) => {
  if (investments.type === InvestmentsType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (investments.type === InvestmentsType.WITHDRAW) {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger hover:bg-danger hover:bg-opacity-10">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Retirada
      </Badge>
    );
  }
};

export default InvestmentTypeBadge;
