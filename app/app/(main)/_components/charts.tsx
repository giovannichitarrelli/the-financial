import ChartsCards from "./charts-cards";
import {
  MonthComparative,
  OverviewExpenses,
  PizzaChart,
  PizzaChartYear,
  ProgressChartsYear,
} from "./charts/data-charts";
import { CurrentMonth } from "./current-month-name";

const Charts = () => {
  return (
    <>
      <ChartsCards title="Overview geral" component={<MonthComparative />} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartsCards
          title="Gastos por categoria"
          component={<PizzaChartYear />}
        />
        <ChartsCards
          title="Gastos por categoria /  "
          month={<CurrentMonth />}
          component={<PizzaChart />}
        />
        <ChartsCards
          title="Progresso de metas"
          component={<ProgressChartsYear />}
        />
      </div>

      <ChartsCards title="Resumo de gastos" component={<OverviewExpenses />} />
    </>
  );
};

export default Charts;
