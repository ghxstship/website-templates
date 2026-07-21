import type { MetadataRoute } from "next";
import { TEMPLATES } from "@/lib/templates";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const root = {
    url: SITE_URL,
    changeFrequency: "weekly" as const,
    priority: 1,
  };
  const templates = TEMPLATES.filter((t) => t.status === "live").map((t) => ({
    url: `${SITE_URL}/${t.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [root, ...templates];
}
