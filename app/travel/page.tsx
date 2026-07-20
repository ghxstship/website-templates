import Link from "next/link";
import { TRAVEL, DESTINATIONS, STATS } from "@/lib/travel";
import { BookingEngine } from "@/components/travel/TravelClient";
import { Placeholder } from "@/components/Placeholder";

export default function TravelHome() {
  const featured = DESTINATIONS.slice(0, 3);
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px) clamp(20px, 3vw, 32px)" }}>
        <div className="kicker" style={{ marginBottom: 20 }}>One engine, every way to go</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "0 0 8px", textTransform: "uppercase" }}>{TRAVEL.heroLine}</h1>
      </section>

      <BookingEngine />

      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>Featured destinations</h2>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {featured.map((d) => (
            <Link key={d.name} href="/travel/destinations" style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/5" }}><Placeholder label={d.name} /></figure>
              <div style={{ padding: "16px 18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: 0 }}>{d.name}</h3><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>{d.from}</span></div>
                <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 6 }}>{d.note}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
    </div>
  );
}
