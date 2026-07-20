import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const revalidate = 60;
export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const { config, gallery } = await getSiteData();
  if (!config.show_gallery) notFound();
  return (
    <div className="fadein">
      <PageHeader kicker="Photography" title="Gallery" />
      <section
        className="wrap"
        style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 88px)" }}
      >
        <GalleryGrid items={gallery} />
      </section>
    </div>
  );
}
