import { Badge } from "@/app/_components/ui/badge";
import { Transactions } from "@prisma/client";
import { AlertCircleIcon, CheckCircle2Icon, LoaderIcon } from "lucide-react";

interface DoneBadgeProps {
  transaction: Transactions;
}

const DoneBadge = ({ transaction }: DoneBadgeProps) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

  if (transaction.done === true) {
    return (
      <Badge className=" text-xs" variant="outline">
        <CheckCircle2Icon className="mr-1 h-3 w-3 text-green-500 dark:text-green-400" />
        Done
      </Badge>
    );
  }
  if (transaction.done === false && transaction.date < pastDate) {
    return (
      <Badge className=" text-xs" variant="outline">
        <AlertCircleIcon className="mr-1 h-3 w-3 text-red-500" />
        Delayed
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-xs">
      <LoaderIcon className="mr-1 h-3 w-3" />
      In Process
    </Badge>
  );
};

export default DoneBadge;
