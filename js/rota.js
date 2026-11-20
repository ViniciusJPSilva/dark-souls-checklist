import { SECTIONS, ROTEIRO } from "./data/index.js";

function montar() {
  if (!ROTEIRO) return null;
  const nodes = ROTEIRO.nodes.map(n => ({ ...n, itens: [] }));
  const porId = new Map(nodes.map(n => [n.id, n]));
  const porArea = new Map();
  for (const n of nodes) for (const a of n.areas) if (!porArea.has(a)) porArea.set(a, n);
  const chefes = new Set(nodes.map(n => n.chefe).filter(Boolean));
  const icones = new Map(SECTIONS.flatMap(s => (s.entries ?? []).map(e => [e.id, e.icon])));
  for (const n of nodes) if (n.chefe) n.icone = icones.get(n.chefe);
  const avulsos = [];

  for (const sec of SECTIONS) {
    if (sec.type === "guide") continue;
    for (const x of [...(sec.entries ?? []), ...(sec.items ?? [])]) {
      if (x.ciclo || chefes.has(x.id)) continue;
      const item = { id: x.id, name: x.name, en: x.en, icon: x.icon, img: x.img, perdivel: !!x.perdivel, grupo: sec.title, trofeu: !!x.trophy };
      const alvo = porId.get(ROTEIRO.apos?.[x.id]) ?? porArea.get(x.local);
      (alvo ? alvo.itens : avulsos).push(item);
    }
  }
  for (const p of ROTEIRO.passos ?? []) {
    const alvo = porId.get(p.node);
    if (alvo) alvo.itens.unshift({ id: p.id, name: p.texto, npc: p.npc, perdivel: !!p.perdivel, prazo: p.perdivel, grupo: "Missões", passo: true });
  }
  for (const n of nodes) {
    const passos = n.itens.filter(i => i.passo);
    n.itens = [...passos.reverse(), ...n.itens.filter(i => !i.passo)];
  }
  return { nodes, avulsos, semPrazo: ROTEIRO.semPrazo, fonte: ROTEIRO.fonte };
}

export const ROTA = montar();

export function estado(rota, done) {
  const nodes = rota.nodes.map(n => {
    const feitos = n.itens.filter(i => done(i.id)).length;
    const chefe = n.chefe ? done(n.chefe) : feitos === n.itens.length;
    const total = n.itens.length + (n.chefe ? 1 : 0);
    const ok = feitos + (n.chefe && chefe ? 1 : 0);
    return { ...n, feitos: ok, total, completo: ok === total, vencido: chefe };
  });
  const aqui = nodes.find(n => !n.ramo && !n.vencido) ?? null;
  const idxAqui = aqui ? nodes.indexOf(aqui) : nodes.length;
  for (const [i, n] of nodes.entries()) n.atrasado = n.vencido && !n.completo && i < idxAqui;
  const atrasados = nodes.filter(n => n.atrasado).reduce((a, n) => a + n.total - n.feitos, 0);
  const avulsosFeitos = rota.avulsos.filter(i => done(i.id)).length;
  return { nodes, aqui, atrasados, avulsosFeitos };
}
