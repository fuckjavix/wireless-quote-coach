import Link from "next/link";

interface DashboardCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export default function DashboardCard({ href, icon, title, description, color }: DashboardCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all">
        <div className={`text-3xl mb-3 w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="font-semibold text-slate-800 text-base mb-1 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-snug">{description}</p>
      </div>
    </Link>
  );
}
