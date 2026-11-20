const KEY = "souls-checklist:prefs";
const LEGADO = "dsr-checklist:v1";

function ler(chave) {
  try { return JSON.parse(localStorage.getItem(chave)) ?? null; } catch { return null; }
}

function load() {
  const salvo = ler(KEY) ?? {};
  const antigo = ler(LEGADO) ?? {};
  const p = { jogo: "ds1", platform: "steam", showEn: false };
  if ("platform" in antigo) p.platform = antigo.platform;
  if ("showEn" in antigo) p.showEn = !!antigo.showEn;
  return { ...p, ...salvo };
}

export const prefs = load();

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch {}
}

persist();

export function setPref(chave, valor) {
  prefs[chave] = valor;
  persist();
}
