import DailyDrill from "@/components/DailyDrill";
import PageHeader from "@/components/PageHeader";

export default function DailyDrillPage() {
  return (
    <div>
      <PageHeader
        title="Daily Drill"
        subtitle="A fresh scenario and objection to keep your pitch sharp."
      />
      <DailyDrill />
    </div>
  );
}
