"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ARTIFACTS, type ArtifactId } from "@/lib/artifacts";

function hrefForArtifact(id: ArtifactId) {
  return `/create?artifact=${id}`;
}

export function EditorHeader({
  title,
  description,
  toast,
  saving,
  saved,
  onReset,
  onSave,
}: {
  title: string;
  description: string;
  toast: string | null;
  saving: boolean;
  saved: boolean;
  onReset: () => void;
  onSave: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentArtifact = useMemo(() => {
    const id = searchParams.get("artifact") as ArtifactId | null;
    if (!id) return null;
    return ARTIFACTS.find((a) => a.id === id) ?? null;
  }, [searchParams]);

  return (
    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
      {/* Left */}
<div className="flex min-w-0 items-start gap-3">
  {/* Logo */}
  <Image
    src="/logo.png"
    alt="TypeSimple"
    width={28}
    height={28}
    className="mt-1 opacity-90"
    priority
  />

  {/* Title + description */}
  <div className="min-w-0">
    <div className="mt-0.5 truncate text-lg font-semibold tracking-[-0.03em] sm:text-xl">
      {title}
    </div>
    <div className="hidden sm:block truncate text-sm text-zinc-600">
      {description}
    </div>
  </div>
</div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Artifact selector */}
        <div className="hidden md:flex items-center">
          <select
            value={currentArtifact?.id ?? ""}
            onChange={(e) => {
              const id = e.target.value as ArtifactId;
              if (!id) return;
              router.push(hrefForArtifact(id));
            }}
            className="h-10 appearance-none rounded-xl border border-black/10 bg-white/70 px-3 pr-8 text-sm font-medium text-zinc-800 hover:bg-white focus:outline-none"
          >
            {!currentArtifact && <option value="">All artifacts</option>}
            {ARTIFACTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>

        {toast ? <div className="text-sm text-emerald-700">{toast}</div> : null}

        {saved ? (
          <div className="hidden md:block text-xs text-zinc-500">
            Saved. Copy link in Share.
          </div>
        ) : null}

        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className={[
            "rounded-xl px-4 py-2 text-sm font-semibold transition",
            saving
              ? "bg-black/60 text-white"
              : "bg-black text-white hover:bg-black/90",
          ].join(" ")}
        >
          {saving ? "Saving..." : saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
