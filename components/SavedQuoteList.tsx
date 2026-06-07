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
      <div className="text-center py-16 text-slate-400">
        <p className="text-4xl mb-3">📁</p>
        <p className="font-medium">No saved quotes yet.</p>
        <p className="text-sm mt-1">Build a quote and hit Save to see it here.</p>
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
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
              onClick={() => setExpanded(isOpen ? null : q.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800 text-sm">
                    {q.customerName || "Unnamed Customer"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5 truncate">
                  {q.deviceBrand} {q.deviceModel} · {q.planName}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-indigo-600 text-base">
                  {formatCurrency(calc.estimatedMonthlyTotal)}<span className="text-xs text-slate-400 font-normal">/mo</span>
                </p>
                <p className="text-xs text-slate-500">
                  {formatCurrency(calc.dueTodayEstimate)} today
                </p>
              </div>
              <span className="text-slate-400 text-sm">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="border-t border-slate-100 px-5 py-4 bg-slate-50 space-y-3">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div><span className="text-slate-400">Lines:</span> <span className="text-slate-700 font-medium">{q.numLines}</span></div>
                  <div><span className="text-slate-400">Carrier:</span> <span className="text-slate-700 font-medium">{q.currentCarrier || "—"}</span></div>
                  <div><span className="text-slate-400">Device:</span> <span className="text-slate-700 font-medium">{q.deviceBrand} {q.deviceModel}</span></div>
                  <div><span className="text-slate-400">Plan:</span> <span className="text-slate-700 font-medium">{q.planName || "—"}</span></div>
                  <div><span className="text-slate-400">Trade-in:</span> <span className="text-slate-700 font-medium">{formatCurrency(q.tradeInValue)}</span></div>
                  <div><span className="text-slate-400">Financing:</span> <span className="text-slate-700 font-medium">{q.financingTerm} mo</span></div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Link
                    href={`/app/quote-builder?id=${q.id}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    Open in builder
                  </Link>
                  <button
                    onClick={() => onDelete(q.id, q.customerName)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Delete quote
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
