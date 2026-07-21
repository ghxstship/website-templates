import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { PosProvider } from "@/components/pos/PosContext";
import { POS, NAV } from "@/lib/pos";

export const metadata: Metadata = {
  title: { default: `${POS.brand} — ${POS.tagline}`, template: `%s — ${POS.brand}` },
  description: "The checkout layer for the whole template system — online, in person, single-store or multi-tenant.",
};

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <PosProvider>
      <div style={{ minHeight: "100vh" }}>
        <SiteHeader brand={POS.brand} brandHref="/pos" navItems={NAV} ctas={[{ label: "Open register", href: "/pos/register" }]} />
        <main>{children}</main>
        <SiteFooter brand={POS.brand} tagline="The checkout layer for the whole template system — online, in person, single-store or multi-tenant." columns={[{ title: "Product", links: NAV.map((n) => ({ label: n.label, href: n.path })) }, { title: "Accepts", links: [{ label: "Cards & wallets", href: "/pos/payments" }, { label: "BNPL", href: "/pos/payments" }, { label: "Crypto", href: "/pos/payments" }, { label: "Cash", href: "/pos/register" }] }]} legalRight="PCI-DSS demo — no real payments processed" />
      </div>
    </PosProvider>
  );
}
