import { notFound } from "next/navigation";
import { EVENTS } from "@/lib/venue";
import { EventDetail } from "@/components/venue/VenueClient";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

export default async function VenueEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);
  if (!event) notFound();
  return <div className="fadein"><EventDetail event={event} /></div>;
}
