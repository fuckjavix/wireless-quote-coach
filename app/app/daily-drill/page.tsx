import DailyDrill from "@/components/DailyDrill";

export default function DailyDrillPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-800">Daily Drill</h1>
        <p className="text-slate-500 text-sm mt-1">
          Practice your sales skills with a random scenario and objection.
        </p>
      </div>
      <DailyDrill />
    </div>
  );
}
