import assert from "node:assert/strict";

import { URL, OUT, launch } from "./setup.mjs";
const KEY = "dsr-checklist:v1";
const browser = await launch();
const errors = [];
let passed = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); passed++; console.log("  ✔", msg); };

async function newPage(viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  page.on("pageerror", e => errors.push(String(e)));
  return { ctx, page };
}

const checks = page => page.evaluate(k => JSON.parse(localStorage.getItem(k) ?? "{}").checks ?? {}, KEY);
const stepState = async (page, tid) => {
  const c = await checks(page);
  return Object.keys(c).filter(k => k.startsWith(tid + ":")).map(k => (c[k] ? 1 : 0)).join("");
};
const noHScroll = page => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);

console.log("Mobile 390px");
{
  const { ctx, page } = await newPage({ width: 390, height: 844 });
  await page.goto(URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector(".is-reforco");

  ok((await page.locator(".is-reforco").count()) === 10, "10 cards de reforço");
  ok((await page.locator('[data-id="t-excepcional"] [data-pill]').textContent()) === "0/4 etapas", "pílula 0/4 etapas");
  ok(await noHScroll(page), "sem rolagem horizontal (fechado)");

  await page.click('[data-expand="t-excepcional"]');
  const card = page.locator('.is-reforco[data-id="t-excepcional"]');
  ok(await card.locator(".rf-body").isVisible(), "card expande ao tocar no corpo");
  ok((await card.locator("[data-braseiro]").count()) === 2, "2 braseiros (Grande e Enorme)");
  const qty = await card.locator("[data-mat] .rf-qty").allTextContents();
  ok(JSON.stringify(qty) === JSON.stringify(["99", "99", "77", "11"]), `materiais total/falta iniciais ${qty}`);
  ok(await noHScroll(page), "sem rolagem horizontal (aberto)");
  const stepBox = await card.locator(".rf-step").first().boundingBox();
  ok(stepBox.height >= 44, `alvo de toque da etapa ${stepBox.height}px`);
  await page.screenshot({ path: `${OUT}/mobile-card.png`, fullPage: false });
  await card.screenshot({ path: `${OUT}/mobile-card-only.png` });

  await page.click('[data-step="t-excepcional:10"]');
  ok((await stepState(page, "t-excepcional")) === "1110", "marcar +10 marca anteriores (cascata)");
  ok(!(await checks(page))["t-excepcional"], "troféu ainda pendente");
  const qty2 = await card.locator("[data-mat] .rf-qty").allTextContents();
  ok(JSON.stringify(qty2) === JSON.stringify(["9✔", "9✔", "77", "11"]), `falta recalculada ${qty2}`);
  ok((await card.locator("[data-pill]").textContent()) === "3/4 etapas", "pílula 3/4");

  await page.click('[data-step="t-excepcional:5"]');
  ok((await stepState(page, "t-excepcional")) === "1000", "desmarcar +5 desmarca posteriores");

  await page.click('[data-step="t-excepcional:15"]');
  ok((await stepState(page, "t-excepcional")) === "1111", "marcar última etapa marca todas");
  ok((await checks(page))["t-excepcional"] === true, "última etapa marca o troféu");
  ok(await card.evaluate(el => el.classList.contains("is-done")), "card fica como feito");

  await page.click('[data-step="t-excepcional:base"]');
  ok((await stepState(page, "t-excepcional")) === "0000", "desmarcar a primeira desmarca tudo");
  ok((await checks(page))["t-excepcional"] === false, "desmarcar etapa desmarca o troféu");

  await page.click('[data-toggle="t-rustica"]');
  ok((await stepState(page, "t-rustica")) === "111", "marcar troféu direto marca todas as etapas");
  ok((await page.locator("#toast").textContent()).includes("Todas as etapas"), "aviso no toast");
  ok(!(await page.locator('.is-reforco[data-id="t-rustica"] .rf-body').isVisible()), "check não expande o card");
  await page.click('[data-toggle="t-rustica"]');
  ok((await stepState(page, "t-rustica")) === "110" && !(await checks(page))["t-rustica"], "desmarcar troféu desmarca só a última etapa");

  await page.click('[data-expand="t-divina"]');
  await page.click('[data-step="t-divina:5"]');
  await page.reload();
  await page.waitForSelector(".is-reforco");
  ok((await stepState(page, "t-divina")) === "110", "etapas persistem após recarregar");
  ok((await page.locator('[data-id="t-divina"] [data-pill]').textContent()) === "2/3 etapas", "pílula persiste");

  await page.fill("#search", "enorme braseiro");
  await page.waitForTimeout(250);
  const vis = await page.locator(".is-reforco:not([hidden])").evaluateAll(els => els.map(e => e.dataset.id));
  ok(JSON.stringify(vis) === JSON.stringify(["t-excepcional"]), `busca por braseiro acha o troféu ${vis}`);
  await page.fill("#search", "placa de titanita branca");
  await page.waitForTimeout(250);
  const vis2 = await page.locator(".is-reforco:not([hidden])").evaluateAll(els => els.map(e => e.dataset.id));
  ok(JSON.stringify(vis2) === JSON.stringify(["t-divina", "t-oculta"]), `busca por material ${vis2}`);
  await page.fill("#search", "");
  await page.waitForTimeout(250);

  await page.click('#filters [data-filter="done"]');
  ok(!(await page.locator('.is-reforco[data-id="t-divina"]').isVisible()), "filtro Feitos ignora etapas (troféu pendente)");
  await page.click('#filters [data-filter="all"]');

  await page.click("#menuBtn");
  await page.click('[data-act="guia"]');
  ok(await page.locator("#guia").isVisible(), "guia abre pelo menu ⋮");
  const box = await page.locator("#guia").boundingBox();
  ok(box.width === 390 && box.height >= 840, `guia em tela cheia no celular ${box.width}x${box.height}`);
  ok((await page.locator("#guia [data-gsel]").count()) === 24, "guia lista 14 materiais + 10 braseiros");
  for (const id of ["titanita-cintilante", "titanita-demoniaca", "escama-de-dragao"]) ok(await page.locator(`#guia [data-gsel="${id}"]`).isVisible(), `guia inclui ${id}`);
  await page.fill("#guiaQ", "amêijoa");
  await page.waitForTimeout(200);
  const gvis = await page.locator("#guia li[data-gid]:not([hidden])").evaluateAll(els => els.map(e => e.dataset.gid));
  ok(JSON.stringify(gvis) === JSON.stringify(["titanita-cintilante"]), `busca no guia por inimigo ${gvis}`);
  await page.fill("#guiaQ", "lagarto");
  await page.waitForTimeout(200);
  ok((await page.locator("#guia li[data-gid]:not([hidden])").count()) >= 4, "busca 'lagarto' acha vários materiais");
  await page.screenshot({ path: `${OUT}/mobile-guia-lista.png` });
  await page.click('#guia [data-gsel="titanita-pedaco"]');
  ok(await page.locator("#guiaFicha").isVisible() && !(await page.locator("#guiaList").isVisible()), "ficha substitui a lista no celular");
  ok(page.url().endsWith("#mat-titanita-pedaco"), "hash #mat-<id> atualizado");
  ok((await page.locator("#guiaFicha .g-src").count()) >= 5, "ficha lista fontes de obtenção");
  ok((await page.locator("#guiaFicha .g-src .thumb.enemy").count()) >= 3, "inimigos com foto");
  ok((await page.locator("#guiaFicha .g-src:has(.t-bau) .thumb, #guiaFicha .g-src:has(.t-corpo) .thumb").count()) === 0, "baú/corpo sem foto");
  ok(await noHScroll(page), "sem rolagem horizontal no guia");
  ok(await page.locator("#guiaFicha").evaluate(el => el.scrollWidth <= el.clientWidth), "ficha sem rolagem horizontal");
  await page.screenshot({ path: `${OUT}/mobile-guia-ficha.png` });
  const links = await page.locator("#guiaFicha [data-goto]").evaluateAll(els => els.map(e => e.dataset.goto));
  ok(JSON.stringify(links) === JSON.stringify(["t-excepcional", "t-cristalizada", "t-eletrica"]), `Usado em ${links}`);
  await page.click('#guiaFicha [data-goto="t-eletrica"]');
  ok(!(await page.locator("#guia").isVisible()), "link 'Usado em' fecha o guia");
  ok(await page.locator('.is-reforco[data-id="t-eletrica"] .rf-body').isVisible(), "e expande o troféu");
  ok(!page.url().includes("#mat-"), "hash limpo ao fechar");

  await page.click('.is-reforco[data-id="t-eletrica"] [data-mat="titanita-placa"]');
  ok(await page.locator("#guia").isVisible() && (await page.locator("#guiaFicha .d-title").textContent()) === "Placa de titanita", "tocar material abre a ficha no guia");
  await page.click("#guia [data-guia-close]");

  await page.click('.is-reforco[data-id="t-eletrica"] [data-braseiro="grande-braseiro"]');
  ok(await page.locator("#sheet").isVisible() && (await page.locator("#sheetBody .d-title").textContent()) === "Grande braseiro", "tocar braseiro abre a folha");
  ok((await page.locator("#sheetBody").textContent()).includes("Açougueiro"), "info do braseiro com o texto de localização");
  await page.screenshot({ path: `${OUT}/mobile-braseiro.png` });
  await page.click("#sheetBody [data-guia]");
  ok(await page.locator("#guia").isVisible() && (await page.locator("#guiaFicha .d-title").textContent()) === "Grande braseiro", "folha do braseiro abre o guia");
  await page.click("#guia [data-guia-close]");

  await page.click('[data-info="t-oculta"]');
  const sheetText = await page.locator("#sheetBody").textContent();
  ok(sheetText.includes("Mundo da Pintura de Ariamis") && sheetText.includes("Requisito"), "ⓘ mantém req e obs");
  await page.click("#sheetClose");

  await page.click("#menuBtn");
  await page.click('[data-act="export"]');
  const code = await page.locator("#dlgArea").inputValue();
  await page.click("#dlgCancel");
  const exported = JSON.parse(Buffer.from(code, "base64").toString("utf8"));
  ok(exported["t-divina:5"] === true && "t-excepcional:15" in exported, "export inclui as etapas");

  await page.click("#menuBtn");
  await page.click('[data-act="clear"]');
  await page.click("#dlgOk");
  ok((await stepState(page, "t-divina")) === "000", "zerar tudo zera etapas");
  await page.click("#menuBtn");
  await page.click('[data-act="import"]');
  await page.fill("#dlgArea", code);
  await page.click("#dlgOk");
  ok((await stepState(page, "t-divina")) === "110", "import restaura as etapas");

  const legacy = Buffer.from(JSON.stringify({ "t-caotica": true, "t-excepcional": false })).toString("base64");
  await page.click("#menuBtn");
  await page.click('[data-act="import"]');
  await page.fill("#dlgArea", legacy);
  await page.click("#dlgOk");
  ok((await stepState(page, "t-caotica")) === "111", "import de código antigo migra etapas");
  await ctx.close();
}

console.log("Migração do localStorage antigo");
{
  const { ctx, page } = await newPage({ width: 390, height: 844 });
  await page.goto(URL);
  const old = { checks: { "t-oculta": true, "t-ignea": true, "t-magica": false, "s-luz": true }, open: { "armas-reforco": true }, showEn: false, filter: "all" };
  await page.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [KEY, old]);
  await page.reload();
  await page.waitForSelector(".is-reforco");
  ok((await stepState(page, "t-oculta")) === "111" && (await stepState(page, "t-ignea")) === "111", "troféus marcados ganham todas as etapas");
  ok((await stepState(page, "t-magica")) === "000", "troféus pendentes ficam sem etapas");
  const c = await checks(page);
  ok(c["t-oculta"] && c["s-luz"], "marcações antigas preservadas");
  ok((await page.locator('[data-id="t-oculta"] [data-pill]').textContent()) === "3/3 etapas", "pílula 3/3 após migração");
  await page.click('[data-expand="t-oculta"]');
  await page.click('[data-step="t-oculta:5"]');
  await page.reload();
  await page.waitForSelector(".is-reforco");
  ok((await stepState(page, "t-oculta")) === "110" && !(await checks(page))["t-oculta"], "migração roda só uma vez (não remarca)");
  await ctx.close();
}

