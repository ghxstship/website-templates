import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FAQ } from "@/components/ds/FAQ";
import { FAQS } from "@/lib/ticketing";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Support" title="Help" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
        <FAQ items={FAQS} />
      </section>
    </div>
  );
}
