export const BANKING = {
  brand: "MERIDIAN PAY",
  heroLine: "Money that moves like the internet.",
  heroSub: "One account for dollars and digital assets — spend, save, send and stake, with rewards on everything.",
};

export const STATS = [
  { num: "12M+", label: "Accounts" },
  { num: "$0", label: "Monthly fee" },
  { num: "4.6%", label: "Savings APY" },
  { num: "40+", label: "Chains supported" },
];

export const FEATURES = [
  { no: "01", title: "Multi-currency accounts", body: "Hold and exchange 30 fiat currencies at the real rate, with local details in each region." },
  { no: "02", title: "Native crypto wallet", body: "Self-custodial by default. Buy, sell and stake from the same balance as your cash." },
  { no: "03", title: "Instant card", body: "A virtual card in seconds, a metal card in the post. Spend crypto or cash, your choice." },
  { no: "04", title: "Rewards on everything", body: "Points and cashback on every tap, redeemable for crypto, travel or statement credit." },
  { no: "05", title: "Send anywhere", body: "Free transfers between members, on-chain settlement worldwide in seconds." },
  { no: "06", title: "Bank-grade security", body: "Biometrics, hardware-key support, and on-chain proofs of reserve." },
];

export const SEGMENTS = [
  { name: "Personal", desc: "Everyday spending, saving and investing in one app.", tab: "personal" },
  { name: "Business", desc: "Multi-user accounts, expense cards and on-chain payroll.", tab: "business" },
  { name: "Premium", desc: "Metal card, lounge access, higher limits and a concierge.", tab: "personal" },
];

export const ACCOUNTS = [
  { name: "Main balance", balance: "$12,480.55", sub: "USD · •••4021", dark: true },
  { name: "Savings · 4.6% APY", balance: "$40,200.00", sub: "Vault", dark: false },
  { name: "Crypto portfolio", balance: "$8,914.20", sub: "+3.2% today", dark: false },
];

export const CRYPTO = [
  { sym: "₿", name: "Bitcoin", amount: "0.142 BTC", change: "+2.4%", up: true, value: "$6,120" },
  { sym: "Ξ", name: "Ethereum", amount: "0.98 ETH", change: "+1.1%", up: true, value: "$2,010" },
  { sym: "S", name: "Solana", amount: "12.4 SOL", change: "−0.8%", up: false, value: "$540" },
  { sym: "$", name: "USDC", amount: "244 USDC", change: "0.0%", up: true, value: "$244" },
];

export const TRANSACTIONS = [
  { merchant: "Atelier Store", cat: "Shopping", date: "Today", amount: "−$68.00", out: true },
  { merchant: "Salary — Northwind", cat: "Income", date: "Yesterday", amount: "+$4,200.00", out: false },
  { merchant: "Staking reward", cat: "Crypto", date: "Yesterday", amount: "+$14.20", out: false },
  { merchant: "The Dispatch", cat: "Subscriptions", date: "2 days ago", amount: "−$9.00", out: true },
  { merchant: "Sent to Maya", cat: "Transfer", date: "3 days ago", amount: "−$50.00", out: true },
  { merchant: "Cashback", cat: "Rewards", date: "4 days ago", amount: "+$3.40", out: false },
];

export const CHAIN_FEATURES = [
  { h: "Self-custody wallet", b: "Export your keys any time; we never hold them alone." },
  { h: "On-chain in seconds", b: "Settle across 40+ chains with fees shown up front." },
  { h: "Staking & yield", b: "Earn on idle assets, auto-compounded daily." },
  { h: "Spend crypto anywhere", b: "The card converts at the point of sale — no manual selling." },
];

export const MARKETS = [
  { sym: "₿", name: "Bitcoin", price: "$43,100", change: "+2.4%", up: true },
  { sym: "Ξ", name: "Ethereum", price: "$2,050", change: "+1.1%", up: true },
  { sym: "S", name: "Solana", price: "$43.60", change: "−0.8%", up: false },
  { sym: "$", name: "USDC", price: "$1.00", change: "0.0%", up: true },
];

export const REWARDS = [
  { name: "$25 statement credit", desc: "Apply points straight to your balance.", cost: 5000 },
  { name: "Convert to Bitcoin", desc: "Turn points into BTC at the live rate.", cost: 8000 },
  { name: "Airport lounge pass", desc: "One-day access at 1,300 lounges.", cost: 12000 },
  { name: "Metal card upgrade", desc: "Skip a month of Premium.", cost: 20000 },
];

export const PERSONAL_PLANS = [
  { key: "std", name: "Standard", tagline: "Free forever", price: "$0", per: "", perks: ["Multi-currency account", "Virtual card", "Crypto wallet", "1× rewards"], featured: false },
  { key: "plus", name: "Plus", tagline: "Most popular", price: "$9", per: "/mo", perks: ["Everything in Standard", "Metal card", "4.6% savings APY", "2× rewards", "No FX fees"], featured: true },
  { key: "metal", name: "Metal", tagline: "Premium", price: "$29", per: "/mo", perks: ["Everything in Plus", "Lounge access", "3× rewards + crypto cashback", "Concierge", "Higher limits"], featured: false },
];
export const BUSINESS_PLANS = [
  { key: "solo", name: "Solo", tagline: "Freelancers", price: "$0", per: "", perks: ["Business account", "Expense card", "On-chain invoices", "Basic analytics"], featured: false },
  { key: "team", name: "Team", tagline: "Most popular", price: "$25", per: "/mo", perks: ["Up to 20 cards", "On-chain payroll", "Approvals & roles", "Accounting sync"], featured: true },
  { key: "scale", name: "Scale", tagline: "For scale", price: "Custom", per: "", perks: ["Unlimited cards", "Treasury & yield", "Dedicated manager", "API & webhooks"], featured: false },
];

export const NAV = [
  { label: "Personal", path: "/banking" },
  { label: "Wallet", path: "/banking/dashboard" },
  { label: "Crypto", path: "/banking/crypto" },
  { label: "Rewards", path: "/banking/rewards" },
  { label: "Plans", path: "/banking/plans" },
];
