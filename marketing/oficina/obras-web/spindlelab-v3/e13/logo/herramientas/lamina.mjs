// E13 · logo opción 2, «la i con su disco» · la lámina de comparación y la prueba de que solo cambió la «i»
// (Bruno, 30-oct-2026).
// Uso: node lamina.mjs <dir-logo>
// 1 · Escribe <dir-logo>/lamina.html y la rasteriza en lamina.png (1920 × 1080, dpr 1) y lamina@2x.png (dpr 2): hoy
//     (El huso, e12/logo/final/) y nuevo a 16, 24, 48 y 140 px, sobre #060606 y sobre blanco, cada tamaño en el corte
//     que le toca (16 pequeño, 24 menú, 48 y 140 grande); abajo, el favicon, el icono y el avatar de hoy y de ahora.
//     «A 24 px» es el alto con que el sitio pone el logo (el viewBox de Logo.astro, 147,01 unidades): la mayúscula mide
//     lo mismo en los dos, así que lo único que se compara es la «i».
//     Comprueba: imágenes cargadas, DM Mono cargada, ningún bloque fuera de la lámina ni pisado, ningún texto bajo 11 px,
//     cero errores de consola.
// 2 · Solo cambió la «i»: pinta cada corte de hoy y de ahora en la misma caja a 300 px de alto, tapa la columna de la «i»
//     (del borde derecho de la «p» al borde izquierdo de la «n», medidos en construccion.json) y cuenta los píxeles
//     distintos en el resto. Tiene que dar 0.
// Deja lo medido en lamina.json. Chromium 141 de Playwright (el de spindlelab-astro), todo file://, sin red.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const F = path.resolve(process.argv[2]);
const E12 = path.resolve(F, '../../e12/logo/final');
const rel = (p) => path.relative(F, p).split(path.sep).join('/');
const leer = (f) => { const t = fs.readFileSync(f, 'utf8'); return { d: t.match(/ d="([^"]+)"/)[1], vb: t.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number) }; };
const CAP = 100, VBH_SITIO = 147.01;

const hoy = { pequeno: leer(path.join(E12, 'logo-pequeno-blanco.svg')), menu: leer(path.join(E12, 'logo-menu-blanco.svg')), grande: leer(path.join(E12, 'logo-grande-blanco.svg')) };
const nuevo = { pequeno: leer(path.join(F, 'logo-pequeno-blanco.svg')), menu: leer(path.join(F, 'logo-menu-blanco.svg')), grande: leer(path.join(F, 'logo-grande-blanco.svg')) };
const corteDe = (px) => (px < 18 ? 'pequeno' : px < 40 ? 'menu' : 'grande');
// el SVG a la escala del sitio: px es el alto del viewBox de Logo.astro, así que la mayúscula mide px × 100 / 147,01
const logo = (s, px, color) => { const esc = px / VBH_SITIO; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.vb.join(' ')}" width="${(s.vb[2] * esc).toFixed(2)}" height="${(s.vb[3] * esc).toFixed(2)}" fill="${color}" aria-hidden="true"><path d="${s.d}"/></svg>`; };
const TAM = [16, 24, 48, 140];
const fila = (nombre, juego, color) => `<div class="fila"><span class="r et">${nombre}</span>${TAM.map((px) => `<figure>${logo(juego[corteDe(px)], px, color)}</figure>`).join('')}</div>`;
const tams = `<div class="fila tams"><span class="r et"></span>${TAM.map((px) => `<span class="r">${px} px · ${corteDe(px) === 'pequeno' ? 'pequeño' : corteDe(px) === 'menu' ? 'menú' : 'grande'}</span>`).join('')}</div>`;

const html = `<!doctype html><html lang="es-CL"><meta charset="utf-8"><title>Logo de SpindleLab, opción 2</title>
<style>
@font-face{font-family:"DM Mono";src:url("${rel(path.resolve(F, '../../e12/logo/fuentes/dm-mono-500-latin.woff2'))}") format("woff2");font-weight:500}
*{box-sizing:border-box}
html,body{margin:0;width:1920px;height:1080px;background:#060606;color:#fff;overflow:hidden}
body{font:500 13px/1.45 "DM Mono",monospace;letter-spacing:.03em;position:relative}
.r{text-transform:uppercase;font-size:12px;color:rgba(255,255,255,.72)}
.r b{color:#fff;font-weight:500}
.bloque{position:absolute}
figure{margin:0}
svg,img{display:block}
#cab{left:64px;top:40px;right:64px;display:flex;justify-content:space-between}
.panel{left:64px;right:64px;padding:18px 32px 22px}
#osc{top:84px;height:404px;border:1px solid #262626}
#cla{top:504px;height:404px;background:#fff}
#cla .r{color:rgba(6,6,6,.72)}#cla .r b{color:#060606}
.fila{display:flex;align-items:flex-end;gap:48px;height:158px;padding-bottom:14px}
.fila figure:nth-of-type(1){width:132px}.fila figure:nth-of-type(2){width:128px}.fila figure:nth-of-type(3){width:240px}
.tams{height:30px;align-items:flex-start;padding:0}
.tams span:nth-of-type(2){width:132px}.tams span:nth-of-type(3){width:128px}.tams span:nth-of-type(4){width:240px}
.et{width:150px;flex:none}
.sep{border-top:1px solid #262626}#cla .sep{border-top-color:#e2e2e2}
#iconos{left:64px;right:64px;top:930px;height:120px;display:flex;gap:44px;align-items:flex-end}
#iconos figure{display:flex;flex-direction:column;gap:8px}
.par{display:flex;gap:12px;align-items:flex-end}
.tab{display:flex;align-items:center;gap:8px;height:28px;padding:0 10px;border-radius:8px 8px 0 0;font:400 12px/1 system-ui,sans-serif}
.tab.osc{background:#202124;color:#e8eaed}.tab.cla{background:#f1f3f4;color:#202124}
.px{image-rendering:pixelated}
.marco{outline:1px solid rgba(255,255,255,.3)}
.redondo{border-radius:50%;outline:1px solid rgba(255,255,255,.3)}
</style>
<div class="bloque r" id="cab"><span><b>E13 · Logo de SpindleLab · opción 2, la i con su disco</b> · hoy (El huso) y nuevo, a la misma escala</span><span>30-oct-2026 · Bruno · para Ramón · nada publicado</span></div>

<div class="bloque panel" id="osc">
  ${tams}
  ${fila('<b>Hoy</b> · El huso', hoy, '#FFFFFF')}
  <div class="sep"></div>
  ${fila('<b>Nuevo</b> · la i con su disco', nuevo, '#FFFFFF')}
</div>

<div class="bloque panel" id="cla">
  ${tams}
  ${fila('<b>Hoy</b> · El huso', hoy, '#060606')}
  <div class="sep"></div>
  ${fila('<b>Nuevo</b> · la i con su disco', nuevo, '#060606')}
</div>

<div class="bloque" id="iconos">
  <figure><div class="par"><div class="tab osc"><img src="${rel(path.join(E12, 'favicon-16.png'))}" width="16" height="16" alt="">Hoy</div><div class="tab osc"><img src="favicon-16.png" width="16" height="16" alt="">Nuevo</div></div><div class="par"><div class="tab cla"><img src="${rel(path.join(E12, 'favicon-16.png'))}" width="16" height="16" alt="">Hoy</div><div class="tab cla"><img src="favicon-16.png" width="16" height="16" alt="">Nuevo</div></div><span class="r"><b>Favicon</b> · 16 px real, en pestaña</span></figure>
  <figure><div class="par"><img class="px marco" src="${rel(path.join(E12, 'favicon-16.png'))}" width="64" height="64" alt=""><img class="px marco" src="favicon-16.png" width="64" height="64" alt=""></div><span class="r">El de 16 ×4 · a mano</span></figure>
  <figure><div class="par"><img class="marco" src="${rel(path.join(E12, 'favicon-32.png'))}" width="32" height="32" alt=""><img class="marco" src="favicon-32.png" width="32" height="32" alt=""><img class="marco" src="${rel(path.join(E12, 'favicon-48.png'))}" width="48" height="48" alt=""><img class="marco" src="favicon-48.png" width="48" height="48" alt=""></div><span class="r">32 y 48 · hoy, nuevo</span></figure>
  <figure><div class="par"><img class="marco" src="${rel(path.join(E12, 'apple-touch-icon.png'))}" width="90" height="90" alt=""><img class="marco" src="apple-touch-icon.png" width="90" height="90" alt=""></div><span class="r"><b>apple-touch</b> · hoy, nuevo</span></figure>
  <figure><div class="par"><img class="redondo" src="${rel(path.join(E12, 'avatar/avatar-redondo-1080.png'))}" width="90" height="90" alt=""><img class="redondo" src="avatar/avatar-redondo-1080.png" width="90" height="90" alt=""></div><span class="r"><b>Avatar</b> · hoy, nuevo</span></figure>
  <figure style="margin-left:auto;max-width:520px"><span class="r" style="text-transform:none">Cambia solo la i: asta limpia y el punto como un disco separado. Más plano en grande, más redondo en chico, para que a 16 y 24 px se lea como el punto de una i. Blanco #FFFFFF sobre #060606 y #060606 sobre blanco; sin color.</span></figure>
</div>
</html>`;
fs.writeFileSync(path.join(F, 'lamina.html'), html);

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const errores = [];
let medida;
for (const dpr of [1, 2]) {
  const p = await nav.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: dpr });
  p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  p.on('requestfailed', r => errores.push('no cargó ' + r.url()));
  await p.goto(pathToFileURL(path.join(F, 'lamina.html')).href);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  if (dpr === 1) medida = await p.evaluate(() => {
    const imgs = [...document.images].map(i => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0 }));
    const bloques = [...document.querySelectorAll('.bloque')].map(b => { const r = b.getBoundingClientRect(); return { id: b.id, x: r.x, y: r.y, r: r.right, b: r.bottom }; });
    const fuera = bloques.filter(b => b.x < 0 || b.y < 0 || b.r > 1920 || b.b > 1080).map(b => b.id);
    const pisados = [];
    for (let i = 0; i < bloques.length; i++) for (let j = i + 1; j < bloques.length; j++) {
      const a = bloques[i], c = bloques[j];
      if (a.x < c.r && c.x < a.r && a.y < c.b && c.y < a.b) pisados.push(`${a.id} y ${c.id}`);
    }
    // logos que se salen de su panel o de su fila
    const desbordes = [...document.querySelectorAll('.panel svg')].filter(s => { const r = s.getBoundingClientRect(), q = s.closest('.panel').getBoundingClientRect(); return r.right > q.right || r.top < q.top || r.bottom > q.bottom; }).length;
    const chicos = [...document.querySelectorAll('body *')].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 11).length;
    return { imgs, fuera, pisados, desbordes, textosBajo11px: chicos, dmMono: document.fonts.check('500 12px "DM Mono"') };
  });
  await p.screenshot({ path: path.join(F, dpr === 1 ? 'lamina.png' : 'lamina@2x.png') });
  await p.close();
}

