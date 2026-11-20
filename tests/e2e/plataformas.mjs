import assert from "node:assert/strict";

import { URL, OUT, launch } from "./setup.mjs";
const KEY = "dsr-checklist:v1";
const browser = await launch();
const errors = [];
let passed = 0;
const ok = (c, m) => { assert.ok(c, m); passed++; console.log("  ✔", m); };

const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
page.on("pageerror", e => errors.push(String(e)));

await page.goto(URL);
const old = { checks: { "s-luz": true, "t-ignea": true, "t-excepcional": true }, open: {}, showEn: false, filter: "all" };
await page.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [KEY, old]);
await page.reload();
await page.waitForSelector(".is-reforco");

const text = sel => page.locator(sel).first().textContent();
const accent = () => page.evaluate(() => getComputedStyle(document.body).getPropertyValue("--ember").trim());
const pick = async id => { await page.click("#menuBtn"); await page.click(`[data-plat="${id}"]`); await page.keyboard.press("Escape"); };

console.log("Padrão Steam, depois PlayStation");
ok(await page.evaluate(() => document.body.dataset.plat) === "steam", "plataforma padrão é Steam");
await pick("ps");
ok((await text(".eyebrow")) === "Checklist de troféus", "eyebrow troféus");
ok((await text("#platTier")) === "Platina", "topo Platina");
ok((await text('[data-id="t-excepcional"] .tier')) === "Bronze", "nível Bronze");
ok(await accent() === "#e0893a", "cor âmbar");
ok(!(await page.locator("#statGWrap").isVisible()), "sem Gamerscore");
const c0 = await page.evaluate(k => JSON.parse(localStorage.getItem(k)).checks, KEY);
ok(c0["s-luz"] && c0["t-ignea"] && c0["t-ignea:10"], "progresso antigo preservado");

console.log("Xbox");
await pick("xbox");
ok((await text(".eyebrow")) === "Checklist de conquistas", "eyebrow conquistas");
ok((await text("#platTier")) === "50G · Mítica", "topo 50G · Mítica");
ok((await text('[data-id="t-excepcional"] .tier')) === "15G", "bronze vira 15G");
ok((await text("#sec-feiticos .coll .tier")).startsWith("25G"), "coleção prata vira 25G");
ok(await page.locator("#statGWrap").isVisible(), "Gamerscore visível");
const g0 = parseInt(await text("#statG"), 10);
ok(/^\d+\/1000G$/.test(await text("#statG")), `Gamerscore ${await text("#statG")}`);
ok(await accent() === "#5fb04a", "cor verde");
await page.screenshot({ path: `${OUT}/plat-xbox.png` });
await page.click('[data-toggle="t-rustica"]');
await page.waitForTimeout(100);
await page.click('[data-info="t-rustica"]');
ok((await text("#sheetBody .tier")) === "15G", "folha mostra 15G");
await page.click("#sheetClose");
await page.click("#plat");
ok((await text("#sheetBody")).includes("todas as outras 40 conquistas"), "requisito do topo no feminino");
ok((await text("#sheetBody .d-auto")).includes("Esta conquista é marcada"), "texto automático no feminino");
await page.click("#sheetClose");
ok(parseInt(await text("#statG"), 10) === g0 + 15, "Gamerscore soma 15G ao marcar um bronze");

console.log("Steam");
await pick("steam");
ok((await text(".eyebrow")) === "Checklist de conquistas", "eyebrow conquistas");
ok((await page.locator('[data-id="t-excepcional"] .tier').count()) === 0, "sem nível nos itens");
ok((await text("#platTier")) === "100%", "topo 100%");
ok((await text("#sec-feiticos .coll .tier")) === "Pendente", "coleção mostra só o status");
ok(await accent() === "#4c9bd3", "cor azul");
ok(!(await page.locator("#statGWrap").isVisible()), "sem Gamerscore");
ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "sem rolagem horizontal");
await page.screenshot({ path: `${OUT}/plat-steam.png` });
await page.click("#menuBtn");
await page.screenshot({ path: `${OUT}/plat-menu.png` });
await page.keyboard.press("Escape");

await page.reload();
await page.waitForSelector(".is-reforco");
ok(await page.evaluate(() => document.body.dataset.plat) === "steam", "plataforma persiste após recarregar");
const c1 = await page.evaluate(k => JSON.parse(localStorage.getItem(k)), KEY);
const pf = await page.evaluate(() => JSON.parse(localStorage.getItem("souls-checklist:prefs")));
ok(pf.platform === "steam" && c1.checks["s-luz"] && c1.checks["t-rustica"] && !("platform" in c1), "preferência salva à parte, sem mexer nas marcações");

await page.click("#menuBtn");
await page.click('[data-act="export"]');
const code = await page.locator("#dlgArea").inputValue();
await page.click("#dlgCancel");
ok(!("platform" in JSON.parse(Buffer.from(code, "base64").toString("utf8"))), "export continua só com as marcações");

await pick("ps");
ok((await text("#platTier")) === "Platina" && await accent() === "#e0893a", "volta para PlayStation");

await browser.close();
console.log(`\n${passed} verificações ok`);
if (errors.length) { console.log("Erros no console:\n" + errors.join("\n")); process.exit(1); }
console.log("Nenhum erro no console.");
