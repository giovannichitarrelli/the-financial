import { Metadata } from "next";
import { getUserWishlist } from "./actions";
import { WishlistUpsertSheet } from "../_components/_upserts/wishlist-upersert-sheet";
import { WishlistDataTable } from "./_components/wishlist-data-table";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "../_components/dashboard/dashboard-page";
import CtaButtonPro from "../_components/cta-button-pro";
import { FreeAlert } from "../_components/plan-alert";
import { isAvailable } from "@/app/_lib/utils";
import { Filters } from "../_components/filters";
import BillingError from "../_components/billing-error";
export const metadata: Metadata = {
  title: "Dashboard - Metas",
  description: "Dashboard de metas...",
};
export default async function Page() {
  const wishlist = await getUserWishlist();
  const { plan, status } = await isAvailable();
  if (!plan || !status) {
    return <BillingError />;
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Metas</DashboardPageHeaderTitle>
        {plan.name === "free" ||
        (status.status !== "active" && status.status !== "trialing") ? (
          <CtaButtonPro />
        ) : (
          <WishlistUpsertSheet />
        )}
      </DashboardPageHeader>

      <DashboardPageMain>
        {plan.name === "free" ||
        (status.status !== "active" && status.status !== "trialing") ? (
          <FreeAlert />
        ) : (
          " "
        )}
        <Filters />
        <WishlistDataTable data={wishlist} />
      </DashboardPageMain>
    </DashboardPage>
  );
}
