"use client";

import { PlusCircleIcon, Rocket } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import Link from "next/link";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
  members: Array<{ id: string; name: string }>;
}

const AddTransactionButton = ({
  userCanAddTransaction,
  members,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      {userCanAddTransaction ? (
        <Button
          onClick={() => setDialogIsOpen(true)}
          disabled={!userCanAddTransaction}
          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <PlusCircleIcon className="size-4" />
          <span> Transaction</span>
        </Button>
      ) : (
        <Link href="/dashboard/settings/billing">
          <Button className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground">
            Assine o Pro
            <Rocket className="size-4" />
          </Button>
        </Link>
      )}

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        members={members}
      />
    </>
  );
};

export default AddTransactionButton;
