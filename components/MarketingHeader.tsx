"use client";
import Link from "next/link";

export default function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-slate-900 text-lg flex items-center gap-1.5">
          <span>📡</span> Wireless Quote Coach
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-slate-900 transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#features"
            className="hidden sm:inline-block text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2"
          >
            View Demo
          </a>
          <Link
            href="/app"
            className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Open App
          </Link>
        </div>
      </div>
    </header>
  );
}
