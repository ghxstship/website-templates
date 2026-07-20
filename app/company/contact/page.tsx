import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DemoForm } from "@/components/company/CompanyClient";
import { OFFICES } from "@/lib/company";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Let's talk" title="Contact" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px) clamp(48px, 6vw, 88px)", display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }}>
        <div>
          {OFFICES.map((o) => (
            <div key={o.role} style={{ padding: "18px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{o.role}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{o.name}</div>
              <a href={`mailto:${o.email}`} style={{ fontSize: 15 }}>{o.email}</a>
            </div>
          ))}
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 24px" }}>Book a demo</h2>
          <DemoForm />
        </div>
      </section>
    </div>
  );
}
