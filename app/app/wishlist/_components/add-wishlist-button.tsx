"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import UpsertWishlistDialog from "./upsert-wishlist-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface Props {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({ userCanAddTransaction }: Props) => {
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
              Adicionar Desejo
              <ArrowDownUpIcon className="ml-1 size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertWishlistDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddTransactionButton;
