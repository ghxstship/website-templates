import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CONTACTS } from "@/lib/venue";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Get in touch" title="Contact" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 56px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
          {CONTACTS.map((c) => (
            <div key={c.role} style={{ borderTop: "2px solid var(--color-divider)", paddingTop: 18 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{c.role}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{c.name}</div>
              <a href={`mailto:${c.email}`} style={{ fontSize: 14 }}>{c.email}</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
