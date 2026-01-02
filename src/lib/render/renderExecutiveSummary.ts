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

function statVal(a: any, id: string) {
  const v = a?.[id];
  if (!v || typeof v !== "object") return { label: "", value: "" };
  return { label: String(v.label ?? ""), value: String(v.value ?? "") };
}

export function renderExecutiveSummary(answers: any, theme: ThemeTokens, layoutId: string) {
  const a = answers ?? {};

  const accent = theme.accent ?? "#2563eb";
  const text = theme.text ?? "#0a0a0a";
  const muted = theme.mutedText ?? "#52525b";
  const border = theme.border ?? "rgba(0,0,0,0.10)";
  const bg = theme.background ?? "#ffffff";

  const org = esc(a.org || "—");
  const title = esc(a.title || "Executive Summary");
  const period = esc(a.period || "");
  const preparedBy = esc(a.prepared_by || "");
  const date = esc(a.date || "");

  const intro = esc(a.intro || "");
  const summary = esc(a.summary || "");

  const highlights = toBullets(a.highlights);
  const risks = toBullets(a.risks);
  const nextSteps = toBullets(a.next_steps);

  const s1 = statVal(a, "stat_1");
  const s2 = statVal(a, "stat_2");
  const s3 = statVal(a, "stat_3");

  const contactEmail = esc(a.contact_email || "");
  const footerNote = esc(a.footer_note || "TypeSimple · Free (watermarked)");

  // Shared “doc” wrapper
  const docOpen = `
    <div style="
      font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
      color:${text};
    ">
      <div style="
        width: 820px; max-width: 100%;
        margin: 0 auto;
        background:${bg};
        border: 1px solid ${border};
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 30px 90px rgba(0,0,0,0.10);
      ">
  `;

  const docClose = `
        <div style="border-top:1px solid ${border}; padding: 14px 22px; display:flex; justify-content:space-between; gap:14px;">
          <div style="font-size:12px; color:${muted};">${footerNote}</div>
          <div style="font-size:12px; color:${muted}; font-weight:700;">${contactEmail || ""}</div>
        </div>
      </div>
    </div>
  `;

  // -------- Layout A (Photo Hero) --------
  if (layoutId === "exec_a") {
    return `
      ${docOpen}
        <div style="position:relative; height:220px; background: #0b1220;">
          <div style="position:absolute; inset:0; background:
            linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)),
            radial-gradient(circle at 70% 10%, ${accent}55, transparent 55%);"></div>

          <div style="position:absolute; inset:0; opacity:0.18; background-image:
            linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px);
            background-size: 18px 18px;"></div>

          <div style="position:absolute; left:26px; top:22px; right:26px;">
            <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:14px;">
              <div style="min-width:0;">
                <div style="font-size:13px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.72); font-weight:900;">
                  ${org}
                </div>
                <div style="margin-top:10px; font-size:46px; font-weight:900; color:#fff; letter-spacing:-0.04em; line-height:1.0;">
                  ${title}
                </div>
                <div style="margin-top:10px; font-size:13px; color:rgba(255,255,255,0.74);">
                  ${period ? `${period}` : ""} ${preparedBy ? `· ${preparedBy}` : ""} ${date ? `· ${date}` : ""}
                </div>
              </div>

              <div style="width:86px; height:86px; border-radius:18px; border:1px solid rgba(255,255,255,0.18);
                background: linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02));"></div>
            </div>
          </div>

          <div style="position:absolute; left:0; right:0; bottom:-26px; padding: 0 22px;">
            <div style="border:1px solid ${border}; border-radius:18px; background:#fff; box-shadow: 0 20px 60px rgba(0,0,0,0.12);">
              <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:0;">
                ${metricCard(s1, accent, muted, border)}
                ${metricCard(s2, accent, muted, border)}
                ${metricCard(s3, accent, muted, border)}
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 56px 26px 24px 26px;">
          ${section("Introduction", intro || "Add a short intro that frames the update.", muted, border)}
          ${section("Executive Summary", summary || "Add a crisp executive summary.", muted, border)}

          <div style="margin-top:18px; display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
            ${panel("Key highlights", bulletsHtml(highlights, muted), accent, muted, border)}
            ${panel("Risks / Watchouts", bulletsHtml(risks, muted), accent, muted, border)}
          </div>

          <div style="margin-top:16px;">
            ${panel("Next steps", bulletsHtml(nextSteps, muted), accent, muted, border)}
          </div>
        </div>
      ${docClose}
    `;
  }

  // -------- Layout B (Dashboard / teal strip) --------
  if (layoutId === "exec_b") {
    return `
      ${docOpen}
        <div style="display:flex; gap:0;">
          <div style="width:160px; background: ${accent}18; border-right:1px solid ${border}; padding:18px 14px;">
            <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${muted}; font-weight:900;">
              ${org}
            </div>
            <div style="margin-top:14px; font-size:12px; color:${muted}; line-height:1.6;">
              ${period || "—"}<br/>
              ${date || "—"}<br/>
              ${preparedBy || "—"}
            </div>

            <div style="margin-top:16px; border-top:1px solid ${border}; padding-top:14px;">
              <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase; color:${muted};">Metrics</div>
              <div style="margin-top:10px; display:grid; gap:10px;">
                ${metricMini(s1, border, muted)}
                ${metricMini(s2, border, muted)}
                ${metricMini(s3, border, muted)}
              </div>
            </div>
          </div>

          <div style="flex:1; padding:22px 24px;">
            <div style="display:flex; align-items:flex-end; justify-content:space-between; gap:12px;">
              <div>
                <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${muted}; font-weight:900;">Executive Summary</div>
                <div style="margin-top:10px; font-size:34px; font-weight:900; letter-spacing:-0.03em;">${title}</div>
              </div>
              <div style="width:72px; height:72px; border-radius:16px; border:1px solid ${border}; background: linear-gradient(135deg, ${accent}22, transparent);"></div>
            </div>

            <div style="margin-top:18px; display:grid; grid-template-columns: 1.3fr 0.7fr; gap:16px;">
              <div style="border:1px solid ${border}; border-radius:18px; padding:16px;">
                <div style="font-size:13px; font-weight:900;">Summary</div>
                <div style="margin-top:10px; font-size:15px; line-height:1.75; color:${muted};">
                  ${summary || "Add a crisp executive summary."}
                </div>
              </div>

              <div style="border:1px solid ${border}; border-radius:18px; padding:16px; background: linear-gradient(180deg, ${accent}10, transparent);">
                <div style="font-size:13px; font-weight:900;">Highlights</div>
                ${bulletsHtml(highlights, muted)}
              </div>
            </div>

            <div style="margin-top:16px; display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
              <div style="border:1px solid ${border}; border-radius:18px; padding:16px;">
                <div style="font-size:13px; font-weight:900;">Risks</div>
                ${bulletsHtml(risks, muted)}
              </div>
              <div style="border:1px solid ${border}; border-radius:18px; padding:16px;">
                <div style="font-size:13px; font-weight:900;">Next steps</div>
                ${bulletsHtml(nextSteps, muted)}
              </div>
            </div>

            <div style="margin-top:16px;">
              ${section("Introduction", intro || "Add a short intro that frames the update.", muted, border)}
            </div>
          </div>
        </div>
      ${docClose}
    `;
  }

  // -------- Layout C (Minimal editorial) --------
  return `
    ${docOpen}
      <div style="padding: 34px 34px 26px 34px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:14px;">
          <div>
            <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:${muted}; font-weight:900;">
              ${org}
            </div>
            <div style="margin-top:10px; font-size:56px; font-weight:900; letter-spacing:-0.04em; line-height:1.05;">
              ${title}
            </div>
            <div style="margin-top:10px; color:${muted}; font-size:14px;">
              ${period ? `${period}` : ""} ${preparedBy ? `· ${preparedBy}` : ""} ${date ? `· ${date}` : ""}
            </div>
          </div>
          <div style="width:110px; height:110px; border-radius:18px; border:1px solid ${border}; background: linear-gradient(135deg, ${accent}22, transparent);"></div>
        </div>

        <div style="margin-top:22px; height:1px; background:${border};"></div>

        <div style="margin-top:22px; display:grid; gap:16px;">
          ${mini("Introduction", intro || "Add context.", muted)}
          ${mini("Executive Summary", summary || "Add a crisp executive summary.", muted)}
          ${mini("Key highlights", bulletsHtml(highlights, muted), muted)}
          ${mini("Risks / Watchouts", bulletsHtml(risks, muted), muted)}
          ${mini("Next steps", bulletsHtml(nextSteps, muted), muted)}
        </div>

        <div style="margin-top:22px; height:1px; background:${border};"></div>

        <div style="margin-top:14px; display:grid; grid-template-columns: 1fr 1fr 1fr; gap:10px;">
          ${metricInline(s1, border, muted)}
          ${metricInline(s2, border, muted)}
          ${metricInline(s3, border, muted)}
        </div>
      </div>
    ${docClose}
  `;
}

