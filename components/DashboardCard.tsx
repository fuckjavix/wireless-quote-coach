import Link from "next/link";

interface DashboardCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  /** Make this the large, full-width "primary" card. */
  primary?: boolean;
}

export default function DashboardCard({
  href,
  icon,
  title,
  description,
  cta,
  primary,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-2xl border shadow-card hover:shadow-pop hover:-translate-y-0.5 transition-all duration-200 ${
        primary
          ? "bg-ink border-ink text-white p-6 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6"
          : "bg-white border-gray-200/80 hover:border-brand/40 p-5"
      }`}
    >
      <div
        className={`shrink-0 rounded-2xl flex items-center justify-center mb-4 ${
          primary ? "w-14 h-14 text-3xl bg-brand mb-0" : "w-12 h-12 text-2xl bg-brand-tint"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 flex flex-col">
        <h3
          className={`font-bold tracking-tight ${
            primary
              ? "text-white text-xl"
              : "text-ink text-base group-hover:text-brand transition-colors"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 leading-relaxed flex-1 ${
            primary ? "text-gray-300 text-sm" : "text-gray-500 text-sm"
          }`}
        >
          {description}
        </p>
        <span
          className={`mt-4 inline-flex items-center gap-1.5 font-semibold ${
            primary ? "text-white text-sm" : "text-brand text-sm"
          }`}
        >
          {cta}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
