export const VENUE = {
  name: "THE ARMORY",
  type: "Concert hall & club",
  city: "Manchester",
  tagline: "A 3,200-capacity hall and a late-night club under one roof — live music seven nights a week since 1974.",
  address: "12 Foundry Lane, Manchester M1 2AB",
};

export type VEvent = { id: string; title: string; date: string; time: string; cat: string; from: string; desc: string };
export const EVENTS: VEvent[] = [
  { id: "e0", title: "Nocturne Orchestra", date: "Fri 18 Sep", time: "Doors 7:00pm", cat: "Concert", from: "From $42", desc: "The full orchestra returns for a one-night programme of nocturnes and film scores, performed in the round under a single moving light." },
  { id: "e1", title: "Warehouse: All Night", date: "Sat 19 Sep", time: "11:00pm — 6:00am", cat: "Club", from: "From $28", desc: "Six hours, three rooms, one of the best sound systems in the north. Resident DJs plus a headline guest announced on the night." },
  { id: "e2", title: "City vs. United — Live Screening", date: "Sun 20 Sep", time: "Kick-off 4:30pm", cat: "Sports", from: "From $15", desc: "The derby on a wall-sized LED screen with full bar service and stadium atmosphere, minus the queue for the exits." },
  { id: "e3", title: "A Number — by Caryl Churchill", date: "Wed 23 Sep", time: "7:30pm", cat: "Theatre", from: "From $34", desc: "A tense, intimate two-hander staged in our studio space for a strictly limited run of nine performances." },
  { id: "e4", title: "Family Prom", date: "Sat 26 Sep", time: "2:00pm", cat: "Family", from: "From $12", desc: "A relaxed, all-ages afternoon of orchestral favourites with an instrument petting zoo in the foyer beforehand." },
  { id: "e5", title: "Halcyon (Live)", date: "Fri 02 Oct", time: "Doors 7:30pm", cat: "Concert", from: "From $38", desc: "Touring the new record in full, with support from Field Study. Standing downstairs, seated on the balcony." },
];
export const EVENT_CATS = ["all", "Concert", "Club", "Sports", "Theatre", "Family"];

export const TICKET_TIERS = [
  { name: "General admission", note: "Standing, main floor", num: 42 },
  { name: "Seated balcony", note: "Reserved seat", num: 58 },
  { name: "VIP box", note: "Private box + bar service", num: 120 },
];

export const STATS = [
  { num: "3,200", label: "Main hall capacity" },
  { num: "7", label: "Nights a week" },
  { num: "1974", label: "Open since" },
  { num: "3", label: "Rooms" },
];

export const SPACES = [
  { name: "The Main Hall", body: "A pillar-free hall with a sprung floor, retractable seating and a proscenium stage. Configures from full standing to fully seated.", cap: "3,200", type: "Standing / seated" },
  { name: "The Club", body: "A low-ceilinged basement room built for sound — a bespoke rig, no bad spot on the floor, and a bar that keeps moving.", cap: "600", type: "Standing" },
  { name: "The Studio", body: "An intimate black-box space for theatre, comedy and seated sessions, with flexible staging and full technical spec.", cap: "180", type: "Flexible" },
];

export const VISIT = [
  { title: "Getting here", body: "Two minutes from Piccadilly station; trams stop on the corner. Paid parking is on Foundry Lane, but we strongly recommend public transport on show nights." },
  { title: "Doors & timings", body: "Doors are typically one hour before the advertised start. Set times are posted on the event page and our socials on the day." },
  { title: "Bars & food", body: "Four bars across the building plus a street-food kitchen in the foyer until late. Card only, everywhere." },
  { title: "Accessibility", body: "Step-free access throughout, an accessible viewing platform in the hall, and free companion tickets. Email access@ to arrange your visit." },
];

export const FAQS = [
  { q: "What can I bring?", a: "Small bags only (under A4). No professional cameras, no glass, no outside drinks. There is a cloakroom for coats and bags." },
  { q: "Is there an age limit?", a: "Club nights are 18+. Concerts are all-ages unless stated; under-16s must be accompanied by an adult." },
  { q: "Can I re-enter?", a: "Pass-outs are available at the main door for seated concerts. Club nights and standing shows are no re-entry." },
  { q: "What is your refund policy?", a: "Tickets are refundable if an event is cancelled or rescheduled. Otherwise they can be resold through our official fan-to-fan exchange." },
];

export const CONTACTS = [
  { role: "Box office", name: "Ticketing & bookings", email: "boxoffice@thearmory.com" },
  { role: "Venue hire", name: "Events team", email: "hire@thearmory.com" },
  { role: "Press", name: "Media enquiries", email: "press@thearmory.com" },
  { role: "Accessibility", name: "Access team", email: "access@thearmory.com" },
];

export const NAV = [
  { label: "What's on", path: "/venue/events" },
  { label: "Spaces", path: "/venue/spaces" },
  { label: "Visit", path: "/venue/visit" },
  { label: "Hire", path: "/venue/hire" },
  { label: "Contact", path: "/venue/contact" },
];
