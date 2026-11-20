import { historia } from "./historia.js";
import { chefes } from "./chefes.js";
import { pactos } from "./pactos.js";
import { colecao } from "./colecao.js";
import { feiticos } from "./feiticos.js";
import { piromancias } from "./piromancias.js";
import { milagres } from "./milagres.js";
import { aneis } from "./aneis.js";
import { gestos } from "./gestos.js";
import { infusoes } from "./infusoes.js";
import { estus } from "./estus.js";
import { ossos } from "./ossos.js";
import { plano } from "./plano.js";

export const SECTIONS = [historia, chefes, pactos, colecao, estus, ossos, infusoes, feiticos, piromancias, milagres, aneis, gestos, plano];

export const META = {
  "storageKey": "ds3-checklist:v1",
  "fxBase": "https://static0.fextralifeimages.com/file/darksouls3/",
  "trophyBase": "https://shared.fastly.steamstatic.com/community_assets/images/apps/374320/",
  "gamerscore": { "bronze": 15, "silver": 30, "gold": 50, "platinum": 70 },
  "materiais": false,
  "planilha": false,
  "ciclos": true
};

export const PLATINUM = {
  "id": "t3-alma",
  "trophy": "platinum",
  "icon": "1fcdb90f670bc6b072b66a753102cf59ec7acaff.jpg",
  "name": "A Alma Negra",
  "en": "The Dark Soul",
  "desc": "Complete todas as conquistas."
};
