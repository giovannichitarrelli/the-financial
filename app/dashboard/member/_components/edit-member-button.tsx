"use client";

import { Button } from "@/app/_components/ui/button";
import { Member } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpsertMemberDialog from "./upsert-member-dialog";

interface Props {
  member: Member;
}

const EditMemberButton = ({ member }: Props) => {
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
      <UpsertMemberDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...member,
        }}
        memberId={member.id}
      />
    </>
  );
};

export default EditMemberButton;
