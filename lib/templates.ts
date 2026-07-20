/** Registry of all templates in the suite — drives the landing gallery. */
export type TemplateEntry = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  workflow: string;
  status: "live" | "planned";
};

export const TEMPLATES: TemplateEntry[] = [
  {
    slug: "artist",
    name: "Artist",
    category: "Music",
    tagline: "White-label site for any recording artist, band or DJ.",
    workflow: "Persistent player · discography · tour · store · forms",
    status: "live",
  },
  {
    slug: "ecommerce",
    name: "Ecommerce Store",
    category: "Retail",
    tagline: "The canonical shop — every other template's store links here.",
    workflow: "Filter · product · cart drawer · multi-step checkout",
    status: "live",
  },
  {
    slug: "event",
    name: "Event",
    category: "Live",
    tagline: "Festival & conference site with countdown and ticket tiers.",
    workflow: "Countdown · day schedule · reserve → confirm",
    status: "live",
  },
  {
    slug: "company",
    name: "Company",
    category: "Business",
    tagline: "SaaS / agency marketing site with pricing and demos.",
    workflow: "Pricing toggle · product modal · demo request",
    status: "live",
  },
  {
    slug: "restaurant",
    name: "Restaurant",
    category: "Hospitality",
    tagline: "Menus, reservations and online ordering for a restaurant.",
    workflow: "Reservation picker · order → cart → checkout",
    status: "live",
  },
  {
    slug: "ticketing",
    name: "Ticketing",
    category: "Live",
    tagline: "Box office with loyalty points and membership tiers.",
    workflow: "Points loyalty · membership join · rewards redeem",
    status: "live",
  },
  {
    slug: "venue",
    name: "Venue",
    category: "Live",
    tagline: "Multi-space venue: what's on, spaces and hire enquiries.",
    workflow: "Event reserve · region filter · hire enquiry",
    status: "live",
  },
  {
    slug: "travel",
    name: "Travel",
    category: "Travel",
    tagline: "Booking engine for flights, stays, rail, cars and tours.",
    workflow: "Multi-mode search · results · booking → My Trips",
    status: "live",
  },
  {
    slug: "learning",
    name: "Learning",
    category: "Education",
    tagline: "Course platform with curriculum progress and community.",
    workflow: "Catalog · curriculum progress · enroll · pricing",
    status: "live",
  },
  {
    slug: "social",
    name: "Social",
    category: "Community",
    tagline: "Three-pane social app: feed, communities and messages.",
    workflow: "Compose · like/repost · upvote · community join · DM",
    status: "live",
  },
  {
    slug: "attraction",
    name: "Attraction",
    category: "Leisure",
    tagline: "Museum / park site with timed-entry ticketing.",
    workflow: "Date + slot + qty → checkout → QR confirmation",
    status: "live",
  },
  {
    slug: "streaming",
    name: "Streaming",
    category: "Media",
    tagline: "Media platform with paywall gates and a persistent player.",
    workflow: "Type filter · paywall unlock · plans · library",
    status: "live",
  },
  {
    slug: "career",
    name: "Career",
    category: "Business",
    tagline: "Job board with applications and a recruiter ATS Kanban.",
    workflow: "Apply → tracker · post role · ATS pipeline",
    status: "live",
  },
  {
    slug: "news",
    name: "News",
    category: "Media",
    tagline: "Publication front page with sections and article reader.",
    workflow: "Front grid · section filter · reader · newsletter",
    status: "live",
  },
  {
    slug: "banking",
    name: "Banking",
    category: "Finance",
    tagline: "Neobank with wallet, crypto markets and rewards.",
    workflow: "Wallet ledger · crypto trade → confirm · plans",
    status: "live",
  },
  {
    slug: "fitness",
    name: "Fitness",
    category: "Wellness",
    tagline: "Gym & studio site with a bookable class timetable.",
    workflow: "Timetable filters · class booking · membership tiers",
    status: "live",
  },
];
