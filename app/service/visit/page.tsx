import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { SERVICE, VISIT_INFO, HOURS } from "@/lib/service";

export const metadata: Metadata = { title: "Visit" };

export default function VisitPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Find us" title="Visit" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(28px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div>
          {VISIT_INFO.map((b) => (
            <div key={b.title} style={{ padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 8px" }}>{b.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: "46ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{b.body}</p>
            </div>
          ))}
          <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={SERVICE.bookHref} className="btn btn-primary" style={{ padding: "12px 20px", textDecoration: "none" }}>Book an appointment</Link>
          </div>
        </div>
        <div>
          <figure className="grayscale" style={{ margin: "0 0 20px", aspectRatio: "4/3", border: "2px solid var(--color-divider)" }}><Placeholder label="Map / storefront" /></figure>
          <div style={{ border: "2px solid var(--color-divider)" }}>
            <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, textTransform: "uppercase" }}>Opening hours</div>
            {HOURS.map(([day, time]) => (
              <div key={day} style={{ display: "flex", justifyContent: "space-between", padding: "9px 18px", fontSize: 14, borderBottom: "1px solid var(--color-divider)" }}>
                <span style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>{day}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
