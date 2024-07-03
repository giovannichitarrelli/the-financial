import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import {
  getTotalExpenses,
  getTotalSalary,
} from "../../_components/_helpers/totals";
import { MonthExpenses } from "./month-expenses";
import { MonthReceived } from "./month-received";
import ResumeList from "./resume-list";

const ResumeLists = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const totalSalary = await getTotalSalary(currentMonth, currentYear);
  const totalExpenses = await getTotalExpenses(currentMonth, currentYear);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ResumeList
        title="Receitas no mês"
        description={`  Você tem ${formatCurrency(totalSalary)} previstos para
                          receber esse mês.`}
        component={<MonthReceived />}
      />
      <ResumeList
        title="Despesas no mês"
        description={`Você tem ${formatCurrency(totalExpenses)} de despesas
                      previstas esse mês.`}
        component={<MonthExpenses />}
      />
    </div>
  );
};

export default ResumeLists;
