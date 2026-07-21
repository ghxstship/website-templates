import type { Metadata } from "next";
import { getSiteData } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";

export const revalidate = 60;
export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const { contacts } = await getSiteData();
  return (
    <div className="fadein">
      <PageHeader kicker="Get in touch" title="Contact" />
      <section
        className="wrap split2"
        style={{
          paddingBlock: "clamp(36px, 5vw, 64px) clamp(48px, 6vw, 88px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "start",
        }}
      >
        <div>
          {contacts.map((c) => (
            <div
              key={c.role}
              style={{
                paddingBlock: 18,
                borderBottom: "1px solid var(--color-divider)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
                  marginBottom: 8,
                }}
              >
                {c.role}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 18,
                  marginBottom: 4,
                }}
              >
                {c.name}
              </div>
              <a href={`mailto:${c.email}`} style={{ fontSize: 15 }}>
                {c.email}
              </a>
            </div>
          ))}
        </div>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3vw, 34px)",
              letterSpacing: "-0.015em",
              margin: "0 0 24px",
            }}
          >
            Booking &amp; enquiries
          </h2>
          <ContactForm
            template="artist"
            subjects={["Booking / live", "Press / interview", "Licensing / sync", "General"]}
            successBody="Thanks for reaching out — we'll be in touch within a few days."
          />
        </div>
      </section>
    </div>
  );
}
