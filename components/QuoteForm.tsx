"use client";
import { Quote } from "@/lib/types";
import { formatCurrency } from "@/lib/calculations";
import {
  VERIZON_PLANS,
  getVerizonPlan,
  pricePerLineFor,
  PLAN_PRICING_DISCLAIMER,
} from "@/config/verizonPlanConfig";
import { FEES_CONFIG, FEES_DISCLAIMER } from "@/config/feesConfig";
import { getLocation, DEFAULT_LOCATION_ID, TAXES_DISCLAIMER } from "@/config/locationFeesConfig";

interface Props {
  quote: Quote;
  onChange: (field: keyof Quote, value: string | number) => void;
  onSelectPlan: (planId: string) => void;
}

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-ink bg-white placeholder:text-gray-400 hover:border-gray-300 focus:ring-2 focus:ring-brand/25 focus:border-brand transition";

function Field({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-700">{label}</label>
      {children}
      {error ? (
        <p className="text-xs text-brand font-medium leading-snug">{error}</p>
      ) : helper ? (
        <p className="text-xs text-gray-400 leading-snug">{helper}</p>
      ) : null}
    </div>
  );
}

function Section({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0">
          {step}
        </span>
        <h3 className="font-bold text-ink text-[13px] uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </section>
  );
}

/** Small grey "estimate only" pill used near pricing/fees. */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] text-gray-400 leading-snug mt-2 flex items-start gap-1">
      <span className="text-gray-300">ⓘ</span>
      <span>{children}</span>
    </p>
  );
}

