import Link from "next/link";
import { VENUE, EVENTS, STATS } from "@/lib/venue";
import { Placeholder } from "@/components/Placeholder";

export default function VenueHome() {
  const upcoming = EVENTS.slice(0, 4);
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 72px) clamp(24px, 3vw, 40px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>{VENUE.type} — {VENUE.city}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(46px, 9vw, 130px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{VENUE.name}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "56ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{VENUE.tagline}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/venue/events" className="btn btn-primary" style={{ padding: "13px 22px" }}>See what&apos;s on</Link>
          <Link href="/venue/hire" className="btn btn-secondary" style={{ padding: "13px 22px" }}>Hire the venue</Link>
        </div>
      </section>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}><Placeholder label="Venue hero" /></figure>

      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.4vw, 44px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Upcoming</h2>
          <Link href="/venue/events" className="btn btn-ghost">Full calendar →</Link>
        </div>
        {upcoming.map((e) => (
          <Link key={e.id} href={`/venue/events/${e.id}`} className="row-line" style={{ display: "grid", gridTemplateColumns: "130px minmax(0,1fr) minmax(0,0.7fr) auto", gap: 20, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, textTransform: "uppercase" }}>{e.date}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)" }}>{e.title}</div>
            <div className="row-sub"><span className="tag tag-outline">{e.cat}</span></div>
            <span className="btn btn-primary" style={{ padding: "8px 16px" }}>Tickets</span>
          </Link>
        ))}
      </section>

      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>

      <hr className="rule" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 64px)", alignItems: "center" }}>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", border: "2px solid var(--color-divider)" }}><Placeholder label="Store" /></figure>
        <div>
          <div className="kicker" style={{ marginBottom: 16 }}>The shop</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 16px", textTransform: "uppercase" }}>Merch, records &amp; gifts</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 24px", maxWidth: "44ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>Tour merch, limited prints and venue exclusives — shipped worldwide from our online store.</p>
          <Link href="/ecommerce" className="btn btn-primary" style={{ padding: "13px 22px" }}>Visit the store ↗</Link>
        </div>
      </section>
    </div>
  );
}
