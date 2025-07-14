"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_utils/currency";
import { Wishlist } from "@prisma/client";
import DoneWishlistBadge from "./done-wishlist-badge";
import EditWishlistButton from "./edit-wishlist-button";
import DeleteWishlistButton from "./delete-wishlist-button";

interface Props {
  wishlist: Wishlist;
}
const CardsWishlist = ({ wishlist }: Props) => {
  return (
    <Card key={wishlist.id}>
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div>
              <DoneWishlistBadge wishlist={wishlist} />
            </div>
            <p className="text-xs">
              {new Date(wishlist.createAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="space-x-1">
            <EditWishlistButton wishlist={wishlist} />

            <DeleteWishlistButton wishlistId={wishlist.id} />
          </div>
        </div>
        <h2 className="font-bold">{wishlist.title}</h2>
        <p className="text-sm font-bold text-primary">
          {formatCurrency(Number(wishlist.amount))}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardsWishlist;
