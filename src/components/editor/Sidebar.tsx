"use client";

import React, { useEffect, useMemo, useState } from "react";

export function EditorSidebar({ children }: { children: React.ReactNode }) {
  // Persist per-user in browser
  const STORAGE_KEY = "typesimple.editor.sidebarCollapsed";
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "1") setCollapsed(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);

  const label = useMemo(() => (collapsed ? "Expand sidebar" : "Collapse sidebar"), [collapsed]);

  if (collapsed) {
    // Slim rail
    return (
      <div className="relative h-full">
        <div className="sticky top-4">
          <div className="w-12 rounded-2xl border border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label={label}
              title={label}
              className="h-12 w-12 grid place-items-center rounded-2xl hover:bg-black/[0.04] active:bg-black/[0.06]"
            >
              {/* chevron right */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Expanded
  return (
    <div className="space-y-6">
      <div className="sticky top-4 z-10">
        <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/80 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-zinc-800">Controls</div>
            <div className="text-[11px] text-zinc-500 truncate">Customize your artifact</div>
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(true)}
            aria-label={label}
            title={label}
            className="h-9 w-9 grid place-items-center rounded-xl border border-black/10 bg-white hover:bg-black/[0.04] active:bg-black/[0.06]"
          >
            {/* chevron left */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}
