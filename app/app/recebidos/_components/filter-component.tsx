"use client";
import { useState } from "react";
import { getUserMonthSalary } from "../actions";
import { SalaryDataTable } from "./salary-data-table";
import { Salary } from "../../types";
import {
  SelectMonthFilter,
  SelectYearPickerFilter,
} from "../../_components/select-picker";
import MsgNoData from "../../_components/no-data-table";

interface ClientComponentProps {
  initialMonth: string;
  initialYear: string;
  initialSalary: Salary[];
}

export default function ClientComponent({
  initialMonth,
  initialYear,
  initialSalary,
}: ClientComponentProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [salary, setSalary] = useState(initialSalary);

  const fetchDataForMonthYear = (month: number, year: number) => {
    getUserMonthSalary(month, year)
      .then((salaryData) => {
        setSalary(salaryData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de salário:", error);
      });
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
      {salary.length > 0 ? <SalaryDataTable data={salary} /> : <MsgNoData />}
    </>
  );
}
