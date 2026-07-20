import type { Metadata } from "next";
import { AccountDetails } from "@/components/ecommerce/AccountDetails";

export const metadata: Metadata = { title: "Account" };

const ORDERS = [
  { id: "#AT-4821", date: "Jun 14, 2026", items: "2 items", status: "Delivered" },
  { id: "#AT-4610", date: "May 02, 2026", items: "1 item", status: "Delivered" },
  { id: "#AT-4390", date: "Mar 21, 2026", items: "3 items", status: "Delivered" },
];

export default function AccountPage() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 56px) 24px" }}>
        <div className="kicker" style={{ marginBottom: 16 }}>Your account</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, textTransform: "uppercase" }}>Account</h1>
      </section>
      <hr className="rule" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(32px, 5vw, 56px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 18px" }}>Recent orders</h2>
          {ORDERS.map((o) => (
            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "16px 0", borderTop: "1px solid var(--color-divider)", alignItems: "baseline" }}>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{o.id}</div>
                <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{o.date} — {o.items}</div>
              </div>
              <span className="tag tag-outline">{o.status}</span>
            </div>
          ))}
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 18px" }}>Details</h2>
          <AccountDetails />
        </div>
      </section>
    </div>
  );
}
