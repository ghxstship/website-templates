import { notFound } from "next/navigation";
import { COMMUNITIES } from "@/lib/social";
import { CommunityDetail } from "@/components/social/SocialClient";
export function generateStaticParams() { return COMMUNITIES.map((c) => ({ slug: c.slug })); }
export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const community = COMMUNITIES.find((c) => c.slug === slug);
  if (!community) notFound();
  return <CommunityDetail community={community} />;
}
