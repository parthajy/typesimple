export type ArtifactId =
  | "pitch_deck"
  | "one_page_report"
  | "concept_note"
  | "executive_summary"
  | "status_card"
  | "application"
  | "project_report"
  | "screenshot"
  | "collage"
  | "surprise";

export type ArtifactDef = {
  id: ArtifactId;
  label: string;
  desc: string;
  // controls the tile size in the single panel grid
  size: "sm" | "md" | "lg";
  // Tailwind background utility (solid + soft)
  bg: string;
};

export const ARTIFACTS: ArtifactDef[] = [
  {
    id: "pitch_deck",
    label: "Pitch deck",
    desc: "Slides that look like a fundraise.",
    size: "lg",
    bg: "bg-[linear-gradient(135deg,rgba(99,102,241,0.18),rgba(99,102,241,0.05))]",
  },
  {
    id: "one_page_report",
    label: "One-page report",
    desc: "Tight, structured, printable.",
    size: "md",
    bg: "bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(16,185,129,0.05))]",
  },
  {
    id: "concept_note",
    label: "Concept note",
    desc: "Idea → scope → plan.",
    size: "md",
    bg: "bg-[linear-gradient(135deg,rgba(236,72,153,0.16),rgba(236,72,153,0.05))]",
  },
  {
    id: "executive_summary",
    label: "Executive summary",
    desc: "Executive-friendly briefing.",
    size: "sm",
    bg: "bg-[linear-gradient(135deg,rgba(245,158,11,0.18),rgba(245,158,11,0.05))]",
  },
  {
    id: "status_card",
    label: "Status card",
    desc: "Update card for Slack/Email.",
    size: "sm",
    bg: "bg-[linear-gradient(135deg,rgba(34,197,94,0.14),rgba(34,197,94,0.04))]",
  },
  {
    id: "application",
    label: "Application",
    desc: "Clean, confident, skimmable.",
    size: "sm",
    bg: "bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(14,165,233,0.05))]",
  },
  {
    id: "project_report",
    label: "Project report",
    desc: "Outcome + timeline + next.",
    size: "md",
    bg: "bg-[linear-gradient(135deg,rgba(168,85,247,0.16),rgba(168,85,247,0.05))]",
  },
  {
    id: "screenshot",
    label: "Screenshot",
    desc: "Frame it like a product shot.",
    size: "sm",
    bg: "bg-[linear-gradient(135deg,rgba(244,63,94,0.14),rgba(244,63,94,0.04))]",
  },
  {
    id: "collage",
    label: "Collage",
    desc: "Aesthetic grid composition.",
    size: "sm",
    bg: "bg-[linear-gradient(135deg,rgba(20,184,166,0.14),rgba(20,184,166,0.04))]",
  },
  {
    id: "surprise",
    label: "Surprise me",
    desc: "Pick for me. Make it pop.",
    size: "sm",
    bg: "bg-[linear-gradient(135deg,rgba(0,0,0,0.08),rgba(0,0,0,0.02))]",
  },
];
