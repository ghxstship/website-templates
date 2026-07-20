import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Membership } from "@/components/ticketing/TicketingClient";

export const metadata: Metadata = { title: "Membership" };

export default function MembershipPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Join the club" title="Membership" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
        <Membership />
      </section>
    </div>
  );
}
