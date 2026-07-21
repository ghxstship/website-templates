import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { NonprofitProvider } from "@/components/nonprofit/NonprofitContext";
import { NONPROFIT, NAV, SOCIALS } from "@/lib/nonprofit";

export const metadata: Metadata = {
  title: { default: `${NONPROFIT.brand} — ${NONPROFIT.cause}`, template: `%s — ${NONPROFIT.brand}` },
  description: NONPROFIT.heroSub,
};

export default function NonprofitLayout({ children }: { children: React.ReactNode }) {
  return (
    <NonprofitProvider>
      <div style={{ minHeight: "100vh" }}>
        <SiteHeader brand={NONPROFIT.brand} brandHref="/nonprofit" navItems={NAV} ctas={[{ label: "Donate", href: "/nonprofit/donate" }]} />
        <main>{children}</main>
        <SiteFooter brand={NONPROFIT.brand} tagline={NONPROFIT.heroSub} columns={[{ title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={SOCIALS} legalRight="Registered charity" />
      </div>
    </NonprofitProvider>
  );
}
