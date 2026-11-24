import { $, esc, initials } from "./dom.js";
import { itemImg, trophyImg } from "../data/images.js";
import { checkIcon, infoIcon, perdivelBadge } from "./templates.js";
import { ROTA, estado } from "../rota.js";

const closeIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/></svg>`;
const DESKTOP = "(min-width: 1200px)";

const aside = $("#roteiro");
const fab = $("#rtFab");
const overlay = $("#rtOverlay");
const abertos = new Set();
let ultimoAqui = null;
let isDoneFn = () => false;

const thumb = i => {
  const src = i.trofeu ? trophyImg(i.icon) : itemImg(i.img);
  return `<span class="thumb sm">${src ? `<img src="${src}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-ph="${esc(initials(i.name))}">` : `<span class="ph">${esc(initials(i.name))}</span>`}</span>`;
};

function passoBtn(i) {
  const on = isDoneFn(i.id);
  return `<li><button class="rt-item rt-passo${on ? " is-done" : ""}" data-rt-toggle="${i.id}" aria-pressed="${on}">
    <span class="rt-npc">${esc(i.npc)}</span>
    <span class="rt-item-text"><span class="rt-passo-text">${esc(i.name)}</span>${i.prazo ? `<span class="rt-passo-prazo">${esc(i.prazo)}</span>` : ""}</span>
    <span class="check" aria-hidden="true">${checkIcon}</span>
  </button></li>`;
}

function itemBtn(i) {
  if (i.passo) return passoBtn(i);
  const on = isDoneFn(i.id);
  return `<li class="rt-row"><button class="rt-item${on ? " is-done" : ""}" data-rt-toggle="${i.id}" aria-pressed="${on}">
    ${thumb(i)}
    <span class="rt-item-text"><span class="rt-item-name">${esc(i.name)}<span class="en">${esc(i.en)}</span></span>${i.perdivel ? perdivelBadge(true) : ""}</span>
    <span class="check" aria-hidden="true">${checkIcon}</span>
  </button><button class="rt-info" data-rt-info="${i.id}" aria-label="Detalhes de ${esc(i.name)}">${infoIcon}</button></li>`;
}

function grupos(itens) {
  const map = new Map();
  for (const i of itens) {
    if (!map.has(i.grupo)) map.set(i.grupo, []);
    map.get(i.grupo).push(i);
  }
  return [...map].map(([g, lista]) => `<h4 class="rt-group">${esc(g)}</h4><ul class="rt-items">${lista.map(itemBtn).join("")}</ul>`).join("");
}

function nodeHTML(n, aqui) {
  const isAqui = aqui && n.id === aqui.id;
  const cls = ["rt-node", n.completo && "is-done", isAqui && "is-here", n.ramo && "is-ramo", n.atrasado && "is-late"].filter(Boolean).join(" ");
  const open = abertos.has(n.id);
  return `<li class="${cls}" data-node="${n.id}">
    <span class="rt-dot" aria-hidden="true">${n.completo ? checkIcon : ""}</span>
    <details class="rt-card"${open ? " open" : ""}>
      <summary>
        <span class="rt-sum">
          <span class="rt-kicker">${isAqui ? "Você está aqui · " : n.atrasado ? "Ficou para trás · " : ""}${n.chefe ? "Antes de" : "Fim do ciclo"}</span>
          <span class="rt-title">${esc(n.titulo)}</span>
          ${n.areas.length ? `<span class="rt-areas">${n.areas.map(esc).join(" · ")}</span>` : ""}
        </span>
        <span class="rt-count">${n.feitos}/${n.total}</span>
      </summary>
      <div class="rt-body">
        ${n.ramo ? `<p class="rt-ramo">${esc(n.ramo)}</p>` : ""}
        ${n.prazo ? `<p class="rt-prazo"><strong>Prazo</strong> ${esc(n.prazo)}</p>` : ""}
        ${n.itens.length ? grupos(n.itens) : `<p class="rt-vazio">Nada de coleção nesta etapa.</p>`}
        ${n.chefe ? `<ul class="rt-items rt-boss-list">${itemBtn({ id: n.chefe, name: `Derrotar ${n.titulo}`, en: "", icon: n.icone, trofeu: true, grupo: "", perdivel: false })}</ul>` : ""}
      </div>
    </details>
  </li>`;
}

export function renderRoteiro() {
  if (!ROTA) return;
  const e = estado(ROTA, isDoneFn);
  if (e.aqui && e.aqui.id !== ultimoAqui) {
    abertos.add(e.aqui.id);
    ultimoAqui = e.aqui.id;
  }
  const total = e.nodes.reduce((a, n) => a + n.total, 0);
  const feitos = e.nodes.reduce((a, n) => a + n.feitos, 0);
  const scroll = aside.scrollTop;
  aside.innerHTML = `
    <div class="rt-head">
      <div class="rt-head-top">
        <h2 class="rt-h">Roteiro</h2>
        <button class="icon-btn rt-close" data-rt-close aria-label="Fechar roteiro">${closeIcon}</button>
      </div>
      <p class="rt-here">${e.aqui ? `Próximo chefe: <strong>${esc(e.aqui.titulo)}</strong>` : "Tudo feito no caminho principal."}</p>
      ${e.atrasados ? `<p class="rt-late">${e.atrasados} ${e.atrasados === 1 ? "pendência ficou" : "pendências ficaram"} para trás</p>` : ""}
      <div class="rt-prog"><span class="rt-bar"><i style="width:${total ? (feitos / total) * 100 : 0}%"></i></span><span>${feitos}/${total}</span></div>
    </div>
    <details class="rt-free"${abertos.has("livre") ? " open" : ""} data-free>
      <summary><span>Sem prazo fixo</span><span class="rt-count">${e.avulsosFeitos}/${ROTA.avulsos.length}</span></summary>
      <div class="rt-body"><p class="rt-free-text">${esc(ROTA.semPrazo)}</p>${grupos(ROTA.avulsos)}</div>
    </details>
    <ol class="rt-line">${e.nodes.map(n => nodeHTML(n, e.aqui)).join("")}</ol>
    <p class="rt-fonte">Ordem baseada na rota da <a href="${esc(ROTA.fonte)}" target="_blank" rel="noopener">Fextralife</a>.</p>`;
  aside.scrollTop = scroll;
}

const isOpen = () => document.body.classList.contains("rt-open");

function setOpen(open) {
  document.body.classList.toggle("rt-open", open);
  overlay.hidden = !open;
  fab.setAttribute("aria-expanded", String(open));
  if (open) $("[data-rt-close]", aside)?.focus({ preventScroll: true });
  else if (!matchMedia(DESKTOP).matches) fab.focus({ preventScroll: true });
}

export function mountRoteiro({ isDone, toggle, showDetail }) {
  if (!ROTA) return;
  isDoneFn = isDone;
  document.body.classList.add("has-roteiro");
  aside.hidden = false;
  fab.hidden = false;
  renderRoteiro();

  fab.addEventListener("click", () => setOpen(true));
  overlay.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && isOpen() && !document.querySelector("dialog[open]")) setOpen(false);
  });
  matchMedia(DESKTOP).addEventListener("change", () => setOpen(false));

  aside.addEventListener("click", e => {
    if (e.target.closest("[data-rt-close]")) return setOpen(false);
    const info = e.target.closest("[data-rt-info]");
    if (info) return showDetail(info.dataset.rtInfo);
    const b = e.target.closest("[data-rt-toggle]");
    if (b) toggle(b.dataset.rtToggle);
  });
  aside.addEventListener("toggle", e => {
    const d = e.target;
    if (!(d instanceof HTMLDetailsElement)) return;
    const id = d.hasAttribute("data-free") ? "livre" : d.closest("[data-node]")?.dataset.node;
    if (!id) return;
    if (d.open) abertos.add(id); else abertos.delete(id);
  }, true);
}
