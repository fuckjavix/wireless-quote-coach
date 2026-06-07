import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  /** Show the "← Dashboard" back link (default true). */
  back?: boolean;
}

export default function PageHeader({ title, subtitle, back = true }: Props) {
  return (
    <div className="mb-5">
      {back && (
        <Link
          href="/app"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-brand transition-colors mb-2"
        >
          ← Dashboard
        </Link>
      )}
      <h1 className="text-2xl font-bold text-ink tracking-tight">{title}</h1>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}
