import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SellForm } from "@/components/realestate/RealEstateClient";
import { SELL_STEPS } from "@/lib/realestate";

export const metadata: Metadata = { title: "Sell" };

export default function SellPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Sell or let with us" title="List your home" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(28px, 4vw, 56px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.25, margin: "0 0 20px" }}>A free, no-obligation valuation in 48 hours.</p>
          {SELL_STEPS.map((s) => (
            <div key={s.no} style={{ display: "flex", gap: 14, alignItems: "baseline", padding: "14px 0", borderTop: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>{s.no}</span>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{s.title}</div>
                <div style={{ fontSize: 13.5, color: "color-mix(in srgb, var(--color-text) 72%, transparent)", marginTop: 3 }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div><SellForm /></div>
      </section>
    </div>
  );
}
