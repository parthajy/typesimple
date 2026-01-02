import { supabase } from "@/lib/supabase/client";
import type { ArtifactId } from "@/lib/artifacts";

export type ArtifactRow = {
  id: string;
  type: ArtifactId;
  layout: string;
  theme: any;
  answers: any;
  rendered_html: string;
  share_slug: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export async function createArtifact(input: {
  type: ArtifactId;
  layout: string;
  theme: any;
  answers: any;
  rendered_html: string;
  share_slug: string;
  is_public: boolean;
}) {
  const now = new Date().toISOString();
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`; // fallback (shouldn't happen in modern Chrome)

  const { data, error } = await supabase
    .from("artifacts")
    .insert({
      id,
      type: input.type,
      layout: input.layout,
      theme: input.theme,
      answers: input.answers,
      rendered_html: input.rendered_html,
      share_slug: input.share_slug,
      is_public: input.is_public,
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Supabase insert artifacts failed:", {
      message: error.message,
      details: (error as any).details,
      hint: (error as any).hint,
      code: (error as any).code,
    });

    throw new Error(
      `Insert failed: ${error.message}` +
        ((error as any).hint ? ` | hint: ${(error as any).hint}` : "") +
        ((error as any).code ? ` | code: ${(error as any).code}` : "")
    );
  }

  return data as ArtifactRow;
}

export async function getArtifactBySlug(slug: string) {
  const { data, error } = await supabase
    .from("artifacts")
    .select("*")
    .eq("share_slug", slug)
    .single();

  if (error) throw error;
  return data as ArtifactRow;
}
