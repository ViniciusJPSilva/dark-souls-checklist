import { esc, norm, initials } from "./dom.js";
import { itemImg, trophyImg } from "../data/images.js";
import { tierSpan, checkIcon, infoIcon, searchText } from "./templates.js";
import { MAT, BRAS, resumo, opsPorEtapa, somar, braseirosDe, usadoEm } from "../reforco.js";

const chevron = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z"/></svg>`;

const thumb = (img, name, cls = "") =>
  `<span class="thumb ${cls}">${img ? `<img src="${itemImg(img)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-ph="${esc(initials(name))}">` : `<span class="ph">${esc(initials(name))}</span>`}</span>`;

export function reforcoSearch(e) {
  const ops = opsPorEtapa(e).flatMap(x => x.ops);
  const mats = somar(ops).map(m => MAT.get(m.id)).filter(Boolean);
  const bras = braseirosDe(ops).map(id => BRAS.get(id)).filter(Boolean);
  return norm([
    searchText(e),
    ...e.etapas.map(s => s.label),
    ...mats.flatMap(m => [m.name, m.en]),
    ...bras.flatMap(b => [b.name, b.en, b.local])
  ].join(" "));
}

export function reforcoRow(e) {
  return `
  <li class="row is-trophy is-reforco t-${e.trophy}" data-id="${e.id}" data-search="${esc(reforcoSearch(e))}">
    <div class="rf-head">
      <button class="row-main" data-expand="${e.id}" aria-expanded="false" aria-controls="rf-${e.id}">
        <span class="thumb"><img src="${trophyImg(e.icon)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-ph="🏆"></span>
        <span class="row-text">
          ${tierSpan(e.trophy)}
          <span class="row-title">${esc(e.name)}<span class="en">${esc(e.en)}</span></span>
          <span class="row-sub">${esc(e.desc)}</span>
          <span class="rf-meta"><span class="pill" data-pill>0/${e.etapas.length} etapas</span><span class="rf-chev">${chevron}</span></span>
        </span>
      </button>
      <button class="rf-check" data-toggle="${e.id}" aria-pressed="false" aria-label="Marcar ${esc(e.name)}">
        <span class="check" aria-hidden="true">${checkIcon}</span>
      </button>
      <button class="info" data-info="${e.id}" aria-label="Detalhes de ${esc(e.name)}">${infoIcon}</button>
    </div>
    <div class="rf-body" id="rf-${e.id}" hidden></div>
  </li>`;
}

export const pillText = (e, done) => {
  const n = e.etapas.filter(s => done(s.id)).length;
  return `${n}/${e.etapas.length} etapas`;
};

const matLine = list => list.map(m => `${m.qtd}× ${esc(MAT.get(m.id)?.name ?? m.id)}`).join(", ");

export function reforcoBody(e, done) {
  const r = resumo(e, done);
  const bras = r.braseiros.map(id => BRAS.get(id)).filter(Boolean);
  const totalFalta = r.materiais.reduce((a, m) => a + m.falta, 0);
  return `
    <section class="rf-block">
      <h4 class="rf-label">Braseiros</h4>
      ${bras.length ? `<ul class="rf-list">${bras.map(b => `
        <li><button class="rf-item" data-braseiro="${b.id}">
          ${thumb(b.img, b.name, "sm")}
          <span class="rf-item-text">
            <span class="rf-item-name">${esc(b.name)}<span class="en">${esc(b.en)}</span></span>
            <span class="rf-item-sub">${esc(b.ferreiro)}<span class="dot">·</span>${esc(b.local)}</span>
          </span>
        </button></li>`).join("")}</ul>` : `<p class="rf-none">Nenhum braseiro: o ferreiro já faz esse reforço.</p>`}
    </section>
    <section class="rf-block">
      <h4 class="rf-label">Materiais <span class="rf-cols"><span>Total</span><span>Falta</span></span></h4>
      <ul class="rf-list">${r.materiais.map(m => {
        const mat = MAT.get(m.id);
        return `
        <li><button class="rf-item" data-mat="${m.id}">
          ${thumb(mat?.img, mat?.name ?? m.id, "sm")}
          <span class="rf-item-text"><span class="rf-item-name">${esc(mat?.name ?? m.id)}<span class="en">${esc(mat?.en)}</span></span></span>
          <span class="rf-qty"><span>${m.qtd}</span><span class="${m.falta ? "" : "ok"}">${m.falta || "✔"}</span></span>
        </button></li>`;
      }).join("")}</ul>
      <p class="rf-souls">Almas: varia conforme a arma.${totalFalta ? "" : " <strong>Todos os materiais já usados.</strong>"}</p>
    </section>
    <section class="rf-block">
      <h4 class="rf-label">Etapas</h4>
      <ol class="rf-steps">${r.etapas.map(s => `
        <li class="${s.done ? "is-done" : ""}"><button class="rf-step" data-step="${s.id}" aria-pressed="${s.done}">
          <span class="check" aria-hidden="true">${checkIcon}</span>
          <span class="rf-step-text">
            <span class="rf-step-label">${esc(s.label)}</span>
            ${s.materiais.length || s.braseiros.length ? `<span class="rf-step-sub">${[matLine(s.materiais), ...s.braseiros.map(id => esc(BRAS.get(id)?.name))].filter(Boolean).join(" · ")}</span>` : ""}
          </span>
        </button></li>`).join("")}</ol>
    </section>`;
}

export function braseiroHTML(b) {
  const trofeus = usadoEm(b.id);
  return `
    <div class="d-head">
      ${thumb(b.img, b.name, "xl")}
      <div>
        <span class="tier">Braseiro</span>
        <h2 class="d-title">${esc(b.name)}</h2>
        <p class="d-en">${esc(b.en)}</p>
      </div>
    </div>
    <dl class="d-facts">
      <div><dt>Ferreiro</dt><dd>${esc(b.ferreiro)}</dd></div>
      <div><dt>Local</dt><dd>${esc(b.local)}</dd></div>
    </dl>
    ${b.obs ? `<div class="note obs"><strong>Onde fica</strong><p>${esc(b.obs)}</p></div>` : ""}
    ${trofeus.length ? `<div class="note"><strong>Usado em</strong><p>${trofeus.map(t => `<button class="link" data-goto="${t.id}">${esc(t.name)}</button>`).join(", ")}</p></div>` : ""}
    <button class="btn ghost block" data-guia="${b.id}">Abrir no guia de materiais</button>
  `;
}
