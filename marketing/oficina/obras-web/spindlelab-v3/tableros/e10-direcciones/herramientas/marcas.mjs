// marcas.mjs — lo que se dibuja a mano en E10, propio de SpindleLab (Lucía, 16-oct-2026; reemplaza a garabatos.mjs).
//
// Defecto 6 de la ronda 1 de QA (acta-paso-2.md): los garabatos eran ovillos y rulos puestos donde The Ready
// pone los suyos. Lo propio es otra cosa: las MARCAS DE REVISIÓN de quien revisa un sitio con un plumón
// (lock §10b). Cada una hace un trabajo y va donde ese trabajo está:
//   · flecha  → apunta al campo del chequeo (home, Taller): «empieza aquí».
//   · visto   → junto a la prueba de los robots que responden 200 (Acompañamiento, Taller): «comprobado».
//   · anillo  → rodea el botón «Correr el chequeo» (Trabajo, Taller): «haz esto».
// Provisionales para el tablero: trazo generado con semilla fija (siempre sale igual), ciruela del manual, puntas
// redondas, sin texto. Las definitivas las traza Bruno a mano con la misma forma y el mismo lugar.
// Van como fondo de un ::after (decorativas: no son contenido, no entran al árbol accesible).
//
// También escribe el MARCADOR (el resaltador detrás de la frase): la misma pasada de plumón propia de antes, en
// la paleta propia (marcador.svg, marcador-papel.svg) y en la de The Ready (…-tr.svg, solo para la comparación
// del tablero).
//
// Uso: node herramientas/marcas.mjs   (desde tableros/e10-direcciones/) → proto/e10/marca-*.svg y marcador*.svg
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = path.join(AQUI, 'proto/e10');
const TOKENS = fs.readFileSync(path.join(SALIDA, 'tokens.css'), 'utf8');
const tk = (n, desde = 0) => { const m = TOKENS.slice(desde).match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{6})`)); if (!m) throw new Error(`falta --${n}`); return m[1]; };
const corte = TOKENS.indexOf('html[data-paleta="the-ready"]');
const PROPIA = { papel: tk('papel'), ciruela: tk('ciruela'), amarillo: tk('amarillo') };
const TR = { papel: tk('papel', corte), ciruela: tk('ciruela', corte), amarillo: tk('amarillo', corte) };

function azar(semilla) { // mulberry32
  let a = semilla >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
// Catmull-Rom → Bézier: una curva que pasa por todos los puntos, como una mano.
function curva(p) {
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
    d += ` C${(b[0] + (c[0] - a[0]) / 6).toFixed(1)} ${(b[1] + (c[1] - a[1]) / 6).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(1)} ${(c[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  }
  return d;
}
// Un trazo que sigue una guía SUAVE (Catmull-Rom muestreada, sin quiebres en los puntos de la guía) con un pulso
// que ondula lento a lo ancho: una mano no tiembla en cada punto, se desvía de a poco.
function trazo(guia, r, amp = 2.2, paso = 6) {
  const sp = [];
  for (let i = 0; i < guia.length - 1; i++) {
    const p0 = guia[i - 1] || guia[i], p1 = guia[i], p2 = guia[i + 1], p3 = guia[i + 2] || p2;
    const n = Math.max(2, Math.round(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / paso));
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      sp.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  sp.push(guia[guia.length - 1]);
  const fase = r() * 6.28;
  return sp.map((p, i) => {
    const a = sp[Math.max(0, i - 1)], b = sp[Math.min(sp.length - 1, i + 1)];
    const nx = -(b[1] - a[1]), ny = b[0] - a[0], l = Math.hypot(nx, ny) || 1;
    const o = (i === 0 || i === sp.length - 1) ? 0 : amp * Math.sin(i / 9 + fase);
    return [p[0] + (nx / l) * o, p[1] + (ny / l) * o];
  });
}
function svg(trazos, color, grosor, nota) {
  const todos = trazos.flat(); const m = grosor * 2;
  const xs = todos.map((p) => p[0]), ys = todos.map((p) => p[1]);
  const x0 = Math.floor(Math.min(...xs) - m), y0 = Math.floor(Math.min(...ys) - m);
  const w = Math.ceil(Math.max(...xs) + m) - x0, h = Math.ceil(Math.max(...ys) + m) - y0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0} ${y0} ${w} ${h}" width="${w}" height="${h}">
  <!-- ${nota} Provisional (E10, Taller): el definitivo lo traza Bruno a mano, con esta forma y en este lugar. -->
${trazos.map((p) => `  <path d="${curva(p)}" fill="none" stroke="${color}" stroke-width="${grosor}" stroke-linecap="round" stroke-linejoin="round"/>`).join('\n')}
</svg>
`;
}

const MARCAS = {
  // Flecha que viene desde abajo a la derecha y apunta a la izquierda, al campo del chequeo.
  'marca-flecha': () => {
    const r = azar(11);
    const cuerpo = trazo([[232, 138], [206, 88], [150, 56], [80, 48], [18, 54]], r, 1.4);
    const punta = [18, 54];
    const ala1 = trazo([[46, 30], [31, 42], punta], r, 0.4, 4);
    const ala2 = trazo([punta, [32, 68], [47, 82]], r, 0.4, 4);
    return svg([cuerpo, ala1, ala2], PROPIA.ciruela, 4.5, 'Marca de revisión «empieza aquí»: apunta al campo del chequeo.');
  },
  // Visto: tramo corto que baja y tramo largo que sube, con el remate que se pasa un poco.
  'marca-visto': () => {
    const r = azar(29);
    // dos tramos con su propia curva, unidos en el vértice (el quiebre del visto es de la letra, no de la guía)
    const baja = trazo([[8, 70], [24, 88], [44, 114]], r, 0.8, 4);
    const sube = trazo([[44, 114], [70, 74], [108, 32], [154, 6]], r, 1.2, 5);
    return svg([[...baja, ...sube.slice(1)]], PROPIA.ciruela, 5, 'Marca de revisión «comprobado».');
  },
  // Anillo: una vuelta y un poco más, que no cierra donde empieza (así rodea una mano).
  'marca-anillo': () => {
    const r = azar(47); const pts = [];
    const cx = 170, cy = 66, rx = 160, ry = 58; const total = Math.PI * 2 * 1.12; const a0 = -0.5;
    for (let t = 0; t <= total; t += 0.09) {
      const u = t / total; const k = 1 + 0.05 * Math.sin(u * 9 + 1) + 0.035 * Math.sin(u * 23);
      pts.push([cx + Math.cos(a0 - t) * rx * k + (r() - 0.5) * 0.8, cy + Math.sin(a0 - t) * ry * k * (1 + 0.08 * u) + (r() - 0.5) * 0.8]);
    }
    return svg([pts], PROPIA.ciruela, 4, 'Marca de revisión «haz esto»: rodea el botón del chequeo.');
  },
};

// El marcador (resaltador): pasada de plumón con bordes que ondulan, entrada en ángulo, salida que sube y dos
// vetas donde el plumón se secó. Es la forma propia de siempre; cambian los colores (paleta propia).
const PASADA = 'M9 27 C38 19 70 23 104 18 C150 12 190 20 236 14 C284 8 330 15 372 8 C384 6 392 9 395 15 C398 35 393 58 397 79 C398 87 391 91 380 90 C334 88 300 94 252 91 C204 88 170 96 118 93 C80 91 44 97 14 95 C7 95 4 90 5 82 C8 63 2 44 9 27 Z';
const VETA1 = 'M40 41 C92 37 150 40 214 36 C262 33 312 37 360 33 L361 36 C312 40 262 37 214 40 C150 44 92 41 40 44 Z';
const VETA2 = 'M120 71 C170 68 226 71 290 67 C318 65 342 67 366 65 L366 67 C342 69 318 68 290 70 C226 74 170 71 120 74 Z';
function marcador(fondo, veta, opac, nota) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" preserveAspectRatio="none">
  <!-- Marcador a mano, propio de SpindleLab (E10). No es el de The Ready (allá es un trazo SVG recto de remate
       cuadrado, 1em, que se dibuja en ~470 ms): este es una pasada de plumón con bordes que ondulan, entrada en
       ángulo, salida que sube y dos vetas donde el plumón se secó. ${nota} -->
  <path fill="${fondo}" d="${PASADA}"/>
  <path fill="${veta}" fill-opacity="${opac[0]}" d="${VETA1}"/>
  <path fill="${veta}" fill-opacity="${opac[1]}" d="${VETA2}"/>
</svg>
`;
}

fs.mkdirSync(SALIDA, { recursive: true });
for (const [nombre, f] of Object.entries(MARCAS)) { fs.writeFileSync(path.join(SALIDA, `${nombre}.svg`), f()); console.log('ok', nombre); }
const M = {
  'marcador': [PROPIA.amarillo, PROPIA.papel, ['.38', '.3'], 'Paleta propia: el resaltador sobre papel.'],
  'marcador-papel': [PROPIA.papel, PROPIA.amarillo, ['.55', '.45'], 'Paleta propia: variante papel, la que va sobre la banda del resaltador.'],
  'marcador-tr': [TR.amarillo, TR.papel, ['.38', '.3'], 'Solo para la comparación del tablero: los colores exactos de The Ready.'],
  'marcador-papel-tr': [TR.papel, TR.amarillo, ['.55', '.45'], 'Solo para la comparación del tablero: los colores exactos de The Ready, variante papel.'],
};
for (const [nombre, [a, b, o, n]] of Object.entries(M)) { fs.writeFileSync(path.join(SALIDA, `${nombre}.svg`), marcador(a, b, o, n)); console.log('ok', nombre); }
