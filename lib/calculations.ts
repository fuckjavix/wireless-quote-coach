import { Quote, QuoteCalculation } from "./types";

export function calculateQuote(q: Quote): QuoteCalculation {
  const monthlyDevicePayment =
    q.financingTerm > 0
      ? (q.deviceRetailPrice - q.tradeInValue - q.downPayment) / q.financingTerm
      : 0;
  const monthlyServiceCost = q.numLines * q.planPricePerLine;
  const monthlyAutopayDiscount = q.numLines * q.autopayDiscount;
  const estimatedMonthlyTotal =
    monthlyServiceCost +
    monthlyDevicePayment +
    q.protectionMonthly +
    q.perksMonthly -
    monthlyAutopayDiscount +
    q.taxesAndFees;
  const dueTodayEstimate = q.downPayment + q.activationFee;

  return {
    monthlyDevicePayment: Math.max(0, monthlyDevicePayment),
    monthlyServiceCost,
    monthlyAutopayDiscount,
    estimatedMonthlyTotal: Math.max(0, estimatedMonthlyTotal),
    dueTodayEstimate,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

// One source of truth for the customer-facing script, shared by the
// builder page and the summary card so they never drift apart.
export function buildCustomerScript(q: Quote, calc: QuoteCalculation): string {
  const includes: string[] = ["your plan", "device payment"];
  if (q.protectionMonthly > 0) includes.push("protection");
  if (q.perksMonthly > 0) includes.push("perks");
  includes.push("estimated taxes and fees");

  // Join with commas and a final "and".
  const includesList =
    includes.length > 1
      ? `${includes.slice(0, -1).join(", ")}, and ${includes[includes.length - 1]}`
      : includes[0];

  const lines = [
    `Based on what we built today, your estimated monthly total would be around ${formatCurrency(
      calc.estimatedMonthlyTotal
    )} per month before final carrier verification.`,
    `That includes ${includesList}.`,
  ];

  if (calc.monthlyAutopayDiscount > 0) {
    lines.push(
      `Setting up autopay saves you ${formatCurrency(
        calc.monthlyAutopayDiscount
      )} every month, which is already built into that number.`
    );
  }

  lines.push(
    `Your estimated due today would be ${formatCurrency(calc.dueTodayEstimate)}.`
  );

  return lines.join(" ");
}
