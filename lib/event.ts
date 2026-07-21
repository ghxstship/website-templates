export const EVENT = {
  name: "LUMEN",
  kind: "Festival of light & sound",
  tagline:
    "Three nights of live music, projection art and immersive installation across a decommissioned power station.",
  dates: "Sept 18–20, 2026",
  location: "Berlin",
  venueName: "Kraftwerk, Berlin",
  fromPrice: "$89",
  ticketNote: "3-day weekend pass available",
  targetIso: "2026-09-18T18:00:00",
};

export const HEADLINERS = [
  { name: "Nocturne Orchestra", meta: "Fri — Main Hall" },
  { name: "AURA", meta: "Sat — Main Hall" },
  { name: "The Kilowatts", meta: "Sun — Main Hall" },
];

export const HIGHLIGHTS = [
  { no: "01", title: "Three stages, one power station", body: "Main Hall, the Turbine Room and the rooftop — each with its own program running from dusk until 3am." },
  { no: "02", title: "Immersive light installations", body: "Twelve commissioned works turn the building into an instrument you walk through. Included with every ticket." },
  { no: "03", title: "Get there by transit", body: "Two U-Bahn stops from the door, extended night service all weekend. No parking, by design." },
];

export const LINEUP_TIERS = [
  { label: "Headliners", size: "clamp(30px, 5vw, 64px)", acts: ["Nocturne Orchestra", "AURA", "The Kilowatts"] },
  { label: "Main stage", size: "clamp(22px, 3vw, 38px)", acts: ["Vesper", "Low Country", "Halcyon", "Field Study", "Marÿs", "Otto Nord", "Cinder", "The Long Way"] },
  { label: "Turbine room & rooftop", size: "clamp(16px, 2vw, 24px)", acts: ["Sable", "Ilse Grün", "Paper Streets", "Undertow", "Static Bloom", "Copperline", "Nine Volt", "Ochre", "Nightjar", "Dusk Chorus", "First Light", "Signal Fire"] },
];

export const DAYS = [
  { label: "Fri 18", sessions: [
    ["18:00", "Doors & installations open", "All spaces", "Open"],
    ["19:30", "Field Study", "Turbine Room", "Live"],
    ["21:00", "Low Country", "Main Hall", "Live"],
    ["22:30", "Nocturne Orchestra", "Main Hall", "Headline"],
    ["00:00", "Sable (DJ set)", "Rooftop", "DJ"],
  ] },
  { label: "Sat 19", sessions: [
    ["17:00", "Installations open", "All spaces", "Open"],
    ["19:00", "Halcyon", "Turbine Room", "Live"],
    ["20:30", "Vesper", "Main Hall", "Live"],
    ["22:30", "AURA", "Main Hall", "Headline"],
    ["00:30", "Copperline", "Rooftop", "DJ"],
  ] },
  { label: "Sun 20", sessions: [
    ["16:00", "Family hour", "Main Hall", "All ages"],
    ["18:30", "Cinder", "Turbine Room", "Live"],
    ["20:00", "Otto Nord", "Main Hall", "Live"],
    ["21:30", "The Kilowatts", "Main Hall", "Headline"],
    ["23:00", "Closing ceremony", "All spaces", "Special"],
  ] },
];

export const TIERS = [
  { name: "Day Pass", tagline: "One night", price: "$89", featured: false, perks: ["Entry for one day of your choice", "All installations", "Rooftop access"], cta: "Choose day pass" },
  { name: "Weekend", tagline: "All three nights — best value", price: "$219", featured: true, perks: ["Entry all three days", "All installations & stages", "Priority re-entry", "Commemorative print"], cta: "Get weekend pass" },
  { name: "Patron", tagline: "Support the program", price: "$480", featured: false, perks: ["Everything in Weekend", "Lounge & bar access", "Artist talk invitations", "Named in the program"], cta: "Become a patron" },
];

export const INFO_BLOCKS = [
  { title: "Location", body: "Kraftwerk, Berlin. Enter via the east gate on Köpenicker Straße; the box office is immediately inside." },
  { title: "Getting there", body: "U-Bahn Heinrich-Heine-Straße (2 min walk). Night buses N40 and N65 stop at the door. There is no on-site parking — please use public transit." },
  { title: "Hours", body: "Doors 18:00 Friday, 17:00 Saturday, 16:00 Sunday. Installations run until 03:00; last entry 01:00." },
  { title: "Accessibility", body: "Step-free access to all three spaces, accessible toilets on every level, and free companion tickets. Email access@ for a personal walkthrough." },
];

export const FAQS = [
  { q: "Is there an age limit?", a: "The festival is 18+ after 22:00. Under-16s are welcome free with a paying adult during the earlier program, and Sunday opens with an all-ages family hour." },
  { q: "Can I bring a camera?", a: "Handheld cameras and phones are fine. Professional rigs, tripods and drones require a press pass — apply via the Contact page." },
  { q: "What is the refund policy?", a: "Tickets are refundable up to 14 days before the event. Inside 14 days they are transferable to another person but not refundable." },
  { q: "Is re-entry allowed?", a: "Yes with any pass; Weekend and Patron holders get priority re-entry lanes. Your wristband is your ticket for the whole run." },
];

export const GALLERY = [
  { caption: "Main Hall, 2025", ratio: "3/4" },
  { caption: "Turbine installation", ratio: "1/1" },
  { caption: "Rooftop at dawn", ratio: "3/4" },
  { caption: "Projection detail", ratio: "1/1" },
  { caption: "The crowd", ratio: "3/4" },
  { caption: "Light corridor", ratio: "1/1" },
  { caption: "Closing ceremony", ratio: "3/4" },
  { caption: "Box office queue", ratio: "1/1" },
];

export const CONTACTS = [
  { role: "Press & media", name: "Press Office", email: "press@lumenfestival.com" },
  { role: "Group bookings", name: "Box Office", email: "groups@lumenfestival.com" },
  { role: "Partnerships", name: "Commercial Team", email: "partners@lumenfestival.com" },
];

export const NAV = [
  { label: "Lineup", path: "/event/lineup" },
  { label: "Schedule", path: "/event/schedule" },
  { label: "Tickets", path: "/event/tickets" },
  { label: "Info", path: "/event/info" },
  { label: "Gallery", path: "/event/gallery" },
  { label: "Contact", path: "/event/contact" },
];
