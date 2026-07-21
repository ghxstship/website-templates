import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { MENU } from "@/lib/clubhouse";
export const metadata: Metadata = { title: "Dining" };
export default function DiningPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="The kitchen & bar" title="Dining" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div style={{ maxWidth: 520 }}>
          {MENU.map((sec) => (
            <div key={sec.title} style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 4px", paddingBottom: 12, borderBottom: "2px solid var(--color-divider)", textTransform: "uppercase" }}>{sec.title}</h2>
              {sec.items.map((i) => (
                <div key={i.name} style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{i.name}</div><div style={{ fontSize: 13.5, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", marginTop: 3 }}>{i.desc}</div></div>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)" }}>{i.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <figure className="grayscale sticky-fig" style={{ margin: 0, aspectRatio: "3/4", position: "sticky", top: 96, border: "2px solid var(--color-divider)" }}><Placeholder label="The bar" /></figure>
      </section>
    </div>
  );
}
