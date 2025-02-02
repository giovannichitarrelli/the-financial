"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { TRANSACTION_CATEGORY_OPTIONS } from "@/app/_constants/transactions";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORY_OPTIONS = TRANSACTION_CATEGORY_OPTIONS;

const TransactionsCategorySelect = () => {
  const { push } = useRouter();

  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const month = searchParams.get("month") || `0${new Date().getMonth() + 1}`;

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    params.set("month", month);
    push(`/app/transactions?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value) => handleCategoryChange(value)}
      defaultValue={category ?? ""}
    >
      <SelectTrigger className="w-max rounded-full bg-muted">
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>

      <SelectContent>
        {CATEGORY_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TransactionsCategorySelect;
