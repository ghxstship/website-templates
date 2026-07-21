export const HOSPITALITY = {
  brand: "THE FORGE HOTEL",
  kind: "Hotel & residences",
  city: "Lisbon",
  tagline: "A restored ironworks turned design hotel — forty rooms, a rooftop pool and a handful of residences above the harbor.",
  address: "2 Cais do Sodré, Lisbon",
};

export type Room = { slug: string; name: string; sleeps: string; size: string; num: number; desc: string };
export const ROOMS: Room[] = [
  { slug: "foundry-room", name: "Foundry Room", sleeps: "Sleeps 2", size: "28 m²", num: 210, desc: "A calm room with original steel beams, a walk-in shower and a city view." },
  { slug: "harbor-suite", name: "Harbor Suite", sleeps: "Sleeps 2", size: "46 m²", num: 340, desc: "A corner suite with a freestanding tub and a balcony over the water." },
  { slug: "loft-studio", name: "Loft Studio", sleeps: "Sleeps 3", size: "52 m²", num: 380, desc: "A split-level loft with a kitchenette, ideal for longer stays." },
  { slug: "the-penthouse", name: "The Penthouse", sleeps: "Sleeps 4", size: "110 m²", num: 720, desc: "The top floor, wraparound terrace, private pool and the best light in the house." },
];

export const STATS = [
  { num: "40", label: "Rooms & suites" }, { num: "8", label: "Residences" },
  { num: "★★★★★", label: "Rated" }, { num: "1901", label: "The building" },
];
export const RESIDENCES = [
  { name: "The North Loft", meta: "2 bed · 96 m² · harbor view", price: "$1.2M" },
  { name: "Ironmonger Duplex", meta: "3 bed · 140 m² · terrace", price: "$1.9M" },
  { name: "Penthouse Residence", meta: "4 bed · 220 m² · private pool", price: "$4.4M" },
];
export const AMENITIES = [
  { no: "01", name: "Rooftop pool & bar", desc: "Heated year-round, with the best sunset in the city." },
  { no: "02", name: "The restaurant", desc: "Coastal cooking over fire, open to residents and the public." },
  { no: "03", name: "Spa & hammam", desc: "Steam, sauna, cold plunge and treatment rooms." },
  { no: "04", name: "Gym, 24/7", desc: "Full free weights, cardio and a studio for classes." },
  { no: "05", name: "Screening room", desc: "A 20-seat cinema for residents and private hire." },
  { no: "06", name: "Concierge", desc: "Reservations, transfers and the city, handled." },
];
export const OFFERS = [
  { name: "Third night free", desc: "Stay three, pay two — direct bookings only, flexible rate.", deal: "Save 33%", rate: 210 },
  { name: "Residents’ breakfast", desc: "Breakfast for two included on stays of two nights or more.", deal: "Included", rate: 210 },
  { name: "Long-stay rate", desc: "Seven nights or more at a reduced nightly rate, with a mid-stay clean.", deal: "From −20%", rate: 210 },
];
export const VISIT_INFO = [
  { title: "Address", body: `${HOSPITALITY.address}. The entrance is under the old crane on the waterfront.` },
  { title: "Getting here", body: "20 minutes from the airport by taxi; Cais do Sodré station is a two-minute walk for trains and the ferry." },
  { title: "Check-in", body: "Check-in from 15:00, check-out by 11:00. Early arrival and late checkout on request." },
  { title: "Good to know", body: "Dog-friendly rooms available, valet parking on site, and the rooftop is adults-only after 18:00." },
];
export const SOCIALS = ["Instagram", "Newsletter", "Pinterest"];

export const NAV = [
  { label: "Rooms", path: "/hospitality/rooms" },
  { label: "Residences", path: "/hospitality/residences" },
  { label: "Amenities", path: "/hospitality/amenities" },
  { label: "Offers", path: "/hospitality/offers" },
  { label: "Visit", path: "/hospitality/visit" },
];
