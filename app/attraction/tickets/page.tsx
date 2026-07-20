import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TicketBuilder } from "@/components/attraction/AttractionClient";
export const metadata: Metadata = { title: "Tickets" };
export default function TicketsPage() {
  return <div className="fadein"><PageHeader kicker="Plan your visit" title="Tickets" /><TicketBuilder /></div>;
}
