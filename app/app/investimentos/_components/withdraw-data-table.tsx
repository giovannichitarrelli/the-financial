"use client";
import { useRouter } from "next/navigation";
import { deleteWithdraws, upsertWithdraws } from "../actions";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Withdraw } from "../../types";
import { toast } from "sonner";
import { StatusPayment } from "../../_components/status";
import DropdownMenuComponent from "../../_components/dropdown-data-table";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";

type WithDrawsDataTableProps = {
  data: Withdraw[];
};

export function WithdrawsDataTable({ data }: WithDrawsDataTableProps) {
  const router = useRouter();

  const handleDeleteWithdraws = async (withdraws: Withdraw) => {
    try {
      await deleteWithdraws({ id: withdraws.id });
      toast.success("Seu saque foi deletado com sucesso!", {
        description: "Seus saques serão atualizados...",
      });
    } catch (error) {
      toast.error("Seu saque não foi deletado!", {
        description: "Por favor, tente novamente...",
      });
    }
    location.reload();

    router.refresh();
  };

  const handleToggleDoneWithdraws = async (withdraws: Withdraw) => {
    const doneAt = withdraws.doneAt ? null : new Date();
    try {
      await upsertWithdraws({ id: withdraws.id, doneAt });
      toast.success("Seu saque foi atualizado com sucesso!", {
        description: "Seus saques serão atualizados...",
      });
    } catch (error) {
      toast.error("Seu saque não foi atualizado!", {
        description: "Por favor, tente novamente...",
      });
    }
    location.reload();

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-3">
      {data.map((withdraws) => {
        return (
          <Card key={withdraws.id}>
            <CardContent className="flex flex-col gap-2 p-3">
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-4">
                  <h2 className="font-bold">{withdraws.title}</h2>
                  <div>
                    <StatusPayment doneAt={withdraws.doneAt} />
                  </div>
                </div>

                <DropdownMenuComponent
                  onToggleDone={() => handleToggleDoneWithdraws(withdraws)}
                  onDelete={() => handleDeleteWithdraws(withdraws)}
                />
              </div>

              <p className="text-sm font-bold text-red-500">
                {formatCurrency(Number(withdraws.price))}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
