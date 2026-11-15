export const FX_BASE = "https://static0.fextralifeimages.com/file/darksouls/";
export const PSN_BASE = "https://i.psnprofiles.com/games/0a92f9/trophies/";

export const itemImg = path => (path ? FX_BASE + path : "");
export const trophyImg = path => (path ? PSN_BASE + path : "");
