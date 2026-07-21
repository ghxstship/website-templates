"use client";

import { SiteHeader, type Cta, type NavItem } from "@/components/shell/SiteHeader";
import { useMembership } from "./MembershipContext";

/** Member-aware header: once a member is approved (persisted status), the
 *  pre-join "Request invite" CTA gives way to a subtle member chip and a
 *  "Your pass" link, driven by the MembershipContext state. */
export function MembershipHeader({ brand, navItems }: { brand: string; navItems: NavItem[] }) {
  const { isMember, memberChip, ctaLabel } = useMembership();
  const ctas: Cta[] = isMember
    ? [
        { label: memberChip, href: "/membership/pass", variant: "secondary" },
        { label: ctaLabel, href: "/membership/pass" },
      ]
    : [{ label: ctaLabel, href: "/membership/apply" }];
  return <SiteHeader brand={brand} brandHref="/membership" navItems={navItems} ctas={ctas} />;
}
