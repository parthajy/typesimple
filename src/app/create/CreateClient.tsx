"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import type { ArtifactId } from "@/lib/artifacts";
import { getTemplate } from "@/lib/templates";
import type { Answers, ThemeTokens } from "@/lib/templates/types";
import { FillForm } from "@/components/FillForm";
import { renderOnePageReport } from "@/lib/render/renderOnePageReport";
import { copyToClipboard, exportAsPng, printNode } from "@/lib/export";
import { loadDraft, saveDraft, clearDraft } from "@/lib/draft";
import { encodeSharePayload } from "@/lib/shareCodec";

import { EditorShell } from "@/components/editor/Shell";
import { EditorHeader } from "@/components/editor/Header";
import { EditorSidebar } from "@/components/editor/Sidebar";
import { Panel } from "@/components/editor/Panel";
import { EditorPreview, type Zoom } from "@/components/editor/Preview";

import { PitchDeckEditor } from "@/components/editor/PitchDeckEditor";
import { renderPitchDeck } from "@/lib/render/renderPitchDeck";

import JSZip from "jszip";
import { exportPitchDeckPptx } from "@/lib/export/pptx";
import { renderConceptNote } from "@/lib/render/renderConceptNote";
import { exportHtmlAsPdf, exportHtmlAsDoc } from "@/lib/export/docpdf";
import { renderExecutiveSummary } from "@/lib/render/renderExecutiveSummary";
import { renderApplication } from "@/lib/render/renderApplication";
import { renderProjectReport } from "@/lib/render/renderProjectReport";
import { renderStatusCard } from "@/lib/render/renderStatusCard";

