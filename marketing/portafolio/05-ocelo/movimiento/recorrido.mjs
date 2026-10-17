// Ocelo · recorrido de 10 s del sitio, cuadro a cuadro (30 por segundo), a 1440 × 810.
// Uso: node recorrido.mjs http://127.0.0.1:PUERTO <carpeta-de-cuadros>
//
// Por qué cuadro a cuadro y no recordVideo: recordVideo de Playwright graba VP8 a ~0,9 Mbit/s y
// queda blando para un medio de 1057 px de ancho (plan-e12.md §5.5). Aquí el tiempo es virtual:
// cada cuadro pausa todas las animaciones y transiciones de la página (Web Animations API) y las
// pone en el instante exacto; los setTimeout de la página también corren en ese reloj. Así el
// recorrido sale idéntico cada vez, sin cuadros perdidos, y nítido.
//
// Guion (plan-e12.md §8): 0 a 2,6 s la carta aparece fila por fila, de la grande a la chica;
// 3,6 s clic en «Encender la luz» y la sala pasa a la luz; 4,6 a 6,4 s baja al comparador;
// 6,6 a 8,4 s el cursor pasa del rojo al verde (hover); 9,2 s abre «Monofocal o multifocal».
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const base = process.argv[2];
const cuadros = path.resolve(process.argv[3]);
fs.mkdirSync(cuadros, { recursive: true });
for (const f of fs.readdirSync(cuadros)) if (f.endsWith(".png")) fs.unlinkSync(path.join(cuadros, f));

const FPS = 30;
const DURACION = 10;
const W = 1440, H = 810;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: "no-preference" });
const page = await ctx.newPage();

// Reloj virtual para los setTimeout de la página, instalado antes de que corra su JS
await page.addInitScript(() => {
  window.__vt = 0;
  const cola = [];
  window.setTimeout = (fn, ms = 0, ...args) => { cola.push({ t: window.__vt + ms / 1000, fn, args }); return cola.length; };
  window.__avanzar = (vt) => {
    window.__vt = vt;
    const pendientes = cola.splice(0);
    for (const c of pendientes) { if (c.t <= vt) c.fn(...c.args); else cola.push(c); }
  };
  try { localStorage.removeItem("ocelo-luz"); } catch (e) {}
});

await page.goto(base + "/?luz=0", { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => {
  window.__inicio = new WeakMap();
  window.__fijar = (vt) => {
    window.__avanzar(vt);
    for (const a of document.getAnimations()) {
      if (!window.__inicio.has(a)) window.__inicio.set(a, vt);
      a.pause();
      a.currentTime = Math.max(0, (vt - window.__inicio.get(a)) * 1000);
    }
  };
  // El cursor: el sistema no sale en una captura, así que se dibuja
  const c = document.createElement("div");
  c.id = "__cursor";
  c.style.cssText = "position:fixed;left:0;top:0;z-index:99999;pointer-events:none;opacity:0;will-change:transform";
  c.innerHTML = '<svg width="24" height="30" viewBox="0 0 22 28" style="display:block;overflow:visible"><path d="M1.5 1.5v20.2l5.3-5 3.8 8.9 3.5-1.5-3.8-8.8h7.3z" fill="#0f0f0f" stroke="#f5f5f2" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);
  window.__cursor = (x, y, op, esc) => { c.style.opacity = op; c.style.transform = `translate(${x}px, ${y}px) scale(${esc})`; c.style.transformOrigin = "2px 2px"; };
  window.__fijar(0);
});

// Dónde están las cosas (en coordenadas de documento)
const geo = await page.evaluate(() => {
  const r = (sel) => { const b = document.querySelector(sel).getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + scrollY + b.height / 2, top: b.top + scrollY, left: b.left, w: b.width, h: b.height }; };
  return { luz: r(".luz"), marco: r("#comparar .duocromo-marco"), rojo: r("#panel-lasik .lado.a h3"), verde: r("#panel-lasik .lado.b h3"), tab: r("#tab-lente"), titulo: r("#t-comparar") };
});
const scrollFinal = Math.round(geo.tab.top - 96 - 22); // las pestañas bajo la cabecera fija y el duocromo entero a la vista

const suave = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const tramo = (t, a, b) => suave((t - a) / (b - a));
const mezcla = (p, q, u) => ({ x: p.x + (q.x - p.x) * u, y: p.y + (q.y - p.y) * u });

// Puntos del cursor en coordenadas de ventana
const P0 = { x: 1424, y: 300 }; // fuera de la carta: el cursor no enciende ningún hover antes de tiempo
const Pluz = { x: geo.luz.x - 30, y: geo.luz.y + 2 };
const Projo = { x: geo.rojo.left + 140, y: geo.rojo.y - scrollFinal + 10 };
const Pverde = { x: geo.verde.left + 120, y: geo.verde.y - scrollFinal + 10 };
const Ptab = { x: geo.tab.x, y: geo.tab.y - scrollFinal };

let clicLuz = false, clicTab = false;
const total = FPS * DURACION;
for (let i = 0; i < total; i++) {
  const t = i / FPS;
  // cursor
  let p = P0, op = 0, esc = 1;
  if (t >= 2.3) op = Math.min(1, (t - 2.3) / 0.25);
  if (t < 2.6) p = P0;
  else if (t < 3.6) p = mezcla(P0, Pluz, tramo(t, 2.6, 3.55));
  else if (t < 6.6) p = Pluz;
  else if (t < 7.4) p = mezcla(Pluz, Projo, tramo(t, 6.6, 7.4));
  else if (t < 7.8) p = Projo;
  else if (t < 8.5) p = mezcla(Projo, Pverde, tramo(t, 7.8, 8.5));
  else if (t < 8.7) p = Pverde;
  else if (t < 9.25) p = mezcla(Pverde, Ptab, tramo(t, 8.7, 9.25));
  else p = Ptab;
  if ((t >= 3.6 && t < 3.72) || (t >= 9.3 && t < 9.42)) esc = 0.86;

  // desplazamiento: de la carta al comparador
  const y = Math.round(scrollFinal * tramo(t, 4.6, 6.4));
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.mouse.move(p.x, p.y);
  if (!clicLuz && t >= 3.6) { clicLuz = true; await page.mouse.click(p.x, p.y); await page.waitForTimeout(60); }
  if (!clicTab && t >= 9.3) { clicTab = true; await page.mouse.click(p.x, p.y); await page.waitForTimeout(60); }
  await page.evaluate(([t, x, y, op, esc]) => { window.__cursor(x, y, op, esc); window.__fijar(t); }, [t, p.x, p.y, op, esc]);
  await page.screenshot({ path: path.join(cuadros, `c${String(i).padStart(4, "0")}.png`) });
}
const estado = await page.evaluate(() => ({ luz: document.documentElement.dataset.luz || "apagada", tab: document.querySelector('[aria-selected="true"]').id }));
console.log(`cuadros ${total} · scroll final ${scrollFinal}px · luz ${estado.luz} · pestaña ${estado.tab}`);
await browser.close();
