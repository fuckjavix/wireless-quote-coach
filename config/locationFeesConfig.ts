// ──────────────────────────────────────────────────────────────
//  EDIT LOCATION TAX / FEE ESTIMATES HERE 👇
//
//  Taxes and fees are estimated as: (monthly subtotal × taxFeePercent)
//  + flatMonthlyFee. These are ESTIMATES ONLY and are not exact.
//
//  ⚠️ Verify final taxes and fees in official carrier systems.
// ──────────────────────────────────────────────────────────────

export interface LocationFees {
  id: string;
  state: string;
  county: string;
  /** Estimated taxes & fees as a fraction of the pre-tax subtotal (0.13 = 13%). */
  taxFeePercent: number;
  /** Estimated flat monthly telecom/regulatory fees ($/mo), added on top of the %. */
  flatMonthlyFee: number;
  notes: string;
  /** When you last reviewed these numbers (YYYY-MM-DD). */
  lastUpdated: string;
}

export const LOCATION_FEES: LocationFees[] = [
  {
    id: "summit-co",
    state: "Colorado",
    county: "Summit County",
    taxFeePercent: 0.13, // ~13% estimate — Colorado has relatively high wireless taxes/fees
    flatMonthlyFee: 3.0, // estimated flat 911 / regulatory fees per account
    notes:
      "Summit County, CO estimated taxes and fees. Estimate only — verify final taxes and fees in official carrier systems.",
    lastUpdated: "2026-06-07",
  },
];

export const DEFAULT_LOCATION_ID = "summit-co";

export const TAXES_DISCLAIMER =
  "Summit County, CO estimated taxes and fees. Verify final taxes and fees in official carrier systems.";

export function getLocation(id: string): LocationFees | undefined {
  return LOCATION_FEES.find((l) => l.id === id);
}
