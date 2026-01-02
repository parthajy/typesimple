export async function exportHtmlAsDoc(html: string, filename: string) {
  const docHtml = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>TypeSimple</title>
    </head>
    <body>${html}</body>
  </html>`;

  const blob = new Blob([docHtml], { type: "application/msword" });
  downloadBlob(blob, filename);
}

export async function exportHtmlAsPdf(html: string, filename: string) {
  const [{ jsPDF }, { toPng }] = await Promise.all([import("jspdf"), import("html-to-image")]);

  // Render into hidden host so we capture *only* the artifact (not the UI chrome)
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-99999px";
  host.style.top = "0";
  host.style.width = "1200px";
  host.style.background = "white";
  document.body.appendChild(host);

  try {
    host.innerHTML = html;
    const node = host.firstElementChild as HTMLElement | null;
    if (!node) throw new Error("Nothing to export");

    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "white",
    });

    // A4 portrait in pt
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    // Load image to get intrinsic size
    const img = await loadImage(dataUrl);

    // Fit image into A4 with margins
    const margin = 28;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;

    const scale = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;

    const x = (pageW - w) / 2;
    const y = margin;

    pdf.addImage(dataUrl, "PNG", x, y, w, h);
    pdf.save(filename);
  } finally {
    host.remove();
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
