export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ESC[c]);

export const norm = s => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export const initials = name =>
  name.split(/\s+/).filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join("").toUpperCase() || name[0];

export function installImageFallback(root = document) {
  root.addEventListener("error", e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.ph) return;
    const ph = document.createElement("span");
    ph.className = "ph";
    ph.textContent = img.dataset.ph;
    img.replaceWith(ph);
  }, true);
}
