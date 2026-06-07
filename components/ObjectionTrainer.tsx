"use client";
import { useState } from "react";
import { OBJECTIONS } from "@/lib/objections";

const inputCls =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-brand/30 focus:border-brand transition";

export default function ObjectionTrainer() {
  const [selectedId, setSelectedId] = useState(OBJECTIONS[0].id);
  const [responseIdx, setResponseIdx] = useState(0);

  const objection = OBJECTIONS.find((o) => o.id === selectedId)!;
  const response = objection.responses[responseIdx];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setResponseIdx(0);
  };

  const handleNextResponse = () => {
    setResponseIdx((prev) => (prev + 1) % objection.responses.length);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2">Choose an objection</label>
        <select className={inputCls} value={selectedId} onChange={(e) => handleSelect(e.target.value)}>
          {OBJECTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Customer Line */}
      <div className="bg-ink text-white rounded-2xl p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 font-semibold">
          Customer says…
        </p>
        <p className="text-base leading-relaxed">&ldquo;{objection.customerLine}&rdquo;</p>
      </div>

      {/* Rep Response */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-card">
        <div>
          <p className="text-xs font-bold text-brand uppercase tracking-wide mb-1">Rep response</p>
          <p className="text-ink text-sm leading-relaxed">&ldquo;{response.repResponse}&rdquo;</p>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Follow-up question</p>
          <p className="text-ink text-sm leading-relaxed">&ldquo;{response.followUp}&rdquo;</p>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Closing line</p>
          <p className="text-ink text-sm leading-relaxed">&ldquo;{response.close}&rdquo;</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleNextResponse}
          className="bg-brand hover:bg-brand-dark text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-card active:scale-[0.99] transition-all"
        >
          Give me another response
        </button>
        <span className="text-xs text-gray-400">
          Variation {responseIdx + 1} of {objection.responses.length}
        </span>
      </div>
    </div>
  );
}
