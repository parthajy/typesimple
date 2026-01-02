import type { ArtifactId } from "@/lib/artifacts";
import type { ArtifactTemplate } from "./types";
import { onePageReportTemplate } from "./one-page-report";
import { ConceptNoteTemplate } from "@/lib/templates/conceptNote";
import { ExecutiveSummaryTemplate } from "./executiveSummary";
import { ApplicationTemplate } from "./application";
import { ProjectReportTemplate } from "./projectReport";
import { StatusCardTemplate } from "@/lib/templates/statusCard";

const TEMPLATES_BY_ARTIFACT: Record<ArtifactId, ArtifactTemplate> = {
  pitch_deck: {
  artifact: "pitch_deck",
  title: "Pitch deck",
  description: "Slides that look like a fundraise.",
  layouts: [
  { id: "deck_a", name: "Deck A", preview: { ratio: "wide", vibe: "bold" } },
  { id: "deck_b", name: "Deck B", preview: { ratio: "wide", vibe: "clean" } },

  // NEW
  { id: "deck_c", name: "Deck C (Gradient)", preview: { ratio: "wide", vibe: "bold" } },
  { id: "deck_d", name: "Deck D (Dark)", preview: { ratio: "wide", vibe: "minimal" } },
  { id: "deck_e", name: "Deck E (Outline)", preview: { ratio: "wide", vibe: "editorial" } },
],
  blocks: [],

  defaultTheme: {
    accent: "#6366f1",
    background: "#ffffff",
    text: "#0a0a0a",
    mutedText: "#52525b",
    card: "#ffffff",
    border: "rgba(0,0,0,0.10)",
  },

  themeOptions: {
    accent: [
      { id: "indigo", name: "Indigo", value: "#6366f1" },
      { id: "emerald", name: "Emerald", value: "#10b981" },
      { id: "rose", name: "Rose", value: "#f43f5e" },
      { id: "amber", name: "Amber", value: "#f59e0b" },
      { id: "ink", name: "Ink", value: "#111827" },
    ],
  },

  defaultLayoutId: "deck_a",
},

    one_page_report: onePageReportTemplate,
  concept_note: ConceptNoteTemplate,
  executive_summary: ExecutiveSummaryTemplate,
  application: ApplicationTemplate,
  project_report: ProjectReportTemplate,
  status_card: StatusCardTemplate,

    screenshot: {
    artifact: "screenshot",
    title: "Screenshot",
    description: "Coming soon.",
    layouts: [{ id: "coming_soon", name: "Coming soon", preview: { ratio: "wide", vibe: "minimal" } }],
    blocks: [{ kind: "textarea", id: "note", label: "Note", placeholder: "This artifact is coming soon.", rows: 3 }],
    defaultTheme: {
      accent: "#f43f5e",
      background: "#ffffff",
      text: "#0a0a0a",
      mutedText: "#52525b",
      card: "#ffffff",
      border: "rgba(0,0,0,0.10)",
    },
    defaultLayoutId: "coming_soon",
  },

  collage: {
    artifact: "collage",
    title: "Collage",
    description: "Coming soon.",
    layouts: [{ id: "coming_soon", name: "Coming soon", preview: { ratio: "square", vibe: "minimal" } }],
    blocks: [{ kind: "textarea", id: "note", label: "Note", placeholder: "This artifact is coming soon.", rows: 3 }],
    defaultTheme: {
      accent: "#14b8a6",
      background: "#ffffff",
      text: "#0a0a0a",
      mutedText: "#52525b",
      card: "#ffffff",
      border: "rgba(0,0,0,0.10)",
    },
    defaultLayoutId: "coming_soon",
  },

  surprise: {
    artifact: "surprise",
    title: "Surprise me",
    description: "Pick for me. Make it pop.",
    layouts: [{ id: "surprise_a", name: "Surprise A", preview: { ratio: "a4", vibe: "bold" } }],
    blocks: [],
    defaultTheme: { accent: "#111827" },
    defaultLayoutId: "surprise_a",
  },
};

export function getTemplate(artifact: ArtifactId): ArtifactTemplate {
  return TEMPLATES_BY_ARTIFACT[artifact];
}

export function getAllTemplates(): ArtifactTemplate[] {
  return Object.values(TEMPLATES_BY_ARTIFACT);
}
