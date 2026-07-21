export const LEARNING = {
  brand: "FORGE",
  heroLine: "Learn it. Build it. Ship it.",
  heroSub: "Cohort-quality courses and a community that keeps you accountable — taught by people who actually do the work.",
};

export type Lesson = { title: string; len: string };
export type Module = { title: string; lessons: Lesson[] };
export type Course = { slug: string; title: string; cat: string; instructor: string; num: number; blurb: string; hours: string; modules: Module[] };

export const COURSES: Course[] = [
  { slug: "product-design-foundations", title: "Product Design Foundations", cat: "Design", instructor: "Maya Okafor", num: 149, blurb: "From research to shipped UI — the process, the tools and the judgement calls.", hours: "8 hours", modules: [ { title: "Research", lessons: [{ title: "Talking to users", len: "12m" }, { title: "Synthesis", len: "18m" }] }, { title: "Craft", lessons: [{ title: "Layout systems", len: "22m" }, { title: "Type & color", len: "16m" }, { title: "Prototyping", len: "20m" }] }, { title: "Ship", lessons: [{ title: "Handoff", len: "14m" }, { title: "Measuring impact", len: "15m" }] } ] },
  { slug: "full-stack-in-30-days", title: "Full-Stack in 30 Days", cat: "Code", instructor: "Dev Null", num: 199, blurb: "Build and deploy a real app end to end — no toy examples.", hours: "14 hours", modules: [ { title: "Frontend", lessons: [{ title: "Components", len: "20m" }, { title: "State", len: "18m" }] }, { title: "Backend", lessons: [{ title: "APIs", len: "24m" }, { title: "Databases", len: "22m" }] }, { title: "Deploy", lessons: [{ title: "CI/CD", len: "16m" }, { title: "Monitoring", len: "12m" }] } ] },
  { slug: "marketing-that-compounds", title: "Marketing That Compounds", cat: "Marketing", instructor: "Jonah Reed", num: 129, blurb: "Content, distribution and the loops that make growth cheaper over time.", hours: "6 hours", modules: [ { title: "Positioning", lessons: [{ title: "Finding the wedge", len: "15m" }, { title: "Messaging", len: "14m" }] }, { title: "Channels", lessons: [{ title: "SEO basics", len: "20m" }, { title: "Email that works", len: "18m" }] } ] },
  { slug: "founder-finance", title: "Founder Finance", cat: "Business", instructor: "Dana Okafor", num: 179, blurb: "Model your business, read your numbers, and raise (or not) on your terms.", hours: "7 hours", modules: [ { title: "Modelling", lessons: [{ title: "Unit economics", len: "19m" }, { title: "Runway", len: "13m" }] }, { title: "Fundraising", lessons: [{ title: "The deck", len: "17m" }, { title: "The terms", len: "21m" }] } ] },
  { slug: "motion-for-interfaces", title: "Motion for Interfaces", cat: "Design", instructor: "Aria Chen", num: 119, blurb: "Purposeful animation — easing, choreography and performance.", hours: "5 hours", modules: [ { title: "Principles", lessons: [{ title: "Easing", len: "12m" }, { title: "Choreography", len: "15m" }] }, { title: "Build", lessons: [{ title: "CSS & JS", len: "20m" }, { title: "Performance", len: "14m" }] } ] },
  { slug: "data-for-everyone", title: "Data for Everyone", cat: "Code", instructor: "Vela Ito", num: 139, blurb: "From spreadsheet to SQL to a dashboard your team trusts.", hours: "9 hours", modules: [ { title: "Foundations", lessons: [{ title: "Thinking in tables", len: "16m" }, { title: "SQL basics", len: "22m" }] }, { title: "Insight", lessons: [{ title: "Charts that inform", len: "18m" }, { title: "Dashboards", len: "20m" }] } ] },
];

export const CATEGORIES = ["all", "Design", "Code", "Marketing", "Business"];

export function lessonCount(c: Course): number {
  return c.modules.reduce((s, m) => s + m.lessons.length, 0);
}

export const SEED_POSTS = [
  { id: "p1", name: "Maya Okafor", time: "2h", cat: "Win", text: "Just shipped my first project from the Product Design course. The layout systems module changed how I work.", likes: 42, comments: 8 },
  { id: "p2", name: "Dev Null", time: "5h", cat: "Question", text: "Anyone deploying the 30-day app to a custom domain? Hit a DNS snag on step 4.", likes: 12, comments: 15 },
  { id: "p3", name: "Jonah Reed", time: "1d", cat: "", text: "Reminder: the monthly live Q&A is Thursday 5pm. Bring your works-in-progress.", likes: 88, comments: 6 },
];

export const PLANS = [
  { key: "free", name: "Free", tagline: "Get started", price: "$0", per: "", perks: ["Community access", "3 intro lessons", "Monthly newsletter"], featured: false },
  { key: "pro", name: "Pro", tagline: "Most popular", price: "$29", per: "/mo", perks: ["Every course", "Community & events", "Certificates", "Downloadable resources"], featured: true },
  { key: "team", name: "Team", tagline: "For orgs", price: "$99", per: "/mo", perks: ["Everything in Pro", "Up to 10 seats", "Progress reporting", "Priority support"], featured: false },
];

export const STATS = [
  { num: "120+", label: "Courses" },
  { num: "48K", label: "Members" },
  { num: "4.9", label: "Avg. rating" },
  { num: "92%", label: "Finish rate" },
];

export const NAV = [
  { label: "Courses", path: "/learning/courses" },
  { label: "Community", path: "/learning/community" },
  { label: "Dashboard", path: "/learning/dashboard" },
  { label: "Pricing", path: "/learning/pricing" },
];
