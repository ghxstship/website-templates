import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DiscoverGrid } from "@/components/booking/BookingClient";
import { BUSINESSES } from "@/lib/booking";
export const metadata: Metadata = { title: "Discover" };
export default async function DiscoverPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  return <div className="fadein"><PageHeader kicker={`${BUSINESSES.length} places`} title="Discover" /><DiscoverGrid initialCat={cat ?? "all"} /></div>;
}
