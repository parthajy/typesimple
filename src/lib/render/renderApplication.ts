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

function watermark() {
  return `
    <div style="
      position:absolute; top:16px; right:16px;
      font-size:11px; letter-spacing:0.10em; text-transform:uppercase;
      opacity:0.55; font-weight:800;
    ">TypeSimple · Free</div>
  `;
}

export function renderApplication(answers: any, theme: ThemeTokens, layoutId: string) {
  const a = answers ?? {};

  const accent = theme.accent ?? "#0ea5e9";
  const text = theme.text ?? "#0a0a0a";
  const muted = theme.mutedText ?? "#52525b";
  const border = theme.border ?? "rgba(0,0,0,0.10)";
  const bg = theme.background ?? "#ffffff";

  const name = esc(a.name || "Your name");
  const role = esc(a.role || "Role");
  const company = esc(a.company || "Company");

  const email = esc(a.email || "");
  const phone = esc(a.phone || "");
  const location = esc(a.location || "");
  const links = esc(a.links || "");

  const summary = esc(a.summary || "");
  const why = esc(a.why || "");

  const experience = toBullets(a.experience);
  const projects = toBullets(a.projects);
  const skills = toBullets(a.skills);

  const availability = esc(a.availability || "");
  const comp = esc(a.comp || "");
  const references = toBullets(a.references);

  const footerNote = esc(a.footer_note || "TypeSimple · Free");

  const docOpen = `
    <div style="font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; color:${text};">
      <div style="
        width: 820px; max-width: 100%;
        margin: 0 auto;
        background:${bg};
        border: 1px solid ${border};
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 30px 90px rgba(0,0,0,0.10);
        position:relative;
      ">
        ${watermark()}
  `;

  const docClose = `
        <div style="border-top:1px solid ${border}; padding: 14px 22px; display:flex; justify-content:space-between; gap:14px;">
          <div style="font-size:12px; color:${muted};">${footerNote}</div>
          <div style="font-size:12px; color:${muted}; font-weight:700;">
            ${email || ""}
          </div>
        </div>
      </div>
    </div>
  `;

  // ---------------- Layout A: Hero (bold) ----------------
  if (layoutId === "app_a") {
    return `
      ${docOpen}
        <div style="position:relative; padding: 26px 26px 22px 26px; background:#0b1220;">
          <div style="position:absolute; inset:0; background:
            radial-gradient(circle at 70% 10%, ${accent}66, transparent 55%),
            linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02));"></div>
          <div style="position:relative;">
            <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.74); font-weight:900;">
              Application · ${company}
            </div>
            <div style="margin-top:10px; font-size:46px; font-weight:900; color:#fff; letter-spacing:-0.04em; line-height:1.0;">
              ${name}
            </div>
            <div style="margin-top:10px; font-size:14px; color:rgba(255,255,255,0.78);">
              ${role}
            </div>

            <div style="margin-top:18px; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
              ${pill(email, border)}
              ${pill(phone, border)}
              ${pill(location, border)}
              ${pill(links, border)}
            </div>
          </div>
        </div>

        <div style="padding: 22px 26px 22px 26px;">
          ${section("Profile summary", summary || "Add a crisp summary.", muted, border)}
          ${section("Why this role", why || "Add your rationale.", muted, border)}

          <div style="margin-top:18px; display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
            ${panel("Experience highlights", bulletsHtml(experience, muted), accent, muted, border)}
            ${panel("Key projects", bulletsHtml(projects, muted), accent, muted, border)}
          </div>

          <div style="margin-top:16px;">
            ${panel("Skills", bulletsHtml(skills, muted), accent, muted, border)}
          </div>

          <div style="margin-top:16px; display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
            ${kv("Availability", availability, muted, border)}
            ${kv("Compensation", comp, muted, border)}
          </div>

          <div style="margin-top:16px;">
            ${panel("References", bulletsHtml(references, muted), accent, muted, border)}
          </div>
        </div>
      ${docClose}
    `;
  }

  // ---------------- Layout B: Sidebar (clean) ----------------
  if (layoutId === "app_b") {
    return `
      ${docOpen}
        <div style="display:flex; gap:0;">
          <div style="width:200px; border-right:1px solid ${border}; background:${accent}14; padding:18px 14px;">
            <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${muted}; font-weight:900;">
              ${company}
            </div>
            <div style="margin-top:12px; font-size:22px; font-weight:900; letter-spacing:-0.02em;">${name}</div>
            <div style="margin-top:6px; font-size:12px; color:${muted}; font-weight:800;">${role}</div>

            <div style="margin-top:14px; border-top:1px solid ${border}; padding-top:12px; display:grid; gap:10px;">
              ${sideItem("Email", email, muted)}
              ${sideItem("Phone", phone, muted)}
              ${sideItem("Location", location, muted)}
              ${sideItem("Links", links, muted)}
            </div>

            <div style="margin-top:14px; border-top:1px solid ${border}; padding-top:12px;">
              <div style="font-size:11px; letter-spacing:0.10em; text-transform:uppercase; color:${muted}; font-weight:900;">Availability</div>
              <div style="margin-top:6px; font-size:12px; color:#111; font-weight:800;">${availability || "—"}</div>
            </div>

            <div style="margin-top:12px;">
              <div style="font-size:11px; letter-spacing:0.10em; text-transform:uppercase; color:${muted}; font-weight:900;">Comp</div>
              <div style="margin-top:6px; font-size:12px; color:#111; font-weight:800;">${comp || "—"}</div>
            </div>
          </div>

          <div style="flex:1; padding:22px 24px;">
            <div style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${muted}; font-weight:900;">Application</div>
            <div style="margin-top:10px; font-size:34px; font-weight:900; letter-spacing:-0.03em;">${role}</div>

            <div style="margin-top:16px; display:grid; gap:14px;">
              ${card("Profile summary", summary || "Add a crisp summary.", muted, border)}
              ${card("Why this role", why || "Add a rationale.", muted, border)}
            </div>

            <div style="margin-top:16px; display:grid; grid-template-columns: 1fr 1fr; gap:14px;">
              ${cardHtml("Experience highlights", bulletsHtml(experience, muted), muted, border)}
              ${cardHtml("Key projects", bulletsHtml(projects, muted), muted, border)}
            </div>

            <div style="margin-top:14px;">
              ${cardHtml("Skills", bulletsHtml(skills, muted), muted, border)}
            </div>

            <div style="margin-top:14px;">
              ${cardHtml("References", bulletsHtml(references, muted), muted, border)}
            </div>
          </div>
        </div>
      ${docClose}
    `;
  }

  // ---------------- Layout C: Minimal (editorial) ----------------
  return `
    ${docOpen}
      <div style="padding: 34px 34px 26px 34px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:14px;">
          <div>
            <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:${muted}; font-weight:900;">
              ${company}
            </div>
            <div style="margin-top:10px; font-size:56px; font-weight:900; letter-spacing:-0.04em; line-height:1.05;">
              ${name}
            </div>
            <div style="margin-top:10px; color:${muted}; font-size:14px;">
              ${role}
              ${location ? ` · ${location}` : ""}
            </div>
          </div>
          <div style="width:110px; height:110px; border-radius:18px; border:1px solid ${border}; background: linear-gradient(135deg, ${accent}22, transparent);"></div>
        </div>

        <div style="margin-top:18px; display:flex; flex-wrap:wrap; gap:10px;">
          ${tag(email)}
          ${tag(phone)}
          ${tag(links)}
        </div>

        <div style="margin-top:22px; height:1px; background:${border};"></div>

        <div style="margin-top:22px; display:grid; gap:16px;">
          ${mini("Profile summary", summary || "Add a crisp summary.", muted)}
          ${mini("Why this role", why || "Add a rationale.", muted)}
          ${mini("Experience highlights", bulletsHtml(experience, muted), muted)}
          ${mini("Key projects", bulletsHtml(projects, muted), muted)}
          ${mini("Skills", bulletsHtml(skills, muted), muted)}
          ${mini("Availability", availability || "—", muted)}
          ${mini("Compensation", comp || "—", muted)}
          ${mini("References", bulletsHtml(references, muted), muted)}
        </div>
      </div>
    ${docClose}
  `;
}

