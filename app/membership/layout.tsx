import type { Metadata } from "next";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { MembershipProvider } from "@/components/membership/MembershipContext";
import { MembershipHeader } from "@/components/membership/MembershipHeader";
import { MEMBERSHIP, NAV, SOCIALS } from "@/lib/membership";

export const metadata: Metadata = {
  title: { default: `${MEMBERSHIP.brand} — ${MEMBERSHIP.heroLine}`, template: `%s — ${MEMBERSHIP.brand}` },
  description: MEMBERSHIP.heroSub,
};

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return (
    <MembershipProvider>
      <div style={{ minHeight: "100vh" }}>
        <MembershipHeader brand={MEMBERSHIP.brand} navItems={NAV} />
        <main>{children}</main>
        <SiteFooter brand={MEMBERSHIP.brand} tagline={MEMBERSHIP.heroSub} columns={[{ title: "Membership", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={SOCIALS} />
      </div>
    </MembershipProvider>
  );
}
