import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ListingsList } from "@/components/career/CareerClient";
import { LISTINGS } from "@/lib/career";
export const metadata: Metadata = { title: "Listings" };
export default async function ListingsPage({ searchParams }: { searchParams: Promise<{ type?: string; q?: string }> }) {
  const { type, q } = await searchParams;
  return <div className="fadein"><PageHeader kicker={`${LISTINGS.length} open`} title="Listings" /><ListingsList initialType={type ?? "all"} initialQuery={q ?? ""} /></div>;
}
