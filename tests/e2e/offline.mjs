import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { URL, OUT, launch } from "./setup.mjs";

const ROOT = fileURLToPath(new globalThis.URL("../..", import.meta.url));
const errors = [];
let passed = 0;
const ok = (c, m) => { assert.ok(c, m); passed++; console.log("  ✔", m); };

console.log("Arquivos e manifest");
const sw = readFileSync(join(ROOT, "sw.js"), "utf8");
const lista = new Set(JSON.parse(sw.match(/const ARQUIVOS = (\[[\s\S]*?\]);/)[1]));
const walk = dir => readdirSync(dir).flatMap(f => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [relative(ROOT, p).split(sep).join("/")];
});
const noDisco = new Set(["./", "index.html", "manifest.webmanifest", ...walk(join(ROOT, "js")), ...walk(join(ROOT, "css")), ...walk(join(ROOT, "assets"))]);
const faltando = [...noDisco].filter(f => !lista.has(f));
const sobrando = [...lista].filter(f => !noDisco.has(f));
ok(!faltando.length, `todo arquivo do site está no pré-cache${faltando.length ? `: faltam ${faltando.join(", ")}` : ""}`);
ok(!sobrando.length, `pré-cache sem arquivos inexistentes${sobrando.length ? `: ${sobrando.join(", ")}` : ""}`);
const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.webmanifest"), "utf8"));
ok(manifest.icons.some(i => i.sizes === "192x192") && manifest.icons.some(i => i.sizes === "512x512") && manifest.icons.some(i => i.purpose === "maskable"), "manifest com ícones 192, 512 e maskable");
ok(manifest.start_url === "./" && manifest.scope === "./" && manifest.display === "standalone", "manifest instalável com escopo relativo");

const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
page.on("console", m => { if (m.type() === "error" && !/Failed to load resource|ERR_INTERNET_DISCONNECTED/.test(m.text())) errors.push(m.text()); });
page.on("pageerror", e => errors.push(String(e)));
const text = s => page.locator(s).first().textContent();

console.log("Online");
await page.goto(URL + "?jogo=ds3");
await page.waitForSelector(".section");
await page.evaluate(() => navigator.serviceWorker.ready);
ok(await page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration())), "service worker registrado");
const precache = await page.evaluate(async () => (await (await caches.open("app-v1")).keys()).length);
ok(precache === lista.size, `pré-cache completo (${precache}/${lista.size})`);
await page.reload();
await page.waitForSelector(".section");
ok(await page.evaluate(() => !!navigator.serviceWorker.controller), "página controlada pelo service worker");
await page.click('[data-toggle="t-iudex"]');
await page.evaluate(() => document.querySelector("#sec-ds3-estus").scrollIntoView());
await page.waitForTimeout(1500);
const imgsVistas = await page.evaluate(async () => (await (await caches.open("imagens")).keys()).length);
ok(imgsVistas > 5, `imagens vistas guardadas (${imgsVistas})`);

console.log("Sem conexão");
await ctx.setOffline(true);
await page.waitForTimeout(200);
ok((await text("#toast")).includes("Sem conexão"), "aviso de sem conexão");
await page.reload();
await page.waitForSelector(".section");
ok((await page.locator(".section").count()) === 13, "DS3 abre sem conexão");
ok(await page.locator('[data-id="t-iudex"]').evaluate(el => el.classList.contains("is-done")), "progresso continua lá");
const platOk = await page.locator("#platIcon").evaluate(img => img.complete && img.naturalWidth > 0);
ok(platOk, "imagem já vista aparece sem conexão");
await page.click('[data-toggle="t-vordt"]');
await page.click('#games a[data-jogo="ds1"]');
await page.waitForSelector(".is-reforco");
ok((await page.locator(".is-reforco").count()) === 10, "trocar para o DS1 funciona sem conexão");
await page.click('#games a[data-jogo="ds3"]');
await page.waitForSelector(".section");
ok(await page.locator('[data-id="t-vordt"]').evaluate(el => el.classList.contains("is-done")), "marcação feita sem conexão fica salva");
await page.click("#rtFab");
await page.waitForTimeout(300);
ok((await text(".rt-here strong")) === "Grande Madeira Apodrecida", "roteiro funciona sem conexão");
await page.screenshot({ path: `${OUT}/offline-roteiro.png` });
await ctx.setOffline(false);
await page.waitForTimeout(200);
ok((await text("#toast")).includes("Conexão de volta"), "aviso de conexão de volta");

await browser.close();
console.log(`\n${passed} verificações ok`);
if (errors.length) { console.log("Erros no console:\n" + errors.join("\n")); process.exit(1); }
console.log("Nenhum erro no console.");
