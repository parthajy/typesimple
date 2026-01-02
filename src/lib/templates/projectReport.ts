import type { ArtifactTemplate } from "./types";

export const ProjectReportTemplate: ArtifactTemplate = {
  artifact: "project_report",
  title: "Project report",
  description: "Outcome + timeline + next.",

  layouts: [
    { id: "proj_a", name: "Project A (Cover+Body)", preview: { ratio: "a4", vibe: "bold" } },
    { id: "proj_b", name: "Project B (Blue Banner)", preview: { ratio: "a4", vibe: "clean" } },
    { id: "proj_c", name: "Project C (Grid+Stats)", preview: { ratio: "a4", vibe: "editorial" } },
  ],

  defaultLayoutId: "proj_a",

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
      { id: "blue", name: "Blue", value: "#2563eb" },
      { id: "indigo", name: "Indigo", value: "#6366f1" },
      { id: "emerald", name: "Emerald", value: "#10b981" },
      { id: "rose", name: "Rose", value: "#f43f5e" },
      { id: "ink", name: "Ink", value: "#111827" },
    ],
  },

  blocks: [
    { kind: "text", id: "project", label: "Project name", placeholder: "e.g., Payments Revamp Q4" },
    { kind: "text", id: "team", label: "Team / Org", placeholder: "e.g., Product Engineering" },
    { kind: "text", id: "owner", label: "Owner", placeholder: "Name" },
    { kind: "text", id: "period", label: "Period", placeholder: "e.g., Oct–Dec 2025" },
    { kind: "text", id: "date", label: "Report date", placeholder: "YYYY-MM-DD" },

    { kind: "divider", id: "d1", label: "—" },

    { kind: "textarea", id: "exec_summary", label: "Executive summary", placeholder: "What happened, what changed, why it matters.", rows: 5 },
    { kind: "textarea", id: "goals", label: "Goals", placeholder: "What were we trying to achieve?", rows: 4 },
    { kind: "textarea", id: "scope", label: "Scope", placeholder: "What was included / excluded.", rows: 4 },

    { kind: "divider", id: "d2", label: "—" },

    { kind: "bullets", id: "highlights", label: "Highlights (one per line)" },
    { kind: "bullets", id: "wins", label: "Key wins / outcomes (one per line)" },
    { kind: "bullets", id: "metrics", label: "Metrics (one per line, e.g. “Latency: -32%”)"},
    { kind: "bullets", id: "risks", label: "Risks / blockers (one per line)" },

    { kind: "divider", id: "d3", label: "—" },

    { kind: "textarea", id: "timeline", label: "Timeline", placeholder: "Phases, milestones, dates.", rows: 5 },
    { kind: "bullets", id: "next_steps", label: "Next steps (one per line)" },

    { kind: "divider", id: "d4", label: "—" },

    { kind: "text", id: "stakeholders", label: "Stakeholders", placeholder: "Names / functions (one line)" },
    { kind: "text", id: "footer_note", label: "Footer note", placeholder: "TypeSimple · Free (watermarked)" },
  ],
};
