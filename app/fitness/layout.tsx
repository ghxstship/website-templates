import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { FITNESS, NAV } from "@/lib/fitness";

export const metadata: Metadata = {
  title: { default: `${FITNESS.brand} — ${FITNESS.city}`, template: `%s — ${FITNESS.brand}` },
  description: FITNESS.heroSub,
};

export default function FitnessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SiteHeader brand={FITNESS.brand} brandHref="/fitness" navItems={NAV} ctas={[{ label: "Book a class", href: "/fitness/schedule", variant: "secondary" }, { label: "Join now", href: "/fitness/membership" }]} />
      <main>{children}</main>
      <SiteFooter brand={FITNESS.brand} tagline={FITNESS.address} columns={[{ title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) }, { title: "Hours", links: [{ label: "Mon–Fri 5:30–22:00", href: "/fitness" }, { label: "Sat–Sun 7:00–20:00", href: "/fitness" }, { label: "Open-gym 24/7 for members", href: "/fitness/membership" }] }]} />
    </div>
  );
}