export default function QuoteForm({ quote, onChange, onSelectPlan }: Props) {
  const num = (field: keyof Quote) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(field, parseFloat(e.target.value) || 0);
  const str = (field: keyof Quote) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange(field, e.target.value);

  const numLines = quote.numLines > 0 ? quote.numLines : 1;
  const isCustom = quote.planId === "custom";
  const selectedPlan = getVerizonPlan(quote.planId);
  const location = getLocation(quote.locationId) || getLocation(DEFAULT_LOCATION_ID)!;

  const linesError = quote.numLines < 1 ? "Enter at least 1 line." : undefined;
  const termError = quote.financingTerm < 1 ? "Term must be at least 1 month." : undefined;
  const tradeCoversDevice =
    quote.deviceRetailPrice > 0 &&
    quote.tradeInValue + quote.downPayment > quote.deviceRetailPrice;

  return (
    <div className="space-y-8">
      {/* 1. Customer Info */}
      <Section step={1} title="Customer Info">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Customer name">
            <input className={inputCls} value={quote.customerName} onChange={str("customerName")} placeholder="e.g. Jane Smith" />
          </Field>
          <Field label="Number of lines" error={linesError} helper="Plan price updates with line count.">
            <input className={inputCls} type="number" min={1} value={quote.numLines || ""} onChange={num("numLines")} placeholder="1" />
          </Field>
          <Field label="Current carrier" helper="Who are they switching from?">
            <input className={inputCls} value={quote.currentCarrier} onChange={str("currentCarrier")} placeholder="e.g. AT&T, T-Mobile" />
          </Field>
          <Field label="New or existing customer">
            <select className={inputCls} value={quote.customerType} onChange={str("customerType")}>
              <option value="new">New customer</option>
              <option value="existing">Existing customer</option>
            </select>
          </Field>
        </div>
      </Section>

      {/* 2. Device Info */}
      <Section step={2} title="Device Info">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Brand">
            <input className={inputCls} value={quote.deviceBrand} onChange={str("deviceBrand")} placeholder="e.g. Apple, Samsung" />
          </Field>
          <Field label="Model">
            <input className={inputCls} value={quote.deviceModel} onChange={str("deviceModel")} placeholder="e.g. iPhone 16 Pro" />
          </Field>
          <Field label="Retail price ($)" helper="Full price before any credits.">
            <input className={inputCls} type="number" min={0} value={quote.deviceRetailPrice || ""} onChange={num("deviceRetailPrice")} placeholder="999" />
          </Field>
          <Field label="Trade-in value ($)" error={tradeCoversDevice ? "Trade-in + down covers the device — $0 monthly." : undefined}>
            <input className={inputCls} type="number" min={0} value={quote.tradeInValue || ""} onChange={num("tradeInValue")} placeholder="0" />
          </Field>
          <Field label="Down payment ($)">
            <input className={inputCls} type="number" min={0} value={quote.downPayment || ""} onChange={num("downPayment")} placeholder="0" />
          </Field>
          <Field label="Financing term (months)" error={termError} helper="Typically 24 or 36 months.">
            <input className={inputCls} type="number" min={1} value={quote.financingTerm || ""} onChange={num("financingTerm")} placeholder="36" />
          </Field>
        </div>
      </Section>

      {/* 3. Plan Info — myPlan-style selector */}
      <Section step={3} title="Plan Info">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VERIZON_PLANS.map((plan) => {
            const active = quote.planId === plan.id;
            const perLine = pricePerLineFor(plan, numLines);
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => onSelectPlan(plan.id)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  active
                    ? "border-brand bg-brand-tint ring-2 ring-brand/20"
                    : "border-gray-200 bg-white hover:border-brand/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink text-sm">{plan.name}</span>
                  {active && <span className="text-brand text-xs font-bold">✓ Selected</span>}
                </div>
                <p className="mt-1">
                  <span className="text-2xl font-extrabold text-ink tabular-nums">${perLine}</span>
                  <span className="text-xs text-gray-400 font-medium">/line · {numLines} line{numLines > 1 ? "s" : ""}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{plan.bestFor}</p>
              </button>
            );
          })}
          {/* Custom plan card */}
          <button
            type="button"
            onClick={() => onSelectPlan("custom")}
            className={`text-left rounded-xl border p-4 transition-all ${
              isCustom ? "border-brand bg-brand-tint ring-2 ring-brand/20" : "border-gray-200 bg-white hover:border-brand/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink text-sm">Custom Plan</span>
              {isCustom && <span className="text-brand text-xs font-bold">✓ Selected</span>}
            </div>
            <p className="text-xs text-gray-500 mt-1 leading-snug">Enter your own plan name, price, and autopay discount.</p>
          </button>
        </div>

        <Note>{PLAN_PRICING_DISCLAIMER} Estimate only — pricing can change.</Note>

        {/* Selected preset details */}
        {selectedPlan && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
              <span className="text-gray-500">Autopay discount: <span className="text-ink font-semibold">−${selectedPlan.autopayDiscountPerLine}/line</span></span>
              <span className="text-gray-500">Hotspot: <span className="text-ink font-semibold">{selectedPlan.hotspot}</span></span>
            </div>
            <ul className="text-xs text-gray-600 space-y-0.5 list-disc pl-4">
              {selectedPlan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {selectedPlan.tradeInPromo && (
              <p className="text-xs text-brand font-medium">🎁 {selectedPlan.tradeInPromo}</p>
            )}
            <p className="text-[11px] text-gray-400">{selectedPlan.notes}</p>
          </div>
        )}

        {/* Custom plan inputs */}
        {isCustom && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Plan name">
              <input className={inputCls} value={quote.planName} onChange={str("planName")} placeholder="e.g. My Custom Plan" />
            </Field>
            <Field label="Plan price per line ($/mo)">
              <input className={inputCls} type="number" min={0} value={quote.planPricePerLine || ""} onChange={num("planPricePerLine")} placeholder="75" />
            </Field>
            <Field label="Autopay discount per line ($/mo)" helper="Subtracted from the monthly total.">
              <input className={inputCls} type="number" min={0} value={quote.autopayDiscount || ""} onChange={num("autopayDiscount")} placeholder="10" />
            </Field>
          </div>
        )}
      </Section>

      {/* 4. Discounts & Add-ons */}
      <Section step={4} title="Discounts & Add-ons">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!isCustom && (
            <Field label="Autopay discount per line" helper="Set by the selected plan.">
              <div className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 text-gray-700 tabular-nums">
                − {formatCurrency(quote.autopayDiscount)}/line
              </div>
            </Field>
          )}
          <Field label="Protection plan ($/mo)">
            <input className={inputCls} type="number" min={0} value={quote.protectionMonthly || ""} onChange={num("protectionMonthly")} placeholder="17" />
          </Field>
          <Field label="Perks / add-ons ($/mo)" helper="Streaming, hotspot boost, cloud, etc.">
            <input className={inputCls} type="number" min={0} value={quote.perksMonthly || ""} onChange={num("perksMonthly")} placeholder="0" />
          </Field>
        </div>
      </Section>

      {/* 5. Fees & Taxes — locked / estimated */}
      <Section step={5} title="Fees & Taxes">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-700">Setup fee</p>
              <p className="text-[11px] text-gray-400">Fixed · due today</p>
            </div>
            <span className="font-bold text-ink tabular-nums">{formatCurrency(FEES_CONFIG.setupFee)}</span>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-700">Activation fee</p>
              <p className="text-[11px] text-gray-400">Fixed · due today</p>
            </div>
            <span className="font-bold text-ink tabular-nums">{formatCurrency(FEES_CONFIG.activationFee)}</span>
          </div>
        </div>
        <Note>{FEES_DISCLAIMER}</Note>

        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-700">
                Taxes &amp; fees — {location.county}, {location.state}
              </p>
              <p className="text-[11px] text-gray-400">
                Est. {(location.taxFeePercent * 100).toFixed(1)}% + {formatCurrency(location.flatMonthlyFee)}/mo flat · auto-calculated
              </p>
            </div>
            <span className="text-[11px] text-gray-400">Updated {location.lastUpdated}</span>
          </div>
          <Note>{TAXES_DISCLAIMER}</Note>
        </div>
      </Section>
    </div>
  );
}
