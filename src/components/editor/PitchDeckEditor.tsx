"use client";

import React from "react";
import { nanoid } from "nanoid";
import type { Answers } from "@/lib/templates/types";

export type PitchSlideType =
  | "title"
  | "problem"
  | "solution"
  | "product"
  | "market"
  | "traction"
  | "business_model"
  | "gtm"
  | "competition"
  | "team"
  | "ask"
  | "custom";

export type PitchSlide = {
  id: string;
  type: PitchSlideType;
  data: {
    title?: string;
    subtitle?: string;
    bullets?: string[];
    footer?: string;
    imageUrl?: string;
    chartLines?: string;
  };
};

export type PitchDeckAnswers = {
  slides: PitchSlide[];
  currentSlideId?: string;
};

const SLIDE_TYPES: Array<{ id: PitchSlideType; label: string; hint: string }> = [
  { id: "title", label: "Title", hint: "Big statement + subtitle" },
  { id: "problem", label: "Problem", hint: "What hurts & who feels it" },
  { id: "solution", label: "Solution", hint: "Your wedge" },
  { id: "product", label: "Product", hint: "What it is + key features" },
  { id: "market", label: "Market", hint: "TAM / ICP / why now" },
  { id: "traction", label: "Traction", hint: "Proof, metrics, momentum" },
  { id: "business_model", label: "Business model", hint: "Pricing / unit economics" },
  { id: "gtm", label: "Go-to-market", hint: "Distribution + loops" },
  { id: "competition", label: "Competition", hint: "Why you win" },
  { id: "team", label: "Team", hint: "Why you can do it" },
  { id: "ask", label: "Ask", hint: "Round / use of funds" },
  { id: "custom", label: "Custom", hint: "Any slide you want" },
];

function mkSlide(type: PitchSlideType): PitchSlide {
  const title = type === "title" ? "Company name" : SLIDE_TYPES.find((t) => t.id === type)?.label ?? "Slide";
  return {
    id: nanoid(10),
    type,
    data: {
      title,
      subtitle: type === "title" ? "One-liner that sounds like a fundraise." : "",
      bullets: [],
      footer: "",
      imageUrl: "",
      chartLines: "",
    },
  };
}

function ensureDeck(a: Answers): PitchDeckAnswers {
  const slides = Array.isArray((a as any)?.slides) ? ((a as any).slides as PitchSlide[]) : [];
  const currentSlideId = (a as any)?.currentSlideId ?? slides[0]?.id;
  return {
    slides: slides.length
      ? slides
      : [mkSlide("title"), mkSlide("problem"), mkSlide("solution"), mkSlide("product"), mkSlide("traction"), mkSlide("ask")],
    currentSlideId,
  };
}

