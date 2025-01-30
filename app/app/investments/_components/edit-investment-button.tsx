"use client";

import { Button } from "@/app/_components/ui/button";
import { Investments } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpsertInvestmentDialog from "./upsert-investment-dialog";

interface Props {
  investments: Investments;
}

const EditinvestmentButton = ({ investments }: Props) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon className="ml-1 size-4" />
      </Button>
      <UpsertInvestmentDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...investments,
          amount: Number(investments.amount),
        }}
        investmentId={investments.id}
      />
    </>
  );
};

export default EditinvestmentButton;
