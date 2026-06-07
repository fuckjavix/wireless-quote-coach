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
    <nav className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <Link
          href="/"
          className="flex items-center gap-2 whitespace-nowrap pr-5 py-3.5 shrink-0 font-extrabold text-ink"
        >
          <span className="text-brand text-base leading-none">●</span>
          <span className="text-sm tracking-tight">Quote Coach</span>
        </Link>
        {links.map((l) => {
          const active = l.href === "/app" ? pathname === "/app" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm font-semibold px-3 py-3.5 whitespace-nowrap transition-colors ${
                active ? "text-brand" : "text-gray-500 hover:text-ink"
              }`}
            >
              {l.label}
              {active && (
                <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-brand rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
