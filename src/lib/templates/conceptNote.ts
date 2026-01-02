import type { ArtifactTemplate } from "./types";

export const ConceptNoteTemplate: ArtifactTemplate = {
  artifact: "concept_note",
  title: "Concept note",
  description: "Idea → scope → plan.",

  layouts: [
    { id: "concept_a", name: "Concept A (Cover)", preview: { ratio: "a4", vibe: "editorial" } },
    { id: "concept_b", name: "Concept B (Banner)", preview: { ratio: "a4", vibe: "clean" } },
    { id: "concept_c", name: "Concept C (Minimal)", preview: { ratio: "a4", vibe: "minimal" } },
  ],

  defaultLayoutId: "concept_a",

  defaultTheme: {
    accent: "#10b981",
    background: "#ffffff",
    text: "#0a0a0a",
    mutedText: "#52525b",
    card: "#ffffff",
    border: "rgba(0,0,0,0.10)",
  },

  themeOptions: {
    accent: [
      { id: "mint", name: "Mint", value: "#10b981" },
      { id: "indigo", name: "Indigo", value: "#6366f1" },
      { id: "amber", name: "Amber", value: "#f59e0b" },
      { id: "ink", name: "Ink", value: "#111827" },
    ],
  },

  blocks: [
    { kind: "text", id: "title", label: "Project / Programme Title", placeholder: "e.g., Tripura Rising 2026" },
    { kind: "text", id: "org", label: "Organisation", placeholder: "e.g., Coassist Foundation" },
    { kind: "text", id: "prepared_by", label: "Prepared by", placeholder: "Your name" },
    { kind: "text", id: "date", label: "Date", placeholder: "YYYY-MM-DD" },
    { kind: "text", id: "version", label: "Version", placeholder: "1.0" },

    { kind: "divider", id: "d1", label: "—" },

    { kind: "textarea", id: "summary", label: "Executive Summary", placeholder: "2–6 lines describing what this is.", rows: 5 },
    { kind: "textarea", id: "problem", label: "Problem", placeholder: "What problem exists? Why now?", rows: 5 },
    { kind: "textarea", id: "solution", label: "Proposed Solution", placeholder: "What you propose to do.", rows: 5 },

    // Use bullets kind so your FillForm stores arrays cleanly
    { kind: "bullets", id: "objectives", label: "Objectives (one per line)" },
    { kind: "bullets", id: "expected_outcomes", label: "Expected Outcomes (one per line)" },

    { kind: "divider", id: "d2", label: "—" },

    { kind: "textarea", id: "scope", label: "Scope", placeholder: "What’s included, what’s not.", rows: 4 },
    { kind: "textarea", id: "beneficiaries", label: "Beneficiaries", placeholder: "Who benefits and how.", rows: 4 },
    { kind: "textarea", id: "timeline", label: "Timeline", placeholder: "Phases, milestones, dates.", rows: 4 },
    { kind: "textarea", id: "budget", label: "Budget", placeholder: "Rough budget and top heads.", rows: 4 },

    // store as bullets: "Risk: mitigation"
    { kind: "bullets", id: "risks", label: "Risks & mitigations (one per line)" },

    { kind: "divider", id: "d3", label: "—" },

    { kind: "text", id: "contact_name", label: "Contact name", placeholder: "Name" },
    { kind: "text", id: "contact_email", label: "Contact email", placeholder: "name@company.com" },
    { kind: "text", id: "footer_note", label: "Footer note", placeholder: "TypeSimple · Concept Note" },
  ],
};
