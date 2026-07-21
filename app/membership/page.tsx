import Link from "next/link";
import { MEMBERSHIP, STATS, PILLARS } from "@/lib/membership";

export default function MembershipHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(40px, 6vw, 80px) clamp(20px, 3vw, 36px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>Members only · est. {MEMBERSHIP.estYear}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(42px, 8vw, 118px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{MEMBERSHIP.heroLine}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "56ch", margin: "0 0 32px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{MEMBERSHIP.heroSub}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/membership/apply" className="btn btn-primary" style={{ padding: "13px 22px", textDecoration: "none" }}>Request invite</Link>
          <Link href="/membership/ecosystem" className="btn btn-secondary" style={{ padding: "13px 22px", textDecoration: "none" }}>Explore the ecosystem</Link>
          <Link href="/clubhouse" className="btn btn-secondary" style={{ padding: "13px 22px", textDecoration: "none" }}>Enter the Clubhouse ↗</Link>
        </div>
      </section>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(28px, 4vw, 44px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>One membership. Every door.</h2>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {PILLARS.map((f) => (
            <div key={f.no} style={{ background: "var(--color-bg)", padding: "26px 24px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", marginBottom: 14 }}>{f.no}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 10px" }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 32, alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Membership is by application.</h2>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.55, margin: "0 0 20px", maxWidth: "42ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>We keep the house the right size. Apply, tell us who you are, and we&rsquo;ll be in touch — or skip the line with a member&rsquo;s referral.</p>
            <Link href="/membership/apply" className="btn btn-primary" style={{ padding: "13px 22px", textDecoration: "none" }}>Request an invitation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
