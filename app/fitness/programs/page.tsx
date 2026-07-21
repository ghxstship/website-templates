import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { PROGRAMS } from "@/lib/fitness";
export const metadata: Metadata = { title: "Programs" };
export default function ProgramsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Ways to train" title="Programs" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        {PROGRAMS.map((p) => (
          <div key={p.name} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.5fr) minmax(0,1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
            <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", border: "2px solid var(--color-divider)" }}><Placeholder label={p.name} /></figure>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}><span className="tag tag-accent">{p.level}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{p.freq}</span></div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>{p.name}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 18px", maxWidth: "52ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{p.desc}</p>
              <Link href="/fitness/schedule" className="btn btn-primary" style={{ padding: "10px 20px" }}>See classes</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
