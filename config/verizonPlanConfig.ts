// ──────────────────────────────────────────────────────────────
//  EDIT VERIZON myPlan-STYLE PRICING HERE 👇
//
//  These are PLACEHOLDER / ESTIMATED per-line monthly prices (before
//  the autopay discount), organized by how many lines the customer has.
//  The key "5" means "5 or more lines".
//
//  ⚠️ Estimates for training/quote-planning only. Plan pricing must be
//  verified in official carrier systems before quoting a customer.
//  Nothing here is hard-coded in the app — change a number and it
//  updates everywhere.
// ──────────────────────────────────────────────────────────────

export type LineCount = 1 | 2 | 3 | 4 | 5;

export interface VerizonPlan {
  id: string;
  name: string;
  /** Per-line monthly price by number of lines. Key 5 = "5+ lines". */
  pricePerLineByLines: Record<LineCount, number>;
  /** Per-line autopay + paper-free billing discount ($/mo). */
  autopayDiscountPerLine: number;
  bestFor: string;
  features: string[];
  hotspot: string;
  notes: string;
  tradeInPromo?: string;
}

export const PLAN_PRICING_DISCLAIMER =
  "Plan pricing is an estimate and must be verified in official carrier systems.";

export const VERIZON_PLANS: VerizonPlan[] = [
  {
    id: "welcome",
    name: "Unlimited Welcome",
    pricePerLineByLines: { 1: 65, 2: 55, 3: 40, 4: 30, 5: 27 },
    autopayDiscountPerLine: 10,
    bestFor: "Budget-minded customers who want unlimited basics.",
    features: [
      "Unlimited talk, text & data",
      "5G access included",
      "Data may slow during network congestion",
    ],
    hotspot: "No premium mobile hotspot data included.",
    notes: "Lowest-cost unlimited option. No premium perks included.",
    tradeInPromo: "Standard trade-in credits may apply — verify current promo.",
  },
  {
    id: "plus",
    name: "Unlimited Plus",
    pricePerLineByLines: { 1: 80, 2: 70, 3: 55, 4: 45, 5: 42 },
    autopayDiscountPerLine: 10,
    bestFor: "Customers who want faster premium data and hotspot.",
    features: [
      "Premium (high-priority) unlimited data",
      "Nationwide 5G Ultra Wideband where available",
      "Add perks like streaming or cloud for an extra cost",
    ],
    hotspot: "30 GB premium mobile hotspot per line.",
    notes: "Most popular middle tier. Good balance of speed and price.",
    tradeInPromo: "Often eligible for a higher trade-in promo on select phones — verify.",
  },
  {
    id: "ultimate",
    name: "Unlimited Ultimate",
    pricePerLineByLines: { 1: 90, 2: 80, 3: 65, 4: 55, 5: 52 },
    autopayDiscountPerLine: 10,
    bestFor: "Power users who want maximum data, hotspot, and travel perks.",
    features: [
      "Maximum premium unlimited data",
      "International talk, text & data perks",
      "Add perks like streaming or cloud for an extra cost",
    ],
    hotspot: "60 GB premium mobile hotspot per line.",
    notes: "Top tier — lead with total value, not just the monthly price.",
    tradeInPromo: "Best trade-in promos usually require this tier — verify current offer.",
  },
];

export function getVerizonPlan(id: string): VerizonPlan | undefined {
  return VERIZON_PLANS.find((p) => p.id === id);
}

/** Resolve the per-line price for a plan at a given line count (clamps to 5+). */
export function pricePerLineFor(plan: VerizonPlan, numLines: number): number {
  const tier = Math.min(Math.max(Math.floor(numLines) || 1, 1), 5) as LineCount;
  return plan.pricePerLineByLines[tier];
}