export function PitchDeckEditor({
  answers,
  setAnswers,
}: {
  answers: Answers;
  setAnswers: (a: Answers) => void;
}) {
  const deck = ensureDeck(answers);
  const current = deck.slides.find((s) => s.id === deck.currentSlideId) ?? deck.slides[0];

  function setDeck(next: PitchDeckAnswers) {
    setAnswers({ ...answers, ...next });
  }

  function setCurrentSlide(id: string) {
    setDeck({ ...deck, currentSlideId: id });
  }

  function updateSlide(id: string, patch: Partial<PitchSlide["data"]>) {
    setDeck({
      ...deck,
      slides: deck.slides.map((s) => (s.id === id ? { ...s, data: { ...s.data, ...patch } } : s)),
    });
  }

  function updateSlideType(id: string, type: PitchSlideType) {
    setDeck({
      ...deck,
      slides: deck.slides.map((s) => (s.id === id ? { ...s, type } : s)),
    });
  }

  function addSlide(afterId?: string) {
    const slide = mkSlide("custom");
    const idx = afterId ? deck.slides.findIndex((s) => s.id === afterId) : deck.slides.length - 1;
    const at = idx >= 0 ? idx + 1 : deck.slides.length;
    const nextSlides = [...deck.slides.slice(0, at), slide, ...deck.slides.slice(at)];
    setDeck({ ...deck, slides: nextSlides, currentSlideId: slide.id });
  }

  function removeSlide(id: string) {
    if (deck.slides.length <= 1) return;
    const nextSlides = deck.slides.filter((s) => s.id !== id);
    const nextCurrent =
      deck.currentSlideId === id ? nextSlides[Math.max(0, nextSlides.length - 1)].id : deck.currentSlideId;
    setDeck({ ...deck, slides: nextSlides, currentSlideId: nextCurrent });
  }

  function moveSlide(id: string, dir: -1 | 1) {
    const idx = deck.slides.findIndex((s) => s.id === id);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= deck.slides.length) return;
    const next = [...deck.slides];
    const tmp = next[idx];
    next[idx] = next[j];
    next[j] = tmp;
    setDeck({ ...deck, slides: next });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-zinc-800">Slides</div>
        <button
          type="button"
          onClick={() => addSlide(current?.id)}
          className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
        >
          + Add slide
        </button>
      </div>

      <div className="space-y-2">
        {deck.slides.map((s, i) => {
          const active = s.id === (deck.currentSlideId ?? deck.slides[0].id);

          return (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              onClick={() => setCurrentSlide(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCurrentSlide(s.id);
                }
              }}
              className={[
                "w-full select-none rounded-2xl border px-3 py-2 transition cursor-pointer outline-none",
                active ? "border-black bg-black text-white" : "border-black/10 bg-white/70 text-zinc-900 hover:bg-white",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs opacity-70">
                    {i + 1}. {s.type.replaceAll("_", " ")}
                  </div>
                  <div className="truncate text-sm font-semibold">{s.data?.title || "Untitled"}</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      moveSlide(s.id, -1);
                    }}
                    className={[
                      "rounded-lg border px-2 py-1 text-xs",
                      active ? "border-white/20 hover:bg-white/10" : "border-black/10 hover:bg-black/5",
                    ].join(" ")}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      moveSlide(s.id, 1);
                    }}
                    className={[
                      "rounded-lg border px-2 py-1 text-xs",
                      active ? "border-white/20 hover:bg-white/10" : "border-black/10 hover:bg-black/5",
                    ].join(" ")}
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-zinc-800">Edit slide</div>
          <button
            type="button"
            onClick={() => removeSlide(current.id)}
            className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
          >
            Delete
          </button>
        </div>

                <div className="mt-3">
          <label className="text-sm font-medium">Logo URL (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border p-2"
            value={(answers as any)?.logoUrl || ""}
            onChange={(e) => setAnswers({ ...answers, logoUrl: e.target.value })}
            placeholder="https://... (PNG/SVG works best)"
          />
          <div className="mt-1 text-xs text-zinc-500">
            Shows in the upper-right of every slide.
          </div>
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium">Slide type</label>
          <select
            className="mt-1 w-full rounded-lg border p-2"
            value={current.type}
            onChange={(e) => updateSlideType(current.id, e.target.value as PitchSlideType)}
          >
            {SLIDE_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label} — {t.hint}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium">Title</label>
          <input
            className="mt-1 w-full rounded-lg border p-2"
            value={current.data?.title || ""}
            onChange={(e) => updateSlide(current.id, { title: e.target.value })}
            placeholder="Big, confident headline"
          />
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium">Subtitle</label>
          <textarea
            rows={3}
            className="mt-1 w-full rounded-lg border p-2"
            value={current.data?.subtitle || ""}
            onChange={(e) => updateSlide(current.id, { subtitle: e.target.value })}
            placeholder="One-liner, context, positioning"
          />
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium">Bullets</label>
          <textarea
  rows={5}
  className="mt-1 w-full rounded-lg border p-2"
  value={(current.data?.bullets ?? []).join("\n")}
  onChange={(e) => {
    // Preserve user typing exactly (including empty lines) so Enter/space doesn't "snap back"
    const lines = e.target.value.split("\n");
    updateSlide(current.id, { bullets: lines });
  }}
  placeholder="One bullet per line"
/>
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium">Footer (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border p-2"
            value={current.data?.footer || ""}
            onChange={(e) => updateSlide(current.id, { footer: e.target.value })}
            placeholder="Company · Confidential · Date"
          />
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium">Image URL (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border p-2"
            value={(current.data as any)?.imageUrl || ""}
            onChange={(e) => updateSlide(current.id, { imageUrl: e.target.value } as any)}
            placeholder="https://..."
          />
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium">Chart (optional)</label>
          <div className="mt-1 text-xs text-zinc-500">One per line: Revenue: 120</div>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-lg border p-2"
            value={(current.data as any)?.chartLines || ""}
            onChange={(e) => updateSlide(current.id, { chartLines: e.target.value } as any)}
            placeholder={"Users: 1200\nRevenue: 80\nRetention: 42"}
          />
        </div>
      </div>
    </div>
  );
}
