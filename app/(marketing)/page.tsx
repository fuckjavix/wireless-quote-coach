import Link from "next/link";
import FAQ from "@/components/FAQ";

const features = [
  {
    icon: "🧮",
    title: "Build a quote in 60 seconds",
    desc: "Add the device, trade-in, and plan — see the monthly total and due-today update instantly while the customer watches.",
  },
  {
    icon: "🎯",
    title: "Win the objection",
    desc: "Ready responses for 'too expensive,' 'let me think about it,' and 'I saw it cheaper online' — with follow-ups and closes.",
  },
  {
    icon: "📋",
    title: "Explain plans in plain English",
    desc: "Turn any plan's fine print into a simple pitch your customer actually understands and trusts.",
  },
  {
    icon: "📁",
    title: "Save and reopen quotes",
    desc: "Every quote is saved so you can reopen it, adjust the numbers, and pick up right where you left off.",
  },
  {
    icon: "🔥",
    title: "Sharpen with daily drills",
    desc: "A fresh scenario every day keeps your pitch sharp so you're ready before the customer walks in.",
  },
  {
    icon: "💬",
    title: "Customer-ready scripts",
    desc: "Every quote generates a clean, plain-English script you can read straight to your customer.",
  },
];

const audiences = [
  { icon: "🧑‍💼", title: "Frontline sales reps", desc: "Quote faster and sound confident on every pricing question." },
  { icon: "🏪", title: "Indirect & retailer reps", desc: "One simple tool that works on any phone, on any sales floor." },
  { icon: "📊", title: "Store managers", desc: "Get new reps quoting and handling objections sooner." },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-tint to-white" />
        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
          <span className="inline-block text-xs font-bold text-brand bg-white border border-brand/20 rounded-full px-3 py-1 mb-5">
            Built for the sales floor, not the back office
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink tracking-tight leading-tight">
            Quote faster. Explain plans clearer.
            <br className="hidden sm:block" /> Close with more confidence.
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Wireless Quote Coach helps reps build clean customer quotes, practice the tough
            conversations, and explain monthly pricing in plain English — all from your phone.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/app"
              className="bg-brand hover:bg-brand-dark text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors shadow-card"
            >
              Open App
            </Link>
            <a
              href="#features"
              className="bg-white border border-gray-300 hover:border-brand/40 text-ink font-bold px-7 py-3.5 rounded-xl text-base transition-colors"
            >
              View Demo
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">No login required · Works right in your browser</p>
        </div>
      </section>

      {/* What the app does */}
      <section id="features" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink tracking-tight">Everything a rep needs to sell with confidence</h2>
          <p className="text-gray-600 mt-3">Six tools that turn a hesitant pitch into a smooth close.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card hover:shadow-pop hover:border-brand/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-brand-tint flex items-center justify-center text-2xl mb-3">
                {f.icon}
              </div>
              <h3 className="font-bold text-ink text-base">{f.title}</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section id="who" className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink tracking-tight">Who it&apos;s for</h2>
            <p className="text-gray-600 mt-3">Built for everyone selling wireless, on any floor.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {audiences.map((a) => (
              <div key={a.title} className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-card">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="font-bold text-ink">{a.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-ink tracking-tight">Frequently asked questions</h2>
        </div>
        <FAQ />
      </section>

      {/* Disclaimer */}
      <section id="disclaimer" className="max-w-3xl mx-auto px-4 pb-4">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-semibold text-ink">Disclaimer:</span> Unofficial training and
            quote-planning tool. Not affiliated with Verizon, AT&amp;T, T-Mobile, or any carrier.
            Pricing estimates must be verified with the carrier&apos;s official systems.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-ink rounded-3xl px-6 py-14 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-brand/25 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight">Ready to quote faster?</h2>
            <p className="mt-3 text-gray-300 max-w-xl mx-auto">
              Open the app in your browser and build your first quote in under a minute — no login needed.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/app"
                className="bg-brand hover:bg-brand-dark text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
              >
                Open App
              </Link>
              <a
                href="#features"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
              >
                View Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
