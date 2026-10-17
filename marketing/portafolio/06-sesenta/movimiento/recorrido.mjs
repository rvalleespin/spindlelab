// Sesenta · recorrido de 10 s del sitio, cuadro a cuadro (30 por segundo), a 1440 × 810.
// Uso: node recorrido.mjs http://127.0.0.1:PUERTO <carpeta-de-cuadros>
// Después: ffmpeg arma recorrido.mp4 (H.264) y recorrido.webm (VP9) y saca poster.jpg (ver el final de caso.md).
//
// Por qué cuadro a cuadro y no recordVideo: recordVideo de Playwright graba VP8 a ~0,9 Mbit/s y queda blando
// para un medio de 1057 px (plan-e12.md §5.5; la misma decisión que en Ocelo). Aquí el tiempo es virtual:
// cada cuadro pausa todas las animaciones de la página (CSS y Web Animations) y las pone en su instante exacto,
// y los setTimeout de la página (los que hacen bajar el 60) corren en ese mismo reloj. Sale idéntico cada vez.
//
// Guion (plan-e12.md §9): 0 a 3 s, el 60 y la suma en la primera pantalla (el cursor pasa por «Primer otrosí»);
// 3 a 8 s, baja al contador, se escribe una fecha y el 60 baja, cifra por cifra, hasta 35; 8 a 10 s, baja al
// lector de la carta y se elige el 161: la línea de la carta cambia y el óvalo de tinta se dibuja.
// «Hoy» se fija en el 17-oct-2026 con ?hoy= para que la cuenta sea siempre la misma (separación 14-sep-2026).
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const base = process.argv[2];
const cuadros = path.resolve(process.argv[3]);
fs.mkdirSync(cuadros, { recursive: true });
for (const f of fs.readdirSync(cuadros)) if (f.endsWith(".png")) fs.unlinkSync(path.join(cuadros, f));

const FPS = 30, DURACION = 10, W = 1440, H = 810;
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--lang=es-CL"], env: { ...process.env, LANG: "es_CL.UTF-8", LANGUAGE: "es_CL" } }); // el campo de fecha sale en dd-mm-aaaa
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: "no-preference", locale: "es-CL" });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("ERR", String(e)));

// Reloj virtual para los setTimeout de la página, instalado antes de que corra su JS
await page.addInitScript(() => {
  window.__vt = 0;
  const cola = [];
  window.setTimeout = (fn, ms = 0, ...args) => { cola.push({ t: window.__vt + ms / 1000, fn, args }); return cola.length; };
  window.clearTimeout = () => {};
  window.__avanzar = (vt) => {
    window.__vt = vt;
    let hubo = true;
    while (hubo) {
      hubo = false;
      const pendientes = cola.splice(0);
      for (const c of pendientes) { if (c.t <= vt + 1e-9) { c.fn(...c.args); hubo = true; } else cola.push(c); }
    }
  };
});

