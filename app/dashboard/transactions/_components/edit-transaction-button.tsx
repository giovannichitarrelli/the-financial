"use client";

import { Button } from "@/app/_components/ui/button";
import { Transactions } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";

interface EditTransactionButtonProps {
  transaction: Transactions;
  members: Array<{ id: string; name: string }>;
}

const EditTransactionButton = ({
  transaction,
  members,
}: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon className="  size-4" />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
          memberId: transaction.memberId ?? "",
          type: transaction.type ?? "EXPENSE",
        }}
        transactionId={transaction.id}
        members={members}
      />
    </>
  );
};

export default EditTransactionButton;
