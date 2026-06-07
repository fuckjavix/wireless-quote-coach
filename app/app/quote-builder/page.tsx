"use client";
import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Quote } from "@/lib/types";
import { calculateQuote, formatCurrency, buildCustomerScript } from "@/lib/calculations";
import { saveQuote, getQuote } from "@/lib/storage";
import QuoteForm from "@/components/QuoteForm";
import QuoteSummary from "@/components/QuoteSummary";

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
    financingTerm: 36,
    planName: "",
    planPricePerLine: 0,
    autopayDiscount: 0,
    protectionMonthly: 0,
    perksMonthly: 0,
    activationFee: 0,
    taxesAndFees: 0,
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
  // Runs after mount so it doesn't break server rendering.
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
    <div className="pb-20 lg:pb-0">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-800">
            {isEditing ? "Edit Quote" : "Build a Quote"}
          </h1>
          {isEditing && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
              Editing saved quote
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm mt-1">
          {isEditing
            ? "Make your changes — saving will update this quote."
            : "Fill in the details — your estimate updates as you type."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <QuoteForm quote={quote} onChange={handleChange} />
        </div>

        {/* Right: Summary (sticky on desktop) */}
        <div className="space-y-4 lg:sticky lg:top-20">
          <QuoteSummary quote={quote} calc={calc} />

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSave}
              disabled={!started}
              className="col-span-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors"
            >
              {saved ? "✓ Saved" : isEditing ? "Update quote" : "Save quote"}
            </button>
            <button
              onClick={handleCopy}
              disabled={!started}
              className="bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium py-2.5 px-4 rounded-xl text-sm transition-colors"
            >
              {copied ? "✓ Copied" : "Copy script"}
            </button>
            <button
              onClick={handleClear}
              className="bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-500 hover:text-red-500 font-medium py-2.5 px-4 rounded-xl text-sm transition-colors"
            >
              Clear form
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sticky total bar */}
      {started && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-4 py-3 flex items-center justify-between z-40">
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wide">Monthly</p>
            <p className="font-bold text-indigo-600 text-lg leading-tight tabular-nums">
              {formatCurrency(calc.estimatedMonthlyTotal)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400 uppercase tracking-wide">Due today</p>
            <p className="font-semibold text-slate-800 text-lg leading-tight tabular-nums">
              {formatCurrency(calc.dueTodayEstimate)}
            </p>
          </div>
          <button
            onClick={handleSave}
            className="bg-indigo-600 active:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-xl text-sm"
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
    <Suspense fallback={<div className="text-slate-400 text-sm">Loading…</div>}>
      <QuoteBuilder />
    </Suspense>
  );
}
