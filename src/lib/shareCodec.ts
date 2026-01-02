// Lightweight URL-safe base64 codec (no deps)
export function encodeSharePayload(payload: any) {
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json, "utf8").toString("base64");
  return b64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export function decodeSharePayload(d: string) {
  const pad = d.length % 4 ? "=".repeat(4 - (d.length % 4)) : "";
  const b64 = d.replaceAll("-", "+").replaceAll("_", "/") + pad;
  const json = Buffer.from(b64, "base64").toString("utf8");
  return JSON.parse(json);
}
