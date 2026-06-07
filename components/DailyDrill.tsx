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
      {/* Current Drill */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">Today&apos;s Scenario</h3>
          <button
            onClick={handleNewDrill}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            🔄 New Drill
          </button>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
          <p className="text-xs font-medium text-rose-600 uppercase tracking-wide mb-1">Scenario</p>
          <p className="text-rose-900 text-sm leading-relaxed">{drill.scenario}</p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
          <p className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">Customer Objection</p>
          <p className="text-orange-900 text-sm">&ldquo;{drill.objection}&rdquo;</p>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">Your Goal</p>
          <p className="text-indigo-900 text-sm">{drill.goal}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Your Response
          </label>
          <textarea
            rows={4}
            value={response}
            onChange={(e) => {
              setResponse(e.target.value);
              setSaved(false);
            }}
            placeholder="Type your response here — how would you handle this scenario?"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition w-full resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!response.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium py-2.5 px-5 rounded-xl text-sm transition-colors"
        >
          {saved ? "✓ Saved!" : "Save Response"}
        </button>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-700 text-sm mb-3">Past Responses ({history.length})</h3>
          <div className="space-y-3">
            {history.slice(0, 5).map((d) => (
              <div key={d.id} className="bg-white rounded-xl border border-slate-200 p-4 text-sm">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-slate-500 text-xs">{new Date(d.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-slate-600 text-xs italic mb-1">&ldquo;{d.objection}&rdquo;</p>
                <p className="text-slate-800">{d.repResponse}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
