import Nav from "@/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="border-t border-gray-200 bg-white">
        <p className="text-center text-xs text-gray-400 max-w-2xl mx-auto py-5 px-4 leading-relaxed">
          Unofficial training and quote-planning tool. Pricing estimates must be verified with the
          carrier&apos;s official systems.
        </p>
      </footer>
    </>
  );
}
