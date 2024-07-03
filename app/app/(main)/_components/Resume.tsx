import {
  BarChart2,
  CircleArrowRight,
  CircleCheckBig,
  CircleHelp,
} from "lucide-react";
import ResumeCards from "./resume-cards";
import {
  getPercentInvestments,
  getPercentPaid,
  getPercentPendingPaid,
  getPercentSalary,
  getTotalExpenses,
  getTotalInvestments,
  getTotalPaidExpenses,
  getTotalPendingExpenses,
  getTotalReceived,
  getTotalSalary,
} from "../../_components/_helpers/totals";

const Resume = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const totalSalary = await getTotalSalary(currentMonth, currentYear);
  const totalExpenses = await getTotalExpenses(currentMonth, currentYear);

  const totalReceived = await getTotalReceived(currentMonth, currentYear);
  const totalInvestments = await getTotalInvestments(currentMonth, currentYear);
  const totalPaid = await getTotalPaidExpenses(currentMonth, currentYear);
  const totalPending = await getTotalPendingExpenses(currentMonth, currentYear);

  const percentPaid = await getPercentPaid(totalExpenses, totalPaid);
  const percentPendingPaid = await getPercentPendingPaid(
    totalPending,
    totalExpenses,
  );
  const percentInvestments = await getPercentInvestments(
    totalInvestments,
    totalSalary,
  );
  const percentSalary = await getPercentSalary(totalReceived, totalSalary);

  return (
    <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-4">
      <ResumeCards
        title=" Total receitas"
        icon={<CircleCheckBig className="h-4 w-4 text-green-500" />}
        total={totalReceived}
        percent={`${percentSalary}% do total previsto.`}
        progress={percentSalary}
      />

      <ResumeCards
        title="Total Investimentos"
        icon={<BarChart2 className="h-4 w-4 text-yellow-500" />}
        total={totalInvestments}
        percent={`${percentInvestments}% do salário.`}
        progress={percentInvestments}
      />

      <ResumeCards
        title="Pagamentos concluídos"
        icon={<CircleArrowRight className=" h-4 w-4 text-blue-500" />}
        total={totalPaid}
        percent={`${percentPaid}% do total previsto.`}
        progress={percentPaid}
      />

      <ResumeCards
        title="Pagamentos Pendentes"
        icon={<CircleHelp className="h-4 w-4 text-red-500" />}
        total={totalPending}
        percent={`${percentPendingPaid}% do total previsto.`}
        progress={percentPendingPaid}
      />
    </div>
  );
};

export default Resume;
