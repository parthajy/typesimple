import type { ArtifactTemplate } from "./types";

export const onePageReportTemplate: ArtifactTemplate = {
  artifact: "one_page_report",
  title: "One-page report",
  description: "Tight, structured, printable.",
  layouts: [
    { id: "report_a", name: "Report A", preview: { ratio: "a4", vibe: "clean" } },
    { id: "report_b", name: "Report B", preview: { ratio: "a4", vibe: "editorial" } },
    { id: "report_c", name: "Report C", preview: { ratio: "a4", vibe: "bold" } },
  ],
  defaultLayoutId: "report_a",
  defaultTheme: {
    accent: "#10b981",
    background: "#ffffff",
    text: "#0a0a0a",
    mutedText: "#52525b",
    card: "#ffffff",
    border: "rgba(0,0,0,0.10)",
  },

  // NEW: drive theme picker from template (MVP: accent only)
  themeOptions: {
  accent: [
    { id: "mint", name: "Mint", value: "#10b981" },
    { id: "indigo", name: "Indigo", value: "#6366f1" },
    { id: "rose", name: "Rose", value: "#f43f5e" },
    { id: "amber", name: "Amber", value: "#f59e0b" },
    { id: "sky", name: "Sky", value: "#0ea5e9" },
    { id: "violet", name: "Violet", value: "#8b5cf6" },
    { id: "ink", name: "Ink", value: "#111827" },
  ],
},

  blocks: [
    {
      kind: "text",
      id: "title",
      label: "Title",
      placeholder: "Q4 Growth Update — Week 2",
      required: true,
      maxChars: 80,
    },
    {
      kind: "text",
      id: "subtitle",
      label: "Subtitle",
      placeholder: "A crisp one-pager for stakeholders",
      maxChars: 120,
    },
    {
      kind: "divider",
      id: "divider_1",
      label: "—",
    },
    {
      kind: "stat",
      id: "stats",
      label: "Top stats",
      hint: "3–4 key numbers. Keep it skimmable.",
      fields: {
        label: "Metric",
        value: "Value",
      },
    },
    {
      kind: "textarea",
      id: "summary",
      label: "Executive summary",
      placeholder: "What happened, why it matters, and what’s next.",
      required: true,
      rows: 5,
      maxChars: 600,
    },
    {
      kind: "bullets",
      id: "highlights",
      label: "Highlights",
      placeholder: "Add 3–6 bullets",
      maxItems: 6,
    },
    {
      kind: "bullets",
      id: "risks",
      label: "Risks / blockers",
      placeholder: "Add 0–5 bullets",
      maxItems: 5,
    },
    {
      kind: "bullets",
      id: "next_steps",
      label: "Next steps",
      placeholder: "Add 3–6 bullets",
      maxItems: 6,
    },
    {
      kind: "text",
      id: "owner",
      label: "Owner",
      placeholder: "Partha",
      maxChars: 40,
    },
    {
      kind: "text",
      id: "date",
      label: "Date",
      placeholder: "Dec 31, 2025",
      maxChars: 30,
    },
  ],
};
