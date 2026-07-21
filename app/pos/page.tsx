import Link from "next/link";
import { POS, STATS } from "@/lib/pos";
import { StorefrontGrid } from "@/components/pos/PosClient";

export default function PosHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 68px) clamp(20px, 3vw, 32px)" }}>
        <div className="kicker" style={{ marginBottom: 20 }}>{POS.tagline}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 108px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 22px", textTransform: "uppercase" }}>{POS.heroLine}</h1>
        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.55, maxWidth: "60ch", margin: "0 0 28px", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>One checkout for every storefront. Take a single-store payment, or combine carts from many stores — restaurants, merch, bars, tickets, travel — into one unified basket and one settlement, like Uber Eats or Toast.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/pos/cart" className="btn btn-primary" style={{ padding: "12px 22px", textDecoration: "none" }}>View unified cart</Link>
          <Link href="/pos/register" className="btn btn-secondary" style={{ padding: "12px 22px", textDecoration: "none" }}>Try the register</Link>
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px)" }}>
        <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: "var(--color-bg)", padding: 24 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", color: "var(--color-accent)", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 4vw, 56px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 8px", textTransform: "uppercase" }}>Connected storefronts</h2>
        <p style={{ fontSize: 15, margin: "0 0 24px", maxWidth: "60ch", color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>Every template in the system checks out through here. Drop a sample item from any store into the shared cart — they all settle together.</p>
        <StorefrontGrid />
      </section>
    </div>
  );
}
