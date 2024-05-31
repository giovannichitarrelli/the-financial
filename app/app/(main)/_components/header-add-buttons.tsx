import { ExpensesUpsertSheet } from "../../_components/_upserts/expenses-upersert-sheet";
import { SalaryUpsertSheet } from "../../_components/_upserts/salary-upersert-sheet";
import { DashboardPageHeaderNav } from "../../_components/dashboard/dashboard-page";

export function HeaderAddButtons() {
  return (
    <DashboardPageHeaderNav className="hidden items-center space-x-2 lg:flex">
      <ExpensesUpsertSheet />
      <SalaryUpsertSheet />
    </DashboardPageHeaderNav>
  );
}
