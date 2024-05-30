import React from "react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Calendar } from "lucide-react";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const CurrentMonthName = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentMonthName = months[currentMonth - 1];

  return (
    <Card>
      <CardContent className="py-2">
        <p className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" /> Dashboard -
          <span className="ml-2 font-bold">{currentMonthName}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export const CurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentMonthName = months[currentMonth - 1];
  return <p className="font-bold">{currentMonthName}</p>;
};
