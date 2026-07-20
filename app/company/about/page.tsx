import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { ABOUT, FACTS } from "@/lib/company";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Who we are" title="About" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.2fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <figure className="grayscale sticky-fig" style={{ margin: 0, aspectRatio: "4/5", position: "sticky", top: 96, border: "2px solid var(--color-divider)" }}>
          <Placeholder label="Team" />
        </figure>
        <div>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.25, letterSpacing: "-0.01em", margin: "0 0 28px" }}>{ABOUT.lead}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 20px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{ABOUT.p1}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 36px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{ABOUT.p2}</p>
          <hr className="rule" style={{ height: 1 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, paddingBlock: 28 }}>
            {FACTS.map((f) => (
              <div key={f.k}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 34px)", color: "var(--color-accent)" }}>{f.v}</div>
                <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginTop: 6 }}>{f.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
