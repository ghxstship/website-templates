export const CLUBHOUSE = {
  brand: "THE FOUNDRY HOUSE",
  city: "London",
  tagline: "A members’ clubhouse and workspace — rooms to work, a kitchen to gather, and a calendar worth clearing your evenings for.",
  address: "1 Ironmonger Row, London EC1",
};

export const STATS = [
  { num: "6", label: "Rooms & studios" }, { num: "40+", label: "Events a month" },
  { num: "2,400", label: "Members" }, { num: "24/7", label: "Member access" },
];
export const PILLARS = [
  { no: "01", title: "Work", body: "Fast wifi, quiet rooms, meeting studios and unlimited coffee. Bring the laptop, leave the office." },
  { no: "02", title: "Gather", body: "A kitchen and bar open all day, and long tables made for lingering." },
  { no: "03", title: "Belong", body: "Talks, dinners, screenings and socials — a calendar that makes the membership worth it." },
];

export type ClubEvent = { id: string; date: string; time: string; title: string; host: string; type: string; cap: number };
export const EVENTS: ClubEvent[] = [
  { id: "e0", date: "Thu 18", time: "19:00", title: "Founders Supper Club", host: "Hosted by the house", type: "Dining", cap: 4 },
  { id: "e1", date: "Fri 19", time: "20:00", title: "Live Jazz & Negronis", host: "The Trio", type: "Music", cap: 20 },
  { id: "e2", date: "Sat 20", time: "11:00", title: "Life Drawing", host: "Studio 2", type: "Studio", cap: 0 },
  { id: "e3", date: "Tue 23", time: "18:30", title: "Fireside: Building in Public", host: "Guest speaker", type: "Talk", cap: 12 },
  { id: "e4", date: "Wed 24", time: "08:00", title: "Members’ Run Club", host: "Meet at reception", type: "Wellness", cap: 30 },
  { id: "e5", date: "Thu 25", time: "19:30", title: "Natural Wine Tasting", host: "The bar", type: "Dining", cap: 6 },
];
export const EVENT_CATS = ["all", "Dining", "Music", "Studio", "Talk", "Wellness"];

export const SPACES = [
  { name: "The Library", cap: "Quiet · 20 seats", rate: "Included", desc: "A silent room of leather and long tables for heads-down work." },
  { name: "Studio 2", cap: "Up to 12", rate: "From £40/hr", desc: "A daylight studio for workshops, shoots and life drawing." },
  { name: "The Boardroom", cap: "Up to 10", rate: "From £60/hr", desc: "A private meeting room with screen, whiteboard and coffee service." },
  { name: "The Snug", cap: "Up to 6", rate: "From £30/hr", desc: "A cozy corner with a fireplace for small dinners and calls." },
];

export const MENU = [
  { title: "All day", items: [
    { name: "House breakfast", desc: "Eggs, greens, sourdough.", price: "£12" },
    { name: "The club sandwich", desc: "Triple-decker, fries.", price: "£16" },
    { name: "Grain bowl", desc: "Seasonal, add protein.", price: "£14" },
    { name: "Charcuterie board", desc: "To share.", price: "£22" },
  ] },
  { title: "Bar", items: [
    { name: "House Negroni", desc: "Batch-aged.", price: "£12" },
    { name: "Natural wine", desc: "By the glass.", price: "£9" },
    { name: "Espresso martini", desc: "The 6pm special.", price: "£13" },
    { name: "Alcohol-free spritz", desc: "Bright and bitter.", price: "£8" },
  ] },
];

export const PLANS = [
  { key: "weekday", name: "Weekday", tagline: "Work hours", price: "£120", per: "/mo", perks: ["Mon–Fri 7am–7pm", "All workspaces", "Kitchen & bar", "Member events"] },
  { key: "full", name: "Full House", tagline: "Most popular", price: "£220", per: "/mo", perks: ["24/7 access", "Bring a guest", "Room booking credit", "Priority events", "All locations"] },
  { key: "founder", name: "Founder", tagline: "The inner circle", price: "£600", per: "/mo", perks: ["Everything in Full House", "Private dining nights", "Concierge", "Governance vote", "Guest memberships"] },
];

export const VISIT_INFO = [
  { title: "Address", body: `${CLUBHOUSE.address}. The house is the unmarked black door beside the old foundry gates.` },
  { title: "Getting here", body: "Old Street underground, five minutes’ walk. Secure bike storage in the courtyard." },
  { title: "Guests", body: "Full House members and above may sign in up to two guests; guests must be accompanied at all times." },
  { title: "House rules", body: "Phones on silent in the Library. No laptops in the dining room after 7pm. Be kind to the staff and each other." },
];

export const NAV = [
  { label: "Spaces", path: "/clubhouse/spaces" },
  { label: "Calendar", path: "/clubhouse/calendar" },
  { label: "Dining", path: "/clubhouse/dining" },
  { label: "Membership", path: "/clubhouse/membership" },
  { label: "Visit", path: "/clubhouse/visit" },
];
