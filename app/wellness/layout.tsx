import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { WellnessProvider } from "@/components/wellness/WellnessContext";
import { WELLNESS, NAV } from "@/lib/wellness";

export const metadata: Metadata = {
  title: { default: `${WELLNESS.brand} — ${WELLNESS.city}`, template: `%s — ${WELLNESS.brand}` },
  description: WELLNESS.tagline,
};

export default function WellnessLayout({ children }: { children: React.ReactNode }) {
  return (
    <WellnessProvider>
      <div style={{ minHeight: "100vh" }}>
        <SiteHeader brand={WELLNESS.brand} brandHref="/wellness" navItems={NAV} ctas={[{ label: "Book", href: "/wellness/treatments" }]} />
        <main>{children}</main>
        <SiteFooter brand={WELLNESS.brand} tagline={WELLNESS.address} columns={[{ title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) }, { title: "Hours", links: [{ label: "Daily 8:00–21:00", href: "/wellness/visit" }, { label: "Last treatment 20:00", href: "/wellness/visit" }, { label: "Members 6:00–22:00", href: "/wellness/membership" }] }]} />
      </div>
    </WellnessProvider>
  );
}
