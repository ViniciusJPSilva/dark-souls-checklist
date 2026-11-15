import { $, $$, norm } from "./ui/dom.js";
import { state } from "./store.js";

export function applyFilters() {
  const q = norm($("#search").value.trim());
  const f = state.filter;
  const filtering = !!q || f !== "all";
  let any = false;

  for (const sec of $$(".section")) {
    const titleHit = !!q && sec.dataset.title.includes(q);
    let visible = 0;

    for (const ul of $$(".rows", sec)) {
      let n = 0;
      for (const row of ul.children) {
        const done = row.classList.contains("is-done");
        const ok = (f === "all" || (f === "done") === done) && (!q || titleHit || row.dataset.search.includes(q));
        row.hidden = !ok;
        if (ok) n++;
      }
      const group = ul.closest(".group");
      if (group) group.hidden = !n;
      visible += n;
    }

    const coll = $(".coll", sec);
    if (coll) coll.hidden = filtering && !visible && !titleHit;

    sec.hidden = filtering && !visible && !titleHit;
    if (!sec.hidden) any = true;

    sec.open = q ? !sec.hidden : state.open[sec.dataset.sec] ?? defaultOpen(sec.dataset.sec);
  }

  $("#empty").hidden = any;
  for (const chip of $$("#chips a")) chip.hidden = $(`#sec-${chip.dataset.chip}`).hidden;
}

export const defaultOpen = id => !$(`#sec-${id}`)?.classList.contains("full");
