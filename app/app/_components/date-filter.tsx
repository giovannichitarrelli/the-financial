"use client";
import { DateRange } from "react-day-picker";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addMonths, format, startOfDay } from "date-fns";
import { ChevronDown } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { useState } from "react";
import { Calendar } from "@/app/_components/ui/calendar";
import { formatDateRange } from "@/app/_lib/utils";
import { ptBR } from "date-fns/locale";
import React from "react";

const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = startOfDay(addMonths(new Date(), 1));
  const defaultFrom = startOfDay(new Date());

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };
  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: dateRange?.from
        ? format(dateRange.from, "dd LLL, yyyy")
        : undefined,
      to: dateRange?.to ? format(dateRange.to, "dd LLL, yyyy") : undefined,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    );
    router.push(url);
  };

  const onReset = () => {
    pushToUrl({ from: undefined, to: undefined });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none
        transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 lg:w-auto " align="start">
        <Calendar
          numberOfMonths={1}
          locale={ptBR}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
        />
        <div className="flex w-full items-center gap-x-2 p-4">
          <PopoverClose asChild>
            <Button
              onClick={onReset}
              disabled={!date?.from || !date?.to}
              className="w-full"
              variant="outline"
            >
              Remover
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => pushToUrl(date)}
              disabled={!date?.from || !date?.to}
              className="w-full"
            >
              Filtrar
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
