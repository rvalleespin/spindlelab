// garabatos.mjs — los garabatos provisionales de la dirección Taller (Lucía, 16-oct-2026)
//
// The Ready tiene uno o dos garabatos por página, trazados a mano con rotulador en ciruela (lock §5).
// Los definitivos los traza Bruno. Estos son provisionales para el tablero: un ovillo de rotulador
// generado con una semilla fija (siempre sale el mismo), trazo ciruela, puntas redondas, sin texto.
// Se usan como <img alt=""> (decorativos) y nunca detrás de texto (lock §13).
//
// Uso: node herramientas/garabatos.mjs   (desde tableros/e10-direcciones/) → proto/e10/garabato-*.svg
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = path.join(AQUI, 'proto/e10');

function azar(semilla) { // mulberry32
  let a = semilla >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// Catmull-Rom → Bézier cúbicas: una curva suave que pasa por todos los puntos, como una mano.
function curva(p) {
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
    const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
    const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  }
  return d;
}

// Un ovillo: el centro avanza por un recorrido y la punta da vueltas alrededor, con radio y ritmo
// que cambian un poco en cada vuelta (eso es lo que lo hace parecer dibujado).
function ovillo({ semilla, w, h, recorrido, vueltas, radio, aplaste, paso = 0.16, grosor }) {
  const r = azar(semilla);
  const pts = [];
  const total = vueltas * Math.PI * 2;
  const fase = [r() * 6.28, r() * 6.28, r() * 6.28];
  let ang = r() * Math.PI * 2;
  for (let t = 0; t <= total; t += paso) {
    const u = t / total;
    // posición del centro sobre el recorrido (polilínea)
    const seg = u * (recorrido.length - 1); const i = Math.min(recorrido.length - 2, Math.floor(seg)); const f = seg - i;
    const cx = recorrido[i][0] + (recorrido[i + 1][0] - recorrido[i][0]) * f;
    const cy = recorrido[i][1] + (recorrido[i + 1][1] - recorrido[i][1]) * f;
    // radio y ritmo cambian suave (ondas lentas), no a saltos: una mano no tiembla en cada punto
    const rr = radio * (1 + 0.28 * Math.sin(u * 7 + fase[0]) + 0.12 * Math.sin(u * 19 + fase[1]));
    ang += paso * (1 + 0.22 * Math.sin(u * 11 + fase[2]));
    pts.push([cx + Math.cos(ang) * rr + (r() - 0.5) * 1.2, cy + Math.sin(ang) * rr * aplaste + (r() - 0.5) * 1.2]);
  }
  // la caja se ajusta al trazo (más el grosor): nada queda cortado en el borde del SVG
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), m = grosor * 2;
  const x0 = Math.floor(Math.min(...xs) - m), y0 = Math.floor(Math.min(...ys) - m);
  const ancho = Math.ceil(Math.max(...xs) + m) - x0, alto = Math.ceil(Math.max(...ys) + m) - y0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0} ${y0} ${ancho} ${alto}" width="${ancho}" height="${alto}">
  <!-- Garabato provisional (E10, Taller). Semilla ${semilla}. El definitivo lo traza Bruno a mano. -->
  <path d="${curva(pts)}" fill="none" stroke="#1B0925" stroke-width="${grosor}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
}

const GARABATOS = {
  // al costado de la banda amarilla de la home, a sangre en el borde derecho (como los rulos de The Ready)
  'garabato-rulos': { semilla: 7, w: 360, h: 620, recorrido: [[200, 60], [150, 200], [230, 330], [160, 460], [210, 570]], vueltas: 11, radio: 70, aplaste: 0.62, grosor: 5 },
  // junto al h1 de Acompañamiento (como el ovillo de la oferta de The Ready)
  'garabato-ovillo': { semilla: 23, w: 520, h: 400, recorrido: [[90, 300], [230, 170], [330, 220], [440, 90]], vueltas: 8, radio: 78, aplaste: 0.8, grosor: 5 },
  // en la portada lima de Trabajo
  'garabato-lazo': { semilla: 41, w: 520, h: 360, recorrido: [[60, 220], [200, 120], [320, 250], [470, 140]], vueltas: 6, radio: 84, aplaste: 0.7, grosor: 5 },
};

fs.mkdirSync(SALIDA, { recursive: true });
for (const [nombre, o] of Object.entries(GARABATOS)) {
  fs.writeFileSync(path.join(SALIDA, `${nombre}.svg`), ovillo(o));
  console.log('ok', nombre);
}
