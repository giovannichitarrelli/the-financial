"use client";

import { useState } from "react";
import { getUserMonthInvestments, getUserMonthWithdraws } from "../actions";
import {
  getTotalMonthSaved,
  getTotalSaved,
} from "../../_components/_helpers/totals";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ArrowRightCircle, HandCoins } from "lucide-react";
import { InvestmentsDataTable } from "./investments-data-table";
import { WithdrawsDataTable } from "./withdraw-data-table";
import { Investments, Withdraw } from "../../types";
import {
  SelectMonthFilter,
  SelectYearPickerFilter,
} from "../../_components/select-picker";
import MsgNoData from "../../_components/no-data-table";

interface ClientComponentProps {
  initialMonth: string;
  initialYear: string;
  initialInvestments: Investments[];
  initialWithdraws: Withdraw[];
  initialTotalSaved: string;
  initialTotalMonthSaved: string;
}

export default function FilterComponentInvestments({
  initialMonth,
  initialYear,
  initialInvestments,
  initialWithdraws,
  initialTotalSaved,
  initialTotalMonthSaved,
}: ClientComponentProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [investments, setInvestments] = useState(initialInvestments);
  const [withdraws, setWithdraws] = useState(initialWithdraws);
  const [totalSaved, setTotalSaved] = useState(initialTotalSaved);
  const [totalMonthSaved, setTotalMonthSaved] = useState(
    initialTotalMonthSaved,
  );

  const fetchDataForMonthYear = (month: number, year: number) => {
    Promise.all([
      getUserMonthInvestments(month, year),
      getUserMonthWithdraws(month, year),
      getTotalSaved(),
      getTotalMonthSaved(month, year),
    ])
      .then(
        ([
          investmentsData,
          withdrawsData,
          totalSavedData,
          totalMonthSavedData,
        ]) => {
          setInvestments(investmentsData);
          setWithdraws(withdrawsData);
          setTotalSaved(totalSavedData);
          setTotalMonthSaved(totalMonthSavedData);
        },
      )
      .catch((error) => {
        console.error("Erro ao buscar dados de investimentos:", error);
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
      <div className="flex items-center justify-between gap-2 lg:justify-start">
        <SelectMonthFilter onSelectMonth={handleMonthSelect} />
        <SelectYearPickerFilter onSelectYear={handleYearSelect} />
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-between gap-2 py-2 md:flex-row">
          <p className="flex items-center">
            <HandCoins className="mr-2 h-4 w-4" /> Saldo total:
            <span className="ml-2 font-bold text-blue-500">{totalSaved}</span>
          </p>
          <p className="flex items-center">
            <HandCoins className="mr-2 h-4 w-4" /> Saldo mensal:
            <span className="ml-2 font-bold text-blue-500">
              {totalMonthSaved}
            </span>
          </p>
        </CardContent>
      </Card>

      {investments.length || withdraws.length > 0 ? (
        <>
          <InvestmentsDataTable data={investments} />
          <Card className="border-red-500 shadow-red-500">
            <CardHeader>
              <div className="flex items-center">
                <h3 className="text-lg font-bold"> Saques / Prejuízos</h3>
                <ArrowRightCircle className="ml-2 h-4 w-4 text-red-500" />
              </div>
            </CardHeader>

            {withdraws.length > 0 ? (
              <WithdrawsDataTable data={withdraws} />
            ) : (
              <MsgNoData />
            )}
          </Card>
        </>
      ) : (
        <MsgNoData />
      )}
    </>
  );
}
