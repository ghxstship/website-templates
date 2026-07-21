import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PROPERTIES } from "@/lib/membership";

export const metadata: Metadata = { title: "The ecosystem" };

export default function EcosystemPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Every front door, one key" title="The ecosystem" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {PROPERTIES.map((pr) => {
            const tagClass = pr.access === "Members" ? "tag-accent" : pr.access === "Public" ? "tag-neutral" : "tag-outline";
            return (
              <Link key={pr.name} href={pr.href} style={{ background: "var(--color-bg)", padding: 24, textDecoration: "none", color: "var(--color-text)", display: "flex", flexDirection: "column", minHeight: 160 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "auto" }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{pr.kind}</span>
                  <span className={`tag ${tagClass}`}>{pr.access}</span>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, marginTop: 20, textTransform: "uppercase" }}>{pr.name}</div>
                <div style={{ fontSize: 13, color: "var(--color-accent-700)", fontFamily: "var(--font-heading)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 8 }}>Enter →</div>
              </Link>
            );
          })}
        </div>
        <p style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 20, maxWidth: "64ch" }}>Your membership unlocks gated content and member pricing across every property. Public doors are open to all; member doors read your pass automatically.</p>
      </section>
    </div>
  );
}
