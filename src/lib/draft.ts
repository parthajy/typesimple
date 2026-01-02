import type { Answers, ThemeTokens } from "@/lib/templates/types";
import type { ArtifactId } from "@/lib/artifacts";

type DraftState = {
  artifact: ArtifactId;
  layout: string | null;
  answers: Answers;
  theme?: ThemeTokens;
  savedSlug: string | null;
};

function key(artifact: ArtifactId) {
  return `typesimple:draft:${artifact}`;
}

export function loadDraft(artifact: ArtifactId): DraftState | null {
  try {
    const raw = localStorage.getItem(key(artifact));
    if (!raw) return null;
    return JSON.parse(raw) as DraftState;
  } catch {
    return null;
  }
}

export function saveDraft(state: DraftState) {
  try {
    localStorage.setItem(key(state.artifact), JSON.stringify(state));
  } catch {
    // ignore quota/private mode errors
  }
}

export function clearDraft(artifact: ArtifactId) {
  try {
    localStorage.removeItem(key(artifact));
  } catch {}
}
