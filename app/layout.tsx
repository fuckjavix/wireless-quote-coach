import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wireless Quote Coach",
  description:
    "A simple quote-planning and sales training tool for wireless sales reps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-100">{children}</body>
    </html>
  );
}