function section(title: string, bodyHtml: string, muted: string, border: string) {
  return `
    <div style="margin-top:18px; padding-top:18px; border-top:1px solid ${border};">
      <div style="font-size:14px; font-weight:900; letter-spacing:-0.01em;">${title}</div>
      <div style="margin-top:10px; font-size:15px; line-height:1.75; color:${muted};">${bodyHtml}</div>
    </div>
  `;
}

function mini(title: string, bodyHtml: string, muted: string) {
  return `
    <div>
      <div style="font-size:13px; font-weight:900; letter-spacing:-0.01em;">${title}</div>
      <div style="margin-top:8px; font-size:15px; line-height:1.75; color:${muted};">${bodyHtml}</div>
    </div>
  `;
}

function panel(title: string, bodyHtml: string, accent: string, muted: string, border: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:18px; overflow:hidden;">
      <div style="padding:12px 14px; background: linear-gradient(90deg, ${accent}14, transparent); border-bottom:1px solid ${border};">
        <div style="font-size:13px; font-weight:900;">${title}</div>
      </div>
      <div style="padding: 12px 14px;">
        <div style="font-size:15px; line-height:1.75; color:${muted};">${bodyHtml}</div>
      </div>
    </div>
  `;
}

function metricCard(s: { label: string; value: string }, accent: string, muted: string, border: string) {
  return `
    <div style="padding:14px 14px; border-right:1px solid ${border};">
      <div style="font-size:12px; letter-spacing:0.10em; text-transform:uppercase; color:${muted}; font-weight:900;">
        ${esc(s.label || "Metric")}
      </div>
      <div style="margin-top:8px; font-size:22px; font-weight:900; color:#0a0a0a;">
        ${esc(s.value || "—")}
      </div>
      <div style="margin-top:10px; height:3px; border-radius:999px; background: linear-gradient(90deg, ${accent}, transparent); opacity:0.45;"></div>
    </div>
  `;
}

function metricMini(s: { label: string; value: string }, border: string, muted: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:14px; padding:10px 10px; background:#fff;">
      <div style="font-size:11px; letter-spacing:0.10em; text-transform:uppercase; color:${muted}; font-weight:900;">
        ${esc(s.label || "Metric")}
      </div>
      <div style="margin-top:6px; font-size:16px; font-weight:900;">${esc(s.value || "—")}</div>
    </div>
  `;
}

function metricInline(s: { label: string; value: string }, border: string, muted: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:16px; padding:12px 12px;">
      <div style="font-size:11px; letter-spacing:0.10em; text-transform:uppercase; color:${muted}; font-weight:900;">
        ${esc(s.label || "Metric")}
      </div>
      <div style="margin-top:7px; font-size:18px; font-weight:900;">${esc(s.value || "—")}</div>
    </div>
  `;
}
