import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { ABOUT, PRESS } from "@/lib/restaurant";

export const metadata: Metadata = { title: "The chef" };

export default function AboutPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Our story" title="The chef" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(32px, 5vw, 56px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.2fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <figure className="grayscale sticky-fig" style={{ margin: 0, aspectRatio: "4/5", position: "sticky", top: 100, border: "2px solid var(--color-divider)" }}>
          <Placeholder label="Chef portrait" />
        </figure>
        <div>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.25, margin: "0 0 28px" }}>{ABOUT.lead}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 20px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{ABOUT.p1}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 36px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{ABOUT.p2}</p>
          <hr className="rule" style={{ height: 1 }} />
          <div style={{ paddingTop: 28 }}>
            {PRESS.map((q, i) => (
              <blockquote key={i} style={{ margin: "0 0 18px", paddingLeft: 18, borderLeft: "3px solid var(--color-accent)" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 17, lineHeight: 1.4, margin: "0 0 6px" }}>“{q.quote}”</p>
                <cite style={{ fontSize: 13, fontStyle: "normal", color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>— {q.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
