import Link from "next/link";
import { Type } from "lucide-react";
import { ArtifactGrid } from "@/components/ArtifactGrid";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white text-black lg:h-screen lg:overflow-hidden">
      {/* soft center glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(2,132,199,0.16),rgba(2,132,199,0.06),rgba(255,255,255,0)_65%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <header className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-md border border-black/10">
              <Type className="h-4 w-4" />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight">typesimple</div>
              <div className="mt-1 text-sm text-black/55 underline underline-offset-4">
                Build client-ready reports in minutes
              </div>
            </div>
          </div>
        </header>

        {/* Two column */}
        <section className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Left */}
          <div className="max-w-xl">
            <h1 className="text-[56px] font-semibold leading-[0.95] tracking-tight md:text-[72px]">
              Create a report for free
            </h1>

            <div className="mt-8 space-y-2 text-[18px] leading-relaxed text-black/55">
              <p>No AI writing. No fluff.</p>
              <p>You bring the content - We make it premium.</p>
              <p>Export and Print-ready</p>
            </div>

            <div className="mt-10">
              <Link
                href="#artifacts"
                className="inline-flex items-center gap-2 text-[18px] font-medium text-[#6D28D9] underline underline-offset-4 hover:opacity-80"
              >
                Let&apos;s go
              </Link>
            </div>
          </div>

          {/* Right */}
          <div id="artifacts" className="lg:pt-2">
            <ArtifactGrid />
          </div>
        </section>
      </div>
    </main>
  );
}
