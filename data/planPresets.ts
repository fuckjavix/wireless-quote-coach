import { PRICING_CONFIG } from "./pricing";

// ──────────────────────────────────────────────────────────────
//  EDIT YOUR PLANS HERE 👇
//
//  These plan presets power the "Quick-fill plan" dropdown in the
//  Quote Builder and the Plan Explainer. Add, remove, rename, or
//  re-price them anytime — everything reads from this one list.
//
//  ⚠️ PLACEHOLDER PRICING for training/demo only. Plan pricing is an
//  estimate and must be verified in official carrier systems. Do not
//  present these as official prices until you have verified them.
// ──────────────────────────────────────────────────────────────

export const PLAN_PRICING_DISCLAIMER =
  "Plan pricing is an estimate and must be verified in official carrier systems.";

export interface PlanPreset {
  id: string;
  name: string;
  pricePerLine: number;
  autopayDiscount: number;
  bestFor: string;
  features: string[];
  notes: string;
}

export const PLAN_PRESETS: PlanPreset[] = [
  {
    id: "essentials",
    name: "Essentials",
    pricePerLine: 65,
    autopayDiscount: PRICING_CONFIG.defaultAutopayDiscount,
    bestFor: "Budget-minded customers who mostly call, text, and browse.",
    features: [
      "Unlimited talk & text",
      "Unlimited data (may slow during congestion)",
      "5G access included",
    ],
    notes: "Great entry point. No premium streaming perks included.",
  },
  {
    id: "plus",
    name: "Plus",
    pricePerLine: 80,
    autopayDiscount: PRICING_CONFIG.defaultAutopayDiscount,
    bestFor: "Everyday users who want faster data and some hotspot.",
    features: [
      "Premium unlimited data",
      "Mobile hotspot allotment",
      "HD streaming",
    ],
    notes: "Most popular middle tier. Good balance of price and speed.",
  },
  {
    id: "premium",
    name: "Premium",
    pricePerLine: 90,
    autopayDiscount: PRICING_CONFIG.defaultAutopayDiscount,
    bestFor: "Heavy users who stream, travel, and use lots of hotspot.",
    features: [
      "Top-priority premium data",
      "Larger mobile hotspot allotment",
      "4K / higher-quality streaming",
      "Basic international perks",
    ],
    notes: "Best for power users. Pairs well with a streaming perk.",
  },
  {
    id: "pro",
    name: "Pro",
    pricePerLine: 100,
    autopayDiscount: PRICING_CONFIG.defaultAutopayDiscount,
    bestFor: "Customers who want the most data, perks, and travel coverage.",
    features: [
      "Maximum premium data",
      "Largest hotspot allotment",
      "Premium streaming included",
      "Expanded international coverage",
    ],
    notes: "Top tier. Lead with total value, not just the monthly price.",
  },
];

/** Look up a single preset by id (returns undefined if not found). */
export function getPlanPreset(id: string): PlanPreset | undefined {
  return PLAN_PRESETS.find((p) => p.id === id);
}
