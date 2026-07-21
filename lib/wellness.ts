export const WELLNESS = {
  brand: "THE SPRINGS",
  kind: "Spa & wellness retreat",
  city: "Ojai",
  tagline: "Thermal baths, hands-on healing and multi-day retreats — an hour from the city, a world away from it.",
  address: "9 Canyon Road, Ojai CA",
};

export type Treatment = { name: string; desc: string; dur: string; num: number; cat: string };
export const TREATMENTS: Treatment[] = [
  { name: "Signature Massage", desc: "Full-body, tailored pressure, warm oils.", dur: "60 min", num: 150, cat: "Massage" },
  { name: "Deep Tissue", desc: "Targeted release for knots and tension.", dur: "60 min", num: 165, cat: "Massage" },
  { name: "Hot Stone Ritual", desc: "Basalt stones and long, slow strokes.", dur: "90 min", num: 210, cat: "Massage" },
  { name: "Purifying Facial", desc: "Deep-cleanse, extraction and mask.", dur: "60 min", num: 140, cat: "Face" },
  { name: "Thermal Circuit", desc: "Sauna, steam, cold plunge and rest.", dur: "2 hrs", num: 75, cat: "Water" },
  { name: "Watsu (water therapy)", desc: "Floating bodywork in warm water.", dur: "45 min", num: 190, cat: "Water" },
  { name: "Sound Bath", desc: "Group session in the dome.", dur: "50 min", num: 45, cat: "Mind" },
  { name: "Guided Breathwork", desc: "A reset for the nervous system.", dur: "45 min", num: 55, cat: "Mind" },
];
export const TREATMENT_CATS = ["all", "Massage", "Face", "Water", "Mind"];

export const STATS = [
  { num: "4", label: "Thermal pools" }, { num: "30+", label: "Treatments" },
  { num: "★★★★★", label: "Guest rating" }, { num: "12", label: "Therapists" },
];
export const RETREATS = [
  { name: "Reset Weekend", length: "2 nights", dates: "Every Fri–Sun", desc: "Two nights of baths, bodywork and simple food to switch everything off and back on.", num: 890 },
  { name: "Deep Rest", length: "5 days", dates: "Monthly", desc: "A five-day immersion in sleep, breath and stillness with daily treatments and coaching.", num: 2400 },
  { name: "Silent Retreat", length: "7 days", dates: "Quarterly", desc: "A full week of guided silence, movement and meditation. Not for the faint of heart.", num: 3200 },
];
export const PLANS = [
  { key: "bathe", name: "Bathe", tagline: "The waters", price: "$95", per: "/mo", perks: ["Unlimited thermal circuit", "Member rates on treatments", "Guest passes", "App booking"] },
  { key: "restore", name: "Restore", tagline: "Most popular", price: "$180", per: "/mo", perks: ["Everything in Bathe", "One treatment a month", "Priority booking", "Free classes"] },
  { key: "sanctuary", name: "Sanctuary", tagline: "All in", price: "$340", per: "/mo", perks: ["Everything in Restore", "Two treatments a month", "One retreat night a year", "Bring a guest free"] },
];
export const VISIT_INFO = [
  { title: "Location", body: `${WELLNESS.address}. Set in the canyon, twenty minutes past the last town — the drive is part of it.` },
  { title: "Getting here", body: "An hour from the city by car; we run a members’ shuttle from the station on weekends." },
  { title: "What to bring", body: "Just yourself. Robes, sandals, towels and swimwear are provided; phones stay in lockers past reception." },
  { title: "Good to know", body: "The baths are adults-only. Arrive thirty minutes before your treatment to use the thermal circuit." },
];

export const NAV = [
  { label: "Treatments", path: "/wellness/treatments" },
  { label: "Retreats", path: "/wellness/retreats" },
  { label: "Membership", path: "/wellness/membership" },
  { label: "Visit", path: "/wellness/visit" },
];
