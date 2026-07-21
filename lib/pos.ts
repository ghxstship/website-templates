export const POS = {
  brand: "LEDGER",
  heroLine: "Every checkout, one layer",
  tagline: "The universal POS & checkout",
};

export function fmt(n: number): string {
  return "$" + (Math.round(n * 100) / 100).toFixed(2);
}

export type CartItem = { vid: string; vendor: string; type: string; name: string; price: number; qty: number };
export const SEED_CART: CartItem[] = [
  { vid: "trattoria", vendor: "Trattoria Vesuvio", type: "Restaurant", name: "Margherita Pizza", price: 16, qty: 1 },
  { vid: "trattoria", vendor: "Trattoria Vesuvio", type: "Restaurant", name: "Tiramisù", price: 9, qty: 1 },
  { vid: "store", vendor: "MERIDIAN Store", type: "Retail", name: "Tour Tee", price: 35, qty: 2 },
  { vid: "armory", vendor: "The Armory Bar", type: "Venue bar", name: "Craft Lager", price: 8, qty: 2 },
];

export const STATS = [
  { num: "6+", label: "Storefront types" }, { num: "1", label: "Unified basket" },
  { num: "12", label: "Payment methods" }, { num: "PCI", label: "DSS-ready flow" },
];

export const STOREFRONTS = [
  { name: "MERIDIAN Store", type: "Retail", sample: "Tour Tee", price: 35, vid: "store" },
  { name: "Trattoria Vesuvio", type: "Restaurant", sample: "Margherita Pizza", price: 16, vid: "trattoria" },
  { name: "The Armory Bar", type: "Venue bar", sample: "Craft Lager", price: 8, vid: "armory" },
  { name: "Waypoint Travel", type: "Travel", sample: "Airport transfer", price: 60, vid: "waypoint" },
  { name: "Meridian Charter", type: "Charter", sample: "Heli transfer (1 hr)", price: 3900, vid: "charter" },
  { name: "Ticketing Co", type: "Tickets", sample: "GA ticket", price: 42, vid: "tickets" },
];

export const DELIVERY_TYPES = ["Restaurant", "Venue bar"];
export const TIP_PRESETS = [0, 15, 18, 20];
export const PAY_DEFS: [string, string][] = [["card", "Card"], ["wallet", "Apple / Google Pay"], ["bnpl", "Pay in 4"], ["crypto", "Crypto"]];

export const REG_MENU = [
  { cat: "Coffee", name: "Espresso", price: 3 }, { cat: "Coffee", name: "Cappuccino", price: 4.5 }, { cat: "Coffee", name: "Flat White", price: 4.5 }, { cat: "Coffee", name: "Cold Brew", price: 5 },
  { cat: "Food", name: "Croissant", price: 3.5 }, { cat: "Food", name: "Avocado Toast", price: 9 }, { cat: "Food", name: "Granola Bowl", price: 8 }, { cat: "Food", name: "BLT", price: 7.5 },
  { cat: "Retail", name: "House Beans 250g", price: 14 }, { cat: "Retail", name: "Ceramic Mug", price: 18 }, { cat: "Retail", name: "Tote Bag", price: 12 },
  { cat: "Drinks", name: "Still Water", price: 2.5 }, { cat: "Drinks", name: "Kombucha", price: 5 }, { cat: "Drinks", name: "Orange Juice", price: 4 },
];
export const REG_CATS = ["Coffee", "Food", "Drinks", "Retail"];
export const TENDER_OPTS = [
  { label: "Card", note: "Tap, chip or swipe" }, { label: "Cash", note: "Open drawer" }, { label: "Split", note: "Multiple tenders" },
];

export const METHOD_CARDS = [
  { name: "Cards", note: "Visa · MC · Amex · debit" }, { name: "Wallets", note: "Apple Pay · Google Pay" },
  { name: "BNPL", note: "Pay in 4 · financing" }, { name: "Crypto", note: "BTC · ETH · stablecoins" },
  { name: "Bank / ACH", note: "Direct debit · transfer" }, { name: "Cash", note: "In-person drawer" },
];
export const DOC_STEPS = [
  { n: "1", title: "Add items", body: "Any storefront calls checkout.add() with a vendor, type, name and price — as many stores as you like." },
  { n: "2", title: "One basket", body: "Items group by vendor with per-store fulfillment; the shopper reviews a single unified cart." },
  { n: "3", title: "Settle", body: "One payment clears; each vendor receives its own order and payout — the marketplace model." },
];

export const NAV = [
  { label: "Cart", path: "/pos/cart" },
  { label: "Register", path: "/pos/register" },
  { label: "Payments", path: "/pos/payments" },
  { label: "Integrate", path: "/pos/docs" },
];
