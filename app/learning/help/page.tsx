import type { Metadata } from "next";
import { HelpCenter } from "@/components/learning/HelpCenter";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = { title: "Help center" };

export default function HelpPage() {
  return (
    <div className="fadein">
      <HelpCenter />
      <section style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap split2" style={{ paddingBlock: "clamp(32px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 32, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 20px", textTransform: "uppercase" }}>Still stuck?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, margin: 0, maxWidth: "42ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>Our team replies within one business day, faster for Pro members.</p>
          </div>
          <ContactForm
            template="learning"
            subjects={["Billing & plans", "Courses & progress", "Community", "Account", "Something else"]}
            subjectLabel="What do you need help with?"
            successBody="Thanks — our support team will reply within one business day."
          />
        </div>
      </section>
    </div>
  );
}
