export const SERVICE = {
  name: "THE FADE ROOM",
  trade: "Barber & grooming",
  city: "Brooklyn",
  tagline: "Precision cuts, hot-towel shaves and honest advice — walk-ins welcome, appointments preferred.",
  address: "88 Kent Ave, Brooklyn NY",
  email: "hello@thefaderoom.com",
  rating: "4.9",
  reviewCount: "1,240",
  hoursToday: "Open until 20:00",
  bookHref: "/booking/business/the-fade-room/book",
};

export type Svc = { name: string; desc: string; dur: string; num: number; cat: string };
export const SERVICES: Svc[] = [
  { name: "Signature Cut", desc: "Consultation, cut, and style with product.", dur: "45 min", num: 45, cat: "Hair" },
  { name: "Skin Fade", desc: "Bald or taper fade, blended to the skin.", dur: "45 min", num: 48, cat: "Hair" },
  { name: "Cut & Beard", desc: "Full cut plus beard shape and line-up.", dur: "60 min", num: 62, cat: "Hair" },
  { name: "Hot-Towel Shave", desc: "Traditional straight-razor shave, hot towels.", dur: "40 min", num: 40, cat: "Shave" },
  { name: "Beard Trim & Line-up", desc: "Shape, trim and razor line-up.", dur: "25 min", num: 28, cat: "Shave" },
  { name: "Kids Cut (under 12)", desc: "Patient cuts for the little ones.", dur: "30 min", num: 30, cat: "Hair" },
  { name: "Gray Blending", desc: "Natural-looking color camouflage.", dur: "40 min", num: 55, cat: "Color" },
  { name: "Scalp Treatment", desc: "Exfoliating treatment and massage.", dur: "30 min", num: 38, cat: "Care" },
];
export const SVC_CATS = ["all", "Hair", "Shave", "Color", "Care"];

export const STATS = [
  { num: `★ ${SERVICE.rating}`, label: `${SERVICE.reviewCount} reviews` },
  { num: "15m", label: "Avg. wait" },
  { num: "6", label: "Chairs" },
  { num: "2014", label: "Est." },
];

export const TEAM = [
  { name: "Marcus Vell", role: "Master barber · Owner", bio: "Twenty years behind the chair. Fades, classic cuts and straight-razor work." },
  { name: "Ivy Sol", role: "Senior barber", bio: "Textured crops, scissor work and color blending specialist." },
  { name: "Dez Rowe", role: "Barber", bio: "Sharp line-ups, beard sculpting and a very steady hand." },
];

export const GALLERY: { caption: string; ratio: string }[] = [
  { caption: "Skin fade", ratio: "1/1" }, { caption: "Textured crop", ratio: "3/4" },
  { caption: "Beard sculpt", ratio: "1/1" }, { caption: "Classic side part", ratio: "3/4" },
  { caption: "Line-up detail", ratio: "1/1" }, { caption: "Hot-towel shave", ratio: "3/4" },
  { caption: "Color blend", ratio: "1/1" }, { caption: "The shop floor", ratio: "3/4" },
];

export const REVIEWS = [
  { text: "Best fade in the city, and they never rush you. Booked online in ten seconds.", author: "James P.", service: "Skin Fade" },
  { text: "Marcus completely got what I wanted from one photo. Been coming back for years.", author: "Andre L.", service: "Cut & Beard" },
  { text: "The hot-towel shave is a proper experience. Worth every penny.", author: "Tom R.", service: "Hot-Towel Shave" },
  { text: "Took my son for his first real haircut — so patient and kind. Highly recommend.", author: "Priya S.", service: "Kids Cut" },
].map((r) => ({ ...r, stars: "★★★★★" }));

export const VISIT_INFO = [
  { title: "Location", body: `${SERVICE.address}. Between Metropolitan and N 3rd — look for the red barber pole.` },
  { title: "Getting here", body: "Bedford Ave L train, two minutes away. Metered street parking on Kent." },
  { title: "Walk-ins & waitlist", body: "Walk-ins welcome when a chair is free; booking online guarantees your slot and barber." },
];
export const HOURS: [string, string][] = [
  ["Monday", "Closed"], ["Tuesday", "10–19"], ["Wednesday", "10–19"], ["Thursday", "10–20"],
  ["Friday", "10–20"], ["Saturday", "9–18"], ["Sunday", "11–16"],
];
export const SOCIALS = ["Instagram", "TikTok", "Google"];

export const NAV = [
  { label: "Services", path: "/service/services" },
  { label: "Team", path: "/service/team" },
  { label: "Gallery", path: "/service/gallery" },
  { label: "Reviews", path: "/service/reviews" },
  { label: "Visit", path: "/service/visit" },
];
