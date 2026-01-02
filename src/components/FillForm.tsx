"use client";

import type { Block, Answers } from "@/lib/templates/types";

export function FillForm({
  blocks,
  answers,
  setAnswers,
}: {
  blocks: Block[];
  answers: Answers;
  setAnswers: (a: Answers) => void;
}) {
  return (
    <div className="space-y-4">
      {blocks.map((b) => {
        if (b.kind === "divider") return <hr key={b.id} />;

        if (b.kind === "text")
          return (
            <div key={b.id}>
              <label className="text-sm font-medium">{b.label}</label>
              <input
                className="mt-1 w-full rounded-lg border p-2"
                placeholder={b.placeholder}
                value={answers[b.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [b.id]: e.target.value })
                }
              />
            </div>
          );

        if (b.kind === "textarea")
          return (
            <div key={b.id}>
              <label className="text-sm font-medium">{b.label}</label>
              <textarea
                rows={b.rows ?? 4}
                className="mt-1 w-full rounded-lg border p-2"
                placeholder={b.placeholder}
                value={answers[b.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [b.id]: e.target.value })
                }
              />
            </div>
          );

        if (b.kind === "bullets")
          return (
            <div key={b.id}>
              <label className="text-sm font-medium">{b.label}</label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border p-2"
                placeholder="One bullet per line"
                value={(answers[b.id] || []).join("\n")}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    [b.id]: e.target.value.split("\n").filter(Boolean),
                  })
                }
              />
            </div>
          );

                  if (b.kind === "stat")
          return (
            <div key={b.id}>
              <label className="text-sm font-medium">{b.label}</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <input
                  className="w-full rounded-lg border p-2"
                  placeholder={b.fields.label}
                  value={(answers[b.id]?.label ?? "") as string}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [b.id]: { ...(answers[b.id] ?? {}), label: e.target.value },
                    })
                  }
                />
                <input
                  className="w-full rounded-lg border p-2"
                  placeholder={b.fields.value}
                  value={(answers[b.id]?.value ?? "") as string}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [b.id]: { ...(answers[b.id] ?? {}), value: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          );

        return null;
      })}
    </div>
  );
}
