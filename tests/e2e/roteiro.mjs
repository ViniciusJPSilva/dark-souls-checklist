import assert from "node:assert/strict";

import { URL, OUT, launch } from "./setup.mjs";
const browser = await launch();
const errors = [];
let passed = 0;
const ok = (c, m) => { assert.ok(c, m); passed++; console.log("  ✔", m); };

async function setup(viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  page.on("pageerror", e => errors.push(String(e)));
  await page.goto(URL + "?jogo=ds3");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector(".section");
  return { ctx, page, text: s => page.locator(s).first().textContent() };
}

console.log("Celular 390px");
{
  const { ctx, page, text } = await setup({ width: 390, height: 844 });
  ok(await page.locator("#rtFab").isVisible(), "botão Roteiro no canto inferior direito");
  const fb = await page.locator("#rtFab").boundingBox();
  ok(fb.x + fb.width >= 390 - 20 && fb.y + fb.height >= 844 - 24, `posição do botão ${Math.round(fb.x)},${Math.round(fb.y)}`);
  ok(fb.height >= 44, "alvo de toque do botão");
  ok(!(await page.locator("#roteiro").isVisible()), "roteiro fechado por padrão");
  await page.click("#rtFab");
  await page.waitForTimeout(400);
  ok(await page.locator("#roteiro").isVisible(), "botão abre o roteiro");
  const box = await page.locator("#roteiro").boundingBox();
  ok(Math.round(box.x) === 0 && Math.round(box.width) === 390, "roteiro em tela cheia no celular");
  ok((await page.locator(".rt-node").count()) === 19, "19 etapas na linha do tempo");
  ok((await page.locator(".rt-node.is-ramo").count()) === 5, "5 ramos opcionais");
  ok((await text(".rt-here strong")) === "Iudex Gundyr", "próximo chefe: Iudex");
  ok(await page.locator('.rt-node[data-node="rt-iudex"] .rt-card').evaluate(d => d.open), "etapa atual aberta");
  await page.screenshot({ path: `${OUT}/rota-390-aberto.png` });

  await page.click('.rt-node[data-node="rt-iudex"] [data-rt-toggle="t-iudex"]');
  ok((await text(".rt-here strong")) === "Vordt do Vale Boreal", "derrotar Iudex avança para Vordt");
  ok(await page.locator('.rt-node[data-node="rt-vordt"] .rt-card').evaluate(d => d.open), "nova etapa abre sozinha");
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem("ds3-checklist:v1")).checks["t-iudex"]), "chefe marcado salva no checklist");
  ok(await page.locator('.rt-node[data-node="rt-iudex"]').evaluate(el => el.classList.contains("is-late")), "Iudex vencido com pendência fica para trás");
  ok((await text(".rt-late")).startsWith("1 pendência"), "contador de pendências para trás");
  await page.evaluate(() => { document.querySelector('.rt-node[data-node="rt-iudex"] .rt-card').open = true; });
  await page.click('.rt-node[data-node="rt-iudex"] [data-rt-toggle="t-acendendo"]');
  ok(await page.locator(".rt-late").count() === 0 && await page.locator('.rt-node[data-node="rt-iudex"]').evaluate(el => el.classList.contains("is-done")), "pegar a pendência conclui a etapa");

  await page.click('.rt-node[data-node="rt-madeira"] summary');
  ok((await page.locator('.rt-node[data-node="rt-madeira"] .rt-prazo').count()) === 1, "prazo do pacto Criadores de Montes");
  await page.click('.rt-node[data-node="rt-madeira"] [data-rt-toggle="t-montes"]');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem("ds3-checklist:v1")).checks["t-montes"]), "marcar no roteiro marca no checklist");
  await page.click('.rt-node[data-node="rt-madeira"] [data-rt-toggle="t-montes"]');
  ok(!(await page.evaluate(() => JSON.parse(localStorage.getItem("ds3-checklist:v1")).checks["t-montes"])), "desmarcar no roteiro");

  const madeira = '.rt-node[data-node="rt-madeira"]';
  ok((await page.locator(`${madeira} .rt-group`).first().textContent()) === "Missões", "missões aparecem primeiro na etapa");
  ok((await page.locator(`${madeira} .rt-passo`).count()) === 6, "6 passos de missão antes da Grande Madeira");
  ok((await page.locator(`${madeira} [data-rt-toggle="p-fireball"]`).count()) === 1, "piromancias de Cornyx entram ao libertá-lo");
  ok((await page.locator(`${madeira} [data-rt-toggle="q-yoel-2"] .rt-passo-prazo`).count()) === 1, "passo com prazo em vermelho");
  const antes = await text("#statTrophies");
  await page.click(`${madeira} [data-rt-toggle="q-cornyx-1"]`);
  ok(await page.locator(`${madeira} [data-rt-toggle="q-cornyx-1"]`).getAttribute("aria-pressed") === "true", "marcar passo de missão");
  ok((await text("#statTrophies")) === antes && (await text("#statItems")) === "0/272", "passo não conta como troféu nem item");
  ok((await text(".rt-free .rt-count")) === "0/48", "48 itens sem prazo fixo");
  await page.evaluate(() => { document.querySelector('.rt-node[data-node="rt-vigilantes"] .rt-card').open = true; });
  ok((await page.locator('.rt-node[data-node="rt-vigilantes"] [data-rt-toggle="g-darkmoon-loyalty"]').count()) === 1, "Darkmoon Loyalty junto das Cinzas de caçador de sonhos");
  ok((await page.locator('.rt-node[data-node="rt-vigilantes"] [data-rt-toggle="q-orbeck-2"] .rt-passo-prazo').count()) === 1, "prazo do Orbeck no Forte de Farron");
  await page.reload();
  await page.waitForSelector(".section");
  await page.click("#rtFab");
  await page.waitForTimeout(300);
  await page.evaluate(() => { document.querySelector('.rt-node[data-node="rt-madeira"] .rt-card').open = true; });
  ok(await page.locator('[data-rt-toggle="q-cornyx-1"]').getAttribute("aria-pressed") === "true", "passo de missão persiste");
  await page.screenshot({ path: `${OUT}/rota-390-missoes.png` });

  ok((await page.locator('[data-rt-info="q-cornyx-1"]').count()) === 0, "passo de missão sem ⓘ");
  const infoBox = await page.locator('.rt-node[data-node="rt-madeira"] [data-rt-info="p-fireball"]').boundingBox();
  ok(infoBox.width >= 44 && infoBox.height >= 44, `alvo de toque do ⓘ ${Math.round(infoBox.width)}x${Math.round(infoBox.height)}`);
  await page.click('.rt-node[data-node="rt-madeira"] [data-rt-info="p-fireball"]');
  ok(await page.locator("#sheet").isVisible(), "ⓘ abre a ficha do item");
  const ficha = await text("#sheetBody");
  ok(ficha.includes("Cornyx do Grande Pântano") && ficha.includes("Santuário do Elo de Fogo"), "ficha mostra vendedor e local");
  ok(await page.locator('[data-toggle="p-fireball"]').getAttribute("aria-pressed") === "false", "ⓘ não marca o item");
  await page.screenshot({ path: `${OUT}/rota-390-ficha.png` });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  ok(!(await page.locator("#sheet").isVisible()) && await page.locator("#roteiro").isVisible(), "Esc fecha a ficha e mantém o roteiro aberto");
  await page.click('.rt-node[data-node="rt-madeira"] [data-rt-info="t-montes"]');
  ok((await page.locator("#sheetBody .note.perdivel").count()) === 1, "ficha de troféu mostra o aviso de perdível");
  await page.click("#sheetBody [data-sheet-toggle]");
  ok(await page.locator('.rt-node[data-node="rt-madeira"] [data-rt-toggle="t-montes"]').getAttribute("aria-pressed") === "true", "marcar pela ficha atualiza o roteiro");
  await page.click("#sheetClose");
  await page.click('.rt-node[data-node="rt-madeira"] [data-rt-info="t-madeira"]');
  ok((await text("#sheetBody .d-title")) === "Grande Madeira Apodrecida", "ⓘ do chefe abre a ficha do troféu");
  await page.click("#sheetClose");

  await page.click('[data-rt-close]');
  await page.waitForTimeout(400);
  ok(!(await page.locator("#roteiro").isVisible()), "fechar pelo X");
  await page.evaluate(() => document.querySelector('[data-toggle="e-1"]').click());
  await page.click("#rtFab");
  await page.waitForTimeout(300);
  ok(await page.locator('.rt-node[data-node="rt-vordt"] [data-rt-toggle="e-1"]').getAttribute("aria-pressed") === "true", "marcar no checklist aparece no roteiro");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  ok(!(await page.locator("#roteiro").isVisible()), "Esc fecha");
  await page.click("#rtFab");
  await page.waitForTimeout(300);
  await page.mouse.click(5, 400);
  await page.waitForTimeout(300);
  ok(await page.locator("#roteiro").isVisible(), "roteiro em tela cheia cobre a página");
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "sem rolagem horizontal");
  await page.click('[data-rt-close]');

  await page.click('#games a[data-jogo="ds1"]');
  await page.waitForSelector(".is-reforco");
  ok(await page.locator("#rtFab").isHidden(), "DS1 sem roteiro");
  await ctx.close();
}

