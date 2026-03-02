import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <h1 className="text-4xl font-semibold tracking-tight">Livd</h1>
      <p className="text-gray-500">Public landing page. App lives under /app.</p>
      <Link className="underline" href="/app">Go to app</Link>
    </div>
  );
}
