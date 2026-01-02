import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArtifactDef } from "@/lib/artifacts";
import { cn } from "@/lib/utils";

export function Tile({ a }: { a: ArtifactDef }) {
  return (
    <Link
      href={`/create?artifact=${encodeURIComponent(a.id)}`}
      className={cn(
        // ✅ force correct box model so grid works
        "block w-full",
        // ✅ stop global link styles from underlining everything
        "no-underline",
        // ✅ card UI
        "rounded-2xl border border-black/10 bg-white px-6 py-5 shadow-sm",
        "transition hover:-translate-y-[1px] hover:shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-black/10"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[18px] font-semibold tracking-tight text-[#6D28D9] underline underline-offset-4">
            {a.label}
          </div>
          <div className="mt-3 text-[16px] leading-snug text-black/55">{a.desc}</div>
        </div>

        <div className="mt-1 text-[#6D28D9] opacity-80 transition group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
