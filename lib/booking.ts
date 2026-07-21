export const BOOKING = { brand: "SLOTLINE", heroLine: "Book anything, anywhere.", deposit: "$10" };

export type BizService = { name: string; desc: string; min: number; price: number };
export type Business = {
  slug: string; name: string; category: string; area: string; rating: string; reviews: string; from: string; addr: string; about: string;
  services: BizService[];
  team: { name: string; role: string }[];
};

export const BUSINESSES: Business[] = [
  { slug: "the-fade-room", name: "The Fade Room", category: "Barber", area: "Brooklyn", rating: "4.9", reviews: "1,240", from: "from $28", addr: "88 Kent Ave, Brooklyn NY", about: "A modern barbershop for precision cuts, skin fades and hot-towel shaves. Walk-ins welcome, booking preferred.",
    services: [ { name: "Signature Cut", desc: "Consultation, cut and style.", min: 45, price: 45 }, { name: "Skin Fade", desc: "Blended to the skin.", min: 45, price: 48 }, { name: "Cut & Beard", desc: "Cut plus beard shape.", min: 60, price: 62 }, { name: "Hot-Towel Shave", desc: "Straight-razor, hot towels.", min: 40, price: 40 }, { name: "Beard Trim", desc: "Shape and line-up.", min: 25, price: 28 } ],
    team: [ { name: "Any available", role: "First open slot" }, { name: "Marcus Vell", role: "Master barber" }, { name: "Ivy Sol", role: "Senior barber" }, { name: "Dez Rowe", role: "Barber" } ] },
  { slug: "lumen-skin", name: "Lumen Skin", category: "Beauty", area: "Manhattan", rating: "4.8", reviews: "860", from: "from $60", addr: "5 Crosby St, New York NY", about: "A results-driven facial bar — dermaplaning, peels and LED, tailored to your skin in a calm studio.",
    services: [ { name: "Signature Facial", desc: "60-minute custom facial.", min: 60, price: 95 }, { name: "Dermaplane", desc: "Exfoliating resurfacing.", min: 45, price: 80 }, { name: "LED Add-on", desc: "Red/blue light therapy.", min: 20, price: 40 }, { name: "Chemical Peel", desc: "Medical-grade peel.", min: 50, price: 120 } ],
    team: [ { name: "Any available", role: "First open slot" }, { name: "Dr. Noor", role: "Aesthetician" }, { name: "Cira P.", role: "Skin therapist" } ] },
  { slug: "inkhouse", name: "Inkhouse", category: "Tattoo", area: "Queens", rating: "5.0", reviews: "410", from: "from $120", addr: "19-02 Steinway St, Queens NY", about: "A private studio for custom tattoo work. Consultations first, appointments only.",
    services: [ { name: "Consultation", desc: "Design and quote.", min: 30, price: 0 }, { name: "Small Piece", desc: "Up to palm-size.", min: 90, price: 180 }, { name: "Half Sleeve (session)", desc: "Per 3-hour session.", min: 180, price: 480 }, { name: "Touch-up", desc: "Existing work.", min: 45, price: 120 } ],
    team: [ { name: "Any available", role: "First open slot" }, { name: "Rae Ink", role: "Fine-line" }, { name: "Bones", role: "Blackwork" } ] },
  { slug: "paws-and-co", name: "Paws & Co", category: "Petcare", area: "Brooklyn", rating: "4.7", reviews: "1,020", from: "from $35", addr: "240 Bergen St, Brooklyn NY", about: "Gentle, fear-free grooming for dogs and cats. Small batches, no cages, lots of treats.",
    services: [ { name: "Bath & Brush", desc: "Wash, dry, brush-out.", min: 45, price: 45 }, { name: "Full Groom", desc: "Bath, cut and style.", min: 90, price: 80 }, { name: "Nail Trim", desc: "Quick and calm.", min: 15, price: 20 }, { name: "De-shed Treatment", desc: "Reduces shedding.", min: 60, price: 65 } ],
    team: [ { name: "Any available", role: "First open slot" }, { name: "Tam L.", role: "Lead groomer" }, { name: "Jo R.", role: "Groomer" } ] },
  { slug: "serene-nails", name: "Serene Nails", category: "Beauty", area: "Manhattan", rating: "4.6", reviews: "2,140", from: "from $22", addr: "112 Ludlow St, New York NY", about: "A clean, quiet nail studio — manicures, pedicures and gel, with medical-grade sterilisation.",
    services: [ { name: "Classic Manicure", desc: "Shape, cuticle, polish.", min: 30, price: 22 }, { name: "Gel Manicure", desc: "Long-lasting gel.", min: 45, price: 38 }, { name: "Spa Pedicure", desc: "Soak, scrub, massage.", min: 55, price: 55 }, { name: "Nail Art (per nail)", desc: "Custom design.", min: 15, price: 8 } ],
    team: [ { name: "Any available", role: "First open slot" }, { name: "Mai T.", role: "Nail artist" }, { name: "Rosa G.", role: "Technician" } ] },
  { slug: "homeshine", name: "HomeShine", category: "Home", area: "Citywide", rating: "4.8", reviews: "3,300", from: "from $90", addr: "Mobile · comes to you", about: "Vetted, insured home cleaning by the hour or by the job. Same team every time, on request.",
    services: [ { name: "Standard Clean (2h)", desc: "Kitchen, bath, floors.", min: 120, price: 90 }, { name: "Deep Clean (4h)", desc: "Top-to-bottom.", min: 240, price: 180 }, { name: "Move-out Clean", desc: "Deposit-ready.", min: 300, price: 240 }, { name: "Add-on: Inside Oven", desc: "Degrease and shine.", min: 30, price: 30 } ],
    team: [ { name: "Any available", role: "Next free team" }, { name: "Team A", role: "2 cleaners" }, { name: "Team B", role: "2 cleaners" } ] },
];
export const CATEGORIES = ["all", "Barber", "Beauty", "Tattoo", "Petcare", "Home"];

