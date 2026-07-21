import Link from "next/link";
import { SERVICE, STATS, SERVICES } from "@/lib/service";
import { Placeholder } from "@/components/Placeholder";
import { ArrowRightIcon } from "@/components/icons";

export default function ServiceHome() {
  const featured = SERVICES.slice(0, 3);
  return (
    <div className="fadein">
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 72px)", display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: "clamp(28px, 5vw, 64px)", alignItems: "center" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 22 }}>{SERVICE.trade} — {SERVICE.city}</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 90px)", lineHeight: 0.94, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{SERVICE.name}</h1>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.5, maxWidth: "46ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{SERVICE.tagline}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <Link href={SERVICE.bookHref} className="btn btn-primary" style={{ padding: "13px 22px", textDecoration: "none" }}>Book an appointment</Link>
            <Link href="/service/services" className="btn btn-secondary" style={{ padding: "13px 22px", textDecoration: "none" }}>See services</Link>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 20, fontSize: 13, color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
            <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontWeight: 800 }}>★ {SERVICE.rating}</span> {SERVICE.reviewCount} reviews · {SERVICE.hoursToday}
          </div>
        </div>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/5", border: "2px solid var(--color-divider)" }}><Placeholder label="Shop / work image" /></figure>
      </section>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(26px, 4vw, 42px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>Popular services</h2>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {featured.map((s) => (
            <div key={s.name} style={{ background: "var(--color-bg)", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: 0 }}>{s.name}</h3><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>${s.num}</span></div>
              <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginBottom: 14 }}>{s.dur}</div>
              <Link href={SERVICE.bookHref} className="btn btn-secondary btn-block" style={{ justifyContent: "space-between", textDecoration: "none" }}>Book<ArrowRightIcon size={15} /></Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
