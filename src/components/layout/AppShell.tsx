import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { getCurrentUser } from "@/lib/current-user";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  const items = NAV_ITEMS.filter(i => i.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="font-semibold">Livd</div>
          <div className="text-sm text-gray-500">{user.email} · {user.role}</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-12 md:col-span-3">
          <nav className="space-y-1 rounded-lg border p-2">
            {items.map(item => (
              <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="col-span-12 md:col-span-9">
          <div className="rounded-lg border p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
