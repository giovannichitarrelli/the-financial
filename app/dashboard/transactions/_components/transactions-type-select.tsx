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
    params.set("type", type);

    // Preservar month, year e done se existirem
    if (month) {
      params.set("month", month);
    }
    const year = searchParams.get("year");
    if (year) {
      params.set("year", year);
    }
    const done = searchParams.get("done");
    if (done) {
      params.set("done", done);
    }

    push(`/dashboard/transactions?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value) => handleTypeChange(value)}
      defaultValue={type ?? ""}
    >
      <SelectTrigger className="w-max  bg-muted">
        <SelectValue placeholder="Type" />
      </SelectTrigger>

      <SelectContent>
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
