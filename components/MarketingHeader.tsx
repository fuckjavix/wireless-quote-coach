"use client";
import Link from "next/link";

export default function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-ink text-lg flex items-center gap-1.5 tracking-tight">
          <span className="text-brand">●</span> Wireless Quote Coach
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-ink transition-colors">Features</a>
          <a href="#who" className="hover:text-ink transition-colors">Who it&apos;s for</a>
          <a href="#faq" className="hover:text-ink transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#features"
            className="hidden sm:inline-block text-sm font-semibold text-ink hover:text-brand px-3 py-2 transition-colors"
          >
            View Demo
          </a>
          <Link
            href="/app"
            className="text-sm font-bold bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg transition-colors"
          >
            Open App
          </Link>
        </div>
      </div>
    </header>
  );
}
