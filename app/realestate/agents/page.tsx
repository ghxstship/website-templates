import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { AGENTS } from "@/lib/realestate";
export const metadata: Metadata = { title: "Agents" };
export default function AgentsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Local experts" title="Our agents" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {AGENTS.map((a) => (
            <div key={a.name} style={{ background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "1/1" }}><Placeholder label={a.name} /></figure>
              <div style={{ padding: "18px 20px 22px" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 2px" }}>{a.name}</h3>
                <div style={{ fontSize: 13, color: "var(--color-accent-700)", marginBottom: 10 }}>{a.role}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{a.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
