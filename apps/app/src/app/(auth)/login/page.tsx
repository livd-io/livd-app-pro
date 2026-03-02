

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export default async function LoginPage(props: { searchParams?: { next?: string } }) {
  const searchParams = await props.searchParams;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  let next = searchParams?.next || "/app/dashboard";
  if (!next || next.startsWith("/login")) {
    next = "/app/dashboard";
  }

  // Fail-closed: if auth check errors, treat as logged out
  if (error) {
    return <LoginForm next={next} />;
  }

  if (user) {
    redirect(next);
  }

  return <LoginForm next={next} />;
}
