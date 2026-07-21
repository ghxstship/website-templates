import type { Metadata } from "next";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { ConciergeProvider } from "@/components/concierge/ConciergeContext";
import { ConciergeHeader } from "@/components/concierge/ConciergeHeader";
import { CONCIERGE, NAV, SOCIALS } from "@/lib/concierge";

export const metadata: Metadata = {
  title: { default: `${CONCIERGE.brand} — ${CONCIERGE.heroLine}`, template: `%s — ${CONCIERGE.brand}` },
  description: CONCIERGE.heroSub,
};

export default function ConciergeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConciergeProvider>
      <div style={{ minHeight: "100vh" }}>
        <ConciergeHeader brand={CONCIERGE.brand} navItems={NAV} ctas={[{ label: "Make a request", href: "/concierge/request" }]} />
        <main>{children}</main>
        <SiteFooter brand={CONCIERGE.brand} tagline={CONCIERGE.heroSub} columns={[{ title: "Concierge", links: NAV.map((n) => ({ label: n.label, href: n.path })) }, { title: "Reach us", links: [{ label: CONCIERGE.email, href: `mailto:${CONCIERGE.email}` }] }]} socials={SOCIALS} />
      </div>
    </ConciergeProvider>
  );
}
