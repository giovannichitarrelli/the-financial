import { Badge } from "@/app/_components/ui/badge";
import { Transactions, TransactionType } from "@prisma/client";

interface TransactionTypeBadgeProps {
  transaction: Transactions;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return <Badge className="bg-primary">DEPÓSITO</Badge>;
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return <Badge className="bg-red-500  hover:bg-red-500">DESPESA</Badge>;
  }
  return <Badge className=" bg-white   hover:bg-white ">INVESTIMENTO</Badge>;
};

export default TransactionTypeBadge;
