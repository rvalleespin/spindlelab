import { abrir, cargarKoto, cookies } from './comun.mjs';
const ancho = 1440; const O = process.argv[2];
const { nav, p } = await abrir(ancho);
await cargarKoto(p); await cookies(p);
const ys=[220,260,300,340,380,420,500,420,340,260,180,100];
for (const [i,y] of ys.entries()) { await p.evaluate(y=>scrollTo(0,y), y); await p.waitForTimeout(1400); await p.screenshot({ path:`${O}/u-${String(i).padStart(2,'0')}-${y}.png`, clip:{x:0,y:0,width:240,height:60} }); }
await nav.close();
