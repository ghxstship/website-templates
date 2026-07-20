import Link from "next/link";
import { ATTRACTION, ATTRACTIONS, STATS } from "@/lib/attraction";
import { Placeholder } from "@/components/Placeholder";

export default function AttractionHome() {
  const featured = ATTRACTIONS.slice(0, 3);
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 72px) clamp(20px, 3vw, 36px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>{ATTRACTION.kind} — {ATTRACTION.city}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(46px, 9vw, 128px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{ATTRACTION.name}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "56ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{ATTRACTION.tagline}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/attraction/tickets" className="btn btn-primary" style={{ padding: "13px 22px" }}>Book your visit</Link>
          <Link href="/attraction/attractions" className="btn btn-secondary" style={{ padding: "13px 22px" }}>What to see</Link>
        </div>
      </section>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}><Placeholder label="Hero" /></figure>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Don&apos;t miss</h2>
          <Link href="/attraction/attractions" className="btn btn-ghost">See everything →</Link>
        </div>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {featured.map((a) => (
            <Link key={a.title} href="/attraction/attractions" style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/5" }}><Placeholder label={a.title} /></figure>
              <div style={{ padding: "16px 18px 20px" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 8 }}>{a.tag}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: 0 }}>{a.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
