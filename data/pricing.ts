// ──────────────────────────────────────────────────────────────
//  EDIT YOUR PRICING DEFAULTS HERE 👇
//
//  Every default dollar amount the Quote Builder starts with lives
//  in this one file. Change a number here and it updates everywhere
//  in the app — nothing is hard-coded in the pages or components.
//
//  ⚠️ These are ESTIMATES for training/quote-planning only and must
//  be verified in official carrier systems before quoting a customer.
// ──────────────────────────────────────────────────────────────

export const PRICING_CONFIG = {
  /** Default device financing length, in months */
  defaultFinancingTerm: 36,

  /** Default per-line autopay discount ($/mo) */
  defaultAutopayDiscount: 10,

  /** Default protection plan cost ($/mo) */
  defaultProtectionMonthly: 17,

  /** Default perks / add-ons cost ($/mo) */
  defaultPerksMonthly: 0,

  /** One-time activation / upgrade fee ($) */
  defaultActivationFee: 35,

  /** Rough monthly taxes & fees estimate ($/mo) */
  defaultTaxesAndFees: 15,
} as const;

/**
 * Protection plan choices shown in the Quote Builder.
 * Add, remove, or re-price these freely.
 */
export const PROTECTION_OPTIONS = [
  { label: "No protection", monthly: 0 },
  { label: "Basic protection", monthly: 9 },
  { label: "Full device protection", monthly: 17 },
] as const;

/**
 * Common perks / add-ons. Edit names and prices as your offers change.
 */
export const PERK_OPTIONS = [
  { label: "None", monthly: 0 },
  { label: "Streaming bundle", monthly: 10 },
  { label: "Cloud storage", monthly: 5 },
  { label: "Hotspot boost", monthly: 10 },
] as const;
