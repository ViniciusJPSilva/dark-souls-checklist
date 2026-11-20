import { historia } from "./historia.js";
import { chefes } from "./chefes.js";
import { reforco } from "./reforco.js";
import { pactos } from "./pactos.js";
import { feiticos } from "./feiticos.js";
import { piromancias } from "./piromancias.js";
import { milagres } from "./milagres.js";
import { armasRaras } from "./armas-raras.js";

export const SECTIONS = [historia, chefes, reforco, pactos, feiticos, piromancias, milagres, armasRaras];

export const META = {
  "storageKey": "dsr-checklist:v1",
  "fxBase": "https://static0.fextralifeimages.com/file/darksouls/",
  "trophyBase": "https://i.psnprofiles.com/games/0a92f9/trophies/",
  "gamerscore": { "bronze": 15, "silver": 25, "gold": 90, "platinum": 50 },
  "materiais": true,
  "planilha": true
};

export const PLATINUM = {
  "id": "t-alma",
  "trophy": "platinum",
  "icon": "1Scef830.png",
  "name": "A Alma Negra",
  "en": "The Dark Soul",
  "desc": "Todos os troféus foram obtidos. Parabéns!"
};
