// Javiera, QA de obra E12, vuelta 2 (sin cambios de método desde la vuelta 1). Spec §4.3: foco visible en todo, contorno blanco de 2 px, nunca tapado (encabezado
// plegado, barra del caso, aviso de cookies); se mide con Tab hacia adelante y hacia atrás. Por cada parada: qué elemento,
// si su contorno existe (outline ≥ 2 px o box-shadow), si queda dentro de la ventana y si algo fijo o pegajoso lo tapa
// (elementsFromPoint en el centro y en las cuatro esquinas, 2 px hacia adentro).
// Uso: node foco.mjs [--rutas …] [--anchos 1440,390] [--aviso] (con --aviso, el de cookies queda abierto)
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, RUTAS, ANCHOS, servir, lanzar } from './comun.mjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i < 0 ? d : process.argv[i + 1]; };
const rutas = arg('rutas') ? arg('rutas').split(',') : RUTAS;
const anchos = arg('anchos', '1440,390').split(',').map(Number);
const aviso = process.argv.includes('--aviso');
const srv = await servir();
const nav = await lanzar();
const R = [];

const estado = () => {
  const e = document.activeElement;
  if (!e || e === document.body) return { tag: 'body' };
  const s = getComputedStyle(e);
  const r = e.getBoundingClientRect();
  const contorno = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2) || (s.boxShadow && s.boxShadow !== 'none');
  const puntos = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 2, r.top + 2], [r.right - 2, r.top + 2], [r.left + 2, r.bottom - 2], [r.right - 2, r.bottom - 2]];
  const tapado = [];
  for (const [x, y] of puntos) {
    if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) { tapado.push('fuera'); continue; }
    const top = document.elementsFromPoint(x, y)[0];
    if (top && top !== e && !e.contains(top) && !top.contains(e)) tapado.push(`${top.tagName.toLowerCase()}.${[...top.classList].join('.')}`.slice(0, 50));
  }
  return {
    tag: e.tagName.toLowerCase(), txt: (e.getAttribute('aria-label') || e.textContent || e.value || '').trim().replace(/\s+/g, ' ').slice(0, 40),
    href: e.getAttribute('href'), contorno, outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} off ${s.outlineOffset}`,
    dentro: r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth, top: Math.round(r.top), bottom: Math.round(r.bottom),
    tapado: [...new Set(tapado)], id: e.id, cls: [...e.classList].join('.'),
  };
};

for (const ruta of rutas) for (const ancho of anchos) {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: ANCHOS[ancho] } });
  if (!aviso) await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  const adelante = [];
  for (let i = 0; i < 400; i++) {
    await p.keyboard.press('Tab');
    await p.waitForTimeout(i < 3 ? 250 : 120);
    const e = await p.evaluate(estado);
    if (i > 0 && e.tag === adelante[0].tag && e.txt === adelante[0].txt && e.href === adelante[0].href) break;
    adelante.push(e);
    if (e.tag === 'body' && i > 2) break;
  }
  const atras = [];
  for (let i = 0; i < adelante.length; i++) {
    await p.keyboard.press('Shift+Tab');
    await p.waitForTimeout(120);
    atras.push(await p.evaluate(estado));
  }
  const malos = (l) => l.filter((e) => e.tag !== 'body' && (!e.contorno || !e.dentro || e.tapado.length));
  R.push({ ruta, ancho, aviso, paradas: adelante.length, primero: adelante[0], malosAdelante: malos(adelante), malosAtras: malos(atras), adelante });
  await ctx.close();
  process.stdout.write('.');
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', arg('salida', aviso ? 'foco-aviso.json' : 'foco.json')), JSON.stringify(R, null, 1));
console.log();
for (const r of R) console.log(`${r.ruta}@${r.ancho}: ${r.paradas} paradas; primero ${r.primero.tag} «${r.primero.txt}» ${r.primero.href}; mal adelante ${r.malosAdelante.length}, atrás ${r.malosAtras.length}${r.malosAdelante.length + r.malosAtras.length ? '\n   ' + [...r.malosAdelante, ...r.malosAtras].slice(0, 4).map((e) => `${e.tag} «${e.txt}» contorno ${e.contorno} dentro ${e.dentro} (${e.top}–${e.bottom}) tapado ${e.tapado}`).join('\n   ') : ''}`);
