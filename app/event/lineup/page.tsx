import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { LINEUP_TIERS } from "@/lib/event";

export const metadata: Metadata = { title: "Lineup" };

export default function LineupPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Who's playing" title="Lineup" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 88px)" }}>
        {LINEUP_TIERS.map((tier) => (
          <div key={tier.label} style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}>
            <div className="eyebrow" style={{ marginBottom: 20, paddingBottom: 12, borderBottom: "2px solid var(--color-divider)" }}>{tier.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px", alignItems: "baseline" }}>
              {tier.acts.map((a) => (
                <span key={a} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: tier.size, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{a}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
