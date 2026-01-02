import type { ThemeTokens } from "@/lib/templates/types";

function esc(s: any) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toBulletArray(v: any) {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  return String(v ?? "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function renderConceptNote(answers: any, theme: ThemeTokens, layoutId: string) {
  const a = answers ?? {};

  const accent = theme.accent ?? "#10b981";
  const text = theme.text ?? "#0a0a0a";
  const muted = theme.mutedText ?? "#52525b";
  const border = theme.border ?? "rgba(0,0,0,0.10)";
  const bg = theme.background ?? "#ffffff";

  const title = esc(a.title || "Concept Note");
  const org = esc(a.org || "");
  const preparedBy = esc(a.prepared_by || "");
  const date = esc(a.date || "");
  const version = esc(a.version || "");

  const summary = esc(a.summary || "");
  const problem = esc(a.problem || "");
  const solution = esc(a.solution || "");
  const scope = esc(a.scope || "");
  const beneficiaries = esc(a.beneficiaries || "");
  const timeline = esc(a.timeline || "");
  const budget = esc(a.budget || "");
  const objectives = toBulletArray(a.objectives);
const outcomes = toBulletArray(a.expected_outcomes);
const risks = toBulletArray(a.risks);
  const contactName = esc(a.contact_name || "");
  const contactEmail = esc(a.contact_email || "");
  const footerNote = esc(a.footer_note || "");

  // ---------- Layout A: Cover + full body (single doc container, multi-page) ----------
if (layoutId === "concept_a") {
  const bulletsHtml = (items: string[]) =>
    items.length
      ? `<ul style="margin:10px 0 0 18px; padding:0; line-height:1.75; color:${muted};">
           ${items.map((x) => `<li style="margin:6px 0;">${esc(x)}</li>`).join("")}
         </ul>`
      : "";

  const coverPage = `
    <div class="ts-page">
      <div style="padding:34px 40px 24px 40px;">
        <div style="display:flex; align-items:flex-start; justify-content:space-between;">
          <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:${muted}; font-weight:800;">
            Concept Documentation
          </div>
          <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:${muted}; font-weight:800;">
            Project
          </div>
        </div>

        <div style="margin-top:18px; height:2px; background:linear-gradient(90deg, ${accent}, transparent); opacity:0.55;"></div>

        <div style="margin-top:34px; font-size:64px; font-weight:300; letter-spacing:-0.03em; line-height:1.0;">
          <div>Concept</div>
          <div style="font-weight:700;">Note</div>
        </div>

        <div style="margin-top:38px; display:grid; grid-template-columns: 1fr 1fr; gap:22px;">
          <div style="border-top:1px solid ${border}; padding-top:16px;">
            <div style="font-size:12px; color:${muted}; font-weight:800; letter-spacing:0.10em; text-transform:uppercase;">Project Title</div>
            <div style="margin-top:8px; font-size:16px; font-weight:700;">${title}</div>
          </div>

          <div style="border-top:1px solid ${border}; padding-top:16px;">
            <div style="font-size:12px; color:${muted}; font-weight:800; letter-spacing:0.10em; text-transform:uppercase;">Organisation</div>
            <div style="margin-top:8px; font-size:16px; font-weight:700;">${org || "—"}</div>
          </div>

          <div style="border-top:1px solid ${border}; padding-top:16px;">
            <div style="font-size:12px; color:${muted}; font-weight:800; letter-spacing:0.10em; text-transform:uppercase;">Prepared by</div>
            <div style="margin-top:8px; font-size:16px; font-weight:700;">${preparedBy || "—"}</div>
          </div>

          <div style="border-top:1px solid ${border}; padding-top:16px;">
            <div style="font-size:12px; color:${muted}; font-weight:800; letter-spacing:0.10em; text-transform:uppercase;">Date / Version</div>
            <div style="margin-top:8px; font-size:16px; font-weight:700;">${date || "—"} ${version ? `· v${version}` : ""}</div>
          </div>
        </div>

        <div style="margin-top:34px; border-top:1px solid ${border}; padding-top:16px;">
          <div style="font-size:12px; color:${muted}; font-weight:800; letter-spacing:0.10em; text-transform:uppercase;">Executive Summary</div>
          <div style="margin-top:10px; font-size:15px; line-height:1.7; color:${muted};">
            ${summary || "Add a short executive summary."}
          </div>
        </div>
      </div>

      <div style="
        background: linear-gradient(90deg, ${accent}22, transparent),
                    linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.03));
        border-top: 1px solid ${border};
        padding: 18px 40px;
        display:flex; align-items:center; justify-content:space-between; gap:14px;
      ">
        <div style="font-size:12px; color:${muted}; line-height:1.5;">
          ${footerNote || "TypeSimple · Concept Note"}
        </div>
        <div style="font-size:12px; color:${muted}; font-weight:700;">
          ${contactEmail ? `${contactName ? `${contactName} · ` : ""}${contactEmail}` : ""}
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
              Concept Note
            </div>
            <div style="margin-top:10px; font-size:30px; font-weight:900; letter-spacing:-0.03em;">
              ${title}
            </div>
            <div style="margin-top:6px; font-size:13px; color:${muted};">
              ${org ? `${org}` : ""} ${preparedBy ? `· ${preparedBy}` : ""} ${date ? `· ${date}` : ""} ${version ? `· v${version}` : ""}
            </div>
          </div>
          <div style="width:80px; height:80px; border-radius:16px; border:1px solid ${border}; background: linear-gradient(135deg, ${accent}22, transparent);"></div>
        </div>

        ${section("Problem", problem || "What problem exists and why it matters now.", muted, border)}
        ${section("Proposed Solution", solution || "What you propose to do and how it addresses the problem.", muted, border)}
        ${section("Objectives", bulletsHtml(objectives) || `<div style="color:${muted};">Add objectives (one per line).</div>`, muted, border)}
        ${section("Expected Outcomes", bulletsHtml(outcomes) || `<div style="color:${muted};">Add expected outcomes (one per line).</div>`, muted, border)}
        ${section("Scope", scope || "Define what’s included and excluded.", muted, border)}
        ${section("Beneficiaries", beneficiaries || "Who benefits and how.", muted, border)}
        ${section("Timeline", timeline || "Key phases and dates.", muted, border)}
        ${section("Budget", budget || "Rough budget estimate and major heads.", muted, border)}
        ${
          risks.length
            ? section("Risks & Mitigations", bulletsHtml(risks), muted, border)
            : section("Risks & Mitigations", `<div style="color:${muted};">Add risks (one per line).</div>`, muted, border)
        }

        <div style="margin-top:18px; border-top:1px solid ${border}; padding-top:16px; display:flex; justify-content:space-between; gap:14px;">
          <div style="font-size:12px; color:${muted};">
            ${footerNote || "TypeSimple · Concept Note"}
          </div>
          <div style="font-size:12px; color:${muted}; font-weight:700;">
            ${contactEmail ? `${contactName ? `${contactName} · ` : ""}${contactEmail}` : ""}
          </div>
        </div>
      </div>
    </div>
  `;

  return `
    <style>
      /* One paper container; pages inside */
      .ts-doc {
        font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
        color: ${text};
        width: 820px; max-width: 100%;
        margin: 0 auto;
        background: ${bg};
        border: 1px solid ${border};
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 30px 90px rgba(0,0,0,0.10);
      }

      /* Page separator in screen preview */
      .ts-page + .ts-page {
        border-top: 1px solid ${border};
      }

      @media print {
        @page { size: A4; margin: 14mm; }

        /* remove “card” look in print */
        .ts-doc {
          box-shadow: none !important;
          border-radius: 0 !important;
          border: none !important;
        }

        /* page breaks */
        .ts-page-break { break-before: page; page-break-before: always; }

        /* avoid ugly splits */
        h1,h2,h3, .ts-keep { break-inside: avoid; page-break-inside: avoid; }
      }
    </style>

    <div class="ts-doc">
      ${coverPage}
      ${bodyPage}
    </div>
  `;
}

  // ---------- Layout B: Modern banner doc ----------
  if (layoutId === "concept_b") {
    const bulletsHtml = (items: string[]) =>
      items.length
        ? `<ul style="margin:10px 0 0 18px; padding:0; line-height:1.75; color:${muted};">
             ${items.map((x) => `<li style="margin:6px 0;">${esc(x)}</li>`).join("")}
           </ul>`
        : "";

    return `
    <div style="font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; color:${text};">
      <div style="
        width: 820px; max-width: 100%;
        margin: 0 auto;
        background:${bg};
        border:1px solid ${border};
        border-radius: 18px;
        overflow:hidden;
        box-shadow: 0 30px 90px rgba(0,0,0,0.10);
      ">
        <div style="position:relative; height:120px; background: #111827;">
          <div style="position:absolute; inset:0; background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));"></div>
          <div style="position:absolute; right:-40px; top:-20px; width:240px; height:200px; transform:skewX(-18deg); background:${accent}; opacity:0.85;"></div>
          <div style="position:absolute; right:-20px; top:-10px; width:210px; height:180px; transform:skewX(-18deg); background:#ffffff; opacity:0.10;"></div>

          <div style="position:absolute; left:34px; top:26px;">
            <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.72); font-weight:900;">
              Concept Note
            </div>
            <div style="margin-top:10px; font-size:34px; font-weight:900; color:#fff; letter-spacing:-0.03em;">
              ${title}
            </div>
            <div style="margin-top:6px; font-size:13px; color:rgba(255,255,255,0.72);">
              ${org ? `${org}` : ""} ${preparedBy ? `· ${preparedBy}` : ""} ${date ? `· ${date}` : ""}
            </div>
          </div>
        </div>

        <div style="padding:30px 34px 34px 34px;">
          ${section("Executive Summary", summary || "Add a crisp summary of the project.", muted, border)}
          ${section("Problem", problem || "What problem exists and why it matters now.", muted, border)}
          ${section("Proposed Solution", solution || "What you propose to do and how it addresses the problem.", muted, border)}
          ${section("Objectives", bulletsHtml(objectives) || `<div style="color:${muted};">Add objectives (one per line).</div>`, muted, border)}
          ${section("Expected Outcomes", bulletsHtml(outcomes) || `<div style="color:${muted};">Add expected outcomes (one per line).</div>`, muted, border)}
          ${section("Scope", scope || "Define what’s included and excluded.", muted, border)}
          ${section("Beneficiaries", beneficiaries || "Who benefits and how.", muted, border)}
          ${section("Timeline", timeline || "Key phases and dates.", muted, border)}
          ${section("Budget", budget || "Rough budget estimate and major heads.", muted, border)}
          ${
            risks.length
              ? section("Risks & Mitigations", bulletsHtml(risks), muted, border)
              : section("Risks & Mitigations", `<div style="color:${muted};">Add risks (one per line).</div>`, muted, border)
          }

          <div style="margin-top:18px; border-top:1px solid ${border}; padding-top:16px; display:flex; justify-content:space-between; gap:14px;">
            <div style="font-size:12px; color:${muted};">
              ${footerNote || "TypeSimple · Free (watermarked)"}
            </div>
            <div style="font-size:12px; color:${muted}; font-weight:700;">
              ${contactEmail ? `${contactName ? `${contactName} · ` : ""}${contactEmail}` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  // ---------- Layout C: Minimal editorial ----------
  const bulletsHtml = (items: string[]) =>
    items.length
      ? `<ul style="margin:10px 0 0 18px; padding:0; line-height:1.75; color:${muted};">
           ${items.map((x) => `<li style="margin:6px 0;">${esc(x)}</li>`).join("")}
         </ul>`
      : "";

  return `
  <div style="font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; color:${text};">
    <div style="
      width: 820px; max-width: 100%;
      margin: 0 auto;
      background:${bg};
      border:1px solid ${border};
      border-radius: 18px;
      overflow:hidden;
      box-shadow: 0 30px 90px rgba(0,0,0,0.08);
      padding: 38px 42px 34px 42px;
    ">
      <div style="display:flex; justify-content:space-between; gap:14px; align-items:flex-start;">
        <div>
          <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:${muted}; font-weight:900;">
            Concept Note
          </div>
          <div style="margin-top:10px; font-size:56px; font-weight:900; letter-spacing:-0.04em; line-height:1.05;">
            ${title}
          </div>
          <div style="margin-top:10px; color:${muted}; font-size:14px;">
            ${org ? `${org}` : ""} ${preparedBy ? `· ${preparedBy}` : ""} ${date ? `· ${date}` : ""} ${version ? `· v${version}` : ""}
          </div>
        </div>
        <div style="width:110px; height:110px; border-radius:18px; border:1px solid ${border}; background: linear-gradient(135deg, ${accent}22, transparent);"></div>
      </div>

      <div style="margin-top:22px; height:1px; background:${border};"></div>

      <div style="margin-top:22px; display:grid; gap:16px;">
        ${miniSection("Executive Summary", summary || "Add a crisp summary.", muted)}
        ${miniSection("Problem", problem || "Define the problem.", muted)}
        ${miniSection("Solution", solution || "Your approach.", muted)}
        ${miniSection("Objectives", bulletsHtml(objectives) || `<div style="color:${muted};">Add objectives.</div>`, muted)}
        ${miniSection("Expected Outcomes", bulletsHtml(outcomes) || `<div style="color:${muted};">Add outcomes.</div>`, muted)}
        ${miniSection("Scope", scope || "What is included.", muted)}
        ${miniSection("Timeline", timeline || "Phases and dates.", muted)}
        ${miniSection("Budget", budget || "Estimate and breakdown.", muted)}
        ${miniSection("Risks", bulletsHtml(risks) || `<div style="color:${muted};">Add risks.</div>`, muted)}
      </div>

      <div style="margin-top:22px; height:1px; background:${border};"></div>

      <div style="margin-top:14px; display:flex; justify-content:space-between; gap:14px;">
        <div style="font-size:12px; color:${muted};">${footerNote || "TypeSimple · Concept Note"}</div>
        <div style="font-size:12px; color:${muted}; font-weight:700;">
          ${contactEmail ? `${contactName ? `${contactName} · ` : ""}${contactEmail}` : ""}
        </div>
      </div>
    </div>
  </div>
  `;
}

function section(title: string, bodyHtml: string, muted: string, border: string) {
  return `
    <div style="margin-top:18px; padding-top:18px; border-top:1px solid ${border};">
      <div style="font-size:14px; font-weight:900; letter-spacing:-0.01em;">${title}</div>
      <div style="margin-top:10px; font-size:15px; line-height:1.75; color:${muted};">
        ${bodyHtml}
      </div>
    </div>
  `;
}

function miniSection(title: string, bodyHtml: string, muted: string) {
  return `
    <div>
      <div style="font-size:13px; font-weight:900; letter-spacing:-0.01em;">${title}</div>
      <div style="margin-top:8px; font-size:15px; line-height:1.75; color:${muted};">
        ${bodyHtml}
      </div>
    </div>
  `;
}
