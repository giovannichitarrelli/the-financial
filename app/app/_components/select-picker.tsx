/* eslint-disable no-unused-vars */

"use client";
import * as React from "react";
import { format, addYears, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useState } from "react";

interface SelectYearPickerProps {
  className?: string;
  onSelectYear: (selectedYear: string) => void;
}
export function SelectYearPickerFilter({
  className,
  onSelectYear,
}: SelectYearPickerProps) {
  const [selectedYear, setSelectedYear] = useState<string>(
    format(new Date(), "yyyy"),
  );

  const currentDate = new Date();
  const years = Array.from({ length: 7 }, (_, index) => {
    const year = addYears(currentDate, index);
    return {
      value: format(year, "yyyy"),
      label: format(year, "yyyy", { locale: ptBR }),
    };
  });

  const handleYearChange = (selectedYear: string) => {
    setSelectedYear(selectedYear);
    onSelectYear(selectedYear);
  };

  return (
    <div className={`w-[100px]`}>
      <Select
        onValueChange={handleYearChange}
        defaultValue={selectedYear}
        value={selectedYear}
      >
        <SelectTrigger>
          <SelectValue placeholder="selecionar" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year.value} value={year.value}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface SelectMonthPickerProps {
  className?: string;
  onSelectMonth: (selectedMonth: string) => void;
}

export function SelectMonthFilter({
  className,
  onSelectMonth,
}: SelectMonthPickerProps) {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(currentDate, "MM"),
  );

  const months = Array.from({ length: 12 }, (_, index) => {
    const month = addMonths(currentDate, index);
    return {
      value: format(month, "MM"),
      label:
        format(month, "MMMM", { locale: ptBR }).charAt(0).toUpperCase() +
        format(month, "MMMM", { locale: ptBR }).slice(1),
    };
  });

  const handleMonthChange = (selectedMonth: string) => {
    setSelectedMonth(selectedMonth);
    onSelectMonth(selectedMonth);
  };

  return (
    <div className={`w-[120px]`}>
      <Select
        onValueChange={handleMonthChange}
        value={selectedMonth}
        defaultValue={selectedMonth}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={
              months.find((month) => month.value === selectedMonth)?.label
            }
          />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// SEM FILTRO FUNCIONANDO //////////////////////////////////////
// export function SelectYearPicker({
//   className,
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const [date, setDate] = React.useState<any>({
//     from: new Date(),
//   });

//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();

//   const years = Array.from({ length: 7 }, (_, index) => {
//     const year = addYears(new Date(), index);
//     return {
//       value: format(year, "yyyy"),
//       label: format(year, "yyyy", { locale: ptBR }),
//     };
//   });

//   return (
//     <div className={`w-[100px] `}>
//       <Select>
//         <SelectTrigger>
//           <SelectValue placeholder={currentYear.toString()} />
//         </SelectTrigger>
//         <SelectContent>
//           {years.map((year) => (
//             <SelectItem key={year.value} value={year.value}>
//               {year.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

// export function SelectMonthPicker({
//   className,
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();

//   const [selectedMonth, setSelectedMonth] = useState<string>(
//     format(currentDate, "MM")
//   );

//   const months = Array.from({ length: 12 }, (_, index) => {
//     const monthDate = new Date(currentYear, index, 1);
//     return {
//       value: format(monthDate, "MM"),
//       label:
//         format(monthDate, "MMMM", { locale: ptBR }).charAt(0).toUpperCase() +
//         format(monthDate, "MMMM", { locale: ptBR }).slice(1),
//     };
//   });

//   const handleMonthChange = (selectedMonth: string) => {
//     setSelectedMonth(selectedMonth);
//     console.log(selectedMonth);
//   };

//   return (
//     <div className={`w-[120px]`}>
//       <Select
//         onValueChange={handleMonthChange}
//         value={selectedMonth}
//         defaultValue={selectedMonth}
//       >
//         <SelectTrigger>
//           <SelectValue placeholder={selectedMonth.toString()} />
//         </SelectTrigger>
//         <SelectContent>
//           {months.map((month) => (
//             <SelectItem key={month.value} value={month.value}>
//               {month.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }
