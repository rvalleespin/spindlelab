// uso: node ev.mjs <ruta relativa a e12-direcciones o url> <ancho> <alto> <archivo-js con funcion (cuerpo)> [reduced]
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [ruta, ancho, alto, js, red] = process.argv.slice(2);
const base = '' + (process.env.BASE || 'http://127.0.0.1:8841') + '/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/';
const url = ruta.startsWith('http') ? ruta : base + ruta;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await (await b.newContext({ viewport: { width: +ancho, height: +alto }, reducedMotion: red ? 'reduce' : 'no-preference' })).newPage();
await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(1200);
const code = fs.readFileSync(js, 'utf8');
const r = await p.evaluate(new Function(code));
console.log(typeof r === 'string' ? r : JSON.stringify(r, null, 1));
if (process.env.SHOT) await p.screenshot({ path: process.env.SHOT, fullPage: !!process.env.FULL });
await b.close();
