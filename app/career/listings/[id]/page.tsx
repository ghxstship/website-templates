import { notFound } from "next/navigation";
import { LISTINGS } from "@/lib/career";
import { ListingDetail } from "@/components/career/CareerClient";
export function generateStaticParams() { return LISTINGS.map((l) => ({ id: l.id })); }
export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id);
  if (!listing) notFound();
  return <div className="fadein"><ListingDetail listing={listing} /></div>;
}
