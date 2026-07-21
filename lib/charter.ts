export const CHARTER = {
  brand: "MERIDIAN CHARTER",
  heroLine: "Anywhere, on your schedule",
  tagline: "Air · sea · ground — one desk",
};

export type Mode = "jets" | "helis" | "yachts" | "cars";
export const MODE_DEFS: { key: Mode; label: string }[] = [
  { key: "jets", label: "Private jets" }, { key: "helis", label: "Helicopters" },
  { key: "yachts", label: "Yachts" }, { key: "cars", label: "Black cars" },
];
export const FIELD_SETS: Record<Mode, [string, string][]> = {
  jets: [["From", "Departure city / airport"], ["To", "Arrival city / airport"], ["Date", "Departure date"], ["Passengers", "e.g. 6"]],
  helis: [["From", "Pickup helipad / city"], ["To", "Destination helipad"], ["Date & time", "When"], ["Passengers", "e.g. 4"]],
  yachts: [["Cruising area", "e.g. West Med"], ["Embark date", "Start date"], ["Duration", "e.g. 7 days"], ["Guests", "e.g. 8"]],
  cars: [["Pickup", "Address / airport"], ["Dropoff", "Address / venue"], ["Date & time", "When"], ["Passengers", "e.g. 3"]],
};
export const MODE_NOTES: Record<Mode, string> = {
  jets: "Wheels-up in as little as 4 hours.", helis: "City-center transfers and scenic lifts.",
  yachts: "Crewed charters, all cabins, full provisioning.", cars: "Chauffeured, on-demand or by the day.",
};
export type Result = { name: string; class: string; cap: string; spec: string; price: string; priceUnit: string };
export const RESULT_SETS: Record<Mode, Result[]> = {
  jets: [
    { name: "Phenom 300E", class: "Light jet", cap: "Up to 7", spec: "2,010 nm range · 1 crew · Wi-Fi, refreshment center. Best for regional hops.", price: "$4,200", priceUnit: "per flight hour" },
    { name: "Citation XLS+", class: "Midsize", cap: "Up to 9", spec: "2,100 nm range · stand-up cabin · full galley and enclosed lav.", price: "$5,600", priceUnit: "per flight hour" },
    { name: "Gulfstream G650ER", class: "Heavy / long-range", cap: "Up to 14", spec: "7,500 nm range · nonstop transcontinental · 2 crew + attendant · bedroom.", price: "$11,900", priceUnit: "per flight hour" },
  ],
  helis: [
    { name: "Airbus H125", class: "Light single", cap: "Up to 5", spec: "Scenic and utility lifts · panoramic cabin · rooftop and helipad capable.", price: "$2,400", priceUnit: "per flight hour" },
    { name: "Bell 429", class: "Light twin", cap: "Up to 7", spec: "Executive twin · IFR · quiet cabin · airport and city transfers.", price: "$3,900", priceUnit: "per flight hour" },
    { name: "Sikorsky S-76", class: "Medium twin", cap: "Up to 8", spec: "VIP configuration · long range · the corporate standard.", price: "$5,200", priceUnit: "per flight hour" },
  ],
  yachts: [
    { name: "Sunreef 60 Catamaran", class: "Sailing cat", cap: "8 guests · 3 crew", spec: "Four cabins · shaded flybridge · water toys. Ideal for the islands.", price: "$38,000", priceUnit: "per week + expenses" },
    { name: "40m Motor Yacht", class: "Superyacht", cap: "10 guests · 7 crew", spec: "Five staterooms · jacuzzi · tender and jet skis · chef aboard.", price: "$185,000", priceUnit: "per week + expenses" },
    { name: "60m Explorer", class: "Expedition", cap: "12 guests · 16 crew", spec: "Global range · helipad · dive center · spa. For serious itineraries.", price: "$520,000", priceUnit: "per week + expenses" },
  ],
  cars: [
    { name: "Mercedes S-Class", class: "Executive sedan", cap: "Up to 3", spec: "Chauffeured · Wi-Fi · water and press · airport meet-and-greet.", price: "$140", priceUnit: "per hour (3 hr min)" },
    { name: "Cadillac Escalade", class: "Luxury SUV", cap: "Up to 5", spec: "Full-size SUV · luggage capacity · privacy glass.", price: "$180", priceUnit: "per hour (3 hr min)" },
    { name: "Mercedes Sprinter", class: "Executive van", cap: "Up to 12", spec: "Conference or lounge seating · ideal for teams and roadshows.", price: "$240", priceUnit: "per hour (4 hr min)" },
  ],
};
export const RESULTS_TITLES: Record<Mode, string> = { jets: "Available aircraft", helis: "Available helicopters", yachts: "Available yachts", cars: "Available vehicles" };

