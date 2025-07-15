import { redirect } from "next/navigation";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

import ExpensesPerCategory from "./_components/charts/expenses-per-category";
import PaymentPending from "./_components/payment-pending";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import SummaryCards from "./_components/summary-cards";
import TransactionsPieChart from "./_components/charts/transactions-pie-chart";

import AiReportButton from "./_components/ai-report-button";
import DepositsPending from "./_components/deposits-pending";
import { ChartAreaInteractive } from "@/app/dashboard/(main)/_components/charts/chart-area-interactive";
import TransactionsEssentialsPieChart from "./_components/charts/essentials-pie-chart";
import MemberExpensesPieChart from "./_components/charts/member-expenses-chart";
import { getDashboard, getYearDashboard } from "../_actions/data/get-dashboard";
import MemberDepositsPieChart from "./_components/charts/member-deposits-chart";
interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const session = await getServerSession(auth);
  if (!session) {
    redirect("/auth");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/dashboard?month=0${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);

  const currentYear = new Date().getFullYear().toString();
  const yearDashboard = await getYearDashboard(currentYear);

  return (
    <>
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 lg:px-6">
        <div className="flex items-center justify-between gap-4  ">
          <AiReportButton month={month} />
          <TimeSelect />
        </div>

        <SummaryCards month={month} {...dashboard} />

        <ChartAreaInteractive yearlyData={yearDashboard.yearlyData} />

        <div className="grid  grid-cols-1 gap-4   lg:grid-cols-3">
          <ExpensesPerCategory
            totalExpensePerCategory={dashboard.totalExpensePerCategory}
          />
          <MemberExpensesPieChart
            totalExpensePerMember={dashboard.totalExpensePerMember}
          />
          <MemberDepositsPieChart
            totalDepositsPerMember={dashboard.totalDepositsPerMember}
          />
        </div>

        <div className="grid  grid-cols-1 gap-4   lg:grid-cols-2">
          <TransactionsPieChart {...dashboard} />
          <TransactionsEssentialsPieChart {...dashboard} />
        </div>

        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
          <PaymentPending transactions={dashboard.paymentPending} />
          <DepositsPending transactions={dashboard.depositsPending} />
        </div>
      </div>
    </>
  );
};

export default Home;
