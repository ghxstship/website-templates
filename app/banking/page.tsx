import Link from "next/link";
import { BANKING, STATS, FEATURES, SEGMENTS } from "@/lib/banking";
import { OpenAccountButton } from "@/components/banking/BankingClient";

export default function BankingHome() {
  return (
    <div className="fadein">
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 72px)", display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: "clamp(28px, 5vw, 64px)", alignItems: "center" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 22 }}>Banking · Wallet · Crypto</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.96, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{BANKING.heroLine}</h1>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.5, maxWidth: "46ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{BANKING.heroSub}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <OpenAccountButton label="Open an account" className="btn btn-primary" style={{ padding: "13px 22px" }} />
            <Link href="/banking/dashboard" className="btn btn-secondary" style={{ padding: "13px 22px" }}>See the app</Link>
          </div>
        </div>
        <div style={{ border: "2px solid var(--color-divider)", background: "var(--color-text)", color: "var(--color-bg)", padding: "clamp(22px, 3vw, 32px)", aspectRatio: "16/10", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13 }}>{BANKING.brand}</span><span style={{ width: 34, height: 26, background: "var(--color-accent)" }} /></div>
          <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 3vw, 30px)", letterSpacing: "0.08em" }}>•••• •••• •••• 4021</div><div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 }}><span>A. Rivera</span><span>Metal · Crypto-enabled</span></div></div>
        </div>
      </section>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(28px, 4vw, 44px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>Everything in one wallet</h2>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {FEATURES.map((f) => (
            <div key={f.no} style={{ background: "var(--color-bg)", padding: "26px 24px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)", marginBottom: 14 }}>{f.no}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 10px" }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 8px", textTransform: "uppercase" }}>Built for who you are</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)", marginTop: 20 }}>
          {SEGMENTS.map((s) => (
            <Link key={s.name} href={`/banking/plans?tab=${s.tab}`} style={{ background: "var(--color-bg)", padding: "26px 24px", textDecoration: "none", color: "var(--color-text)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: "0 0 8px", textTransform: "uppercase" }}>{s.name}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: "0 0 14px", color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{s.desc}</p>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-accent-700)" }}>Compare plans →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
