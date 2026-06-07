"use client";
import { useState } from "react";
import Link from "next/link";
import { Quote } from "@/lib/types";
import { calculateQuote, formatCurrency } from "@/lib/calculations";

interface Props {
  quotes: Quote[];
  onDelete: (id: string, name: string) => void;
}

export default function SavedQuoteList({ quotes, onDelete }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (quotes.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 shadow-card text-center py-16 px-6">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl mx-auto mb-4">
          📁
        </div>
        <p className="font-bold text-ink">No saved quotes yet</p>
        <p className="text-sm text-gray-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
          Build a quote and tap Save — it&apos;ll show up here so you can reopen it anytime.
        </p>
        <Link
          href="/app/quote-builder"
          className="inline-block mt-5 bg-brand hover:bg-brand-dark text-white font-bold text-sm px-6 py-3 rounded-xl shadow-card active:scale-[0.99] transition-all"
        >
          Build a quote →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {quotes.map((q) => {
        const calc = calculateQuote(q);
        const isOpen = expanded === q.id;
        return (
          <div
            key={q.id}
            className={`bg-white rounded-2xl border shadow-card overflow-hidden transition-colors ${
              isOpen ? "border-brand/30" : "border-gray-200/80"
            }`}
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
              onClick={() => setExpanded(isOpen ? null : q.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-ink text-sm">
                    {q.customerName || "Unnamed Customer"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5 truncate">
                  {[`${q.deviceBrand} ${q.deviceModel}`.trim(), q.planName].filter(Boolean).join(" · ") || "—"}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-extrabold text-ink text-base tabular-nums leading-tight">
                  {formatCurrency(calc.estimatedMonthlyTotal)}
                  <span className="text-xs text-gray-400 font-medium">/mo</span>
                </p>
                <p className="text-xs text-brand font-semibold tabular-nums">
                  {formatCurrency(calc.dueTodayEstimate)} today
                </p>
              </div>
              <span
                className={`text-gray-300 text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/70 space-y-4">
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
                  <div><span className="text-gray-400">Lines</span> <span className="text-ink font-semibold ml-1">{q.numLines}</span></div>
                  <div><span className="text-gray-400">Carrier</span> <span className="text-ink font-semibold ml-1">{q.currentCarrier || "—"}</span></div>
                  <div><span className="text-gray-400">Device</span> <span className="text-ink font-semibold ml-1">{`${q.deviceBrand} ${q.deviceModel}`.trim() || "—"}</span></div>
                  <div><span className="text-gray-400">Plan</span> <span className="text-ink font-semibold ml-1">{q.planName || "—"}</span></div>
                  <div><span className="text-gray-400">Trade-in</span> <span className="text-ink font-semibold ml-1 tabular-nums">{formatCurrency(q.tradeInValue)}</span></div>
                  <div><span className="text-gray-400">Financing</span> <span className="text-ink font-semibold ml-1">{q.financingTerm} mo</span></div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/app/quote-builder?id=${q.id}`}
                    className="text-sm text-white bg-brand hover:bg-brand-dark font-bold px-4 py-2.5 rounded-xl shadow-card active:scale-[0.99] transition-all"
                  >
                    Open in builder
                  </Link>
                  <button
                    onClick={() => onDelete(q.id, q.customerName)}
                    className="text-sm text-gray-500 hover:text-brand font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-tint transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
