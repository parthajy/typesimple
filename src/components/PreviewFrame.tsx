"use client";

import { forwardRef } from "react";

export const PreviewFrame = forwardRef<HTMLDivElement, { html: string }>(function PreviewFrame(
  { html },
  ref
) {
  return (
    <div className="rounded-[28px] border border-black/10 bg-white/60 shadow-sm backdrop-blur">
      <div className="p-4 sm:p-5">
        {/* Canvas background */}
        <div className="rounded-2xl border border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] [background-size:18px_18px] p-4 sm:p-6">
          {/* Neutral surface: DO NOT add “paper” styling here.
              The renderer HTML already includes its own page/container styling. */}
          <div className="mx-auto w-full max-w-[1200px]">
            <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </div>
  );
});
