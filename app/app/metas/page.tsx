import { Metadata } from "next";
import { getUserCurrentPlan } from "@/services/stripe";
import { auth } from "@/services/auth";
import { getUserWishlist } from "./actions";
import { WishlistUpsertSheet } from "../_components/_upserts/wishlist-upersert-sheet";
import { WishlistDataTable } from "./_components/wishlist-data-table";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "../_components/dashboard/page";
import CtaButtonPro from "../_components/cta-button-pro";
import { FreeAlert } from "../_components/plan-alert";
import MsgNoData from "../_components/no-data-table";
export const metadata: Metadata = {
  title: "Dashboard - Lista de desejos",
  description: "Dashboard de lista de desejos...",
};
export default async function Page() {
  const wishlist = await getUserWishlist();
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Lista de desejos</DashboardPageHeaderTitle>
        {plan.name === "free" ? <CtaButtonPro /> : <WishlistUpsertSheet />}
      </DashboardPageHeader>

      <DashboardPageMain>
        {plan.name === "free" ? <FreeAlert /> : " "}

        {wishlist.length > 0 ? (
          <WishlistDataTable data={wishlist} />
        ) : (
          <MsgNoData />
        )}
      </DashboardPageMain>
    </DashboardPage>
  );
}
