// Dirección A · recorridos grabados del navegador (no generados): la home y el índice a 1440 × 900, de 10 a 20 s.
// Mouse real (el círculo, el velo y la pieza que se acorta), el chequeo corriendo de verdad y scroll nativo.
// Uso: node grabar.mjs <base-url> <carpeta-video>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [base, salida, consulta = ''] = process.argv.slice(2);  // consulta: '?senal=cobalto' para la opción (b)
fs.mkdirSync(salida, { recursive: true });
const tmp = path.join(salida, '.tmp-a');
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

async function grabar(nombre, ruta, guion) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-CL', timezoneId: 'America/Santiago', recordVideo: { dir: tmp, size: { width: 1440, height: 900 } } });
  const p = await ctx.newPage();
  const t0 = Date.now();
  await p.goto(base + ruta + consulta, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await guion(p);
  const dur = (Date.now() - t0) / 1000;
  const v = p.video();
  await ctx.close();
  const destino = path.join(salida, nombre);
  await v.saveAs(destino);
  await v.delete();
  return { nombre, segundos: Math.round(dur * 10) / 10 };
}
const rueda = async (p, total, pasos = 12, espera = 45) => { for (let i = 0; i < pasos; i++) { await p.mouse.wheel(0, total / pasos); await p.waitForTimeout(espera); } };
const deslizar = async (p, x0, y0, x1, y1, pasos = 18) => { await p.mouse.move(x0, y0); await p.mouse.move(x1, y1, { steps: pasos }); };

const hechos = [];
const sufijo = consulta ? '-cobalto' : '';
hechos.push(await grabar(`a-home-1440${sufijo}.webm`, '', async (p) => {
  await p.mouse.move(700, 300);
  await p.waitForTimeout(2200);                                   // la cinta corre y su ficha cambia al lado
  await p.click('#chq-dominio');
  await p.keyboard.type('verifica.spindlelab.cl', { delay: 35 });
  await p.click('#chq-btn');
  await p.waitForSelector('#chq-out.visible', { timeout: 30000 });
  await p.waitForTimeout(900);
  await rueda(p, 520, 10, 60);                                    // baja por el resultado del chequeo
  await p.waitForTimeout(700);
  const dest = await p.locator('#h-obra').boundingBox();
  await rueda(p, dest.y - 120, 16, 45);                           // hasta el índice corto
  const m = await p.locator('.destacados .medio-enlace').first().boundingBox();
  await deslizar(p, m.x - 60, m.y + 80, m.x + m.width * 0.45, m.y + m.height * 0.45, 20);
  await p.waitForTimeout(500);
  await deslizar(p, m.x + m.width * 0.45, m.y + m.height * 0.45, m.x + m.width * 0.75, m.y + m.height * 0.3, 18);
  await p.waitForTimeout(600);
  await p.mouse.move(m.x - 80, m.y + m.height * 0.5, { steps: 10 }); // sale: el círculo se recoge
  await rueda(p, 700, 14, 45);
  const par = await p.locator('.destacados .fila-par .medio-enlace').nth(1).boundingBox();
  await deslizar(p, par.x - 40, par.y + 60, par.x + par.width * 0.5, par.y + par.height * 0.4, 18);
  await p.waitForTimeout(900);
  await p.mouse.move(par.x - 60, par.y + 40, { steps: 8 });
  await rueda(p, 900, 14, 50);
  await p.waitForTimeout(700);
}));
hechos.push(await grabar(`a-trabajo-1440${sufijo}.webm`, 'trabajo/', async (p) => {
  await p.mouse.move(150, 600);
  await p.waitForTimeout(1200);
  const piezas = p.locator('.muro .medio-enlace');
  for (const i of [0, 1, 3]) {                                       // tres piezas: velo sobre las demás, círculo y corte
    const b = await piezas.nth(i).boundingBox();
    await deslizar(p, b.x + 20, b.y + 30, b.x + b.width * 0.5, b.y + Math.min(b.height, 500) * 0.5, 16);
    await p.waitForTimeout(650);
  }
  await p.mouse.move(150, 500, { steps: 10 });
  await p.waitForTimeout(500);
  await p.click('[data-filtro] button[data-tipo="concepto"]');       // el filtro filtra de verdad
  await p.waitForTimeout(1000);
  const c = await piezas.filter({ visible: true }).nth(1).boundingBox();
  await deslizar(p, c.x + 20, c.y + 20, c.x + c.width * 0.5, c.y + c.height * 0.45, 16);
  await p.waitForTimeout(900);
  await p.mouse.move(150, 500, { steps: 10 });
  await p.click('[data-filtro] button[data-tipo="todo"]');
  await p.waitForTimeout(800);
  await rueda(p, 1100, 18, 50);
  const d = await piezas.nth(6).boundingBox();
  await deslizar(p, d.x + 20, d.y + 20, d.x + d.width * 0.5, d.y + Math.min(d.height, 400) * 0.5, 14);
  await p.waitForTimeout(900);
  await p.mouse.move(150, 500, { steps: 8 });
  await rueda(p, 900, 14, 50);
  await p.waitForTimeout(600);
}));
await nav.close();
fs.rmSync(tmp, { recursive: true, force: true });
console.log(JSON.stringify(hechos));
