"use client";
import { Categories } from "@prisma/client";
import { Expenses } from "../../types";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteExpenses, upsertExpenses } from "../actions";
import { Card, CardContent } from "@/app/_components/ui/card";
import { StatusFixed, StatusPayment } from "../../_components/status";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import { toast } from "sonner";
import DropdownExpenses from "./dropdown-expenses";
import { addMonths, startOfDay } from "date-fns";
import MsgNoData from "../../_components/no-data-table";

type ExpensesDataTableProps = {
  data: Expenses[];
  categories: Categories[];
};
export function ExpensesDataTable({
  data,
  categories,
}: ExpensesDataTableProps) {
  const router = useRouter();
  const params = useSearchParams();

  const from = params.get("from")
    ? new Date(params.get("from")!)
    : startOfDay(new Date());
  const to = params.get("to")
    ? new Date(params.get("to")!)
    : startOfDay(addMonths(new Date(), 1));

  const categoryMap = Object.fromEntries(
    categories.map((category: Categories) => [category.id, category.title]),
  );

  const handleDeleteExpenses = async (expenses: Expenses) => {
    try {
      await deleteExpenses({ id: expenses.id });
      toast.success("Sua despesa foi deletada com sucesso!", {
        description: "Suas despesas serão atualizados...",
      });
    } catch (error) {
      toast.error("Sua despesa não foi deletada!", {
        description: "Por favor, tente novamente...",
      });
    }
    router.refresh();
  };
  const handleToggleDoneExpenses = async (expenses: Expenses) => {
    const doneAt = expenses.doneAt ? null : new Date();

    try {
      await upsertExpenses({ id: expenses.id, doneAt });
      toast.success("Sua despesa foi atualizada com sucesso!", {
        description: "Suas despesas serão atualizados...",
      });
    } catch (error) {
      toast.error("Sua despesa não foi atualizada!", {
        description: "Por favor, tente novamente...",
      });
    }
    router.refresh();
  };

  const filteredData = data.filter((expense) => {
    const expenseDate = expense.expiryAt
      ? new Date(expense.expiryAt)
      : new Date(expense.createAt);

    return (
      (!from || (expenseDate && expenseDate >= from)) &&
      (!to || (expenseDate && expenseDate <= to))
    );
  });

  return (
    <div className="flex flex-col gap-3">
      {filteredData.length > 0 ? (
        filteredData.map((expenses) => (
          <Card key={expenses.id}>
            <CardContent className="flex flex-col gap-2 p-3">
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <StatusPayment
                    doneAt={expenses.doneAt}
                    expiryAt={expenses.expiryAt}
                  />
                  <StatusFixed isFixed={expenses.isFixed} />
                </div>
                <DropdownExpenses
                  onToggleDone={() => handleToggleDoneExpenses(expenses)}
                  onDelete={() => handleDeleteExpenses(expenses)}
                  expense={expenses}
                  categories={categories}
                />
              </div>
              <h2 className="font-bold">{expenses.title}</h2>
              <p className="text-sm">
                Categoria:{" "}
                {expenses.categoriesId
                  ? categoryMap[expenses.categoriesId]
                  : "Sem categoria"}
              </p>
              <p className="text-sm">
                Vencimento:{" "}
                {expenses.expiryAt
                  ? expenses.expiryAt.toLocaleDateString("pt-br")
                  : "Sem vencimento"}
              </p>
              <p className="text-sm font-bold text-primary">
                {formatCurrency(Number(expenses.price))}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <MsgNoData />
      )}
    </div>
  );
}
