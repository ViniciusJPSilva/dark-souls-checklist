import { SECTIONS, PLATINUM } from "./data/index.js";
import { trophyImg } from "./data/images.js";
import { state, update, subscribe, isDone, exportCode, importCode, restoreSeed, clearAll } from "./store.js";
import { summary, sectionCounts, collectionDone, trophyMeta } from "./progress.js";
import { applyFilters } from "./filters.js";
import { $, $$, esc, installImageFallback } from "./ui/dom.js";
import { sectionBlock, detailHTML } from "./ui/templates.js";
import { openSheet, refreshSheet, sheetIsOpen, closeSheet, dialog, toast } from "./ui/overlays.js";
import { trofeuDe, marcarEtapa, marcarTrofeu, BRAS } from "./reforco.js";
import { reforcoBody, pillText, braseiroHTML } from "./ui/reforco.js";
import { openGuia, onGuiaGoto } from "./ui/materiais.js";
import { plat, platId, tierLabel, cap, obtido, todosOutros, GAMERSCORE } from "./plataforma.js";

const lookup = new Map();
for (const sec of SECTIONS) {
  (sec.entries ?? []).forEach(e => lookup.set(e.id, { obj: e }));
  (sec.items ?? []).forEach(i => lookup.set(i.id, { obj: i }));
  if (sec.type === "collection") {
    lookup.set(sec.trophyId, {
      auto: sec,
      obj: { id: sec.trophyId, name: sec.title, en: sec.en, desc: sec.desc, cost: sec.cost, req: sec.req, trophy: sec.trophy, icon: sec.icon }
    });
  }
}
const platinumObj = { ...PLATINUM };
Object.defineProperty(platinumObj, "req", { enumerable: true, get: () => `Obtenha ${todosOutros(40)}.` });
lookup.set(PLATINUM.id, { auto: true, obj: platinumObj });

const tierOf = new Map([[PLATINUM.id, PLATINUM.trophy]]);
for (const sec of SECTIONS) {
  (sec.entries ?? []).forEach(e => tierOf.set(e.id, e.trophy));
  if (sec.type === "collection") tierOf.set(sec.trophyId, sec.trophy);
}
const gamerscore = got => [...got].reduce((a, id) => a + (GAMERSCORE[tierOf.get(id)] ?? 0), 0);
const GS_TOTAL = [...tierOf.values()].reduce((a, t) => a + GAMERSCORE[t], 0);

const autoDone = rec => (rec.auto === true ? summary().platinum : collectionDone(rec.auto));

const app = $("#app");
const chips = $("#chips");

function mount() {
  app.innerHTML = SECTIONS.map(sec => sectionBlock(sec, false)).join("");
  chips.innerHTML = SECTIONS.map(sec => `<a href="#sec-${sec.id}" data-chip="${sec.id}">${esc(sec.title)} <b></b></a>`).join("");

  $("#platIcon").src = trophyImg(PLATINUM.icon);
  $("#platName").textContent = PLATINUM.name;

  syncPrefs();
  sync();
  applyFilters();
}

function syncPlat() {
  const p = plat();
  document.body.dataset.plat = platId();
  for (const el of $$("[data-termos]")) el.textContent = p.termos;
  $("#platTier").textContent = tierLabel("platinum");
  $("#platTier").hidden = !tierLabel("platinum");
  $("#plat").setAttribute("aria-label", `Detalhes de ${PLATINUM.name}`);
  $("#statGWrap").hidden = platId() !== "xbox";
  for (const b of $$("[data-plat]", $("#menu"))) b.setAttribute("aria-checked", String(b.dataset.plat === platId()));
}

function syncPrefs() {
  syncPlat();
  document.body.classList.toggle("show-en", !!state.showEn);
  $("#optEn").setAttribute("aria-checked", String(!!state.showEn));
  for (const b of $$("#filters button")) b.setAttribute("aria-pressed", String(b.dataset.filter === state.filter));
}

let lastTrophies = null;

