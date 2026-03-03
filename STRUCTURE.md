# Repository Structure

This is a multi-app monorepo. Each app lives under `apps/` and is an independent Next.js project with its own `package.json`, dependencies, and build pipeline.

```
livd-app-pro/                          ← repo root
├── .github/
│   └── workflows/
│       └── ci.yml                     ← GitHub Actions CI: lints + builds both apps on every PR/push to main
├── apps/
│   ├── app/                           ← Main product application (Next.js 16 / App Router)
│   │   ├── public/                    ← Static assets served at /
│   │   │   ├── livd_logo.png          ← Livd logo (used on the login page)
│   │   │   ├── file.svg
│   │   │   ├── globe.svg
│   │   │   ├── next.svg
│   │   │   ├── vercel.svg
│   │   │   └── window.svg
│   │   ├── src/
│   │   │   ├── app/                   ← Next.js App Router root
│   │   │   │   ├── (app)/             ← Route group: authenticated app shell
│   │   │   │   │   ├── layout.tsx     ← Wraps authenticated pages with <AppShell>
│   │   │   │   │   └── app/           ← All /app/* pages
│   │   │   │   │       ├── layout.tsx ← Inner layout (currently a passthrough)
│   │   │   │   │       ├── dashboard/
│   │   │   │   │       │   └── page.tsx   ← /app/dashboard — main dashboard view
│   │   │   │   │       ├── settings/
│   │   │   │   │       │   └── page.tsx   ← /app/settings — account/org settings
│   │   │   │   │       └── users/
│   │   │   │   │           └── page.tsx   ← /app/users — user management (ADMIN+)
│   │   │   │   ├── (auth)/            ← Route group: unauthenticated / login flow
│   │   │   │   │   ├── layout.tsx     ← Minimal layout for auth pages
│   │   │   │   │   └── login/
│   │   │   │   │       ├── page.tsx       ← /login — server component, renders LoginForm
│   │   │   │   │       └── LoginForm.tsx  ← Client component: email/password form via Supabase Auth
│   │   │   │   ├── (public)/          ← Route group: public-facing catch-all
│   │   │   │   │   └── page.tsx       ← / root redirect (sends unauthenticated users to /login)
│   │   │   │   ├── api/
│   │   │   │   │   └── whoami/
│   │   │   │   │       └── route.ts   ← GET /api/whoami — returns current Supabase session user
│   │   │   │   ├── favicon.ico
│   │   │   │   ├── globals.css        ← Tailwind base + custom CSS variables (colours, glow effects)
│   │   │   │   ├── layout.tsx         ← Root layout: sets fonts (Geist), wraps entire tree
│   │   │   │   └── page.tsx           ← Catch-all root page (redirects to /app/dashboard or /login)
│   │   │   ├── components/
│   │   │   │   └── layout/
│   │   │   │       └── AppShell.tsx   ← Responsive sidebar + top-bar shell used by all authenticated pages
│   │   │   ├── lib/
│   │   │   │   ├── current-user.ts    ← Helper: returns the currently authenticated user (role, email, id)
│   │   │   │   ├── nav.ts             ← NAV_ITEMS array — sidebar links filtered by RBAC role
│   │   │   │   └── supabase/
│   │   │   │       ├── client.ts      ← createBrowserSupabaseClient() for client components
│   │   │   │       └── server.ts      ← createServerSupabaseClient() for server components / route handlers
│   │   │   └── types/
│   │   │       └── rbac.ts            ← Role union type: "SUPER_ADMIN" | "ADMIN" | "CUSTOMER"
│   │   ├── tests/
│   │   │   └── auth.spec.ts           ← Playwright end-to-end test: login flow
│   │   ├── .gitignore
│   │   ├── eslint.config.mjs          ← ESLint 9 flat config (eslint-config-next core-web-vitals + typescript)
│   │   ├── next.config.ts             ← Next.js config
│   │   ├── package.json               ← App dependencies (Next, React, Supabase, Headless UI, Heroicons, Tailwind)
│   │   ├── package-lock.json
│   │   ├── playwright.config.js       ← Playwright config for E2E tests
│   │   ├── postcss.config.mjs         ← PostCSS config (Tailwind v4 plugin)
│   │   ├── tailwind.config.mjs        ← Tailwind config (custom colour palette, glow utilities)
│   │   └── tsconfig.json              ← TypeScript config (paths alias: @/ → src/)
│   │
│   └── marketing/                     ← Public marketing site (Next.js 16 / App Router)
│       ├── src/
│       │   └── app/                   ← Next.js App Router root
│       │       ├── (marketing)/       ← Route group: all public marketing pages
│       │       │   ├── layout.tsx     ← Marketing-specific layout wrapper
│       │       │   └── page.tsx       ← / home page — "Livd Marketing — Coming soon"
│       │       ├── globals.css        ← Tailwind base styles
│       │       ├── layout.tsx         ← Root layout: sets fonts, wraps entire tree
│       │       └── not-found.tsx      ← Custom 404 page (uses Next.js <Link> for navigation)
│       ├── .gitignore
│       ├── eslint.config.mjs          ← ESLint 9 flat config (eslint-config-next core-web-vitals + typescript)
│       ├── next.config.ts             ← Next.js config
│       ├── package.json               ← App dependencies (Next, React, Tailwind — no Supabase)
│       ├── package-lock.json
│       ├── postcss.config.mjs         ← PostCSS config (Tailwind v4 plugin)
│       ├── tailwind.config.mjs        ← Tailwind config
│       └── tsconfig.json              ← TypeScript config
│
├── .gitignore                         ← Repo-level gitignore (node_modules, .next, .turbo, etc.)
├── README.md                          ← Quick-start guide (dev commands, env vars, deploy notes)
└── STRUCTURE.md                       ← This file
```

---

## Key architectural notes

| Concern | Detail |
|---|---|
| **Monorepo style** | Independent apps, no shared packages yet. No Turborepo / Nx config at root level — CI runs each app's `npm ci` separately. |
| **Framework** | Next.js 16 (App Router) with React 19 in both apps. |
| **Styling** | Tailwind CSS v4 via the `@tailwindcss/postcss` plugin. Custom colour palette defined in `apps/app/tailwind.config.mjs`. |
| **Auth (app only)** | Supabase Auth via `@supabase/ssr`. Browser client in `src/lib/supabase/client.ts`, server client in `src/lib/supabase/server.ts`. Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. |
| **RBAC (app only)** | Three roles: `SUPER_ADMIN`, `ADMIN`, `CUSTOMER`. Role type in `src/types/rbac.ts`. Navigation filtered per-role in `src/lib/nav.ts`. |
| **Route groups** | `(app)` — authenticated shell; `(auth)` — login; `(public)` — root redirect. Parentheses are Next.js conventions and don't appear in the URL. |
| **CI** | `.github/workflows/ci.yml` runs `npm ci && npm run lint && npm run build` for each app as a matrix job on every PR and push to `main`. |
| **E2E tests** | Playwright spec at `apps/app/tests/auth.spec.ts`. Requires a running dev server + real Supabase credentials; not run in CI currently. |
| **Deployment** | Hosted on Vercel. Active project: `livd-io-livd-app-pro`. The `main` branch deploys to production; PRs create preview deployments. |
