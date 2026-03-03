export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        {/* Header placeholder */}
        <div className="px-6 py-4 border-b">
          <span className="font-semibold">Livd</span>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        {/* Footer placeholder */}
        <div className="px-6 py-4 border-t text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Livd
        </div>
      </footer>
    </>
  );
}
