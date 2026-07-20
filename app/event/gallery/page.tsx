import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PhotoGallery } from "@/components/ds/PhotoGallery";
import { GALLERY } from "@/lib/event";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Past editions" title="Gallery" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 88px)" }}>
        <PhotoGallery items={GALLERY} />
      </section>
    </div>
  );
}
