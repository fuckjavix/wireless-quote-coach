export interface Quote {
  id: string;
  createdAt: string;
  customerName: string;
  numLines: number;
  currentCarrier: string;
  customerType: "new" | "existing";
  deviceBrand: string;
  deviceModel: string;
  deviceRetailPrice: number;
  tradeInValue: number;
  downPayment: number;
  financingTerm: number;
  /** "welcome" | "plus" | "ultimate" | "custom" | "" (none selected yet) */
  planId: string;
  planName: string;
  /** Used for Custom plans. Preset plans derive price from line count. */
  planPricePerLine: number;
  /** Per-line autopay discount ($/mo). */
  autopayDiscount: number;
  protectionMonthly: number;
  perksMonthly: number;
  /** Location preset id for tax/fee estimates, e.g. "summit-co". */
  locationId: string;
}

export interface QuoteCalculation {
  perLinePrice: number;
  monthlyServiceCost: number;
  monthlyDevicePayment: number;
  monthlyAutopayDiscount: number;
  monthlySubtotalBeforeTaxes: number;
  taxesAndFees: number;
  estimatedMonthlyTotal: number;
  setupFee: number;
  activationFee: number;
  dueTodayEstimate: number;
}

export interface Objection {
  id: string;
  label: string;
  customerLine: string;
  responses: Array<{
    repResponse: string;
    followUp: string;
    close: string;
  }>;
}

export interface DrillResponse {
  id: string;
  createdAt: string;
  scenario: string;
  objection: string;
  goal: string;
  repResponse: string;
}

export interface PlanExplainerInput {
  planName: string;
  monthlyPrice: number;
  features: string;
  bestFor: string;
}
