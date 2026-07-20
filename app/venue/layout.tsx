import type { Metadata } from "next";
import { VenueHeader } from "@/components/venue/VenueClient";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { VENUE, NAV } from "@/lib/venue";

export const metadata: Metadata = {
  title: { default: `${VENUE.name} — ${VENUE.city}`, template: `%s — ${VENUE.name}` },
  description: VENUE.tagline,
};

export default function VenueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <VenueHeader />
      <main>{children}</main>
      <SiteFooter
        brand={VENUE.name}
        tagline={VENUE.address}
        columns={[{ title: "Visit", links: [...NAV.map((n) => ({ label: n.label, href: n.path })), { label: "Shop ↗", href: "/ecommerce" }] }]}
        socials={["Instagram", "TikTok", "Facebook", "YouTube"]}
      />
    </div>
  );
}
