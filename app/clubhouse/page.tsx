import Link from "next/link";
import { CLUBHOUSE, STATS, PILLARS } from "@/lib/clubhouse";
import { Placeholder } from "@/components/Placeholder";
import { UpcomingList } from "@/components/clubhouse/ClubhouseClient";

export default function ClubhouseHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 72px) clamp(20px, 3vw, 36px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>Members&rsquo; club &amp; workspace — {CLUBHOUSE.city}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(44px, 8vw, 124px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{CLUBHOUSE.brand}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "54ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{CLUBHOUSE.tagline}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/clubhouse/spaces" className="btn btn-primary" style={{ padding: "13px 22px", textDecoration: "none" }}>Take a tour</Link>
          <Link href="/concierge" className="btn btn-secondary" style={{ padding: "13px 22px", textDecoration: "none" }}>Concierge desk ↗</Link>
          <Link href="/membership" className="btn btn-secondary" style={{ padding: "13px 22px", textDecoration: "none" }}>Manage membership ↗</Link>
        </div>
      </section>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}><Placeholder label="Clubhouse image" /></figure>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(26px, 4vw, 42px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>This week at the house</h2>
          <Link href="/clubhouse/calendar" className="btn btn-ghost" style={{ padding: "8px 4px" }}>Full calendar →</Link>
        </div>
        <UpcomingList />
      </section>
      <section style={{ borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap grid3" style={{ paddingBlock: "clamp(32px, 5vw, 60px)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 48px)" }}>
          {PILLARS.map((f) => <div key={f.no}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", marginBottom: 12 }}>{f.no}</div><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(19px, 2.4vw, 26px)", letterSpacing: "-0.015em", margin: "0 0 10px" }}>{f.title}</h3><p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{f.body}</p></div>)}
        </div>
      </section>
    </div>
  );
}
