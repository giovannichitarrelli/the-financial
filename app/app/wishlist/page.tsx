import { redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { db } from "@/services/database";
import { getServerSession } from "next-auth";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { DataTable } from "@/app/_components/ui/data-table";
import { wishlistColumns } from "./_columns";
import AddWishlistButton from "./_components/add-wishlist-button";
import MsgNoData from "../_components/no-data-table";
import CardsWishlist from "./_components/cards-wishlist";

const WishlistPage = async () => {
  const session = await getServerSession(auth);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/auth");
  }
  const wishlist = await db.wishlist.findMany({
    where: {
      userId,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <div className="flex flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Lista de desejos</h1>
        <AddWishlistButton userCanAddTransaction={userCanAddTransaction} />
      </div>

      {wishlist.length > 0 ? (
        wishlist.map((wishlist) => (
          <>
            <CardsWishlist wishlist={wishlist} />
          </>
        ))
      ) : (
        <MsgNoData />
      )}

      <DataTable
        columns={wishlistColumns}
        data={JSON.parse(JSON.stringify(wishlist))}
      />
    </div>
  );
};

export default WishlistPage;
