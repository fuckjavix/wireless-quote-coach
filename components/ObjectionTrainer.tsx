"use client";
import { useState } from "react";
import { OBJECTIONS } from "@/lib/objections";

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
        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
          Choose an Objection
        </label>
        <select
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value)}
        >
          {OBJECTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Customer Line */}
      <div className="bg-slate-800 text-white rounded-2xl p-5">
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-2 font-medium">
          Customer says...
        </p>
        <p className="text-base leading-relaxed">&ldquo;{objection.customerLine}&rdquo;</p>
      </div>

      {/* Rep Response */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <div>
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">Rep Response</p>
          <p className="text-slate-700 text-sm leading-relaxed">&ldquo;{response.repResponse}&rdquo;</p>
        </div>
        <div className="border-t border-slate-100 pt-3">
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">Follow-up Question</p>
          <p className="text-slate-700 text-sm leading-relaxed">&ldquo;{response.followUp}&rdquo;</p>
        </div>
        <div className="border-t border-slate-100 pt-3">
          <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">Closing Line</p>
          <p className="text-slate-700 text-sm leading-relaxed">&ldquo;{response.close}&rdquo;</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleNextResponse}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl text-sm transition-colors"
        >
          Give me another response
        </button>
        <span className="text-xs text-slate-400">
          Variation {responseIdx + 1} of {objection.responses.length}
        </span>
      </div>
    </div>
  );
}
