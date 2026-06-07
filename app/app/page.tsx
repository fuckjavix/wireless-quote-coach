import DashboardCard from "@/components/DashboardCard";

const cards = [
  {
    href: "/app/quote-builder",
    icon: "💰",
    title: "Build a Quote",
    description: "Build a custom wireless quote with device payments, plans, and perks.",
    color: "bg-indigo-50",
  },
  {
    href: "/app/practice",
    icon: "🎯",
    title: "Practice Objections",
    description: "Get ready for the tough ones — price, competition, spouses, and more.",
    color: "bg-emerald-50",
  },
  {
    href: "/app/plan-explainer",
    icon: "📋",
    title: "Plan Explainer",
    description: "Turn any plan's features into plain English your customer will actually understand.",
    color: "bg-amber-50",
  },
  {
    href: "/app/saved-quotes",
    icon: "📁",
    title: "Saved Quotes",
    description: "View and manage all the quotes you've built and saved.",
    color: "bg-sky-50",
  },
  {
    href: "/app/daily-drill",
    icon: "🔥",
    title: "Daily Drill",
    description: "Get a random customer scenario and sharpen your response skills.",
    color: "bg-rose-50",
  },
];

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, rep 👋</h1>
        <p className="text-slate-500 mt-1 text-sm">
          What do you want to work on today?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <DashboardCard key={card.href} {...card} />
        ))}
      </div>
    </div>
  );
}
