import PptxGenJS from "pptxgenjs";

export async function exportPitchDeckPptx(args: {
  slides: Array<{
    type: string;
    data: { title?: string; subtitle?: string; bullets?: string[]; footer?: string };
  }>;
  theme: { accent?: string };
  layoutId: string;
}) {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE"; // 13.333 x 7.5

  const accent = args.theme.accent ?? "#6366f1";
  const accentHex = accent.replace("#", "");

  for (let i = 0; i < args.slides.length; i++) {
    const s = args.slides[i];
    const slide = pptx.addSlide();

    const isDark = args.layoutId === "deck_d";

    // background
    slide.background = { color: isDark ? "0B0C10" : "FFFFFF" };

    // accent bar for Deck A / C
    if (args.layoutId === "deck_a" || args.layoutId === "deck_c") {
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.5,
        y: 1.2,
        w: 0.12,
        h: 1.6,
        fill: { color: accentHex },
        line: { color: accentHex },
      });
    }

    const title = s.data.title ?? "Untitled";
    const subtitle = s.data.subtitle ?? "";
    const bullets = Array.isArray(s.data.bullets) ? s.data.bullets : [];

    const titleColor = isDark ? "F4F4F5" : "0A0A0A";
    const mutedColor = isDark ? "D4D4D8" : "52525B";

    slide.addText(title, {
      x: 0.9,
      y: 1.1,
      w: 11.5,
      h: 1.2,
      fontFace: "Aptos Display",
      fontSize: 44,
      bold: true,
      color: titleColor,
    });

    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.9,
        y: 2.25,
        w: 11.5,
        h: 1.0,
        fontFace: "Aptos",
        fontSize: 18,
        color: mutedColor,
      });
    }

    if (bullets.length) {
      slide.addText(bullets.map((b) => `• ${b}`).join("\n"), {
        x: 0.95,
        y: 3.1,
        w: 11.2,
        h: 3.8,
        fontFace: "Aptos",
        fontSize: 18,
        color: titleColor,
        lineSpacingMultiple: 1.25,
      });
    }

    // tiny slide number
    slide.addText(`${i + 1}/${args.slides.length}`, {
      x: 12.0,
      y: 0.25,
      w: 1.0,
      h: 0.3,
      fontFace: "Aptos",
      fontSize: 12,
      color: mutedColor,
      align: "right",
    });
  }

  const blob = (await pptx.write({ outputType: "blob" })) as Blob;

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "typesimple-pitch-deck.pptx";
  a.click();
  URL.revokeObjectURL(a.href);
}
