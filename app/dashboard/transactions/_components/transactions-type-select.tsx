"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { TRANSACTION_TYPE_OPTIONS } from "@/app/_constants/transactions";
import { useRouter, useSearchParams } from "next/navigation";

const TYPE_OPTIONS = TRANSACTION_TYPE_OPTIONS;

const TransactionsTypeSelect = () => {
  const { push } = useRouter();

  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const month = searchParams.get("month") || `0${new Date().getMonth() + 1}`;

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "all") {
      params.delete("type");
    } else {
      params.set("type", type);
    }

    // Preservar month, year, category e done se existirem
    if (month) {
      params.set("month", month);
    }
    const year = searchParams.get("year");
    if (year) {
      params.set("year", year);
    }
    const category = searchParams.get("category");
    if (category && category !== "all") {
      params.set("category", category);
    }
    const done = searchParams.get("done");
    if (done && done !== "all") {
      params.set("done", done);
    }

    push(`/dashboard/transactions?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value) => handleTypeChange(value)}
      defaultValue={type ?? "all"}
    >
      <SelectTrigger className="w-max  bg-muted">
        <SelectValue placeholder="Type" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">Tipo</SelectItem>
        {TYPE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TransactionsTypeSelect;
