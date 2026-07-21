import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { VISIT_INFO } from "@/lib/clubhouse";
export const metadata: Metadata = { title: "Visit" };
export default function VisitPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Find the house" title="Visit" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(28px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div>
          {VISIT_INFO.map((b) => (
            <div key={b.title} style={{ padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 8px" }}>{b.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: "46ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{b.body}</p>
            </div>
          ))}
        </div>
        <figure className="grayscale sticky-fig" style={{ margin: 0, aspectRatio: "3/4", position: "sticky", top: 96, border: "2px solid var(--color-divider)" }}><Placeholder label="Map / entrance" /></figure>
      </section>
    </div>
  );
}
