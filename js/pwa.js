import { toast } from "./ui/overlays.js";

const botao = document.querySelector('[data-act="instalar"]');
let pedido = null;

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  pedido = e;
  if (botao) botao.hidden = false;
});

window.addEventListener("appinstalled", () => {
  pedido = null;
  if (botao) botao.hidden = true;
  toast("App instalado.");
});

botao?.addEventListener("click", async () => {
  if (!pedido) return;
  pedido.prompt();
  await pedido.userChoice;
  pedido = null;
  botao.hidden = true;
});

window.addEventListener("offline", () => toast("Sem conexão: o checklist continua funcionando com a cópia salva."));
window.addEventListener("online", () => toast("Conexão de volta."));
