import { SECTIONS, PLATINUM } from "./data/index.js";
import { trophyImg } from "./data/images.js";
import { state, update, subscribe, isDone, exportCode, importCode, restoreSeed, clearAll } from "./store.js";
import { summary, sectionCounts, collectionDone, trophyMeta } from "./progress.js";
import { applyFilters } from "./filters.js";
import { $, $$, esc, installImageFallback } from "./ui/dom.js";
import { sectionBlock, detailHTML } from "./ui/templates.js";
import { openSheet, refreshSheet, sheetIsOpen, dialog, toast } from "./ui/overlays.js";

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
lookup.set(PLATINUM.id, { auto: true, obj: { ...PLATINUM, req: "Obtenha todos os outros 40 troféus." } });

const autoDone = rec => (rec.auto === true ? summary().platinum : collectionDone(rec.auto));

const app = $("#app");
const chips = $("#chips");

function mount() {
  app.innerHTML = SECTIONS.map(sec => sectionBlock(sec, false)).join("");
  chips.innerHTML = SECTIONS.map(sec => `<a href="#sec-${sec.id}" data-chip="${sec.id}">${esc(sec.title)} <b></b></a>`).join("");

  $("#platIcon").src = trophyImg(PLATINUM.icon);
  $("#platName").textContent = PLATINUM.name;

  installImageFallback(document);
  syncPrefs();
  sync();
  applyFilters();
}

function syncPrefs() {
  document.body.classList.toggle("show-en", !!state.showEn);
  $("#optEn").setAttribute("aria-checked", String(!!state.showEn));
  for (const b of $$("#filters button")) b.setAttribute("aria-pressed", String(b.dataset.filter === state.filter));
}

let lastTrophies = null;

function sync({ announce = false } = {}) {
  for (const row of $$(".row")) {
    const on = isDone(row.dataset.id);
    row.classList.toggle("is-done", on);
    row.querySelector(".row-main").setAttribute("aria-pressed", String(on));
  }

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
      $(".coll-status", card).textContent = full ? "Obtido" : "Pendente";
    }
  }

  const s = summary();
  $("#statTrophies").textContent = `${s.got.size}/${s.total}`;
  $("#statItems").textContent = `${s.itemsDone}/${s.itemsTotal}`;
  $("#statPct").textContent = `${s.pct}%`;
  $("#ring").style.setProperty("--p", s.got.size / s.total);
  $("#plat").classList.toggle("is-done", s.platinum);

  if (announce && lastTrophies) {
    const fresh = [...s.got].filter(id => !lastTrophies.has(id)).map(trophyMeta).filter(Boolean);
    const t = fresh.at(-1);
    if (t) toast(`Troféu obtido: <strong>${esc(t.name)}</strong>`, trophyImg(t.icon));
  }
  lastTrophies = s.got;
}

const toggle = id => update(st => { st.checks[id] = !st.checks[id]; }, "check");

function showDetail(id) {
  const rec = lookup.get(id);
  if (!rec) return;
  currentDetail = id;
  openSheet(detailHTML(rec.obj, { done: rec.auto ? autoDone(rec) : isDone(id), auto: !!rec.auto }));
}
let currentDetail = null;

subscribe(reason => {
  if (reason === "reset") lastTrophies = null;
  sync({ announce: reason === "check" });
  if (state.filter !== "all" || reason === "reset") applyFilters();
  if (sheetIsOpen() && currentDetail) {
    const rec = lookup.get(currentDetail);
    refreshSheet(detailHTML(rec.obj, { done: rec.auto ? autoDone(rec) : isDone(currentDetail), auto: !!rec.auto }));
  }
});

app.addEventListener("click", e => {
  const info = e.target.closest("[data-info]");
  if (info) return showDetail(info.dataset.info);

  const t = e.target.closest("[data-toggle]");
  if (t) return toggle(t.dataset.toggle);

  const summaryEl = e.target.closest("summary");
  if (summaryEl) {
    const sec = summaryEl.parentElement;
    update(st => { st.open[sec.dataset.sec] = !sec.open; }, "pref");
  }
});

$("#sheet").addEventListener("click", e => {
  const b = e.target.closest("[data-sheet-toggle]");
  if (b) toggle(b.dataset.sheetToggle);
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
  setMenu(false);

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

mount();
