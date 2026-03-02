"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log({ data, error });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.replace(next || "/app/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-livd-lux overlay-livd-glow glow-tl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto mb-6">
            <Image
              src="/livd_logo.png"
              alt="Livd"
              width={127}
              height={40}
              priority
              className="mx-auto h-auto w-auto"
            />
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-neutral-100">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 backdrop-blur">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-200">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-neutral-900/40 px-3 py-2 text-sm text-neutral-100 ring-1 ring-inset ring-neutral-700/60 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-primary-500/60"
                  placeholder="you@youremail.com"
                  data-testid="login-email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-200">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-primary-300 hover:text-primary-200">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-neutral-900/40 px-3 py-2 text-sm text-neutral-100 ring-1 ring-inset ring-neutral-700/60 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-primary-500/60"
                  placeholder="••••••••"
                  data-testid="login-password"
                />
              </div>
            </div>

            {errorMsg && <p className="text-sm text-red-400" data-testid="login-error">{errorMsg}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-md bg-sky-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 disabled:opacity-60"
                data-testid="login-submit"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-400">
            Not a member?{" "}
            <Link href="#" className="font-semibold text-primary-300 hover:text-primary-200">
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
