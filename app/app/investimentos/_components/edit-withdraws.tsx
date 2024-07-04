/* eslint-disable no-unused-vars */
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Edit } from "lucide-react";
import { upsertWithdrawsSchema } from "../schema";
import { upsertWithdraws } from "../actions";

type EditPostProps = {
  withdraws: any;
};
export function EditWithdraws({ withdraws }: EditPostProps) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(upsertWithdrawsSchema),
    defaultValues: {
      title: withdraws.title,
      price: withdraws.price,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await upsertWithdraws({ ...data, id: withdraws.id });
      toast.success("Seu saque foi atualizado com sucesso!", {
        description: "Aguarde o carregamento...",
      });
    } catch (error) {
      toast.error("Seu saque não foi atualizado!", {
        description: "Por favor, tente novamente...",
      });
    }
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-0 w-full justify-start px-2 py-4">
          <Edit className="mr-3 h-4 w-4" /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar cadastramento</DialogTitle>
          <DialogDescription>
            Altere o que for necessário aqui. Clique em salvar quando estiver
            pronto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                {...form.register("title")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Valor
              </Label>
              <Input
                id="price"
                type="number"
                {...form.register("price")}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando
                </>
              ) : (
                "Salvar mudanças"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
