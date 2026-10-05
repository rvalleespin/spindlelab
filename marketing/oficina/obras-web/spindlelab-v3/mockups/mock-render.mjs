import { chromium } from 'playwright';
import fs from 'fs';
const SCR = '/tmp/claude-0/-home-user-spindlelab/756adde7-3da1-5186-9935-cf74aeaa7043/scratchpad/mock';
const casos = { 'combeau-fotografia': '#C5CFC0', 'combeau-modelo': '#D6D0C8', 'verifica-y-cumple': '#C3C8EE', 'raigal': '#B7AC9A' };
const solo = process.argv[2];
const barras = JSON.parse(fs.readFileSync(SCR + '/barras.json', 'utf8'));
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
for (const [slug, fondo] of Object.entries(casos)) {
  if (solo && solo !== slug) continue;
  const esc = `file://${SCR}/cap/${slug}-esc.png`, cel = `file://${SCR}/cap/${slug}-cel.png`;
  const escenas = {
    ancho: { w: 1600, h: 1200, lx: '150px', ly: '215px', lw: '1120px', tx: '1120px', ty: '420px', tw: '310px', esc, cel, suelo: '1' },
    alto: { w: 1000, h: 1100, tx: '220px', ty: '130px', tw: '560px', cel },
  };
  for (const [fmt, v] of Object.entries(escenas)) {
    const ctx = await b.newContext({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    const qs = new URLSearchParams({ ...Object.fromEntries(Object.entries(v).map(([k, x]) => [k, typeof x === 'number' ? x + 'px' : x])), fondo, ...barras[slug] });
    await p.goto(`file://${SCR}/escena.html?${qs}`);
    await p.waitForLoadState('networkidle'); await p.waitForTimeout(300);
    await p.screenshot({ path: `${SCR}/out/mock-${slug}-${fmt}.png` });
    await ctx.close();
  }
  console.log('ok', slug);
}
await b.close();
