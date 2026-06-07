"use client";
import { useState } from "react";
import { DrillResponse } from "@/lib/types";
import { DRILL_SCENARIOS, DRILL_OBJECTIONS, DRILL_GOALS, getRandomItem } from "@/lib/drills";
import { saveDrillResponse, getDrillResponses } from "@/lib/storage";

function newDrill() {
  return {
    scenario: getRandomItem(DRILL_SCENARIOS),
    objection: getRandomItem(DRILL_OBJECTIONS),
    goal: getRandomItem(DRILL_GOALS),
  };
}

export default function DailyDrill() {
  const [drill, setDrill] = useState(newDrill);
  const [response, setResponse] = useState("");
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<DrillResponse[]>(() => getDrillResponses());

  const handleSave = () => {
    const record: DrillResponse = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...drill,
      repResponse: response,
    };
    saveDrillResponse(record);
    setHistory(getDrillResponses());
    setSaved(true);
  };

  const handleNewDrill = () => {
    setDrill(newDrill());
    setResponse("");
    setSaved(false);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-ink text-sm">Today&apos;s scenario</h3>
          <button
            onClick={handleNewDrill}
            className="text-xs text-brand hover:text-brand-dark font-semibold transition-colors"
          >
            🔄 New drill
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Scenario</p>
          <p className="text-ink text-sm leading-relaxed">{drill.scenario}</p>
        </div>

        <div className="bg-brand-tint border border-brand/20 rounded-xl p-4">
          <p className="text-xs font-bold text-brand uppercase tracking-wide mb-1">Customer objection</p>
          <p className="text-ink text-sm">&ldquo;{drill.objection}&rdquo;</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Your goal</p>
          <p className="text-ink text-sm">{drill.goal}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">Your response</label>
          <textarea
            rows={4}
            value={response}
            onChange={(e) => {
              setResponse(e.target.value);
              setSaved(false);
            }}
            placeholder="Type your response — how would you handle this?"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-brand/30 focus:border-brand transition resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!response.trim()}
          className="bg-brand hover:bg-brand-dark disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-card active:scale-[0.99] transition-all"
        >
          {saved ? "✓ Saved" : "Save response"}
        </button>
      </div>

      {history.length > 0 && (
        <div>
          <h3 className="font-bold text-ink text-sm mb-3">Past responses ({history.length})</h3>
          <div className="space-y-3">
            {history.slice(0, 5).map((d) => (
              <div key={d.id} className="bg-white rounded-xl border border-gray-200 p-4 text-sm">
                <p className="text-gray-400 text-xs mb-1">{new Date(d.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-500 text-xs italic mb-1">&ldquo;{d.objection}&rdquo;</p>
                <p className="text-ink">{d.repResponse}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
