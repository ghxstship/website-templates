export const STREAMING = {
  brand: "RESONANT",
  heroLine: "Every sound, every screen, every file.",
  heroSub: "Stream music and video, browse photos and documents, and own what you love — from independent creators worldwide.",
};

export type MediaType = "audio" | "video" | "image" | "file" | "document";
export const TYPE_LABELS: Record<MediaType, string> = { audio: "Audio", video: "Video", image: "Photo", file: "File", document: "Doc" };
export const TYPE_WORDS: Record<MediaType, string> = { audio: "track", video: "video", image: "photo set", file: "file", document: "document" };

export type Media = { id: string; title: string; creator: string; type: MediaType; meta: string; locked: boolean; num: number; ratio: string };
export const MEDIA: Media[] = [
  { id: "m0", title: "Hollow Season (LP)", creator: "Nocturne", type: "audio", meta: "8 tracks · 42m", locked: false, num: 0, ratio: "1/1" },
  { id: "m1", title: "Chapel Sessions", creator: "Aria Films", type: "video", meta: "18m film", locked: true, num: 4, ratio: "16/10" },
  { id: "m2", title: "Harbor, 4am", creator: "Field Notes", type: "image", meta: "Photo set · 24", locked: true, num: 8, ratio: "4/5" },
  { id: "m3", title: "Undertow (single)", creator: "Nocturne", type: "audio", meta: "1 track · 4m", locked: false, num: 0, ratio: "1/1" },
  { id: "m4", title: "Stems & Project File", creator: "Nocturne", type: "file", meta: "ZIP · 1.2GB", locked: true, num: 12, ratio: "16/10" },
  { id: "m5", title: "Making Of: Nightjar", creator: "Aria Films", type: "video", meta: "11m", locked: true, num: 4, ratio: "16/10" },
  { id: "m6", title: "Contact Sheet No. 3", creator: "Field Notes", type: "image", meta: "Photo set · 12", locked: false, num: 0, ratio: "4/5" },
  { id: "m7", title: "Liner Notes (PDF)", creator: "Nocturne", type: "document", meta: "PDF · 8pp", locked: false, num: 0, ratio: "16/10" },
];
export const TYPE_CHIPS: (MediaType | "all")[] = ["all", "audio", "video", "image", "file"];

export const CREATORS = [
  { name: "Nocturne", meta: "Musician · 240K", bio: "Ambient and modern-classical releases, plus subscriber-only live takes.", sub: 6 },
  { name: "Aria Films", meta: "Filmmaker · 88K", bio: "Short documentaries and behind-the-scenes cuts for members.", sub: 9 },
  { name: "Field Notes", meta: "Photographer · 51K", bio: "High-resolution photo sets and print-ready downloads.", sub: 5 },
];

export const PLANS = [
  { key: "free", name: "Free", tagline: "Ad-supported", price: "$0", per: "", perks: ["Stream with ads", "Standard quality", "Browse everything", "Follow creators"], prem: false, featured: false },
  { key: "premium", name: "Premium", tagline: "Most popular", price: "$11", per: "/mo", perks: ["Ad-free streaming", "Lossless & 4K", "Offline downloads", "Every creator free tier"], prem: true, featured: true },
  { key: "pro", name: "Studio", tagline: "For pros", price: "$25", per: "/mo", perks: ["Everything in Premium", "Commercial license", "Bulk file downloads", "API access"], prem: true, featured: false },
];

export const NAV = [
  { label: "Browse", path: "/streaming/browse" },
  { label: "Creators", path: "/streaming/creators" },
  { label: "Plans", path: "/streaming/plans" },
  { label: "Library", path: "/streaming/library" },
];
