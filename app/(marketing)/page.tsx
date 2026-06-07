import Link from "next/link";
import FAQ from "@/components/FAQ";

const features = [
  {
    title: "Build a quote in 60 seconds",
    desc: "Drop in the device, trade-in, and plan — see the monthly total and due-today update instantly while the customer watches.",
    icon: "💰",
  },
  {
    title: "Win the objection",
    desc: "Real responses for 'too expensive,' 'let me think about it,' and 'I saw it cheaper online' — with follow-ups and closes.",
    icon: "🎯",
  },
  {
    title: "Explain it in plain English",
    desc: "Turn any plan's fine print into a simple pitch your customer actually understands and trusts.",
    icon: "📋",
  },
  {
    title: "Save every quote",
    desc: "Every quote you build is saved so you can reopen it, tweak the numbers, and pick up right where you left off.",
    icon: "📁",
  },
  {
    title: "Practice every day",
    desc: "Daily drills with random scenarios keep your team sharp so they're ready before the customer walks in.",
    icon: "🔥",
  },
];

const comparison = [
  { feature: "Quote builder", starter: true, team: true, store: true },
  { feature: "Objection trainer", starter: true, team: true, store: true },
  { feature: "Plan explainer", starter: true, team: true, store: true },
  { feature: "Daily drills", starter: true, team: true, store: true },
  { feature: "Cloud sync across devices", starter: false, team: true, store: true },
  { feature: "Shared team objection scripts", starter: false, team: true, store: true },
  { feature: "Manager dashboard & team activity", starter: false, team: false, store: true },
  { feature: "Custom store branding", starter: false, team: false, store: true },
  { feature: "Priority support", starter: false, team: false, store: true },
];

const tiers = [
  {
    name: "Starter",
    price: "$0",
    cadence: "free forever",
    blurb: "For the individual rep who wants to quote faster today.",
    cta: "Start Free",
    href: "/app",
    highlight: false,
    perks: [
      "Unlimited quotes (saved on your device)",
      "Objection trainer",
      "Plan explainer",
      "Daily drills",
    ],
  },
  {
    name: "Team",
    price: "$12",
    cadence: "per rep / month",
    blurb: "For reps who want their quotes and scripts everywhere they sell.",
    cta: "Start Free Trial",
    href: "/app",
    highlight: true,
    perks: [
      "Everything in Starter",
      "Cloud sync across all your devices",
      "Shared team objection scripts",
      "Quote history & search",
    ],
  },
  {
    name: "Store",
    price: "$39",
    cadence: "per store / month",
    blurb: "For managers running a whole floor of reps.",
    cta: "Book a Demo",
    href: "#demo",
    highlight: false,
    perks: [
      "Everything in Team",
      "Manager dashboard & team activity",
      "Custom store branding",
      "Priority support & onboarding",
    ],
  },
];

const testimonials = [
  {
    quote:
      "My new reps used to freeze on pricing. Now they build the quote right in front of the customer and the close rate speaks for itself.",
    name: "Store Manager",
    role: "Authorized Retailer · 6 locations",
  },
  {
    quote:
      "The objection trainer is basically a pocket sales coach. I run a quick drill before every shift.",
    name: "Wireless Sales Rep",
    role: "Indirect Channel",
  },
  {
    quote:
      "Cut my quoting time in half and stopped fumbling the 'why is my bill different' conversation. Customers trust the breakdown.",
    name: "Senior Rep",
    role: "Big-box Wireless Counter",
  },
];

function Check({ on }: { on: boolean }) {
  return on ? (
    <span className="text-emerald-500 font-bold">✓</span>
  ) : (
    <span className="text-slate-300">—</span>
  );
}

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white" />
        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
          <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full px-3 py-1 mb-5">
            Built for the sales floor, not the back office
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Quote faster. Handle objections.
            <br className="hidden sm:block" /> Close more wireless deals.
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Wireless Quote Coach helps reps build clean customer quotes, practice the tough
            conversations, and explain monthly pricing in plain English — all from your phone.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/app"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-colors shadow-sm"
            >
              Open App
            </Link>
            <a
              href="#features"
              className="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-7 py-3.5 rounded-xl text-base transition-colors"
            >
              View Demo
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">No login required · Works right in your browser</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Everything a rep needs to sell with confidence</h2>
          <p className="text-slate-600 mt-3">Everything you need to turn a hesitant pitch into a smooth close.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-slate-900 text-lg">{f.title}</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature comparison */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Compare plans</h2>
            <p className="text-slate-600 mt-3">Start free. Upgrade when your team is ready.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="text-left font-semibold px-4 py-3">Feature</th>
                  <th className="font-semibold px-4 py-3 text-center">Starter</th>
                  <th className="font-semibold px-4 py-3 text-center text-indigo-600">Team</th>
                  <th className="font-semibold px-4 py-3 text-center">Store</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 text-slate-700">{row.feature}</td>
                    <td className="px-4 py-3 text-center"><Check on={row.starter} /></td>
                    <td className="px-4 py-3 text-center bg-indigo-50/40"><Check on={row.team} /></td>
                    <td className="px-4 py-3 text-center"><Check on={row.store} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Simple, honest pricing</h2>
          <p className="text-slate-600 mt-3">No long contracts. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-6 flex flex-col ${
                t.highlight
                  ? "bg-slate-900 text-white shadow-xl md:-mt-3 ring-2 ring-indigo-500"
                  : "bg-white border border-slate-200 shadow-sm"
              }`}
            >
              {t.highlight && (
                <span className="self-start text-xs font-semibold bg-indigo-500 text-white rounded-full px-3 py-1 mb-3">
                  Most popular
                </span>
              )}
              <h3 className={`font-bold text-lg ${t.highlight ? "text-white" : "text-slate-900"}`}>
                {t.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{t.price}</span>
                <span className={`text-sm ${t.highlight ? "text-slate-300" : "text-slate-500"}`}>
                  {t.cadence}
                </span>
              </div>
              <p className={`mt-3 text-sm ${t.highlight ? "text-slate-300" : "text-slate-600"}`}>
                {t.blurb}
              </p>
              <ul className="mt-5 space-y-2.5 flex-1">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span className={t.highlight ? "text-slate-200" : "text-slate-700"}>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={t.href}
                className={`mt-6 text-center font-semibold py-3 rounded-xl text-sm transition-colors ${
                  t.highlight
                    ? "bg-indigo-500 hover:bg-indigo-400 text-white"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Loved by reps and managers</h2>
            <p className="text-slate-600 mt-3">
              Placeholder reviews — swap in real quotes from your team as you roll out.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="text-amber-400 mb-3">★★★★★</div>
                <p className="text-slate-700 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Frequently asked questions</h2>
        </div>
        <FAQ />
      </section>

      {/* Final CTA / Demo */}
      <section id="demo" className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-indigo-600 rounded-3xl px-6 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to quote faster?</h2>
          <p className="mt-3 text-indigo-100 max-w-xl mx-auto">
            Open the app in your browser and build your first quote in under a minute — no login needed.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/app"
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Open App
            </Link>
            <a
              href="#features"
              className="bg-indigo-500 hover:bg-indigo-400 border border-indigo-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
