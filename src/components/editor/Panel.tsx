"use client";

import React, { useEffect, useMemo, useState } from "react";

function safeGet(key: string) {
  try {
    return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}
function safeSet(key: string, val: string) {
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(key, val);
  } catch {}
}

export function Panel({
  title,
  subtitle,
  right,
  storageKey,
  defaultOpen = true,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  storageKey: string; // must be unique per panel + artifact
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const persisted = useMemo(() => safeGet(storageKey), [storageKey]);
  const [open, setOpen] = useState<boolean>(persisted ? persisted === "1" : defaultOpen);

  useEffect(() => {
    safeSet(storageKey, open ? "1" : "0");
  }, [open, storageKey]);

  return (
    <section className="rounded-3xl border border-black/10 bg-white/60 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3 px-6 pt-6">
        <div>
          <div className="text-xs font-semibold text-zinc-800">{title}</div>
          {subtitle ? <div className="mt-1 text-sm text-zinc-600">{subtitle}</div> : null}
        </div>

        <div className="flex items-center gap-2">
          {right ? <div className="shrink-0">{right}</div> : null}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
          >
            {open ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {open ? <div className="px-6 pb-6 pt-4">{children}</div> : <div className="h-4" />}
    </section>
  );
}
