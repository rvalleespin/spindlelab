// E12 · Resortes de Motion calibrados contra lo medido en Koto y en Accept & Proceed.
//
// No se calcula a mano: se baja la versión exacta de Motion que usa el tablero (la misma URL de jsDelivr), se
// carga su `spring()` y se le pide la posición cuadro a cuadro. Contra eso se ponen las curvas medidas en los
// referentes (cubic-bezier evaluada con el mismo método que usa el navegador) y se compara cuándo llega cada una
// al 50, 90, 95 y 99 % del recorrido y cuánto se pasa de largo.
//
// Uso: node resortes.mjs <carpeta del tablero>   →   datos/resortes.json
// Necesita curl con el proxy del entorno.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";

export const MOTION_VERSION = "13.5.0"; // publicada el 1-oct-2026 (registro de npm), 15 días antes de este tablero
export const MOTION_URL = `https://cdn.jsdelivr.net/npm/motion@${MOTION_VERSION}/dist/motion.js`;

const base = path.resolve(process.argv[2] || path.join(path.dirname(new URL(import.meta.url).pathname), ".."));
mkdirSync(path.join(base, "datos"), { recursive: true });

// Los tres resortes que propone el lock (§9). Masa 1: rigidez y amortiguación en las unidades de Motion.
export const RESORTES = {
  cursor: { stiffness: 2700, damping: 104, mass: 1, rol: "el círculo del cursor sigue al puntero" },
  estado: { stiffness: 800, damping: 57, mass: 1, rol: "lo que cambia al pasar o enfocar: la pieza del índice, el punto activo" },
  entrada: { stiffness: 230, damping: 31, mass: 1, rol: "un bloque que entra a la vista (medio de un caso, abridor de sección), una vez" },
};

// Lo medido (e12/medicion/koto/resumen.md y medicion.json; e12/medicion/accept-and-proceed/resumen.md)
const MEDIDO = {
  kotoHover: { tipo: "lineal", dur: 167, fuente: "Koto, pieza del índice y navegación: 167 ms, lineal (interaccion.trabajo1440.animsPieza130; navLink)" },
  kotoFeedIn: { tipo: "bezier", p: [0, 0, 0, 1], dur: 500, fuente: "Koto, --animate-feed-in-transform: .5s cubic-bezier(0,0,0,1), de 3,125rem a 0" },
  kotoWidgetIn: { tipo: "bezier", p: [0.14, 0.02, 0.25, 1], dur: 517, fuente: "Koto, --animate-widget-wrapper-in: .517s cubic-bezier(.14,.02,.25,1)" },
  kotoEncabezado: { tipo: "bezier", p: [0.15, 0, 0.15, 1], dur: 333, fuente: "Koto, encabezado al abrir (ancho): 333 ms cubic-bezier(.15,0,.15,1)" },
  apEntrada: { tipo: "bezier", p: [0, 0.56, 0.46, 1], dur: 1500, fuente: "A&P, entrada de cada bloque: 1,5 s cubic-bezier(0,.56,.46,1), 2vmin" },
  apCursor: { tipo: "dato", t50: 24, t90: 75, t99: 124, fuente: "A&P, cursor propio con un salto de 800 px: 50 % en 24 ms, 90 % en 75 ms, 99 % en 124 ms (IX2, smoothing 50), sin inercia (medicion.json, interaccion.cursorPropio.seguimiento; el resumen lo redondea a 80 ms)" },
  kotoCursor: { tipo: "dato", t90: 0, fuente: "Koto, etiqueta del cursor: en el primer cuadro ya está en la posición nueva" },
};

