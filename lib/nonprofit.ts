export const NONPROFIT = {
  brand: "THE TIDELINE TRUST",
  orgName: "The Tideline Trust",
  cause: "Clean water & coastlines",
  heroLine: "Give the coast a future.",
  heroSub: "We restore shorelines, fund clean-water projects and train the communities who protect them — funded entirely by people like you.",
};

export const STATS = [
  { num: "2.4M", label: "Liters cleaned" }, { num: "140km", label: "Coast restored" },
  { num: "38", label: "Communities" }, { num: "91%", label: "To programs" },
];
export const PROGRAMS = [
  { name: "Clean water", body: "Wells, filters and testing for coastal communities." },
  { name: "Shoreline restoration", body: "Replanting mangroves and clearing plastic at scale." },
  { name: "Ranger training", body: "Equipping locals to monitor and defend their waters." },
];
export const QUOTE = { text: "For the first time, the children here drink without getting sick. That is what your gift did.", name: "Amara O.", role: "Community lead, Cross River" };

export const WORK_SECTIONS = [
  { name: "Clean Water", region: "West Africa", reach: "38 villages", desc: "Solar-powered wells and household filters, plus water-quality testing that keeps them safe for good." },
  { name: "Living Shorelines", region: "SE Asia", reach: "140 km", desc: "Community-led mangrove replanting and plastic recovery that brings the fish — and the fishers — back." },
  { name: "Coastal Rangers", region: "Global", reach: "600 trained", desc: "A paid ranger corps drawn from local communities to monitor, report and protect." },
  { name: "Schools at the Edge", region: "Pacific", reach: "22 schools", desc: "Water, sanitation and ocean-literacy programs for schools on the front line of rising seas." },
];

export const IMPACT_STATS = [
  { num: "91¢", label: "Of every $1 to programs" }, { num: "2.4M", label: "Liters cleaned" },
  { num: "600", label: "Rangers trained" }, { num: "4★", label: "Charity rating" },
];
export const ALLOCATIONS = [
  { name: "Programs", pct: 91 }, { name: "Fundraising", pct: 6 }, { name: "Admin", pct: 3 },
];

export const AMOUNT_OPTIONS = [25, 50, 100, 250];
export const IMPACT_EXAMPLES = [
  { amt: "$25", does: "A month of clean water for a child." },
  { amt: "$100", does: "A family’s filter for a year." },
  { amt: "$250", does: "A village water test for a year." },
];
export function impactLine(amt: number): string {
  return amt >= 250 ? `$${amt} funds a village water test for a year.`
    : amt >= 100 ? `$${amt} filters clean water for a family for a year.`
    : amt >= 50 ? `$${amt} plants 50 mangroves.`
    : `$${amt} provides a month of clean water for a child.`;
}

export const INVOLVE_WAYS = [
  { key: "volunteer", name: "Volunteer", body: "Join a beach clean or a restoration trip near you.", cta: "Find events", title: "Thanks for signing up", note: "We’ll email you the next volunteer dates in your area." },
  { key: "fundraise", name: "Fundraise", body: "Run, bake or challenge yourself and raise with a page.", cta: "Start a page", title: "Fundraising page created", note: "Your page is live — share the link and start raising." },
  { key: "partner", name: "Partner", body: "Corporate giving, matched funding and payroll giving.", cta: "Talk to us", title: "Message sent", note: "Our partnerships team will be in touch shortly." },
];
export const SOCIALS = ["Instagram", "YouTube", "Newsletter"];

export const NAV = [
  { label: "Our work", path: "/nonprofit/work" },
  { label: "Impact", path: "/nonprofit/impact" },
  { label: "Get involved", path: "/nonprofit/involved" },
  { label: "Donate", path: "/nonprofit/donate" },
];
