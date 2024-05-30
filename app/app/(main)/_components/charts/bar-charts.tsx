"use client";
import { BarChart, DonutChart, Legend, ProgressCircle } from "@tremor/react";
import {
  formatCurrency,
  formatCurrencyCharts,
} from "../../../_components/_helpers/formatCurrency";
import React from "react";

interface MonthDataComparative {
  name: string;
  Despesas: number;
  Recebimentos: number;
  Investimentos: number;
}
export function ComparativeBarCHarts({
  data,
}: {
  data: MonthDataComparative[];
}) {
  return (
    <BarChart
      data={data}
      index="name"
      categories={["Despesas", "Recebimentos", "Investimentos"]}
      colors={["red", "green", "blue"]}
      valueFormatter={formatCurrencyCharts}
      yAxisWidth={48}
      noDataText="Sem dados a serem exibidos"
    />
  );
}

interface MonthDataExpenses {
  name: string;
  Despesas: number;
}

export function ExpensesBarCharts({ data }: { data: MonthDataExpenses[] }) {
  return (
    <BarChart
      data={data}
      index="name"
      categories={["Despesas"]}
      colors={["red"]}
      valueFormatter={formatCurrencyCharts}
      yAxisWidth={48}
      noDataText="Sem dados a serem exibidos"
    />
  );
}

interface PizzaChartData {
  name: string;
  value: number;
  colors: string;
}

export function PizzaCharts({ data }: { data: PizzaChartData[] }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center  ">
        <DonutChart
          className="mb-6 "
          variant="pie"
          colors={data.map((category) => category.colors)}
          data={data}
          valueFormatter={formatCurrency}
          noDataText="Sem dados a serem exibidos"
        />

        <Legend
          categories={data.map((category) => category.name)}
          colors={data.map((category) => category.colors)}
        />
      </div>
    </>
  );
}

export function PizzaChartsYear({ data }: { data: PizzaChartData[] }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center  ">
        <DonutChart
          className="mb-6 "
          variant="donut"
          colors={data.map((category) => category.colors)}
          data={data}
          valueFormatter={formatCurrency}
          noDataText="Sem dados a serem exibidos"
        />

        <Legend
          categories={data.map((category) => category.name)}
          colors={data.map((category) => category.colors)}
        />
      </div>
    </>
  );
}

interface ProgressChartData {
  progress: number;
}

export function ProgressChartYear({ progress }: ProgressChartData) {
  return (
    <div className="flex items-center  justify-between gap-4  ">
      <div className="lg:w-3/6  ">
        <ProgressCircle value={progress} size="xl">
          <span className="text-xs font-medium text-slate-200">
            {progress}%
          </span>
        </ProgressCircle>
      </div>

      <div className="lg:w-3/6">
        <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {progress}%
        </p>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Para alcançar suas metas
        </p>
      </div>
    </div>
  );
}
