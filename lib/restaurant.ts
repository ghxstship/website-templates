export const RESTAURANT = {
  name: "MERIDIEN",
  accolade: "Two Michelin stars",
  city: "Copenhagen",
  tagline: "A tasting menu of the northern coast — foraged, fermented and fished within a day of the table.",
  address: "3 Havnegade, 1058 Copenhagen",
  blurb: "There is no à la carte in the dining room. Each evening is a single narrative of twelve to sixteen courses that follows the tide and the season — what the boats brought in, what the cellar is ready to open.",
};

export const STATS = [
  { num: "2★", label: "Michelin stars" },
  { num: "16", label: "Courses" },
  { num: "28", label: "Seats" },
  { num: "2011", label: "Est." },
];

export type MenuCourse = { name: string; desc: string; price?: string };
export type MenuTab = { label: string; title: string; price: string; note: string; courses: MenuCourse[] };
export const MENUS: MenuTab[] = [
  { label: "Tasting", title: "The Tasting Menu", price: "$310", note: "Sixteen courses · wine pairing $190 · served to the whole table", courses: [
    { name: "Oyster, elderflower, dill", desc: "Our first bite — a Limfjord oyster under a frozen elderflower veil." },
    { name: "Langoustine, fermented white asparagus", desc: "Raw langoustine, a broth of last spring's asparagus." },
    { name: "Bread & whey butter", desc: "Sourdough baked to order, cultured butter, toasted grains." },
    { name: "Turbot, green strawberry, verbena", desc: "Aged five days on the bone, grilled over embers." },
    { name: "Wild duck, cherry, beetroot", desc: "Dry-aged three weeks, the leg in a tart of its own liver." },
    { name: "Sheep's milk, honey, bee pollen", desc: "The transition — the dairy softens into the sweet." },
    { name: "Sea buckthorn, birch, browned butter", desc: "The signature dessert since the first year." },
  ] },
  { label: "Wine pairing", title: "The Pairing", price: "$190", note: "Seven glasses · low-intervention & biodynamic · non-alcoholic pairing $110", courses: [
    { name: "Grower Champagne", desc: "To begin — chalk and tension." },
    { name: "Skin-contact Riesling", desc: "For the langoustine." },
    { name: "Jura Savagnin", desc: "For the turbot and the whey." },
    { name: "Old-vine Blaufränkisch", desc: "For the duck." },
    { name: "Fortified sea buckthorn", desc: "For the dessert, made in-house." },
  ] },
  { label: "Provisions", title: "Provisions (to order)", price: "From $14", note: "A shorter à la carte for collection & local delivery — order it online", courses: [
    { name: "Sourdough loaf & cultured butter", desc: "Baked each morning.", price: "$14" },
    { name: "Smoked mackerel, rye, pickles", desc: "A jar to take home.", price: "$22" },
    { name: "Duck liver parfait", desc: "With cherry gel and toasted brioche.", price: "$28" },
    { name: "Sea buckthorn tart", desc: "The dining-room dessert, boxed for two.", price: "$24" },
  ] },
];

export type OrderItem = { name: string; desc: string; price_num: number };
export type OrderSection = { title: string; items: OrderItem[] };
export const ORDER_SECTIONS: OrderSection[] = [
  { title: "Larder", items: [
    { name: "Sourdough loaf & cultured butter", desc: "Baked each morning.", price_num: 14 },
    { name: "Smoked mackerel, rye, pickles", desc: "A jar to take home.", price_num: 22 },
    { name: "House charcuterie board", desc: "Cured in-house, serves two.", price_num: 34 },
  ] },
  { title: "To finish at home", items: [
    { name: "Duck liver parfait", desc: "Cherry gel, toasted brioche.", price_num: 28 },
    { name: "Turbot, green strawberry (chilled)", desc: "Reheat gently; serves two.", price_num: 46 },
    { name: "Cheese selection", desc: "Five Nordic cheeses, quince.", price_num: 32 },
  ] },
  { title: "Sweet", items: [
    { name: "Sea buckthorn tart", desc: "The dining-room dessert, boxed for two.", price_num: 24 },
    { name: "Birch-sap caramels (box of 12)", desc: "Made in the pastry kitchen.", price_num: 16 },
  ] },
];

export const ABOUT = {
  lead: "Chef Ingrid Sø opened MERIDIEN to cook the coast she grew up on.",
  p1: "After a decade in the kitchens of Paris and San Sebastián, she came home to a harbourside room with twenty-eight seats and a simple rule: nothing on the plate travels further than the boats and the farms an hour from the door.",
  p2: "The second star came in 2019. The room has not grown since — the menu changes daily, the team cooks what the day gives them, and every guest is served the same story from the same open pass.",
};
export const PRESS = [
  { quote: "The most quietly radical table in Scandinavia.", source: "Le Monde" },
  { quote: "A menu that tastes of a specific place on a specific day.", source: "The World's 50 Best" },
  { quote: "Worth the flight.", source: "The New York Times" },
];
export const VISIT = [
  { title: "Address", body: "3 Havnegade, 1058 Copenhagen. The entrance is the unmarked black door on the water side." },
  { title: "Getting here", body: "A ten-minute walk from Kongens Nytorv Metro. We do not have parking; taxis can pull up on Havnegade." },
  { title: "The evening", body: "Dinner is a single seating at 6:30pm and runs around three hours. Please arrive within fifteen minutes of your booking." },
  { title: "Good to know", body: "We cater to most dietary needs with notice. The room is step-free. Children over twelve are welcome." },
];

export const NAV = [
  { label: "Menus", path: "/restaurant/menus" },
  { label: "Order", path: "/restaurant/order" },
  { label: "The chef", path: "/restaurant/about" },
  { label: "Visit", path: "/restaurant/visit" },
  { label: "Reserve", path: "/restaurant/reserve" },
];
