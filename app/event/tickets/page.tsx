import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TicketTiers } from "@/components/event/EventClient";

export const metadata: Metadata = { title: "Tickets" };

export default function TicketsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Admission" title="Tickets" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 88px)" }}>
        <TicketTiers />
        <p style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 20, maxWidth: "60ch" }}>
          All tickets include entry for the full run. Prices exclude booking fee. Under-16s free with a paying adult. Access &amp; companion tickets available — see the Info page.
        </p>
        <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 50%, transparent)", marginTop: 24 }}>
          Ticketing powered by <Link href="/ticketing">FRONTROW ↗</Link>
        </p>
      </section>
    </div>
  );
}
