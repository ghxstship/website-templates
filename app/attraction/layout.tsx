import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { ATTRACTION, NAV } from "@/lib/attraction";

export const metadata: Metadata = {
  title: { default: `${ATTRACTION.name} — ${ATTRACTION.city}`, template: `%s — ${ATTRACTION.name}` },
  description: ATTRACTION.tagline,
};

export default function AttractionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SiteHeader brand={ATTRACTION.name} brandHref="/attraction" navItems={NAV} ctas={[{ label: "Buy tickets", href: "/attraction/tickets" }]} />
      <main>{children}</main>
      <SiteFooter brand={ATTRACTION.name} tagline={ATTRACTION.address} columns={[{ title: "Visit", links: NAV.map((n) => ({ label: n.label, href: n.path })) }, { title: "Hours", links: [{ label: "Daily 9:00–18:00", href: "/attraction/visit" }, { label: "Late Fridays until 21:00", href: "/attraction/visit" }, { label: "Last entry 1h before close", href: "/attraction/visit" }] }]} />
    </div>
  );
}
