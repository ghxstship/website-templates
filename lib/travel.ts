export const TRAVEL = { brand: "WAYPOINT", heroLine: "Go anywhere." };

export type Mode = "flights" | "stays" | "rail" | "cars" | "tours";
export const MODES: { key: Mode; label: string }[] = [
  { key: "flights", label: "Flights" },
  { key: "stays", label: "Stays" },
  { key: "rail", label: "Rail" },
  { key: "cars", label: "Cars" },
  { key: "tours", label: "Tours" },
];

export type Field = { label: string; type: string; value: string; ph: string };
export const FIELD_SETS: Record<Mode, { cols: string; fields: Field[] }> = {
  flights: { cols: "1fr 1fr 1fr 1fr auto", fields: [ { label: "From", type: "text", value: "London (LHR)", ph: "City or airport" }, { label: "To", type: "text", value: "", ph: "City or airport" }, { label: "Depart", type: "date", value: "2026-09-18", ph: "" }, { label: "Travellers", type: "text", value: "1 adult", ph: "" } ] },
  stays: { cols: "1.4fr 1fr 1fr 1fr auto", fields: [ { label: "Destination", type: "text", value: "", ph: "City or hotel" }, { label: "Check in", type: "date", value: "2026-09-18", ph: "" }, { label: "Check out", type: "date", value: "2026-09-22", ph: "" }, { label: "Guests", type: "text", value: "2 guests", ph: "" } ] },
  rail: { cols: "1fr 1fr 1fr 1fr auto", fields: [ { label: "From", type: "text", value: "Paris", ph: "Station" }, { label: "To", type: "text", value: "", ph: "Station" }, { label: "Date", type: "date", value: "2026-09-18", ph: "" }, { label: "Passengers", type: "text", value: "1 adult", ph: "" } ] },
  cars: { cols: "1.4fr 1fr 1fr 1fr auto", fields: [ { label: "Pick-up location", type: "text", value: "", ph: "Airport or city" }, { label: "Pick-up", type: "date", value: "2026-09-18", ph: "" }, { label: "Drop-off", type: "date", value: "2026-09-22", ph: "" }, { label: "Driver age", type: "text", value: "30+", ph: "" } ] },
  tours: { cols: "1.4fr 1fr 1fr auto", fields: [ { label: "Region", type: "text", value: "", ph: "Anywhere" }, { label: "From", type: "date", value: "2026-09-01", ph: "" }, { label: "Group size", type: "text", value: "2 people", ph: "" } ] },
};

export const MODE_TITLE: Record<Mode, string> = { flights: "Flights", stays: "Stays", rail: "Rail journeys", cars: "Car rentals", tours: "Tours & expeditions" };
export const RESULTS_SUMMARY: Record<Mode, string> = { flights: "London → Tokyo · Sep 18 · 1 adult", stays: "Tokyo · Sep 18–22 · 2 guests", rail: "Paris → Milan · Sep 18", cars: "Tokyo · Sep 18–22", tours: "Anywhere · flexible dates" };

