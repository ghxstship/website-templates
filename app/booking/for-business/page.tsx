import type { Metadata } from "next";
import Link from "next/link";
import { BIZ_FEATURES, BIZ_STATS } from "@/lib/booking";

export const metadata: Metadata = { title: "For business" };

export default function ForBusinessPage() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 76px) clamp(20px, 3vw, 36px)" }}>
        <div className="kicker" style={{ marginBottom: 20 }}>For business</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(38px, 6.5vw, 92px)", lineHeight: 0.94, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase", maxWidth: "16ch" }}>Everything you need to get booked.</h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, margin: "0 0 28px", maxWidth: "48ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>Take bookings around the clock, cut no-shows with deposits, and run your whole day from one calendar. No setup fees, live in minutes.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/booking/pricing" className="btn btn-primary" style={{ padding: "13px 24px" }}>See pricing</Link>
          <Link href="/booking/dashboard" className="btn btn-ghost" style={{ padding: "13px 24px" }}>View the dashboard →</Link>
        </div>
      </section>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(26px, 4vw, 42px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {BIZ_STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {BIZ_FEATURES.map((f) => (
            <div key={f.no} style={{ background: "var(--color-bg)", padding: "26px 24px 30px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", marginBottom: 14 }}>{f.no}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(19px, 2.2vw, 24px)", letterSpacing: "-0.015em", margin: "0 0 10px" }}>{f.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: "0 0 20px", textTransform: "uppercase" }}>Go live today.</h2>
          <Link href="/booking/pricing" className="btn btn-primary" style={{ padding: "14px 28px" }}>Choose a plan</Link>
        </div>
      </section>
    </div>
  );
}
