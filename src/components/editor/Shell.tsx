"use client";

import React from "react";

export function EditorShell({
  header,
  sidebar,
  preview,
}: {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div className="h-screen min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <div className="h-[72px] border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        {header}
      </div>

      {/* Body (Bolt/Canva-style: fixed + split) */}
      <div className="h-[calc(100vh-72px)] flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[420px] shrink-0 border-r border-black/10 bg-white/60 backdrop-blur">
          <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">{sidebar}</div>
        </aside>

        {/* Preview */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-zinc-50/60">
          <div className="px-4 py-6 sm:px-6">{preview}</div>
        </main>
      </div>
    </div>
  );
}
