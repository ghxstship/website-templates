import { notFound } from "next/navigation";
import { MEDIA } from "@/lib/streaming";
import { MediaDetail } from "@/components/streaming/StreamingClient";
export function generateStaticParams() { return MEDIA.map((m) => ({ id: m.id })); }
export default async function MediaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const media = MEDIA.find((m) => m.id === id);
  if (!media) notFound();
  return <div className="fadein"><MediaDetail media={media} /></div>;
}
