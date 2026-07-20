import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { VISIT } from "@/lib/restaurant";

export const metadata: Metadata = { title: "Visit" };

export default function VisitPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Find us" title="Visit" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(32px, 5vw, 56px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div>
          {VISIT.map((b) => (
            <div key={b.title} style={{ padding: "20px 0", borderTop: "2px solid var(--color-divider)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: "0 0 8px" }}>{b.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, margin: 0, maxWidth: "46ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{b.body}</p>
            </div>
          ))}
          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/restaurant/reserve" className="btn btn-primary" style={{ padding: "12px 20px" }}>Reserve a table</Link>
          </div>
        </div>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/4", border: "2px solid var(--color-divider)" }}>
          <Placeholder label="Map / exterior" />
        </figure>
      </section>
    </div>
  );
}
