import PlanExplainer from "@/components/PlanExplainer";

export default function PlanExplainerPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-800">Plan Explainer</h1>
        <p className="text-slate-500 text-sm mt-1">
          Fill in the plan details and get plain-English talking points for your customer.
        </p>
      </div>
      <PlanExplainer />
    </div>
  );
}
