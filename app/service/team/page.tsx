import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { SERVICE, TEAM } from "@/lib/service";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Your specialists" title="The team" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {TEAM.map((t) => (
            <div key={t.name} style={{ background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "1/1" }}><Placeholder label={t.name} /></figure>
              <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 2px" }}>{t.name}</h3>
                <div style={{ fontSize: 13, color: "var(--color-accent-700)", marginBottom: 10 }}>{t.role}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: "0 0 16px", flex: 1, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{t.bio}</p>
                <Link href={SERVICE.bookHref} className="btn btn-secondary" style={{ justifyContent: "center", padding: "10px 16px", textDecoration: "none" }}>Book with {t.name.split(" ")[0]}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
