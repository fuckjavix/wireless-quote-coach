"use client";
import { Quote } from "@/lib/types";

interface Props {
  quote: Quote;
  onChange: (field: keyof Quote, value: string | number) => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition w-full";

export default function QuoteForm({ quote, onChange }: Props) {
  const num = (field: keyof Quote) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(field, parseFloat(e.target.value) || 0);
  const str = (field: keyof Quote) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange(field, e.target.value);

  return (
    <div className="space-y-6">
      {/* Customer Info */}
      <section>
        <h3 className="font-semibold text-slate-700 text-sm mb-3 uppercase tracking-wider">
          Customer Info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Customer Name">
            <input
              className={inputCls}
              value={quote.customerName}
              onChange={str("customerName")}
              placeholder="e.g. Jane Smith"
            />
          </Field>
          <Field label="Number of Lines">
            <input
              className={inputCls}
              type="number"
              min={1}
              value={quote.numLines || ""}
              onChange={num("numLines")}
              placeholder="1"
            />
          </Field>
          <Field label="Current Carrier">
            <input
              className={inputCls}
              value={quote.currentCarrier}
              onChange={str("currentCarrier")}
              placeholder="e.g. AT&T, T-Mobile, Verizon"
            />
          </Field>
          <Field label="New or Existing Customer">
            <select
              className={inputCls}
              value={quote.customerType}
              onChange={str("customerType")}
            >
              <option value="new">New Customer</option>
              <option value="existing">Existing Customer</option>
            </select>
          </Field>
        </div>
      </section>

      {/* Device Info */}
      <section>
        <h3 className="font-semibold text-slate-700 text-sm mb-3 uppercase tracking-wider">
          Device
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <Field label="Retail Price ($)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.deviceRetailPrice || ""}
              onChange={num("deviceRetailPrice")}
              placeholder="999"
            />
          </Field>
          <Field label="Trade-In Value ($)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.tradeInValue || ""}
              onChange={num("tradeInValue")}
              placeholder="0"
            />
          </Field>
          <Field label="Down Payment ($)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.downPayment || ""}
              onChange={num("downPayment")}
              placeholder="0"
            />
          </Field>
          <Field label="Financing Term (months)">
            <input
              className={inputCls}
              type="number"
              min={1}
              value={quote.financingTerm || ""}
              onChange={num("financingTerm")}
              placeholder="36"
            />
          </Field>
        </div>
      </section>

      {/* Plan Info */}
      <section>
        <h3 className="font-semibold text-slate-700 text-sm mb-3 uppercase tracking-wider">
          Plan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Plan Name">
            <input
              className={inputCls}
              value={quote.planName}
              onChange={str("planName")}
              placeholder="e.g. Unlimited Plus"
            />
          </Field>
          <Field label="Plan Price Per Line ($/mo)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.planPricePerLine || ""}
              onChange={num("planPricePerLine")}
              placeholder="65"
            />
          </Field>
          <Field label="Autopay Discount Per Line ($/mo)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.autopayDiscount || ""}
              onChange={num("autopayDiscount")}
              placeholder="5"
            />
          </Field>
          <Field label="Protection Plan ($/mo)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.protectionMonthly || ""}
              onChange={num("protectionMonthly")}
              placeholder="17"
            />
          </Field>
          <Field label="Perks / Add-ons ($/mo)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.perksMonthly || ""}
              onChange={num("perksMonthly")}
              placeholder="0"
            />
          </Field>
        </div>
      </section>

      {/* Fees */}
      <section>
        <h3 className="font-semibold text-slate-700 text-sm mb-3 uppercase tracking-wider">
          Fees
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Activation / Upgrade Fee ($)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.activationFee || ""}
              onChange={num("activationFee")}
              placeholder="35"
            />
          </Field>
          <Field label="Taxes & Fees Estimate ($/mo)">
            <input
              className={inputCls}
              type="number"
              min={0}
              value={quote.taxesAndFees || ""}
              onChange={num("taxesAndFees")}
              placeholder="15"
            />
          </Field>
        </div>
      </section>
    </div>
  );
}
