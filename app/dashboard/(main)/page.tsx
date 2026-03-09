import { redirect } from "next/navigation";
import TimeSelect from "../_components/time-select";
import YearSelect from "../_components/year-select";
import { isMatch } from "date-fns";
import { getAvailableYears } from "../_actions/data/get-available-years";

import ExpensesPerCategory from "./_components/charts/expenses-per-category";
import PaymentPending from "./_components/payment-pending";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import SummaryCards from "./_components/summary-cards";
import TransactionsPieChart from "./_components/charts/transactions-pie-chart";

import AiReportButton from "./_components/ai-report-button";
import DepositsPending from "./_components/deposits-pending";
import { ChartAreaInteractive } from "@/app/dashboard/(main)/_components/charts/chart-area-interactive";
import { getDashboard, getYearDashboard } from "../_actions/data/get-dashboard";

interface HomeProps {
  searchParams: {
    month: string;
    year?: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const session = await getServerSession(auth);
  if (!session) {
    redirect("/auth");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    redirect(`/dashboard?month=${currentMonth}&year=${currentYear}`);
  }

  // Usar o ano fornecido ou o ano atual
  const selectedYear = year || new Date().getFullYear().toString();

  // Se não houver ano na URL, redirecionar para incluir o ano atual
  if (!year) {
    redirect(`/dashboard?month=${month}&year=${selectedYear}`);
  }

  const dashboard = await getDashboard(month, selectedYear);
  const yearDashboard = await getYearDashboard(selectedYear);

  const availableYears = await getAvailableYears();

  return (
    <>
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 lg:px-6">
        <div className="flex items-center justify-between gap-4  ">
          <AiReportButton month={month} year={selectedYear} />
          <div className="flex items-center gap-2">
            <YearSelect availableYears={availableYears} />
            <TimeSelect />
          </div>
        </div>

        <SummaryCards month={month} {...dashboard} />

        <ChartAreaInteractive yearlyData={yearDashboard.yearlyData} />

        <div className="grid  grid-cols-1 gap-4   lg:grid-cols-2">
          <ExpensesPerCategory
            totalExpensePerCategory={dashboard.totalExpensePerCategory}
          />
          <TransactionsPieChart {...dashboard} />
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
