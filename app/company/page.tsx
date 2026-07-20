import Link from "next/link";
import { COMPANY, CLIENTS, STATS, FEATURES, HERO_QUOTE } from "@/lib/company";
import { Placeholder } from "@/components/Placeholder";

export default function CompanyHome() {
  return (
    <div className="fadein">
      <section className="wrap split2" style={{ paddingBlock: "clamp(44px, 7vw, 96px) clamp(36px, 5vw, 72px)", display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: "clamp(28px, 5vw, 72px)", alignItems: "center" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 24 }}>{COMPANY.category}</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.98, letterSpacing: "-0.03em", margin: "0 0 24px" }}>{COMPANY.headline}</h1>
          <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "48ch", margin: "0 0 32px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{COMPANY.subhead}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/company/contact" className="btn btn-primary" style={{ padding: "13px 22px" }}>Book a demo</Link>
            <Link href="/company/products" className="btn btn-secondary" style={{ padding: "13px 22px" }}>Explore the platform</Link>
          </div>
        </div>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/5", border: "2px solid var(--color-divider)" }}>
          <Placeholder label="Product / team" />
        </figure>
      </section>

      <section style={{ borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ paddingBlock: 28 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Trusted by teams at</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 40px", alignItems: "center" }}>
            {CLIENTS.map((c) => (
              <span key={c} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)", color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap grid4" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {STATS.map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 3.4vw, 46px)", color: "var(--color-accent)", lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 62%, transparent)", marginTop: 10 }}>{s.label}</div>
          </div>
        ))}
      </section>

      <hr className="rule" />

      <section className="wrap" style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
        {FEATURES.map((f) => (
          <div key={f.no} className="split2" style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) minmax(0,1fr)", gap: "clamp(20px, 4vw, 64px)", alignItems: "baseline", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>{f.no}</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.015em", margin: 0 }}>{f.title}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{f.body}</p>
          </div>
        ))}
      </section>

      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: "clamp(44px, 6vw, 88px)" }}>
          <blockquote style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3.4vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 24px", maxWidth: "24ch" }}>“{HERO_QUOTE.quote}”</blockquote>
          <div style={{ fontSize: 15 }}>{HERO_QUOTE.name} — {HERO_QUOTE.role}</div>
        </div>
      </section>

      <section className="wrap split2" style={{ paddingBlock: "clamp(44px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 32, alignItems: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>See it on your data.</h2>
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.55, margin: "0 0 20px", maxWidth: "44ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>A 30-minute walkthrough with a solutions engineer — mapped to your stack, no slides.</p>
          <Link href="/company/contact" className="btn btn-primary" style={{ padding: "13px 24px" }}>Book a demo</Link>
        </div>
      </section>
    </div>
  );
}
