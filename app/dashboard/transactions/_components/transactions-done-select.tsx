"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const DONE_OPTIONS = [
  { value: "true", label: "Pago" },
  { value: "false", label: "Não Pago" },
];

const TransactionsDoneSelect = () => {
  const { push } = useRouter();

  const searchParams = useSearchParams();

  const done = searchParams.get("done");
  const month = searchParams.get("month") || `0${new Date().getMonth() + 1}`;

  const handleDoneChange = (doneValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (doneValue === "all") {
      params.delete("done");
    } else {
      params.set("done", doneValue);
    }

    // Preservar month, year, category e type se existirem
    if (month) {
      params.set("month", month);
    }
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

    push(`/dashboard/transactions?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value) => handleDoneChange(value)}
      defaultValue={done ?? "all"}
    >
      <SelectTrigger className="w-max bg-muted">
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">Status</SelectItem>
        {DONE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TransactionsDoneSelect;
