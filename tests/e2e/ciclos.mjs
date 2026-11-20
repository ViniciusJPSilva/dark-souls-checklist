import assert from "node:assert/strict";

import { URL, OUT, launch } from "./setup.mjs";
const browser = await launch();
const errors = [];
let passed = 0;
const ok = (c, m) => { assert.ok(c, m); passed++; console.log("  ✔", m); };

for (const viewport of [{ width: 390, height: 844 }, { width: 1366, height: 800 }]) {
  console.log(`Viewport ${viewport.width}`);
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  page.on("pageerror", e => errors.push(String(e)));
  const text = s => page.locator(s).first().textContent();
  const visibleItems = sel => page.locator(`${sel}:not([hidden])`).count();

  await page.goto(URL + "?jogo=ds3");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector(".section");

  ok(await page.locator("#barExtra").isVisible(), "filtros de ciclo visíveis no DS3");
  ok((await page.locator("#sec-ds3-plano .row.is-step").count()) === 19, "plano com 19 passos");
  ok((await page.locator("#sec-ds3-plano .group-label").count()) === 4, "plano em 4 grupos");
  ok((await text("#statTrophies")) === "0/43", "plano não conta como troféu");
  ok((await text("#statItems")) === "0/272", "plano não conta como item");

  await page.evaluate(() => { document.querySelector("#sec-ds3-plano").open = true; document.querySelector('[data-toggle="plano-sirris"]').click(); });
  ok((await text("#sec-ds3-plano .sec-count")) === "1/19", "marcar passo do plano");
  ok((await text("#statTrophies")) === "0/43", "passo marcado não vira troféu");

  await page.click('#cicloSeg [data-ciclo="NG"]');
  ok((await visibleItems("#sec-ds3-aneis .row")) === 70, "Até NG: só os 70 anéis comuns");
  ok(await page.locator('#sec-ds3-aneis .group:has([data-id="a-life-ring-1"])').isHidden(), "grupos +1/+2 escondidos");
  ok((await visibleItems("#sec-ds3-plano .row")) === 11, `Até NG: plano sem passos de NG+/NG++ (${await visibleItems("#sec-ds3-plano .row")})`);
  await page.click('#cicloSeg [data-ciclo="NG+"]');
  ok((await visibleItems("#sec-ds3-aneis .row")) === 90, "Até NG+: 70 + 20");
  await page.click('#cicloSeg [data-ciclo="NG++"]');
  ok((await visibleItems("#sec-ds3-aneis .row")) === 107, "Até NG++: todos os 107");

  await page.click("#soPerdiveis");
  const perd = await page.locator(".row:not([hidden])").count();
  const perdData = await page.locator(".row[data-perdivel]").count();
  ok(perd === perdData && perd > 20, `Só perdíveis mostra ${perd} linhas marcadas como perdíveis`);
  ok(await page.locator("#sec-ds3-estus").isHidden(), "seções sem perdíveis somem");
  await page.screenshot({ path: `${OUT}/fase3-perdiveis-${viewport.width}.png` });
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "sem rolagem horizontal");

  await page.reload();
  await page.waitForSelector(".section");
  ok(await page.locator("#soPerdiveis").getAttribute("aria-pressed") === "true", "filtro de perdíveis persiste");
  await page.click("#soPerdiveis");
  await page.click('#cicloSeg [data-ciclo="NG+"]');
  await page.reload();
  await page.waitForSelector(".section");
  ok(await page.locator('#cicloSeg [data-ciclo="NG+"]').getAttribute("aria-pressed") === "true", "ciclo escolhido persiste");
  ok((await text("#sec-ds3-plano .sec-count")) === "1/19", "passo do plano persiste");

  await page.click('#games a[data-jogo="ds1"]');
  await page.waitForSelector(".is-reforco");
  ok(await page.locator("#barExtra").isHidden(), "DS1 não mostra filtro de ciclo");
  ok((await page.locator(".row:not([hidden])").count()) > 100, "filtros do DS3 não afetam o DS1");
  await ctx.close();
}

await browser.close();
console.log(`\n${passed} verificações ok`);
if (errors.length) { console.log("Erros no console:\n" + errors.join("\n")); process.exit(1); }
console.log("Nenhum erro no console.");
