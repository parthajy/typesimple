import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

export function makeShareSlug() {
  return nanoid(); // 10 chars
}
