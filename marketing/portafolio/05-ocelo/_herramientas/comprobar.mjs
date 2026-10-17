// Ocelo · comprobaciones que no salen en las capturas (plan-e12.md §13, puntos 4, 5 y 7).
// Uso: node comprobar.mjs http://127.0.0.1:PUERTO
// - Desborde horizontal a 360, 390, 768 y 1440, a oscuras y con luz.
// - Con prefers-reduced-motion: reduce, cero animaciones corriendo después de cargar.
// - Foco visible: los primeros 14 elementos que alcanza el tabulador tienen contorno o subrayado.
// - Letras que se usan de verdad (getComputedStyle de cada nodo de texto) contra la lista vetada.
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const base = process.argv[2];
const vetadas = ["Google Sans", "Mona Sans", "DM Mono", "Instrument Sans", "IBM Plex", "Gabarito", "Inter", "Manrope", "Archivo", "Newsreader", "Zilla Slab", "Libre Franklin"];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
let fallas = 0;

for (const ruta of ["/", "/la-evaluacion/"]) {
  for (const w of [360, 390, 768, 1440]) {
    for (const luz of ["0", "1"]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, reducedMotion: "reduce" });
      const page = await ctx.newPage();
      const errores = [];
      page.on("pageerror", (e) => errores.push(String(e)));
      page.on("console", (m) => { if (m.type() === "error") errores.push(m.text()); });
      await page.goto(`${base}${ruta}?luz=${luz}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const r = await page.evaluate((vetadas) => {
        const desborde = document.documentElement.scrollWidth - innerWidth;
        // nodos más anchos que la ventana (por si el desborde lo esconde overflow-x: clip)
        const anchos = [...document.querySelectorAll("body *")].filter((el) => { const b = el.getBoundingClientRect(); return b.width > 0 && (b.right > innerWidth + 1 || b.left < -1) && !el.closest(".sr") && getComputedStyle(el).position !== "fixed"; }).map((el) => el.tagName + "." + el.className).slice(0, 5);
        const animando = document.getAnimations().filter((a) => a.playState === "running").length;
        const familias = new Set();
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = w.nextNode())) if (n.textContent.trim()) familias.add(getComputedStyle(n.parentElement).fontFamily.split(",")[0].replace(/"/g, "").trim());
        const malas = [...familias].filter((f) => vetadas.some((v) => f.includes(v)));
        return { desborde, anchos, animando, familias: [...familias], malas };
      }, vetadas);
      // foco
      const sinFoco = [];
      for (let i = 0; i < 14; i++) {
        await page.keyboard.press("Tab");
        const f = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const cs = getComputedStyle(el);
          const despues = getComputedStyle(el, "::after");
          const visible = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || (despues.content !== "none" && despues.transform !== "matrix(0, 1, 0, 1, 0, 0)" && despues.transform !== "none" ? true : false) || cs.textDecorationLine.includes("underline");
          return { que: el.tagName + (el.className ? "." + el.className : "") + " " + (el.textContent || "").trim().slice(0, 30), visible };
        });
        if (f && !f.visible) sinFoco.push(f.que);
      }
      const mal = r.desborde > 0 || r.anchos.length || r.animando || r.malas.length || errores.length || sinFoco.length;
      if (mal) fallas++;
      console.log(`${mal ? "OJO" : "ok "} ${ruta} ${w} luz=${luz} · desborde ${r.desborde} · anchos ${r.anchos.length} · animando ${r.animando} · letras ${r.familias.join("+")} · vetadas ${r.malas.length} · errores ${errores.length} · sin foco ${sinFoco.length}`);
      r.anchos.forEach((a) => console.log("    ancho:", a));
      sinFoco.forEach((a) => console.log("    sin foco:", a));
      errores.forEach((a) => console.log("    error:", a));
      await ctx.close();
    }
  }
}
await browser.close();
console.log(fallas ? `${fallas} combinaciones con algo que mirar` : "todo en orden");
