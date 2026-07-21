export const SOCIAL = {
  brand: "PULSE",
  meName: "Alex Rivera",
  meHandle: "@alexr",
  meBio: "Product designer & occasional typographer. Building in public. Coffee, concrete, and long walks.",
};

export type FeedPost = { id: string; name: string; handle: string; time: string; text: string; hasImg: boolean; likes: number; comments: number; reposts: number };
export const FEED: FeedPost[] = [
  { id: "s1", name: "Maya Okafor", handle: "@mayabuilds", time: "2h", text: "shipped the redesign today. six weeks, one designer, zero meetings that couldn't have been an email. proud of this one.", hasImg: true, likes: 342, comments: 28, reposts: 41 },
  { id: "s2", name: "Dev Null", handle: "@devnull", time: "4h", text: "hot take: your framework isn't slow. your 4MB of unoptimised hero images are.", hasImg: false, likes: 1243, comments: 210, reposts: 190 },
  { id: "s3", name: "Aria Chen", handle: "@ariacreates", time: "6h", text: "process shots from the harbor mural. three weeks, forty liters of paint, one very patient building owner.", hasImg: true, likes: 894, comments: 44, reposts: 62 },
  { id: "s4", name: "The Armory", handle: "@thearmory", time: "9h", text: "Autumn season tickets are live. Members get 48-hour early access — link in bio.", hasImg: false, likes: 512, comments: 33, reposts: 88 },
  { id: "s5", name: "Jonah Reed", handle: "@jreed", time: "12h", text: "two years fully remote taught me the office was never the problem. the calendar was.", hasImg: false, likes: 2104, comments: 340, reposts: 410 },
  { id: "s6", name: "Studio Meridien", handle: "@meridien", time: "1d", text: "tonight's menu is written. sixteen courses, and the sea buckthorn is back. see you at 6:30.", hasImg: true, likes: 640, comments: 20, reposts: 15 },
];

export type Community = { slug: string; name: string; members: string; desc: string };
export const COMMUNITIES: Community[] = [
  { slug: "design", name: "r/design", members: "2.1M", desc: "Critique, resources and shop talk for working designers." },
  { slug: "webdev", name: "r/webdev", members: "1.8M", desc: "Everything front-of-house to back-of-house on the web." },
  { slug: "edm-heads", name: "EDM Heads", members: "540K", desc: "Sets, releases and festival plans. No genre gatekeeping." },
  { slug: "foodies", name: "Foodies", members: "980K", desc: "Where and what to eat, from street carts to three stars." },
  { slug: "vinyl-collectors", name: "Vinyl Collectors", members: "310K", desc: "Pressings, turntables, and the eternal storage problem." },
];

export type CommunityPost = { id: string; author: string; time: string; title: string; body: string; score: number; comments: number };
export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: "c1", author: "u/pixelpush", time: "3h", title: "What's your hard rule for spacing scales?", body: "Been going back and forth on a 4pt vs 8pt base. What do you actually ship with and why?", score: 428, comments: 96 },
  { id: "c2", author: "u/gridlord", time: "5h", title: "Show me your favorite grayscale-only sites", body: "Collecting references for a mono redesign. Drop the best ones you've seen.", score: 1203, comments: 210 },
  { id: "c3", author: "u/kerning_anxiety", time: "8h", title: "Archivo at display sizes is criminally underrated", body: "That 800 weight tightens up beautifully. Anyone pairing it with something unexpected?", score: 315, comments: 54 },
];

export type Thread = { name: string; preview: string; seed: { me: boolean; text: string }[] };
export const THREADS: Thread[] = [
  { name: "Maya Okafor", preview: "that redesign is unreal 🔥", seed: [{ me: false, text: "that redesign is unreal" }, { me: true, text: "thank you! six weeks of not opening figma on weekends" }, { me: false, text: "teach me your ways" }] },
  { name: "Design Guild", preview: "Jonah: crit session friday?", seed: [{ me: false, text: "crit session friday? 3pm?" }, { me: true, text: "works for me" }] },
  { name: "Aria Chen", preview: "sending the mural photos over", seed: [{ me: false, text: "sending the mural photos over now" }, { me: true, text: "incredible work as always" }] },
];

export const NOTIFICATIONS = [
  { name: "Maya Okafor", action: "liked your post", time: "12m", icon: "♥", accent: true },
  { name: "Dev Null", action: "followed you", time: "1h", icon: "+", accent: false },
  { name: "Aria Chen", action: "replied: “this is so clean”", time: "2h", icon: "↩", accent: false },
  { name: "r/design", action: "your post is trending in the community", time: "4h", icon: "↑", accent: true },
  { name: "Jonah Reed", action: "mentioned you in a thread", time: "6h", icon: "@", accent: false },
  { name: "The Armory", action: "reposted your post", time: "8h", icon: "↻", accent: false },
];

export const TRENDS = [
  { cat: "Design · Trending", tag: "#grayscale", count: "12.4K" },
  { cat: "Tech", tag: "#webperf", count: "8,210" },
  { cat: "Music · Live", tag: "#LumenFestival", count: "5,640" },
  { cat: "Food", tag: "#tastingmenu", count: "3,120" },
  { cat: "Design", tag: "Archivo", count: "2,090" },
];

export const SUGGESTIONS = [
  { name: "Field Study", handle: "@fieldstudio" },
  { name: "Otto Nord", handle: "@ottonord" },
  { name: "Vela Type", handle: "@velatype" },
];

export const MY_SEED_POSTS = [
  { text: "redid my whole portfolio in grayscale. turns out you don't miss the color when the type is doing the work.", time: "2d" },
  { text: "unpopular opinion: 2px borders age better than shadows.", time: "5d" },
];

export const EXPLORE_LIKES = [1200, 340, 890, 55, 2100, 410, 78, 640, 150];
