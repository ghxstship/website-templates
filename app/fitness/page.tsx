import Link from "next/link";
import { FITNESS, STATS, PILLARS } from "@/lib/fitness";
import { Placeholder } from "@/components/Placeholder";

export default function FitnessHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 72px) clamp(20px, 3vw, 36px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>{FITNESS.kind} — {FITNESS.city}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(44px, 9vw, 132px)", lineHeight: 0.88, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{FITNESS.heroLine}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "54ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{FITNESS.heroSub}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/fitness/membership" className="btn btn-primary" style={{ padding: "13px 22px" }}>Start free trial</Link>
          <Link href="/fitness/schedule" className="btn btn-secondary" style={{ padding: "13px 22px" }}>View timetable</Link>
        </div>
      </section>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}><Placeholder label="Gym hero" /></figure>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(28px, 4vw, 44px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>Train your way</h2>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {PILLARS.map((p) => (
            <Link key={p.title} href="/fitness/programs" style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3" }}><Placeholder label={p.title} /></figure>
              <div style={{ padding: "18px 20px 22px" }}><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 6px" }}>{p.title}</h3><p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{p.desc}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <section style={{ borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 32, alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>First class free. No contract.</h2>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.55, margin: "0 0 20px", maxWidth: "42ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>Try any class on us. Stay for the community, the coaching and the kit.</p>
            <Link href="/fitness/schedule" className="btn btn-primary" style={{ padding: "13px 22px" }}>Book your first class</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
