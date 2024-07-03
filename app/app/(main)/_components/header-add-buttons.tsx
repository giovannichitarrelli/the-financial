import { ExpensesUpsertSheet } from "../../_components/_upserts/expenses-upersert-sheet";
import { SalaryUpsertSheet } from "../../_components/_upserts/salary-upersert-sheet";
import { DashboardPageHeaderNav } from "../../_components/dashboard/dashboard-page";

export function HeaderAddButtons() {
  return (
    <DashboardPageHeaderNav className="space-x-2">
      <ExpensesUpsertSheet />
      <SalaryUpsertSheet />
    </DashboardPageHeaderNav>
  );
}
