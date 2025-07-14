"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import UpsertMemberDialog from "./upsert-member-dialog";
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
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Add member
              <PlusCircleIcon className="ml-1 size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "You have reached limit Free. Update your plan to create unlimited transactions."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertMemberDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddTransactionButton;
