"use client";
import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Quote } from "@/lib/types";
import { calculateQuote, formatCurrency, buildCustomerScript } from "@/lib/calculations";
import { saveQuote, getQuote } from "@/lib/storage";
import { PRICING_CONFIG } from "@/data/pricing";
import { PlanPreset } from "@/data/planPresets";
import QuoteForm from "@/components/QuoteForm";
import QuoteSummary from "@/components/QuoteSummary";
import PageHeader from "@/components/PageHeader";

function makeEmptyQuote(): Quote {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    customerName: "",
    numLines: 1,
    currentCarrier: "",
    customerType: "new",
    deviceBrand: "",
    deviceModel: "",
    deviceRetailPrice: 0,
    tradeInValue: 0,
    downPayment: 0,
    financingTerm: PRICING_CONFIG.defaultFinancingTerm,
    planName: "",
    planPricePerLine: 0,
    autopayDiscount: PRICING_CONFIG.defaultAutopayDiscount,
    protectionMonthly: PRICING_CONFIG.defaultProtectionMonthly,
    perksMonthly: PRICING_CONFIG.defaultPerksMonthly,
    activationFee: PRICING_CONFIG.defaultActivationFee,
    taxesAndFees: PRICING_CONFIG.defaultTaxesAndFees,
  };
}

function QuoteBuilder() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [quote, setQuote] = useState<Quote>(makeEmptyQuote);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load an existing quote (from localStorage) when opened from the saved list.
  useEffect(() => {
    if (!editId) return;
    const existing = getQuote(editId);
    if (existing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuote(existing);
      setIsEditing(true);
    }
  }, [editId]);

  const calc = calculateQuote(quote);
  const started =
    quote.deviceRetailPrice > 0 ||
    quote.planPricePerLine > 0 ||
    quote.customerName.trim().length > 0;

  const handleChange = useCallback((field: keyof Quote, value: string | number) => {
    setQuote((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }, []);

  const handleApplyPreset = useCallback((preset: PlanPreset) => {
    setQuote((prev) => ({
      ...prev,
      planName: preset.name,
      planPricePerLine: preset.pricePerLine,
      autopayDiscount: preset.autopayDiscount,
    }));
    setSaved(false);
  }, []);

  const handleSave = () => {
    saveQuote(quote);
    setSaved(true);
  };

  const handleClear = () => {
    if (started && !confirm("Clear this quote and start over?")) return;
    setQuote(makeEmptyQuote());
    setIsEditing(false);
    setSaved(false);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildCustomerScript(quote, calc)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="pb-24 lg:pb-0">
      <PageHeader
        title={isEditing ? "Edit Quote" : "Build a Quote"}
        subtitle={
          isEditing
            ? "Make your changes — saving will update this quote."
            : "Fill in the details — your estimate updates as you type."
        }
      />
      {isEditing && (
        <span className="inline-block -mt-3 mb-4 text-xs px-2 py-0.5 rounded-full bg-brand-tint text-brand font-semibold">
          Editing saved quote
        </span>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Form */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200/80 p-5 sm:p-6">
          <QuoteForm quote={quote} onChange={handleChange} onApplyPreset={handleApplyPreset} />
        </div>

        {/* Right: Summary (sticky on desktop) */}
        <div className="space-y-4 lg:sticky lg:top-20">
          <QuoteSummary quote={quote} calc={calc} />

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSave}
              disabled={!started}
              className="col-span-2 bg-brand hover:bg-brand-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-card active:scale-[0.99] transition-all"
            >
              {saved ? "✓ Quote saved" : isEditing ? "Update quote" : "Save quote"}
            </button>
            <button
              onClick={handleCopy}
              disabled={!started}
              className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-ink font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
            >
              {copied ? "✓ Copied" : "Copy script"}
            </button>
            <button
              onClick={handleClear}
              className="bg-white border border-gray-200 hover:border-brand/40 text-gray-500 hover:text-brand font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
            >
              Clear form
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sticky total bar */}
      {started && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.07)] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-3 z-40">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">Monthly</p>
            <p className="font-extrabold text-ink text-lg leading-tight tabular-nums">
              {formatCurrency(calc.estimatedMonthlyTotal)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">Due today</p>
            <p className="font-bold text-brand text-lg leading-tight tabular-nums">
              {formatCurrency(calc.dueTodayEstimate)}
            </p>
          </div>
          <button
            onClick={handleSave}
            className="bg-brand active:bg-brand-dark text-white font-bold py-2.5 px-5 rounded-xl text-sm"
          >
            {saved ? "✓" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function QuoteBuilderPage() {
  return (
    <Suspense fallback={<div className="text-gray-400 text-sm">Loading…</div>}>
      <QuoteBuilder />
    </Suspense>
  );
}
