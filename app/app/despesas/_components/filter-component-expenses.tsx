"use client";

import { Categories } from "@prisma/client";
import { Expenses } from "../../types";
import { useState } from "react";
import {
  SelectMonthFilter,
  SelectYearPickerFilter,
} from "../../_components/select-picker";
import { ExpensesDataTable } from "./expenses-data-table";
import MsgNoData from "../../_components/no-data-table";
import { getUserMonthExpenses } from "../actions";

interface ClientComponentProps {
  initialMonth: string;
  initialYear: string;
  initialExpenses: Expenses[];
  categories: Categories[];
}

export default function DataFilterExpenses({
  initialMonth,
  initialYear,
  initialExpenses,
  categories,
}: ClientComponentProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [expenses, setExpenses] = useState(initialExpenses);

  const fetchDataForMonthYear = async (month: number, year: number) => {
    try {
      const expensesData = await getUserMonthExpenses(month, year);
      setExpenses(expensesData);
    } catch (error) {
      console.error("Erro ao buscar dados de despesas:", error);
    }
  };

  const handleYearSelect = (selectedYear: string) => {
    setSelectedYear(selectedYear);
    fetchDataForMonthYear(parseInt(selectedMonth), parseInt(selectedYear));
  };

  const handleMonthSelect = (selectedMonth: string) => {
    setSelectedMonth(selectedMonth);
    fetchDataForMonthYear(parseInt(selectedMonth), parseInt(selectedYear));
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <SelectMonthFilter onSelectMonth={handleMonthSelect} />
        <SelectYearPickerFilter onSelectYear={handleYearSelect} />
      </div>
      {expenses.length > 0 ? (
        <ExpensesDataTable data={expenses} categories={categories} />
      ) : (
        <MsgNoData />
      )}
    </>
  );
}
