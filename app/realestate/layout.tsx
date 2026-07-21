import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { REALESTATE, NAV, SOCIALS } from "@/lib/realestate";

export const metadata: Metadata = {
  title: { default: `${REALESTATE.brand} — ${REALESTATE.region} property`, template: `%s — ${REALESTATE.brand}` },
  description: `${REALESTATE.region} residential & commercial property.`,
};

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SiteHeader brand={REALESTATE.brand} brandHref="/realestate" navItems={NAV} ctas={[{ label: "List with us", href: "/realestate/sell", variant: "secondary" }, { label: "Browse homes", href: "/realestate/buy" }]} />
      <main>{children}</main>
      <SiteFooter brand={REALESTATE.brand} tagline={`${REALESTATE.region} residential & commercial property.`} columns={[{ title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={SOCIALS} />
    </div>
  );
}
