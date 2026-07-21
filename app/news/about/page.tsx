import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ABOUT } from "@/lib/news";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Who we are" title="About" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 56px) clamp(48px, 6vw, 80px)", maxWidth: 720 }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.25, margin: "0 0 24px" }}>{ABOUT.lead}</p>
        <p style={{ fontSize: 17, lineHeight: 1.7, margin: "0 0 20px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{ABOUT.p1}</p>
        <p style={{ fontSize: 17, lineHeight: 1.7, margin: "0 0 32px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{ABOUT.p2}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24, paddingTop: 24, borderTop: "2px solid var(--color-divider)" }}>
          {ABOUT.stats.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3vw, 38px)", color: "var(--color-accent)" }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 6 }}>{s.label}</div></div>)}
        </div>
      </section>
    </div>
  );
}
