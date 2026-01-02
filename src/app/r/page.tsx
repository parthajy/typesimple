import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function base64UrlDecode(input: string) {
  // base64url -> base64
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  const str = Buffer.from(b64 + pad, "base64").toString("utf8");
  return str;
}

export default async function RenderFromData({
  searchParams,
}: {
  searchParams: Promise<{ d?: string }>;
}) {
  const { d } = await searchParams;

  if (!d) return notFound();

  try {
    const json = base64UrlDecode(d);
    const payload = JSON.parse(json);

    // expected payload.rendered_html
    if (!payload?.rendered_html) return notFound();

    return (
      <main className="min-h-screen bg-white">
        <div dangerouslySetInnerHTML={{ __html: payload.rendered_html }} />
      </main>
    );
  } catch {
    return notFound();
  }
}
