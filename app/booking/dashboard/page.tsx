import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProviderDashboard } from "@/components/booking/BookingClient";
import { BUSINESSES } from "@/lib/booking";
export const metadata: Metadata = { title: "Dashboard" };
export default function DashboardPage() { return <div className="fadein"><PageHeader kicker={`${BUSINESSES[0].name} · Today`} title="Dashboard" /><ProviderDashboard /></div>; }
