"use client";

import { Transactions } from "@prisma/client";
import { DataTable } from "@/app/_components/ui/data-table";
import { createTransactionColumns } from "../_columns";

interface TransactionsDataTableProps {
  transactions: Transactions[];
  members: Array<{ id: string; name: string }>;
}

export function TransactionsDataTable({
  transactions,
  members,
}: TransactionsDataTableProps) {
  return (
    <DataTable
      columns={createTransactionColumns(members)}
      data={JSON.parse(JSON.stringify(transactions))}
    />
  );
}
