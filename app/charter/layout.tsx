import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { CharterProvider } from "@/components/charter/CharterContext";
import { CHARTER, NAV } from "@/lib/charter";

export const metadata: Metadata = {
  title: { default: `${CHARTER.brand} — ${CHARTER.tagline}`, template: `%s — ${CHARTER.brand}` },
  description: "Private jets, helicopters, yachts and black-car service — arranged on one desk, settled on one invoice.",
};

export default function CharterLayout({ children }: { children: React.ReactNode }) {
  return (
    <CharterProvider>
      <div style={{ minHeight: "100vh" }}>
        <SiteHeader brand={CHARTER.brand} brandHref="/charter" navItems={NAV} ctas={[{ label: "Request a quote", href: "/charter/request" }]} />
        <main>{children}</main>
        <SiteFooter brand={CHARTER.brand} tagline="Private jets, helicopters, yachts and black-car service — arranged on one desk, settled on one invoice." columns={[{ title: "Charter", links: [{ label: "Private jets", href: "/charter/request" }, { label: "Helicopters", href: "/charter/request" }, { label: "Yachts", href: "/charter/request" }, { label: "Black cars", href: "/charter/request" }] }, { title: "Company", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} legalRight="Argus Platinum · Wyvern Wingman · IS-BAO" />
      </div>
    </CharterProvider>
  );
}
