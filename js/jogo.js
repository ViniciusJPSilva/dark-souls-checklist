import { prefs, setPref } from "./prefs.js";

export const JOGOS = [
  { id: "ds1", curto: "DS1", nome: "Dark Souls Remastered", titulo: "Dark Souls", sub: "Remastered", pronto: true },
  { id: "ds2", curto: "DS2", nome: "Dark Souls II", titulo: "Dark Souls", sub: "II", pronto: false, aviso: "Ainda não foi implementado.", piada: "Ps.: é o melhor souls." },
  { id: "ds3", curto: "DS3", nome: "Dark Souls III", titulo: "Dark Souls", sub: "III", pronto: false, aviso: "Em construção: é o próximo da fila." }
];

const pedido = new URLSearchParams(location.search).get("jogo");

export const JOGO = JOGOS.find(j => j.id === pedido) ?? JOGOS.find(j => j.id === prefs.jogo) ?? JOGOS[0];

if (prefs.jogo !== JOGO.id) setPref("jogo", JOGO.id);
