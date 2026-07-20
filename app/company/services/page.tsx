import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SERVICES } from "@/lib/company";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="How we help" title="Services" />
      <section className="wrap" style={{ paddingBlock: "8px clamp(48px, 6vw, 88px)" }}>
        {SERVICES.map((s) => (
          <div key={s.no} className="split2" style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) minmax(0,1.1fr)", gap: "clamp(20px, 4vw, 64px)", alignItems: "baseline", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>{s.no}</div>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.015em", margin: "0 0 10px" }}>{s.title}</h2>
              <span className="tag tag-outline">{s.tag}</span>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{s.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
