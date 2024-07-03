import { StatusPayment } from "../../_components/status";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import { getUserMonthSalary } from "../../receitas/actions";
import MsgNoData from "../../_components/no-data-table";

export async function MonthReceived() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const received = await getUserMonthSalary(currentMonth, currentYear);

  return (
    <div>
      {received.length > 0 ? (
        received.slice(-5).map((received) => (
          <div
            key={received.id}
            className=" flex items-center justify-between py-3 md:grid  md:grid-cols-4"
          >
            <p className="text-md font-bold  md:col-span-2">{received.title}</p>
            <div>{formatCurrency(Number(received.price))}</div>
            <div className="text-right">
              <StatusPayment
                doneAt={received.doneAt}
                expiryAt={received.expiryAt}
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
