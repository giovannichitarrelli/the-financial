"use client";

import { Wishlist } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DoneWishlistBadge from "../_components/done-wishlist-badge";
import EditWishlistButton from "../_components/edit-wishlist-button";
import DeleteWishlistButton from "../_components/delete-wishlist-button";

export const wishlistColumns: ColumnDef<Wishlist>[] = [
  {
    accessorKey: "title",
    header: "Nome",
  },

  {
    accessorKey: "createAt",
    header: "Data",
    cell: ({ row: { original: wishlist } }) =>
      new Date(wishlist.createAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: wishlist } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(wishlist.amount)),
  },

  {
    accessorKey: "done",
    header: "Pago",
    cell: ({ row: { original: wishlist } }) => (
      <DoneWishlistBadge wishlist={wishlist} />
    ),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: wishlist } }) => {
      return (
        <div className="space-x-1">
          <EditWishlistButton wishlist={wishlist} />

          <DeleteWishlistButton wishlistId={wishlist.id} />
        </div>
      );
    },
  },
];