console.log("Desktop 1366px");
{
  const { ctx, page } = await newPage({ width: 1366, height: 800 });
  await page.goto(URL + "#mat-titanita-placa-azul");
  await page.waitForSelector("#guia[open]");
  ok((await page.locator("#guiaFicha .d-title").textContent()) === "Placa de titanita azul", "hash #mat-<id> abre direto no material");
  const g = await page.locator("#guia").boundingBox();
  ok(g.width <= 900 && g.width >= 880, `modal largo ${g.width}px`);
  ok(await page.locator("#guiaList").isVisible() && await page.locator("#guiaFicha").isVisible(), "lista à esquerda e ficha à direita");
  await page.screenshot({ path: `${OUT}/desktop-guia.png` });
  await page.click("#menuBtn").catch(() => {});
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  ok(!(await page.locator("#guia").isVisible()), "Esc fecha o guia");
  await page.click("#menuBtn");
  await page.click("#optEn");
  await page.keyboard.press("Escape");
  await page.click('[data-expand="t-magica"]');
  const m = page.locator('.is-reforco[data-id="t-magica"]');
  ok(await m.locator(".rf-item-name .en").first().isVisible(), "nomes em inglês nos materiais");
  ok(await noHScroll(page), "sem rolagem horizontal no desktop");
  await m.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${OUT}/desktop-card.png` });
  await page.click('[data-mat="titanita-fragmento-verde"]');
  ok(await page.locator("#guiaFicha .d-en").isVisible(), "ficha respeita nomes em inglês");
  await ctx.close();
}

await browser.close();
console.log(`\n${passed} verificações ok`);
if (errors.length) { console.log("Erros no console:\n" + errors.join("\n")); process.exit(1); }
console.log("Nenhum erro no console.");
