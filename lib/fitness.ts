export const FITNESS = {
  brand: "IRONHOUSE",
  kind: "Strength & conditioning club",
  city: "Austin",
  heroLine: "Show up. Get strong.",
  heroSub: "Coached strength, group classes, recovery and leagues under one roof — with a plan for every body and every goal.",
  address: "221 Foundry St, Austin TX",
};

export const STATS = [
  { num: "60+", label: "Classes a week" },
  { num: "18", label: "Expert coaches" },
  { num: "24/7", label: "Open gym" },
  { num: "4.9", label: "Member rating" },
];

export const PILLARS = [
  { title: "Strength & conditioning", desc: "Barbell, kettlebell and machines with coaching on the floor." },
  { title: "Group fitness", desc: "HIIT, spin, mobility and more — high energy, all levels." },
  { title: "Yoga & mobility", desc: "Vinyasa, restorative and dedicated mobility work." },
  { title: "Combat & boxing", desc: "Bag work, pad work and technical sparring." },
  { title: "Recovery & biohacking", desc: "Sauna, cold plunge, compression and red light." },
  { title: "Sport & leagues", desc: "Social leagues in five-a-side, basketball and more." },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DISCIPLINES = ["all", "Strength", "HIIT", "Yoga", "Boxing"];
export type ClassRow = { time: string; name: string; coach: string; len: string; discipline: string; spots: number };
export const CLASSES: ClassRow[] = [
  { time: "06:00", name: "Sunrise Strength", coach: "Coach Rhea", len: "60m", discipline: "Strength", spots: 4 },
  { time: "07:30", name: "HIIT 45", coach: "Coach Marcus", len: "45m", discipline: "HIIT", spots: 0 },
  { time: "09:00", name: "Vinyasa Flow", coach: "Coach Ivy", len: "60m", discipline: "Yoga", spots: 8 },
  { time: "12:15", name: "Lunch Lift", coach: "Coach Rhea", len: "45m", discipline: "Strength", spots: 6 },
  { time: "17:30", name: "Boxing Fundamentals", coach: "Coach Dez", len: "60m", discipline: "Boxing", spots: 2 },
  { time: "18:45", name: "Spin & Burn", coach: "Coach Marcus", len: "45m", discipline: "HIIT", spots: 12 },
  { time: "19:30", name: "Restore & Mobility", coach: "Coach Ivy", len: "50m", discipline: "Yoga", spots: 10 },
];

export const PROGRAMS = [
  { name: "Foundations (beginner)", level: "Beginner", freq: "3×/week · 6 weeks", desc: "A structured on-ramp — learn the lifts, build the habit, and finish confident on the gym floor." },
  { name: "Hypertrophy Block", level: "Intermediate", freq: "4×/week · 8 weeks", desc: "Progressive overload built around your schedule, with coach check-ins and a tracked program." },
  { name: "Athlete Performance", level: "Advanced", freq: "5×/week", desc: "Strength, speed and conditioning for competitive athletes, periodised across your season." },
  { name: "Class Pass", level: "All levels", freq: "Unlimited", desc: "No program, just show up — mix strength, HIIT, yoga and boxing however you like." },
];

export const RECOVERY = [
  { no: "01", name: "Infrared sauna", desc: "Sessions bookable in the app, towels provided." },
  { no: "02", name: "Cold plunge", desc: "Contrast therapy after every training block." },
  { no: "03", name: "Compression boots", desc: "NormaTec recovery in the lounge." },
  { no: "04", name: "Red-light therapy", desc: "Targeted panels for recovery and skin." },
  { no: "05", name: "InBody scan", desc: "Track body composition every month." },
  { no: "06", name: "Sleep & HRV coaching", desc: "Wearable-based guidance from our team." },
];
export const NUTRITION = ["Registered nutritionist, 1:1", "Personalised macro targets", "Monthly body-composition scans", "Meal-prep workshops"];

export type League = { sport: string; night: string; season: string; format: string; spots: number };
export const LEAGUES: League[] = [
  { sport: "Five-a-side football", night: "Tuesdays", season: "6 weeks", format: "8-team league", spots: 3 },
  { sport: "Basketball", night: "Wednesdays", season: "8 weeks", format: "10-team league", spots: 0 },
  { sport: "Pickleball ladder", night: "Thursdays", season: "Rolling", format: "Singles & doubles", spots: 6 },
  { sport: "Run club", night: "Saturdays", season: "Year-round", format: "Free for members", spots: 20 },
];

export const PLANS = [
  { key: "flex", name: "Flex", tagline: "Pay monthly", price: "$49", per: "/mo", perks: ["Open-gym access", "4 classes a month", "App & booking", "Recovery add-on"], featured: false },
  { key: "unlimited", name: "Unlimited", tagline: "Most popular", price: "$89", per: "/mo", perks: ["Everything in Flex", "Unlimited classes", "Full recovery suite", "Guest passes", "1 free PT session/mo"], featured: true },
  { key: "performance", name: "Performance", tagline: "All-in", price: "$149", per: "/mo", perks: ["Everything in Unlimited", "Weekly 1:1 coaching", "Nutrition plan", "Monthly InBody scan", "League entry included"], featured: false },
];

export const NAV = [
  { label: "Timetable", path: "/fitness/schedule" },
  { label: "Programs", path: "/fitness/programs" },
  { label: "Wellness", path: "/fitness/wellness" },
  { label: "Leagues", path: "/fitness/leagues" },
  { label: "Membership", path: "/fitness/membership" },
];
