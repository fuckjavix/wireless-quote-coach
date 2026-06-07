import DashboardCard from "@/components/DashboardCard";

const cards = [
  {
    href: "/app/quote-builder",
    icon: "🧮",
    title: "Build a Quote",
    description: "Build a clean customer quote with device payments, plans, and trade-ins — plus a ready-to-read script.",
    cta: "Start a quote",
    primary: true,
  },
  {
    href: "/app/saved-quotes",
    icon: "📁",
    title: "Saved Quotes",
    description: "Reopen, edit, and review every quote you've built.",
    cta: "View quotes",
  },
  {
    href: "/app/practice",
    icon: "🎯",
    title: "Practice Objections",
    description: "Rehearse the tough ones — price, competition, and more.",
    cta: "Practice now",
  },
  {
    href: "/app/plan-explainer",
    icon: "📋",
    title: "Plan Explainer",
    description: "Turn any plan into plain English a customer will get.",
    cta: "Explain a plan",
  },
  {
    href: "/app/daily-drill",
    icon: "🔥",
    title: "Daily Drill",
    description: "A fresh scenario every day to keep your pitch sharp.",
    cta: "Run today's drill",
  },
];

export default function Dashboard() {
  return (
    <div>
      {/* Welcome hero */}
      <section className="bg-ink rounded-3xl p-7 sm:p-9 mb-8 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-52 h-52 bg-brand/25 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-brand font-bold text-xs uppercase tracking-widest mb-2">
            Wireless Quote Coach
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]">
            Build quotes faster. Explain plans clearer.
            <br className="hidden sm:block" /> Close with more confidence.
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-md">
            Your sales command center — pick a tool below to get started.
          </p>
        </div>
      </section>

      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
        Your tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <DashboardCard key={card.href} {...card} />
        ))}
      </div>
    </div>
  );
}
