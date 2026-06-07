import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-slate-800">
      <MarketingHeader />
      <main>{children}</main>
      <footer className="bg-slate-900 text-slate-400 mt-24">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-sm">
              <p className="font-bold text-white text-lg flex items-center gap-1.5">
                <span>📡</span> Wireless Quote Coach
              </p>
              <p className="text-sm mt-2 leading-relaxed">
                The fastest way for wireless reps to build quotes, handle objections, and explain
                pricing in plain English.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="space-y-2">
                <p className="text-white font-semibold mb-1">Product</p>
                <a href="#features" className="block hover:text-white">Features</a>
                <a href="#pricing" className="block hover:text-white">Pricing</a>
                <Link href="/app" className="block hover:text-white">Open the app</Link>
              </div>
              <div className="space-y-2">
                <p className="text-white font-semibold mb-1">Company</p>
                <a href="#demo" className="block hover:text-white">Book a demo</a>
                <a href="#faq" className="block hover:text-white">FAQ</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-10 pt-6 text-xs leading-relaxed">
            <p>
              Unofficial training and quote-planning tool. Not affiliated with, endorsed by, or
              sponsored by Verizon, AT&amp;T, T-Mobile, or any carrier. Pricing estimates must be
              verified with the carrier&apos;s official systems.
            </p>
            <p className="mt-2">© {new Date().getFullYear()} Wireless Quote Coach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
