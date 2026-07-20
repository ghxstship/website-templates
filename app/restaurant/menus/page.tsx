import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MenusClient } from "@/components/restaurant/RestaurantClient";

export const metadata: Metadata = { title: "Menus" };

export default function MenusPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="What we're serving" title="Menus" />
      <MenusClient />
    </div>
  );
}
