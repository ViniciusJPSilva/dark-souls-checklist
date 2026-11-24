const VERSAO = "v1";
const APP = `app-${VERSAO}`;
const IMAGENS = "imagens";
const FONTES = "fontes";
const LIMITE_IMAGENS = 900;
const ESPERA_REDE = 3000;

const ARQUIVOS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/favicon.svg",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/icon-maskable-512.png",
  "css/tokens.css",
  "css/base.css",
  "css/components.css",
  "js/boot.js",
  "js/main.js",
  "js/jogo.js",
  "js/prefs.js",
  "js/store.js",
  "js/progress.js",
  "js/filters.js",
  "js/plataforma.js",
  "js/reforco.js",
  "js/rota.js",
  "js/pwa.js",
  "js/ui/dom.js",
  "js/ui/overlays.js",
  "js/ui/templates.js",
  "js/ui/reforco.js",
  "js/ui/materiais.js",
  "js/ui/roteiro.js",
  "js/data/index.js",
  "js/data/images.js",
  "js/data/ds1/index.js",
  "js/data/ds1/historia.js",
  "js/data/ds1/chefes.js",
  "js/data/ds1/reforco.js",
  "js/data/ds1/pactos.js",
  "js/data/ds1/feiticos.js",
  "js/data/ds1/piromancias.js",
  "js/data/ds1/milagres.js",
  "js/data/ds1/armas-raras.js",
  "js/data/ds1/braseiros.js",
  "js/data/ds1/caminhos.js",
  "js/data/ds1/materiais.js",
  "js/data/ds3/index.js",
  "js/data/ds3/historia.js",
  "js/data/ds3/chefes.js",
  "js/data/ds3/pactos.js",
  "js/data/ds3/colecao.js",
  "js/data/ds3/estus.js",
  "js/data/ds3/ossos.js",
  "js/data/ds3/infusoes.js",
  "js/data/ds3/feiticos.js",
  "js/data/ds3/piromancias.js",
  "js/data/ds3/milagres.js",
  "js/data/ds3/aneis.js",
  "js/data/ds3/gestos.js",
  "js/data/ds3/plano.js",
  "js/data/ds3/roteiro.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(ARQUIVOS.map(a => new Request(a, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n.startsWith("app-") && n !== APP).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) return e.respondWith(redePrimeiro(req));
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") return e.respondWith(guardarEAtualizar(req, FONTES));
  if (req.destination === "image") return e.respondWith(imagem(req));
});

async function redePrimeiro(req) {
  const cache = await caches.open(APP);
  const salvo = () => cache.match(req, { ignoreSearch: true }).then(r => r ?? (req.mode === "navigate" ? cache.match("index.html") : undefined));
  const rede = fetch(req).then(res => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  rede.catch(() => {});
  const prazo = new Promise(resolve => setTimeout(() => salvo().then(r => r && resolve(r)), ESPERA_REDE));
  try {
    return await Promise.race([rede, prazo]);
  } catch {
    return (await salvo()) ?? Response.error();
  }
}

async function guardarEAtualizar(req, nome) {
  const cache = await caches.open(nome);
  const salvo = await cache.match(req);
  const rede = fetch(req).then(res => {
    if (res.ok || res.type === "opaque") cache.put(req, res.clone());
    return res;
  }).catch(() => salvo);
  return salvo ?? rede;
}

async function imagem(req) {
  const cache = await caches.open(IMAGENS);
  const salvo = await cache.match(req.url);
  if (salvo) return salvo;
  try {
    const res = await fetch(new Request(req.url, { mode: "cors", credentials: "omit", referrerPolicy: "no-referrer" }));
    if (res.ok) {
      await cache.put(req.url, res.clone());
      aparar(cache);
    }
    return res;
  } catch {
    try { return await fetch(req); } catch { return Response.error(); }
  }
}

async function aparar(cache) {
  const chaves = await cache.keys();
  for (const k of chaves.slice(0, Math.max(0, chaves.length - LIMITE_IMAGENS))) await cache.delete(k);
}
