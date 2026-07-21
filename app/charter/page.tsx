import Link from "next/link";
import { CHARTER, STATS } from "@/lib/charter";
import { Placeholder } from "@/components/Placeholder";
import { RequestEngine } from "@/components/charter/CharterClient";

export default function CharterHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 68px) clamp(20px, 3vw, 28px)" }}>
        <div className="kicker" style={{ marginBottom: 20 }}>{CHARTER.tagline}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 110px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: 0, textTransform: "uppercase" }}>{CHARTER.heroLine}</h1>
      </section>
      <section className="wrap" style={{ paddingBottom: "clamp(28px, 4vw, 48px)" }}>
        <RequestEngine />
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px)" }}>
        <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: "var(--color-bg)", padding: 26 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 46px)", color: "var(--color-accent)", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 40, alignItems: "center" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 14 }}>Part of your itinerary</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 16px", textTransform: "uppercase" }}>Bookable inside your trip</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 22px", maxWidth: "46ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>Every charter here is also a leg in the travel booking engine — add a jet, helicopter transfer, yacht week or black-car ground service to a stay or tour and it settles on one itinerary and one invoice.</p>
          <Link href="/charter/request" className="btn btn-secondary" style={{ padding: "11px 20px", textDecoration: "none" }}>Start a request</Link>
        </div>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", border: "2px solid var(--color-divider)" }}><Placeholder label="Charter imagery" /></figure>
      </section>
    </div>
  );
}
