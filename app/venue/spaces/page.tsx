import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { SPACES } from "@/lib/venue";

export const metadata: Metadata = { title: "Spaces" };

export default function SpacesPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Inside the building" title="Spaces" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
        {SPACES.map((s) => (
          <div key={s.name} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
            <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", border: "2px solid var(--color-divider)" }}><Placeholder label={s.name} /></figure>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>{s.name}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 16px", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{s.body}</p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>{s.cap}</div><div className="eyebrow">Capacity</div></div>
                <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>{s.type}</div><div className="eyebrow">Format</div></div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
