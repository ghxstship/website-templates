import { notFound } from "next/navigation";
import { EVENTS } from "@/lib/ticketing";
import { EventDetail } from "@/components/ticketing/TicketingClient";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);
  if (!event) notFound();
  return (
    <div className="fadein">
      <EventDetail event={event} />
    </div>
  );
}
