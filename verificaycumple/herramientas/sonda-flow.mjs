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
  const notas = [];
  if (limpio.length !== v.length) notas.push(`espacios alrededor (quedan ${limpio.length} al limpiar)`);
  if (limpio.length === 0) notas.push('VACÍO');
  // Un pegado doble se ve «presente» y con largo plausible, y produce un error de credenciales
  // idéntico al de una clave equivocada. Se detecta sin mirar el valor: si la primera mitad es
  // igual a la segunda, se pegó dos veces.
  const mitad = limpio.length / 2;
  if (limpio.length > 1 && Number.isInteger(mitad) && limpio.slice(0, mitad) === limpio.slice(mitad)) {
    notas.push('PEGADO DOS VECES (la primera mitad es idéntica a la segunda)');
  }
  // Y la forma de los caracteres, que tampoco revela el valor: las claves de Flow son
  // hexadecimal con guiones. Una letra fuera de ese juego suele ser una etiqueta que se
  // coló en el copiado.
  if (limpio && !/^[0-9A-Fa-f-]+$/.test(limpio)) notas.push('tiene caracteres fuera de [0-9A-F-]');
  return `${nombre}: ${v.length} caracteres${notas.length ? ' ⚠️ ' + notas.join(' · ') : ''}`;
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
} else if (accion === 'donde') {
  // ── EN QUÉ ENTORNO VIVEN ESTAS CLAVES ─────────────────────────────────────────────────
  //
  // Flow tiene dos mundos con credenciales DISTINTAS: `sandbox.flow.cl` y `www.flow.cl`. Una
  // clave de producción llamando al sandbox devuelve «apiKey not found», que es exactamente lo
  // que estamos viendo. Hay que distinguirlo de «la clave está mal copiada».
  //
  // ⚠️ SE PREGUNTA CON `payment/getStatus`, NO CON `payment/create`, Y ESA ES LA DECISIÓN
  // IMPORTANTE DE ESTE BLOQUE. `getStatus` solo LEE: no abre un pago, no cobra y no deja nada
  // creado del otro lado. Probar el entorno de producción con `create` significaría abrir un
  // cobro real para averiguar una pregunta de configuración, y eso no se hace nunca.
  //
  // El token es uno que no existe a propósito. Lo que interesa no es el pago, es CUÁL de los
  // dos errores contesta cada entorno:
  //   - «apiKey not found»  → ese entorno no conoce la clave.
  //   - cualquier otro       → la clave sí vive ahí, y el que falta es el pago inventado.
  for (const [nombre, base] of [['SANDBOX', F.BASE_SANDBOX], ['PRODUCCION', F.BASE_PRODUCCION]]) {
    const r = await F.leerPagoFlow('token-inexistente-de-la-sonda', { apiKey, secretKey, base });
    console.log(`\n--- ${nombre}  (${base}) ---`);
    console.log(JSON.stringify(r.detalleFlow || r, null, 2));
  }
  console.log('\nSi SANDBOX dice «apiKey not found» y PRODUCCION dice otra cosa, la cuenta');
  console.log('se creo en www.flow.cl y no en sandbox.flow.cl.');
} else {
  console.log('Uso:\n  node herramientas/sonda-flow.mjs donde\n  node herramientas/sonda-flow.mjs crear\n  node herramientas/sonda-flow.mjs leer <token>');
  process.exit(1);
}
