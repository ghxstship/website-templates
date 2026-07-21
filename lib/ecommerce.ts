import { cache } from "react";
import { getSupabaseServer } from "./supabase/server";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price_cents: number;
  is_new: boolean;
  description: string;
  specs: [string, string][];
  sort_order: number;
};

const FALLBACK_PRODUCTS: Product[] = [
  { id: "1", slug: "waxed-canvas-tote", name: "Waxed Canvas Tote", category: "Accessories", price_cents: 6800, is_new: true, description: "A structured everyday tote in waxed organic canvas with a leather base and a magnetic closure.", specs: [["Material", "Waxed organic canvas"], ["Dimensions", "38 × 34 × 12 cm"], ["Made in", "Portugal"]], sort_order: 0 },
  { id: "2", slug: "merino-crew-knit", name: "Merino Crew Knit", category: "Apparel", price_cents: 12000, is_new: true, description: "A mid-weight crew in extra-fine merino, fully fashioned so the seams follow the body.", specs: [["Material", "100% extra-fine merino"], ["Fit", "Regular"], ["Care", "Machine wash cold"]], sort_order: 1 },
  { id: "3", slug: "derby-boot", name: "Derby Boot", category: "Footwear", price_cents: 24500, is_new: false, description: "A Goodyear-welted derby boot on a natural rubber sole.", specs: [["Material", "Full-grain leather"], ["Sole", "Natural rubber"], ["Construction", "Goodyear welt"]], sort_order: 2 },
  { id: "4", slug: "selvedge-denim", name: "Selvedge Denim", category: "Apparel", price_cents: 15500, is_new: false, description: "A 14oz selvedge denim cut with a straight leg, sanforized so it barely shrinks.", specs: [["Weight", "14oz selvedge"], ["Fit", "Straight"], ["Made in", "Japan"]], sort_order: 3 },
  { id: "5", slug: "field-watch", name: "Field Watch", category: "Accessories", price_cents: 32000, is_new: false, description: "A 38mm field watch with a Swiss automatic movement, sapphire crystal and a sailcloth strap.", specs: [["Case", "38mm steel"], ["Movement", "Swiss automatic"], ["Water", "100m"]], sort_order: 4 },
  { id: "6", slug: "linen-camp-shirt", name: "Linen Camp Shirt", category: "Apparel", price_cents: 9500, is_new: true, description: "A relaxed camp-collar shirt in heavyweight European linen.", specs: [["Material", "Heavyweight linen"], ["Fit", "Relaxed"], ["Care", "Machine wash cold"]], sort_order: 5 },
  { id: "7", slug: "ceramic-mug-set", name: "Ceramic Mug Set", category: "Home", price_cents: 4400, is_new: false, description: "A set of four wheel-thrown stoneware mugs in a reactive glaze.", specs: [["Material", "Stoneware"], ["Set", "Four mugs"], ["Safe", "Dishwasher & microwave"]], sort_order: 6 },
  { id: "8", slug: "wool-throw", name: "Wool Throw", category: "Home", price_cents: 14000, is_new: false, description: "A lambswool throw woven on a heritage loom, finished with a hand-knotted fringe.", specs: [["Material", "Lambswool"], ["Dimensions", "130 × 190 cm"], ["Made in", "Scotland"]], sort_order: 7 },
  { id: "9", slug: "leather-card-holder", name: "Leather Card Holder", category: "Accessories", price_cents: 5500, is_new: false, description: "A slim vegetable-tanned card holder that patinas beautifully.", specs: [["Material", "Veg-tan leather"], ["Slots", "Four + center"], ["Made in", "Italy"]], sort_order: 8 },
  { id: "10", slug: "chore-jacket", name: "Chore Jacket", category: "Apparel", price_cents: 17500, is_new: true, description: "A classic French chore jacket in garment-dyed cotton twill with three patch pockets.", specs: [["Material", "Cotton twill"], ["Fit", "Boxy"], ["Pockets", "Three patch"]], sort_order: 9 },
  { id: "11", slug: "trail-cap", name: "Trail Cap", category: "Accessories", price_cents: 3800, is_new: false, description: "A six-panel cap in washed ripstop with a soft brim and a brass adjuster.", specs: [["Material", "Washed ripstop"], ["Panels", "Six"], ["Adjuster", "Brass"]], sort_order: 10 },
  { id: "12", slug: "table-lamp", name: "Table Lamp", category: "Home", price_cents: 21000, is_new: true, description: "A spun-aluminum table lamp with a dimmable warm LED and a fabric cord.", specs: [["Material", "Spun aluminum"], ["Bulb", "Dimmable LED"], ["Made in", "Denmark"]], sort_order: 11 },
];

export const getProducts = cache(async function getProducts(): Promise<Product[]> {
  try {
    const sb = getSupabaseServer();
    const { data, error } = await sb.from("ecom_products").select("*").order("sort_order");
    if (error || !data || data.length === 0) throw error || new Error("empty");
    return data as Product[];
  } catch (err) {
    console.error("[getProducts] fallback:", err);
    return FALLBACK_PRODUCTS;
  }
});

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export type Drop = {
  id: string;
  name: string;
  /** Opening bid, in whole dollars. */
  base: number;
  ends: string;
  bidders: number;
};

/** Live-auction lots, ported from the v4 "Drops" screen. Bids raise in $20 increments. */
export const DROPS: Drop[] = [
  { id: "d1", name: "Prototype No. 1 — signed", base: 420, ends: "Ends in 02:14:08", bidders: 34 },
  { id: "d2", name: "Archive Jacket (1 of 12)", base: 260, ends: "Ends in 05:41:22", bidders: 21 },
  { id: "d3", name: "Hand-thrown vase set", base: 140, ends: "Ends in 09:03:55", bidders: 12 },
];

/** Auction bid increment, in whole dollars. */
export const BID_STEP = 20;

export const ECOM = {
  name: "ATELIER",
  heroLine: "Built to outlast the season.",
  heroSub:
    "Considered essentials in natural materials — made in small runs, priced without the markup.",
};

export const CATEGORIES = ["all", "Apparel", "Footwear", "Accessories", "Home"];

export function sizesFor(category: string): string[] {
  switch (category) {
    case "Apparel":
      return ["XS", "S", "M", "L", "XL"];
    case "Footwear":
      return ["40", "41", "42", "43", "44"];
    default:
      return ["One size"];
  }
}

/** cents → "$68" (drops .00 for whole dollars, as the design shows). */
export function money(cents: number): string {
  const d = cents / 100;
  return "$" + (Number.isInteger(d) ? d.toString() : d.toFixed(2));
}
