import type { ArtifactId } from "@/lib/artifacts";

export type BlockId = string;

export type BlockBase = {
  id: BlockId;
  label: string;
  hint?: string;
  required?: boolean;
};

export type TextBlock = BlockBase & {
  kind: "text";
  placeholder?: string;
  maxChars?: number;
};

export type TextareaBlock = BlockBase & {
  kind: "textarea";
  placeholder?: string;
  maxChars?: number;
  rows?: number;
};

export type BulletsBlock = BlockBase & {
  kind: "bullets";
  placeholder?: string;
  maxItems?: number;
};

export type StatBlock = BlockBase & {
  kind: "stat";
  fields: {
    label: string; // e.g. "Metric"
    value: string; // e.g. "Value"
  };
};

export type DividerBlock = BlockBase & {
  kind: "divider";
};

export type Block = TextBlock | TextareaBlock | BulletsBlock | StatBlock | DividerBlock;

export type ThemeTokens = {
  accent?: string; // css color
  background?: string;
  text?: string;
  mutedText?: string;
  card?: string;
  border?: string;
};

export type LayoutThumb = {
  id: string; // layout id
  name: string;
  preview: {
    ratio: "a4" | "square" | "wide" | "story";
    vibe: "clean" | "bold" | "editorial" | "minimal";
  };
};

export type ThemeOption = {
  id: string;
  name: string;
  value: string;
};

export type ThemeOptions = {
  accent?: ThemeOption[];
};

export type ArtifactTemplate = {
  artifact: ArtifactId;
  title: string;
  description: string;

  layouts: LayoutThumb[];

  // “Fill” step uses these blocks to generate form + answers shape
  blocks: Block[];

  // defaults for new draft
  defaultTheme: ThemeTokens;
  defaultLayoutId: string;

  // optional: allow UI picker for theme tokens
  themeOptions?: {
    accent?: ThemeOption[];
  };
};

export type Answers = Record<string, any>;

export type Draft = {
  artifact: ArtifactId;
  layout: string;
  theme: ThemeTokens;
  answers: Answers;
};
