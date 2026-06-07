import { Quote, QuoteCalculation } from "./types";
import { getVerizonPlan, pricePerLineFor } from "@/config/verizonPlanConfig";
import { FEES_CONFIG } from "@/config/feesConfig";
import { getLocation, DEFAULT_LOCATION_ID } from "@/config/locationFeesConfig";

// ──────────────────────────────────────────────────────────────
//  QUOTE FORMULAS (all inputs come from the /config files)
//
//  per-line price        = preset plan tier for # of lines, OR custom price
//  monthly service cost   = per-line price × number of lines
//  monthly device payment = (retail − trade-in − down) ÷ financing term
//  monthly autopay disc.  = autopay discount per line × number of lines
//  subtotal before taxes  = service + device + protection + perks − autopay
//  taxes & fees           = subtotal × location % + location flat fee
//  estimated monthly total= subtotal + taxes & fees
//  due today              = down payment + setup fee + activation fee
// ──────────────────────────────────────────────────────────────

export function calculateQuote(q: Quote): QuoteCalculation {
  const numLines = q.numLines > 0 ? q.numLines : 1;

  // Preset plans price by line count; custom plans use the manual per-line value.
  const plan = q.planId && q.planId !== "custom" ? getVerizonPlan(q.planId) : undefined;
  const perLinePrice = plan ? pricePerLineFor(plan, numLines) : q.planPricePerLine;

  const monthlyServiceCost = perLinePrice * numLines;

  const monthlyDevicePayment =
    q.financingTerm > 0
      ? Math.max(0, (q.deviceRetailPrice - q.tradeInValue - q.downPayment) / q.financingTerm)
      : 0;

  const monthlyAutopayDiscount = q.autopayDiscount * numLines;

  const monthlySubtotalBeforeTaxes = Math.max(
    0,
    monthlyServiceCost +
      monthlyDevicePayment +
      q.protectionMonthly +
      q.perksMonthly -
      monthlyAutopayDiscount
  );

  const loc = getLocation(q.locationId) || getLocation(DEFAULT_LOCATION_ID);
  const taxesAndFees = loc
    ? monthlySubtotalBeforeTaxes * loc.taxFeePercent + loc.flatMonthlyFee
    : 0;

  const estimatedMonthlyTotal = monthlySubtotalBeforeTaxes + taxesAndFees;

  const setupFee = FEES_CONFIG.setupFee;
  const activationFee = FEES_CONFIG.activationFee;
  const dueTodayEstimate = q.downPayment + setupFee + activationFee;

  return {
    perLinePrice,
    monthlyServiceCost,
    monthlyDevicePayment,
    monthlyAutopayDiscount,
    monthlySubtotalBeforeTaxes,
    taxesAndFees,
    estimatedMonthlyTotal,
    setupFee,
    activationFee,
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
  const loc = getLocation(q.locationId) || getLocation(DEFAULT_LOCATION_ID);
  const locLabel = loc ? `${loc.county}, ${loc.state}` : "your area";
  const planLabel = q.planName ? `your ${q.planName} plan` : "your selected plan";

  return (
    `Based on this estimate, your monthly total would be around ${formatCurrency(
      calc.estimatedMonthlyTotal
    )} including ${planLabel}, device payment, protection, perks, autopay savings, ` +
    `and estimated ${locLabel} taxes and fees. ` +
    `Your estimated due today would be ${formatCurrency(calc.dueTodayEstimate)}, which includes your down payment, ` +
    `${formatCurrency(calc.setupFee)} setup fee, and ${formatCurrency(calc.activationFee)} activation fee. ` +
    `Final pricing must be verified in official carrier systems.`
  );
}