// 2 · solo cambió la «i»
const con = JSON.parse(fs.readFileSync(path.join(F, 'construccion.json'), 'utf8'));
const solo = {};
for (const corte of ['pequeno', 'menu', 'grande']) {
  const a = hoy[corte], b = nuevo[corte];
  // caja común (unión de las dos) y la columna de la «i»: de la «p» a la «n», con la i entera dentro
  const x0 = Math.min(a.vb[0], b.vb[0]), y0 = Math.min(a.vb[1], b.vb[1]);
  const x1 = Math.max(a.vb[0] + a.vb[2], b.vb[0] + b.vb[2]), y1 = Math.max(a.vb[1] + a.vb[3], b.vb[1] + b.vb[3]);
  const vb = [x0, y0, x1 - x0, y1 - y0];
  const m = con.cortes[corte].medidas;
  const ancho = Math.max(m.disco[0], corte === 'pequeno' ? 49.04 : 59.2) / 2 + 2;   // la tortera de hoy es la más ancha
  const i0 = m.cx - ancho, i1 = m.cx + ancho;
  const H = 300, W = Math.round(H * vb[2] / vb[3]);
  const svgDe = (s) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${W}" height="${H}" style="display:block" fill="#fff"><path d="${s.d}"/></svg>`;
  const p = await nav.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const px = {};
  for (const [k, s] of [['hoy', a], ['nuevo', b]]) {
    await p.setContent(`<body style="margin:0;background:#060606">${svgDe(s)}</body>`);
    px[k] = (await p.screenshot()).toString('base64');
  }
  const r = await p.evaluate(async ({ A, B, c0, c1 }) => {
    const datos = async (b64) => { const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0); return g.getImageData(0, 0, c.width, c.height); };
    const a = await datos(A), b = await datos(B);
    let fuera = 0, dentro = 0;
    for (let y = 0; y < a.height; y++) for (let x = 0; x < a.width; x++) {
      const i = (y * a.width + x) * 4;
      if (a.data[i] !== b.data[i]) { if (x >= c0 && x < c1) dentro++; else fuera++; }
    }
    return { pixelesDistintosFueraDeLaI: fuera, pixelesDistintosEnLaColumnaDeLaI: dentro };
  }, { A: px.hoy, B: px.nuevo, c0: Math.floor((i0 - vb[0]) / vb[2] * W), c1: Math.ceil((i1 - vb[0]) / vb[2] * W) });
  solo[corte] = { altoPx: H, columnaDeLaI: [+i0.toFixed(2), +i1.toFixed(2)], ...r };
  await p.close();
}
await nav.close();

const res = { fecha: new Date().toISOString(), ...medida, imagenesSinCargar: medida.imgs.filter(i => !i.ok).map(i => i.src), errores, soloCambiaLaI: solo };
delete res.imgs;
fs.writeFileSync(path.join(F, 'lamina.json'), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
const malSolo = Object.values(solo).some(s => s.pixelesDistintosFueraDeLaI > 0);
if (errores.length || res.imagenesSinCargar.length || res.fuera.length || res.pisados.length || res.desbordes || res.textosBajo11px || !res.dmMono || malSolo) process.exit(1);
