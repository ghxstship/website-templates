import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EventsList } from "@/components/ticketing/TicketingClient";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Browse" title="Events" />
      <EventsList />
    </div>
  );
}
