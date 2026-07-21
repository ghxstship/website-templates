import type { Metadata } from "next";
import { ContactForm } from "@/components/charter/CharterClient";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  return (
    <div className="fadein">
      <section className="wrap split2" style={{ paddingBlock: "clamp(28px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 48 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 14 }}>24/7 flight desk</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 0.95, letterSpacing: "-0.02em", margin: "0 0 20px", textTransform: "uppercase" }}>Talk to the desk</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 24px", maxWidth: "42ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>Wheels-up in as little as four hours. Our advisors answer day or night, anywhere in the world.</p>
          <div style={{ borderTop: "2px solid var(--color-divider)", paddingTop: 18 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20 }}>+1 (800) 555-0199</div>
            <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>desk@charter.example · Available 24/7</div>
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
