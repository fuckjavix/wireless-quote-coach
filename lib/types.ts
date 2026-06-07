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
  planName: string;
  planPricePerLine: number;
  autopayDiscount: number;
  protectionMonthly: number;
  perksMonthly: number;
  activationFee: number;
  taxesAndFees: number;
}

export interface QuoteCalculation {
  monthlyDevicePayment: number;
  monthlyServiceCost: number;
  monthlyAutopayDiscount: number;
  estimatedMonthlyTotal: number;
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
