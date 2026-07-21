import Link from "next/link";
import { BOOKING, BUSINESSES, HOME_STATS, HOW_IT_WORKS } from "@/lib/booking";
import { HomeSearch } from "@/components/booking/BookingClient";
import { Placeholder } from "@/components/Placeholder";

export default function BookingHome() {
  const featured = BUSINESSES.slice(0, 3);
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 76px) clamp(20px, 3vw, 36px)" }}>
        <div className="kicker" style={{ marginBottom: 20 }}>Book local, instantly</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{BOOKING.heroLine}</h1>
        <HomeSearch />
      </section>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(26px, 4vw, 42px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {HOME_STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Featured near you</h2>
          <Link href="/booking/discover" className="btn btn-ghost">See all →</Link>
        </div>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {featured.map((b) => (
            <Link key={b.slug} href={`/booking/business/${b.slug}`} style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2" }}><Placeholder label={b.name} /></figure>
              <div style={{ padding: "16px 18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: 0 }}>{b.name}</h3><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)", fontSize: 14 }}>★ {b.rating}</span></div>
                <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 6 }}>{b.category} · {b.area} · {b.from}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>How it works</h2>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 48px)" }}>
          {HOW_IT_WORKS.map((h) => <div key={h.no}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", marginBottom: 14 }}>{h.no}</div><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(19px, 2.4vw, 26px)", letterSpacing: "-0.015em", margin: "0 0 10px" }}>{h.title}</h3><p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{h.body}</p></div>)}
        </div>
      </section>
      <section style={{ borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 32, alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Run a business? Fill your calendar.</h2>
          <div><p style={{ fontSize: 16, lineHeight: 1.55, margin: "0 0 20px", maxWidth: "42ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>Take bookings 24/7, cut no-shows with deposits and reminders, and manage your whole day from one screen.</p><Link href="/booking/for-business" className="btn btn-primary" style={{ padding: "13px 22px" }}>List your business</Link></div>
        </div>
      </section>
    </div>
  );
}
