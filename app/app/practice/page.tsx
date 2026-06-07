import ObjectionTrainer from "@/components/ObjectionTrainer";

export default function PracticeObjectionsPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-800">Practice Objections</h1>
        <p className="text-slate-500 text-sm mt-1">
          Pick an objection and practice your response until it feels natural.
        </p>
      </div>
      <ObjectionTrainer />
    </div>
  );
}
