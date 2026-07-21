"use client";

import { useLightbox } from "./LightboxContext";
import { LightboxOverlay } from "@/components/ds/LightboxOverlay";

export function Lightbox() {
  const { item, close } = useLightbox();
  if (!item) return null;
  return (
    <LightboxOverlay
      caption={item.caption}
      variant={item.type === "video" ? "video" : "photo"}
      onClose={close}
    />
  );
}
