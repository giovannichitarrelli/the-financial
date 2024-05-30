/* eslint-disable no-unused-vars */

"use client";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

type CalendarDatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};
export function CalendarDatePicker({
  value,
  onChange,
}: CalendarDatePickerProps) {
  const formattedDate = value
    ? format(value, "dd '/' LLLL '/' yyyy", { locale: ptBR })
    : "Escolha a data";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="end">
        <Calendar
          locale={ptBR}
          initialFocus
          mode="single"
          defaultMonth={value}
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
