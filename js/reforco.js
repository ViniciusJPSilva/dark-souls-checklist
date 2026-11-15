import { caminhos } from "./data/caminhos.js";
import { materiais } from "./data/materiais.js";
import { braseiros } from "./data/braseiros.js";
import { reforco } from "./data/reforco.js";

export const MAT = new Map(materiais.map(m => [m.id, m]));
export const BRAS = new Map(braseiros.map(b => [b.id, b]));
export const TROFEUS = reforco.entries.filter(e => e.etapas?.length);
const byTrophy = new Map(TROFEUS.map(t => [t.id, t]));
const byStep = new Map(TROFEUS.flatMap(t => t.etapas.map((s, i) => [s.id, { trofeu: t, index: i }])));

export const trofeuDe = id => byTrophy.get(id);
export const etapaInfo = id => byStep.get(id);

export function rota(caminho, nivel) {
  const c = caminhos[caminho];
  if (!c) return [];
  const ops = c.base ? rota(c.base.caminho, c.base.nivel) : [];
  if (c.base) ops.push({ key: `${caminho}:0`, caminho, nivel: 0, materiais: c.ascensao?.materiais ?? [], braseiro: c.ascensao?.braseiro ?? null, ascensao: true });
  for (const n of c.niveis) if (n.nivel <= nivel) ops.push({ key: `${caminho}:${n.nivel}`, caminho, ...n });
  return ops;
}

const cache = new Map();
export function opsPorEtapa(t) {
  if (cache.has(t.id)) return cache.get(t.id);
  const seen = new Set();
  const out = t.etapas.map(s => {
    const ops = s.ate ? rota(s.ate.caminho, s.ate.nivel).filter(o => !seen.has(o.key)) : [];
    ops.forEach(o => seen.add(o.key));
    return { etapa: s, ops };
  });
  cache.set(t.id, out);
  return out;
}

export function somar(ops) {
  const acc = new Map();
  for (const o of ops) for (const m of o.materiais) acc.set(m.id, (acc.get(m.id) ?? 0) + m.qtd);
  return [...acc].map(([id, qtd]) => ({ id, qtd }));
}

export const braseirosDe = ops => [...new Set(ops.map(o => o.braseiro).filter(Boolean))];

export function resumo(t, done) {
  const etapas = opsPorEtapa(t);
  const all = etapas.flatMap(e => e.ops);
  const pend = etapas.filter(e => !done(e.etapa.id)).flatMap(e => e.ops);
  const falta = new Map(somar(pend).map(m => [m.id, m.qtd]));
  return {
    feitas: etapas.filter(e => done(e.etapa.id)).length,
    total: etapas.length,
    braseiros: braseirosDe(all),
    materiais: somar(all).map(m => ({ ...m, falta: falta.get(m.id) ?? 0 })),
    etapas: etapas.map(e => ({ ...e.etapa, done: done(e.etapa.id), materiais: somar(e.ops), braseiros: braseirosDe(e.ops) }))
  };
}

export function marcarEtapa(checks, id, on) {
  const info = byStep.get(id);
  if (!info) return;
  const { trofeu, index } = info;
  trofeu.etapas.forEach((s, i) => {
    if (on && i <= index) checks[s.id] = true;
    if (!on && i >= index) checks[s.id] = false;
  });
  checks[trofeu.id] = trofeu.etapas.every(s => checks[s.id]);
}

export function marcarTrofeu(checks, id, on) {
  const t = byTrophy.get(id);
  if (!t) return;
  checks[id] = on;
  if (on) t.etapas.forEach(s => { checks[s.id] = true; });
  else checks[t.etapas.at(-1).id] = false;
}

export function migrar(checks, salvos) {
  for (const t of TROFEUS) {
    if (!salvos[t.id]) continue;
    if (t.etapas.some(s => s.id in salvos)) continue;
    t.etapas.forEach(s => { checks[s.id] = true; });
  }
  return checks;
}

export function usadoEm(id) {
  return TROFEUS.filter(t => opsPorEtapa(t).some(e => e.ops.some(o => o.braseiro === id || o.materiais.some(m => m.id === id))));
}

export function caminhosQueUsam(id) {
  return Object.entries(caminhos)
    .filter(([, c]) => [...c.niveis, c.ascensao ?? { materiais: [] }].some(n => n.braseiro === id || n.materiais.some(m => m.id === id)))
    .map(([k, c]) => ({ id: k, nome: c.nome }));
}

export const caminho = id => caminhos[id];
