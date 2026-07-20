import type { Metadata } from "next";
import { OrderProvider, RestaurantHeader, OrderOverlays } from "@/components/restaurant/order";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { RESTAURANT, NAV } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: { default: `${RESTAURANT.name} — ${RESTAURANT.city}`, template: `%s — ${RESTAURANT.name}` },
  description: RESTAURANT.tagline,
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <OrderProvider>
        <RestaurantHeader />
        <main>{children}</main>
        <SiteFooter
          brand={RESTAURANT.name}
          tagline={RESTAURANT.address}
          columns={[
            { title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) },
            { title: "Hours", links: [
              { label: "Lunch — Thu–Sat, 12–2pm", href: "/restaurant/visit" },
              { label: "Dinner — Tue–Sat, 6–10pm", href: "/restaurant/visit" },
              { label: "Closed Sun & Mon", href: "/restaurant/visit" },
            ] },
          ]}
        />
        <OrderOverlays />
      </OrderProvider>
    </div>
  );
}
