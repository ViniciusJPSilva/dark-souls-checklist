import assert from "node:assert/strict";

import { URL, OUT, launch } from "./setup.mjs";
const browser = await launch();
const errors = [];
let passed = 0;
const ok = (c, m) => { assert.ok(c, m); passed++; console.log("  ✔", m); };

const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
page.on("pageerror", e => errors.push(String(e)));
const text = s => page.locator(s).first().textContent();

console.log("Progresso da versão em produção (antes do multi-jogo)");
await page.goto(URL);
await page.evaluate(() => {
  localStorage.clear();
  localStorage.setItem("dsr-checklist:v1", JSON.stringify({ checks: { "s-luz": true, "t-ignea": true, "t-ignea:pre": true, "t-ignea:5": true, "t-ignea:10": true }, open: {}, showEn: true, filter: "all", platform: "xbox" }));
});
await page.reload();
await page.waitForSelector(".is-reforco");
ok(await page.evaluate(() => document.body.dataset.jogo) === "ds1", "sem escolha prévia abre o DS1");
ok(await page.evaluate(() => document.body.dataset.plat) === "xbox", "plataforma antiga (xbox) migrada");
ok(await page.evaluate(() => document.body.classList.contains("show-en")), "nomes em inglês migrados");
const st = await page.evaluate(() => JSON.parse(localStorage.getItem("dsr-checklist:v1")));
ok(st.checks["s-luz"] && st.checks["t-ignea:10"], "marcações preservadas");
ok(!("platform" in st) && !("showEn" in st), "preferências saem do estado do DS1");
const pf = await page.evaluate(() => JSON.parse(localStorage.getItem("souls-checklist:prefs")));
ok(pf.platform === "xbox" && pf.showEn === true && pf.jogo === "ds1", "preferências gerais salvas");
ok((await text("#gameTitle")).replace(/\s+/g, " ").trim() === "Dark Souls Remastered", "título do DS1");
ok((await page.locator("#games a").count()) === 3, "abas DS1, DS2 e DS3");
ok(await page.locator('#games a[data-jogo="ds1"]').getAttribute("aria-current") === "page", "DS1 marcado como atual");
ok(await page.locator('[data-act="guia"]').isVisible() === false, "menu fechado");
await page.click("#menuBtn");
ok(await page.locator('[data-act="guia"]').isVisible(), "guia de materiais disponível no DS1");
await page.keyboard.press("Escape");
await page.screenshot({ path: `${OUT}/jogos-ds1.png` });

console.log("DS2");
await page.click('#games a[data-jogo="ds2"]');
await page.waitForSelector(".soon");
ok(page.url().endsWith("?jogo=ds2"), "URL ?jogo=ds2");
ok((await text(".soon-text")) === "Ainda não foi implementado.", "aviso de não implementado");
ok((await text(".soon-joke")) === "Ps.: é o melhor souls.", "piada do DS2");
ok(!(await page.locator("#plat").isVisible()) && !(await page.locator("#bar").isVisible()), "esconde progresso e barra");
ok((await text("#gameTitle")).replace(/\s+/g, " ").trim() === "Dark Souls II", "título do DS2");
ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "sem rolagem horizontal");
await page.screenshot({ path: `${OUT}/jogos-ds2.png` });

console.log("DS3");
await page.click('#games a[data-jogo="ds3"]');
await page.waitForSelector(".section");
ok(await page.locator(".soon").count() === 0, "DS3 já não é placeholder");
await page.goto(URL);
await page.waitForSelector(".section");
ok(await page.evaluate(() => document.body.dataset.jogo) === "ds3", "lembra o último jogo escolhido");

console.log("Volta ao DS1");
await page.click('#games a[data-jogo="ds1"]');
await page.waitForSelector(".is-reforco");
const st2 = await page.evaluate(() => JSON.parse(localStorage.getItem("dsr-checklist:v1")));
ok(st2.checks["s-luz"] && st2.checks["t-ignea:10"], "progresso do DS1 intacto depois de trocar de jogo");
ok(await page.evaluate(() => document.body.dataset.plat) === "xbox", "plataforma mantida entre jogos");

await browser.close();
console.log(`\n${passed} verificações ok`);
if (errors.length) { console.log("Erros no console:\n" + errors.join("\n")); process.exit(1); }
console.log("Nenhum erro no console.");
