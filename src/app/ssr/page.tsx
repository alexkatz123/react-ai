// app/ssr/page.tsx
export const dynamic = "force-dynamic"; // ensures SSR

export default async function SSRPage() {
  // Example: time is generated on every request
  const now = new Date().toISOString();

  return (
    <main>
      <h1>SSR Test</h1>
      <p>Server time: {now}</p>
    </main>
  );
}