export default function CreateClient() {
  const sp = useSearchParams();
  const previewRef = useRef<HTMLDivElement | null>(null);

  const artifact = (sp.get("artifact") ?? "") as ArtifactId;

  const template = useMemo(() => {
    if (!artifact) return null;
    try {
      return getTemplate(artifact);
    } catch {
      return null;
    }
  }, [artifact]);

  const [layout, setLayout] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [theme, setTheme] = useState<ThemeTokens>({ accent: "#10b981" });

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [zoom, setZoom] = useState<Zoom>(1);

  // Sidebar stepper (UI only)
  const [sideStep, setSideStep] = useState<2 | 3 | 4>(2);

  const canGoNext = useMemo(() => {
    if (sideStep === 2) return !!layout; // must pick a layout
    return true; // Step 3 and 4 always allowed
  }, [sideStep, layout]);

  function nextStep() {
    setSideStep((s) => (s === 4 ? 4 : ((s + 1) as 2 | 3 | 4)));
  }
  function prevStep() {
    setSideStep((s) => (s === 2 ? 2 : ((s - 1) as 2 | 3 | 4)));
  }

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1400);
  }

  // init defaults
  useMemo(() => {
    if (template && !layout) setLayout(template.defaultLayoutId);
    if (template) setTheme(template.defaultTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  // restore draft
  useEffect(() => {
    if (!artifact || !template) return;

    const draft = loadDraft(artifact);
    if (!draft) return;

    if (draft.layout) setLayout(draft.layout);
    if (draft.answers) setAnswers(draft.answers);
    if (draft.theme) setTheme(draft.theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artifact, template?.defaultLayoutId]);

  // auto-save
  useEffect(() => {
    if (!artifact) return;
    saveDraft({ artifact, layout, answers, theme, savedSlug });
  }, [artifact, layout, answers, theme, savedSlug]);

  // pitch deck: ensure starter slides exist
  useEffect(() => {
    if (artifact !== "pitch_deck") return;

    setAnswers((prev) => {
      const slides = Array.isArray((prev as any)?.slides) ? (prev as any).slides : [];
      if (slides.length) return prev;

      return {
        ...prev,
        slides: [
          {
            id: "s1",
            type: "title",
            data: {
              title: "Company name",
              subtitle: "One-liner that sounds like a fundraise.",
              bullets: [],
              footer: "",
            },
          },
          { id: "s2", type: "problem", data: { title: "Problem", subtitle: "", bullets: [], footer: "" } },
          { id: "s3", type: "solution", data: { title: "Solution", subtitle: "", bullets: [], footer: "" } },
          { id: "s4", type: "product", data: { title: "Product", subtitle: "", bullets: [], footer: "" } },
          { id: "s5", type: "traction", data: { title: "Traction", subtitle: "", bullets: [], footer: "" } },
          { id: "s6", type: "ask", data: { title: "Ask", subtitle: "", bullets: [], footer: "" } },
        ],
        currentSlideId: "s1",
      };
    });
  }, [artifact]);

  const html = useMemo(() => {
    if (!template) return "";
    const effectiveLayout = layout ?? template.defaultLayoutId;

    if (artifact === "one_page_report") return renderOnePageReport(answers, theme, effectiveLayout);
    if (artifact === "concept_note") return renderConceptNote(answers, theme, effectiveLayout);
    if (artifact === "pitch_deck") return renderPitchDeck(answers, theme, effectiveLayout, { watermark: true });
    if (artifact === "executive_summary") return renderExecutiveSummary(answers, theme, effectiveLayout);
    if (artifact === "application") return renderApplication(answers, theme, effectiveLayout);
    if (artifact === "project_report") return renderProjectReport(answers, theme, effectiveLayout);
    if (artifact === "status_card") return renderStatusCard(answers, theme, effectiveLayout);

    if (artifact === "screenshot" || artifact === "collage") {
      return `
        <div style="
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          background:#ffffff;
          color:#0a0a0a;
          padding:46px;
          max-width:900px;
          margin:0 auto;
          position:relative;
          border:1px solid rgba(0,0,0,0.10);
          border-radius:22px;
          box-shadow: 0 30px 90px rgba(0,0,0,0.10);
        ">
          <div style="
            position:absolute; top:16px; right:16px;
            font-size:11px; letter-spacing:0.10em; text-transform:uppercase;
            opacity:0.55; font-weight:800;
          ">TypeSimple · Free</div>

          <div style="font-size:12px; font-weight:900; letter-spacing:0.14em; text-transform:uppercase; color:#52525b;">
            Coming soon
          </div>

          <div style="margin-top:12px; font-size:42px; font-weight:950; letter-spacing:-0.04em; line-height:1.05;">
            ${artifact === "screenshot" ? "Screenshot" : "Collage"}
          </div>

          <div style="margin-top:12px; font-size:15px; line-height:1.75; color:#52525b;">
            Not ready yet. We're working hard to launch this feature soon. Stay tuned!
          </div>

          <div style="
            margin-top:22px;
            height:10px;
            border-radius:999px;
            background:linear-gradient(90deg, ${theme?.accent ?? "#111827"}, rgba(0,0,0,0.06));
            opacity:0.85;
          "></div>
        </div>
      `;
    }

    return `<div style="padding:40px;font-family:system-ui">Renderer not added yet.</div>`;
  }, [answers, artifact, template, theme, layout]);

  async function onSaveAndShare() {
    if (!template) return;

    const effectiveLayout = (layout ?? template.defaultLayoutId) as string;

    setSaving(true);
    setErr(null);
    setSavedSlug(null);

    try {
      const payload = {
        v: 1,
        artifact,
        layout: effectiveLayout,
        theme,
        answers,
        rendered_html: html,
        is_public: true,
        created_at: new Date().toISOString(),
      };

      const d = encodeSharePayload(payload);
      setSavedSlug(d);
      showToast("Saved");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function onDownloadPptx() {
    if (artifact !== "pitch_deck") return;

    const slides = Array.isArray((answers as any)?.slides) ? (answers as any).slides : [];
    if (!slides.length) return;

    await exportPitchDeckPptx({
      slides,
      theme,
      layoutId: (layout ?? template?.defaultLayoutId ?? "deck_a") as string,
    });

    showToast("PPTX downloaded");
  }

  async function onDownloadImage() {
    if (!previewRef.current) return;
    await exportAsPng(previewRef.current, "typesimple.png");
  }

  async function onCopyLink() {
    if (!savedSlug) return;
    await copyToClipboard(`${location.origin}/r?d=${savedSlug}`);
    showToast("Link copied");
  }

  async function onCopyText() {
    await copyToClipboard(JSON.stringify(answers, null, 2));
    showToast("Text copied");
  }

  async function onDownloadPdf() {
    if (!template) return;
    await exportHtmlAsPdf(html, `typesimple-${artifact}.pdf`);
    showToast("PDF downloaded");
  }

  async function onDownloadDoc() {
    if (!template) return;
    await exportHtmlAsDoc(html, `typesimple-${artifact}.doc`);
    showToast("DOC downloaded");
  }

  async function onDownloadAllSlidesZip() {
    if (artifact !== "pitch_deck" || !template) return;

    const slides = Array.isArray((answers as any)?.slides) ? (answers as any).slides : [];
    if (!slides.length) return;

    const effectiveLayout = (layout ?? template.defaultLayoutId) as string;

    const zip = new JSZip();

    // hidden container to render each slide one-by-one
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-99999px";
    host.style.top = "0";
    host.style.width = "1200px";
    host.style.background = "white";
    document.body.appendChild(host);

    try {
      for (let i = 0; i < slides.length; i++) {
        const s = slides[i];

        const htmlSlide = renderPitchDeck(
          { ...answers, currentSlideId: s.id },
          theme,
          effectiveLayout,
          { watermark: true }
        );

        host.innerHTML = htmlSlide;

        const node = host.firstElementChild as HTMLElement;
        if (!node) continue;

        const { toPng } = await import("html-to-image");
        const dataUrl = await toPng(node, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "white",
        });

        const b64 = dataUrl.split(",")[1];
        zip.file(`slide-${String(i + 1).padStart(2, "0")}.png`, b64, { base64: true });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "typesimple-pitch-deck.zip";
      a.click();
      URL.revokeObjectURL(a.href);

      showToast("ZIP downloaded");
    } finally {
      host.remove();
    }
  }

  function onPrint() {
    if (!previewRef.current) return;
    printNode(previewRef.current);
  }

  function onStartFresh() {
    if (!artifact) return;
    clearDraft(artifact);
    setAnswers({});
    setLayout(template?.defaultLayoutId ?? null);
    setTheme(template?.defaultTheme ?? { accent: "#10b981" });
    setSavedSlug(null);
    setErr(null);
    showToast("Reset");
  }

  const accentOptions = template?.themeOptions?.accent ?? [];

  if (!template) {
    return (
      <div className="min-h-screen bg-white">
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-3xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold">No artifact selected</div>
            <div className="mt-2 text-sm text-zinc-600">Go back and click an artifact tile.</div>
          </div>
        </main>
      </div>
    );
  }

  const panelKey = (name: string) => `typesimple_editor_panel:${artifact}:${name}`;

  return (
    <EditorShell
      header={
        <EditorHeader
          title={template.title}
          description={template.description}
          toast={toast}
          saving={saving}
          saved={!!savedSlug}
          onReset={onStartFresh}
          onSave={onSaveAndShare}
        />
      }
      sidebar={
        <EditorSidebar>
          {/* Stepper header */}
          <div className="sticky top-0 z-10 border-b border-black/10 bg-white/70 backdrop-blur px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-zinc-800">Step {sideStep} of 4</div>

              <div className="flex items-center gap-1 text-[11px] text-zinc-600">
                <span className={sideStep === 2 ? "text-zinc-950 font-semibold" : ""}>Layout</span>
                <span className="opacity-40">→</span>
                <span className={sideStep === 3 ? "text-zinc-950 font-semibold" : ""}>
                  {artifact === "pitch_deck" ? "Slides" : "Fill"}
                </span>
                <span className="opacity-40">→</span>
                <span className={sideStep === 4 ? "text-zinc-950 font-semibold" : ""}>Share</span>
              </div>
            </div>

            {/* Step dots */}
            <div className="mt-2 flex items-center gap-2">
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSideStep(n as 2 | 3 | 4)}
                  className={[
                    "h-2.5 w-2.5 rounded-full border transition",
                    sideStep === n ? "bg-black border-black" : "bg-white border-black/15 hover:border-black/30",
                  ].join(" ")}
                  aria-label={`Go to step ${n}`}
                />
              ))}
            </div>
          </div>

          {/* Content (only one panel visible at a time) */}
          <div className="px-4 py-4">
            {sideStep === 2 ? (
              <Panel title="Step 2 — Layout" storageKey={panelKey("layout")} defaultOpen>
                <div className="mt-3 flex flex-wrap gap-2">
                  {template.layouts.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setLayout(l.id)}
                      className={[
                        "rounded-full border px-3 py-1 text-xs transition",
                        layout === l.id
                          ? "bg-black text-white border-black"
                          : "bg-white/70 border-black/10 text-zinc-800 hover:bg-white",
                      ].join(" ")}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>

                {accentOptions.length ? (
                  <div className="mt-5">
                    <div className="text-xs font-semibold text-zinc-800">Accent color</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {accentOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setTheme({ ...theme, accent: opt.value })}
                          className={[
                            "flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
                            theme.accent === opt.value
                              ? "border-black bg-black text-white"
                              : "border-black/10 bg-white/70 text-zinc-800 hover:bg-white",
                          ].join(" ")}
                        >
                          <span className="h-3 w-3 rounded-full" style={{ background: opt.value }} />
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Panel>
            ) : null}

            {sideStep === 3 ? (
              <Panel
                title={artifact === "pitch_deck" ? "Step 3 — Slides" : "Step 3 — Fill"}
                storageKey={panelKey("fill")}
                defaultOpen
              >
                <div className="mt-4">
                  {artifact === "pitch_deck" ? (
                    <PitchDeckEditor answers={answers} setAnswers={setAnswers} />
                  ) : (
                    <FillForm blocks={template.blocks} answers={answers} setAnswers={setAnswers} />
                  )}
                </div>
              </Panel>
            ) : null}

            {sideStep === 4 ? (
              <Panel
                title="Step 4 — Share"
                subtitle="Watermark always on."
                storageKey={panelKey("share")}
                defaultOpen
                right={
                  savedSlug ? (
                    <button
                      type="button"
                      onClick={() => window.open(`${location.origin}/r?d=${savedSlug}`, "_blank")}
                      className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                    >
                      Open share
                    </button>
                  ) : null
                }
              >
                {err ? (
                  <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {err}
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {artifact === "pitch_deck" ? (
                    <>
                      <button
                        type="button"
                        onClick={onDownloadAllSlidesZip}
                        className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                      >
                        Download all slides (ZIP)
                      </button>

                      <button
                        type="button"
                        onClick={onDownloadPptx}
                        className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                      >
                        Download PPTX
                      </button>
                    </>
                  ) : null}

                  {artifact === "concept_note" || artifact === "executive_summary" ? (
                    <>
                      <button
                        type="button"
                        onClick={onDownloadPdf}
                        className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                      >
                        Download PDF
                      </button>

                      <button
                        type="button"
                        onClick={onDownloadDoc}
                        className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                      >
                        Download DOC
                      </button>
                    </>
                  ) : null}

                  <button
                    type="button"
                    onClick={onDownloadImage}
                    className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                  >
                    Download image
                  </button>

                  <button
                    type="button"
                    onClick={onPrint}
                    className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                  >
                    Print
                  </button>

                  <button
                    type="button"
                    onClick={onCopyText}
                    className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                  >
                    Copy text
                  </button>

                  <button
                    type="button"
                    onClick={onCopyLink}
                    disabled={!savedSlug}
                    className={[
                      "rounded-xl border px-3 py-2 text-sm",
                      savedSlug ? "border-black/10 bg-white/70 hover:bg-white" : "border-black/5 bg-white/40 text-zinc-400 cursor-not-allowed",
                    ].join(" ")}
                  >
                    Copy share link
                  </button>
                </div>

                {savedSlug ? (
                  <div className="mt-3 text-xs text-zinc-500">
                    Share link ready. Click <span className="font-medium">Copy share link</span>.
                  </div>
                ) : null}
              </Panel>
            ) : null}
          </div>

          {/* Bottom nav buttons */}
          <div className="sticky bottom-0 z-10 border-t border-black/10 bg-white/70 backdrop-blur px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={prevStep}
                disabled={sideStep === 2}
                className={[
                  "h-10 rounded-xl border px-4 text-sm transition",
                  sideStep === 2
                    ? "border-black/5 bg-white/40 text-zinc-400 cursor-not-allowed"
                    : "border-black/10 bg-white/70 hover:bg-white",
                ].join(" ")}
              >
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={!canGoNext || sideStep === 4}
                className={[
                  "h-10 rounded-xl px-4 text-sm font-semibold transition",
                  !canGoNext || sideStep === 4 ? "bg-black/20 text-white cursor-not-allowed" : "bg-black text-white hover:bg-black/90",
                ].join(" ")}
              >
                {sideStep === 4 ? "Done" : "Next"}
              </button>
            </div>
          </div>
        </EditorSidebar>
      }
      preview={
        <EditorPreview
          artifact={artifact}
          layout={layout}
          html={html}
          previewRef={previewRef}
          zoom={zoom}
          setZoom={setZoom}
        />
      }
    />
  );
}
