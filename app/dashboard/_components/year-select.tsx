"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface YearSelectProps {
  availableYears: string[];
}

const YearSelect = ({ availableYears }: YearSelectProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const handleYearChange = (newYear: string) => {
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", newYear);

    // Preservar todos os parâmetros de filtro se existirem
    if (month) {
      params.set("month", month);
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

  // Se não houver anos disponíveis, não renderizar o componente
  if (availableYears.length === 0) {
    return null;
  }

  // Usar o ano da URL ou o ano atual (ou primeiro disponível)
  const currentYear =
    year ||
    (availableYears.includes(new Date().getFullYear().toString())
      ? new Date().getFullYear().toString()
      : availableYears[0]);

  return (
    <Select
      onValueChange={(value) => handleYearChange(value)}
      value={currentYear}
    >
      <SelectTrigger className="bg-muted">
        <SelectValue placeholder="Ano" />
      </SelectTrigger>

      <SelectContent>
        {availableYears.map((yearOption) => (
          <SelectItem key={yearOption} value={yearOption}>
            {yearOption}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearSelect;
