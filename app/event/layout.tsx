import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { EVENT, NAV } from "@/lib/event";

export const metadata: Metadata = {
  title: { default: `${EVENT.name} — ${EVENT.kind}`, template: `%s — ${EVENT.name}` },
  description: EVENT.tagline,
};

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SiteHeader
        brand={EVENT.name}
        brandHref="/event"
        navItems={NAV}
        ctas={[{ label: "Get tickets", href: "/event/tickets" }]}
      />
      <main>{children}</main>
      <SiteFooter
        brand={EVENT.name}
        tagline={`${EVENT.dates} — ${EVENT.venueName}`}
        columns={[{ title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]}
        socials={["Instagram", "TikTok", "YouTube", "Newsletter"]}
      />
      <div style={{ height: 68 }} />
      {/* sticky ticket bar */}
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 70, background: "var(--color-text)", color: "var(--color-bg)", borderTop: "2px solid var(--color-accent)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 20, paddingBlock: 12, minHeight: 68 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{EVENT.name} — {EVENT.dates}</div>
            <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-bg) 65%, transparent)" }}>From {EVENT.fromPrice} — {EVENT.ticketNote}</div>
          </div>
          <Link href="/event/tickets" className="btn btn-primary" style={{ marginLeft: "auto", padding: "11px 22px", flex: "0 0 auto" }}>Get tickets</Link>
        </div>
      </div>
    </div>
  );
}
