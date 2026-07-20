export const ATTRACTION = {
  name: "THE HELIX",
  kind: "Museum of science & wonder",
  city: "Chicago",
  tagline: "Four floors of hands-on exhibits, a domed theatre and a rooftop observatory — where curiosity gets loud.",
  address: "600 Lakeshore Drive, Chicago IL",
};

export const ATTRACTIONS = [
  { title: "The Deep Ocean", tag: "Gallery", zone: "Level 1", desc: "A two-storey tank and a walk-through tunnel beneath the reef.", detail: "Allow 45 min" },
  { title: "Gravity Lab", tag: "Hands-on", zone: "Level 2", desc: "Drop towers, pendulums and a vacuum chamber you can trigger yourself.", detail: "Allow 30 min" },
  { title: "The Dome", tag: "Show", zone: "Level 2", desc: "A 20-metre planetarium running four programmes daily.", detail: "Shows on the hour" },
  { title: "Bodyworks", tag: "Gallery", zone: "Level 3", desc: "The human body at every scale, from cell to system.", detail: "Allow 40 min" },
  { title: "Rooftop Observatory", tag: "Experience", zone: "Level 4", desc: "Solar scopes by day, deep-sky viewing on late Fridays.", detail: "Weather permitting" },
  { title: "Tinker Studio", tag: "Hands-on", zone: "Level 1", desc: "A working makerspace — build, break and take it home.", detail: "Drop-in" },
];
export const ZONES = ["all", "Level 1", "Level 2", "Level 3", "Level 4"];
export const SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
export const TICKET_TYPES = [
  { name: "Adult", note: "Ages 16–64", num: 24 },
  { name: "Child", note: "Ages 3–15", num: 14 },
  { name: "Family", note: "2 adults + 2 children", num: 68 },
  { name: "Concession", note: "Student / senior", num: 18 },
];

export const EVENTS = [
  { title: "After Dark: Adults Only", type: "Late event", dates: "Fridays in Sept", desc: "The museum after hours — full-bar access, live science demos and the observatory open till late. 18+." },
  { title: "Dinosaurs Reimagined", type: "Special exhibition", dates: "Until Nov 30", desc: "Life-size animatronics and the latest fossil science, in a blackout gallery built for the show." },
  { title: "Little Scientists", type: "Family activation", dates: "Weekend mornings", desc: "A pop-up lab for under-7s — messy, loud and completely age-appropriate." },
];

export const VISIT = [
  { title: "Getting here", body: "600 Lakeshore Drive, Chicago IL. Two blocks from the Red Line; bike racks at the north entrance. Paid parking under the plaza." },
  { title: "Opening hours", body: "Daily 9:00–18:00, late Fridays until 21:00. Last entry one hour before close. Closed December 25." },
  { title: "Accessibility", body: "Step-free throughout, wheelchairs to borrow at the desk, sensory backpacks and a quiet room on Level 3. Companion tickets are free." },
  { title: "Food & bags", body: "Two cafés and a rooftop bar. Large bags and suitcases must be checked at the cloakroom." },
];
export const FAQS = [
  { q: "Do I need to book in advance?", a: "Timed-entry tickets are strongly recommended and often sell out for weekends and holidays. Members can walk up any time." },
  { q: "Are tickets refundable?", a: "Tickets are refundable up to 24 hours before your slot, and freely re-datable any time through the link in your confirmation email." },
  { q: "How long should I allow?", a: "Most visitors spend three to four hours. A full day is easy if you catch a dome show and the observatory." },
  { q: "Is re-entry allowed?", a: "Yes — your ticket is valid for the whole day. Get your hand stamped at any exit." },
];
export const STATS = [
  { num: "4", label: "Floors" },
  { num: "300+", label: "Exhibits" },
  { num: "1.2M", label: "Visitors a year" },
  { num: "1933", label: "Founded" },
];
export const NAV = [
  { label: "Attractions", path: "/attraction/attractions" },
  { label: "Tickets", path: "/attraction/tickets" },
  { label: "What's on", path: "/attraction/events" },
  { label: "Visit", path: "/attraction/visit" },
];
