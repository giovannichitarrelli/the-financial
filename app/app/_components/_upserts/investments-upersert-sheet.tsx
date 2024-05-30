"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { upsertInvestmentsSchema } from "../../investimentos/schema";
import { upsertInvestments } from "../../investimentos/actions";
import { CirclePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function InvestmentsUpsertSheet() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(upsertInvestmentsSchema),
  });
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const onSubmit = form.handleSubmit(async (data) => {
    setSheetIsOpen(true);
    try {
      setSheetIsOpen(false);
      await upsertInvestments(data);
      toast.success("Investimento criado com sucesso!", {
        description: "Seus investimentos serão atualizados...",
      });
    } catch (error) {
      toast.error("Seu investimento não foi cadastrado!", {
        description: "Por favor, tente novamente...",
      });
    }
    location.reload();
    router.refresh();
    ref.current?.click();
  });

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="sm">
          <CirclePlus className=" mr-3 h-4 w-4" />
          Investimentos
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <Form {...form}>
          <form onSubmit={onSubmit} className="h-screen">
            <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
              <SheetTitle>Criar Investimento</SheetTitle>
            </SheetHeader>
            <div className="space-y-2 p-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Insira o título do seu investimento"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ammount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Insira o valor do seu investimento"
                        {...field}
                        type="number"
                        value={field.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter className="pt-6">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando
                    </>
                  ) : (
                    "Cadastrar Investimento"
                  )}
                </Button>
              </SheetFooter>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
