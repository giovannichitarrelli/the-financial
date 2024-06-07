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
import MsgNoData from "../_components/no-data-table";
import { isAvailable } from "@/app/_lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
export const metadata: Metadata = {
  title: "Dashboard - Lista de desejos",
  description: "Dashboard de lista de desejos...",
};
export default async function Page() {
  const wishlist = await getUserWishlist();
  const { plan, status } = await isAvailable();
  if (!plan || !status) {
    return (
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Gerenciar assinatura</CardTitle>
          <CardDescription>
            Não foi possível carregar as informações da sua assinatura.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Metas</DashboardPageHeaderTitle>
        {plan.name === "free" || status.status != "active" ? (
          <CtaButtonPro />
        ) : (
          <WishlistUpsertSheet />
        )}
      </DashboardPageHeader>

      <DashboardPageMain>
        {plan.name === "free" || status.status != "active" ? (
          <FreeAlert />
        ) : (
          " "
        )}

        {wishlist.length > 0 ? (
          <WishlistDataTable data={wishlist} />
        ) : (
          <MsgNoData />
        )}
      </DashboardPageMain>
    </DashboardPage>
  );
}
