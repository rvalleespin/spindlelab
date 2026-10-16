// Lint de tono y reglas duras de los borradores. NO reemplaza la lectura de Ramón.
import fs from 'node:fs';
import { revisarFrase } from '../motor/lib/arreglo.mjs';
const D = JSON.parse(fs.readFileSync(new URL('./borradores-primer-toque.json', import.meta.url), 'utf8'));
const prohibidas = [/—/, /¡|!/, /no sé si alcanzaste/i, /si te sirve avanzar/i, /solucion/i, /impulsa/i, /_ga|_fbp|_gcl|doubleclick|pixel|píxel|plugin|tramo/i, /la ley exige|incumpl|multa|ilegal|ley 21|ley 19/i, /garantiz|100%|sin falta/i];
let mal = 0;
for (const d of D) {
  const cuerpo = d.cuerpo.slice(1).join(' ');   // sin el saludo
  const palabras = cuerpo.split(/\s+/).filter(Boolean).length;
  const probs = [];
  if (palabras > 150) probs.push(`${palabras} palabras (tope 150)`);
  for (const r of prohibidas) if (r.test(cuerpo + ' ' + d.asunto)) probs.push('prohibido: ' + r);
  for (const p of revisarFrase(cuerpo)) probs.push('tono: ' + p);
  if (d.asunto !== d.asunto.toLowerCase()) probs.push('el asunto debe ir en minúsculas');
  if (!d.baja.includes('verifica.spindlelab.cl/privacidad')) probs.push('falta la línea de baja');
  if (!/llamada de 20 minutos/.test(cuerpo)) probs.push('falta la puerta a la llamada de 20 minutos');
  d.palabras = palabras;
  console.log(`${d.id} ${d.dominio.padEnd(24)} ${String(palabras).padStart(3)} pal. ${probs.length ? '⚠ ' + probs.join(' | ') : 'ok'}`);
  mal += probs.length;
}
fs.writeFileSync(new URL('./borradores-primer-toque.json', import.meta.url), JSON.stringify(D, null, 1));
console.log(mal ? `${mal} problemas` : 'lint limpio');
