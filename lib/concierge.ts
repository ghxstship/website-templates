export const CONCIERGE = {
  brand: "ATLAS CONCIERGE",
  heroLine: "Consider it handled.",
  heroSub: "A personal lifestyle manager on call around the clock — reservations, travel, gifts, errands and the things that shouldn’t be possible.",
  email: "desk@atlasconcierge.com",
};

export const STATS = [
  { num: "24/7", label: "On call" }, { num: "4 min", label: "Median response" },
  { num: "60+", label: "Cities" }, { num: "18k", label: "Requests a year" },
];
export const CATEGORIES: [string, string][] = [
  ["Dining", "The impossible table, dietary notes handled, the chef’s ear."],
  ["Travel", "Flights, stays, transfers and itineraries built around you."],
  ["Events", "Tickets, box seats, premieres and last-minute access."],
  ["Gifts", "Sourced, wrapped and delivered — on time, every time."],
  ["Home", "Cleaners, contractors, deliveries and waiting-in for you."],
  ["Errands", "The list you never get to. We’ll get to it."],
];
export const REQ_CATS = CATEGORIES.map(([name]) => name);

export const SERVICE_SECTIONS = [
  { name: "Dining & nightlife", intro: "From the neighborhood favorite to the three-month waitlist — and the quiet corner table you actually wanted.", items: ["Reservations", "Private dining", "Sommelier picks", "Guest lists"] },
  { name: "Travel", intro: "Whole trips or a single transfer, planned and re-planned as life changes. We hold the details so you don’t.", items: ["Flights & upgrades", "Hotels & villas", "Transfers", "Itineraries", "Visas"] },
  { name: "Access & events", intro: "Tickets and access for the things that sell out in seconds, plus the invitations money can’t normally buy.", items: ["Premieres", "Sport & courtside", "Fashion week", "Members’ events"] },
  { name: "Home & lifestyle", intro: "The running of a life — vetted people, on time, checked in on. Gifts sourced and errands cleared.", items: ["Household staff", "Deliveries", "Gifting", "Personal shopping", "Wellness"] },
];

export const PLANS = [
  { key: "lite", name: "Lite", tagline: "Pay per request", price: "$0", per: "/mo", perks: ["On-demand requests", "Response within 4h", "Per-task pricing", "App & chat"] },
  { key: "personal", name: "Personal", tagline: "Most popular", price: "$450", per: "/mo", perks: ["Dedicated manager", "Priority response", "20 requests/mo", "Travel & dining desk"] },
  { key: "private", name: "Private Office", tagline: "No limits", price: "Custom", per: "", perks: ["Team of managers", "Instant response, 24/7", "Unlimited requests", "Global access", "Household management"] },
];

export type Request = { id: string; title: string; cat: string; when: string; manager: string; status: string };
export const SEED_REQUESTS: Request[] = [
  { id: "seed-1", title: "Anniversary dinner, somewhere special", cat: "Dining", when: "Fri 20 Sep", manager: "Sofia", status: "In progress" },
  { id: "seed-2", title: "Weekend in Lisbon — flights + hotel", cat: "Travel", when: "Oct", manager: "Sofia", status: "Options sent" },
];
export const STATUS_TAGS: Record<string, string> = { "New": "tag-accent", "In progress": "tag-outline", "Options sent": "tag-accent", "Done": "tag-neutral" };
export const SOCIALS = ["Instagram", "WhatsApp"];

export const NAV = [
  { label: "Services", path: "/concierge/services" },
  { label: "New request", path: "/concierge/request" },
  { label: "My requests", path: "/concierge/requests" },
  { label: "Membership", path: "/concierge/membership" },
];