export const HOURS = [ ["Mon", "Closed"], ["Tue", "10–19"], ["Wed", "10–19"], ["Thu", "10–20"], ["Fri", "10–20"], ["Sat", "9–18"], ["Sun", "11–16"] ];
export const DOWS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const ALL_TIMES = ["09:00", "09:45", "10:30", "11:15", "12:00", "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", "18:00"];
export const TAKEN_BY_DATE: Record<number, string[]> = { 0: ["09:00", "12:00"], 1: ["10:30"], 2: [], 3: ["15:00", "15:45"], 4: ["09:00"], 5: ["11:15", "13:30", "14:15"], 6: ["17:15"] };
export const STEP_NAMES = ["Service", "Specialist", "Date & time", "Details", "Payment"];

export const HOME_STATS = [ { num: "35K+", label: "Businesses" }, { num: "4.9", label: "Avg. rating" }, { num: "2.1M", label: "Bookings a month" }, { num: "60s", label: "To book" } ];
export const HOW_IT_WORKS = [ { no: "01", title: "Find", body: "Search by service, business or area and compare real reviews." }, { no: "02", title: "Book", body: "Pick a time that works and pay a small deposit to lock it in." }, { no: "03", title: "Show up", body: "Get reminders, add it to your calendar, and rebook in a tap." } ];

export const BIZ_FEATURES = [
  { no: "01", title: "24/7 online booking", body: "A page clients can book from any time — website, Instagram or Google." },
  { no: "02", title: "Deposits & no-show fees", body: "Take a card up front and cut no-shows to almost nothing." },
  { no: "03", title: "Automated reminders", body: "Text and email reminders go out on their own." },
  { no: "04", title: "Calendar & team", body: "Manage staff, rosters and availability from one screen." },
  { no: "05", title: "Payments & payouts", body: "Card, wallet and in-store — reconciled and paid out fast." },
  { no: "06", title: "Reviews & rebooking", body: "Collect reviews and prompt clients to rebook automatically." },
];
export const BIZ_STATS = [ { num: "35K+", label: "Businesses" }, { num: "−82%", label: "No-shows" }, { num: "$0", label: "Setup cost" }, { num: "2 min", label: "To go live" } ];
export const PLANS = [
  { key: "starter", name: "Starter", tagline: "Solo", price: "$0", per: "", perks: ["Booking page", "Up to 40 bookings/mo", "Reminders", "2.9% + card fee"], featured: false },
  { key: "pro", name: "Pro", tagline: "Most popular", price: "$29", per: "/mo", perks: ["Unlimited bookings", "Deposits & no-show fees", "Up to 5 staff", "Lower card fees"], featured: true },
  { key: "team", name: "Team", tagline: "Multi-location", price: "$79", per: "/mo", perks: ["Everything in Pro", "Unlimited staff & locations", "Analytics & payroll", "Priority support"], featured: false },
];

export const DASH_STATS = [ { num: "9", label: "Today's bookings" }, { num: "$612", label: "Expected revenue" }, { num: "86%", label: "Chair utilisation" }, { num: "2", label: "Waitlist" } ];
export const APPTS = [
  { time: "09:00", client: "James P.", service: "Skin Fade", staff: "Marcus", dur: "45m", base: 1 },
  { time: "09:45", client: "Andre L.", service: "Cut & Beard", staff: "Ivy", dur: "60m", base: 0 },
  { time: "11:00", client: "Sam O.", service: "Signature Cut", staff: "Dez", dur: "45m", base: 0 },
  { time: "12:15", client: "Priya S.", service: "Kids Cut", staff: "Marcus", dur: "30m", base: 0 },
  { time: "14:00", client: "Tom R.", service: "Hot-Towel Shave", staff: "Ivy", dur: "40m", base: 2 },
];
export const STAGE_NAMES = ["Upcoming", "Checked in", "Done"];
export const STAGE_TAGS = ["tag-outline", "tag-accent", "tag-neutral"];

export const NAV = [
  { label: "Discover", path: "/booking/discover" },
  { label: "For business", path: "/booking/for-business" },
  { label: "Pricing", path: "/booking/pricing" },
  { label: "Dashboard", path: "/booking/dashboard" },
];

export function money(n: number): string { return n === 0 ? "Free" : "$" + n; }
export function bizBySlug(slug: string): Business | undefined { return BUSINESSES.find((b) => b.slug === slug); }
