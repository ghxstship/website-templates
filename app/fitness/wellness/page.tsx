import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { NutritionConsult } from "@/components/fitness/FitnessClient";
import { RECOVERY, NUTRITION } from "@/lib/fitness";

export const metadata: Metadata = { title: "Wellness" };

export default function WellnessPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Recover & optimise" title="Wellness" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.02em", margin: "0 0 20px", textTransform: "uppercase" }}>Recovery &amp; biohacking</h2>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {RECOVERY.map((r) => (
            <div key={r.no} style={{ background: "var(--color-bg)", padding: 24 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", marginBottom: 12 }}>{r.no}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>{r.name}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 40px) clamp(48px, 6vw, 80px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.02em", margin: "0 0 20px", textTransform: "uppercase" }}>Nutrition &amp; coaching</h2>
        <div className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center" }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", border: "2px solid var(--color-divider)" }}><Placeholder label="Nutrition" /></figure>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.65, margin: "0 0 18px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>Work one-to-one with a registered nutritionist. Body-composition scans, a plan built around your training, and check-ins that keep it honest.</p>
            {NUTRITION.map((n) => <div key={n} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "10px 0", borderTop: "1px solid var(--color-divider)" }}><span style={{ color: "var(--color-accent)", fontWeight: 800 }}>—</span><span style={{ fontSize: 14.5 }}>{n}</span></div>)}
            <NutritionConsult />
          </div>
        </div>
      </section>
    </div>
  );
}
