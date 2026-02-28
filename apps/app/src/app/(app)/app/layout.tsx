import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import AppShell from "@/components/layout/AppShell";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    const h = await headers();

    const nextUrl =
      h.get("next-url") ??
      h.get("x-invoke-path") ??
      (() => {
        const ref = h.get("referer");
        if (!ref) return null;
        try {
          const u = new URL(ref);
          return u.pathname + u.search;
        } catch {
          return null;
        }
      })() ??
      "/app/dashboard";

    redirect(`/login?next=${encodeURIComponent(nextUrl)}`);
  }

  return <AppShell>{children}</AppShell>;
}
