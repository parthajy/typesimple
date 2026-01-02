import type { Answers, ThemeTokens } from "@/lib/templates/types";

function esc(s: any) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function bullets(items: any) {
  const arr = Array.isArray(items) ? items : [];
  if (!arr.length) return `<div style="color:#71717a;font-size:13px;">—</div>`;
  return `<ul style="margin:10px 0 0 18px; padding:0; line-height:1.55;">
    ${arr.map((x: string) => `<li style="margin:6px 0;">${esc(x)}</li>`).join("")}
  </ul>`;
}

function parseStats(raw: any): Array<{ k: string; v: string }> {
  // Accept multiple shapes:
  // 1) "Revenue: 3000\nUsers: 120"
  // 2) [{ k:"Revenue", v:"3000" }] or [{ key:"Revenue", value:"3000" }]
  // 3) { Revenue: 3000, Users: 120 }
  // 4) ["Revenue: 3000", "Users: 120"]

  if (!raw) return [];

  // Array of strings or objects
  if (Array.isArray(raw)) {
    const out: Array<{ k: string; v: string }> = [];
    for (const item of raw) {
      if (typeof item === "string") {
        const line = item.trim();
        if (!line) continue;
        const idx = line.indexOf(":");
        if (idx === -1) out.push({ k: line, v: "" });
        else out.push({ k: line.slice(0, idx).trim(), v: line.slice(idx + 1).trim() });
        continue;
      }
      if (item && typeof item === "object") {
        const k = (item.k ?? item.key ?? item.label ?? "").toString().trim();
        const v = (item.v ?? item.value ?? item.val ?? "").toString().trim();
        if (k) out.push({ k, v });
      }
    }
    return out.slice(0, 6).map(({ k, v }) => ({ k: esc(k), v: esc(v) }));
  }

  // Plain object map
  if (raw && typeof raw === "object") {
    return Object.entries(raw)
      .map(([k, v]) => ({ k: String(k).trim(), v: String(v ?? "").trim() }))
      .filter((x) => x.k)
      .slice(0, 6)
      .map(({ k, v }) => ({ k: esc(k), v: esc(v) }));
  }

  // String fallback
  const text = String(raw);
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { k: esc(line), v: "" };
      return { k: esc(line.slice(0, idx).trim()), v: esc(line.slice(idx + 1).trim()) };
    })
    .slice(0, 6);
}

function watermark() {
  return `
    <div style="
      position:absolute;
      top:16px;
      right:16px;
      font-size:11px;
      letter-spacing:0.10em;
      text-transform:uppercase;
      opacity:0.55;
      font-weight:800;
    ">TypeSimple · Free</div>
  `;
}

