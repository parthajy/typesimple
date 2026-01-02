import type { ThemeTokens } from "@/lib/templates/types";

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

function esc(s: any) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderPitchDeck(
  answers: any,
  theme: ThemeTokens,
  layoutId: string,
  opts?: { watermark?: boolean }
) {
  const deck = (answers ?? {}) as PitchDeckAnswers;
  const slides = Array.isArray(deck.slides) ? deck.slides : [];
  const currentId = deck.currentSlideId ?? slides[0]?.id;
  const slide = slides.find((s) => s.id === currentId) ?? slides[0];

  const accent = theme.accent ?? "#6366f1";
  const wm = opts?.watermark !== false;

  const layout = layoutId;

  const baseBg = layout === "deck_d" ? "#0b0c10" : "#ffffff";
  const baseText = layout === "deck_d" ? "#f4f4f5" : (theme.text ?? "#0a0a0a");
  const baseMuted = layout === "deck_d" ? "rgba(244,244,245,0.72)" : (theme.mutedText ?? "#52525b");
  const baseBorder = layout === "deck_d" ? "rgba(255,255,255,0.14)" : (theme.border ?? "rgba(0,0,0,0.10)");

  const cardBg =
    layout === "deck_c"
      ? `radial-gradient(900px 500px at 20% -10%, ${accent}22, transparent 60%),
         radial-gradient(800px 480px at 90% 10%, ${accent}14, transparent 55%),
         ${baseBg}`
      : baseBg;

  const isBold = layout === "deck_a" || layout === "deck_c";

  if (!slide) {
    return `<div style="padding:24px;font-family:system-ui;color:${baseText};">No slides yet.</div>`;
  }

  const imageUrl = (slide.data as any)?.imageUrl ? esc((slide.data as any).imageUrl) : "";
  const logoUrl = (answers as any)?.logoUrl ? esc((answers as any).logoUrl) : "";
  const chartLinesRaw = (slide.data as any)?.chartLines || "";
  const chartPairs = String(chartLinesRaw)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const idx = l.lastIndexOf(":");
      if (idx === -1) return null;
      const label = l.slice(0, idx).trim();
      const val = Number(l.slice(idx + 1).trim());
      if (!label || Number.isNaN(val)) return null;
      return { label, val };
    })
    .filter(Boolean) as Array<{ label: string; val: number }>;

  const maxVal = chartPairs.length ? Math.max(...chartPairs.map((p) => p.val)) : 1;

  const title = esc(slide.data?.title || "Untitled slide");
  const subtitle = esc(slide.data?.subtitle || "");
  const bullets = Array.isArray(slide.data?.bullets) ? slide.data.bullets : [];
  const footer = esc(slide.data?.footer || "");
  const slideNo = Math.max(1, slides.findIndex((s) => s.id === slide.id) + 1);
  const total = Math.max(1, slides.length);

  return `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color:${baseText};">
    <div style="
      width:1200px; max-width:100%; aspect-ratio:16/9; margin:0 auto;
      border-radius:28px; border:1px solid ${baseBorder};
      background:${cardBg};
      box-shadow: 0 30px 90px rgba(0,0,0,0.14);
      padding: 34px 38px;
      display:flex; flex-direction:column; gap: 18px; overflow:hidden;
    ">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="
            display:inline-flex; align-items:center;
            border:1px solid ${baseBorder};
            background:${layout === "deck_d" ? "rgba(0,0,0,0.20)" : "rgba(255,255,255,0.72)"};
            padding:8px 12px; border-radius:999px;
            font-size:12px; letter-spacing:0.12em; text-transform:uppercase;
            font-weight:800; color:${baseMuted};
          ">${esc(slide.type.replaceAll("_", " "))}</span>
          <span style="font-size:12px; color:${baseMuted}; letter-spacing:0.08em; font-weight:700;">
            ${slideNo}/${total}
          </span>
        </div>
                <div style="display:flex; align-items:center; gap:12px;">
          ${
            logoUrl
              ? `<img
                   src="${logoUrl}"
                   alt=""
                   style="
                     height:22px;
                     width:auto;
                     object-fit:contain;
                     opacity:${layout === "deck_d" ? "0.95" : "0.9"};
                     filter:${layout === "deck_d" ? "brightness(1.1)" : "none"};
                   "
                 />`
              : ""
          }
          ${
            wm
              ? `<div style="font-size:11px; letter-spacing:0.10em; text-transform:uppercase; opacity:0.6; font-weight:800; color:${baseMuted}; white-space:nowrap;">
                   TypeSimple · Free
                 </div>`
              : ""
          }
        </div>
      </div>

      <div style="height:10px;"></div>

      <div style="display:flex; gap:18px; align-items:flex-start;">
        ${
          isBold
            ? `<div style="width:10px; border-radius:999px; background:${accent}; height:96px;"></div>`
            : ""
        }
        <div style="flex:1;">
          <div style="font-size:${isBold ? 54 : 50}px; font-weight:900; letter-spacing:-0.04em; line-height:1.05;">
            ${title}
          </div>

          ${
            subtitle
              ? `<div style="margin-top:14px; color:${baseMuted}; font-size:18px; line-height:1.55; max-width:980px;">
                   ${subtitle}
                 </div>`
              : `<div style="margin-top:14px; color:${baseMuted}; font-size:18px;"> </div>`
          }

                    ${
            bullets.length
              ? `<ul style="
                    margin:18px 0 0 0;
                    padding:0 0 0 22px;
                    line-height:1.55;
                    font-size:18px;
                    list-style-type:disc;
                    list-style-position:outside;
                  ">
                  ${bullets
                    .map((b) => String(b ?? ""))
                    .map((b) => b.trim())
                    .filter(Boolean)
                    .slice(0, 10)
                    .map((b) => `<li style="margin:10px 0; padding:0;">${esc(b)}</li>`)
                    .join("")}
                 </ul>`
              : ""
          }
        </div>
      </div>

      ${
        imageUrl
          ? `<div style="margin-top:18px; border:1px solid ${baseBorder}; border-radius:20px; overflow:hidden;">
               <img src="${imageUrl}" alt="" style="width:100%; height:auto; display:block;" />
             </div>`
          : ""
      }

      ${
        chartPairs.length
          ? `<div style="margin-top:18px; border:1px solid ${baseBorder}; border-radius:20px; padding:16px;
                         background:${layout === "deck_d" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)"};">
               <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; font-weight:800; color:${baseMuted};">
                 Chart
               </div>
               <div style="margin-top:10px; display:grid; gap:10px;">
                 ${chartPairs
                   .slice(0, 8)
                   .map((p) => {
                     const w = Math.max(6, Math.round((p.val / maxVal) * 100));
                     return `
                       <div style="display:grid; grid-template-columns: 140px 1fr 60px; gap:12px; align-items:center;">
                         <div style="font-size:14px; color:${baseMuted};">${esc(p.label)}</div>
                         <div style="height:10px; border-radius:999px; background:${baseBorder}; overflow:hidden;">
                           <div style="height:10px; width:${w}%; border-radius:999px; background:${accent};"></div>
                         </div>
                         <div style="font-size:14px; text-align:right; color:${baseText}; font-weight:700;">${p.val}</div>
                       </div>
                     `;
                   })
                   .join("")}
               </div>
             </div>`
          : ""
      }

      <div style="display:flex; align-items:center; justify-content:space-between; margin-top:auto; padding-top:18px;">
        <div style="font-size:12px; color:${baseMuted};">${footer}</div>
        <div style="display:flex; gap:10px; align-items:center;">
          <div style="height:8px; width:8px; border-radius:999px; background:${accent};"></div>
          <div style="height:8px; width:8px; border-radius:999px; background:${baseBorder};"></div>
          <div style="height:8px; width:8px; border-radius:999px; background:${baseBorder};"></div>
        </div>
      </div>
    </div>
  </div>`;
}
