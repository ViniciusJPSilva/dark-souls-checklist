import { SECTIONS, META } from "./data/index.js";
import { migrar } from "./reforco.js";

const KEY = META.storageKey;
const listeners = new Set();

export function seedChecks(planilha = false) {
  const checks = {};
  const val = o => planilha && !!o.done;
  for (const sec of SECTIONS) {
    for (const e of sec.entries ?? []) {
      checks[e.id] = val(e);
      for (const st of e.etapas ?? []) checks[st.id] = val(e);
    }
    for (const i of sec.items ?? []) checks[i.id] = val(i);
  }
  return checks;
}

const defaults = () => ({ checks: seedChecks(), open: {}, filter: "all" });

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const saved = JSON.parse(raw);
    const base = defaults();
    if (saved.collapsed && !saved.open) {
      saved.open = Object.fromEntries(SECTIONS.map(s => [s.id, !saved.collapsed[s.id]]));
      delete saved.collapsed;
    }
    delete saved.showEn;
    delete saved.platform;
    const salvos = saved.checks ?? {};
    return { ...base, ...saved, checks: migrar({ ...base.checks, ...salvos }, salvos) };
  } catch {
    return defaults();
  }
}

export const state = load();

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

persist();

export function update(mutator, reason = "update") {
  mutator(state);
  persist();
  for (const fn of listeners) fn(reason);
}

export const subscribe = fn => (listeners.add(fn), () => listeners.delete(fn));
export const isDone = id => !!state.checks[id];

export function exportCode() {
  const bytes = new TextEncoder().encode(JSON.stringify(state.checks));
  return btoa(String.fromCharCode(...bytes));
}

export function importCode(code) {
  const bytes = Uint8Array.from(atob(code.trim()), c => c.charCodeAt(0));
  const data = JSON.parse(new TextDecoder().decode(bytes));
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("formato inválido");
  const salvos = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, !!v]));
  update(s => { s.checks = migrar({ ...seedChecks(), ...salvos }, salvos); }, "reset");
}

export const restoreSeed = () => update(s => { s.checks = seedChecks(true); }, "reset");
export const clearAll = () => update(s => { for (const k in s.checks) s.checks[k] = false; }, "reset");
