import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { SERVICE, NAV, SOCIALS } from "@/lib/service";

export const metadata: Metadata = {
  title: { default: `${SERVICE.name} — ${SERVICE.trade}, ${SERVICE.city}`, template: `%s — ${SERVICE.name}` },
  description: SERVICE.tagline,
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SiteHeader brand={SERVICE.name} brandHref="/service" navItems={NAV} ctas={[{ label: "Book now", href: SERVICE.bookHref }]} />
      <main>{children}</main>
      <SiteFooter brand={SERVICE.name} tagline={SERVICE.address} columns={[{ title: "Explore", links: [...NAV.map((n) => ({ label: n.label, href: n.path })), { label: "Book now ↗", href: SERVICE.bookHref }] }]} socials={SOCIALS} />
    </div>
  );
}
