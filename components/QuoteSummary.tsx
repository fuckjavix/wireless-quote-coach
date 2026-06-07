"use client";
import { Quote, QuoteCalculation } from "@/lib/types";
import { formatCurrency, buildCustomerScript } from "@/lib/calculations";

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
      <div>
        <span className="text-slate-600 text-sm">{label}</span>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
      <span className={`text-sm font-medium ${negative ? "text-emerald-600" : "text-slate-800"}`}>
        {value}
      </span>
    </div>
  );
}

export default function QuoteSummary({ quote, calc }: Props) {
  const lines = quote.numLines || 1;

  // Has the rep actually started building anything yet?
  const started =
    quote.deviceRetailPrice > 0 ||
    quote.planPricePerLine > 0 ||
    quote.customerName.trim().length > 0;

  if (!started) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-dashed border-slate-300 p-8 text-center">
        <p className="text-3xl mb-2">🧾</p>
        <p className="font-medium text-slate-600 text-sm">Your quote will appear here</p>
        <p className="text-slate-400 text-xs mt-1">
          Start by adding a customer name, device price, or plan price.
        </p>
      </div>
    );
  }

  const deviceNet = quote.deviceRetailPrice - quote.tradeInValue - quote.downPayment;
  const deviceSub =
    quote.deviceRetailPrice > 0
      ? `${formatCurrency(quote.deviceRetailPrice)} retail${
          quote.tradeInValue > 0 ? ` − ${formatCurrency(quote.tradeInValue)} trade-in` : ""
        }${quote.downPayment > 0 ? ` − ${formatCurrency(quote.downPayment)} down` : ""} ÷ ${
          quote.financingTerm
        } mo`
      : undefined;

  const script = buildCustomerScript(quote, calc);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              {quote.customerName.trim() || "New Quote"}
            </h3>
            {(quote.deviceModel || quote.planName) && (
              <p className="text-slate-500 text-sm">
                {[`${quote.deviceBrand} ${quote.deviceModel}`.trim(), quote.planName]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              quote.customerType === "new"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-sky-100 text-sky-700"
            }`}
          >
            {quote.customerType === "new" ? "New Customer" : "Existing"}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          <Row
            label={`Plan · ${lines} line${lines > 1 ? "s" : ""}`}
            value={formatCurrency(calc.monthlyServiceCost)}
            sub={
              quote.planPricePerLine > 0
                ? `${formatCurrency(quote.planPricePerLine)} × ${lines}`
                : undefined
            }
          />
          <Row
            label="Device payment"
            value={formatCurrency(calc.monthlyDevicePayment)}
            sub={deviceSub}
          />
          {quote.protectionMonthly > 0 && (
            <Row label="Protection" value={formatCurrency(quote.protectionMonthly)} />
          )}
          {quote.perksMonthly > 0 && (
            <Row label="Perks / add-ons" value={formatCurrency(quote.perksMonthly)} />
          )}
          {calc.monthlyAutopayDiscount > 0 && (
            <Row
              label="Autopay discount"
              value={`− ${formatCurrency(calc.monthlyAutopayDiscount)}`}
              negative
            />
          )}
          {quote.taxesAndFees > 0 && (
            <Row label="Est. taxes & fees" value={formatCurrency(quote.taxesAndFees)} />
          )}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-slate-200 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="font-semibold text-slate-700 text-sm">Estimated monthly</span>
            <span className="font-bold text-3xl text-indigo-600 tabular-nums">
              {formatCurrency(calc.estimatedMonthlyTotal)}
            </span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 rounded-xl px-3 py-2.5">
            <span className="text-slate-600 text-sm font-medium">Due today</span>
            <span className="font-bold text-slate-800 text-lg tabular-nums">
              {formatCurrency(calc.dueTodayEstimate)}
            </span>
          </div>
          {deviceNet < 0 && (
            <p className="text-xs text-emerald-600">
              Trade-in and down payment cover the full device cost — no monthly device charge.
            </p>
          )}
        </div>
      </div>

      {/* Customer Script */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💬</span>
          <h4 className="font-semibold text-indigo-800 text-sm">What to say to your customer</h4>
        </div>
        <p className="text-indigo-700 text-sm leading-relaxed">&ldquo;{script}&rdquo;</p>
      </div>
    </div>
  );
}
