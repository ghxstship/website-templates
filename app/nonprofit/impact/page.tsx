import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { IMPACT_STATS, ALLOCATIONS } from "@/lib/nonprofit";
export const metadata: Metadata = { title: "Impact" };
export default function ImpactPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Accountability" title="Impact" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 40px)" }}>
        <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {IMPACT_STATS.map((s) => (
            <div key={s.label} style={{ background: "var(--color-bg)", padding: 24 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 46px)", color: "var(--color-accent)", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 32px) clamp(48px, 6vw, 80px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 16px" }}>Where the money goes</h2>
        {ALLOCATIONS.map((a) => (
          <div key={a.name} style={{ padding: "14px 0", borderTop: "1px solid var(--color-divider)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{a.name}</span><span>{a.pct}%</span></div>
            <div style={{ height: 8, background: "color-mix(in srgb, var(--color-text) 12%, transparent)" }}><div style={{ height: "100%", background: "var(--color-accent)", width: `${a.pct}%` }} /></div>
          </div>
        ))}
      </section>
    </div>
  );
}
