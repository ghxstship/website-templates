import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { AMENITIES } from "@/lib/hospitality";
export const metadata: Metadata = { title: "Amenities" };
export default function AmenitiesPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="The house & the table" title="Amenities" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {AMENITIES.map((a) => (
            <div key={a.no} style={{ background: "var(--color-bg)", padding: "26px 24px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", marginBottom: 12 }}>{a.no}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 8px" }}>{a.name}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
