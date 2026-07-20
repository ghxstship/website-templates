import type { Metadata } from "next";
import { CareerProvider } from "@/components/career/CareerContext";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { CAREER, NAV } from "@/lib/career";

export const metadata: Metadata = {
  title: { default: `${CAREER.brand} — Jobs, gigs, auditions & RFPs`, template: `%s — ${CAREER.brand}` },
  description: CAREER.heroSub,
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <CareerProvider>
        <SiteHeader brand={CAREER.brand} brandHref="/career" navItems={NAV} ctas={[{ label: "Recruiter", href: "/career/ats", variant: "secondary" }, { label: "Post a role", href: "/career/post" }]} />
        <main>{children}</main>
        <SiteFooter brand={CAREER.brand} tagline={CAREER.heroSub} columns={[{ title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={["LinkedIn", "X / Twitter", "Instagram"]} />
      </CareerProvider>
    </div>
  );
}
