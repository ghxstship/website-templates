export const CAREER = {
  brand: "ROSTER",
  heroLine: "Find the next thing.",
  heroSub: "Jobs, freelance gigs, casting calls and open RFPs — with a full applicant tracker for the people hiring.",
};

export type ListingType = "Job" | "Gig" | "Audition" | "RFP";
export type Listing = { id: string; title: string; org: string; location: string; comp: string; type: ListingType; detailLine: string };
export const LISTINGS: Listing[] = [
  { id: "l0", title: "Senior Product Designer", org: "Northwind", location: "Remote (EU)", comp: "$95–120k", type: "Job", detailLine: "Full-time · Permanent" },
  { id: "l1", title: "Brand Identity for a Coffee Roaster", org: "Basalt Coffee", location: "Remote", comp: "$6–9k fixed", type: "Gig", detailLine: "Freelance · 4 weeks" },
  { id: "l2", title: "Lead Role — Independent Feature", org: "Aria Films", location: "Chicago, IL", comp: "SAG scale", type: "Audition", detailLine: "Casting · shoots Q4" },
  { id: "l3", title: "City Wayfinding System", org: "City of Helix", location: "On-site", comp: "$180k budget", type: "RFP", detailLine: "Tender · closes Oct 30" },
  { id: "l4", title: "Full-Stack Engineer", org: "Vela", location: "Hybrid — Berlin", comp: "€70–90k", type: "Job", detailLine: "Full-time · Permanent" },
  { id: "l5", title: "Motion Designer (contract)", org: "Ironwood", location: "Remote", comp: "$450/day", type: "Gig", detailLine: "Freelance · 3 months" },
  { id: "l6", title: "Ensemble — Regional Theatre", org: "The Armory", location: "Manchester, UK", comp: "Equity min.", type: "Audition", detailLine: "Casting · rep season" },
  { id: "l7", title: "Digital Archive Platform", org: "Meridian Trust", location: "Remote", comp: "$240k budget", type: "RFP", detailLine: "Tender · closes Nov 14" },
];
export const TYPE_FILTERS: (ListingType | "all")[] = ["all", "Job", "Gig", "Audition", "RFP"];

export function sectionsFor(t: ListingType) {
  if (t === "Audition") return [{ h: "The role", items: ["Lead, appears in most scenes", "Ages 25–35, any ethnicity", "Regional accent a plus"] }, { h: "Submission", items: ["Headshot & CV", "Two contrasting self-tapes", "Availability for callbacks"] }];
  if (t === "RFP") return [{ h: "Scope", items: ["Discovery, design and delivery", "Stakeholder workshops", "Documentation & handover"] }, { h: "To submit", items: ["Capability statement", "Relevant case studies", "Costed proposal & timeline"] }];
  if (t === "Gig") return [{ h: "The brief", items: ["Clear deliverables, fixed fee", "Async collaboration", "Portfolio of similar work"] }, { h: "Nice to have", items: ["Sector experience", "Fast turnaround", "Own tooling"] }];
  return [{ h: "What you'll do", items: ["Own a product area end to end", "Partner with eng and research", "Ship and measure"] }, { h: "What we look for", items: ["5+ years in product", "A portfolio of shipped work", "Systems thinking"] }];
}
export const APPLY_LABELS: Record<ListingType, string> = { Job: "Apply", Gig: "Submit a proposal", Audition: "Submit a tape", RFP: "Submit a bid" };
export const UPLOAD_LABELS: Record<ListingType, string> = { Job: "Résumé / CV", Gig: "Portfolio link", Audition: "Headshot & tape links", RFP: "Capability statement" };
export const PITCH_LABELS: Record<ListingType, string> = { Job: "Cover note", Gig: "Your approach & fee", Audition: "A note to casting", RFP: "Proposal summary" };

export const TYPE_CARDS: { type: ListingType; label: string; desc: string }[] = [
  { type: "Job", label: "Jobs", desc: "Permanent & full-time roles." },
  { type: "Gig", label: "Gigs", desc: "Freelance & contract briefs." },
  { type: "Audition", label: "Auditions", desc: "Casting calls & performance." },
  { type: "RFP", label: "RFPs", desc: "Tenders & proposals." },
];

export type Candidate = { name: string; role: string; stage: number };
export const ATS_ROLES: { role: string; cands: Candidate[] }[] = [
  { role: "Senior Product Designer", cands: [
    { name: "Maya Okafor", role: "Product", stage: 2 }, { name: "Dev Patel", role: "Product", stage: 1 }, { name: "Lin Wu", role: "Systems", stage: 0 }, { name: "Sara Kim", role: "Product", stage: 3 }, { name: "Tom Rees", role: "Visual", stage: 1 }, { name: "Ada Cole", role: "Product", stage: 4 }, { name: "Nils Berg", role: "Product", stage: 2 },
  ] },
  { role: "Full-Stack Engineer", cands: [
    { name: "Jon Vega", role: "Backend", stage: 1 }, { name: "Priya Rao", role: "Full-stack", stage: 2 }, { name: "Eli Frost", role: "Frontend", stage: 0 }, { name: "Mara Diaz", role: "Full-stack", stage: 3 },
  ] },
];
export const STAGE_NAMES = ["Applied", "Screen", "Interview", "Offer", "Hired"];

export const STATS = [
  { num: "8", label: "Open listings" },
  { num: "12K", label: "Candidates" },
  { num: "4 types", label: "Jobs · gigs · auditions · RFPs" },
  { num: "48h", label: "Median first reply" },
];

export const NAV = [
  { label: "Listings", path: "/career/listings" },
  { label: "Applications", path: "/career/applications" },
  { label: "Post a role", path: "/career/post" },
  { label: "Recruiter", path: "/career/ats" },
];
