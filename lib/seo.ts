import type { Metadata } from "next";

/**
 * Canonical site origin. Override per-deploy with NEXT_PUBLIC_SITE_URL
 * (e.g. the production domain); falls back to the Vercel preview URL, then a
 * stable default so metadataBase / sitemap / robots always resolve.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  "https://modernist-suite.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Modernist Suite";

/**
 * Per-page metadata helper. Templates call this from their route/layout to get
 * consistent title, canonical URL and OpenGraph/Twitter cards for free.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  images,
}: {
  title: string;
  description: string;
  path?: string;
  images?: string[];
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}
