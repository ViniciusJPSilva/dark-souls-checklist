import { prefs } from "./prefs.js";
import { META, SECTIONS } from "./data/index.js";

export const GAMERSCORE = META.gamerscore;
const OUTROS = SECTIONS.reduce((a, s) => a + (s.type === "list" ? s.entries.length : 1), 0);

const g = tier => `${GAMERSCORE[tier]}G`;

export const PLATAFORMAS = {
  ps: {
    nome: "PlayStation", termo: "troféu", termos: "troféus", fem: false,
    tiers: { bronze: "Bronze", silver: "Prata", gold: "Ouro", platinum: "Platina" }
  },
  xbox: {
    nome: "Xbox", termo: "conquista", termos: "conquistas", fem: true,
    tiers: { bronze: g("bronze"), silver: g("silver"), gold: g("gold"), platinum: `${g("platinum")} · Mítica` }
  },
  steam: {
    nome: "Steam", termo: "conquista", termos: "conquistas", fem: true,
    tiers: { platinum: "100%" }
  }
};

export const plat = () => PLATAFORMAS[prefs.platform] ?? PLATAFORMAS.steam;
export const platId = () => (PLATAFORMAS[prefs.platform] ? prefs.platform : "steam");
export const tierLabel = tier => plat().tiers[tier] ?? "";
export const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
export const obtido = () => (plat().fem ? "obtida" : "obtido");
export const este = () => (plat().fem ? "Esta conquista é marcada" : "Este troféu é marcado");
export const todosOutros = () => (plat().fem ? `todas as outras ${OUTROS} conquistas` : `todos os outros ${OUTROS} troféus`);
