import type { Metadata } from "next";
import { DROPS } from "@/lib/ecommerce";
import { DropsClient } from "@/components/ecommerce/DropsClient";

export const metadata: Metadata = { title: "Drops" };

export default function DropsPage() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 56px) 24px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 16 }}>
          <span style={{ width: 8, height: 8, background: "var(--color-accent)", borderRadius: "50%" }} />
          Live now — limited releases
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, textTransform: "uppercase" }}>Drops</h1>
      </section>
      <hr className="rule" />
      <DropsClient drops={DROPS} />
    </div>
  );
}
