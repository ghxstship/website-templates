import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { DESTINATIONS } from "@/lib/travel";

export const metadata: Metadata = { title: "Destinations" };

export default function DestinationsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Where to" title="Destinations" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {DESTINATIONS.map((d) => (
            <Link key={d.name} href="/travel/results?mode=stays" style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2" }}><Placeholder label={d.name} /></figure>
              <div style={{ padding: "16px 18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: 0 }}>{d.name}</h3><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>{d.from}</span></div>
                <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 6 }}>{d.note}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
