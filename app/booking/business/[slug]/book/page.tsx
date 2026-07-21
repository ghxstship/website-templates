import { notFound } from "next/navigation";
import { BUSINESSES, bizBySlug } from "@/lib/booking";
import { BookingFlow } from "@/components/booking/BookingClient";
export function generateStaticParams() { return BUSINESSES.map((b) => ({ slug: b.slug })); }
export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const biz = bizBySlug(slug);
  if (!biz) notFound();
  return <div className="fadein"><BookingFlow biz={biz} /></div>;
}
