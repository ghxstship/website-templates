import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DonateForm, DonateAside } from "@/components/nonprofit/NonprofitClient";
export const metadata: Metadata = { title: "Donate" };
export default function DonatePage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Every gift counts" title="Donate" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
        <DonateForm />
        <DonateAside />
      </section>
    </div>
  );
}
