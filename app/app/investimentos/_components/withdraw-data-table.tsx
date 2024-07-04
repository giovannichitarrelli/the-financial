"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteWithdraws, upsertWithdraws } from "../actions";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Withdraw } from "../../types";
import { toast } from "sonner";
import { StatusPayment } from "../../_components/status";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import DropdownWithdraws from "./dropdown-withdraws";
import { addMonths, startOfDay } from "date-fns";
import MsgNoData from "../../_components/no-data-table";

type WithDrawsDataTableProps = {
  data: Withdraw[];
};

export function WithdrawsDataTable({ data }: WithDrawsDataTableProps) {
  const router = useRouter();
  const params = useSearchParams();

  const from = params.get("from")
    ? new Date(params.get("from")!)
    : startOfDay(new Date());
  const to = params.get("to")
    ? new Date(params.get("to")!)
    : startOfDay(addMonths(new Date(), 1));

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

    router.refresh();
  };

  const filteredData = data.filter((withdraws) => {
    const withdrawsDate = withdraws.expiryAt
      ? new Date(withdraws.expiryAt)
      : new Date(withdraws.createAt);

    return (
      (!from || (withdrawsDate && withdrawsDate >= from)) &&
      (!to || (withdrawsDate && withdrawsDate <= to))
    );
  });

  return (
    <div className="flex flex-col gap-3">
      {filteredData.length > 0 ? (
        filteredData.map((withdraws) => {
          return (
            <Card key={withdraws.id}>
              <CardContent className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-4">
                    <div>
                      <StatusPayment doneAt={withdraws.doneAt} />
                    </div>
                  </div>

                  <DropdownWithdraws
                    onToggleDone={() => handleToggleDoneWithdraws(withdraws)}
                    onDelete={() => handleDeleteWithdraws(withdraws)}
                    withdraws={withdraws}
                  />
                </div>
                <h2 className="font-bold">{withdraws.title}</h2>
                <p className="text-sm font-bold text-red-500">
                  {formatCurrency(Number(withdraws.price))}
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
