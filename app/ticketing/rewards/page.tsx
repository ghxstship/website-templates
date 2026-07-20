import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Rewards } from "@/components/ticketing/TicketingClient";

export const metadata: Metadata = { title: "Rewards" };

export default function RewardsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Spend your points" title="Rewards" />
      <Rewards />
    </div>
  );
}
