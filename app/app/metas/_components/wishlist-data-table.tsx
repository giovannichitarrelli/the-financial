"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Wishlist } from "../../types";
import { deleteWishlist, upsertWishlist } from "../actions";
import { Card, CardContent } from "@/app/_components/ui/card";
import { StatusPayment } from "../../_components/status";
import { formatCurrency } from "../../_components/_helpers/formatCurrency";
import { toast } from "sonner";
import DropdownWishlist from "./dropdown-whishlist";
import { addMonths, startOfDay } from "date-fns";
import MsgNoData from "../../_components/no-data-table";

type WishlistDataTableProps = {
  data: Wishlist[];
};

export function WishlistDataTable({ data }: WishlistDataTableProps) {
  const router = useRouter();
  const params = useSearchParams();

  const from = params.get("from")
    ? new Date(params.get("from")!)
    : startOfDay(new Date());
  const to = params.get("to")
    ? new Date(params.get("to")!)
    : startOfDay(addMonths(new Date(), 1));

  const handleDeleteWishlist = async (wishlist: Wishlist) => {
    try {
      await deleteWishlist({ id: wishlist.id });
      toast.success("Sua meta foi deletada com sucesso!", {
        description: "Suas metas serão atualizadas...",
      });
    } catch (error) {
      toast.error("Sua meta não foi deletada!", {
        description: "Por favor, tente novamente...",
      });
    }
    router.refresh();
  };

  const handleToggleDoneWishlist = async (wishlist: Wishlist) => {
    const doneAt = wishlist.doneAt ? null : new Date();
    try {
      await upsertWishlist({ id: wishlist.id, doneAt });
      toast.success("Sua meta foi atualizada com sucesso!", {
        description: "Suas metas serão atualizadas...",
      });
    } catch (error) {
      toast.error("Sua meta não foi atualizada!", {
        description: "Por favor, tente novamente...",
      });
    }
    router.refresh();
  };

  const filteredData = data.filter((wishlist) => {
    const wishlistDate = wishlist.expiryAt
      ? new Date(wishlist.expiryAt)
      : new Date(wishlist.createAt);

    return (
      (!from || (wishlistDate && wishlistDate >= from)) &&
      (!to || (wishlistDate && wishlistDate <= to))
    );
  });

  return (
    <div className="flex flex-col gap-3">
      {filteredData.length > 0 ? (
        filteredData.map((wishlist) => {
          return (
            <Card key={wishlist.id}>
              <CardContent className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-2">
                    <div>
                      <StatusPayment doneAt={wishlist.doneAt} />
                    </div>
                  </div>

                  <DropdownWishlist
                    onToggleDone={() => handleToggleDoneWishlist(wishlist)}
                    onDelete={() => handleDeleteWishlist(wishlist)}
                    wishlist={wishlist}
                  />
                </div>
                <h2 className="font-bold">{wishlist.title}</h2>
                <p className="text-sm font-bold text-primary">
                  {formatCurrency(Number(wishlist.price))}
                </p>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <MsgNoData />
      )}
    </div>
  );
}
