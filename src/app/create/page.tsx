import React, { Suspense } from "react";
import CreateClient from "./CreateClient";

// Netlify + Next can choke trying to prerender /create.
// This forces runtime rendering (safe for useSearchParams).
export const dynamic = "force-dynamic";

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white">
          <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <div className="rounded-3xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold">Loading…</div>
              <div className="mt-2 text-sm text-zinc-600">Preparing editor.</div>
            </div>
          </main>
        </div>
      }
    >
      <CreateClient />
    </Suspense>
  );
}
