import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Account } from "@/components/ticketing/TicketingClient";

export const metadata: Metadata = { title: "My account" };

export default function AccountPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Member" title="My account" />
      <Account />
    </div>
  );
}
