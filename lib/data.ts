import { cache } from "react";
import { getSupabaseServer } from "./supabase/server";
import { fallbackData } from "./fallback";
import type { SiteData, Album, PageKey } from "./types";

/**
 * Fetch all site content from Supabase in parallel. Falls back to the
 * bundled snapshot if the database can't be reached, so the site always
 * renders. Wrapped in React `cache` so the layout and the active page share
 * a single fetch per request.
 */
export const getSiteData = cache(async function getSiteData(): Promise<SiteData> {
  try {
    const sb = getSupabaseServer();
    const [
      config,
      bio,
      albums,
      tracks,
      shows,
      videos,
      posts,
      gallery,
      merch,
      stats,
      press,
      facts,
      contacts,
      socials,
    ] = await Promise.all([
      sb.from("site_config").select("*").eq("id", 1).single(),
      sb.from("bio").select("*").eq("id", 1).single(),
      sb.from("albums").select("*").order("sort_order"),
      sb.from("tracks").select("*").order("position"),
      sb.from("shows").select("*").order("sort_order"),
      sb.from("videos").select("*").order("sort_order"),
      sb.from("posts").select("*").order("sort_order"),
      sb.from("gallery").select("*").order("sort_order"),
      sb.from("merch").select("*").order("sort_order"),
      sb.from("stats").select("*").order("sort_order"),
      sb.from("press").select("*").order("sort_order"),
      sb.from("facts").select("*").order("sort_order"),
      sb.from("contacts").select("*").order("sort_order"),
      sb.from("socials").select("*").order("sort_order"),
    ]);

    if (config.error || !config.data || albums.error || !albums.data) {
      throw config.error || albums.error || new Error("Empty content");
    }

    const tracksByAlbum = new Map<string, Album["tracks"]>();
    for (const t of tracks.data ?? []) {
      const list = tracksByAlbum.get(t.album_id) ?? [];
      list.push({ position: t.position, name: t.name, seconds: t.seconds });
      tracksByAlbum.set(t.album_id, list);
    }

    const albumsWithTracks: Album[] = albums.data.map((a) => ({
      id: a.id,
      title: a.title,
      year: a.year,
      type: a.type,
      blurb: a.blurb,
      is_latest: a.is_latest,
      sort_order: a.sort_order,
      tracks: (tracksByAlbum.get(a.id) ?? []).sort(
        (x, y) => x.position - y.position,
      ),
    }));

    return {
      config: config.data,
      bio: bio.data ?? fallbackData.bio,
      albums: albumsWithTracks,
      shows: shows.data ?? fallbackData.shows,
      videos: videos.data ?? fallbackData.videos,
      posts: posts.data ?? fallbackData.posts,
      gallery: gallery.data ?? fallbackData.gallery,
      merch: merch.data ?? fallbackData.merch,
      stats: stats.data ?? fallbackData.stats,
      press: press.data ?? fallbackData.press,
      facts: facts.data ?? fallbackData.facts,
      contacts: contacts.data ?? fallbackData.contacts,
      socials: socials.data ?? fallbackData.socials,
    };
  } catch (err) {
    console.error("[getSiteData] falling back to bundled content:", err);
    return fallbackData;
  }
});

/** Which section pages are enabled, in nav order. */
export function enabledPages(config: SiteData["config"]): PageKey[] {
  const all: { key: PageKey; on: boolean }[] = [
    { key: "home", on: true },
    { key: "music", on: true },
    { key: "tour", on: true },
    { key: "videos", on: config.show_videos },
    { key: "news", on: config.show_news },
    { key: "about", on: true },
    { key: "gallery", on: config.show_gallery },
    { key: "store", on: config.show_store },
    { key: "contact", on: true },
  ];
  return all.filter((p) => p.on).map((p) => p.key);
}

export const PAGE_LABELS: Record<PageKey, string> = {
  home: "Home",
  music: "Music",
  tour: "Tour",
  videos: "Videos",
  news: "News",
  about: "About",
  gallery: "Gallery",
  store: "Store",
  contact: "Contact",
};

export const PAGE_PATHS: Record<PageKey, string> = {
  home: "/artist",
  music: "/artist/music",
  tour: "/artist/tour",
  videos: "/artist/videos",
  news: "/artist/news",
  about: "/artist/about",
  gallery: "/artist/gallery",
  store: "/artist/store",
  contact: "/artist/contact",
};

/**
 * Guard the brand accent color: accept a single valid color string only.
 * An array or malformed value would silently kill every primary-button fill,
 * so we fall back to the design default in that case.
 */
export function safeAccent(input: unknown): string | null {
  const value = Array.isArray(input) ? input[0] : input;
  if (typeof value === "string" && /^(#|rgb|hsl|oklch)/.test(value.trim())) {
    return value.trim();
  }
  return null;
}

/** mm:ss */
export function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}