function section(title: string, body: string, muted: string, border: string) {
  return `
    <div style="margin-top:18px; padding-top:18px; border-top:1px solid ${border};">
      <div style="font-size:14px; font-weight:900; letter-spacing:-0.01em;">${title}</div>
      <div style="margin-top:10px; font-size:15px; line-height:1.75; color:${muted}; white-space:pre-wrap;">${body}</div>
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

function kv(label: string, value: string, muted: string, border: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:18px; padding:14px;">
      <div style="font-size:12px; letter-spacing:0.10em; text-transform:uppercase; color:${muted}; font-weight:900;">${label}</div>
      <div style="margin-top:8px; font-size:14px; font-weight:800;">${value || "—"}</div>
    </div>
  `;
}

function pill(v: string, border: string) {
  if (!v) return `<div style="border:1px dashed ${border}; border-radius:999px; padding:10px 12px; color:rgba(255,255,255,0.55); font-size:12px;">—</div>`;
  return `<div style="border:1px solid rgba(255,255,255,0.18); border-radius:999px; padding:10px 12px; color:#fff; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${v}</div>`;
}

function tag(v: string) {
  if (!v) return "";
  return `<div style="border:1px solid rgba(0,0,0,0.10); border-radius:999px; padding:8px 12px; font-size:12px; color:#111; background:rgba(0,0,0,0.02);">${v}</div>`;
}

function sideItem(k: string, v: string, muted: string) {
  return `
    <div>
      <div style="font-size:11px; letter-spacing:0.10em; text-transform:uppercase; color:${muted}; font-weight:900;">${k}</div>
      <div style="margin-top:6px; font-size:12px; color:#111; font-weight:800; overflow:hidden; text-overflow:ellipsis;">${v || "—"}</div>
    </div>
  `;
}

function card(title: string, body: string, muted: string, border: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:18px; padding:16px;">
      <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">${title}</div>
      <div style="margin-top:10px; font-size:14px; line-height:1.75; color:${muted}; white-space:pre-wrap;">${body}</div>
    </div>
  `;
}

function cardHtml(title: string, bodyHtml: string, muted: string, border: string) {
  return `
    <div style="border:1px solid ${border}; border-radius:18px; padding:16px;">
      <div style="font-size:12px; font-weight:900; letter-spacing:0.10em; text-transform:uppercase;">${title}</div>
      <div style="margin-top:10px; font-size:14px; line-height:1.75; color:${muted};">${bodyHtml}</div>
    </div>
  `;
}

function mini(title: string, bodyHtml: string, muted: string) {
  return `
    <div>
      <div style="font-size:13px; font-weight:900; letter-spacing:-0.01em;">${title}</div>
      <div style="margin-top:8px; font-size:15px; line-height:1.75; color:${muted}; white-space:pre-wrap;">${bodyHtml}</div>
    </div>
  `;
}
