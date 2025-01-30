"use client";

import { Transactions } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-badge";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import EditTransactionButton from "../_components/edit-transaction-button";
import DeleteTransactionButton from "../_components/delete-transaction-button";
import TransactionEssentialTypeBadge from "../_components/type-essential-badge";
import DoneBadge from "../_components/done-badge";
import FixedBadge from "../_components/fixed-badge";

export const transactionColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "essentialType",
    header: "Necessidade",
    cell: ({ row: { original: transaction } }) => (
      <TransactionEssentialTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "done",
    header: "Pago",
    cell: ({ row: { original: transaction } }) => (
      <DoneBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "isFixed",
    header: "Recorrência",
    cell: ({ row: { original: transaction } }) => (
      <FixedBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />

          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];
