import type { Metadata } from "next";
import { TicketingProvider } from "@/components/ticketing/TicketingContext";
import { TicketingHeader } from "@/components/ticketing/TicketingClient";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { TICKETING, NAV } from "@/lib/ticketing";

export const metadata: Metadata = {
  title: { default: `${TICKETING.brand} — Tickets & membership`, template: `%s — ${TICKETING.brand}` },
  description: "Tickets, membership and rewards for the best live events near you.",
};

export default function TicketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <TicketingProvider>
        <TicketingHeader />
        <main>{children}</main>
        <SiteFooter
          brand={TICKETING.brand}
          tagline="Tickets, membership and rewards for the best live events near you."
          columns={[{ title: "Explore", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]}
          socials={["Instagram", "TikTok", "X / Twitter", "Facebook"]}
        />
      </TicketingProvider>
    </div>
  );
}
