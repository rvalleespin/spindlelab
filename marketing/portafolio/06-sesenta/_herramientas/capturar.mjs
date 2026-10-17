// Sesenta · capturas y comprobaciones del sitio.
// Uso: node capturar.mjs http://127.0.0.1:PUERTO
// Captura home e interior a 1440 (dpr 1) y 390 (dpr 2) en marketing/portafolio/06-sesenta/capturas/:
// el primer viewport (1440 × 900 y 390 × 844) y la página completa. En la home completa el contador ya contó
// (separación 14-sep-2026, hoy 17-oct-2026, fijado con ?hoy= para que salga igual cada vez).
// Con movimiento reducido, para fotografiar el estado final. De paso mide sin opinar: desborde, h1, fuentes,
// peticiones a terceros, errores de consola, JSON-LD y contraste de cada nodo de texto, y el sello «Concepto».
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const base = process.argv[2];
const aqui = path.dirname(new URL(import.meta.url).pathname);
const salida = path.resolve(aqui, "../capturas");
fs.mkdirSync(salida, { recursive: true });

const paginas = [
  { nombre: "home", ruta: "/?hoy=2026-10-17", contar: "2026-09-14" },
  { nombre: "interior", ruta: "/que-dice-tu-carta/?hoy=2026-10-17" },
];
const anchos = [
  { w: 1440, h: 900, dpr: 1 },
  { w: 390, h: 844, dpr: 2 },
];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--lang=es-CL"] });
const informe = [];

export async function medir(page) {
  return page.evaluate(() => {
    const L = (c) => {
      const v = c.match(/[\d.]+/g).map(Number);
      const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * f(v[0]) + 0.7152 * f(v[1]) + 0.0722 * f(v[2]);
    };
    const fondo = (el) => {
      while (el) {
        const b = getComputedStyle(el).backgroundColor;
        const al = b.match(/[\d.]+/g);
        if (al && (al.length === 3 || Number(al[3]) > 0.99)) return b;
        el = el.parentElement;
      }
      return "rgb(255,255,255)";
    };
    const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const fallas = [];
    let nodos = 0;
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0 || cs.visibility === "hidden" || el.closest("[hidden]") || el.closest(".sr") || el.closest("[aria-hidden='true'] svg")) continue;
      if (el.closest(".saltar")) continue;
      nodos++;
      const px = parseFloat(cs.fontSize);
      const peso = parseInt(cs.fontWeight, 10);
      const grande = px >= 24 || (px >= 18.66 && peso >= 700);
      const c = ratio(cs.color, fondo(el));
      const min = grande ? 3 : 4.5;
      if (c < min || px < 12) fallas.push({ texto: n.textContent.trim().slice(0, 50), px: Math.round(px * 10) / 10, contraste: Math.round(c * 100) / 100 });
    }
    const rot = document.querySelector(".rotulo p");
    const rr = rot.getBoundingClientRect();
    const rcs = getComputedStyle(rot);
    return {
      desborde: document.documentElement.scrollWidth - window.innerWidth,
      h1: document.querySelectorAll("h1").length,
      fuentes: [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + " " + f.weight))],
      rotulo: { visible: rr.top >= 0 && rr.bottom <= window.innerHeight, px: parseFloat(rcs.fontSize), contraste: Math.round(ratio(rcs.color, fondo(rot)) * 100) / 100, texto: rot.textContent.trim() },
      alto: document.documentElement.scrollHeight,
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); const t = JSON.stringify(j); return /Review|AggregateRating/.test(t) ? "TRAE RESEÑAS" : /disambiguatingDescription/.test(t) ? "ok, con la ficción" : "ok, SIN la ficción"; } catch (e) { return "ERROR " + e.message; } }),
      robots: (document.querySelector('meta[name="robots"]') || {}).content,
      nodos,
      fallas,
    };
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const p of paginas) {
    for (const a of anchos) {
      const ctx = await browser.newContext({ viewport: { width: a.w, height: a.h }, deviceScaleFactor: a.dpr, reducedMotion: "reduce", locale: "es-CL" });
      const page = await ctx.newPage();
      const errores = [];
      const terceros = [];
      page.on("console", (m) => { if (m.type() === "error") errores.push(m.text()); });
      page.on("pageerror", (e) => errores.push(String(e)));
      page.on("request", (r) => { if (!r.url().startsWith(base) && !r.url().startsWith("data:")) terceros.push(r.url()); });
      await page.goto(base + p.ruta, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const sufijo = `${p.nombre}-${a.w}`;
      await page.screenshot({ path: path.join(salida, `${sufijo}-primera.png`) });
      const primera = await medir(page);
      if (p.contar) {
        await page.fill("#separacion", p.contar);
        await page.click("#contador-form button");
        await page.waitForTimeout(400);
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: path.join(salida, `${sufijo}-completa.png`), fullPage: true });
      const m = await medir(page);
      informe.push({ captura: sufijo, ...m, rotulo: primera.rotulo, errores, terceros: [...new Set(terceros)] });
      await ctx.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(salida, "comprobacion.json"), JSON.stringify(informe, null, 1));
  for (const r of informe) {
    console.log(`${r.captura}: desborde ${r.desborde}px · h1 ${r.h1} · alto ${r.alto} · fuentes ${r.fuentes.join(" + ")} · sello ${r.rotulo.visible ? "visible" : "NO VISIBLE"} ${r.rotulo.px}px ${r.rotulo.contraste}:1 · JSON-LD ${r.jsonld.join(", ")} · robots ${r.robots} · terceros ${r.terceros.length} · errores ${r.errores.length} · nodos ${r.nodos} · fallas de contraste ${r.fallas.length}`);
    r.fallas.slice(0, 8).forEach((f) => console.log("   ", JSON.stringify(f)));
    r.errores.slice(0, 4).forEach((e) => console.log("   ERR", e));
    r.terceros.slice(0, 4).forEach((e) => console.log("   3RO", e));
  }
}
