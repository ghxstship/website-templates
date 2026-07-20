import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACTS } from "@/lib/event";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Get in touch" title="Contact" />
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 64px) clamp(48px, 6vw, 88px)", display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }}>
        <div>
          {CONTACTS.map((c) => (
            <div key={c.role} style={{ padding: "18px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{c.role}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{c.name}</div>
              <a href={`mailto:${c.email}`} style={{ fontSize: 15 }}>{c.email}</a>
            </div>
          ))}
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 24px" }}>Press, group &amp; partnership enquiries</h2>
          <ContactForm
            template="event"
            subjects={["Press / media", "Group bookings", "Partnerships / sponsorship", "Accessibility", "General"]}
            subjectLabel="Enquiry type"
            successBody="Thanks — the team will reply within two working days."
          />
        </div>
      </section>
    </div>
  );
}
