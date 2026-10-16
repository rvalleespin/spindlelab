// Ronda 4 (Javiera) · la flecha del chequeo de Taller (.t-instr::after en la home), de 1000 a 1300 px.
// Para cada ancho (paso de 4 px, más los bordes de cada tramo) y en dos modos (sin barra de desplazamiento, como corre
// Playwright por defecto, y CON barra: se quita --hide-scrollbars, así la media query mide la ventana con la barra y
// el clientWidth queda 15 px más chico), mide tres cosas, evaluadas en la página:
//   1) la CAJA: getComputedStyle del ::after (left/right, top, width, height, rotate) sobre la caja de relleno del
//      .t-instr, con el giro aplicado alrededor del centro (transform-origin por defecto). Es la caja que puede ocupar
//      la flecha; tiene que quedar entre 0 y clientWidth.
//   2) el TRAZO: dos capturas de la misma franja (con la flecha y con el ::after en visibility: hidden) y su diferencia
//      píxel a píxel. El rectángulo de lo que cambia es el trazo real. Si la flecha se cortara en el borde, el trazo
//      tocaría la columna clientWidth - 1 y su cantidad de píxeles caería respecto del resto del tramo.
//   3) el documento con el clip apagado (html y body con overflow-x: visible): scrollWidth contra clientWidth.
// Además, la distancia del trazo al texto más cercano (cajas de línea de los nodos de texto de la primera pantalla).
// Guarda el JSON y, con --capturas <carpeta>, recortes de la franja a 1023, 1024, 1180, 1258, 1280, 1299 y 1300.
// Sirve proto/ en 8770 antes. Uso: node flecha4.mjs <salida.json> [--capturas <carpeta>]
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
const BASE = process.env.BASE || 'http://127.0.0.1:8770';
const OUT = process.argv[2];
const ci = process.argv.indexOf('--capturas'); const CAPS = ci > 0 ? process.argv[ci + 1] : null;
if (CAPS) mkdirSync(CAPS, { recursive: true });
const ANCHOS = [];
for (let w = 1000; w <= 1300; w += 4) ANCHOS.push(w);
for (const w of [1023, 1024, 1258, 1259, 1299, 1300, 1301]) if (!ANCHOS.includes(w)) ANCHOS.push(w);
ANCHOS.sort((a, b) => a - b);
const PARA_CAPTURA = new Set([1023, 1024, 1180, 1258, 1280, 1299, 1300]);
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const res = [];
for (const modo of ['sin-barra', 'con-barra']) {
  const b = await chromium.launch({ executablePath: EXE, ...(modo === 'con-barra' ? { ignoreDefaultArgs: ['--hide-scrollbars'] } : {}) });
  const util = await (await b.newContext()).newPage();
  for (const w of ANCHOS) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto(BASE + '/taller/home.html', { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const g = await p.evaluate(() => {
      const de = document.documentElement, cw = de.clientWidth, el = document.querySelector('.t-instr');
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el), a = getComputedStyle(el, '::after');
      const bl = parseFloat(cs.borderLeftWidth), bt = parseFloat(cs.borderTopWidth);
      const pw = el.clientWidth; // ancho de la caja de relleno (bloque contenedor del ::after absoluto)
      const wd = parseFloat(a.width), ht = parseFloat(a.height);
      const L = parseFloat(a.left), R = parseFloat(a.right), T = parseFloat(a.top);
      const x0 = r.left + bl + (Number.isFinite(L) ? L : pw - R - wd), y0 = r.top + bt + T;
      const ang = (parseFloat(a.rotate) || 0) * Math.PI / 180;
      const cx = x0 + wd / 2, cy = y0 + ht / 2;
      const esq = [[-wd / 2, -ht / 2], [wd / 2, -ht / 2], [wd / 2, ht / 2], [-wd / 2, ht / 2]].map(([dx, dy]) => [cx + dx * Math.cos(ang) - dy * Math.sin(ang), cy + dx * Math.sin(ang) + dy * Math.cos(ang)]);
      const xs = esq.map((e) => e[0]), ys = esq.map((e) => e[1]);
      // texto de la primera pantalla (cajas de línea), para la distancia al trazo
      const lineas = [];
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) {
        const n = tw.currentNode; if (!n.data.trim()) continue;
        const pe = n.parentElement; if (!pe || pe.closest('.d-sr,[aria-hidden="true"],.cinta') || !pe.checkVisibility()) continue;
        const rg = document.createRange(); rg.selectNodeContents(n);
        for (const q of rg.getClientRects()) if (q.width > 1 && q.top < 900 && q.bottom > 0) lineas.push({ t: n.data.trim().slice(0, 24), x0: q.left, x1: q.right, y0: q.top, y1: q.bottom });
      }
      const prev = [de.style.overflowX, document.body.style.overflowX];
      de.style.setProperty('overflow-x', 'visible', 'important'); document.body.style.setProperty('overflow-x', 'visible', 'important');
      const swSinClip = de.scrollWidth;
      de.style.overflowX = prev[0]; document.body.style.overflowX = prev[1];
      return {
        cw, iw: innerWidth, sw: de.scrollWidth, swSinClip,
        instr: { x0: r.left, x1: r.right, y0: r.top, y1: r.bottom },
        after: { content: a.content, display: a.display, left: a.left, right: a.right, top: a.top, width: a.width, height: a.height, rotate: a.rotate },
        caja: { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) },
        lineas,
      };
    });
    // la franja: de 40 px sobre el .t-instr hasta 60 px bajo la caja de la flecha, todo el ancho útil
    const y0 = Math.max(0, Math.floor(Math.min(g.instr.y0, g.caja.y0) - 40));
    const y1 = Math.min(900, Math.ceil(Math.max(g.instr.y1, g.caja.y1) + 60));
    const clip = { x: 0, y: y0, width: g.cw, height: y1 - y0 };
    const con = await p.screenshot({ clip });
    const st = await p.addStyleTag({ content: '.t-instr::after { visibility: hidden !important; }' });
    const sin = await p.screenshot({ clip });
    await st.evaluate((n) => n.remove());
    if (CAPS && PARA_CAPTURA.has(w)) writeFileSync(`${CAPS}/flecha-${modo}-${w}.png`, con);
    const d = await util.evaluate(async ([A, B]) => {
      const carga = async (b64) => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = new OffscreenCanvas(im.width, im.height); const x = c.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height); };
      const a = await carga(A), b = await carga(B);
      let n = 0, x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
      for (let y = 0; y < a.height; y++) for (let x = 0; x < a.width; x++) {
        const i = (y * a.width + x) * 4;
        if (Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]) > 24) { n++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      }
      return { n, x0, x1, y0, y1, ancho: a.width };
    }, [con.toString('base64'), sin.toString('base64')]);
    const trazo = d.n ? { x0: d.x0, x1: d.x1, y0: d.y0 + y0, y1: d.y1 + y0, px: d.n } : null;
    let dTexto = null, cercano = null;
    if (trazo) for (const l of g.lineas) {
      const dx = Math.max(0, l.x0 - trazo.x1 - 1, trazo.x0 - l.x1), dy = Math.max(0, l.y0 - trazo.y1 - 1, trazo.y0 - l.y1);
      const dd = Math.hypot(dx, dy); if (dTexto === null || dd < dTexto) { dTexto = dd; cercano = l.t; }
    }
    const cajaDentro = g.caja.x0 >= 0 && g.caja.x1 <= g.cw;
    const trazoDentro = !!trazo && trazo.x0 > 0 && trazo.x1 < g.cw - 1;
    const fila = { modo, w, cw: g.cw, sw: g.sw, swSinClip: g.swSinClip, after: g.after, caja: Object.fromEntries(Object.entries(g.caja).map(([k, v]) => [k, +v.toFixed(1)])), trazo, margenDerTrazo: trazo ? g.cw - 1 - trazo.x1 : null, dTexto: dTexto === null ? null : +dTexto.toFixed(1), cercano, cajaDentro, trazoDentro };
    res.push(fila);
    const ok = cajaDentro && trazoDentro && g.sw === g.cw && g.swSinClip === g.cw;
    console.log(`${ok ? '✓' : '✗'} ${modo} ${w} cw ${g.cw} sw ${g.sw} sinClip ${g.swSinClip} caja ${fila.caja.x0}→${fila.caja.x1} trazo ${trazo ? trazo.x0 + '→' + trazo.x1 + ' (' + trazo.px + ' px)' : 'NINGUNO'} margen ${fila.margenDerTrazo} rot ${g.after.rotate} texto a ${fila.dTexto} («${cercano}»)`);
    await ctx.close();
  }
  await b.close();
}
writeFileSync(OUT, JSON.stringify(res, null, 1));
const malas = res.filter((r) => !(r.cajaDentro && r.trazoDentro && r.sw === r.cw && r.swSinClip === r.cw));
console.log(`${res.length} vistas · con falla: ${malas.length}`);
process.exit(malas.length ? 1 : 0);
