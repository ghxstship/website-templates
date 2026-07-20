export type SiteConfig = {
  artist_name: string;
  tagline: string;
  genre: string;
  location: string;
  accent_color: string;
  label: string;
  active_since: string;
  show_videos: boolean;
  show_news: boolean;
  show_gallery: boolean;
  show_store: boolean;
  latest_blurb: string | null;
};

export type Track = { position: number; name: string; seconds: number };

export type Album = {
  id: string;
  title: string;
  year: number;
  type: string;
  blurb: string | null;
  is_latest: boolean;
  sort_order: number;
  tracks: Track[];
};

export type Show = {
  id: string;
  date_label: string;
  city: string;
  country: string;
  venue: string;
  region: "na" | "eu" | "as" | "other";
  status: "on" | "low" | "sold";
  sort_order: number;
};

export type Video = { id: string; title: string; meta: string };
export type Post = {
  id: string;
  category: string;
  date_label: string;
  title: string;
  excerpt: string;
};
export type GalleryItem = { id: string; caption: string; ratio: string };
export type Merch = { id: string; name: string; category: string; price: string };
export type Stat = { num: string; label: string };
export type Press = { quote: string; source: string };
export type Fact = { k: string; v: string };
export type Contact = { role: string; name: string; email: string };
export type Social = { name: string; url: string };
export type Bio = { lead: string; p1: string; p2: string };

export type SiteData = {
  config: SiteConfig;
  bio: Bio;
  albums: Album[];
  shows: Show[];
  videos: Video[];
  posts: Post[];
  gallery: GalleryItem[];
  merch: Merch[];
  stats: Stat[];
  press: Press[];
  facts: Fact[];
  contacts: Contact[];
  socials: Social[];
};

export type PageKey =
  | "home"
  | "music"
  | "tour"
  | "videos"
  | "news"
  | "about"
  | "gallery"
  | "store"
  | "contact";
