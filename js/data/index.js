import { JOGO } from "../jogo.js";

const dados = await import(`./${JOGO.pronto ? JOGO.id : "ds1"}/index.js`);

export const { SECTIONS, PLATINUM, META, ROTEIRO } = dados;
