/* eslint-disable no-unused-vars */
"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_utils/currency";
import { Transactions } from "@prisma/client";
import EditTransactionsButton from "../../transactions/_components/edit-transaction-button";
import DeleteTransactionsButton from "../../transactions/_components/delete-transaction-button";
import FixedBadge from "./fixed-badge";
import DoneBadge from "./done-badge";
import TransactionTypeBadge from "./type-badge";
import TransactionEssentialTypeBadge from "./type-essential-badge";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";

interface Props {
  transactions: Transactions;
}
const CardsTransactions = ({ transactions }: Props) => {
  return (
    <Card key={transactions.id}>
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DoneBadge transaction={transactions} />
            <p className="text-xs">
              {new Date(transactions.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="space-x-1">
            <EditTransactionsButton transaction={transactions} />

            <DeleteTransactionsButton transactionId={transactions.id} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="font-bold">{transactions.name}</h2>
          <p className="text-sm font-bold text-primary">
            {formatCurrency(Number(transactions.amount))}
          </p>
        </div>

        <div className="text-sm">
          <span className="mr-1 font-semibold  text-muted-foreground ">
            {" "}
            Categoria:{" "}
          </span>
          <span className="text-primary">
            {" "}
            {TRANSACTION_CATEGORY_LABELS[transactions.category]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <TransactionTypeBadge transaction={transactions} />

          <FixedBadge transaction={transactions} />

          <TransactionEssentialTypeBadge transaction={transactions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardsTransactions;
