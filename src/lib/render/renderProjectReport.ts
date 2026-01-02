import type { ThemeTokens } from "@/lib/templates/types";

function esc(s: any) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toBullets(v: any) {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  return String(v ?? "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

function bulletsHtml(items: string[], muted: string) {
  if (!items.length) return `<div style="color:${muted};">—</div>`;
  return `<ul style="margin:10px 0 0 18px; padding:0; line-height:1.75; color:${muted};">
    ${items.map((x) => `<li style="margin:6px 0;">${esc(x)}</li>`).join("")}
  </ul>`;
}

function section(title: string, bodyHtml: string, muted: string, border: string) {
  return `
    <div style="margin-top:18px; padding-top:18px; border-top:1px solid ${border};">
      <div style="font-size:14px; font-weight:900; letter-spacing:-0.01em;">${title}</div>
      <div style="margin-top:10px; font-size:15px; line-height:1.75; color:${muted}; white-space:pre-wrap;">
        ${bodyHtml}
      </div>
    </div>
  `;
}

function watermark() {
  return `
    <div style="
      position:absolute; top:16px; right:16px;
      font-size:11px; letter-spacing:0.10em; text-transform:uppercase;
      opacity:0.55; font-weight:800;
    ">TypeSimple · Free</div>
  `;
}

export function renderProjectReport(answers: any, theme: ThemeTokens, layoutId: string) {
  const a = answers ?? {};

  const accent = theme.accent ?? "#2563eb";
  const text = theme.text ?? "#0a0a0a";
  const muted = theme.mutedText ?? "#52525b";
  const border = theme.border ?? "rgba(0,0,0,0.10)";
  const bg = theme.background ?? "#ffffff";

  const project = esc(a.project || "Project report");
  const team = esc(a.team || "");
  const owner = esc(a.owner || "");
  const period = esc(a.period || "");
  const date = esc(a.date || "");

  const execSummary = esc(a.exec_summary || "");
  const goals = esc(a.goals || "");
  const scope = esc(a.scope || "");

  const highlights = toBullets(a.highlights);
  const wins = toBullets(a.wins);
  const metrics = toBullets(a.metrics);
  const risks = toBullets(a.risks);

  const timeline = esc(a.timeline || "");
  const nextSteps = toBullets(a.next_steps);

  const stakeholders = esc(a.stakeholders || "");
  const footerNote = esc(a.footer_note || "TypeSimple · Free");

  // ---------------------------
  // Layout A: Multi-page doc (cover + body)
  // ---------------------------
  if (layoutId === "proj_a") {
    const coverPage = `
      <div class="ts-page" style="position:relative;">
        ${watermark()}
        <div style="padding:34px 40px 26px 40px;">
          <div style="display:flex; align-items:flex-start; justify-content:space-between;">
            <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:${muted}; font-weight:900;">
              Project Report
            </div>
            <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:${muted}; font-weight:900;">
              ${team || "—"}
            </div>
          </div>

          <div style="margin-top:18px; height:3px; background:linear-gradient(90deg, ${accent}, transparent); opacity:0.75;"></div>

          <div style="margin-top:30px; font-size:58px; font-weight:900; letter-spacing:-0.05em; line-height:1.02;">
            ${project}
          </div>

          <div style="margin-top:12px; font-size:14px; color:${muted};">
            ${period ? `Period: <span style="font-weight:800; color:${text};">${period}</span>` : ""}
            ${period && date ? " · " : ""}
            ${date ? `Report date: <span style="font-weight:800; color:${text};">${date}</span>` : ""}
          </div>

          <div style="margin-top:26px; display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
            ${metaCard("Owner", owner, accent, muted, border)}
            ${metaCard("Stakeholders", stakeholders, accent, muted, border)}
          </div>

          <div style="margin-top:26px; border-top:1px solid ${border}; padding-top:16px;">
            <div style="font-size:12px; color:${muted}; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">
              Executive Summary
            </div>
            <div style="margin-top:10px; font-size:15px; line-height:1.75; color:${muted}; white-space:pre-wrap;">
              ${execSummary || "Add a crisp executive summary."}
            </div>
          </div>
        </div>

        <div style="
          background: linear-gradient(90deg, ${accent}22, transparent),
                      linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.03));
          border-top: 1px solid ${border};
          padding: 16px 40px;
          display:flex; align-items:center; justify-content:space-between; gap:14px;
        ">
          <div style="font-size:12px; color:${muted}; line-height:1.5;">
            ${footerNote}
          </div>
          <div style="font-size:12px; color:${muted}; font-weight:800;">
            ${owner || ""}
          </div>
        </div>
      </div>
    `;

    const bodyPage = `
      <div class="ts-page ts-page-break">
        <div style="padding:30px 34px 34px 34px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${muted}; font-weight:900;">
                Project Report
              </div>
              <div style="margin-top:10px; font-size:30px; font-weight:900; letter-spacing:-0.03em;">
                ${project}
              </div>
              <div style="margin-top:6px; font-size:13px; color:${muted};">
                ${team ? `${team}` : ""} ${owner ? `· ${owner}` : ""} ${period ? `· ${period}` : ""} ${date ? `· ${date}` : ""}
              </div>
            </div>
            <div style="width:80px; height:80px; border-radius:16px; border:1px solid ${border};
              background: radial-gradient(circle at 30% 30%, ${accent}35, transparent 55%),
                          linear-gradient(135deg, ${accent}22, transparent);">
            </div>
          </div>

          ${section("Goals", goals || "What were we trying to achieve?", muted, border)}
          ${section("Scope", scope || "What was included/excluded.", muted, border)}
          ${section("Highlights", bulletsHtml(highlights, muted) || `<div style="color:${muted};">Add highlights.</div>`, muted, border)}
          ${section("Key wins / outcomes", bulletsHtml(wins, muted) || `<div style="color:${muted};">Add outcomes.</div>`, muted, border)}
          ${section("Metrics", bulletsHtml(metrics, muted) || `<div style="color:${muted};">Add metrics (one per line).</div>`, muted, border)}
          ${section("Risks / blockers", bulletsHtml(risks, muted) || `<div style="color:${muted};">Add risks.</div>`, muted, border)}
          ${section("Timeline", timeline || "Phases, milestones, dates.", muted, border)}
          ${section("Next steps", bulletsHtml(nextSteps, muted) || `<div style="color:${muted};">Add next steps.</div>`, muted, border)}

          <div style="margin-top:18px; border-top:1px solid ${border}; padding-top:16px; display:flex; justify-content:space-between; gap:14px;">
            <div style="font-size:12px; color:${muted};">${footerNote}</div>
            <div style="font-size:12px; color:${muted}; font-weight:800;">${stakeholders ? `Stakeholders · ${stakeholders}` : ""}</div>
          </div>
        </div>
      </div>
    `;

    return `
      <style>
        .ts-doc{
          font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
          color:${text};
          width:820px; max-width:100%;
          margin:0 auto;
          background:${bg};
          border:1px solid ${border};
          border-radius:18px;
          overflow:hidden;
          box-shadow:0 30px 90px rgba(0,0,0,0.10);
        }
        .ts-page + .ts-page { border-top: 1px solid ${border}; }

        @media print {
          @page { size:A4; margin:14mm; }
          .ts-doc { box-shadow:none !important; border-radius:0 !important; border:none !important; }
          .ts-page-break { break-before: page; page-break-before: always; }
          h1,h2,h3, .ts-keep { break-inside: avoid; page-break-inside: avoid; }
        }
      </style>

      <div class="ts-doc">
        ${coverPage}
        ${bodyPage}
      </div>
    `;
  }

  // ---------------------------
  // Layout B: Big blue banner (single page, bold)
  // ---------------------------
  if (layoutId === "proj_b") {
    return `
      <div style="
        font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
        color:${text};
      ">
        <div style="
          width:820px; max-width:100%;
          margin:0 auto;
          background:${bg};
          border:1px solid ${border};
          border-radius:18px;
          overflow:hidden;
          box-shadow:0 30px 90px rgba(0,0,0,0.10);
          position:relative;
        ">
          ${watermark()}

          <div style="position:relative; height:150px; background:#0b1220;">
            <div style="position:absolute; inset:0; background:
              radial-gradient(circle at 68% 16%, ${accent}66, transparent 55%),
              linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));"></div>

            <div style="position:absolute; left:34px; top:26px;">
              <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.72); font-weight:900;">
                Project Report
              </div>
              <div style="margin-top:10px; font-size:40px; font-weight:900; color:#fff; letter-spacing:-0.04em; line-height:1.02;">
                ${project}
              </div>
              <div style="margin-top:8px; font-size:13px; color:rgba(255,255,255,0.72);">
                ${team ? `${team}` : ""} ${owner ? `· ${owner}` : ""} ${period ? `· ${period}` : ""} ${date ? `· ${date}` : ""}
              </div>
            </div>
          </div>

          <div style="padding:26px 30px 30px 30px;">
            ${section("Executive summary", execSummary || "Add a crisp executive summary.", muted, border)}

            <div style="margin-top:18px; display:grid; grid-template-columns: 1fr 1fr; gap:14px;">
              ${card("Highlights", bulletsHtml(highlights, muted), accent, muted, border)}
              ${card("Key wins", bulletsHtml(wins, muted), accent, muted, border)}
            </div>

            <div style="margin-top:14px; display:grid; grid-template-columns: 1fr 1fr; gap:14px;">
              ${card("Metrics", bulletsHtml(metrics, muted), accent, muted, border)}
              ${card("Risks", bulletsHtml(risks, muted), accent, muted, border)}
            </div>

            ${section("Next steps", bulletsHtml(nextSteps, muted), muted, border)}

            <div style="margin-top:18px; border-top:1px solid ${border}; padding-top:14px; display:flex; justify-content:space-between; gap:14px;">
              <div style="font-size:12px; color:${muted};">${footerNote}</div>
              <div style="font-size:12px; color:${muted}; font-weight:800;">${stakeholders || ""}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ---------------------------
  // Layout C: Grid + stats (single page, bold/product)
  // ---------------------------
  return `
    <div style="font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; color:${text};">
      <div style="
        width:860px; max-width:100%;
        margin:0 auto;
        background:${bg};
        border:1px solid ${border};
        border-radius:18px;
        overflow:hidden;
        box-shadow:0 30px 90px rgba(0,0,0,0.10);
        position:relative;
      ">
        ${watermark()}

        <div style="
          padding:18px 22px;
          background: linear-gradient(135deg, ${accent}22, transparent);
          border-bottom:1px solid ${border};
        ">
          <div style="display:flex; justify-content:space-between; gap:16px; align-items:flex-start;">
            <div style="flex:1;">
              <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${muted}; font-weight:900;">
                Project Report
              </div>
              <div style="margin-top:10px; font-size:34px; font-weight:900; letter-spacing:-0.03em; line-height:1.05;">
                ${project}
              </div>
              <div style="margin-top:8px; font-size:13px; color:${muted};">
                ${team ? `${team}` : ""} ${period ? `· ${period}` : ""} ${date ? `· ${date}` : ""}
              </div>
            </div>

            <div style="text-align:right; color:${muted}; font-size:12px;">
              <div style="font-weight:900; color:${text};">${owner || "—"}</div>
              <div style="margin-top:2px;">${stakeholders || ""}</div>
            </div>
          </div>
        </div>

        <div style="padding:18px 22px 22px 22px;">
          <div style="display:grid; grid-template-columns: 1.3fr 1fr; gap:12px;">
            ${tile("Executive summary", execSummary || "Add a crisp executive summary.", muted, border)}
            ${tile("Goals + scope", `${goals || "Goals…"}\n\n${scope || "Scope…"}`, muted, border)}
          </div>

          <div style="height:12px;"></div>

          <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px;">
            ${tileHtml("Highlights", bulletsHtml(highlights, muted), muted, border)}
            ${tileHtml("Wins", bulletsHtml(wins, muted), muted, border)}
            ${tileHtml("Metrics", bulletsHtml(metrics, muted), muted, border)}
          </div>

          <div style="height:12px;"></div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            ${tileHtml("Risks / blockers", bulletsHtml(risks, muted), muted, border)}
            ${tileHtml("Next steps", bulletsHtml(nextSteps, muted), muted, border)}
          </div>

          <div style="margin-top:16px; border-top:1px solid ${border}; padding-top:14px; display:flex; justify-content:space-between; gap:14px;">
            <div style="font-size:12px; color:${muted};">${footerNote}</div>
            <div style="font-size:12px; color:${muted};">Accent: <span style="font-weight:900; color:${text};">${accent}</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function metaCard(label: string, value: string, accent: string, muted: string, border: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:18px; padding:14px; background:linear-gradient(135deg, ${accent}14, transparent);">
      <div style="font-size:11px; letter-spacing:0.10em; text-transform:uppercase; color:${muted}; font-weight:900;">${label}</div>
      <div style="margin-top:8px; font-size:14px; font-weight:900;">${value || "—"}</div>
    </div>
  `;
}

function card(title: string, bodyHtml: string, accent: string, muted: string, border: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:18px; overflow:hidden;">
      <div style="padding:12px 14px; background: linear-gradient(90deg, ${accent}18, transparent); border-bottom:1px solid ${border};">
        <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">${title}</div>
      </div>
      <div style="padding: 12px 14px;">
        <div style="font-size:14px; line-height:1.75; color:${muted};">${bodyHtml}</div>
      </div>
    </div>
  `;
}

function tile(title: string, body: string, muted: string, border: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:18px; padding:14px;">
      <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">${title}</div>
      <div style="margin-top:10px; font-size:14px; line-height:1.75; color:${muted}; white-space:pre-wrap;">${body}</div>
    </div>
  `;
}

function tileHtml(title: string, bodyHtml: string, muted: string, border: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:18px; padding:14px;">
      <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">${title}</div>
      <div style="margin-top:10px; font-size:14px; line-height:1.75; color:${muted};">${bodyHtml}</div>
    </div>
  `;
}
