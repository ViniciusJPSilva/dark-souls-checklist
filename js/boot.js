import { JOGO, JOGOS } from "./jogo.js";
import { prefs } from "./prefs.js";
import { esc } from "./ui/dom.js";

const $ = s => document.querySelector(s);

$("#games").innerHTML = JOGOS.map(j => `
  <a href="?jogo=${j.id}" data-jogo="${j.id}"${j.id === JOGO.id ? ' aria-current="page"' : ""}>
    ${esc(j.curto)}${j.pronto ? "" : '<span class="games-tag">em breve</span>'}
  </a>`).join("");

$("#gameTitle").innerHTML = `${esc(JOGO.titulo)} <span>${esc(JOGO.sub)}</span>`;
document.title = `${JOGO.nome} — Checklist de Conquistas`;
document.body.dataset.jogo = JOGO.id;
document.body.dataset.plat = prefs.platform;

if (JOGO.pronto) {
  await import("./main.js");
} else {
  document.body.classList.add("is-placeholder");
  $("#app").innerHTML = `
    <section class="soon">
      <span class="soon-mark" aria-hidden="true">🔥</span>
      <h2 class="soon-title">${esc(JOGO.nome)}</h2>
      <p class="soon-text">${esc(JOGO.aviso)}</p>
      ${JOGO.piada ? `<p class="soon-joke">${esc(JOGO.piada)}</p>` : ""}
      <a class="btn primary soon-btn" href="?jogo=ds1">Voltar ao Dark Souls Remastered</a>
    </section>`;
}
