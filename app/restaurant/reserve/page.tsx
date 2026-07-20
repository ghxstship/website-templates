import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ReservationForm } from "@/components/restaurant/RestaurantClient";

export const metadata: Metadata = { title: "Reservations" };

export default function ReservePage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Book a table" title="Reservations" />
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 56px) clamp(48px, 6vw, 80px)", maxWidth: 720 }}>
        <ReservationForm />
      </section>
    </div>
  );
}
