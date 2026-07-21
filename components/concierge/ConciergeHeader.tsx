"use client";

import { SiteHeader, type Cta, type NavItem } from "@/components/shell/SiteHeader";
import { useConcierge } from "./ConciergeContext";

/** Concierge header with a live "My requests · N" count. SiteHeader is shared
 *  and can't read context, so the count is folded into the nav label here. */
export function ConciergeHeader({ brand, navItems, ctas }: { brand: string; navItems: NavItem[]; ctas?: Cta[] }) {
  const { openCount } = useConcierge();
  const items = navItems.map((n) =>
    n.path === "/concierge/requests" && openCount > 0 ? { ...n, label: `${n.label} · ${openCount}` } : n,
  );
  return <SiteHeader brand={brand} brandHref="/concierge" navItems={items} ctas={ctas} />;
}
