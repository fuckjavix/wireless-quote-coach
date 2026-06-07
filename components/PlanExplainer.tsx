"use client";
import { useState } from "react";
import { PlanExplainerInput } from "@/lib/types";
import { formatCurrency } from "@/lib/calculations";
import { VERIZON_PLANS, PLAN_PRICING_DISCLAIMER } from "@/config/verizonPlanConfig";

const empty: PlanExplainerInput = {
  planName: "",
  monthlyPrice: 0,
  features: "",
  bestFor: "",
};

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-brand/30 focus:border-brand transition";

export default function PlanExplainer() {
  const [input, setInput] = useState<PlanExplainerInput>(empty);
  const [generated, setGenerated] = useState(false);

  const set = (field: keyof PlanExplainerInput, value: string | number) =>
    setInput((prev) => ({ ...prev, [field]: value }));

  const applyPreset = (id: string) => {
    const p = VERIZON_PLANS.find((x) => x.id === id);
    if (!p) return;
    setInput({
      planName: p.name,
      monthlyPrice: p.pricePerLineByLines[1],
      features: p.features.join(", "),
      bestFor: p.bestFor.replace(/\.$/, "").toLowerCase(),
    });
    setGenerated(false);
  };

  const explanation = input.planName
    ? `This plan is best for someone who ${input.bestFor || "wants a reliable wireless plan"}. It includes ${
        input.features || "standard wireless features"
      }. The biggest value is getting all of that for ${formatCurrency(input.monthlyPrice)} a month${
        input.monthlyPrice > 0 ? " per line" : ""
      }. I'd recommend it if you want a plan that covers everything without surprises.`
    : null;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">Quick-fill from a plan preset</label>
          <select className={inputCls} value="" onChange={(e) => applyPreset(e.target.value)}>
            <option value="">Choose a plan to auto-fill…</option>
            {VERIZON_PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — from ${p.pricePerLineByLines[1]}/line
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">{PLAN_PRICING_DISCLAIMER}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600">Plan name</label>
            <input
              className={inputCls}
              value={input.planName}
              onChange={(e) => set("planName", e.target.value)}
              placeholder="e.g. Premium"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600">Monthly price per line ($)</label>
            <input
              className={inputCls}
              type="number"
              min={0}
              value={input.monthlyPrice || ""}
              onChange={(e) => set("monthlyPrice", parseFloat(e.target.value) || 0)}
              placeholder="90"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">Included features</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={3}
            value={input.features}
            onChange={(e) => set("features", e.target.value)}
            placeholder="e.g. unlimited data, hotspot, premium streaming"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">Best for customer type</label>
          <input
            className={inputCls}
            value={input.bestFor}
            onChange={(e) => set("bestFor", e.target.value)}
            placeholder="e.g. heavy streamers and hotspot users who travel"
          />
        </div>
        <button
          onClick={() => setGenerated(true)}
          className="bg-brand hover:bg-brand-dark text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-card active:scale-[0.99] transition-all"
        >
          Generate explanation
        </button>
      </div>

      {generated && explanation && (
        <div className="bg-brand-tint border border-brand/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📋</span>
            <h4 className="font-bold text-brand text-sm">{input.planName} — Plain-English explanation</h4>
          </div>
          <p className="text-ink text-sm leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}
