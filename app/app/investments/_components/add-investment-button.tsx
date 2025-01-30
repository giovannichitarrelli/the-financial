"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import UpsertInvestmentDialog from "./upsert-investment-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface Props {
  userCanAddTransaction?: boolean;
}

const AddInvestmentButton = ({ userCanAddTransaction }: Props) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Adicionar Investimento
              <ArrowDownUpIcon className="ml-1 size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertInvestmentDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddInvestmentButton;
