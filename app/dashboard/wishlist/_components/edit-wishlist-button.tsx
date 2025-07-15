"use client";

import { Button } from "@/app/_components/ui/button";
import { Wishlist } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpsertWishlistDialog from "./upsert-wishlist-dialog";

interface Props {
  wishlist: Wishlist;
}

const EditWishlistButton = ({ wishlist }: Props) => {
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
      <UpsertWishlistDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...wishlist,
          amount: Number(wishlist.amount),
        }}
        wishlistId={wishlist.id}
      />
    </>
  );
};

export default EditWishlistButton;
