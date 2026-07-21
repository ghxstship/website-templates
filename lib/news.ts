export const NEWS = { brand: "THE DISPATCH" };

export const SECTIONS = ["Politics", "Business", "Culture", "Tech", "Sport"];

export type Article = { id: string; title: string; section: string; time: string; author: string; excerpt: string; caption?: string };
export const ARTICLES: Article[] = [
  { id: "a0", title: "The city that rebuilt itself around the night train", section: "Business", time: "2h ago", author: "Dana Okafor", excerpt: "A decade after the last flight, one region bet everything on rail. The gamble is paying off in ways nobody predicted.", caption: "The 06:12 departs on time, as it has every day for ten years." },
  { id: "a1", title: "Inside the studio where silence is engineered", section: "Culture", time: "4h ago", author: "Aria Chen", excerpt: "How a converted chapel became the most sought-after room in modern recording." },
  { id: "a2", title: "The quiet return of the long essay", section: "Culture", time: "6h ago", author: "Jonah Reed", excerpt: "Readers said they had no time. The numbers say otherwise." },
  { id: "a3", title: "What the new spending rules actually change", section: "Politics", time: "7h ago", author: "M. Ellery", excerpt: "We read the 400 pages so you do not have to. Here is what matters." },
  { id: "a4", title: "The startup betting against the algorithm", section: "Tech", time: "9h ago", author: "Vela Ito", excerpt: "A small team thinks the feed is broken — and that people will pay to fix it." },
  { id: "a5", title: "A defender's season for the ages", section: "Sport", time: "11h ago", author: "Tom Rees", excerpt: "No goals, no headlines, and the most important player on the pitch." },
  { id: "a6", title: "The return of the corner shop", section: "Business", time: "13h ago", author: "Sara Kim", excerpt: "Convenience retail is booming again. The reasons are not what you think." },
  { id: "a7", title: "When the museum comes to you", section: "Culture", time: "14h ago", author: "Lin Wu", excerpt: "Pop-up exhibitions are rewriting who gets to see the collection." },
  { id: "a8", title: "The grid holds — for now", section: "Tech", time: "16h ago", author: "Nils Berg", excerpt: "A record summer tested the power network. It bent, but it did not break." },
];

export const ARTICLE_BODY = [
  "It begins, as these stories often do, with a timetable. For a decade the region had organized its life around the certainty of the night train, and that certainty had become a kind of infrastructure in itself — the thing everything else could lean on.",
  "The decision was not universally popular. Critics called it nostalgic, expensive, a bet against the direction of travel. But the planners had run the numbers, and the numbers were stubborn.",
  "What they had not predicted was how completely the change would reshape the ordinary texture of the days: the shops that stayed open later, the neighborhoods that filled back in, the slow return of a certain kind of confidence.",
  "Ten years on, the 06:12 still departs on time. And the region it serves looks, by almost every measure that matters, like a place that chose well.",
];

export const VIDEOS = [
  { title: "The night train, in motion", series: "Field Report", length: "8:42" },
  { title: "A day in the silent studio", series: "Culture", length: "12:05" },
  { title: "Explained: the new spending rules", series: "The Brief", length: "5:30" },
  { title: "Matchday from the back line", series: "Sport", length: "9:18" },
];

export const NEWSLETTERS = [
  { name: "The Morning Brief", cadence: "Daily · 6am", desc: "Everything you need to start the day, in a five-minute read." },
  { name: "The Weekend Long Read", cadence: "Saturdays", desc: "One feature, chosen and framed by our editors." },
  { name: "Tech & Business", cadence: "Twice weekly", desc: "The stories moving markets and machines." },
];

export const ABOUT = {
  lead: "THE DISPATCH is an independent newsroom for people who want the story, not the noise.",
  p1: "Founded in 2011 by a small group of reporters, we publish across politics, business, culture, technology and sport — in long-form writing and original video.",
  p2: "We are funded by our readers, not by advertisers chasing your attention. That independence shapes every decision we make about what to cover and how.",
  stats: [{ num: "2011", label: "Founded" }, { num: "60", label: "Journalists" }, { num: "900K", label: "Subscribers" }],
};

export const NAV = [
  { label: "Front page", path: "/news" },
  { label: "Sections", path: "/news/sections" },
  { label: "Video", path: "/news/videos" },
  { label: "Saved", path: "/news/saved" },
  { label: "Newsletters", path: "/news/newsletters" },
  { label: "About", path: "/news/about" },
];
