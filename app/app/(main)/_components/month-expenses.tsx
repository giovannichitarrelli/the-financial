import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import { getUserMonthExpenses } from "../../despesas/actions";
import { StatusPayment } from "../../_components/status";
import MsgNoData from "../../_components/no-data-table";

export async function MonthExpenses() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const expenses = await getUserMonthExpenses(currentMonth, currentYear);

  return (
    <div>
      {expenses.length > 0 ? (
        expenses.slice(-5).map((expenses) => (
          <div
            key={expenses.id}
            className="flex items-center justify-between bg-red-500 py-3 md:grid md:grid-cols-4"
          >
            <p className="text-md font-bold md:col-span-2">{expenses.title}</p>
            <div>{formatCurrency(Number(expenses.price))}</div>
            <div className="text-right">
              <StatusPayment
                doneAt={expenses.doneAt}
                expiryAt={expenses.expiryAt}
              />
            </div>
          </div>
        ))
      ) : (
        <MsgNoData />
      )}
    </div>
  );
}
