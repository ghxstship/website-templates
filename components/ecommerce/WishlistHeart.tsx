"use client";

import { SaveHeart } from "@/components/ds/SaveHeart";
import { useFavorites } from "@/lib/useFavorites";

export function WishlistHeart({ slug, name, overlay = true }: { slug: string; name: string; overlay?: boolean }) {
  const fav = useFavorites("ecom", "Product");
  return <SaveHeart overlay={overlay} active={fav.isSaved(slug)} onToggle={() => fav.toggle(slug, name)} label="Add to wishlist" size={17} />;
}