export type FleetItem = { slug: string; category: string; name: string; cap: string; spec: string; price: string };
export const FLEET: FleetItem[] = [
  { slug: "ch-f1", category: "Jet", name: "Phenom 300E", cap: "Up to 7", spec: "Light jet, 2,010 nm — the regional workhorse.", price: "from $4,200/hr" },
  { slug: "ch-f2", category: "Jet", name: "Gulfstream G650ER", cap: "Up to 14", spec: "Ultra-long-range — nonstop between continents.", price: "from $11,900/hr" },
  { slug: "ch-f3", category: "Helicopter", name: "Bell 429", cap: "Up to 7", spec: "Executive twin for city and airport transfers.", price: "from $3,900/hr" },
  { slug: "ch-f4", category: "Helicopter", name: "Airbus H125", cap: "Up to 5", spec: "Scenic lifts and high-altitude access.", price: "from $2,400/hr" },
  { slug: "ch-f5", category: "Yacht", name: "40m Motor Yacht", cap: "10 guests", spec: "Crewed superyacht, chef aboard, full toys.", price: "from $185k/wk" },
  { slug: "ch-f6", category: "Yacht", name: "Sunreef 60", cap: "8 guests", spec: "Sailing catamaran for island itineraries.", price: "from $38k/wk" },
  { slug: "ch-f7", category: "Car", name: "Mercedes S-Class", cap: "Up to 3", spec: "Chauffeured executive sedan, meet-and-greet.", price: "from $140/hr" },
  { slug: "ch-f8", category: "Car", name: "Cadillac Escalade", cap: "Up to 5", spec: "Luxury SUV with full luggage capacity.", price: "from $180/hr" },
];
export const CAT_LIST: [string, string][] = [["all", "All"], ["Jet", "Jets"], ["Helicopter", "Helicopters"], ["Yacht", "Yachts"], ["Car", "Black cars"]];

export const EMPTY_LEGS = [
  { route: "New York → Miami", date: "Fri, Aug 15", craft: "Citation XLS+", seats: "7", price: "$8,900" },
  { route: "London → Nice", date: "Sat, Aug 16", craft: "Phenom 300E", seats: "6", price: "£6,400" },
  { route: "Los Angeles → Las Vegas", date: "Sun, Aug 17", craft: "King Air 350", seats: "8", price: "$3,200" },
  { route: "Geneva → Ibiza", date: "Thu, Aug 21", craft: "Challenger 350", seats: "9", price: "€11,500" },
  { route: "Dubai → Maldives", date: "Fri, Aug 22", craft: "Gulfstream G450", seats: "12", price: "$18,700" },
];
export const TIERS = [
  { kicker: "Entry", name: "Jet Card", price: "$150k", unit: "25 flight hours, deposited", feats: ["Fixed hourly rates, locked for 12 months", "Guaranteed availability, 24h notice", "No repositioning fees in-region", "One membership, all aircraft classes"], featured: false, cta: "Apply" },
  { kicker: "Most popular", name: "Signature", price: "$400k", unit: "annual, all modes", feats: ["Jets, helicopters, yachts and cars on one card", "Guaranteed availability, 12h notice", "Dedicated advisor + trip planner", "Complimentary ground transfers"], featured: true, cta: "Apply" },
  { kicker: "By invitation", name: "Private Fleet", price: "Bespoke", unit: "fractional & whole ownership", feats: ["Fractional or managed ownership", "Tail of your choosing, your livery", "Global crew and maintenance handled", "Family office & concierge integration"], featured: false, cta: "Request invite" },
];
export const STATS = [
  { num: "4 hr", label: "Typical time to wheels-up" }, { num: "5,000+", label: "Vetted aircraft & vessels" },
  { num: "190", label: "Countries served" }, { num: "24/7", label: "Flight desk, every day" },
];

export const NAV = [
  { label: "Fleet", path: "/charter/fleet" },
  { label: "Charter", path: "/charter/request" },
  { label: "Empty legs", path: "/charter/empty-legs" },
  { label: "Membership", path: "/charter/membership" },
  { label: "Contact", path: "/charter/contact" },
];
