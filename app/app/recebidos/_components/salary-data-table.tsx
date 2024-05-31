"use client";
import { useRouter } from "next/navigation";
import { Salary } from "../../types";
import { deleteSalary, upsertSalary } from "../actions";
import { Card, CardContent } from "@/app/_components/ui/card";
import { StatusFixed, StatusPayment } from "../../_components/status";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import { toast } from "sonner";
import DropdownMenuComponent from "../../_components/dropdown-data-table";

type SalaryDataTableProps = {
  data: Salary[];
};

export function SalaryDataTable({ data }: SalaryDataTableProps) {
  const router = useRouter();

  const handleDeleteSalary = async (salary: Salary) => {
    try {
      await deleteSalary({ id: salary.id });
      toast.success("Seu recebimento foi atualizado com sucesso!", {
        description: "Seus recebimentos serão atualizados...",
      });
    } catch (error) {
      toast.error("Seu recebimento não foi deletado!", {
        description: "Por favor, tente novamente...",
      });
    }
    location.reload();
    router.refresh();
  };

  const handleToggleDoneSalary = async (salary: Salary) => {
    const doneAt = salary.doneAt ? null : new Date();
    try {
      await upsertSalary({ id: salary.id, doneAt });
      toast.success("Seu recebimento foi atualizado com sucesso!", {
        description: "Seus recebimentos serão atualizados...",
      });
    } catch (error) {
      toast.error("Seu recebimento não foi atualizado!", {
        description: "Por favor, tente novamente...",
      });
    }
    location.reload();
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-3">
      {data.map((salary) => {
        return (
          <Card key={salary.id}>
            <CardContent className="flex flex-col gap-2 p-3">
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-4">
                  <h2 className="font-bold">{salary.title}</h2>
                  <StatusPayment
                    doneAt={salary.doneAt}
                    expiryAt={salary.expiryAt}
                  />
                  <StatusFixed isFixed={salary.isFixed} />
                </div>
                <DropdownMenuComponent
                  onToggleDone={() => handleToggleDoneSalary(salary)}
                  onDelete={() => handleDeleteSalary(salary)}
                />
              </div>

              <p className="text-sm">
                Vencimento:{" "}
                {salary.expiryAt
                  ? salary.expiryAt.toLocaleDateString("pt-br")
                  : "Sem vencimento"}
              </p>

              <p className="text-sm font-bold text-primary">
                {formatCurrency(Number(salary.price))}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
