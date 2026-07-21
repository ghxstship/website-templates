import Link from "next/link";
import { WELLNESS, STATS } from "@/lib/wellness";
import { Placeholder } from "@/components/Placeholder";
import { FeaturedTreatments } from "@/components/wellness/WellnessClient";

export default function WellnessHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 72px) clamp(20px, 3vw, 32px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>{WELLNESS.kind} — {WELLNESS.city}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(44px, 8vw, 120px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{WELLNESS.brand}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "54ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{WELLNESS.tagline}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/wellness/treatments" className="btn btn-primary" style={{ padding: "13px 22px", textDecoration: "none" }}>Book a treatment</Link>
          <Link href="/wellness/retreats" className="btn btn-secondary" style={{ padding: "13px 22px", textDecoration: "none" }}>Explore retreats</Link>
        </div>
      </section>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}><Placeholder label="Spa image" /></figure>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(26px, 4vw, 42px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Signature treatments</h2>
          <Link href="/wellness/treatments" className="btn btn-ghost" style={{ padding: "8px 4px" }}>Full menu →</Link>
        </div>
        <FeaturedTreatments />
      </section>
    </div>
  );
}
