"use client";

export function ShareActions({
  onExport,
  onCopyLink,
  onPrint,
  onCopyText,
}: {
  onExport: () => void;
  onCopyLink: () => void;
  onPrint: () => void;
  onCopyText: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onExport}
        className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black hover:text-white transition"
      >
        Download image
      </button>

      <button
        onClick={onCopyLink}
        className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black hover:text-white transition"
      >
        Copy share link
      </button>

      <button
        onClick={onPrint}
        className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black hover:text-white transition"
      >
        Print
      </button>

      <button
        onClick={onCopyText}
        className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black hover:text-white transition"
      >
        Copy text
      </button>
    </div>
  );
}
