import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { HireForm } from "@/components/venue/VenueClient";

export const metadata: Metadata = { title: "Hire" };

export default function HirePage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Private events" title="Hire" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(32px, 5vw, 56px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.25, margin: "0 0 24px" }}>From product launches to weddings — the whole building, or a single room.</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>Our events team handles production, catering and staffing end to end. Tell us what you have in mind and we&apos;ll send options and availability within two days.</p>
        </div>
        <HireForm />
      </section>
    </div>
  );
}
