import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { OrderMenu } from "@/components/restaurant/RestaurantClient";
import { ReorderBar } from "@/components/restaurant/order";

export const metadata: Metadata = { title: "Order online" };

export default function OrderPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Provisions menu" title="Order online" />
      <ReorderBar />
      <OrderMenu />
    </div>
  );
}
