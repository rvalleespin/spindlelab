// E12 · logo final · la lámina de cierre, 1920 × 1080 (Bruno, 19-oct-2026).
// Uso: node lamina-final.mjs <dir-logo>
// Escribe final/lamina-final.html y la rasteriza en final/lamina-final.png (dpr 1). Comprueba: imágenes cargadas,
// DM Mono cargada, ningún bloque fuera de la lámina ni pisado con otro, ningún texto bajo 11 px, cero errores de
// consola. Deja lo medido en final/lamina-final.json.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const LOGO = path.resolve(process.argv[2]);
const F = path.join(LOGO, 'final');

const html = `<!doctype html><html lang="es-CL"><meta charset="utf-8"><title>Logo de SpindleLab, final</title>
<style>
@font-face{font-family:"DM Mono";src:url("../fuentes/dm-mono-500-latin.woff2") format("woff2");font-weight:500}
*{box-sizing:border-box}
html,body{margin:0;width:1920px;height:1080px;background:#060606;color:#fff;overflow:hidden}
body{font:500 13px/1.45 "DM Mono",monospace;letter-spacing:.03em;position:relative}
.r{text-transform:uppercase;font-size:12px;color:rgba(255,255,255,.7)}
.r b{color:#fff;font-weight:500}
.bloque{position:absolute}
img{display:block}
#cab{left:64px;top:44px;right:64px;display:flex;justify-content:space-between}
#grande{left:64px;top:120px}
#grande img{height:232px}
#cortes{left:64px;top:430px;display:flex;gap:64px;align-items:flex-end}
#cortes figure{margin:0}
#cortes figcaption{margin-top:14px}
#signo{left:1270px;top:120px;display:flex;gap:56px;align-items:flex-end}
#signo figure{margin:0}
#iconos{left:1270px;top:470px;display:flex;gap:40px;align-items:flex-end}
#iconos figure{margin:0}
.pest{display:flex;flex-direction:column;gap:8px}
.tab{display:flex;align-items:center;gap:8px;height:30px;padding:0 12px;border-radius:8px 8px 0 0;font:400 12px/1 system-ui,sans-serif;width:200px}
.tab.osc{background:#202124;color:#e8eaed}.tab.cla{background:#f1f3f4;color:#202124}
.px{image-rendering:pixelated}
#papel{left:64px;top:650px;width:1792px;height:250px;background:#fff;color:#060606;display:flex;gap:80px;align-items:center;padding:0 56px}
#papel .r{color:rgba(6,6,6,.7)}#papel .r b{color:#060606}
#papel figure{margin:0}
#pie{left:64px;right:64px;top:944px;display:flex;justify-content:space-between;gap:40px}
#pie p{margin:0;max-width:880px;text-transform:none;font-size:12px}
</style>
<div class="bloque r" id="cab"><span><b>E12 · Logo de SpindleLab</b> · final · camino 2, El huso</span><span>19-oct-2026 · para Ramón · nada publicado</span></div>

<div class="bloque" id="grande"><img src="logo-grande-blanco.svg" alt="SpindleLab, logo"><p class="r" style="margin:18px 0 0"><b>Grande</b> · desde 40 px de alto · la tortera con su canto y su filete · Google Sans Flex wght 600</p></div>

<div class="bloque" id="cortes">
  <figure><img src="logo-menu-blanco.svg" style="height:24px" alt=""><figcaption class="r"><b>Menú</b> · 18 a 39 px · aquí a 24</figcaption></figure>
  <figure><div style="display:flex;gap:28px;align-items:flex-end"><img src="logo-pequeno-blanco.svg" style="height:16px" alt=""><img src="logo-pequeno-blanco.svg" style="height:14px" alt=""><img src="logo-pequeno-blanco.svg" style="height:12px" alt=""></div><figcaption class="r"><b>Pequeño</b> · 12 a 17 px · aquí a 16, 14 y 12 · tortera pegada, sin punta</figcaption></figure>
</div>

<div class="bloque" id="signo">
  <figure><img src="signo-blanco.svg" style="height:250px" alt=""><figcaption class="r" style="margin-top:14px"><b>El signo</b></figcaption></figure>
  <figure><img src="apple-touch-icon.png" style="width:180px;height:180px;outline:1px solid rgba(255,255,255,.3)" alt=""><figcaption class="r" style="margin-top:14px"><b>apple-touch</b> · 180</figcaption></figure>
  <figure><img src="avatar/avatar-redondo-1080.png" style="width:180px;height:180px;border-radius:50%;outline:1px solid rgba(255,255,255,.3)" alt=""><figcaption class="r" style="margin-top:14px"><b>Avatar</b> · círculo</figcaption></figure>
</div>

<div class="bloque" id="iconos">
  <div class="pest"><div class="tab osc"><img src="favicon-16.png" style="width:16px;height:16px" alt="">SpindleLab · Estudio</div><div class="tab cla"><img src="favicon-16.png" style="width:16px;height:16px" alt="">SpindleLab · Estudio</div><span class="r" style="margin-top:6px"><b>Favicon</b> · 16 px real, en pestaña</span></div>
  <figure><img class="px" src="favicon-16.png" style="width:128px;height:128px" alt=""><figcaption class="r" style="margin-top:10px">El de 16, ×8 · dibujado a mano</figcaption></figure>
  <figure><img src="favicon-32.png" style="width:32px;height:32px" alt=""><figcaption class="r" style="margin-top:10px">32</figcaption></figure>
</div>

<div class="bloque" id="papel">
  <figure><img src="logo-grande-negro.svg" style="height:88px" alt=""><figcaption class="r" style="margin-top:14px"><b>Sobre blanco</b> · #060606 · para documentos: documentos/</figcaption></figure>
  <figure><img src="logo-menu-negro.svg" style="height:24px" alt=""><figcaption class="r" style="margin-top:14px">Menú, a 24</figcaption></figure>
  <figure><img src="logo-pequeno-negro.svg" style="height:14px" alt=""><figcaption class="r" style="margin-top:14px">Pequeño, a 14</figcaption></figure>
</div>

<div class="bloque r" id="pie">
  <p><b>Monocromo:</b> blanco sobre #060606 y #060606 sobre blanco, 20,26:1 en los dos. Sin oro y sin otro color (pregunta 10, por defecto). Contornos hechos desde la letra, sin cargar ninguna fuente. Google Sans Flex: SIL OFL 1.1, Copyright 2015 The Google Sans Flex Authors (OFL-google-sans-flex.txt).</p>
  <p><b>La tortera, probada:</b> cuatro dibujos, dos lectores fríos cada uno, sin contexto ni herramientas. El elegido se leyó primero como una torre, los dos con seguridad alta; seta, chinche y clavo, con seguridad baja o media; la cerradura, nunca. A 16 px vieron una cruz chica o un alfiler: por eso el favicon de 16 va dibujado aparte y el corte pequeño no lleva punta (prueba-tortera/).</p>
</div>
</html>`;
fs.writeFileSync(path.join(F, 'lamina-final.html'), html);

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await nav.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const errores = [];
p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
p.on('requestfailed', r => errores.push('no cargó ' + r.url()));
await p.goto(pathToFileURL(path.join(F, 'lamina-final.html')).href);
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
const medida = await p.evaluate(() => {
  const imgs = [...document.images].map(i => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0 }));
  const bloques = [...document.querySelectorAll('.bloque')].map(b => { const r = b.getBoundingClientRect(); return { id: b.id, x: r.x, y: r.y, r: r.right, b: r.bottom }; });
  const fuera = bloques.filter(b => b.x < 0 || b.y < 0 || b.r > 1920 || b.b > 1080).map(b => b.id);
  const pisados = [];
  for (let i = 0; i < bloques.length; i++) for (let j = i + 1; j < bloques.length; j++) {
    const a = bloques[i], c = bloques[j];
    if (a.x < c.r && c.x < a.r && a.y < c.b && c.y < a.b) pisados.push(`${a.id} y ${c.id}`);
  }
  const chicos = [...document.querySelectorAll('body *')].filter(e => e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 11).length;
  return { imgs, fuera, pisados, textosBajo11px: chicos, dmMono: document.fonts.check('500 12px "DM Mono"') };
});
await p.screenshot({ path: path.join(F, 'lamina-final.png') });
await nav.close();
const res = { fecha: new Date().toISOString(), ...medida, imagenesSinCargar: medida.imgs.filter(i => !i.ok).map(i => i.src), errores };
delete res.imgs;
fs.writeFileSync(path.join(F, 'lamina-final.json'), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
if (errores.length || res.imagenesSinCargar.length || res.fuera.length || res.pisados.length || res.textosBajo11px || !res.dmMono) process.exit(1);
