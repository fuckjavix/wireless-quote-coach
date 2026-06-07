import Nav from "@/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="text-center text-xs text-slate-400 py-4 px-4">
        Unofficial training and quote-planning tool. Pricing estimates must be verified with the carrier&apos;s official systems.
      </footer>
    </>
  );
}
