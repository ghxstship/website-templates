import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { EVENTS } from "@/lib/attraction";

export const metadata: Metadata = { title: "What's on" };

export default function EventsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Events & activations" title="What's on" />
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {EVENTS.map((e) => (
          <div key={e.title} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.5fr) minmax(0,1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
            <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", border: "2px solid var(--color-divider)" }}><Placeholder /></figure>
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}><span className="tag tag-accent">{e.type}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{e.dates}</span></div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>{e.title}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 18px", maxWidth: "52ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{e.desc}</p>
              <Link href="/attraction/tickets" className="btn btn-primary" style={{ padding: "10px 20px" }}>Add to your visit</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
