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
import { useRef, useState, useEffect } from "react";
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
import { upsertExpensesSchema } from "../../despesas/schema";
import { upsertExpenses, getCategories } from "../../despesas/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { CirclePlus, Loader2 } from "lucide-react";
import { z } from "zod";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Categories } from "@prisma/client";
import { toast } from "sonner";
import { Calendar } from "@/app/_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

export function ExpensesUpsertSheet() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(upsertExpensesSchema),
  });
  const [expiryAt, setExpiryAt] = useState<Date | undefined>(new Date());
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleDateClick = (date: Date | undefined) => {
    setExpiryAt(date);
  };

  function handleChangeCategory(value: string) {
    const selectedIndex = parseInt(value, 10);
    const selectedCategoryId = categories[selectedIndex]?.id || "";
    setSelectedCategory(selectedCategoryId);
  }
  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  async function onSubmit(data: z.infer<typeof upsertExpensesSchema>) {
    try {
      if (data.isFixed) {
        if (!expiryAt) {
          toast.error("Data de expiração é obrigatória para despesa fixa!", {
            description: "Por favor, insira uma data de expiração...",
          });

          throw new Error("Data de expiração é obrigatória para despesa fixa.");
        }
        const selectedDay = expiryAt.getDate();
        const selectedMonth = expiryAt.getMonth();
        const selectedYear = expiryAt.getFullYear();

        await upsertExpenses({
          ...data,
          categoriesId: selectedCategory,
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
          await upsertExpenses({
            ...data,
            categoriesId: selectedCategory,
            expiryAt: newExpiryDate,
          });
        }
      } else {
        await upsertExpenses({
          ...data,
          categoriesId: selectedCategory,
          expiryAt,
        });
      }
      setSheetIsOpen(false);
      toast.success("Despesa criada com sucesso!", {
        description: "Suas despesas serão atualizadas...",
      });
    } catch (error) {
      toast.error("Depesa não foi cadastrada!", {
        description: "Por favor, tente novamente...",
      });
    }
    router.refresh();
    location.reload();
    ref.current?.click();
  }

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="sm">
          <CirclePlus className="mr-3 h-4 w-4" />
          Despesas
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <Form {...form}>
          <ScrollArea>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-screen">
              <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
                <SheetTitle>Criar Despesas</SheetTitle>
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
                  name="categoriesId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Select
                          required
                          name="categories"
                          defaultValue={field.value}
                          onValueChange={handleChangeCategory}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Categorias"
                              id="categories"
                            />
                          </SelectTrigger>

                          <SelectContent>
                            {categories.map((categories, index) => (
                              <SelectItem
                                key={categories.id}
                                value={index.toString()}
                              >
                                {categories.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <Calendar
                          locale={ptBR}
                          mode="single"
                          selected={expiryAt}
                          onSelect={handleDateClick}
                          styles={{
                            head_cell: {
                              width: "100%",
                              textTransform: "capitalize",
                            },
                            cell: {
                              width: "100%",
                            },
                            button: {
                              width: "100%",
                            },
                            nav_button_previous: {
                              width: "32px",
                              height: "32px",
                            },
                            nav_button_next: {
                              width: "32px",
                              height: "32px",
                            },
                            caption: {
                              textTransform: "capitalize",
                            },
                          }}
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
                      <FormLabel>Despesa Fixa</FormLabel>
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

                <SheetFooter className="pb-18 pt-6">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cadastrando
                      </>
                    ) : (
                      "Cadastrar despesa"
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
