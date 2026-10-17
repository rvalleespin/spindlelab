// Sesenta · comprobaciones que no salen en las capturas (plan-e12.md §13, puntos 4, 5 y 7).
// Uso: node comprobar.mjs http://127.0.0.1:PUERTO
// - Desborde horizontal a 360, 390, 768 y 1440 (y nodos más anchos que la ventana).
// - Con prefers-reduced-motion: reduce, cero animaciones corriendo después de cargar y después de contar.
// - Foco visible: los primeros 16 elementos que alcanza el tabulador tienen contorno.
// - Letras que se usan de verdad (getComputedStyle de cada nodo de texto) contra la lista vetada del plan §3.
// - Cero peticiones fuera de la carpeta.
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const base = process.argv[2];
const vetadas = ["Google Sans", "Mona Sans", "DM Mono", "Instrument Sans", "IBM Plex", "Gabarito", "Inter", "Manrope", "Archivo", "Newsreader", "Zilla Slab", "Libre Franklin", "Big Shoulders", "Barlow", "Atkinson", "Recursive"];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--lang=es-CL"] });
let fallas = 0;

for (const ruta of ["/?hoy=2026-10-17", "/que-dice-tu-carta/?hoy=2026-10-17"]) {
  for (const w of [360, 390, 768, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, reducedMotion: "reduce", locale: "es-CL" });
    const page = await ctx.newPage();
    const errores = [], terceros = [];
    page.on("pageerror", (e) => errores.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errores.push(m.text()); });
    page.on("request", (r) => { if (!r.url().startsWith(base) && !r.url().startsWith("data:")) terceros.push(r.url()); });
    await page.goto(base + ruta, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    if (ruta.startsWith("/?")) {
      await page.fill("#separacion", "2026-09-14");
      await page.click("#contador-form button");
      await page.click("#tab-160");
      await page.waitForTimeout(200);
    }
    const r = await page.evaluate((vetadas) => {
      const desborde = document.documentElement.scrollWidth - innerWidth;
      const anchos = [...document.querySelectorAll("body *")].filter((el) => {
        const b = el.getBoundingClientRect();
        if (!b.width || el.closest(".sr") || el.closest(".principal-60") || el.closest(".pie-palabra") || getComputedStyle(el).position === "fixed") return false;
        return b.right > innerWidth + 1 || b.left < -1;
      }).map((el) => el.tagName + "." + el.className).slice(0, 5);
      const animando = document.getAnimations().filter((a) => a.playState === "running").length;
      const familias = new Set();
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) if (n.textContent.trim()) familias.add(getComputedStyle(n.parentElement).fontFamily.split(",")[0].replace(/"/g, "").trim());
      const malas = [...familias].filter((f) => vetadas.some((v) => f.includes(v)));
      return { desborde, anchos, animando, familias: [...familias], malas };
    }, vetadas);
    await page.evaluate(() => scrollTo(0, 0));
    const sinFoco = [];
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press("Tab");
      const f = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const visible = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
        return { que: el.tagName + " " + (el.textContent || el.id || "").trim().slice(0, 30), visible };
      });
      if (f && !f.visible) sinFoco.push(f.que);
    }
    const mal = r.desborde > 0 || r.anchos.length || r.animando || r.malas.length || errores.length || sinFoco.length || terceros.length;
    if (mal) fallas++;
    console.log(`${mal ? "OJO" : "ok "} ${ruta.split("?")[0]} ${w} · desborde ${r.desborde} · anchos ${r.anchos.length} · animando ${r.animando} · letras ${r.familias.join("+")} · vetadas ${r.malas.length} · terceros ${terceros.length} · errores ${errores.length} · sin foco ${sinFoco.length}`);
    r.anchos.forEach((a) => console.log("    ancho:", a));
    sinFoco.forEach((a) => console.log("    sin foco:", a));
    errores.forEach((a) => console.log("    error:", a));
    await ctx.close();
  }
}
await browser.close();
console.log(fallas ? `${fallas} combinaciones con algo que mirar` : "todo en orden");