function bezier([x1, y1, x2, y2]) {
  // Igual que el navegador: resolver x(s) = t por Newton con respaldo de bisección, devolver y(s)
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (s) => ((ax * s + bx) * s + cx) * s;
  const Y = (s) => ((ay * s + by) * s + cy) * s;
  const dX = (s) => (3 * ax * s + 2 * bx) * s + cx;
  return (t) => {
    let s = t;
    for (let i = 0; i < 8; i++) {
      const e = X(s) - t;
      if (Math.abs(e) < 1e-7) return Y(s);
      const d = dX(s);
      if (Math.abs(d) < 1e-6) break;
      s -= e / d;
    }
    let lo = 0, hi = 1;
    s = t;
    for (let i = 0; i < 60; i++) {
      const x = X(s);
      if (Math.abs(x - t) < 1e-7) break;
      if (x < t) lo = s; else hi = s;
      s = (lo + hi) / 2;
    }
    return Y(s);
  };
}

function hitos(fn, finMs = 3000) {
  const r = { t50: null, t90: null, t95: null, t99: null, maximo: 0 };
  const serie = [];
  for (let t = 0; t <= finMs; t += 1) {
    const v = fn(t);
    if (t % 10 === 0 && t <= 1000) serie.push([t, Math.round(v * 1000) / 1000]);
    r.maximo = Math.max(r.maximo, v);
    for (const [k, u] of [["t50", 0.5], ["t90", 0.9], ["t95", 0.95], ["t99", 0.99]]) if (r[k] === null && v >= u) r[k] = t;
  }
  r.sobrepaso = Math.round(Math.max(0, r.maximo - 1) * 10000) / 100; // en %
  r.maximo = Math.round(r.maximo * 10000) / 10000;
  return { ...r, serie };
}

function main() {
  const tmp = mkdtempSync(path.join(tmpdir(), "e12-motion-"));
  try {
    const archivo = path.join(tmp, `motion-${MOTION_VERSION}.js`);
    execFileSync("curl", ["-sS", "--retry", "3", "--max-time", "90", "-o", archivo, MOTION_URL]);
    const Motion = createRequire(import.meta.url)(archivo);
    const salida = {
      fecha: "2026-10-16",
      medidoPor: "Lucía (dirección de arte), E12",
      motion: { version: MOTION_VERSION, url: MOTION_URL, funcion: "Motion.spring({ keyframes: [0, 1], stiffness, damping, mass }).next(ms).value" },
      metodo: "Posición cada 1 ms de 0 a 3000 ms, de 0 a 1. Hitos: primer instante en que la posición llega al 50, 90, 95 y 99 %. Sobrepaso: cuánto pasa de 1, en %. Las curvas medidas se evalúan como cubic-bezier sobre su duración (la de Koto y la de A&P son CSS); ζ = damping / (2·√(stiffness·mass)).",
      resortes: {},
      medido: {},
    };
    for (const [nombre, r] of Object.entries(RESORTES)) {
      const g = Motion.spring({ keyframes: [0, 1], stiffness: r.stiffness, damping: r.damping, mass: r.mass });
      const h = hitos((t) => g.next(t).value);
      const zeta = r.damping / (2 * Math.sqrt(r.stiffness * r.mass));
      salida.resortes[nombre] = { ...r, zeta: Math.round(zeta * 1000) / 1000, ...h };
      console.log(nombre, r, "ζ", zeta.toFixed(3), "t90", h.t90, "t99", h.t99, "sobrepaso", h.sobrepaso);
    }
    for (const [nombre, m] of Object.entries(MEDIDO)) {
      if (m.tipo === "dato") { salida.medido[nombre] = m; continue; }
      const f = m.tipo === "lineal" ? (t) => Math.min(1, t / m.dur) : ((b) => (t) => (t >= m.dur ? 1 : b(t / m.dur)))(bezier(m.p));
      salida.medido[nombre] = { ...m, ...hitos(f) };
      console.log(nombre, "t90", salida.medido[nombre].t90, "t99", salida.medido[nombre].t99);
    }
    writeFileSync(path.join(base, "datos", "resortes.json"), JSON.stringify(salida, null, 1));
    console.log("listo", path.join(base, "datos", "resortes.json"));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
