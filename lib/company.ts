export const COMPANY = {
  name: "MERIDIAN",
  category: "Operations intelligence platform",
  headline: "Run the whole operation from one clear surface.",
  subhead:
    "Meridian unifies your data, workflows and reporting so teams stop stitching tools together and start making decisions.",
};

export const CLIENTS = ["Northwind", "Halcyon", "Vela", "Ironwood", "Basalt", "Meltwater"];

export const STATS = [
  { num: "4,200+", label: "Teams onboarded" },
  { num: "99.98%", label: "Uptime SLA" },
  { num: "38%", label: "Avg. time saved" },
  { num: "11", label: "Global regions" },
];

export const FEATURES = [
  { no: "01", title: "One source of truth", body: "Connect every system you already run — Meridian reconciles it into a single model your whole company can query in plain language." },
  { no: "02", title: "Workflows that adapt", body: "Build automations without code, branch on real conditions, and hand off to a human the moment judgement is needed." },
  { no: "03", title: "Reporting on tap", body: "Board-ready dashboards that refresh themselves, plus alerts that reach the right person before a number becomes a problem." },
];

export const HERO_QUOTE = { quote: "Meridian replaced five tools and a spreadsheet. Our close went from nine days to two.", name: "Dana Okafor", role: "COO, Northwind" };

export const PRODUCTS = [
  { mark: "C", name: "Core", body: "The unified data layer — connectors, modelling and a query surface the whole team shares.", detail: "Core ingests from every system you run, reconciles it into one governed model, and exposes it through a query surface anyone can use — in SQL or plain language. Row-level permissions, full lineage and point-in-time history come standard, so the number on the dashboard is always one you can defend." },
  { mark: "F", name: "Flow", body: "No-code automation and approvals that run across every connected system.", detail: "Flow turns the model into action: trigger on any condition, branch on real data, call external systems, and route to a human the moment judgement is needed. Every run is logged and replayable, and approvals carry the full context of why they fired." },
  { mark: "S", name: "Signal", body: "Live dashboards, anomaly alerts and scheduled reports for every stakeholder.", detail: "Signal watches the model and tells the right person before a number becomes a problem. Board-ready dashboards refresh themselves, anomaly detection learns your baseline, and scheduled reports land in the inbox and the channel your team already lives in." },
  { mark: "A", name: "API", body: "Everything Meridian does, available as a documented, versioned API for your own builds.", detail: "Everything the platform can do is available as a documented, versioned REST and GraphQL API, with SDKs, webhooks and a sandbox. Build Meridian into your own product, or wire it into the tools your engineers already ship with." },
];

export const SERVICES = [
  { no: "01", title: "Implementation", tag: "2–6 weeks", body: "A dedicated solutions engineer maps your systems, migrates your data and ships your first workflows in weeks, not quarters." },
  { no: "02", title: "Managed operations", tag: "Ongoing", body: "Let our team run and tune your Meridian instance while yours focuses on the work it actually supports." },
  { no: "03", title: "Training & enablement", tag: "Per cohort", body: "Role-based training that gets analysts, operators and executives fluent — with certification and office hours." },
  { no: "04", title: "Custom builds", tag: "Scoped", body: "Bespoke connectors, models and integrations built by the same engineers who build the platform." },
];

export const WORK = [
  { sector: "Logistics", title: "How Ironwood cut fulfilment errors by half", body: "Consolidating three warehouse systems into Meridian gave Ironwood a live picture of stock and a workflow that catches mispicks before they ship.", metrics: [{ num: "−51%", label: "Error rate" }, { num: "2.3x", label: "Throughput" }] },
  { sector: "Fintech", title: "Vela closes the books in two days", body: "Automated reconciliation and board-ready reporting turned a nine-day month-end into a two-day one — with a full audit trail.", metrics: [{ num: "9→2", label: "Days to close" }, { num: "100%", label: "Auditable" }] },
  { sector: "Healthcare", title: "Basalt scales compliance without headcount", body: "Policy-aware workflows and alerting let Basalt triple its caseload while staying inside every regulatory window.", metrics: [{ num: "3x", label: "Caseload" }, { num: "0", label: "Missed SLAs" }] },
];

export type Plan = { name: string; tagline: string; monthly: string; annual: string; per: boolean; perks: string[]; cta: string; featured: boolean };
export const PLANS: Plan[] = [
  { name: "Team", tagline: "For growing teams", monthly: "$29", annual: "$24", per: true, perks: ["Up to 25 seats", "Core + Signal", "10 connectors", "Email support"], cta: "Start free trial", featured: false },
  { name: "Business", tagline: "Most popular", monthly: "$69", annual: "$59", per: true, perks: ["Up to 250 seats", "Core + Flow + Signal", "Unlimited connectors", "Priority support", "SSO & audit log"], cta: "Book a demo", featured: true },
  { name: "Enterprise", tagline: "For scale", monthly: "Custom", annual: "Custom", per: false, perks: ["Unlimited seats", "All products + API", "Managed operations", "Dedicated engineer", "Custom SLA & DPA"], cta: "Contact sales", featured: false },
];

export const FAQS = [
  { q: "How long does implementation take?", a: "Most teams are live in two to six weeks. A dedicated solutions engineer handles data migration and your first workflows; you are never left to figure it out alone." },
  { q: "Can Meridian connect to our existing tools?", a: "Yes — there are pre-built connectors for the common stack, and the API plus custom-build service covers anything bespoke. Your data stays yours." },
  { q: "Is our data secure?", a: "Meridian is SOC 2 Type II certified, encrypts data in transit and at rest, and offers SSO, granular roles and a full audit log on Business and above." },
  { q: "What does support look like?", a: "Email support on Team, priority support on Business, and a named engineer with a custom SLA on Enterprise. Managed operations is available as a service." },
];

export const ABOUT = {
  lead: "MERIDIAN exists because running a company should not require ten disconnected tools and a heroic spreadsheet.",
  p1: "We started in 2019 after watching operations teams drown in manual reconciliation. The idea was simple: one clear surface where the data, the workflow and the report all agree. Everything we have built since answers to that.",
  p2: "Today a distributed team of 140 serves customers in eleven regions, and we are still shipping toward the same goal — fewer tools, clearer decisions, and software that gets out of the way of the work.",
};
export const FACTS = [{ v: "2019", k: "Founded" }, { v: "140", k: "People" }, { v: "11", k: "Regions" }, { v: "Series C", k: "Funding" }];
export const OFFICES = [
  { role: "Sales", name: "Talk to sales", email: "sales@meridian.com" },
  { role: "Support", name: "Customer support", email: "help@meridian.com" },
  { role: "Press", name: "Media enquiries", email: "press@meridian.com" },
];

export const NAV = [
  { label: "Products", path: "/company/products" },
  { label: "Services", path: "/company/services" },
  { label: "Work", path: "/company/work" },
  { label: "Pricing", path: "/company/pricing" },
  { label: "About", path: "/company/about" },
  { label: "Contact", path: "/company/contact" },
];
