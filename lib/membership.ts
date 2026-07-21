export const MEMBERSHIP = {
  brand: "THE KEY",
  heroLine: "The club without walls.",
  heroSub: "One membership that opens every door in the ecosystem — the house, the stage, the table, the shop and the network.",
  estYear: "2019",
};

export const STATS = [
  { num: "12", label: "Properties" }, { num: "8,400", label: "Members" },
  { num: "1", label: "Pass for everything" }, { num: MEMBERSHIP.estYear, label: "Established" },
];
export const PILLARS = [
  { no: "01", title: "One identity", body: "A single sign-in and profile carried across every site in the ecosystem." },
  { no: "02", title: "One pass", body: "A digital membership card with a QR that reads at any door, on or offline." },
  { no: "03", title: "One perk wallet", body: "Credits, presales and member pricing that follow you everywhere." },
  { no: "04", title: "Gated by tier", body: "Content and spaces unlock automatically based on your membership level." },
  { no: "05", title: "Referral & standing", body: "Vouch for friends; earn standing that unlocks the inner rooms." },
  { no: "06", title: "Governed by members", body: "Vote on the calendar, the rules and where the club goes next." },
];

export type Tier = "resident" | "patron" | "founder";
export const TIER_NAMES: Record<Tier, string> = { resident: "Resident", patron: "Patron", founder: "Founder" };
export const TIERS = [
  { key: "resident" as Tier, name: "Resident", tagline: "The way in", price: "$95", per: "/mo", perks: ["All public + member sites", "Digital pass", "Member pricing", "House events access"] },
  { key: "patron" as Tier, name: "Patron", tagline: "Most chosen", price: "$220", per: "/mo", perks: ["Everything in Resident", "Clubhouse & lounge", "Presale windows", "Monthly experience credit", "Bring a guest"] },
  { key: "founder" as Tier, name: "Founder", tagline: "The inner room", price: "$600", per: "/mo", perks: ["Everything in Patron", "All locations worldwide", "Concierge on call", "Governance vote", "Private events"] },
];

export const PERKS = [
  { name: "$50 dining credit", venue: "The table (Restaurant)", expires: "Ends 31 Dec" },
  { name: "Presale: LUMEN Festival", venue: "The stage (Ticketing)", expires: "48h window" },
  { name: "Free grooming visit", venue: "The chair (Service)", expires: "Ends 30 Nov" },
  { name: "2 guest passes", venue: "The house (Clubhouse)", expires: "This month" },
];

export const PROPERTIES: { name: string; kind: string; access: string; href: string }[] = [
  { name: "The house", kind: "Clubhouse", access: "Members", href: "/clubhouse" },
  { name: "The desk", kind: "Concierge", access: "Members", href: "/concierge" },
  { name: "The stage", kind: "Ticketing", access: "Public + member", href: "/ticketing" },
  { name: "The venue", kind: "Venue", access: "Public", href: "/venue" },
  { name: "The table", kind: "Restaurant", access: "Public + member", href: "/restaurant" },
  { name: "The shop", kind: "Store", access: "Public", href: "/ecommerce" },
  { name: "The gym", kind: "Fitness", access: "Members", href: "/fitness" },
  { name: "The feed", kind: "Social", access: "Members", href: "/social" },
  { name: "The chair", kind: "Service", access: "Public", href: "/service" },
  { name: "The studio", kind: "Streaming", access: "Public + member", href: "/streaming" },
  { name: "The desk (jobs)", kind: "Careers", access: "Public", href: "/career" },
  { name: "The paper", kind: "News", access: "Public + member", href: "/news" },
];

export type Proposal = { id: string; tag: string; title: string; body: string; base: { For: number; Against: number; Abstain: number } };
export const PROPOSALS: Proposal[] = [
  { id: "p1", tag: "Open · ends in 3 days", title: "Open a second house in Lisbon", body: "Allocate reserves to a second clubhouse. Founders’ vote is binding; all members advisory.", base: { For: 612, Against: 208, Abstain: 74 } },
  { id: "p2", tag: "Open · ends in 6 days", title: "Extend late-night hours to 2am", body: "Weekend close moves from midnight to 2am, with a sound review after 90 days.", base: { For: 480, Against: 390, Abstain: 55 } },
  { id: "p3", tag: "Open · ends in 9 days", title: "Adopt on-chain membership passport", body: "Issue the pass as a wallet credential, redeemable across the ecosystem.", base: { For: 720, Against: 120, Abstain: 90 } },
];

export const ADMIN_STATS = [
  { num: "8,412", label: "Active members" }, { num: "47", label: "Pending review" },
  { num: "$1.9M", label: "ARR" }, { num: "96%", label: "Retention" },
];
export const PENDING_APPS = [
  { id: "a1", name: "Dana Okafor", tier: "Patron", ref: "APP-4821", when: "2 days ago" },
  { id: "a2", name: "Jonas Ek", tier: "Resident", ref: "APP-4820", when: "2 days ago" },
  { id: "a3", name: "Priya Rao", tier: "Founder", ref: "APP-4816", when: "3 days ago" },
  { id: "a4", name: "Tom Rees", tier: "Resident", ref: "APP-4809", when: "4 days ago" },
];
export const SOCIALS = ["Instagram", "Newsletter", "LinkedIn"];

export const NAV = [
  { label: "Ecosystem", path: "/membership/ecosystem" },
  { label: "Tiers", path: "/membership/tiers" },
  { label: "Your pass", path: "/membership/pass" },
  { label: "Govern", path: "/membership/governance" },
  { label: "Admin", path: "/membership/admin" },
  { label: "Apply", path: "/membership/apply" },
];
