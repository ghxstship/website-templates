import Link from "next/link";
import { HOSPITALITY, STATS } from "@/lib/hospitality";
import { Placeholder } from "@/components/Placeholder";
import { HomeSearch, FeaturedRooms } from "@/components/hospitality/HospitalityClient";

export default function HospitalityHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 6vw, 72px) clamp(20px, 3vw, 32px)" }}>
        <div className="kicker" style={{ marginBottom: 22 }}>{HOSPITALITY.kind} — {HOSPITALITY.city}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(44px, 8vw, 124px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{HOSPITALITY.brand}</h1>
        <p style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, maxWidth: "54ch", margin: "0 0 28px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{HOSPITALITY.tagline}</p>
        <HomeSearch />
      </section>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "21/9" }}><Placeholder label="Hotel image" /></figure>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap grid4" style={{ paddingBlock: "clamp(26px, 4vw, 42px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Rooms & suites</h2>
          <Link href="/hospitality/rooms" className="btn btn-ghost" style={{ padding: "8px 4px" }}>All rooms →</Link>
        </div>
        <FeaturedRooms />
      </section>
    </div>
  );
}
