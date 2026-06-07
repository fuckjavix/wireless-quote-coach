"use client";
import { Quote } from "@/lib/types";
import { PLAN_PRESETS, PlanPreset, PLAN_PRICING_DISCLAIMER } from "@/data/planPresets";

interface Props {
  quote: Quote;
  onChange: (field: keyof Quote, value: string | number) => void;
  onApplyPreset: (preset: PlanPreset) => void;
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">{children}</div>
    </section>
  );
}

export default function QuoteForm({ quote, onChange, onApplyPreset }: Props) {
  const num = (field: keyof Quote) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(field, parseFloat(e.target.value) || 0);
  const str = (field: keyof Quote) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange(field, e.target.value);

  // Lightweight validation / helpful warnings
  const linesError = quote.numLines < 1 ? "Enter at least 1 line." : undefined;
  const termError = quote.financingTerm < 1 ? "Term must be at least 1 month." : undefined;
  const tradeCoversDevice =
    quote.deviceRetailPrice > 0 &&
    quote.tradeInValue + quote.downPayment > quote.deviceRetailPrice;

  return (
    <div className="space-y-8">
      {/* 1. Customer Info */}
      <Section step={1} title="Customer Info">
        <Field label="Customer name">
          <input
            className={inputCls}
            value={quote.customerName}
            onChange={str("customerName")}
            placeholder="e.g. Jane Smith"
          />
        </Field>
        <Field label="Number of lines" error={linesError}>
          <input
            className={inputCls}
            type="number"
            min={1}
            value={quote.numLines || ""}
            onChange={num("numLines")}
            placeholder="1"
          />
        </Field>
        <Field label="Current carrier" helper="Who are they switching from?">
          <input
            className={inputCls}
            value={quote.currentCarrier}
            onChange={str("currentCarrier")}
            placeholder="e.g. AT&T, T-Mobile"
          />
        </Field>
        <Field label="New or existing customer">
          <select className={inputCls} value={quote.customerType} onChange={str("customerType")}>
            <option value="new">New customer</option>
            <option value="existing">Existing customer</option>
          </select>
        </Field>
      </Section>

      {/* 2. Device Info */}
      <Section step={2} title="Device Info">
        <Field label="Brand">
          <input
            className={inputCls}
            value={quote.deviceBrand}
            onChange={str("deviceBrand")}
            placeholder="e.g. Apple, Samsung"
          />
        </Field>
        <Field label="Model">
          <input
            className={inputCls}
            value={quote.deviceModel}
            onChange={str("deviceModel")}
            placeholder="e.g. iPhone 16 Pro"
          />
        </Field>
        <Field label="Retail price ($)" helper="Full price before any credits.">
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.deviceRetailPrice || ""}
            onChange={num("deviceRetailPrice")}
            placeholder="999"
          />
        </Field>
        <Field
          label="Trade-in value ($)"
          error={tradeCoversDevice ? "Trade-in + down covers the full device — $0 monthly." : undefined}
        >
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.tradeInValue || ""}
            onChange={num("tradeInValue")}
            placeholder="0"
          />
        </Field>
        <Field label="Down payment ($)">
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.downPayment || ""}
            onChange={num("downPayment")}
            placeholder="0"
          />
        </Field>
        <Field label="Financing term (months)" error={termError} helper="Typically 24 or 36 months.">
          <input
            className={inputCls}
            type="number"
            min={1}
            value={quote.financingTerm || ""}
            onChange={num("financingTerm")}
            placeholder="36"
          />
        </Field>
      </Section>

      {/* 3. Plan Info */}
      <Section step={3} title="Plan Info">
        <div className="sm:col-span-2 bg-brand-tint border border-brand/15 rounded-xl p-3.5">
          <Field label="⚡ Quick-fill from a plan preset" helper={PLAN_PRICING_DISCLAIMER}>
            <select
              className={inputCls}
              value=""
              onChange={(e) => {
                const preset = PLAN_PRESETS.find((p) => p.id === e.target.value);
                if (preset) onApplyPreset(preset);
              }}
            >
              <option value="">Choose a plan to auto-fill…</option>
              {PLAN_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.pricePerLine}/line
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Plan name">
          <input
            className={inputCls}
            value={quote.planName}
            onChange={str("planName")}
            placeholder="e.g. Premium"
          />
        </Field>
        <Field label="Plan price per line ($/mo)">
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.planPricePerLine || ""}
            onChange={num("planPricePerLine")}
            placeholder="80"
          />
        </Field>
      </Section>

      {/* 4. Discounts & Add-ons */}
      <Section step={4} title="Discounts & Add-ons">
        <Field label="Autopay discount per line ($/mo)" helper="Subtracted from the monthly total.">
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.autopayDiscount || ""}
            onChange={num("autopayDiscount")}
            placeholder="10"
          />
        </Field>
        <Field label="Protection plan ($/mo)">
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.protectionMonthly || ""}
            onChange={num("protectionMonthly")}
            placeholder="17"
          />
        </Field>
        <Field label="Perks / add-ons ($/mo)" helper="Streaming, hotspot, cloud storage, etc.">
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.perksMonthly || ""}
            onChange={num("perksMonthly")}
            placeholder="0"
          />
        </Field>
      </Section>

      {/* 5. Fees & Taxes */}
      <Section step={5} title="Fees & Taxes">
        <Field label="Activation / upgrade fee ($)" helper="One-time, due today.">
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.activationFee || ""}
            onChange={num("activationFee")}
            placeholder="35"
          />
        </Field>
        <Field label="Taxes & fees estimate ($/mo)" helper="Varies by location — estimate only.">
          <input
            className={inputCls}
            type="number"
            min={0}
            value={quote.taxesAndFees || ""}
            onChange={num("taxesAndFees")}
            placeholder="15"
          />
        </Field>
      </Section>
    </div>
  );
}
