import { META } from "./index.js";

export const FX_BASE = META.fxBase;
export const TROPHY_BASE = META.trophyBase;

export const itemImg = path => (path ? (/^https?:/.test(path) ? path : FX_BASE + path) : "");
export const trophyImg = path => (path ? (/^https?:/.test(path) ? path : TROPHY_BASE + path) : "");
