/* eslint-disable no-unused-vars */

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { MoneyInput } from "../../_components/money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_DEPOSIT_CATEGORY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
  TRANSACTION_ESSENTIAL_TYPE_OPTIONS,
} from "../../../_constants/transactions";
import { DatePicker } from "@/app/_components/ui/date-picker";
import { z } from "zod";
import {
  TransactionType,
  TransactionCategory,
  TransactionEssentialType,
  TransactionDepositCategory,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertTransaction } from "../_actions/upsert-transaction";
import { Button } from "@/app/_components/ui/button";
import { Switch } from "@/app/_components/ui/switch";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/app/_components/ui/checkbox";

interface UpsertTransactionDialogProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  transactionId?: string;
  setIsOpen: (isOpen: boolean) => void;
  members: Array<{ id: string; name: string }>;
}

const formSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "O nome é obrigatório.",
    }),
    amount: z
      .number({
        required_error: "O valor é obrigatório.",
      })
      .positive({
        message: "O valor deve ser positivo.",
      }),
    memberId: z.string({
      required_error: "Responsável é obrigatório.",
    }),
    date: z.date({
      required_error: "A data é obrigatória.",
    }),
    isFixed: z.boolean(),
    done: z.boolean(),
    type: z.nativeEnum(TransactionType),
    category: z.nativeEnum(TransactionCategory).nullable().optional(),
    depositCategory: z
      .nativeEnum(TransactionDepositCategory)
      .nullable()
      .optional(),
    essentialType: z.nativeEnum(TransactionEssentialType).nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.type === TransactionType.EXPENSE) {
        return !!data.category && !!data.essentialType;
      }
      if (data.type === TransactionType.DEPOSIT) {
        return !!data.depositCategory;
      }
      return true;
    },
    // {
    //   message: "Preencha todos os campos obrigatórios de acordo com o tipo.",
    //   path: ["category"],
    // },
  );

type FormSchema = z.infer<typeof formSchema>;

const UpsertTransactionDialog = ({
  isOpen,
  defaultValues,
  transactionId,
  setIsOpen,
  members,
}: UpsertTransactionDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 0,
      category: undefined,
      depositCategory: undefined,
      essentialType: undefined,
      date: new Date(),
      name: "",
      memberId: "",
      type: TransactionType.EXPENSE,
      done: false,
      isFixed: false,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (isUpdate) {
      try {
        await upsertTransaction({
          ...data,
          id: transactionId,
          essentialType:
            data.type === TransactionType.EXPENSE
              ? data.essentialType ?? TransactionEssentialType.ESSENTIAL
              : null,
          category:
            data.type === TransactionType.EXPENSE
              ? data.category ?? TransactionCategory.OTHER
              : null,
          depositCategory:
            data.type === TransactionType.DEPOSIT
              ? data.depositCategory ?? TransactionDepositCategory.SALARY
              : null,
        });
        setIsOpen(false);
        return;
      } catch {
        toast.error("Ops... Algo inesperado aconteceu!");
      }
    }

    try {
      if (data.isFixed) {
        const selectedDay = data.date.getDate();
        const selectedMonth = data.date.getMonth();
        const selectedYear = data.date.getFullYear();

        for (let i = 0; i < 12; i++) {
          const newDate = new Date(
            selectedYear,
            selectedMonth + i,
            selectedDay,
          );
          await upsertTransaction({
            ...data,
            id: transactionId,
            date: newDate,
            done: i === 0 ? data.done : false, // Ensure only the first transaction retains the 'done' status
          });
          if (newDate.getFullYear() > selectedYear) {
            break;
          }
        }
      } else {
        await upsertTransaction({
          ...data,
          id: transactionId,
        });
      }
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Ops... Algo inesperado aconteceu!");
    }
  };

  const isUpdate = Boolean(transactionId);

  const typeValue = form.watch("type");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Updated" : "Insert"} transaction
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex items-end gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="done"
                  render={({ field }) => (
                    <FormItem className="pb-1">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <MoneyInput
                        placeholder="Enter value..."
                        value={field.value}
                        onValueChange={({ floatValue }: any) =>
                          field.onChange(floatValue)
                        }
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-center gap-2">
                <FormField
                  control={form.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Member</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Member" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {members.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TRANSACTION_TYPE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between gap-2 ">
                {/* Só mostra category e necessity se for EXPENSE */}
                {typeValue === TransactionType.EXPENSE && (
                  <>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="essentialType"
                      render={({ field }) => (
                        <FormItem className=" w-full">
                          <FormLabel>Necessity</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Selecionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TRANSACTION_ESSENTIAL_TYPE_OPTIONS.map(
                                (option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Só mostra depositCategory se for DEPOSIT */}
                {typeValue === TransactionType.DEPOSIT && (
                  <FormField
                    control={form.control}
                    name="depositCategory"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TRANSACTION_DEPOSIT_CATEGORY_OPTIONS.map(
                              (option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isUpdate ? (
                <FormField
                  control={form.control}
                  name="isFixed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormLabel>Fixed Transaction</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                ""
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isUpdate ? "Update" : "Add"}
                    </>
                  ) : isUpdate ? (
                    "Updated"
                  ) : (
                    "Add"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertTransactionDialog;
