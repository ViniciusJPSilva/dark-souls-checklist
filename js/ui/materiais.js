import { $, esc, norm, initials } from "./dom.js";
import { itemImg } from "../data/images.js";
import { materiais } from "../data/ds1/materiais.js";
import { braseiros } from "../data/ds1/braseiros.js";
import { usadoEm, caminhosQueUsam } from "../reforco.js";

const closeIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/></svg>`;
const backIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z"/></svg>`;
const searchIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4a6.5 6.5 0 0 1 5.2 10.4l4.4 4.4-1.4 1.4-4.4-4.4A6.5 6.5 0 1 1 10.5 4zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/></svg>`;

const ALL = [...materiais.map(m => ({ ...m, kind: "mat" })), ...braseiros.map(b => ({ ...b, kind: "bras" }))];
const BY_ID = new Map(ALL.map(x => [x.id, x]));
const TIPO = { inimigo: "Inimigo", bau: "Baú", corpo: "Corpo", troca: "Troca", recompensa: "Recompensa" };

const searchOf = x => norm([
  x.name, x.en, x.uso, x.local, x.ferreiro, x.obs,
  ...(x.compra ?? []).flatMap(c => [c.npc, c.local]),
  ...(x.obter ?? []).flatMap(o => [o.inimigo, o.inimigoEn, o.local, o.npc])
].join(" "));
const SEARCH = new Map(ALL.map(x => [x.id, searchOf(x)]));

const img = (path, name, cls) =>
  `<span class="thumb ${cls}">${path ? `<img src="${itemImg(path)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-ph="${esc(initials(name))}">` : `<span class="ph">${esc(initials(name))}</span>`}</span>`;

const fmt = n => n.toLocaleString("pt-BR");

const dlg = document.createElement("dialog");
dlg.className = "guia";
dlg.id = "guia";
dlg.setAttribute("aria-labelledby", "guiaTitle");
dlg.innerHTML = `
  <div class="guia-panel">
    <header class="guia-head">
      <button class="icon-btn guia-back" data-guia-back aria-label="Voltar à lista">${backIcon}</button>
      <h2 class="guia-title" id="guiaTitle">Materiais de reforço</h2>
      <button class="icon-btn" data-guia-close aria-label="Fechar">${closeIcon}</button>
      <label class="search guia-search">${searchIcon}<input id="guiaQ" type="search" placeholder="Buscar material, inimigo, local…" autocomplete="off" enterkeyhint="search" aria-label="Buscar no guia"></label>
    </header>
    <div class="guia-body">
      <nav class="guia-list" id="guiaList" aria-label="Materiais"></nav>
      <article class="guia-ficha" id="guiaFicha" tabindex="-1"></article>
    </div>
  </div>`;
document.body.append(dlg);

const list = $("#guiaList", dlg);
const ficha = $("#guiaFicha", dlg);
const q = $("#guiaQ", dlg);
let current = null;

function itemBtn(x) {
  return `<li data-gid="${x.id}"><button class="guia-item" data-gsel="${x.id}" aria-current="${x.id === current}">
    ${img(x.img, x.name, "sm")}
    <span class="rf-item-text"><span class="rf-item-name">${esc(x.name)}<span class="en">${esc(x.en)}</span></span></span>
  </button></li>`;
}

function renderList() {
  list.innerHTML = `
    <h3 class="rf-label">Materiais</h3>
    <ul class="guia-ul">${materiais.map(m => itemBtn(m)).join("")}</ul>
    <h3 class="rf-label">Braseiros</h3>
    <ul class="guia-ul">${braseiros.map(b => itemBtn(b)).join("")}</ul>
    <p class="empty guia-empty" hidden>Nada encontrado.</p>`;
  filter();
}

function filter() {
  const term = norm(q.value.trim());
  let any = false;
  for (const ul of list.querySelectorAll(".guia-ul")) {
    let n = 0;
    for (const li of ul.children) {
      const ok = !term || SEARCH.get(li.dataset.gid).includes(term);
      li.hidden = !ok;
      if (ok) n++;
    }
    ul.previousElementSibling.hidden = !n;
    any ||= n > 0;
  }
  $(".guia-empty", list).hidden = any;
}

function usadoHTML(id) {
  const t = usadoEm(id);
  return `<section class="g-sec"><h3 class="rf-label">Usado em</h3>${t.length
    ? `<div class="g-links">${t.map(x => `<button class="chip-link" data-goto="${x.id}">${esc(x.name)}</button>`).join("")}</div>`
    : `<p class="rf-none">Nenhum troféu de reforço pede este item.</p>`}</section>`;
}

function fonteHTML(o) {
  const head = o.tipo === "inimigo"
    ? `${img(o.inimigoImg, o.inimigo, "md enemy")}<span class="g-src-head"><span class="g-src-name">${esc(o.inimigo)}<span class="en">${esc(o.inimigoEn)}</span></span><span class="g-chance">Chance: ${esc(o.chance)}</span></span>`
    : `<span class="g-src-head"><span class="g-src-name">${esc(o.npc ?? o.local)}</span></span>`;
  return `<li class="g-src">
    <div class="g-src-top"><span class="g-tag t-${o.tipo}">${TIPO[o.tipo] ?? o.tipo}</span></div>
    <div class="g-src-main">${head}</div>
    <dl class="g-kv">
      ${o.local ? `<div><dt>Local</dt><dd>${esc(o.local)}</dd></div>` : ""}
      ${o.fogueira && o.fogueira !== "—" ? `<div><dt>Fogueira</dt><dd>${esc(o.fogueira)}</dd></div>` : ""}
    </dl>
    ${o.obs ? `<p class="g-obs">${esc(o.obs)}</p>` : ""}
  </li>`;
}

function fichaMat(m) {
  const cams = caminhosQueUsam(m.id);
  return `
    <div class="d-head">
      ${img(m.img, m.name, "xl")}
      <div>
        <span class="tier">Material de reforço</span>
        <h2 class="d-title">${esc(m.name)}</h2>
        <p class="d-en en">${esc(m.en)}</p>
      </div>
    </div>
    <p class="d-desc">${esc(m.uso)}</p>
    ${cams.length ? `<p class="g-cams">${cams.map(c => `<span class="pill">${esc(c.nome)}</span>`).join("")}</p>` : ""}
    <section class="g-sec">
      <h3 class="rf-label">Onde comprar</h3>
      ${m.compra.length ? `<ul class="g-buy">${m.compra.map(c => `
        <li><span class="g-buy-npc">${esc(c.npc)}</span><span class="g-buy-local">${esc(c.local)}${c.condicao ? ` · ${esc(c.condicao)}` : ""}</span><span class="g-price">${fmt(c.preco)} almas</span></li>`).join("")}</ul>`
        : `<p class="rf-none">Não está à venda.</p>`}
    </section>
    <section class="g-sec">
      <h3 class="rf-label">Onde obter</h3>
      <ul class="g-srcs">${m.obter.map(fonteHTML).join("")}</ul>
    </section>
    ${usadoHTML(m.id)}
    <p class="g-fonte">Fonte: <a href="${esc(m.fonte)}" target="_blank" rel="noopener">Fextralife</a></p>`;
}

function fichaBras(b) {
  const cams = caminhosQueUsam(b.id);
  return `
    <div class="d-head">
      ${img(b.img, b.name, "xl")}
      <div>
        <span class="tier">Braseiro</span>
        <h2 class="d-title">${esc(b.name)}</h2>
        <p class="d-en en">${esc(b.en)}</p>
      </div>
    </div>
    ${cams.length ? `<p class="g-cams">${cams.map(c => `<span class="pill">${esc(c.nome)}</span>`).join("")}</p>` : ""}
    <dl class="d-facts">
      <div><dt>Ferreiro</dt><dd>${esc(b.ferreiro)}</dd></div>
      <div><dt>Local</dt><dd>${esc(b.local)}</dd></div>
    </dl>
    ${b.obs ? `<div class="note obs"><strong>Onde fica</strong><p>${esc(b.obs)}</p></div>` : ""}
    ${usadoHTML(b.id)}
    <p class="g-fonte">Fonte: <a href="https://darksouls.wiki.fextralife.com/Embers" target="_blank" rel="noopener">Fextralife</a></p>`;
}

function select(id, { push = true } = {}) {
  const x = BY_ID.get(id);
  current = x ? id : null;
  dlg.classList.toggle("has-ficha", !!x);
  ficha.innerHTML = x ? (x.kind === "mat" ? fichaMat(x) : fichaBras(x)) : `<p class="guia-hint">Escolha um material para ver onde comprar e onde farmar.</p>`;
  for (const b of list.querySelectorAll("[data-gsel]")) b.setAttribute("aria-current", String(b.dataset.gsel === current));
  ficha.scrollTop = 0;
  if (push) setHash(current ? `#mat-${current}` : "");
  if (x && matchMedia("(max-width: 767px)").matches) ficha.focus({ preventScroll: true });
}

