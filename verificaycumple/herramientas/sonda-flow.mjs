/**
 * Sonda de Flow — abre un pago en el SANDBOX y lee qué contesta.
 *
 *   node herramientas/sonda-flow.mjs crear
 *   node herramientas/sonda-flow.mjs leer <token>
 *
 * ── PARA QUÉ EXISTE (29-oct-2026) ───────────────────────────────────────────────────────
 *
 * `functions/api/flow.js` tiene un mapa VACÍO a propósito: `ESTADOS_FLOW`. Flow devuelve un
 * campo `status` con un número y **no documenta qué significa cada número**. Adivinarlo falla
 * en las dos direcciones: dar por pagado un rechazo regala el kit, y no reconocer un pago deja
 * al cliente mirando una pantalla que nunca avanza.
 *
 * Esta sonda es la única forma honesta de llenarlo: se abre un pago de verdad en el sandbox,
 * se lee el número ANTES de pagar y DESPUÉS de pagar, y se escribe lo observado. Un número por
 * vez, cada uno con su pago detrás.
 *
 * ⚠️ **No importa una copia de la firma: importa `flow.js` tal cual está.** Si la sonda
 * reimplementara el HMAC, probaría la sonda y no el adaptador, y la prueba y el arreglo
 * saldrían del mismo supuesto. Lo que se verifica acá es el código que va a producción.
 *
 * ⚠️ **Es el sandbox: no mueve plata de nadie.** `https://sandbox.flow.cl` es el entorno de
 * pruebas de Flow. No hay cobro, no hay tarjeta real y no genera ningún documento tributario.
 *
 * ── LAS CLAVES NUNCA SE ESCRIBEN ACÁ ────────────────────────────────────────────────────
 *
 * Se leen del entorno. Para cargarlas sin que queden en el historial del shell:
 *
 *   read -s "FLOW_API_KEY?apiKey: "    && export FLOW_API_KEY
 *   read -s "FLOW_SECRET_KEY?secretKey: " && export FLOW_SECRET_KEY
 *
 * (`read -s` y no `read -p`: en zsh `-p` es la bandera de coproceso y el valor no se lee nunca.)
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const AQUI = dirname(fileURLToPath(import.meta.url));
const F = await import(join(AQUI, '..', 'functions', 'api', 'flow.js'));

/** Lo que se le pide a Flow. En el sandbox el monto da igual, pero tiene que ser entero. */
const MONTO = 1000;
const CONFIRMACION = 'https://verifica.spindlelab.cl/api/flow-confirmacion';
const VUELTA = 'https://verifica.spindlelab.cl/pedido/';

/**
 * Reporta la FORMA de un secreto, nunca su valor.
 *
 * Un secreto vacío o con un espacio pegado al final se ve «presente» desde afuera y no sirve;
 * el diagnóstico tiene que poder distinguir «no está» de «está pero está roto» sin mostrarlo.
 */
function forma(nombre, v) {
  if (v === undefined) return `${nombre}: NO ESTÁ en el entorno`;
  const limpio = v.trim();
  const sucio = limpio.length !== v.length;
  return `${nombre}: ${v.length} caracteres${sucio ? ` ⚠️ con espacios alrededor (quedan ${limpio.length} al limpiar)` : ''}` +
    `${limpio.length === 0 ? ' ⚠️ VACÍO' : ''}`;
}

const apiKey = process.env.FLOW_API_KEY;
const secretKey = process.env.FLOW_SECRET_KEY;
console.log(forma('FLOW_API_KEY', apiKey));
console.log(forma('FLOW_SECRET_KEY', secretKey));
if (!apiKey || !secretKey || !apiKey.trim() || !secretKey.trim()) {
  console.log('\nFaltan las claves. Mira el encabezado de este archivo para cargarlas.');
  process.exit(1);
}

const credenciales = { apiKey, secretKey, base: F.BASE_SANDBOX };
const [accion, arg] = process.argv.slice(2);

if (accion === 'crear') {
  // El id tiene que ser distinto en cada intento: Flow rechaza un `commerceOrder` repetido, y
  // además queremos poder mirar varios pagos en paralelo (uno pagado, uno abandonado).
  const idPedido = `sonda_${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`;
  const r = await F.crearPagoFlow({
    idPedido,
    correo: 'hola+flowdev@spindlelab.cl',
    monto: MONTO,
    titulo: 'Sonda de integración (sandbox)',
    urls: { confirmacion: CONFIRMACION, vuelta: VUELTA },
    timeoutSegundos: 3600,
  }, credenciales);

  console.log('\n--- payment/create ---');
  console.log(JSON.stringify(r, null, 2));
  if (r.ok) {
    console.log(`\nPEDIDO:  ${idPedido}`);
    console.log(`TOKEN:   ${r.token}`);
    console.log(`\nAbre esto y paga en el sandbox:\n${r.destino}`);
    console.log(`\nAntes de pagar y después de pagar, corre:\n  node herramientas/sonda-flow.mjs leer ${r.token}`);
  }
} else if (accion === 'leer') {
  if (!arg) { console.log('Falta el token: node herramientas/sonda-flow.mjs leer <token>'); process.exit(1); }
  const r = await F.leerPagoFlow(arg, credenciales);
  console.log('\n--- payment/getStatus ---');
  // El cuerpo ENTERO, no solo `status`: no sabemos todavía qué campos trae ni cómo se llaman,
  // y recortarlo acá sería decidir qué importa antes de haberlo visto.
  console.log(JSON.stringify(r, null, 2));
  if (r.ok) {
    console.log(`\n>>> status = ${JSON.stringify(r.pago.status)}   (el número que falta en ESTADOS_FLOW)`);
    console.log(`>>> ESTADOS_FLOW lo conoce: ${r.pago.status in F.ESTADOS_FLOW ? 'sí' : 'NO — por eso nada se marca solo'}`);
  }
} else {
  console.log('Uso:\n  node herramientas/sonda-flow.mjs crear\n  node herramientas/sonda-flow.mjs leer <token>');
  process.exit(1);
}
