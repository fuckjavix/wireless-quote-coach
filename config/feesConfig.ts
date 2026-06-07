// ──────────────────────────────────────────────────────────────
//  EDIT FIXED FEES & FORM DEFAULTS HERE 👇
//
//  Setup and activation fees are LOCKED in the Quote Builder (shown as
//  fixed items, not editable in the form). Change them here.
//
//  ⚠️ Fees are estimates and may vary based on official carrier systems.
// ──────────────────────────────────────────────────────────────

export const FEES_CONFIG = {
  /** One-time setup fee, due today ($). */
  setupFee: 30,
  /** One-time activation fee, due today ($). */
  activationFee: 40,

  /** Default device financing length (months). */
  defaultFinancingTerm: 36,
  /** Default protection plan cost ($/mo). */
  defaultProtectionMonthly: 17,
  /** Default perks / add-ons cost ($/mo). */
  defaultPerksMonthly: 0,

  /** Default autopay discount per line ($/mo) for Custom plans. */
  defaultAutopayDiscount: 10,
  /** Default per-line price for a Custom plan ($/mo). */
  defaultCustomPricePerLine: 0,
} as const;

export const FEES_DISCLAIMER =
  "Fees are estimates and may vary based on official carrier systems.";
