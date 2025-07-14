"use client";

import { Investments } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DoneInvestmentBadge from "../_components/done-investment-badge";
import EditInvestmentButton from "../_components/edit-investment-button";
import DeleteInvestmentButton from "../_components/delete-investment-button";
import InvestmentTypeBadge from "../_components/type-investment-badge";
import InvestmentObjectTypeBadge from "../_components/type-object-investment-badge";

export const investmentsColumns: ColumnDef<Investments>[] = [
  {
    accessorKey: "title",
    header: "Nome",
  },

  {
    accessorKey: "createAt",
    header: "Data",
    cell: ({ row: { original: investment } }) =>
      new Date(investment.createAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: investment } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(investment.amount)),
  },

  {
    accessorKey: "done",
    header: "Pago",
    cell: ({ row: { original: investment } }) => (
      <DoneInvestmentBadge investments={investment} />
    ),
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: investment } }) => (
      <InvestmentTypeBadge investments={investment} />
    ),
  },
  {
    accessorKey: "object",
    header: "Objetivo",
    cell: ({ row: { original: investment } }) => (
      <InvestmentObjectTypeBadge investments={investment} />
    ),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: investment } }) => {
      return (
        <div className="space-x-1">
          <EditInvestmentButton investments={investment} />

          <DeleteInvestmentButton investmentId={investment.id} />
        </div>
      );
    },
  },
];
