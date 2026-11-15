import { $ } from "./dom.js";

const sheet = $("#sheet");
const sheetBody = $("#sheetBody");

export function openSheet(html) {
  sheetBody.innerHTML = html;
  if (!sheet.open) sheet.showModal();
}
export const refreshSheet = html => { if (sheet.open) sheetBody.innerHTML = html; };
export const closeSheet = () => sheet.open && sheet.close();
export const sheetIsOpen = () => sheet.open;

sheet.addEventListener("click", e => { if (e.target === sheet) sheet.close(); });
$("#sheetClose").addEventListener("click", () => sheet.close());

const dlg = $("#dlg");

export function dialog({ title, text, value, editable = false, ok = "OK", cancel = "Cancelar", onOk, danger = false }) {
  const area = $("#dlgArea"), okBtn = $("#dlgOk");
  $("#dlgTitle").textContent = title;
  $("#dlgText").textContent = text;
  $("#dlgCancel").textContent = cancel;
  okBtn.textContent = ok;
  okBtn.classList.toggle("danger", danger);
  area.hidden = value === undefined;
  area.value = value ?? "";
  area.readOnly = !editable;

  return new Promise(resolve => {
    const onClick = async ev => {
      if (!onOk) return;
      ev.preventDefault();
      if ((await onOk()) === false) return;
      dlg.close("ok");
    };
    okBtn.addEventListener("click", onClick);
    dlg.addEventListener("close", () => {
      okBtn.removeEventListener("click", onClick);
      resolve(dlg.returnValue === "ok" ? (area.hidden ? true : area.value) : null);
    }, { once: true });
    dlg.returnValue = "";
    dlg.showModal();
    if (editable) area.focus();
    else if (value !== undefined) area.select();
  });
}

const toastEl = $("#toast");
let timer;
export function toast(html, icon) {
  toastEl.innerHTML = (icon ? `<img src="${icon}" alt="">` : "") + `<span>${html}</span>`;
  toastEl.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => toastEl.classList.remove("show"), 3000);
}