console.log("Desktop 1366px");
{
  const { ctx, page, text } = await setup({ width: 1366, height: 800 });
  ok(await page.locator("#rtFab").isHidden(), "sem botão flutuante no desktop");
  ok(await page.locator("#roteiro").isVisible(), "roteiro ao lado do checklist");
  const r = await page.locator("#roteiro").boundingBox();
  const a = await page.locator("#app").boundingBox();
  ok(r.x > a.x + a.width - 2, `painel à direita (${Math.round(a.x + a.width)} → ${Math.round(r.x)})`);
  ok(Math.round(r.width) === 400, "painel de 400px");
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(300);
  const r2 = await page.locator("#roteiro").boundingBox();
  ok(r2.y >= 0 && r2.y < 300, `painel fixo ao rolar (y=${Math.round(r2.y)})`);
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "sem rolagem horizontal");
  await page.click('.rt-node[data-node="rt-iudex"] [data-rt-toggle="t-iudex"]');
  ok((await text(".rt-here strong")) === "Vordt do Vale Boreal", "avança no desktop");
  await page.evaluate(() => { document.querySelector('.rt-node[data-node="rt-vordt"] .rt-card').open = true; });
  await page.click('.rt-node[data-node="rt-vordt"] [data-rt-info="e-1"]');
  ok((await text("#sheetBody")).includes("Chave da Cela"), "ⓘ no desktop abre a ficha com o local");
  await page.click("#sheetClose");
  ok(await page.locator('[data-id="t-iudex"]').evaluate(el => el.classList.contains("is-done")), "checklist ao lado atualiza");
  await page.mouse.wheel(0, -5000);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/rota-1366.png` });
  await ctx.close();
}

await browser.close();
console.log(`\n${passed} verificações ok`);
if (errors.length) { console.log("Erros no console:\n" + errors.join("\n")); process.exit(1); }
console.log("Nenhum erro no console.");
