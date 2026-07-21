import Link from "next/link";
import { NONPROFIT, STATS, PROGRAMS, QUOTE } from "@/lib/nonprofit";
import { Placeholder } from "@/components/Placeholder";

export default function NonprofitHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 72px) clamp(20px, 3vw, 32px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>{NONPROFIT.cause}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 108px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{NONPROFIT.heroLine}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "56ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{NONPROFIT.heroSub}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/nonprofit/donate" className="btn btn-primary" style={{ padding: "13px 22px", textDecoration: "none" }}>Donate now</Link>
          <Link href="/nonprofit/work" className="btn btn-secondary" style={{ padding: "13px 22px", textDecoration: "none" }}>Our work</Link>
        </div>
      </section>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}><Placeholder label="Cause image" /></figure>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(26px, 4vw, 42px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>Where your gift goes</h2>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {PROGRAMS.map((pr) => (
            <div key={pr.name} style={{ background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2" }}><Placeholder label={pr.name} /></figure>
              <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 8px" }}>{pr.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, margin: "0 0 14px", flex: 1, color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>{pr.body}</p>
                <Link href="/nonprofit/donate" className="btn btn-secondary" style={{ justifyContent: "center", padding: "10px 16px", textDecoration: "none" }}>Fund this</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 32, alignItems: "center" }}>
          <blockquote style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", lineHeight: 1.2, letterSpacing: "-0.015em", margin: 0 }}>&ldquo;{QUOTE.text}&rdquo;</blockquote>
          <div>
            <div style={{ fontSize: 15, fontFamily: "var(--font-heading)", fontWeight: 800 }}>{QUOTE.name}</div>
            <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 62%, transparent)", marginTop: 4 }}>{QUOTE.role}</div>
            <Link href="/nonprofit/donate" className="btn btn-primary" style={{ marginTop: 20, padding: "12px 20px", textDecoration: "none" }}>Join them</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
