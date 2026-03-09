"use client";

import { Transactions } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-badge";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_DEPOSIT_CATEGORY_LABELS,
} from "@/app/_constants/transactions";
import EditTransactionButton from "../_components/edit-transaction-button";
import DeleteTransactionButton from "../_components/delete-transaction-button";
import DoneBadge from "../_components/done-badge";
import FixedBadge from "../_components/fixed-badge";

export const createTransactionColumns = (): ColumnDef<Transactions>[] => [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row: { original: transaction } }) => (
      <div className="text-xs">{transaction.name}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <div className="text-xs">
        <TransactionTypeBadge transaction={transaction} />
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria despesa",
    cell: ({ row: { original: transaction } }) => (
      <div className="text-xs">
        {transaction.category !== null
          ? TRANSACTION_CATEGORY_LABELS[
              transaction.category as keyof typeof TRANSACTION_CATEGORY_LABELS
            ]
          : ""}
      </div>
    ),
  },

  {
    accessorKey: "depositCategory",
    header: "Categoria depósito",
    cell: ({ row: { original: transaction } }) => (
      <div className="text-xs">
        {transaction.depositCategory !== null
          ? TRANSACTION_DEPOSIT_CATEGORY_LABELS[
              transaction.depositCategory as keyof typeof TRANSACTION_DEPOSIT_CATEGORY_LABELS
            ]
          : ""}
      </div>
    ),
  },

  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => (
      <div className="text-xs">
        {new Date(transaction.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => (
      <div className="text-xs">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(transaction.amount))}
      </div>
    ),
  },
  {
    accessorKey: "done",
    header: "Pago",
    cell: ({ row: { original: transaction } }) => (
      <div className="text-xs">
        <DoneBadge transaction={transaction} />
      </div>
    ),
  },
  {
    accessorKey: "isFixed",
    header: "Recorrência",
    cell: ({ row: { original: transaction } }) => (
      <div className="text-xs">
        <FixedBadge transaction={transaction} />
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex items-center space-x-1 text-xs">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];
