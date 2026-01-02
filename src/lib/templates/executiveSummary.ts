import type { ArtifactTemplate } from "./types";

export const ExecutiveSummaryTemplate: ArtifactTemplate = {
  artifact: "executive_summary",
  title: "Executive summary",
  description: "Executive-friendly briefing.",

  layouts: [
    { id: "exec_a", name: "Exec A (Photo Hero)", preview: { ratio: "a4", vibe: "bold" } },
    { id: "exec_b", name: "Exec B (Dashboard)", preview: { ratio: "a4", vibe: "clean" } },
    { id: "exec_c", name: "Exec C (Minimal)", preview: { ratio: "a4", vibe: "minimal" } },
  ],

  defaultLayoutId: "exec_a",

  defaultTheme: {
    accent: "#2563eb",
    background: "#ffffff",
    text: "#0a0a0a",
    mutedText: "#52525b",
    card: "#ffffff",
    border: "rgba(0,0,0,0.10)",
  },

  themeOptions: {
    accent: [
      { id: "blue", name: "Royal Blue", value: "#2563eb" },
      { id: "teal", name: "Teal", value: "#14b8a6" },
      { id: "amber", name: "Amber", value: "#f59e0b" },
      { id: "ink", name: "Ink", value: "#111827" },
    ],
  },

  blocks: [
    { kind: "text", id: "org", label: "Organisation", placeholder: "e.g., Arrowwai Industries" },
    { kind: "text", id: "title", label: "Document title", placeholder: "Executive Summary" },
    { kind: "text", id: "period", label: "Period / Context", placeholder: "e.g., Q4 2025 · Board Update" },
    { kind: "text", id: "prepared_by", label: "Prepared by", placeholder: "Name" },
    { kind: "text", id: "date", label: "Date", placeholder: "YYYY-MM-DD" },

    { kind: "divider", id: "d1", label: "—" },

    { kind: "textarea", id: "intro", label: "Introduction", placeholder: "2–5 lines of context.", rows: 4 },
    { kind: "textarea", id: "summary", label: "Executive Summary", placeholder: "Crisp, skimmable summary.", rows: 6 },

    { kind: "divider", id: "d2", label: "—" },

    { kind: "bullets", id: "highlights", label: "Key highlights (one per line)" },
    { kind: "bullets", id: "risks", label: "Risks / Watchouts (one per line)" },
    { kind: "bullets", id: "next_steps", label: "Next steps (one per line)" },

    { kind: "divider", id: "d3", label: "—" },

    // optional metrics row
    { kind: "stat", id: "stat_1", label: "Metric 1", fields: { label: "Metric", value: "Value" } },
    { kind: "stat", id: "stat_2", label: "Metric 2", fields: { label: "Metric", value: "Value" } },
    { kind: "stat", id: "stat_3", label: "Metric 3", fields: { label: "Metric", value: "Value" } },

    { kind: "divider", id: "d4", label: "—" },

    { kind: "text", id: "contact_email", label: "Contact email", placeholder: "hello@company.com" },
    { kind: "text", id: "footer_note", label: "Footer note", placeholder: "TypeSimple · Free (watermarked)" },
  ],
};
