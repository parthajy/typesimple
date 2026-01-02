// PATCH 1 — /Users/partha/Desktop/typesimple/src/lib/templates/surprise.ts
import type { ArtifactTemplate } from "./types";

export const SurpriseTemplate: ArtifactTemplate = {
  artifact: "surprise",
  title: "Surprise me",
  description: "Spin the wheel. Get something random.",
  layouts: [{ id: "surprise_roulette", name: "Roulette", preview: { ratio: "square", vibe: "bold" } }],
  defaultLayoutId: "surprise_roulette",
  defaultTheme: {
    accent: "#111827",
    background: "#ffffff",
    text: "#0a0a0a",
    mutedText: "#52525b",
    card: "#ffffff",
    border: "rgba(0,0,0,0.10)",
  },
  themeOptions: {
    accent: [
      { id: "ink", name: "Ink", value: "#111827" },
      { id: "indigo", name: "Indigo", value: "#6366f1" },
      { id: "rose", name: "Rose", value: "#f43f5e" },
      { id: "emerald", name: "Emerald", value: "#10b981" },
      { id: "amber", name: "Amber", value: "#f59e0b" },
    ],
  },
  blocks: [
    { kind: "text", id: "seed", label: "Optional seed", placeholder: "Leave empty for true randomness" },
  ],
};
