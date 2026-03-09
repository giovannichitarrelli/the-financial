"use client";

import { Transactions } from "@prisma/client";
import { DataTable } from "@/app/_components/ui/data-table";
import { createTransactionColumns } from "../_columns";

interface TransactionsDataTableProps {
  transactions: Transactions[];
}

export function TransactionsDataTable({
  transactions,
}: TransactionsDataTableProps) {
  return (
    <DataTable
      columns={createTransactionColumns()}
      data={JSON.parse(JSON.stringify(transactions))}
    />
  );
}
