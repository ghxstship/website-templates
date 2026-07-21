import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { ClubhouseProvider } from "@/components/clubhouse/ClubhouseContext";
import { CLUBHOUSE, NAV } from "@/lib/clubhouse";

export const metadata: Metadata = {
  title: { default: `${CLUBHOUSE.brand} — ${CLUBHOUSE.city}`, template: `%s — ${CLUBHOUSE.brand}` },
  description: CLUBHOUSE.tagline,
};

export default function ClubhouseLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClubhouseProvider>
      <div style={{ minHeight: "100vh" }}>
        <SiteHeader brand={CLUBHOUSE.brand} brandHref="/clubhouse" navItems={NAV} ctas={[{ label: "Become a member", href: "/clubhouse/membership" }]} />
        <main>{children}</main>
        <SiteFooter brand={CLUBHOUSE.brand} tagline={CLUBHOUSE.address} columns={[{ title: "The house", links: NAV.map((n) => ({ label: n.label, href: n.path })) }, { title: "More", links: [{ label: "Manage membership ↗", href: "/membership" }, { label: "Concierge desk ↗", href: "/concierge" }] }]} />
      </div>
    </ClubhouseProvider>
  );
}
