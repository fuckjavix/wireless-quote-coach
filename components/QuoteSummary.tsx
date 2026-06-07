"use client";
import { Quote, QuoteCalculation } from "@/lib/types";
import { formatCurrency, buildCustomerScript } from "@/lib/calculations";
import { getLocation, DEFAULT_LOCATION_ID } from "@/config/locationFeesConfig";

interface Props {
  quote: Quote;
  calc: QuoteCalculation;
}

function Row({
  label,
  value,
  sub,
  negative,
}: {
  label: string;
  value: string;
  sub?: string;
  negative?: boolean;
}) {
  return (
    <div className="flex justify-between items-start py-2.5">
      <div className="pr-3">
        <span className="text-gray-600 text-sm">{label}</span>
        {sub && <p className="text-xs text-gray-400 mt-0.5 leading-snug">{sub}</p>}
      </div>
      <span className={`text-sm font-semibold tabular-nums shrink-0 ${negative ? "text-green-600" : "text-ink"}`}>
        {value}
      </span>
    </div>
  );
}

export default function QuoteSummary({ quote, calc }: Props) {
  const lines = quote.numLines || 1;
  const location = getLocation(quote.locationId) || getLocation(DEFAULT_LOCATION_ID)!;

  const started =
    quote.deviceRetailPrice > 0 ||
    quote.planId !== "" ||
    quote.customerName.trim().length > 0;

  if (!started) {
    return (
      <div className="bg-white rounded-2xl shadow-card border border-dashed border-gray-300 p-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl mx-auto mb-3">
          🧾
        </div>
        <p className="font-semibold text-ink text-sm">Your quote will appear here</p>
        <p className="text-gray-400 text-xs mt-1.5 leading-relaxed max-w-[220px] mx-auto">
          Add a customer name, pick a plan, or enter a device price to get started.
        </p>
      </div>
    );
  }

  const deviceSub =
    quote.deviceRetailPrice > 0
      ? `${formatCurrency(quote.deviceRetailPrice)} retail${
          quote.tradeInValue > 0 ? ` − ${formatCurrency(quote.tradeInValue)} trade` : ""
        }${quote.downPayment > 0 ? ` − ${formatCurrency(quote.downPayment)} down` : ""} ÷ ${quote.financingTerm} mo`
      : undefined;

  const script = buildCustomerScript(quote, calc);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-card border border-gray-200/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-5 pb-4 border-b border-gray-100">
          <div className="min-w-0">
            <h3 className="font-bold text-ink text-base truncate">
              {quote.customerName.trim() || "New Quote"}
            </h3>
            {(quote.deviceModel || quote.planName) && (
              <p className="text-gray-500 text-sm truncate">
                {[`${quote.deviceBrand} ${quote.deviceModel}`.trim(), quote.planName].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${
              quote.customerType === "new" ? "bg-brand-tint text-brand" : "bg-gray-100 text-gray-600"
            }`}
          >
            {quote.customerType === "new" ? "New" : "Existing"}
          </span>
        </div>

        {/* Monthly breakdown */}
        <div className="px-5 pt-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">Monthly estimate</p>
        </div>
        <div className="px-5 divide-y divide-gray-100">
          <Row
            label={`Plan · ${lines} line${lines > 1 ? "s" : ""}`}
            value={formatCurrency(calc.monthlyServiceCost)}
            sub={calc.perLinePrice > 0 ? `${formatCurrency(calc.perLinePrice)} × ${lines}` : "Pick a plan above"}
          />
          <Row label="Device payment" value={formatCurrency(calc.monthlyDevicePayment)} sub={deviceSub} />
          {quote.protectionMonthly > 0 && (
            <Row label="Protection" value={formatCurrency(quote.protectionMonthly)} />
          )}
          {quote.perksMonthly > 0 && (
            <Row label="Perks / add-ons" value={formatCurrency(quote.perksMonthly)} />
          )}
          {calc.monthlyAutopayDiscount > 0 && (
            <Row label="Autopay discount" value={`− ${formatCurrency(calc.monthlyAutopayDiscount)}`} negative />
          )}
          <Row
            label={`Est. taxes & fees`}
            value={formatCurrency(calc.taxesAndFees)}
            sub={`${location.county}, ${location.state} estimate`}
          />
        </div>

        {/* Big monthly total */}
        <div className="bg-ink text-white p-5 mt-1">
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest pb-1.5">Est. monthly</span>
            <span className="font-extrabold text-4xl text-white tabular-nums leading-none tracking-tight">
              {formatCurrency(calc.estimatedMonthlyTotal)}
              <span className="text-gray-500 text-base font-bold">/mo</span>
            </span>
          </div>
        </div>

        {/* Due today breakdown */}
        <div className="px-5 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">Due today</p>
        </div>
        <div className="px-5 divide-y divide-gray-100">
          <Row label="Down payment" value={formatCurrency(quote.downPayment)} />
          <Row label="Setup fee" value={formatCurrency(calc.setupFee)} />
          <Row label="Activation fee" value={formatCurrency(calc.activationFee)} />
        </div>
        <div className="bg-ink text-white p-5 mt-1">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Est. due today</span>
            <span className="font-extrabold text-2xl text-brand tabular-nums leading-none">
              {formatCurrency(calc.dueTodayEstimate)}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 leading-relaxed p-4 bg-gray-50 border-t border-gray-100">
          Estimate only. Taxes and fees are estimated for {location.county}, {location.state}. Verify final
          pricing in official carrier systems.
        </p>
      </div>

      {/* Customer Script */}
      <div className="bg-brand-tint border border-brand/15 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">💬</span>
          <h4 className="font-bold text-brand text-xs uppercase tracking-wide">What to say to your customer</h4>
        </div>
        <p className="text-ink text-sm leading-relaxed">&ldquo;{script}&rdquo;</p>
      </div>
    </div>
  );
}
