/* eslint-disable no-unused-vars */

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { Switch } from "@/app/_components/ui/switch";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { upsertInvestment } from "../_actions/upsert-investment";
import { InvestmentsObjectType, InvestmentsType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  INVESTMENT_OBJECT_TYPE_OPTIONS,
  INVESTMENT_TYPE_OPTIONS,
} from "@/app/_constants/transactions";

interface Props {
  isOpen: boolean;
  defaultValues?: FormSchema;
  investmentId?: string;
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "The name is required.",
  }),
  amount: z.number({
    required_error: "The value is required.",
  }),
  done: z.boolean(),
  type: z.nativeEnum(InvestmentsType, {
    required_error: "The type is required.",
  }),
  object: z.nativeEnum(InvestmentsObjectType, {
    required_error: "The goal is required.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertInvestmentDialog = ({
  isOpen,
  defaultValues,
  investmentId,
  setIsOpen,
}: Props) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 0,
      title: "",
      done: false,
      type: InvestmentsType.DEPOSIT,
      object: InvestmentsObjectType.RETIREMENT,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertInvestment({ ...data, id: investmentId });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const isUpdate = Boolean(investmentId);

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
            {isUpdate ? "Atualizar" : "Criar"} investimento
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <MoneyInput
                        placeholder="Digite o valor..."
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

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INVESTMENT_TYPE_OPTIONS.map((option) => (
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
              <FormField
                control={form.control}
                name="object"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INVESTMENT_OBJECT_TYPE_OPTIONS.map((option) => (
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

              <FormField
                control={form.control}
                name="done"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Status</FormLabel>
                    </div>
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isUpdate ? "Update" : "Add"}
                    </>
                  ) : isUpdate ? (
                    "Update"
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

export default UpsertInvestmentDialog;
