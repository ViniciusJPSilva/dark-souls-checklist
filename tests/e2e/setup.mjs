import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const URL = process.env.BASE_URL ?? "http://127.0.0.1:8765/";
export const OUT = fileURLToPath(new globalThis.URL("../.out", import.meta.url));
mkdirSync(OUT, { recursive: true });

export function launch() {
  const executablePath = process.env.CHROME_PATH;
  return chromium.launch(executablePath ? { executablePath } : { channel: process.env.PW_CHANNEL ?? "chrome" });
}