function setHash(h) {
  const url = location.pathname + location.search + h;
  if (location.hash !== h) history.replaceState(null, "", url || location.pathname);
}

export function openGuia(id = null) {
  if (!list.children.length) renderList();
  if (!dlg.open) dlg.showModal();
  select(BY_ID.has(id) ? id : (matchMedia("(min-width: 768px)").matches ? current ?? materiais[0].id : null));
}

export const closeGuia = () => dlg.open && dlg.close();
export const guiaIsOpen = () => dlg.open;

let onGoto = () => {};
export const onGuiaGoto = fn => { onGoto = fn; };

dlg.addEventListener("close", () => { setHash(""); });
dlg.addEventListener("click", e => {
  if (e.target === dlg) return dlg.close();
  if (e.target.closest("[data-guia-close]")) return dlg.close();
  if (e.target.closest("[data-guia-back]")) return select(null);
  const sel = e.target.closest("[data-gsel]");
  if (sel) return select(sel.dataset.gsel);
  const go = e.target.closest("[data-goto]");
  if (go) { dlg.close(); onGoto(go.dataset.goto); }
});

let deb;
q.addEventListener("input", () => { clearTimeout(deb); deb = setTimeout(filter, 100); });

const fromHash = () => {
  const m = location.hash.match(/^#mat-(.+)$/);
  if (m && BY_ID.has(m[1])) openGuia(m[1]);
};
window.addEventListener("hashchange", fromHash);
fromHash();