function sync({ announce = false } = {}) {
  for (const row of $$(".row")) {
    const on = isDone(row.dataset.id);
    row.classList.toggle("is-done", on);
    row.querySelector("[data-toggle]").setAttribute("aria-pressed", String(on));
  }

  for (const row of $$(".is-reforco")) syncReforco(row);

  for (const sec of SECTIONS) {
    const el = $(`#sec-${sec.id}`);
    const { done, total } = sectionCounts(sec);
    const full = done === total;
    el.classList.toggle("full", full);
    $(".sec-count", el).textContent = `${done}/${total}`;
    $(".sec-bar i", el).style.width = `${(done / total) * 100}%`;
    const chip = $(`[data-chip="${sec.id}"]`);
    chip.classList.toggle("full", full);
    $("b", chip).textContent = `${done}/${total}`;

    if (sec.type === "collection") {
      const card = $(".coll", el);
      card.classList.toggle("is-done", full);
      $(".coll-status", card).textContent = full ? cap(obtido()) : "Pendente";
    }
  }

  const s = summary();
  $("#statTrophies").textContent = `${s.got.size}/${s.total}`;
  $("#statItems").textContent = `${s.itemsDone}/${s.itemsTotal}`;
  $("#statPct").textContent = `${s.pct}%`;
  $("#statG").textContent = `${gamerscore(s.got)}/${GS_TOTAL}G`;
  $("#ring").style.setProperty("--p", s.got.size / s.total);
  $("#plat").classList.toggle("is-done", s.platinum);

  if (announce && lastTrophies) {
    const fresh = [...s.got].filter(id => !lastTrophies.has(id)).map(trophyMeta).filter(Boolean);
    const t = fresh.at(-1);
    if (t) toast(`${cap(plat().termo)} ${obtido()}: <strong>${esc(t.name)}</strong>`, trophyImg(t.icon));
  }
  lastTrophies = s.got;
}

const expanded = new Set();

function syncReforco(row) {
  const t = trofeuDe(row.dataset.id);
  if (!t) return;
  $("[data-pill]", row).textContent = pillText(t, isDone);
  const open = expanded.has(t.id);
  const body = $(".rf-body", row);
  row.classList.toggle("is-open", open);
  $("[data-expand]", row).setAttribute("aria-expanded", String(open));
  body.hidden = !open;
  if (open) body.innerHTML = reforcoBody(t, isDone);
}

function setExpanded(id, open) {
  if (open) expanded.add(id); else expanded.delete(id);
  const row = $(`.is-reforco[data-id="${id}"]`);
  if (row) syncReforco(row);
}

function toggle(id) {
  const t = trofeuDe(id);
  if (!t) return update(st => { st.checks[id] = !st.checks[id]; }, "check");
  const on = !isDone(id);
  if (on && t.etapas.some(s => !isDone(s.id))) toast("Todas as etapas foram marcadas.");
  update(st => marcarTrofeu(st.checks, id, on), "check");
}

const toggleStep = id => update(st => marcarEtapa(st.checks, id, !st.checks[id]), "check");

