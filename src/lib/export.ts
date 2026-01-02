import { toPng } from "html-to-image";

export async function exportAsPng(node: HTMLElement, filename = "typesimple.png") {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "white",
  });

  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export function printNode(node: HTMLElement) {
  const win = window.open("", "_blank");
  if (!win) return;

  win.document.write(`
    <html>
      <head>
        <title>TypeSimple</title>
        <style>
          body { margin: 0; padding: 24px; background: white; }
        </style>
      </head>
      <body>
        ${node.outerHTML}
        <script>
          window.onload = () => window.print();
        </script>
      </body>
    </html>
  `);
  win.document.close();
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}
