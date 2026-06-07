"use client";
import { useState } from "react";
import { PlanExplainerInput } from "@/lib/types";
import { formatCurrency } from "@/lib/calculations";

const empty: PlanExplainerInput = {
  planName: "",
  monthlyPrice: 0,
  features: "",
  bestFor: "",
};

export default function PlanExplainer() {
  const [input, setInput] = useState<PlanExplainerInput>(empty);
  const [generated, setGenerated] = useState(false);

  const set = (field: keyof PlanExplainerInput, value: string | number) =>
    setInput((prev) => ({ ...prev, [field]: value }));

  const inputCls =
    "border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition w-full";

  const explanation = input.planName
    ? `This plan is best for someone who ${input.bestFor || "wants a reliable wireless plan"}. It includes ${
        input.features || "standard wireless features"
      }. The biggest value is getting all of that for ${formatCurrency(input.monthlyPrice)} a month${
        input.monthlyPrice > 0 ? " per line" : ""
      }. I'd recommend it if you want a plan that covers everything without surprises — and ${input.bestFor || "it fits a wide range of customers"}.`
    : null;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Plan Name</label>
            <input
              className={inputCls}
              value={input.planName}
              onChange={(e) => set("planName", e.target.value)}
              placeholder="e.g. Unlimited Ultimate"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Monthly Price Per Line ($)</label>
            <input
              className={inputCls}
              type="number"
              min={0}
              value={input.monthlyPrice || ""}
              onChange={(e) => set("monthlyPrice", parseFloat(e.target.value) || 0)}
              placeholder="80"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Included Features</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={3}
            value={input.features}
            onChange={(e) => set("features", e.target.value)}
            placeholder="e.g. unlimited data, 4K streaming, 50GB hotspot, Apple TV+ included"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Best For Customer Type</label>
          <input
            className={inputCls}
            value={input.bestFor}
            onChange={(e) => set("bestFor", e.target.value)}
            placeholder="e.g. heavy streamers and hotspot users who travel a lot"
          />
        </div>
        <button
          onClick={() => setGenerated(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl text-sm transition-colors"
        >
          Generate Explanation
        </button>
      </div>

      {generated && explanation && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📋</span>
            <h4 className="font-semibold text-amber-800 text-sm">{input.planName} — Plain-English Explanation</h4>
          </div>
          <p className="text-amber-900 text-sm leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}
