import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EventsList } from "@/components/venue/VenueClient";

export const metadata: Metadata = { title: "What's on" };

export default function EventsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Calendar" title="What's on" />
      <EventsList />
    </div>
  );
}
