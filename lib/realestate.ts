export const REALESTATE = {
  brand: "MERIDIAN & CO",
  region: "London",
  heroLine: "Find your next address.",
};

export type Listing = {
  slug: string; title: string; area: string; num: number; deal: "For sale" | "To rent";
  beds: number; baths: number; sqm: number; type: "House" | "Apartment"; agent: string;
  desc: string; features: string[];
};

export const LISTINGS: Listing[] = [
  { slug: "foundry-loft", title: "The Foundry Loft", area: "Shoreditch, E1", num: 1250000, deal: "For sale", beds: 2, baths: 2, sqm: 96, type: "Apartment", agent: "Maren Cole", desc: "A double-height warehouse conversion with original cast-iron columns, a mezzanine study and a west-facing terrace.", features: ["Terrace", "Concierge", "Parking", "Lift"] },
  { slug: "ironmonger-house", title: "Ironmonger House", area: "Clerkenwell, EC1", num: 3400000, deal: "For sale", beds: 4, baths: 3, sqm: 220, type: "House", agent: "Jonas Ek", desc: "A restored Georgian townhouse over five floors with a landscaped garden and a self-contained lower apartment.", features: ["Garden", "Cellar", "Period", "Freehold"] },
  { slug: "harbour-view-12", title: "Harbour View 12", area: "Wapping, E1W", num: 4200, deal: "To rent", beds: 2, baths: 2, sqm: 88, type: "Apartment", agent: "Priya Rao", desc: "A bright riverside apartment with a balcony over the Thames, 24-hour porter and residents’ gym.", features: ["River view", "Balcony", "Gym", "Furnished"] },
  { slug: "the-old-press", title: "The Old Press", area: "Bermondsey, SE1", num: 895000, deal: "For sale", beds: 1, baths: 1, sqm: 64, type: "Apartment", agent: "Maren Cole", desc: "A characterful one-bed in a former print works, exposed brick throughout and a communal courtyard.", features: ["Courtyard", "Exposed brick", "Bike store"] },
  { slug: "ropewalk-mews", title: "Ropewalk Mews", area: "Rotherhithe, SE16", num: 5800, deal: "To rent", beds: 3, baths: 2, sqm: 120, type: "House", agent: "Jonas Ek", desc: "A modern mews house with an integral garage, roof terrace and open-plan living.", features: ["Garage", "Roof terrace", "Unfurnished"] },
  { slug: "steelyard-penthouse", title: "Steelyard Penthouse", area: "City, EC4", num: 6750000, deal: "For sale", beds: 3, baths: 3, sqm: 260, type: "Apartment", agent: "Priya Rao", desc: "A landmark penthouse with 360-degree views, private lift access and a wraparound terrace.", features: ["Private lift", "Terrace", "Views", "Parking"] },
];

export function fmtPrice(l: Listing): string {
  return l.deal === "To rent" ? `£${l.num.toLocaleString()} pcm` : `£${l.num.toLocaleString()}`;
}
export function specLine(l: Listing): string {
  return `${l.beds} bed · ${l.baths} bath · ${l.sqm} m²`;
}
export function listingBySlug(slug: string): Listing | undefined {
  return LISTINGS.find((l) => l.slug === slug);
}

export const STATS = [
  { num: "1,200+", label: "Homes listed" }, { num: "38", label: "Days to sell" },
  { num: "£2.1B", label: "Sold in 2025" }, { num: "1996", label: "Established" },
];
export const SELL_STEPS = [
  { no: "01", title: "Book a valuation", body: "Tell us about the property; we’ll visit within 48 hours." },
  { no: "02", title: "We list & market", body: "Photography, floor plans and a launch across every channel." },
  { no: "03", title: "We handle offers", body: "Vetted viewings, negotiation and the paperwork to completion." },
];
export const AGENTS = [
  { name: "Maren Cole", role: "Director, sales", bio: "Twenty years across east London’s conversion market." },
  { name: "Jonas Ek", role: "Head of lettings", bio: "Riverside and new-build specialist." },
  { name: "Priya Rao", role: "Prime & penthouse", bio: "Discreet sales of the city’s landmark homes." },
];
export const SOCIALS = ["Instagram", "LinkedIn", "Newsletter"];

export const NAV = [
  { label: "Buy & rent", path: "/realestate/buy" },
  { label: "Saved", path: "/realestate/saved" },
  { label: "Sell", path: "/realestate/sell" },
  { label: "Agents", path: "/realestate/agents" },
];
