import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FAQ } from "@/components/ds/FAQ";
import { Placeholder } from "@/components/Placeholder";
import { VISIT, FAQS } from "@/lib/attraction";

export const metadata: Metadata = { title: "Visit" };

export default function VisitPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Know before you go" title="Visit" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(32px, 5vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div>
          {VISIT.map((b) => (
            <div key={b.title} style={{ padding: "20px 0", borderTop: "2px solid var(--color-divider)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: "0 0 8px" }}>{b.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, margin: 0, maxWidth: "48ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{b.body}</p>
            </div>
          ))}
        </div>
        <figure className="grayscale sticky-fig" style={{ margin: 0, aspectRatio: "3/4", position: "sticky", top: 96, border: "2px solid var(--color-divider)" }}><Placeholder label="Map / site plan" /></figure>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 56px) clamp(48px, 6vw, 80px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.4vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>FAQ</h2>
        <FAQ items={FAQS} />
      </section>
    </div>
  );
}
