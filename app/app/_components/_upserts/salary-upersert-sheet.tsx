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
import { upsertSalarySchema } from "../../receitas/schema";
import { upsertSalary } from "../../receitas/actions";
import { CirclePlus, Loader2 } from "lucide-react";
import { z } from "zod";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { toast } from "sonner";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { CalendarDatePicker } from "../data-sheet-picker";

export function SalaryUpsertSheet() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(upsertSalarySchema),
  });
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [expiryAt, setExpiryAt] = useState<Date | undefined>(new Date());
  // const handleDateClick = (date: Date | undefined) => {
  //   setExpiryAt(date);
  // };
  async function onSubmit(data: z.infer<typeof upsertSalarySchema>) {
    setSheetIsOpen(true);
    try {
      setSheetIsOpen(false);
      if (data.isFixed) {
        if (!expiryAt) {
          toast.error("Data de expiração é obrigatório para salário fixo!", {
            description: "Por favor, insira uma data de expiração...",
          });
          throw new Error("Data de expiração é obrigatório para receitas");
        }

        const selectedDay = expiryAt.getDate();
        const selectedMonth = expiryAt.getMonth();
        const selectedYear = expiryAt.getFullYear();

        await upsertSalary({
          ...data,
          expiryAt: new Date(selectedYear, selectedMonth, selectedDay),
        });

        for (let i = 1; i < 12; i++) {
          const newExpiryDate = new Date(
            selectedYear,
            selectedMonth + i,
            selectedDay,
          );
          if (newExpiryDate.getFullYear() > selectedYear) {
            break;
          }
          await upsertSalary({
            ...data,
            expiryAt: newExpiryDate,
          });
        }
      } else {
        await upsertSalary({
          ...data,
          expiryAt,
        });
      }
      toast.success("Sua receita foi criada com sucesso!", {
        description: "Suas receitas serão atualizados...",
      });
    } catch (error) {
      toast.error("Sua receita não foi cadastrada!", {
        description: "Por favor, tente novamente...",
      });
    }
    location.reload();
    router.refresh();
    ref.current?.click();
  }

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="sm">
          <CirclePlus className=" mr-3 h-4 w-4" />
          Receitas
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <Form {...form}>
          <ScrollArea>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" h-screen">
              <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
                <SheetTitle>Criar Receita</SheetTitle>
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
                          placeholder="Insira o título"
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Insira o valor"
                          {...field}
                          type="number"
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryAt"
                  render={() => (
                    <FormItem>
                      <FormLabel>Vencimento (Opcional)</FormLabel>
                      <FormControl>
                        <CalendarDatePicker
                          value={expiryAt}
                          onChange={(date) => setExpiryAt(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFixed"
                  render={({ field }) => (
                    <FormItem className="space-x-2">
                      <FormLabel>Salário Fixo</FormLabel>
                      <FormControl>
                        <Checkbox
                          id="isFixed"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <SheetFooter className="  pt-6">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cadastrando
                      </>
                    ) : (
                      "Cadastrar Receita"
                    )}
                  </Button>
                </SheetFooter>
              </div>
            </form>
          </ScrollArea>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