export function renderOnePageReport(answers: Answers, theme: ThemeTokens, layoutId: string) {
  const accent = theme?.accent ?? "#10b981";

  const title = esc(answers.title || "Untitled report");
  const subtitle = esc(answers.subtitle || "");
  const summary = esc(answers.summary || "");
  const owner = esc(answers.owner || "");
  const date = esc(answers.date || "");

  const highlights = answers.highlights;
  const risks = answers.risks;
  const nextSteps = answers.next_steps;

  const stats = parseStats(answers.stats);

  // -----------------------
  // Layout B: Editorial column + sidebar (newspaper hierarchy)
  // -----------------------
  if (layoutId === "report_b") {
    return `
    <div style="
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      background:#ffffff;
      color:#0a0a0a;
      padding:46px;
      max-width:920px;
      margin:0 auto;
      position:relative;
    ">
      ${watermark()}

      <div style="display:flex; gap:22px;">
        <div style="flex:1; border-left:4px solid ${accent}; padding-left:18px;">
          <div style="font-size:40px; font-weight:900; letter-spacing:-0.03em; line-height:1.05;">
            ${title}
          </div>
          ${
            subtitle
              ? `<div style="margin-top:10px; color:#3f3f46; font-size:14px; line-height:1.5;">${subtitle}</div>`
              : ""
          }

          <div style="margin-top:18px; font-size:14px; line-height:1.75; color:#111; white-space:pre-wrap;">
            ${summary || "Start filling the form on the left."}
          </div>

          <div style="margin-top:22px; display:grid; grid-template-columns:1fr; gap:14px;">
            <div style="border-top:1px solid rgba(0,0,0,0.10); padding-top:14px;">
              <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Highlights</div>
              ${bullets(highlights)}
            </div>

            <div style="border-top:1px solid rgba(0,0,0,0.10); padding-top:14px;">
              <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Risks</div>
              ${bullets(risks)}
            </div>

            <div style="border-top:1px solid rgba(0,0,0,0.10); padding-top:14px;">
              <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Next steps</div>
              ${bullets(nextSteps)}
            </div>
          </div>

          <div style="margin-top:26px; display:flex; justify-content:space-between; color:#52525b; font-size:12px;">
            <div>${owner}</div>
            <div>${date}</div>
          </div>
        </div>

        <div style="width:260px;">
          <div style="
            border:1px solid rgba(0,0,0,0.10);
            border-radius:18px;
            padding:14px;
            background:linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.0));
          ">
            <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase; margin-bottom:10px;">
              Top stats
            </div>

            ${
              stats.length
                ? stats
                    .map(
                      (s) => `
                      <div style="padding:10px 0; border-top:1px solid rgba(0,0,0,0.06);">
                        <div style="font-size:12px; color:#52525b;">${esc(s.k)}</div>
                        <div style="font-size:16px; font-weight:900; margin-top:2px;">${esc(s.v)}</div>
                        <div style="height:2px; margin-top:10px; background:${accent}; border-radius:999px; opacity:0.55;"></div>
                      </div>
                    `
                    )
                    .join("")
                : `<div style="color:#71717a; font-size:13px;">—</div>`
            }
          </div>

          <div style="margin-top:14px; border-radius:18px; padding:14px; background:${accent}; color:white;">
            <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase; opacity:0.9;">
              Accent
            </div>
            <div style="margin-top:8px; font-size:14px; opacity:0.95;">
              This layout uses your chosen accent color.
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  // -----------------------
  // Layout C: Dashboard cards (product UI vibe)
  // -----------------------
  if (layoutId === "report_c") {
    return `
    <div style="
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      background:#ffffff;
      color:#0a0a0a;
      padding:40px;
      max-width:980px;
      margin:0 auto;
      position:relative;
    ">
      ${watermark()}

      <div style="
        border-radius:22px;
        padding:18px 18px 16px;
        background:linear-gradient(135deg, ${accent}22, rgba(255,255,255,0.0));
        border:1px solid rgba(0,0,0,0.10);
      ">
        <div style="display:flex; justify-content:space-between; gap:16px; align-items:flex-start;">
          <div style="flex:1;">
            <div style="font-size:28px; font-weight:900; letter-spacing:-0.03em; line-height:1.1;">${title}</div>
            ${
              subtitle
                ? `<div style="margin-top:8px; color:#3f3f46; font-size:13px; line-height:1.45;">${subtitle}</div>`
                : ""
            }
          </div>
          <div style="text-align:right; color:#52525b; font-size:12px;">
            <div style="font-weight:800; color:#111;">${owner}</div>
            <div style="margin-top:2px;">${date}</div>
          </div>
        </div>
      </div>

      <div style="height:14px;"></div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px;">
        ${
          (stats.length ? stats.slice(0, 3) : [{ k: "Stat", v: "—" }, { k: "Stat", v: "—" }, { k: "Stat", v: "—" }])
            .map(
              (s) => `
              <div style="
                border-radius:18px;
                border:1px solid rgba(0,0,0,0.10);
                padding:14px;
                background:white;
              ">
                <div style="font-size:12px; color:#52525b;">${esc(s.k)}</div>
                <div style="font-size:18px; font-weight:900; margin-top:3px;">${esc(s.v)}</div>
                <div style="height:3px; border-radius:999px; margin-top:12px; background:${accent}; opacity:0.65;"></div>
              </div>
            `
            )
            .join("")
        }
      </div>

      <div style="height:12px;"></div>

      <div style="display:grid; grid-template-columns: 1.2fr 1fr 1fr; gap:12px;">
        <div style="border-radius:18px; border:1px solid rgba(0,0,0,0.10); padding:16px;">
          <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Summary</div>
          <div style="margin-top:10px; font-size:14px; line-height:1.7; color:#111; white-space:pre-wrap;">
            ${summary || "Start filling the form on the left."}
          </div>
        </div>

        <div style="border-radius:18px; border:1px solid rgba(0,0,0,0.10); padding:16px;">
          <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Highlights</div>
          ${bullets(highlights)}
        </div>

        <div style="border-radius:18px; border:1px solid rgba(0,0,0,0.10); padding:16px;">
          <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Risks</div>
          ${bullets(risks)}
        </div>
      </div>

      <div style="height:12px;"></div>

      <div style="border-radius:18px; border:1px solid rgba(0,0,0,0.10); padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Next steps</div>
          <div style="font-size:12px; color:#52525b;">Accent: <span style="font-weight:800; color:#111;">${accent}</span></div>
        </div>
        ${bullets(nextSteps)}
      </div>
    </div>
    `;
  }

  // -----------------------
  // Layout A (default): Modern split + accent rail + stat module
  // -----------------------
  return `
  <div style="
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    color:#0a0a0a;
    background:white;
    padding:46px;
    max-width:900px;
    margin:0 auto;
    position:relative;
  ">
    ${watermark()}

    <div style="display:grid; grid-template-columns: 1fr 300px; gap:18px; align-items:start;">
      <div>
        <div style="display:flex; gap:14px; align-items:flex-start;">
          <div style="width:10px; border-radius:999px; background:${accent}; height:96px;"></div>
          <div style="flex:1;">
            <div style="font-size:36px; font-weight:900; letter-spacing:-0.03em; line-height:1.08;">
              ${title}
            </div>
            ${
              subtitle
                ? `<div style="margin-top:10px; color:#52525b; font-size:14px; line-height:1.5;">${subtitle}</div>`
                : ""
            }
          </div>
        </div>

        <div style="margin-top:18px; font-size:14px; line-height:1.75; color:#111; white-space:pre-wrap;">
          ${summary || "Start filling the form on the left."}
        </div>
      </div>

      <div style="
        border:1px solid rgba(0,0,0,0.10);
        border-radius:20px;
        padding:14px;
        background:linear-gradient(180deg, ${accent}14, rgba(255,255,255,0.0));
      ">
        <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase; margin-bottom:10px;">
          Top stats
        </div>

        ${
          stats.length
            ? stats
                .slice(0, 5)
                .map(
                  (s) => `
              <div style="padding:10px 0; border-top:1px solid rgba(0,0,0,0.06);">
                <div style="font-size:12px; color:#52525b;">${esc(s.k)}</div>
                <div style="font-size:16px; font-weight:900; margin-top:2px;">${esc(s.v)}</div>
              </div>
            `
                )
                .join("")
            : `<div style="color:#71717a; font-size:13px;">—</div>`
        }
      </div>
    </div>

    <div style="height:16px;"></div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px;">
      <div style="border:1px solid rgba(0,0,0,0.10); border-radius:18px; padding:16px;">
        <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Highlights</div>
        ${bullets(highlights)}
      </div>

      <div style="border:1px solid rgba(0,0,0,0.10); border-radius:18px; padding:16px;">
        <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Risks / blockers</div>
        ${bullets(risks)}
      </div>
    </div>

    <div style="height:14px;"></div>

    <div style="border:1px solid rgba(0,0,0,0.10); border-radius:18px; padding:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">Next steps</div>
        <div style="font-size:12px; color:#52525b;">${owner} · ${date}</div>
      </div>
      ${bullets(nextSteps)}
    </div>
  </div>
  `;
}
