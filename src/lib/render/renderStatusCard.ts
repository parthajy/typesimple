import type { Answers, ThemeTokens } from "@/lib/templates/types";

function esc(s: any) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bulletList(items: any, muted: string) {
  const arr = Array.isArray(items) ? items : [];
  if (!arr.length) return `<div style="color:${muted}; font-size:13px;">—</div>`;
  return `<ul style="margin:10px 0 0 18px; padding:0; line-height:1.55;">
    ${arr.map((x: string) => `<li style="margin:6px 0;">${esc(x)}</li>`).join("")}
  </ul>`;
}

function statusPill(statusRaw: string, accent: string) {
  const s = (statusRaw || "").trim().toLowerCase();
  const map: Record<string, { bg: string; fg: string; label: string }> = {
    "on track": { bg: `${accent}1f`, fg: "#0a0a0a", label: "On track" },
    "at risk": { bg: "rgba(245,158,11,0.18)", fg: "#0a0a0a", label: "At risk" },
    "off track": { bg: "rgba(244,63,94,0.18)", fg: "#0a0a0a", label: "Off track" },
  };

  const picked = map[s] ?? { bg: `${accent}1f`, fg: "#0a0a0a", label: statusRaw || "Update" };

  return `
    <span style="
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 12px;
      border-radius:999px;
      background:${picked.bg};
      border:1px solid rgba(0,0,0,0.10);
      font-size:12px;
      font-weight:900;
      letter-spacing:0.08em;
      text-transform:uppercase;
      color:${picked.fg};
    ">
      <span style="width:8px;height:8px;border-radius:999px;background:${accent};"></span>
      ${esc(picked.label)}
    </span>
  `;
}

function watermark(top: number = 14, right: number = 14) {
  return `
    <div style="
      position:absolute;
      top:${top}px;
      right:${right}px;
      font-size:11px;
      letter-spacing:0.10em;
      text-transform:uppercase;
      opacity:0.55;
      font-weight:800;
      user-select:none;
    ">TypeSimple · Free</div>
  `;
}

