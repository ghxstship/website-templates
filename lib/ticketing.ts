export const TICKETING = { brand: "FRONTROW", heroLine: "Your seat to everything." };

export type TEvent = { id: string; title: string; date: string; venue: string; cat: string; from: string };
export const EVENTS: TEvent[] = [
  { id: "e0", title: "Nocturne Orchestra", date: "Sep 18", venue: "The Armory, Manchester", cat: "Concert", from: "From $42" },
  { id: "e1", title: "Warehouse: All Night", date: "Sep 19", venue: "The Armory, Manchester", cat: "Club", from: "From $28" },
  { id: "e2", title: "City vs. United", date: "Sep 20", venue: "Foundry Stadium", cat: "Sports", from: "From $60" },
  { id: "e3", title: "A Number", date: "Sep 23", venue: "The Studio", cat: "Theater", from: "From $34" },
  { id: "e4", title: "Halcyon (Live)", date: "Oct 02", venue: "The Armory, Manchester", cat: "Concert", from: "From $38" },
  { id: "e5", title: "Comedy Gala", date: "Oct 09", venue: "The Studio", cat: "Comedy", from: "From $25" },
];
export const EVENT_CATS = ["all", "Concert", "Club", "Sports", "Theater", "Comedy"];

export const TICKET_TIERS = [
  { name: "General admission", note: "Standing", num: 42 },
  { name: "Reserved seat", note: "Assigned seating", num: 65 },
  { name: "VIP package", note: "Best seats + lounge", num: 145 },
];

export type MemberTier = "free" | "plus" | "vip";
export const TIER_NAME: Record<MemberTier, string> = { free: "Free", plus: "Plus", vip: "VIP" };
export const TIER_MULT: Record<MemberTier, number> = { free: 1, plus: 2, vip: 3 };

export const MEMBERSHIP = [
  { key: "free" as MemberTier, name: "Free", tagline: "Pay as you go", price: "$0", per: "", perks: ["1× points on every ticket", "Standard on-sale access", "Mobile tickets", "Fan-to-fan resale"] },
  { key: "plus" as MemberTier, name: "Plus", tagline: "Most popular", price: "$8", per: "/mo", perks: ["2× points on every ticket", "Zero booking fees", "48-hour presale access", "Priority support"] },
  { key: "vip" as MemberTier, name: "VIP Club", tagline: "The full experience", price: "$25", per: "/mo", perks: ["3× points on every ticket", "Zero fees, ever", "First-access presales", "Members bar & lounge", "Complimentary upgrades"] },
];

export type TExperience = { id: string; name: string; tier: string; spots: number; price: number; desc: string };
export const EXPERIENCES: TExperience[] = [
  { id: "x0", name: "Backstage & soundcheck", tier: "VIP", spots: 8, price: 240, desc: "Watch soundcheck from the pit, then meet the band before doors." },
  { id: "x1", name: "Chef's table before the show", tier: "Premium", spots: 12, price: 180, desc: "A five-course tasting in the venue kitchen, then your seats." },
  { id: "x2", name: "Suite for the derby", tier: "VIP", spots: 4, price: 600, desc: "A private box for four, full hospitality, best view in the house." },
  { id: "x3", name: "Festival glamping weekend", tier: "Premium", spots: 20, price: 420, desc: "A furnished tent, priority entry and a members' bar all weekend." },
  { id: "x4", name: "Opening-night gala", tier: "Founder", spots: 6, price: 350, desc: "Red carpet, after-party and a signed programme." },
  { id: "x5", name: "Rehearsal & Q&A", tier: "Premium", spots: 15, price: 120, desc: "Sit in on a working rehearsal and quiz the director." },
];

export const REWARDS = [
  { name: "$10 ticket credit", desc: "Knock $10 off your next booking.", cost: 1000 },
  { name: "Free booking fees", desc: "Waive all fees for a month.", cost: 1500 },
  { name: "Seat upgrade", desc: "Bump one booking to the next tier up.", cost: 3000 },
  { name: "Meet & greet entry", desc: "Enter the draw for a backstage pass.", cost: 5000 },
];

export const LOYALTY_STATS = [
  { num: "2×–3×", label: "Points for members" },
  { num: "$0", label: "Member booking fees" },
  { num: "48h", label: "Presale head start" },
  { num: "40+", label: "Partner venues" },
];

export const FAQS = [
  { q: "How do points work?", a: "You earn points on every dollar you spend on tickets — 1× on Free, 2× on Plus, 3× on VIP. Redeem them for credit, fee waivers, upgrades and experiences in the Rewards tab." },
  { q: "Can I cancel my membership?", a: "Yes, any time from your account. You keep your points and your tier benefits run to the end of the billing period." },
  { q: "What is the VIP Club?", a: "Our premium tier: 3× points, zero fees, first access to every presale, and entry to the members bar and lounge at partner venues." },
  { q: "How do I get my tickets?", a: "Tickets are issued to your account as secure mobile tickets. Open the app at the door — no printing, no screenshots." },
  { q: "Do points expire?", a: "Points stay valid as long as you book at least once every 18 months." },
];

export const NAV = [
  { label: "Events", path: "/ticketing/events" },
  { label: "Experiences", path: "/ticketing/experiences" },
  { label: "Membership", path: "/ticketing/membership" },
  { label: "Rewards", path: "/ticketing/rewards" },
  { label: "Help", path: "/ticketing/help" },
];
