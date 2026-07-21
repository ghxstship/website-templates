import type { Metadata } from "next";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { MembershipProvider } from "@/components/membership/MembershipContext";
import { MEMBERSHIP, NAV, SOCIALS } from "@/lib/membership";

export const metadata: Metadata = {
  title: { default: `${MEMBERSHIP.brand} — ${MEMBERSHIP.heroLine}`, template: `%s — ${MEMBERSHIP.brand}` },
  description: MEMBERSHIP.heroSub,
};

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return (
    <MembershipProvider>
      <div style={{ minHeight: "100vh" }}>
        <SiteHeader brand={MEMBERSHIP.brand} brandHref="/membership" navItems={NAV} ctas={[{ label: "Request invite", href: "/membership/apply" }]} />
        <main>{children}</main>
        <SiteFooter brand={MEMBERSHIP.brand} tagline={MEMBERSHIP.heroSub} columns={[{ title: "Membership", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={SOCIALS} />
      </div>
    </MembershipProvider>
  );
}