export function renderStatusCard(answers: Answers, theme: ThemeTokens, layoutId: string) {
  const accent = theme.accent ?? "#22c55e";
  const bg = theme.background ?? "#ffffff";
  const text = theme.text ?? "#0a0a0a";
  const muted = theme.mutedText ?? "#52525b";
  const border = theme.border ?? "rgba(0,0,0,0.10)";
  const card = theme.card ?? "#ffffff";

  const project = esc(answers.project || "Project");
  const title = esc(answers.title || "Status update");
  const owner = esc(answers.owner || "");
  const date = esc(answers.date || "");
  const status = esc(answers.status || "On track");
  const summary = esc(answers.summary || "");

  const wins = answers.wins;
  const blockers = answers.blockers;
  const next = answers.next;

  const cta = esc(answers.cta || "View details");
  const footerNote = esc(answers.footer_note || "TypeSimple · Free");

  // Shared “card canvas”
  const outer = (inner: string) => `
    <div style="
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      color:${text};
      width: 820px;
      max-width: 100%;
      margin: 0 auto;
      position: relative;
      padding: 26px;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0);
      background-size: 18px 18px;
      border-radius: 26px;
    ">
      ${inner}
    </div>
  `;

  // -------------------------
  // Layout A: “Product card” (like your tilted UI samples)
  // -------------------------
  if (layoutId === "status_a") {
    return outer(`
      <div style="
        position:relative;
        border-radius:28px;
        background:${card};
        border:1px solid ${border};
        box-shadow: 0 30px 90px rgba(0,0,0,0.14);
        overflow:hidden;
      ">
        ${watermark(14, 14)}

        <div style="
          padding:22px 22px 16px;
          background:
            linear-gradient(135deg, ${accent}24, transparent 55%),
            linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.00));
          border-bottom:1px solid ${border};
        ">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:14px;">
            <div style="min-width:0;">
              <div style="font-size:12px; font-weight:900; letter-spacing:0.12em; text-transform:uppercase; color:${muted};">
                ${project}
              </div>
              <div style="margin-top:8px; font-size:30px; font-weight:950; letter-spacing:-0.03em; line-height:1.05;">
                ${title}
              </div>
              <div style="margin-top:10px;">
                ${statusPill(status, accent)}
              </div>
            </div>

            <div style="
              width:74px; height:74px;
              border-radius:18px;
              border:1px solid ${border};
              background: linear-gradient(135deg, ${accent}2b, transparent);
            "></div>
          </div>

          <div style="margin-top:14px; font-size:14px; line-height:1.7; color:${muted}; white-space:pre-wrap;">
            ${summary || "Add a crisp update summary."}
          </div>
        </div>

        <div style="padding:18px 22px 18px;">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <div style="border:1px solid ${border}; border-radius:18px; padding:14px; background:${bg};">
              <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Wins</div>
              ${bulletList(wins, muted)}
            </div>

            <div style="border:1px solid ${border}; border-radius:18px; padding:14px; background:${bg};">
              <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Blockers</div>
              ${bulletList(blockers, muted)}
            </div>
          </div>

          <div style="height:12px;"></div>

          <div style="border:1px solid ${border}; border-radius:18px; padding:14px; background:${bg};">
            <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Next</div>
            ${bulletList(next, muted)}
          </div>

          <div style="margin-top:14px; display:flex; gap:10px; align-items:center;">
            <div style="flex:1; border-top:1px solid ${border};"></div>
          </div>

          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; gap:12px;">
            <div style="font-size:12px; color:${muted};">
              ${owner ? `${owner}` : ""} ${date ? `${owner ? "· " : ""}${date}` : ""}
            </div>

            <div style="display:flex; gap:10px; align-items:center;">
              <div style="font-size:12px; color:${muted};">${footerNote}</div>
              <div style="
                padding:10px 14px;
                border-radius:14px;
                background:#0a0a0a;
                color:white;
                font-size:13px;
                font-weight:900;
              ">
                ${cta}
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // -------------------------
  // Layout B: Split image-ish + content (bold colour slab)
  // -------------------------
  if (layoutId === "status_b") {
    return outer(`
      <div style="
        position:relative;
        border-radius:28px;
        overflow:hidden;
        border:1px solid ${border};
        box-shadow: 0 30px 90px rgba(0,0,0,0.14);
        background:${card};
      ">
        ${watermark(14, 14)}

        <div style="display:grid; grid-template-columns: 300px 1fr;">
          <div style="
            padding:22px;
            background:
              linear-gradient(180deg, ${accent}, #111827);
            color:white;
            min-height: 420px;
          ">
            <div style="font-size:12px; font-weight:950; letter-spacing:0.14em; text-transform:uppercase; opacity:0.9;">
              ${project}
            </div>

            <div style="margin-top:14px; font-size:34px; font-weight:950; letter-spacing:-0.03em; line-height:1.02;">
              ${title}
            </div>

            <div style="margin-top:16px;">
              <span style="
                display:inline-flex; align-items:center; gap:8px;
                padding:8px 12px;
                border-radius:999px;
                background: rgba(255,255,255,0.14);
                border:1px solid rgba(255,255,255,0.22);
                font-size:12px;
                font-weight:950;
                letter-spacing:0.10em;
                text-transform:uppercase;
              ">
                <span style="width:8px;height:8px;border-radius:999px;background:rgba(255,255,255,0.95);"></span>
                ${esc(status || "Update")}
              </span>
            </div>

            <div style="margin-top:18px; font-size:13px; line-height:1.65; opacity:0.9; white-space:pre-wrap;">
              ${summary || "Add a crisp update summary."}
            </div>

            <div style="margin-top:18px; height:1px; background: rgba(255,255,255,0.22);"></div>

            <div style="margin-top:14px; font-size:12px; opacity:0.9;">
              ${owner ? `${owner}` : ""} ${date ? `${owner ? "· " : ""}${date}` : ""}
            </div>
          </div>

          <div style="padding:20px 22px;">
            <div style="display:grid; grid-template-columns: 1fr; gap:12px;">
              <div style="border:1px solid ${border}; border-radius:18px; padding:14px; background:${bg};">
                <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Wins</div>
                ${bulletList(wins, muted)}
              </div>

              <div style="border:1px solid ${border}; border-radius:18px; padding:14px; background:${bg};">
                <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Blockers</div>
                ${bulletList(blockers, muted)}
              </div>

              <div style="border:1px solid ${border}; border-radius:18px; padding:14px; background:${bg};">
                <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Next</div>
                ${bulletList(next, muted)}
              </div>
            </div>

            <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; gap:12px;">
              <div style="font-size:12px; color:${muted};">${footerNote}</div>
              <div style="
                padding:10px 14px;
                border-radius:14px;
                background:${accent};
                color:white;
                font-size:13px;
                font-weight:950;
              ">
                ${cta}
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // -------------------------
  // Layout C: Minimal bold pill + clean sections
  // -------------------------
  return outer(`
    <div style="
      position:relative;
      border-radius:28px;
      background:${card};
      border:1px solid ${border};
      box-shadow: 0 30px 90px rgba(0,0,0,0.12);
      overflow:hidden;
      padding: 22px;
    ">
      ${watermark(14, 14)}

      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:14px;">
        <div style="min-width:0;">
          <div style="font-size:12px; font-weight:950; letter-spacing:0.14em; text-transform:uppercase; color:${muted};">
            ${project}
          </div>
          <div style="margin-top:10px; font-size:32px; font-weight:950; letter-spacing:-0.03em; line-height:1.05;">
            ${title}
          </div>
          <div style="margin-top:10px;">${statusPill(status, accent)}</div>
        </div>

        <div style="
          width:110px; height:44px;
          border-radius:999px;
          background:${accent};
          opacity:0.9;
        "></div>
      </div>

      <div style="margin-top:14px; font-size:14px; line-height:1.7; color:${muted}; white-space:pre-wrap;">
        ${summary || "Add a crisp update summary."}
      </div>

      <div style="margin-top:16px; height:1px; background:${border};"></div>

      <div style="margin-top:16px; display:grid; grid-template-columns: 1fr 1fr 1fr; gap:10px;">
        <div style="border:1px solid ${border}; border-radius:16px; padding:12px;">
          <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Wins</div>
          ${bulletList(wins, muted)}
        </div>

        <div style="border:1px solid ${border}; border-radius:16px; padding:12px;">
          <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Blockers</div>
          ${bulletList(blockers, muted)}
        </div>

        <div style="border:1px solid ${border}; border-radius:16px; padding:12px;">
          <div style="font-size:12px; font-weight:950; letter-spacing:0.10em; text-transform:uppercase;">Next</div>
          ${bulletList(next, muted)}
        </div>
      </div>

      <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <div style="font-size:12px; color:${muted};">
          ${owner ? `${owner}` : ""} ${date ? `${owner ? "· " : ""}${date}` : ""}
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="font-size:12px; color:${muted};">${footerNote}</div>
          <div style="
            padding:10px 14px;
            border-radius:14px;
            background:#0a0a0a;
            color:white;
            font-size:13px;
            font-weight:950;
          ">
            ${cta}
          </div>
        </div>
      </div>
    </div>
  `);
}
