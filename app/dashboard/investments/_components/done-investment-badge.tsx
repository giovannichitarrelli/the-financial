import { Badge } from "@/app/_components/ui/badge";
import { Investments } from "@prisma/client";
import { Check, Clock } from "lucide-react";

interface DoneBadgeProps {
  investments: Investments;
}

const DoneInvestmentsBadge = ({ investments }: DoneBadgeProps) => {
  if (investments.done === true) {
    return (
      <Badge>
        <Check className="mr-2  size-3" />
        Done
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <Clock className="mr-2  size-3" />
      Pending
    </Badge>
  );
};

export default DoneInvestmentsBadge;
