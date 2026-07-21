import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DOC_STEPS } from "@/lib/pos";
export const metadata: Metadata = { title: "Integrate" };
export default function DocsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="How it plugs in" title="Integrate" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)", marginBottom: 28 }}>
          {DOC_STEPS.map((s) => (
            <div key={s.n} style={{ background: "var(--color-bg)", padding: 24 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 34, color: "var(--color-accent)", lineHeight: 1 }}>{s.n}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, margin: "12px 0 6px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div style={{ border: "2px solid var(--color-divider)", background: "color-mix(in srgb, var(--color-text) 4%, transparent)", padding: 22, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13, lineHeight: 1.7, overflow: "auto" }}>
          <div style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>// any template hands its cart to the shared checkout</div>
          <div>checkout.add({"{"} vendor: &quot;MERIDIAN Store&quot;, type: &quot;retail&quot;, name: &quot;Tour Tee&quot;, price: 35 {"}"});</div>
          <div>checkout.add({"{"} vendor: &quot;Trattoria&quot;, type: &quot;restaurant&quot;, name: &quot;Margherita&quot;, price: 16 {"}"});</div>
          <div>checkout.open(); <span style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>// one basket, one payment, per-vendor settlement</span></div>
        </div>
      </section>
    </div>
  );
}
