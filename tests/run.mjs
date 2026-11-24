import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PORT = 8765;
const SUITES = ["reforco", "plataformas", "jogos", "ds3", "ciclos", "roteiro", "offline"];
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json", ".webmanifest": "application/manifest+json" };

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = normalize(join(ROOT, path.endsWith("/") ? path + "index.html" : path));
  if (!file.startsWith(ROOT.replace(/[\\/]$/, "") + sep) && file !== ROOT) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});

const external = !!process.env.BASE_URL;
if (!external) await new Promise(r => server.listen(PORT, "127.0.0.1", r));

const only = process.argv.slice(2);
const lista = only.length ? SUITES.filter(s => only.includes(s)) : SUITES;
let falhas = 0;
let total = 0;

for (const nome of lista) {
  const out = await new Promise(resolve => {
    const p = spawn(process.execPath, [fileURLToPath(new URL(`./e2e/${nome}.mjs`, import.meta.url))], { env: process.env });
    let txt = "";
    p.stdout.on("data", d => { txt += d; });
    p.stderr.on("data", d => { txt += d; });
    p.on("close", code => resolve({ code, txt }));
  });
  const n = Number(out.txt.match(/(\d+) verificações ok/)?.[1] ?? 0);
  total += n;
  if (out.code !== 0) {
    falhas++;
    console.log(`✖ ${nome}\n${out.txt.split("\n").slice(-25).join("\n")}`);
  } else {
    console.log(`✔ ${nome}: ${n} verificações`);
  }
}

if (!external) server.close();
console.log(`\n${total} verificações em ${lista.length} suítes${falhas ? `, ${falhas} com falha` : ""}.`);
process.exit(falhas ? 1 : 0);
