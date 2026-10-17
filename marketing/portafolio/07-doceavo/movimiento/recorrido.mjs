// Doceavo · recorrido de 10 s del sitio, cuadro a cuadro (30 por segundo), a 1440 × 810.
// Uso: node recorrido.mjs http://127.0.0.1:PUERTO <carpeta-de-cuadros>
// Después: ffmpeg arma recorrido.mp4 (H.264) y recorrido.webm (VP9) y saca poster.jpg (ver caso.md).
//
// Por qué cuadro a cuadro y no recordVideo: recordVideo de Playwright graba VP8 a ~0,9 Mbit/s y
// queda blando para un medio de 1057 px de ancho (plan-e12.md §5.5). Aquí el tiempo es virtual:
// cada cuadro pausa todas las animaciones de la página (Web Animations API, que incluye las de CSS)
// y las pone en su instante exacto. Así el recorrido sale idéntico cada vez, sin cuadros perdidos.
//
// Guion (plan-e12.md §10): de 0 a 3 s el año en doce se llena mes a mes; a los 2,6 s aparece el
// cursor, la página baja un poco para que el taco entre entero, el cursor pasa por encima de
// octubre (hover) y a los 3,7 s hace clic: la hoja de septiembre se
// arranca del taco y queda la de octubre; de 5,6 a 7,4 s la página baja a «Octubre, día por día»
// y la fila de hoy se marca; hasta los 10 s, quieto en la fila de hoy.
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
await page.goto(base + "/?hoy=2026-10-16", { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => {
  window.__inicio = new WeakMap();
  window.__fijar = (vt) => {
    for (const a of document.getAnimations()) {
      if (!window.__inicio.has(a)) window.__inicio.set(a, vt);
      a.pause();
      a.currentTime = Math.max(0, (vt - window.__inicio.get(a)) * 1000);
    }
  };
  // el taco parte en septiembre, para que al tocar octubre se arranque esa hoja
  window.__doceavo.mostrarHoja(9, { animar: false });
  // el cursor: el del sistema no sale en una captura, así que se dibuja
  const c = document.createElement("div");
  c.id = "__cursor";
  c.style.cssText = "position:fixed;left:0;top:0;z-index:99999;pointer-events:none;opacity:0;will-change:transform";
  c.innerHTML = '<svg width="24" height="30" viewBox="0 0 22 28" style="display:block;overflow:visible"><path d="M1.5 1.5v20.2l5.3-5 3.8 8.9 3.5-1.5-3.8-8.8h7.3z" fill="#141414" stroke="#DCE6D3" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);
  window.__cursor = (x, y, op, esc) => { c.style.opacity = op; c.style.transform = `translate(${x}px, ${y}px) scale(${esc})`; c.style.transformOrigin = "2px 2px"; };
  window.__fijar(0);
});

// dónde están las cosas (coordenadas de documento)
const geo = await page.evaluate(() => {
  const r = (sel) => { const b = document.querySelector(sel).getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + scrollY + b.height / 2, top: b.top + scrollY, left: b.left, w: b.width, h: b.height }; };
  return { oct: r('button[data-mes="10"] .mes-n'), hoy: r("tr#hoy"), titulo: r("#t-este-mes") };
});
const scrollFinal = Math.round(geo.hoy.top - H * 0.5);

const suave = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const tramo = (t, a, b) => suave((t - a) / (b - a));
const mezcla = (p, q, u) => ({ x: p.x + (q.x - p.x) * u, y: p.y + (q.y - p.y) * u });

// puntos del cursor: P0 y Phoy en coordenadas de ventana; Poct en coordenadas de documento
const P0 = { x: 760, y: 700 };                        // entra desde abajo, sobre la columna del texto
const Poct = { x: geo.oct.left + 24, y: geo.oct.y + 4 }; // sobre «OCTUBRE», en el año en doce
const Phoy = { x: 760, y: H * 0.5 + geo.hoy.h / 2 + 4 }; // descansa sobre la fila de hoy
const SUBE = 120; // antes del clic la página baja un poco, para que el taco entre entero

let clic = false;
const total = FPS * DURACION;
for (let i = 0; i < total; i++) {
  const t = i / FPS;
  const y = t < 5.6 ? Math.round(SUBE * tramo(t, 2.6, 3.4)) : Math.round(SUBE + (scrollFinal - SUBE) * tramo(t, 5.6, 7.4));
  const oct = { x: Poct.x, y: Poct.y - y };
  let p = P0, op = 0, esc = 1;
  if (t >= 2.5) op = Math.min(1, (t - 2.5) / 0.25);
  if (t < 2.7) p = P0;
  else if (t < 3.5) p = mezcla(P0, oct, tramo(t, 2.7, 3.45));
  else if (t < 5.7) p = oct;
  else if (t < 7.4) p = mezcla(oct, Phoy, tramo(t, 5.7, 7.4));
  else p = Phoy;
  if (t >= 3.7 && t < 3.82) esc = 0.86;

  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.mouse.move(p.x, p.y);
  if (!clic && t >= 3.7) { clic = true; await page.mouse.click(p.x, p.y); await page.waitForTimeout(40); }
  await page.evaluate(([t, x, y, op, esc]) => { window.__cursor(x, y, op, esc); window.__fijar(t); }, [t, p.x, p.y, op, esc]);
  await page.screenshot({ path: path.join(cuadros, `c${String(i).padStart(4, "0")}.png`) });
}
const estado = await page.evaluate(() => ({
  hoja: document.querySelector("#hoja .taco-m")?.textContent,
  marcada: document.querySelector("tr#hoy").classList.contains("marcada"),
  arrancadas: document.querySelectorAll(".arrancada").length,
}));
console.log(`cuadros ${total} · scroll final ${scrollFinal}px · hoja ${estado.hoja} · fila de hoy marcada ${estado.marcada} · hojas arrancadas en el DOM ${estado.arrancadas}`);
await browser.close();
