import Link from "next/link";
import { RESTAURANT, STATS } from "@/lib/restaurant";
import { Placeholder } from "@/components/Placeholder";

export default function RestaurantHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(40px, 6vw, 84px) clamp(24px, 3vw, 40px)", textAlign: "center" }}>
        <div className="kicker" style={{ letterSpacing: "0.18em", marginBottom: 24 }}>{RESTAURANT.accolade} — {RESTAURANT.city}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(48px, 9vw, 128px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 auto 26px", textTransform: "uppercase", maxWidth: "16ch" }}>{RESTAURANT.name}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "52ch", margin: "0 auto 32px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{RESTAURANT.tagline}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/restaurant/reserve" className="btn btn-primary" style={{ padding: "13px 24px" }}>Reserve a table</Link>
          <Link href="/restaurant/menus" className="btn btn-secondary" style={{ padding: "13px 24px" }}>View the menu</Link>
        </div>
      </section>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}>
        <Placeholder label="Dining room" />
      </figure>

      <hr className="rule" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(40px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 72px)", alignItems: "center" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 18 }}>The kitchen</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.8vw, 50px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 20px" }}>A single tasting menu, written each morning.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 26px", maxWidth: "46ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{RESTAURANT.blurb}</p>
          <Link href="/restaurant/about" className="btn btn-ghost">Meet the chef →</Link>
        </div>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/5", border: "2px solid var(--color-divider)" }}>
          <Placeholder label="Chef portrait" />
        </figure>
      </section>

      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.6vw, 46px)", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="rule" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(40px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 64px)", alignItems: "center" }}>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", border: "2px solid var(--color-divider)" }}>
          <Placeholder label="Provisions" />
        </figure>
        <div>
          <div className="kicker" style={{ marginBottom: 16 }}>At home</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 16px" }}>Order the provisions menu</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 24px", maxWidth: "44ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>A shorter à la carte for collection and local delivery — the same kitchen, at your table.</p>
          <Link href="/restaurant/order" className="btn btn-primary" style={{ padding: "13px 22px" }}>Order online</Link>
        </div>
      </section>
    </div>
  );
}
