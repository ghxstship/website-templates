import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FAQ } from "@/components/ds/FAQ";
import { Placeholder } from "@/components/Placeholder";
import { INFO_BLOCKS, FAQS } from "@/lib/event";

export const metadata: Metadata = { title: "Info" };

export default function InfoPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Getting there" title="Venue & info" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div>
          {INFO_BLOCKS.map((b) => (
            <div key={b.title} style={{ padding: "22px 0", borderTop: "2px solid var(--color-divider)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: "0 0 10px" }}>{b.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, margin: 0, maxWidth: "52ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{b.body}</p>
            </div>
          ))}
        </div>
        <figure className="grayscale sticky-fig" style={{ margin: 0, aspectRatio: "3/4", position: "sticky", top: 96 }}>
          <Placeholder label="Venue map" />
        </figure>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px) clamp(48px, 6vw, 88px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>FAQ</h2>
        <FAQ items={FAQS} />
      </section>
    </div>
  );
}
