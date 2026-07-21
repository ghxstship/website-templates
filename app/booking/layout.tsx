import type { Metadata } from "next";
import { BookingHeader } from "@/components/booking/BookingClient";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { BOOKING, NAV } from "@/lib/booking";

export const metadata: Metadata = {
  title: { default: `${BOOKING.brand} — Book anything`, template: `%s — ${BOOKING.brand}` },
  description: "The booking platform behind local service businesses — appointments, deposits and reminders in one place.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <BookingHeader />
      <main>{children}</main>
      <SiteFooter brand={BOOKING.brand} tagline="The booking platform behind local service businesses — appointments, deposits and reminders in one place." columns={[{ title: "Platform", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={["Instagram", "X / Twitter", "LinkedIn"]} />
    </div>
  );
}