await page.goto(base + "/?hoy=2026-10-17", { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
// Puesta en escena fuera de cuadro: el lector queda en el 160, para que en el cierre se vea el cambio al 161
await page.evaluate(() => { document.getElementById("tab-160").click(); window.scrollTo(0, 0); document.activeElement && document.activeElement.blur(); });
// Las posiciones se miden con las animaciones de entrada ya terminadas (la suma cae desde 48 px más abajo)
await page.waitForTimeout(1600);
// Dónde están las cosas (en coordenadas de documento)
const geo = await page.evaluate(() => {
  const r = (sel) => { const b = document.querySelector(sel).getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + scrollY + b.height / 2, top: b.top + scrollY, left: b.left, w: b.width, h: b.height }; };
  return { suma2: r('.suma a[href="#plazo"]'), plazo: r("#plazo"), campo: r("#separacion"), contar: r("#contador-form button"), carta: r("#carta"), tab161: r("#tab-161") };
});
await page.evaluate(() => {
  window.__inicio = new WeakMap();
  window.__fijar = (vt) => {
    window.__avanzar(vt);
    for (const a of document.getAnimations()) {
      if (!window.__inicio.has(a)) window.__inicio.set(a, vt);
      a.pause();
      const retraso = (a.effect && a.effect.getTiming && a.effect.getTiming().delay) || 0;
      a.currentTime = Math.max(0, (vt - window.__inicio.get(a)) * 1000);
      void retraso;
    }
  };
  // el cursor no sale en una captura: se dibuja
  const c = document.createElement("div");
  c.id = "__cursor";
  c.style.cssText = "position:fixed;left:0;top:0;z-index:99999;pointer-events:none;opacity:0;will-change:transform";
  c.innerHTML = '<svg width="24" height="30" viewBox="0 0 22 28" style="display:block;overflow:visible;max-width:none"><path d="M1.5 1.5v20.2l5.3-5 3.8 8.9 3.5-1.5-3.8-8.8h7.3z" fill="#111111" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);
  window.__cursor = (x, y, op, esc) => { c.style.opacity = op; c.style.transformOrigin = "2px 2px"; c.style.transform = `translate(${x}px, ${y}px) scale(${esc})`; };
  window.__fijar(0);
});

const yPlazo = Math.round(geo.plazo.top + 8);
const yCarta = Math.round(geo.carta.top + 18);

const suave = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const tramo = (t, a, b) => suave((t - a) / (b - a));
const mezcla = (p, q, u) => ({ x: p.x + (q.x - p.x) * u, y: p.y + (q.y - p.y) * u });

// Puntos del cursor, en coordenadas de ventana para el scroll en que se usan
const P0 = { x: 1380, y: 760 };
const Psuma = { x: geo.suma2.left + 120, y: geo.suma2.y + 4 };
const Pcampo = { x: geo.campo.left + 40, y: geo.campo.y - yPlazo };
const Pcontar = { x: geo.contar.x, y: geo.contar.y - yPlazo };
const Ptab = { x: geo.tab161.x, y: geo.tab161.y - yCarta };

// dd mm: el campo de fecha en es-CL. El año no se escribe: con min y max en 2026 viene puesto (en gris), y si se
// escribe, el campo vuelve al mes y lo pisa.
const fecha = "1409";
let escritos = 0, clicCampo = false, clicContar = false, clicTab = false;
const total = FPS * DURACION;
for (let i = 0; i < total; i++) {
  const t = i / FPS;
  // desplazamiento: principal → contador (3,0 a 4,0 s) → lector (7,5 a 8,5 s)
  let y = 0;
  if (t >= 3.0) y = Math.round(yPlazo * tramo(t, 3.0, 4.0));
  if (t >= 7.5) y = Math.round(yPlazo + (yCarta - yPlazo) * tramo(t, 7.5, 8.5));

  // cursor
  let p = P0, op = 0, esc = 1;
  if (t >= 1.5) op = Math.min(1, (t - 1.5) / 0.25);
  if (t < 1.8) p = P0;
  else if (t < 2.5) p = mezcla(P0, Psuma, tramo(t, 1.8, 2.5));
  else if (t < 3.0) p = Psuma;
  else if (t < 4.0) p = mezcla({ x: Psuma.x, y: Psuma.y - y }, Pcampo, tramo(t, 3.0, 4.0));
  else if (t < 4.35) p = Pcampo;
  else if (t < 4.75) p = mezcla(Pcampo, { x: Pcampo.x + 210, y: Pcampo.y + 18 }, tramo(t, 4.35, 4.75));
  else if (t < 5.3) p = { x: Pcampo.x + 210, y: Pcampo.y + 18 };
  else if (t < 5.7) p = mezcla({ x: Pcampo.x + 210, y: Pcampo.y + 18 }, Pcontar, tramo(t, 5.3, 5.7));
  else if (t < 7.5) p = Pcontar;
  else if (t < 8.5) p = mezcla(Pcontar, { x: Ptab.x - 40, y: Ptab.y + 30 }, tramo(t, 7.5, 8.5));
  else if (t < 8.9) p = mezcla({ x: Ptab.x - 40, y: Ptab.y + 30 }, Ptab, tramo(t, 8.5, 8.9));
  else p = Ptab;
  if ((t >= 4.1 && t < 4.22) || (t >= 5.75 && t < 5.87) || (t >= 9.0 && t < 9.12)) esc = 0.86;

  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.mouse.move(p.x, p.y);
  if (!clicCampo && t >= 4.1) { clicCampo = true; await page.mouse.click(p.x, p.y); await page.keyboard.press("Home").catch(() => {}); }
  // se escribe la fecha, una cifra cada 0,18 s, de 4,4 a 5,0 s
  while (clicCampo && escritos < fecha.length && t >= 4.4 + escritos * 0.18) { await page.keyboard.type(fecha[escritos]); escritos++; }
  if (!clicContar && t >= 5.75) { clicContar = true; await page.mouse.click(p.x, p.y); }
  if (!clicTab && t >= 9.0) { clicTab = true; await page.mouse.click(p.x, p.y); }
  await page.evaluate(([t, x, y, op, esc]) => { window.__cursor(x, y, op, esc); window.__fijar(t); }, [t, p.x, p.y, op, esc]);
  await page.screenshot({ path: path.join(cuadros, `c${String(i).padStart(4, "0")}.png`) });
}
const estado = await page.evaluate(() => ({ fecha: document.getElementById("separacion").value, cifra: document.getElementById("cifra").textContent, tab: document.querySelector('[aria-selected="true"]').id, circulo: !!document.querySelector(".articulo .tinta-circulo") }));
console.log(`cuadros ${total} · scroll ${yPlazo} y ${yCarta} · fecha ${estado.fecha} · cifra ${estado.cifra} · pestaña ${estado.tab} · óvalo ${estado.circulo}`);
await browser.close();
