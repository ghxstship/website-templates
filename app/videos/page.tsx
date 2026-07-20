import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { VideoGrid } from "@/components/videos/VideoGrid";

export const revalidate = 60;
export const metadata: Metadata = { title: "Videos" };

export default async function VideosPage() {
  const { config, videos } = await getSiteData();
  if (!config.show_videos) notFound();
  return (
    <div className="fadein">
      <PageHeader kicker="Watch" title="Videos" />
      <section
        className="wrap"
        style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 88px)" }}
      >
        <VideoGrid videos={videos} />
      </section>
    </div>
  );
}
