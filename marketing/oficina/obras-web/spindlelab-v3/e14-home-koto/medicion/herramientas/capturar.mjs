// Cuadros fijos en posiciones clave + un video del recorrido con rueda (para la hoja de cuadros).
import { abrir, cargarKoto, cookies } from './comun.mjs';
import fs from 'node:fs';
const [ancho, salida, posiciones] = [ +process.argv[2], process.argv[3], process.argv[4].split(',').map(Number) ];
fs.mkdirSync(salida, { recursive: true });
const { nav, ctx, p } = await abrir(ancho, { recordVideo: { dir: salida + '/video', size: ancho === 1440 ? { width: 1440, height: 900 } : { width: 390, height: 844 } } });
await cargarKoto(p); await cookies(p);
const info = {};
for (const y of posiciones) {
  await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(900);
  const real = await p.evaluate(() => scrollY);
  await p.screenshot({ path: `${salida}/koto-${ancho}-y${String(real).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 72 });
}
// la foto del final: datos de su transición
info.hola = await p.evaluate(() => { const b = [...document.querySelectorAll('span')].find(s => (s.className||'').includes('aspect-[5/3]')); if (!b) return null; let e = b; const cad = []; for (let i = 0; i < 6 && e; i++) { const cs = getComputedStyle(e); cad.push({ t: e.tagName, c: (e.className||'').toString().slice(0, 200), pos: cs.position, tr: cs.transition.slice(0, 160), origen: cs.transformOrigin, scale: cs.scale, tf: cs.transform }); e = e.parentElement; } return cad; });
// recorrido continuo con rueda, para el video
await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(800);
const alto = await p.evaluate(() => document.documentElement.scrollHeight);
await p.mouse.move(ancho / 2, 300);
for (let y = 0; y < alto; y += 60) { await p.mouse.wheel(0, 60); await p.waitForTimeout(70); }
await p.waitForTimeout(1500);
fs.writeFileSync(`${salida}/info-${ancho}.json`, JSON.stringify(info, null, 1));
await ctx.close(); await nav.close();
console.log('ok', ancho);
