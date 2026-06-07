import ObjectionTrainer from "@/components/ObjectionTrainer";
import PageHeader from "@/components/PageHeader";

export default function PracticeObjectionsPage() {
  return (
    <div>
      <PageHeader
        title="Practice Objections"
        subtitle="Pick an objection and rehearse your response until it feels natural."
      />
      <ObjectionTrainer />
    </div>
  );
}
