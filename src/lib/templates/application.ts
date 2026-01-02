import type { ArtifactTemplate } from "./types";

export const ApplicationTemplate: ArtifactTemplate = {
  artifact: "application",
  title: "Application",
  description: "Clean, confident, skimmable.",

  layouts: [
    { id: "app_a", name: "App A (Hero)", preview: { ratio: "a4", vibe: "bold" } },
    { id: "app_b", name: "App B (Sidebar)", preview: { ratio: "a4", vibe: "clean" } },
    { id: "app_c", name: "App C (Minimal)", preview: { ratio: "a4", vibe: "minimal" } },
  ],

  defaultLayoutId: "app_a",

  defaultTheme: {
    accent: "#0ea5e9",
    background: "#ffffff",
    text: "#0a0a0a",
    mutedText: "#52525b",
    card: "#ffffff",
    border: "rgba(0,0,0,0.10)",
  },

  themeOptions: {
    accent: [
      { id: "sky", name: "Sky", value: "#0ea5e9" },
      { id: "indigo", name: "Indigo", value: "#6366f1" },
      { id: "emerald", name: "Emerald", value: "#10b981" },
      { id: "amber", name: "Amber", value: "#f59e0b" },
      { id: "ink", name: "Ink", value: "#111827" },
    ],
  },

  blocks: [
    { kind: "text", id: "name", label: "Full name", placeholder: "Your name" },
    { kind: "text", id: "role", label: "Role applying for", placeholder: "e.g., Founding Engineer" },
    { kind: "text", id: "company", label: "Company / Team", placeholder: "e.g., TypeSimple" },

    { kind: "divider", id: "d1", label: "—" },

    { kind: "text", id: "email", label: "Email", placeholder: "name@email.com" },
    { kind: "text", id: "phone", label: "Phone", placeholder: "+91…" },
    { kind: "text", id: "location", label: "Location", placeholder: "City, Country" },
    { kind: "text", id: "links", label: "Links", placeholder: "Portfolio / GitHub / LinkedIn (one line)" },

    { kind: "divider", id: "d2", label: "—" },

    { kind: "textarea", id: "summary", label: "Profile summary", placeholder: "3–6 lines. Who you are + what you’ve done.", rows: 5 },
    { kind: "textarea", id: "why", label: "Why this role?", placeholder: "Why you + why them. Be specific.", rows: 5 },

    { kind: "divider", id: "d3", label: "—" },

    { kind: "bullets", id: "experience", label: "Experience highlights (one per line)" },
    { kind: "bullets", id: "projects", label: "Key projects (one per line)" },
    { kind: "bullets", id: "skills", label: "Skills (one per line)" },

    { kind: "divider", id: "d4", label: "—" },

    { kind: "text", id: "availability", label: "Availability", placeholder: "e.g., Immediately / 2 weeks" },
    { kind: "text", id: "comp", label: "Compensation expectations", placeholder: "Optional" },
    { kind: "bullets", id: "references", label: "References (optional, one per line)" },

    { kind: "divider", id: "d5", label: "—" },

    { kind: "text", id: "footer_note", label: "Footer note", placeholder: "TypeSimple · Free" },
  ],
};
