import {
  calculateGoalsProgress,
  getTotalExpenses,
  getTotalInvestments,
  getTotalSalary,
} from "@/app/app/_components/_helpers/totals";
import {
  PizzaCharts,
  ComparativeBarCHarts,
  ExpensesBarCharts,
  PizzaChartsYear,
  ProgressChartYear,
} from "./bar-charts";
import {
  getCategories,
  getUserMonthExpenses,
  getUserYearExpenses,
} from "@/app/app/despesas/actions";

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export async function MonthComparative() {
  const currentYear = new Date().getFullYear();
  const dataPromises = monthNames.map(async (monthName, index) => {
    const totalInvestments = await getTotalInvestments(index + 1, currentYear);
    const totalSalary = await getTotalSalary(index + 1, currentYear);
    const totalExpenses = await getTotalExpenses(index + 1, currentYear);
    return {
      name: monthName,
      Despesas: totalExpenses || 0,
      Receitas: totalSalary || 0,
      Investimentos: totalInvestments || 0,
    };
  });
  const data = await Promise.all(dataPromises);
  return <ComparativeBarCHarts data={data} />;
}

export async function OverviewExpenses() {
  const currentYear = new Date().getFullYear();
  const dataPromises = monthNames.map(async (monthName, index) => {
    const totalExpenses = await getTotalExpenses(index + 1, currentYear);
    return {
      name: monthName,
      Despesas: totalExpenses || 0,
    };
  });
  const data = await Promise.all(dataPromises);
  return <ExpensesBarCharts data={data} />;
}

export async function PizzaChart() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const categories = await getCategories();
  const expenses = await getUserMonthExpenses(currentMonth, currentYear);

  const categoryColorsMap = new Map<string, string>();
  categories.forEach((categories) => {
    categoryColorsMap.set(categories.id, categories.color);
  });

  const categoryTotals = categories.map((categories) => {
    const total = expenses
      .filter((expense) => expense.categoriesId === categories.id)
      .reduce((acc, expense) => acc + Number(expense.price), 0);
    return {
      name: categories.title,
      value: total,
      colors: categoryColorsMap.get(categories.id) || "red",
    };
  });
  const filteredCategoryTotals = categoryTotals.filter(
    (category) => category.value > 0,
  );
  return (
    <div>
      <PizzaCharts data={filteredCategoryTotals} />
    </div>
  );
}
export async function PizzaChartYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const categories = await getCategories();
  const expenses = await getUserYearExpenses(currentYear);

  const categoryColorsMap = new Map<string, string>();
  categories.forEach((category) => {
    categoryColorsMap.set(category.id, category.color);
  });

  const categoryTotals = categories.map((category) => {
    const total = expenses
      .filter((expense) => expense.categoriesId === category.id)
      .reduce((acc, expense) => acc + Number(expense.price), 0);
    return {
      name: category.title,
      value: total,
      colors: categoryColorsMap.get(category.id) || "black",
    };
  });
  const filteredCategoryTotals = categoryTotals.filter(
    (category) => category.value > 0,
  );
  return <PizzaChartsYear data={filteredCategoryTotals} />;
}

export async function ProgressChartsYear() {
  const progress = await calculateGoalsProgress();
  return <ProgressChartYear progress={Number(progress)} />;
}
