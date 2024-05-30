import { StatusPayment } from "../../_components/status";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import { getUserMonthSalary } from "../../recebidos/actions";
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
          <div key={received.id} className="grid grid-cols-4 py-3">
            <p className="text-md col-span-2  font-bold">{received.title}</p>

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
