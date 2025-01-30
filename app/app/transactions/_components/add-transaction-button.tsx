"use client";

import { ArrowDownUpIcon, Rocket } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import Link from "next/link";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {userCanAddTransaction ? (
              <Button
                className="rounded-full"
                onClick={() => setDialogIsOpen(true)}
                disabled={!userCanAddTransaction}
              >
                Adicionar transação
                <ArrowDownUpIcon className="ml-1 size-4" />
              </Button>
            ) : (
              <Link href="/app/settings/billing">
                <Button className="rounded-full">
                  Assine o PRO
                  <Rocket className="ml-1 size-4" />
                </Button>
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
