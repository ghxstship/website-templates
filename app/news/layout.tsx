import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { NEWS, NAV } from "@/lib/news";

export const metadata: Metadata = {
  title: { default: `${NEWS.brand} — Independent journalism`, template: `%s — ${NEWS.brand}` },
  description: "Independent journalism, on the page and on camera.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SiteHeader brand={NEWS.brand} brandHref="/news" navItems={NAV} ctas={[{ label: "Subscribe", href: "/news/newsletters" }]} height={72} />
      <main>{children}</main>
      <SiteFooter brand={NEWS.brand} tagline="Independent journalism, on the page and on camera." columns={[{ title: "Sections", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={["X / Twitter", "Instagram", "YouTube", "Threads"]} />
    </div>
  );
}
