import type { Metadata } from "next";
import { getSiteData } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { Discography } from "@/components/music/Discography";

export const revalidate = 60;
export const metadata: Metadata = { title: "Music" };

export default async function MusicPage() {
  const { albums } = await getSiteData();
  return (
    <div className="fadein">
      <PageHeader kicker="Discography" title="Music" />
      <section
        className="wrap"
        style={{ paddingBlock: "8px clamp(48px, 6vw, 88px)" }}
      >
        <Discography albums={albums} />
      </section>
    </div>
  );
}
