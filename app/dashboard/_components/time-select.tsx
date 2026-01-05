"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  // const handleMonthChange = (month: string) => {
  //   push(`/dashboard?month=${month}`);
  // };

  const handleMonthChange = (month: string) => {
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", month);

    // Preservar todos os parâmetros de filtro se existirem
    const year = searchParams.get("year");
    if (year) {
      params.set("year", year);
    }
    const category = searchParams.get("category");
    if (category) {
      params.set("category", category);
    }
    const type = searchParams.get("type");
    if (type) {
      params.set("type", type);
    }
    const done = searchParams.get("done");
    if (done) {
      params.set("done", done);
    }

    push(`${currentPath}?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={month ?? ""}
    >
      <SelectTrigger className="bg-muted">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>

      <SelectContent>
        {MONTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
