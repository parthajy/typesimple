import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PublicRenderPage({
  params,
}: {
  // Next 15: params can be a Promise in dynamic routes
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data, error } = await supabaseServer
    .from("artifacts")
    .select("rendered_html,is_public")
    .eq("share_slug", slug)
    .single();

  // DEV: show the real reason instead of silent 404
  if (process.env.NODE_ENV === "development" && (error || !data)) {
    return (
      <main className="min-h-screen bg-white p-8">
        <h1 className="text-xl font-semibold">Debug: /r/{slug}</h1>
        <pre className="mt-4 whitespace-pre-wrap rounded-xl border p-4 text-sm">
          {JSON.stringify(
            {
              slug,
              error: error
                ? {
                    message: error.message,
                    details: (error as any).details,
                    hint: (error as any).hint,
                    code: (error as any).code,
                  }
                : null,
              data,
            },
            null,
            2
          )}
        </pre>
      </main>
    );
  }

  if (error || !data || !data.is_public) return notFound();

  return (
    <main className="min-h-screen bg-white">
      <div dangerouslySetInnerHTML={{ __html: data.rendered_html }} />
    </main>
  );
}
