"use client";

import React from "react";
import { PreviewFrame } from "@/components/PreviewFrame";

export type Zoom = 0.8 | 1 | 1.2;

export function EditorPreview({
  artifact,
  layout,
  html,
  previewRef,
  zoom,
  setZoom,
}: {
  artifact: string;
  layout: string | null;
  html: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
  zoom: Zoom;
  setZoom: (z: Zoom) => void;
}) {
  const ZOOMS: Zoom[] = [0.8, 1, 1.2];

  const idx = ZOOMS.indexOf(zoom);
  const canMinus = idx > 0;
  const canPlus = idx < ZOOMS.length - 1;

  const zoomOut = () => {
    if (!canMinus) return;
    setZoom(ZOOMS[idx - 1]);
  };

  const zoomIn = () => {
    if (!canPlus) return;
    setZoom(ZOOMS[idx + 1]);
  };

  const reset = () => setZoom(1);

  return (
    <div className="relative min-h-[calc(100vh-48px)]">
      {/* Floating zoom pill (always visible while scrolling) */}
      <div className="fixed bottom-4 right-4 z-[60]">
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-2 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <button
            type="button"
            onClick={zoomOut}
            disabled={!canMinus}
            aria-label="Zoom out"
            className={[
              "h-8 w-8 rounded-full border text-sm font-semibold leading-none",
              canMinus
                ? "border-black/10 bg-white hover:bg-black/[0.04] active:bg-black/[0.06]"
                : "border-black/10 bg-white/50 text-black/30 cursor-not-allowed",
            ].join(" ")}
          >
            –
          </button>

          <button
            type="button"
            onClick={reset}
            aria-label="Reset zoom to 100%"
            title="Reset zoom"
            className="h-8 rounded-full px-3 border border-black/10 bg-white hover:bg-black/[0.04] active:bg-black/[0.06] text-xs font-semibold tabular-nums"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            type="button"
            onClick={zoomIn}
            disabled={!canPlus}
            aria-label="Zoom in"
            className={[
              "h-8 w-8 rounded-full border text-sm font-semibold leading-none",
              canPlus
                ? "border-black/10 bg-white hover:bg-black/[0.04] active:bg-black/[0.06]"
                : "border-black/10 bg-white/50 text-black/30 cursor-not-allowed",
            ].join(" ")}
          >
            +
          </button>
        </div>
      </div>

      {/* Canvas area (now starts immediately, no Document Preview banner) */}
      <div className="rounded-3xl border border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] [background-size:18px_18px] p-6 sm:p-10">
        <div className="flex justify-center">
          <div
            className="origin-top rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* PreviewFrame forwardRef typing is often strict; keep this cast */}
            <PreviewFrame ref={previewRef as any} html={html} />
          </div>
        </div>
      </div>
    </div>
  );
}
