import { redirect } from "next/navigation";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { getServerSession } from "next-auth";
import { auth } from "@/services/auth";
import SummaryCards from "./_components/summary-cards";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import TransactionsEssentialsPieChart from "./_components/essentials-pie-chart";
import AiReportButton from "./_components/ai-report-button";

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
    redirect(`/app?month=0${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex items-center justify-between gap-3">
          <AiReportButton month={month} />
          <TimeSelect />
        </div>

        <div className="grid h-full grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid-cols- grid h-full gap-6 overflow-hidden lg:grid-cols-2">
              <div className="space-y-6">
                <TransactionsPieChart {...dashboard} />
                <TransactionsEssentialsPieChart {...dashboard} />
              </div>

              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
