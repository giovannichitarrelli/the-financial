"use client";

import { useRouter } from "next/navigation";
import { Investments } from "../../types";
import { deleteInvestments, upsertInvestments } from "../actions";
import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import DropdownMenuComponent from "../../_components/dropdown-data-table";
import { StatusPayment } from "../../_components/status";
import { toast } from "sonner";

type InvestmentsDataTableProps = {
  data: Investments[];
};

export function InvestmentsDataTable({ data }: InvestmentsDataTableProps) {
  const router = useRouter();

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
    location.reload();
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
    location.reload();

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-3">
      {data.map((investments) => {
        return (
          <Card key={investments.id}>
            <CardContent className="flex flex-col gap-2 p-3">
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-4">
                  <h2 className="font-bold">{investments.title}</h2>

                  <div>
                    <StatusPayment doneAt={investments.doneAt} />
                  </div>
                </div>

                <DropdownMenuComponent
                  onToggleDone={() => handleToggleDoneInvestments(investments)}
                  onDelete={() => handleDeleteInvestments(investments)}
                />
              </div>

              <p className="text-sm font-bold text-primary">
                {formatCurrency(Number(investments.price))}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
