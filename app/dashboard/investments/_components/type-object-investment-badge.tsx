import { Badge } from "@/app/_components/ui/badge";
import { Investments, InvestmentsObjectType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface Props {
  investments: Investments;
}

const InvestmentObjectTypeBadge = ({ investments }: Props) => {
  if (investments.object === InvestmentsObjectType.GOALS) {
    return (
      <Badge variant="outline">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Compras
      </Badge>
    );
  }
  if (investments.object === InvestmentsObjectType.EMERGENCY_RESERVE) {
    return (
      <Badge variant="destructive">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Reserva de emergência
      </Badge>
    );
  }
  if (investments.object === InvestmentsObjectType.OTHER) {
    return (
      <Badge variant="secondary">
        <CircleIcon className="mr-2 fill-secondary" size={10} />
        Outro
      </Badge>
    );
  }

  return (
    <Badge>
      <CircleIcon className="mr-2 fill-foreground" size={10} />
      Aposentadoria
    </Badge>
  );
};

export default InvestmentObjectTypeBadge;
