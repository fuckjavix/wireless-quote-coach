import PlanExplainer from "@/components/PlanExplainer";
import PageHeader from "@/components/PageHeader";

export default function PlanExplainerPage() {
  return (
    <div>
      <PageHeader
        title="Plan Explainer"
        subtitle="Pick a preset or fill in the details to get plain-English talking points."
      />
      <PlanExplainer />
    </div>
  );
}
