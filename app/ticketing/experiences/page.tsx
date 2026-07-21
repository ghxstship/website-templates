import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Experiences } from "@/components/ticketing/TicketingClient";

export const metadata: Metadata = { title: "Experiences" };

export default function ExperiencesPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Money can't-normally-buy" title="Experiences" />
      <Experiences />
    </div>
  );
}
