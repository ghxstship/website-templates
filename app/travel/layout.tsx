import type { Metadata } from "next";
import { TravelProvider } from "@/components/travel/TravelContext";
import { TravelHeader } from "@/components/travel/TravelClient";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { TRAVEL, NAV } from "@/lib/travel";

export const metadata: Metadata = {
  title: { default: `${TRAVEL.brand} — Book anything`, template: `%s — ${TRAVEL.brand}` },
  description: "Flights, stays, rail, rentals and expeditions — booked in one place.",
};

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <TravelProvider>
        <TravelHeader />
        <main>{children}</main>
        <SiteFooter
          brand={TRAVEL.brand}
          tagline="Flights, stays, rail, rentals and expeditions — booked in one place."
          columns={[
            { title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) },
            { title: "More", links: [{ label: "Private charter ↗", href: "/charter" }, { label: "Book a hotel direct ↗", href: "/hospitality" }] },
          ]}
          socials={["Instagram", "TikTok", "YouTube", "X / Twitter"]}
        />
      </TravelProvider>
    </div>
  );
}
