import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TripsList } from "@/components/travel/TravelClient";

export const metadata: Metadata = { title: "My trips" };

export default function TripsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Itinerary" title="My trips" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
        <TripsList />
      </section>
    </div>
  );
}
