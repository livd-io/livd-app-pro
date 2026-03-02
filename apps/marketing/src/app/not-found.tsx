export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-500">Page not found.</p>
      <a href="/" className="text-blue-500 underline">
        Go home
      </a>
    </section>
  );
}
