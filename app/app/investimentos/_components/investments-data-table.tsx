"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Investments } from "../../types";
import { deleteInvestments, upsertInvestments } from "../actions";
import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import { StatusPayment } from "../../_components/status";
import { toast } from "sonner";
import DropdownInvestments from "./dropdown-investments";
import MsgNoData from "../../_components/no-data-table";
import { addMonths, startOfDay } from "date-fns";

type InvestmentsDataTableProps = {
  data: Investments[];
};

export function InvestmentsDataTable({ data }: InvestmentsDataTableProps) {
  const router = useRouter();
  const params = useSearchParams();

  const from = params.get("from")
    ? new Date(params.get("from")!)
    : startOfDay(new Date());
  const to = params.get("to")
    ? new Date(params.get("to")!)
    : startOfDay(addMonths(new Date(), 1));

  const handleDeleteInvestments = async (investments: Investments) => {
    try {
      await deleteInvestments({ id: investments.id });
      toast.success("Seu investimento foi deletado com sucesso!", {
        description: "Seus investimentos serão atualizados...",
      });
    } catch (error) {
      toast.error("Seu investimento não foi deletado!", {
        description: "Por favor, tente novamente...",
      });
    }
    router.refresh();
  };

  const handleToggleDoneInvestments = async (investments: Investments) => {
    const doneAt = investments.doneAt ? null : new Date();
    try {
      await upsertInvestments({ id: investments.id, doneAt });
      toast.success("Seu investimento foi atualizado com sucesso!", {
        description: "Seus investimentos serão atualizados...",
      });
    } catch (error) {
      toast.error("Seu investimento não foi atualizado!", {
        description: "Por favor, tente novamente...",
      });
    }
    router.refresh();
  };

  const filteredData = data.filter((investments) => {
    const investmentsDate = investments.expiryAt
      ? new Date(investments.expiryAt)
      : new Date(investments.createAt);

    return (
      (!from || (investmentsDate && investmentsDate >= from)) &&
      (!to || (investmentsDate && investmentsDate <= to))
    );
  });

  return (
    <div className="flex flex-col gap-3">
      {filteredData.length > 0 ? (
        filteredData.map((investments) => {
          return (
            <Card key={investments.id}>
              <CardContent className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-2">
                    <div>
                      <StatusPayment doneAt={investments.doneAt} />
                    </div>
                  </div>
                  <DropdownInvestments
                    onToggleDone={() =>
                      handleToggleDoneInvestments(investments)
                    }
                    onDelete={() => handleDeleteInvestments(investments)}
                    investments={investments}
                  />
                </div>
                <h2 className="font-bold">{investments.title}</h2>
                <p className="text-sm font-bold text-primary">
                  {formatCurrency(Number(investments.price))}
                </p>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <MsgNoData />
      )}
    </div>
  );
}
