import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { HospitalityProvider } from "@/components/hospitality/HospitalityContext";
import { HOSPITALITY, NAV, SOCIALS } from "@/lib/hospitality";

export const metadata: Metadata = {
  title: { default: `${HOSPITALITY.brand} — ${HOSPITALITY.city}`, template: `%s — ${HOSPITALITY.brand}` },
  description: HOSPITALITY.tagline,
};

export default function HospitalityLayout({ children }: { children: React.ReactNode }) {
  return (
    <HospitalityProvider>
      <div style={{ minHeight: "100vh" }}>
        <SiteHeader brand={HOSPITALITY.brand} brandHref="/hospitality" navItems={NAV} ctas={[{ label: "Book a stay", href: "/hospitality/rooms" }]} />
        <main>{children}</main>
        <SiteFooter brand={HOSPITALITY.brand} tagline={HOSPITALITY.address} columns={[{ title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={SOCIALS} />
      </div>
    </HospitalityProvider>
  );
}
