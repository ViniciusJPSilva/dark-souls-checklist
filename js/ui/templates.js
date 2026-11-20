import { esc, norm, initials } from "./dom.js";
import { itemImg, trophyImg } from "../data/images.js";
import { reforcoRow } from "./reforco.js";
import { tierLabel, cap, obtido, este, todosOutros } from "../plataforma.js";

export const tierSpan = (tier, cls = "") => {
  const label = tierLabel(tier);
  return label ? `<span class="tier${cls}">${esc(label)}</span>` : "";
};

export const searchText = o => norm([o.name, o.title, o.en, o.desc, o.npc, o.local, o.req, o.obs, o.hint].join(" "));

export const checkIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7z"/></svg>`;
export const infoIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 10h2v7h-2zm0-3h2v2h-2zm1-5a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg>`;

function row({ id, name, en, sub, img, ph, tier, kind, hasInfo, search }) {
  return `
  <li class="row ${kind}${tier ? ` t-${tier}` : ""}" data-id="${id}" data-search="${esc(search)}">
    <button class="row-main" data-toggle="${id}" aria-pressed="false">
      <span class="thumb">${img ? `<img src="${img}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-ph="${esc(ph)}">` : `<span class="ph">${esc(ph)}</span>`}</span>
      <span class="row-text">
        ${tier ? tierSpan(tier) : ""}
        <span class="row-title">${esc(name)}<span class="en">${esc(en)}</span></span>
        ${sub ? `<span class="row-sub">${sub}</span>` : ""}
      </span>
      <span class="check" aria-hidden="true">${checkIcon}</span>
    </button>
    ${hasInfo ? `<button class="info" data-info="${id}" aria-label="Detalhes de ${esc(name)}">${infoIcon}</button>` : ""}
  </li>`;
}

export function entryRow(e) {
  return row({
    id: e.id, name: e.name, en: e.en, kind: "is-trophy", tier: e.trophy,
    img: trophyImg(e.icon), ph: "🏆",
    sub: esc(e.desc),
    hasInfo: true, search: searchText(e)
  });
}

export function itemRow(i) {
  const bits = [i.cost && `<span class="cost">${esc(i.cost)}</span>`, esc(i.local)].filter(Boolean);
  return row({
    id: i.id, name: i.name, en: i.en, kind: "is-item",
    img: itemImg(i.img), ph: initials(i.name),
    sub: bits.join('<span class="dot">·</span>'),
    hasInfo: true, search: searchText(i)
  });
}

export function collectionCard(sec) {
  return `
  <button class="coll t-${sec.trophy}" data-info="${sec.trophyId}" data-coll="${sec.id}">
    <span class="thumb trophy"><img src="${trophyImg(sec.icon)}" alt="" data-ph="🏆"></span>
    <span class="coll-text">
      <span class="tier">${tierLabel(sec.trophy) ? `${esc(tierLabel(sec.trophy))} · ` : ""}<span class="coll-status">Pendente</span></span>
      <span class="row-title">${esc(sec.title)}<span class="en">${esc(sec.en)}</span></span>
      <span class="row-sub">${esc(sec.desc)}</span>
      ${sec.cost ? `<span class="coll-cost">${esc(sec.cost)}</span>` : ""}
    </span>
    <span class="coll-more">Requisitos</span>
  </button>`;
}

export function sectionBlock(sec, open) {
  let body;
  if (sec.type === "list") {
    body = `<ul class="rows">${sec.entries.map(e => (e.etapas ? reforcoRow(e) : entryRow(e))).join("")}</ul>`;
  } else {
    const byId = Object.fromEntries(sec.items.map(i => [i.id, i]));
    const groups = sec.groups ?? [{ label: "", ids: sec.items.map(i => i.id) }];
    body = collectionCard(sec) + groups.map(g => `
      <div class="group">
        ${g.label ? `<h3 class="group-label">${esc(g.label)}</h3>` : ""}
        <ul class="rows">${g.ids.map(id => itemRow(byId[id])).join("")}</ul>
      </div>`).join("");
  }
  return `
  <details class="section is-${sec.type}" id="sec-${sec.id}" data-sec="${sec.id}" data-title="${esc(norm(sec.title + " " + (sec.en ?? "")))}"${open ? " open" : ""}>
    <summary>
      <span class="sec-title">${esc(sec.title)}</span>
      <span class="sec-count">0/0</span>
      <span class="sec-bar"><i></i></span>
    </summary>
    <div class="sec-body">${body}</div>
  </details>`;
}

export function detailHTML(o, { done, auto, final = false }) {
  const isTrophy = !!o.trophy;
  const img = isTrophy ? trophyImg(o.icon) : itemImg(o.img);
  const facts = [
    o.hint && ["Objetivo", o.hint],
    o.cost && ["Custo", o.cost.includes("almas") || o.cost === "Varia" ? o.cost : `${o.cost} almas`],
    o.npc && ["NPC", o.npc],
    o.local && ["Local", o.local]
  ].filter(Boolean);
  return `
    <div class="d-head">
      <span class="thumb xl${isTrophy ? " trophy" : ""}">${img ? `<img src="${img}" alt="" referrerpolicy="no-referrer" data-ph="${esc(isTrophy ? "🏆" : initials(o.name))}">` : ""}</span>
      <div>
        ${isTrophy ? tierSpan(o.trophy, ` t-${o.trophy}`) : ""}
        <h2 class="d-title">${esc(o.name)}</h2>
        ${o.en ? `<p class="d-en">${esc(o.en)}</p>` : ""}
      </div>
    </div>
    ${o.desc ? `<p class="d-desc">${esc(o.desc)}</p>` : ""}
    ${facts.length ? `<dl class="d-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
    ${o.req ? `<div class="note req"><strong>Requisito</strong><p>${esc(o.req)}</p></div>` : ""}
    ${o.obs ? `<div class="note obs"><strong>Observação</strong><p>${esc(o.obs)}</p></div>` : ""}
    ${auto
      ? `<p class="d-auto">${done ? `✔ ${cap(obtido())} — ` : ""}${este()} automaticamente quando ${final ? `${todosOutros()} forem obtid${obtido().slice(-1)}s` : "todos os itens da coleção estiverem concluídos"}.</p>`
      : `<button class="btn ${done ? "ghost" : "primary"} block" data-sheet-toggle="${o.id}">${done ? "Desmarcar" : "Marcar como concluído"}</button>`}
  `;
}
