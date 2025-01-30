"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_utils/currency";
import { Investments } from "@prisma/client";
import DoneInvestmentsBadge from "./done-investment-badge";
import EditInvestmentsButton from "./edit-investment-button";
import DeleteInvestmentsButton from "./delete-investment-button";
import InvestmentObjectTypeBadge from "./type-object-investment-badge";
import InvestmentTypeBadge from "./type-investment-badge";

interface Props {
  investments: Investments;
}
const CardsInvestments = ({ investments }: Props) => {
  return (
    <Card key={investments.id}>
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DoneInvestmentsBadge investments={investments} />
            <p className="text-xs">
              {new Date(investments.createAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="space-x-1">
            <EditInvestmentsButton investments={investments} />

            <DeleteInvestmentsButton investmentId={investments.id} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="font-bold">{investments.title}</h2>
          <p className="text-sm font-bold text-primary">
            {formatCurrency(Number(investments.amount))}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <InvestmentTypeBadge investments={investments} />

          <InvestmentObjectTypeBadge investments={investments} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardsInvestments;
