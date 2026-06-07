"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/app", label: "Home" },
  { href: "/app/quote-builder", label: "Quote" },
  { href: "/app/saved-quotes", label: "Saved" },
  { href: "/app/practice", label: "Practice" },
  { href: "/app/plan-explainer", label: "Plans" },
  { href: "/app/daily-drill", label: "Drill" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-1 overflow-x-auto">
        <Link
          href="/"
          className="font-bold text-indigo-400 text-sm whitespace-nowrap pr-3 py-3 shrink-0 hover:text-indigo-300"
        >
          📡 Quote Coach
        </Link>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm px-3 py-3 whitespace-nowrap transition-colors ${
              pathname === l.href
                ? "text-white border-b-2 border-indigo-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
