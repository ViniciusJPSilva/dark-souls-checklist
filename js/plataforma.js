import { state } from "./store.js";

export const PLATAFORMAS = {
  ps: {
    nome: "PlayStation", termo: "troféu", termos: "troféus", fem: false,
    tiers: { bronze: "Bronze", silver: "Prata", gold: "Ouro", platinum: "Platina" }
  },
  xbox: {
    nome: "Xbox", termo: "conquista", termos: "conquistas", fem: true,
    tiers: { bronze: "15G", silver: "25G", gold: "90G", platinum: "50G · Mítica" }
  },
  steam: {
    nome: "Steam", termo: "conquista", termos: "conquistas", fem: true,
    tiers: { platinum: "100%" }
  }
};

export const GAMERSCORE = { bronze: 15, silver: 25, gold: 90, platinum: 50 };

export const plat = () => PLATAFORMAS[state.platform] ?? PLATAFORMAS.steam;
export const platId = () => (PLATAFORMAS[state.platform] ? state.platform : "steam");
export const tierLabel = tier => plat().tiers[tier] ?? "";
export const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
export const obtido = () => (plat().fem ? "obtida" : "obtido");
export const este = () => (plat().fem ? "Esta conquista é marcada" : "Este troféu é marcado");
export const todosOutros = n => (plat().fem ? `todas as outras ${n} conquistas` : `todos os outros ${n} troféus`);
