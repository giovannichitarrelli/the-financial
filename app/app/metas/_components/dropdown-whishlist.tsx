/* eslint-disable no-unused-vars */
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import { MoreHorizontal, CircleCheckBig, ArchiveX } from "lucide-react";
import * as React from "react";
import { Wishlist } from "../../types";
import { EditWishlist } from "./edit-wishlist";
type DropdownMenuProps = {
  onToggleDone?: (item: any) => void;
  onDelete?: (item: any) => void;
  wishlist: Wishlist;
};

const DropdownWishlist: React.FC<DropdownMenuProps> = ({
  wishlist,
  onToggleDone,
  onDelete,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onToggleDone && (
          <DropdownMenuItem
            className="flex items-center"
            onClick={onToggleDone}
          >
            <CircleCheckBig className="mr-3 h-4 w-4" /> Alterar status
          </DropdownMenuItem>
        )}

        <EditWishlist wishlist={wishlist} />

        {onDelete && (
          <DropdownMenuItem className="flex items-center" onClick={onDelete}>
            <ArchiveX className="mr-3 h-4 w-4" /> Deletar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownWishlist;
