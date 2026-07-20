import Link from "next/link";
import { CAREER, STATS, TYPE_CARDS, LISTINGS } from "@/lib/career";
import { HomeSearch } from "@/components/career/CareerClient";

export default function CareerHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 72px) clamp(20px, 3vw, 36px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>Jobs · Gigs · Auditions · RFPs</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "0 0 20px", textTransform: "uppercase" }}>{CAREER.heroLine}</h1>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.5, maxWidth: "52ch", margin: "0 0 26px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{CAREER.heroSub}</p>
        <HomeSearch />
      </section>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>Browse by type</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {TYPE_CARDS.map((t) => (
            <Link key={t.type} href={`/career/listings?type=${t.type}`} style={{ background: "var(--color-bg)", padding: "28px 24px", textDecoration: "none", color: "var(--color-text)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 34, color: "var(--color-accent)", lineHeight: 1 }}>{LISTINGS.filter((l) => l.type === t.type).length}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: "10px 0 6px", textTransform: "uppercase" }}>{t.label}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
