import type { ArtifactTemplate } from "./types";

export const StatusCardTemplate: ArtifactTemplate = {
  artifact: "status_card",
  title: "Status card",
  description: "A clean update card you can share anywhere.",

  layouts: [
    { id: "status_a", name: "Status A (Product)", preview: { ratio: "square", vibe: "bold" } },
    { id: "status_b", name: "Status B (Split)", preview: { ratio: "square", vibe: "clean" } },
    { id: "status_c", name: "Status C (Minimal)", preview: { ratio: "square", vibe: "editorial" } },
  ],

  defaultLayoutId: "status_a",

  defaultTheme: {
    accent: "#22c55e",
    background: "#ffffff",
    text: "#0a0a0a",
    mutedText: "#52525b",
    card: "#ffffff",
    border: "rgba(0,0,0,0.10)",
  },

  themeOptions: {
    accent: [
      { id: "green", name: "Green", value: "#22c55e" },
      { id: "blue", name: "Blue", value: "#2563eb" },
      { id: "amber", name: "Amber", value: "#f59e0b" },
      { id: "rose", name: "Rose", value: "#f43f5e" },
      { id: "ink", name: "Ink", value: "#111827" },
    ],
  },

  blocks: [
    { kind: "text", id: "project", label: "Project / Client", placeholder: "e.g., Arrowwai Industries" },
    { kind: "text", id: "title", label: "Update title", placeholder: "e.g., Week 5 Status Update" },
    { kind: "text", id: "owner", label: "Owner", placeholder: "Your name" },
    { kind: "text", id: "date", label: "Date", placeholder: "YYYY-MM-DD" },

    { kind: "divider", id: "d1", label: "—" },

    {
      kind: "text",
      id: "status",
      label: "Overall status",
      placeholder: "On track / At risk / Off track",
    },
    {
      kind: "textarea",
      id: "summary",
      label: "Summary",
      placeholder: "2–5 lines. What changed? What matters?",
      rows: 5,
    },

    { kind: "divider", id: "d2", label: "—" },

    { kind: "bullets", id: "wins", label: "Wins (one per line)" },
    { kind: "bullets", id: "blockers", label: "Blockers / risks (one per line)" },
    { kind: "bullets", id: "next", label: "Next steps (one per line)" },

    { kind: "divider", id: "d3", label: "—" },

    { kind: "text", id: "cta", label: "CTA button text", placeholder: "e.g., View plan / Book review call" },
    { kind: "text", id: "footer_note", label: "Footer note", placeholder: "TypeSimple · Free" },
  ],
};
