import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { WORK } from "@/lib/company";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Case studies" title="Work" />
      <section className="wrap" style={{ paddingBlock: "8px clamp(48px, 6vw, 88px)" }}>
        {WORK.map((w) => (
          <article key={w.title} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.55fr) minmax(0,1fr)", gap: "clamp(24px, 4vw, 56px)", paddingBlock: "clamp(28px, 4vw, 48px)", borderTop: "2px solid var(--color-divider)", alignItems: "center" }}>
            <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", border: "2px solid var(--color-divider)" }}>
              <Placeholder label="Case study" />
            </figure>
            <div>
              <span className="tag tag-accent">{w.sector}</span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.05, letterSpacing: "-0.015em", margin: "14px 0" }}>{w.title}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 18px", maxWidth: "56ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{w.body}</p>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {w.metrics.map((m) => (
                  <div key={m.label}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, color: "var(--color-accent)" }}>{m.num}</div>
                    <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
