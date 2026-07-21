import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PaymentsPanel } from "@/components/pos/PosClient";
import { METHOD_CARDS } from "@/lib/pos";
export const metadata: Metadata = { title: "Payments" };
export default function PaymentsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Accept anything" title="Payments" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) 0" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, textTransform: "uppercase", margin: "0 0 16px" }}>Methods</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {METHOD_CARDS.map((m) => (
            <div key={m.name} style={{ background: "var(--color-bg)", padding: 18 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>{m.note}</div>
            </div>
          ))}
        </div>
      </section>
      <PaymentsPanel />
    </div>
  );
}
