import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PhotoGallery } from "@/components/ds/PhotoGallery";
import { GALLERY } from "@/lib/service";
export const metadata: Metadata = { title: "Gallery" };
export default function GalleryPage() {
  return <div className="fadein"><PageHeader kicker="Recent work" title="Gallery" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><PhotoGallery items={GALLERY} minWidth={220} /></section></div>;
}