export type Result = { title: string; sub: string; meta: string; num: number; priceNote: string };
export const RESULTS: Record<Mode, Result[]> = {
  flights: [
    { title: "London → Tokyo", sub: "ANA · Nonstop · 11h 55m", meta: "Depart 11:30 · Arrive 08:25+1", num: 742, priceNote: "round trip" },
    { title: "London → Tokyo", sub: "Qatar · 1 stop (DOH) · 17h 10m", meta: "Depart 09:05 · Arrive 09:15+1", num: 611, priceNote: "round trip" },
    { title: "London → Tokyo", sub: "Finnair · 1 stop (HEL) · 14h 40m", meta: "Depart 13:20 · Arrive 11:00+1", num: 688, priceNote: "round trip" },
    { title: "London → Tokyo", sub: "BA · Nonstop · 11h 45m", meta: "Depart 19:00 · Arrive 15:40+1", num: 820, priceNote: "round trip" },
  ],
  stays: [
    { title: "Hotel Kaijō", sub: "Ginza · 5-star · 9.4 Superb", meta: "Free cancellation · Breakfast", num: 340, priceNote: "per night" },
    { title: "The Warehouse Loft", sub: "Kuramae · Aparthotel · 9.1", meta: "Kitchen · 2 guests", num: 185, priceNote: "per night" },
    { title: "Ryokan Asakusa", sub: "Asakusa · Ryokan · 9.6 Exceptional", meta: "Onsen · Kaiseki dinner", num: 420, priceNote: "per night" },
    { title: "Pod Hotel Shinjuku", sub: "Shinjuku · Capsule · 8.7", meta: "Central · Late checkout", num: 72, priceNote: "per night" },
  ],
  rail: [
    { title: "Paris → Milan", sub: "TGV · Direct · 6h 50m", meta: "Depart 07:15 · Arrive 14:05", num: 79, priceNote: "one way" },
    { title: "Paris → Milan", sub: "Frecciarossa · 1 change · 7h 20m", meta: "Depart 10:41 · Arrive 18:01", num: 64, priceNote: "one way" },
    { title: "Paris → Milan", sub: "Night train · Direct · 11h", meta: "Depart 20:30 · Arrive 07:30+1", num: 110, priceNote: "couchette" },
  ],
  cars: [
    { title: "Compact — VW Golf", sub: "Europcar · Automatic · 5 seats", meta: "Unlimited miles · Free cancel", num: 41, priceNote: "per day" },
    { title: "SUV — Toyota RAV4", sub: "Hertz · Automatic · 5 seats", meta: "AWD · Unlimited miles", num: 68, priceNote: "per day" },
    { title: "Electric — Tesla Model 3", sub: "Sixt · Automatic · 5 seats", meta: "Free charging · 320mi range", num: 89, priceNote: "per day" },
  ],
  tours: [
    { title: "Nordic Fjords Expedition", sub: "8 days · Small ship · Max 96", meta: "Bergen → Kirkenes", num: 3200, priceNote: "per person" },
    { title: "Kyoto & Kansai on Foot", sub: "6 days · Guided walking", meta: "Max 12 travelers", num: 1850, priceNote: "per person" },
    { title: "Atacama Stargazing", sub: "5 days · 4×4 · Astronomy guide", meta: "San Pedro base", num: 2100, priceNote: "per person" },
  ],
};

export const DESTINATIONS = [
  { name: "Tokyo", from: "from $742", note: "Flights · Stays · Rail" },
  { name: "Reykjavík", from: "from $410", note: "Flights · Cars · Tours" },
  { name: "Lisbon", from: "from $190", note: "Flights · Stays" },
  { name: "Cape Town", from: "from $880", note: "Flights · Tours" },
  { name: "Kyoto", from: "from $760", note: "Rail · Stays · Tours" },
  { name: "Patagonia", from: "from $1,950", note: "Tours · Expeditions" },
];

export const TOURS = [
  { name: "Nordic Fjords Expedition", length: "8 days", region: "Norway", desc: "A small-ship voyage up the working coast — fishing villages, glaciers, and the chance of the aurora, with an expedition team aboard.", num: 3200 },
  { name: "Kyoto & Kansai on Foot", length: "6 days", region: "Japan", desc: "Temples at dawn, a tea ceremony, and back-street kaiseki — a guided walking tour capped at twelve travelers.", num: 1850 },
  { name: "Atacama Stargazing", length: "5 days", region: "Chile", desc: "The clearest skies on earth, a resident astronomer, and salt flats at sunrise from a desert base camp.", num: 2100 },
  { name: "Serengeti Migration Safari", length: "9 days", region: "Tanzania", desc: "Follow the herds across the plains in open 4×4s, with tented camps that move as the animals do.", num: 4600 },
];

export const STATS = [
  { num: "900+", label: "Airlines & operators" },
  { num: "1.2M", label: "Stays worldwide" },
  { num: "60s", label: "Avg. booking time" },
  { num: "24/7", label: "Trip support" },
];

export const FAQS = [
  { q: "Can I book flights, hotels and cars together?", a: "Yes — the booking engine covers flights, stays, rail, car rentals and guided tours. Bundle them into one itinerary and manage everything under My Trips." },
  { q: "What is your cancellation policy?", a: "It depends on the fare or rate you choose — each result shows whether it is free-cancellation. Refundable options are clearly marked before you pay." },
  { q: "Do you charge booking fees?", a: "No. The price you see is the price you pay; we are paid by the operators, not by you." },
  { q: "Is my booking protected?", a: "All package bookings are financially protected, and our 24/7 support team can rebook you if plans change en route." },
];

export const NAV = [
  { label: "Book", path: "/travel" },
  { label: "Destinations", path: "/travel/destinations" },
  { label: "Tours", path: "/travel/tours" },
  { label: "My trips", path: "/travel/trips" },
  { label: "Help", path: "/travel/help" },
];
