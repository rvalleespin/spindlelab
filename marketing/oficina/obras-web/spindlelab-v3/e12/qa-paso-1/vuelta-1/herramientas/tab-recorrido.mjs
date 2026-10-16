// QA E12 paso 1, vuelta 1 (Javiera) · recorrido de Tab completo del tablero, desde una carga limpia a 1440:
// cada parada con su contorno de foco medido y una captura de la parada sobre la pieza del cursor.
// Uso: node tab-recorrido.mjs <salida.json>
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [salida] = process.argv.slice(2);
const BASE = '/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-laboratorio';
const crudo = fs.readFileSync(path.join(BASE, 'tablero.html'), 'utf8');
const corte = crudo.indexOf('<div class="marco">');
const envuelto = `<!doctype html><html lang="es-CL"><head>${crudo.slice(0, corte)}</head><body>${crudo.slice(corte)}</body></html>`;
const PUERTO = 8796, URL_T = `http://127.0.0.1:${PUERTO}/qa-envuelto.html`;
const servidor = spawn('python3', ['-I', '-m', 'http.server', String(PUERTO), '--bind', '127.0.0.1', '--directory', BASE], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 900));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1' } : undefined });
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, timezoneId: 'America/Santiago', locale: 'es-CL' });
await ctx.route(URL_T, r => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: envuelto }));
const p = await ctx.newPage();
await p.goto(URL_T, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(800);
const paradas = [];
for (let i = 0; i < 80; i++) {
  await p.keyboard.press('Tab');
  await p.waitForTimeout(60);
  const s = await p.evaluate(() => {
    const a = document.activeElement; if (!a || a === document.body) return null;
    const st = getComputedStyle(a); const r = a.getBoundingClientRect();
    const visible = r.top >= 0 && r.bottom <= innerHeight;
    return { el: a.tagName.toLowerCase() + (a.id ? '#' + a.id : '') + (a.getAttribute('href') ? '[' + a.getAttribute('href').slice(0, 60) + ']' : '') + (a.type === 'radio' ? '=' + a.value : ''),
      texto: (a.innerText || a.value || '').trim().replace(/\s+/g, ' ').slice(0, 40), contorno: st.outlineStyle + ' ' + st.outlineWidth + ' ' + st.outlineColor, enPantalla: visible, ancho: Math.round(r.width), alto: Math.round(r.height) };
  });
  if (!s) break;
  if (paradas.some(x => x.el === s.el && x.texto === s.texto)) break;
  paradas.push(s);
}
const R = { fecha: new Date().toISOString(), paradas, sinContorno: paradas.filter(x => x.contorno.startsWith('none')).map(x => x.el), fueraDePantalla: paradas.filter(x => !x.enPantalla).map(x => x.el) };
await nav.close(); servidor.kill();
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
