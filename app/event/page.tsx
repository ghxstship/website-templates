import Link from "next/link";
import { EVENT, HEADLINERS, HIGHLIGHTS } from "@/lib/event";
import { EventCountdown } from "@/components/event/EventClient";
import { NewsletterInline } from "@/components/forms/NewsletterInline";
import { Placeholder } from "@/components/Placeholder";

export default function EventHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(40px, 7vw, 88px) clamp(28px, 4vw, 56px)" }}>
        <div className="kicker" style={{ marginBottom: 24 }}>{EVENT.kind} — {EVENT.location}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(48px, 10vw, 140px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{EVENT.name}</h1>
        <div style={{ display: "flex", gap: "16px 32px", flexWrap: "wrap", alignItems: "baseline", marginBottom: 28 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.4vw, 30px)" }}>{EVENT.dates}</span>
          <span style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>{EVENT.venueName}</span>
        </div>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.5, maxWidth: "56ch", margin: "0 0 32px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{EVENT.tagline}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/event/tickets" className="btn btn-primary" style={{ padding: "13px 22px" }}>Get tickets</Link>
          <Link href="/event/lineup" className="btn btn-secondary" style={{ padding: "13px 22px" }}>See the lineup</Link>
        </div>
      </section>

      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}>
        <Placeholder label="Event hero" />
      </figure>

      <EventCountdown />

      <hr className="rule" />

      <section className="wrap" style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Headlining</h2>
          <Link href="/event/lineup" className="btn btn-ghost">Full lineup →</Link>
        </div>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {HEADLINERS.map((a) => (
            <div key={a.name} style={{ background: "var(--color-bg)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "1/1" }}>
                <Placeholder label="Act photo" />
              </figure>
              <div style={{ padding: "18px 20px 22px" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.2vw, 28px)", margin: "0 0 6px" }}>{a.name}</h3>
                <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{a.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap" style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(24px, 4vw, 56px)" }}>
          {HIGHLIGHTS.map((h) => (
            <div key={h.no}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", marginBottom: 16 }}>{h.no}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>{h.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap split2" style={{ paddingBlock: "clamp(40px, 5vw, 68px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 32, alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.6vw, 46px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Get presale access &amp; updates.</h2>
          <NewsletterInline template="event" source="presale" success="You're on the list. Presale codes on the way." />
        </div>
      </section>
    </div>
  );
}
