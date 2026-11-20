import assert from "node:assert/strict";

import { URL, OUT, launch } from "./setup.mjs";
const browser = await launch();
const errors = [];
const badImgs = new Set();
let passed = 0;
const ok = (c, m) => { assert.ok(c, m); passed++; console.log("  ✔", m); };

async function run(viewport, label) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  page.on("pageerror", e => errors.push(String(e)));
  page.on("response", r => { if (r.request().resourceType() === "image" && r.status() >= 400) badImgs.add(r.url()); });
  const text = s => page.locator(s).first().textContent();
  const st = k => page.evaluate(k => JSON.parse(localStorage.getItem(k) ?? "null"), k);

  console.log(label);
  await page.goto(URL);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("dsr-checklist:v1", JSON.stringify({ checks: { "s-luz": true, "t-ignea": true }, open: {}, filter: "all" }));
  });
  await page.goto(URL + "?jogo=ds3");
  await page.waitForSelector(".section");

  ok((await text("#gameTitle")).replace(/\s+/g, " ").trim() === "Dark Souls III", "título do DS3");
  ok((await page.locator(".section").count()) === 13, "13 seções");
  ok((await page.locator(".row.is-trophy").count()) === 34, "34 troféus em lista");
  ok((await page.locator(".coll").count()) === 8, "8 troféus de coleção");
  ok((await page.locator(".row.is-item").count()) === 272, "272 itens de coleção");
  ok((await text("#statTrophies")) === "0/43", `contador ${await text("#statTrophies")}`);
  ok((await text("#statItems")) === "0/272", "contador de itens");
  const counts = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll(".section")].map(s => [s.dataset.sec, s.querySelectorAll(".row").length])));
  ok(counts["ds3-feiticos"] === 34 && counts["ds3-piromancias"] === 27 && counts["ds3-milagres"] === 35, `magias sem DLC ${counts["ds3-feiticos"]}/${counts["ds3-piromancias"]}/${counts["ds3-milagres"]}`);
  ok(counts["ds3-aneis"] === 107 && counts["ds3-gestos"] === 33 && counts["ds3-infusao"] === 15 && counts["ds3-estus"] === 11 && counts["ds3-ossos"] === 10, "anéis, gestos, infusões e fragmentos");
  ok((await page.locator("#sec-ds3-aneis .ciclo").count()) === 37, "37 versões de anel com selo de ciclo");
  ok((await text('.row[data-id="a-life-ring-3"] .row-title')).startsWith("Anel da Vida +3") || (await text('.row[data-id="a-life-ring-3"] .ciclo')) === "NG++", "Anel da vida +3 no NG++");
  ok((await text("#platName")) === "A Alma Negra", "platina A Alma Negra");
  ok((await page.locator('.row[data-id="t-vigilantes"] .row-title').first().evaluate(el => el.firstChild.textContent)) === "Lordes das Cinzas: Vigilantes do Abismo", "nome oficial PT-BR");
  ok((await page.locator(".badge-perdivel").count()) >= 8, `selos de perdível: ${await page.locator(".badge-perdivel").count()}`);

  await page.click("#menuBtn");
  ok(!(await page.locator('[data-act="guia"]').isVisible()) && !(await page.locator('[data-act="seed"]').isVisible()), "sem guia de materiais e sem planilha no DS3");
  await page.click('[data-plat="xbox"]');
  await page.keyboard.press("Escape");
  ok((await text('.row[data-id="t-vigilantes"] .tier')) === "30G", "prata vale 30G no DS3");
  ok((await text('.row[data-id="t-final-acender"] .tier')) === "50G", "ouro vale 50G no DS3");
  ok((await text("#platTier")) === "70G · Mítica", "platina vale 70G no DS3");
  ok((await text("#statG")) === "0/1000G", "Gamerscore total 1000G");

  await page.click('[data-toggle="t-vigilantes"]');
  await page.click('[data-toggle="t-final-acender"]');
  ok((await text("#statG")) === "80/1000G", `Gamerscore soma ${await text("#statG")}`);
  ok((await text("#statTrophies")) === "2/43", "contador sobe");

  await page.click('[data-info="t-farron"]');
  ok((await page.locator("#sheetBody .note.perdivel").count()) === 1, "ficha mostra o aviso de perdível");
  await page.click("#sheetClose");

  const estus = await page.evaluate(() => [...document.querySelectorAll('#sec-ds3-estus .row')].map(r => r.dataset.id));
  for (const id of estus) await page.evaluate(id => document.querySelector(`[data-toggle="${id}"]`).click(), id);
  ok(await page.locator("#sec-ds3-estus .coll").evaluate(el => el.classList.contains("is-done")), "11 fragmentos marcam o Estus Definitivo sozinho");
  ok((await text("#statTrophies")) === "3/43", "troféu de coleção entra no contador");
  ok((await text("#statG")) === "110/1000G", `Gamerscore com coleção ${await text("#statG")}`);
  await page.evaluate(() => document.querySelector('[data-toggle="e-11"]').click());
  ok((await text("#statTrophies")) === "2/43", "desmarcar um fragmento tira o troféu");

  await page.evaluate(() => document.querySelector('#sec-ds3-aneis [data-info="a-silvercat-ring"]').click());
  ok((await page.locator("#sheetBody .note.perdivel").count()) === 1 && (await text("#sheetBody")).includes("Língua Pálida"), "Anel do gato prateado avisa o conflito com Rosaria");
  await page.click("#sheetClose");
  await page.evaluate(() => document.querySelector('#sec-ds3-aneis [data-info="a-life-ring-2"]').click());
  ok((await text("#sheetBody")).includes("NG++ (terceiro ciclo) em diante"), "ficha mostra o ciclo");
  await page.click("#sheetClose");

  await page.fill("#search", "ng++");
  await page.waitForTimeout(250);
  const ngpp = await page.locator(".row.is-item:not([hidden])").count();
  ok(ngpp === 17, `busca por ciclo NG++ (${ngpp})`);
  await page.fill("#search", "perdivel");
  await page.waitForTimeout(250);
  const vis = await page.locator(".row:not([hidden])").count();
  ok(vis >= 20 && vis < 300, `busca "perdivel" filtra (${vis})`);
  await page.fill("#search", "");
  await page.waitForTimeout(200);
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "sem rolagem horizontal");
  await page.screenshot({ path: `${OUT}/ds3-${viewport.width}.png` });

  await page.reload();
  await page.waitForSelector(".section");
  ok((await text("#statTrophies")) === "2/43", "DS3 persiste após recarregar");
  const s3 = await st("ds3-checklist:v1");
  const s1 = await st("dsr-checklist:v1");
  ok(s3.checks["t-vigilantes"] && !("s-luz" in s3.checks), "DS3 salvo na própria chave");
  ok(s1.checks["s-luz"] && s1.checks["t-ignea"] && !("t-vigilantes" in s1.checks), "DS1 intacto");

  await page.click('#games a[data-jogo="ds1"]');
  await page.waitForSelector(".is-reforco");
  ok((await text("#statTrophies")).startsWith("1/"), "DS1 mostra o próprio progresso");
  await page.click("#menuBtn");
  ok(await page.locator('[data-act="guia"]').isVisible() && await page.locator('[data-act="seed"]').isVisible(), "guia e planilha de volta no DS1");
  await page.keyboard.press("Escape");
  await ctx.close();
}

await run({ width: 390, height: 844 }, "Celular 390px");
await run({ width: 1366, height: 800 }, "Desktop 1366px");

await browser.close();
console.log(`\n${passed} verificações ok`);
if (badImgs.size) console.log("Imagens com erro:\n" + [...badImgs].join("\n"));
if (errors.length) { console.log("Erros no console:\n" + errors.join("\n")); process.exit(1); }
console.log("Nenhum erro no console.");
