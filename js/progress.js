import { SECTIONS, PLATINUM } from "./data/index.js";
import { isDone } from "./store.js";

export const sectionCounts = sec => {
  const list = sec.type === "list" ? sec.entries : sec.items;
  return { done: list.filter(x => isDone(x.id)).length, total: list.length };
};

export const collectionDone = sec => sec.type === "collection" && sec.items.every(i => isDone(i.id));

export function trophies() {
  const got = new Set();
  let total = 0;
  for (const sec of SECTIONS) {
    if (sec.type === "guide") continue;
    if (sec.type === "list") {
      total += sec.entries.length;
      sec.entries.forEach(e => isDone(e.id) && got.add(e.id));
    } else {
      total += 1;
      if (collectionDone(sec)) got.add(sec.trophyId);
    }
  }
  const platinum = got.size === total;
  if (platinum) got.add(PLATINUM.id);
  return { got, total: total + 1, platinum };
}

export function summary() {
  const t = trophies();
  let itemsDone = 0, itemsTotal = 0;
  for (const sec of SECTIONS) {
    if (sec.type !== "collection") continue;
    const c = sectionCounts(sec);
    itemsDone += c.done;
    itemsTotal += c.total;
  }
  return { ...t, itemsDone, itemsTotal, pct: Math.round((t.got.size / t.total) * 100) };
}

export function trophyMeta(id) {
  if (id === PLATINUM.id) return { name: PLATINUM.name, icon: PLATINUM.icon };
  const sec = SECTIONS.find(s => s.trophyId === id);
  return sec ? { name: sec.title, icon: sec.icon } : null;
}