function goto(id) {
  const row = $(`.row[data-id="${id}"]`);
  if (!row) return;
  const sec = row.closest(".section");
  if (row.hidden) {
    $("#search").value = "";
    update(st => { st.filter = "all"; }, "pref");
    syncPrefs();
    applyFilters();
  }
  if (!sec.open) { sec.open = true; update(st => { st.open[sec.dataset.sec] = true; }, "pref"); }
  if (trofeuDe(id)) setExpanded(id, true);
  row.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

onGuiaGoto(goto);

function showDetail(id) {
  const rec = lookup.get(id);
  if (!rec) return;
  currentDetail = id;
  openSheet(detailFor(rec, id));
}

const detailFor = (rec, id) =>
  detailHTML(rec.obj, { done: rec.auto ? autoDone(rec) : isDone(id), auto: !!rec.auto, final: rec.auto === true });
let currentDetail = null;

subscribe(reason => {
  if (reason === "reset") lastTrophies = null;
  sync({ announce: reason === "check" });
  if (state.filter !== "all" || reason === "reset") applyFilters();
  if (sheetIsOpen() && currentDetail) {
    refreshSheet(detailFor(lookup.get(currentDetail), currentDetail));
  }
});

app.addEventListener("click", e => {
  const info = e.target.closest("[data-info]");
  if (info) return showDetail(info.dataset.info);

  const t = e.target.closest("[data-toggle]");
  if (t) return toggle(t.dataset.toggle);

  const step = e.target.closest("[data-step]");
  if (step) return toggleStep(step.dataset.step);

  const ex = e.target.closest("[data-expand]");
  if (ex) return setExpanded(ex.dataset.expand, !expanded.has(ex.dataset.expand));

  const br = e.target.closest("[data-braseiro]");
  if (br) {
    currentDetail = null;
    return openSheet(braseiroHTML(BRAS.get(br.dataset.braseiro)));
  }

  const mat = e.target.closest("[data-mat]");
  if (mat) return openGuia(mat.dataset.mat);

  const summaryEl = e.target.closest("summary");
  if (summaryEl) {
    const sec = summaryEl.parentElement;
    update(st => { st.open[sec.dataset.sec] = !sec.open; }, "pref");
  }
});

$("#sheet").addEventListener("click", e => {
  const b = e.target.closest("[data-sheet-toggle]");
  if (b) return toggle(b.dataset.sheetToggle);
  const g = e.target.closest("[data-guia]");
  if (g) { closeSheet(); return openGuia(g.dataset.guia); }
  const go = e.target.closest("[data-goto]");
  if (go) { closeSheet(); goto(go.dataset.goto); }
});

$("#plat").addEventListener("click", () => showDetail(PLATINUM.id));

chips.addEventListener("click", e => {
  const a = e.target.closest("a[data-chip]");
  if (!a) return;
  e.preventDefault();
  const sec = $(`#sec-${a.dataset.chip}`);
  if (!sec.open) { sec.open = true; update(st => { st.open[a.dataset.chip] = true; }, "pref"); }
  sec.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

let debounce;
$("#search").addEventListener("input", () => { clearTimeout(debounce); debounce = setTimeout(applyFilters, 120); });

$("#filters").addEventListener("click", e => {
  const b = e.target.closest("button[data-filter]");
  if (!b) return;
  update(st => { st.filter = b.dataset.filter; }, "pref");
  syncPrefs();
  applyFilters();
});

const menu = $("#menu"), menuBtn = $("#menuBtn");
const setMenu = open => { menu.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); };
menuBtn.addEventListener("click", e => { e.stopPropagation(); setMenu(menu.hidden); });
document.addEventListener("click", e => { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

menu.addEventListener("click", async e => {
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (!act) return;

  if (act === "en") {
    update(st => { st.showEn = !st.showEn; }, "pref");
    return syncPrefs();
  }
  if (act === "plat") {
    const id = e.target.closest("[data-plat]").dataset.plat;
    if (id === platId()) return;
    update(st => { st.platform = id; }, "pref");
    return mount();
  }
  setMenu(false);

  if (act === "guia") return openGuia();

  if (act === "export") {
    const code = exportCode();
    await dialog({
      title: "Exportar progresso",
      text: "Guarde este código. Em outro aparelho ou navegador, use “Importar progresso”.",
      value: code, ok: "Copiar", cancel: "Fechar",
      onOk: async () => {
        try { await navigator.clipboard.writeText(code); toast("Código copiado."); }
        catch { $("#dlgArea").select(); toast("Selecione e copie o código."); return false; }
      }
    });
  }
  if (act === "import") {
    const code = await dialog({ title: "Importar progresso", text: "Cole o código exportado.", value: "", editable: true, ok: "Importar" });
    if (code?.trim()) {
      try { importCode(code); toast("Progresso importado."); }
      catch { toast("Código inválido."); }
    }
  }
  if (act === "seed") {
    if (await dialog({ title: "Restaurar da planilha", text: "Substitui o progresso atual pelas marcações da planilha original.", ok: "Restaurar" })) {
      restoreSeed(); toast("Progresso da planilha restaurado.");
    }
  }
  if (act === "clear") {
    if (await dialog({ title: "Zerar tudo", text: "Todas as marcações serão removidas. Exporte antes se quiser guardar uma cópia.", ok: "Zerar", danger: true })) {
      clearAll(); toast("Progresso zerado.");
    }
  }
});

installImageFallback(document);
mount();
