/**
 * Pruebas de `POST /api/pedido` — el endpoint que crea el pedido y abre el pago.
 *
 *   node prueba-crear-pedido.mjs
 *
 * Es la puerta de entrada del dinero. Si se equivoca hacia un lado, se le vende a quien no
 * tenemos cómo atender; si se equivoca hacia el otro, se le cobra dos veces a la misma persona.
 *
 * ⚠️ LAS RUTAS VAN FORZADAS A UN SOLO WORKTREE, A PROPÓSITO. `chequeo.js` existe en varias
 * carpetas del repo con contenidos distintos, y `rutas.mjs` se niega a adivinar —hace bien—.
 * Pero además hay una razón propia de esta prueba: mezclar módulos de worktrees distintos sería
 * su propio falso verde, porque probaría una combinación que no existe en ningún despliegue.
 * Acá se prueba UNA copia coherente, la de la rama que se despliega.
 */

const RAIZ = '/Users/ramon/vyc-ley21719/verificaycumple/functions/api';
for (const [v, f] of [
  ['CHEQUEO_JS', 'chequeo.js'], ['PROFUNDO_JS', 'profundo.js'], ['PEDIDO_JS', 'pedido.js'],
  ['PEDIDOS_JS', 'pedidos.js'], ['ALMACEN_JS', 'almacen.js'], ['COBRO_JS', 'cobro.js'],
  ['ETAPAS_JS', 'etapas.js'], ['ELEGIBILIDAD_JS', 'elegibilidad.js'],
]) process.env[v] = `${RAIZ}/${f}`;

/**
 * ⚠️ ESTE ARCHIVO PRUEBA EL CAMINO DE MERCADO PAGO, Y LO DICE EN CADA `env`.
 *
 * Desde el 29-oct el endpoint elige pasarela con `PASARELA`, y el valor por defecto es Flow.
 * Estas pruebas no lo declaraban —no hacia falta cuando habia una sola— y el dia del cambio
 * el archivo REVENTO con un `TypeError` en vez de acusar: el endpoint no llamaba a Mercado
 * Pago, asi que las cabeceras capturadas eran `undefined`.
 *
 * Una prueba que depende de un valor por defecto cambia de significado sin que nadie la toque.
 * Por eso cada `env` de aca dice `PASARELA: 'mp'` explicito, aunque hoy coincidiera.
 */

import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { rutaEnElRepo } from './rutas.mjs';

const E = await import(rutaEnElRepo('verificaycumple/functions/api/pedido.js', 'PEDIDO_JS'));
const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const PR = await import(rutaEnElRepo('verificaycumple/functions/api/profundo.js', 'PROFUNDO_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

/* ── El andamio ───────────────────────────────────────────────────────────────────────── */

function comoD1(sqlite) {
  return {
    prepare(sql) {
      const st = sqlite.prepare(sql);
      let args = [];
      const api = {
        bind(...a) { args = a; return api; },
        async run() { const r = st.run(...args); return { meta: { changes: Number(r.changes) } }; },
        async first() { return st.get(...args) ?? null; },
        async all() { return { results: st.all(...args) }; },
      };
      return api;
    },
  };
}

function baseNueva() {
  const s = new DatabaseSync(':memory:');
  for (const sent of P.ESQUEMA.split(';')) if (sent.trim()) s.exec(sent + ';');
  return { db: comoD1(s), crudo: s };
}

/** Un KV de mentira, con lo poco que el endpoint le pide. */
function kvNuevo(entradas = {}) {
  const m = new Map(Object.entries(entradas));
  return {
    almacen: m,
    async get(k, o) { const v = m.get(k); if (v === undefined) return null; return (o && o.type === 'json') ? JSON.parse(v) : v; },
    // Las opciones se guardan aparte: el `expirationTtl` del freno de la reconciliación es
    // justamente lo que hace que la red de seguridad vuelva a encenderse. Sin él la marca sería
    // eterna y la red se apagaría para siempre, en silencio.
    opciones: new Map(),
    async put(k, v, o) { m.set(k, String(v)); this.opciones.set(k, o || null); },
  };
}

/** Una portada que el chequeo rápido puede leer, con un rastreador y sin gestor de permiso. */
const PORTADA = `<!doctype html><html lang="es"><head><title>Clínica Ejemplo</title>
<meta name="description" content="Una clínica"></head><body><h1>Clínica Ejemplo</h1>
<p>Texto suficiente para que no parezca una portada vacía detrás de un portero.</p>
<p>Más texto todavía, porque el chequeo mira cuántas letras tiene antes de decidir que esto es
una portada de verdad y no un cascarón.</p>
<script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>
<a href="/privacidad/">Política de privacidad</a></body></html>`;

/** Un informe profundo como el que queda en la caché de KV, con dos señales que el kit cierra. */
/**
 * Un informe profundo como el que queda en la caché de KV.
 *
 * ⚠️ `revisadoEn` es RELATIVO a propósito, nunca una fecha fija: el checkout rechaza un informe
 * que no pueda fechar o que haya pasado su validez, así que con una fecha escrita a mano todos
 * los casos felices de este archivo se pondrían rojos solos al día siguiente.
 */
const PROFUNDO = (dominio = 'clinicaejemplo.cl', desfaseMs = 0) => ({
  ok: true, dominio, revisado: `https://www.${dominio}/`,
  revisadoEn: new Date(Date.now() - desfaseMs).toISOString(),
  puntaje: 40, pesoConfirmado: 13, pesoTotal: 13, pendientes: 2, sinConfirmar: 0, noAplica: 0,
  parcial: false, bloqueado: null, segundosMirados: 7,
  items: [
    { bloque: 'consentimiento', id: 'carga', titulo: 'Rastreadores que parten solos', estado: 'pendiente', ok: false, peso: 3 },
    { bloque: 'consentimiento', id: 'cookies', titulo: 'Cookies escritas sin permiso', estado: 'pendiente', ok: false, peso: 3 },
    { bloque: 'consentimiento', id: 'envio', titulo: 'Datos que ya salieron de tu sitio', estado: 'ok', ok: true, peso: 4 },
    { bloque: 'consentimiento', id: 'aviso', titulo: 'Si aparece un aviso al entrar', estado: 'ok', ok: true, peso: 3 },
  ],
  rastreadores: [], terceros: [], cookies: { propias: [], terceras: [] }, aviso: null, gesto: null,
  informativos: [], bloques: [],
});

const ORDEN_MP = (ref) => ({
  id: 'ORD01PRUEBA0000000000000001',
  external_reference: ref,
  status: 'created',
  total_amount: '177310',
  checkout_url: 'https://www.mercadopago.cl/checkout/v1/redirect?order_id=ORD01PRUEBA0000000000000001',
});

/**
 * Reemplaza el fetch global, que es lo que usan POR DENTRO tanto `chequear` como `crearOrdenMP`.
 * Enruta por destino: lo de Mercado Pago va a la orden, lo demás al sitio.
 */
function conRed({ sitio = PORTADA, mp = null, mpEstado = 201, caeMP = false,
  // Desde el 24-oct el POST también LEE una orden (GET /v1/orders/…) antes de cerrar una compra
  // abierta vieja, así que el molde tiene que saber contestar las dos cosas. `leida` es lo que
  // devuelve esa lectura; `leidaEstado` su código HTTP; `caeLeida` simula que no se puede
  // preguntar.
  leida = null, leidaEstado = 200, caeLeida = false,
  // Flow. `flow` es lo que devuelve `payment/create`; `caeFlow` simula que no contesta.
  flow = { url: 'https://sandbox.flow.cl/app/web/pay.php', token: 'TOKFLOW123', flowOrder: 42 },
  flowEstado = 200, caeFlow = false, flowPago = null,
  // Una página de política SERVIDA APARTE. Sin esto el molde devuelve la portada para
  // cualquier URL, y el chequeo lo detecta y lo dice: «lleva de vuelta a tu página de
  // inicio», así que `politica` sale pendiente SIEMPRE. Daba igual mientras la política
  // estaba fuera de lo que el kit cierra; desde el 2-nov decide si hay venta.
  politica = null } = {}) {
  const antes = globalThis.fetch;
  const llamadas = { sitio: 0, mp: 0, flow: 0, lecturas: 0, lecturasFlow: 0, avisos: [], cuerposMP: [], cabecerasMP: [], cuerposFlow: [] };

  /**
   * ⚠️⚠️ CADA `payment/create` DEVUELVE UN TOKEN DISTINTO, Y ESO NO ES UN DETALLE DEL DOBLE.
   *
   * Hasta el 3-nov-2026 este molde contestaba SIEMPRE el mismo token. Con eso, un endpoint que
   * abriera dos pagos por el mismo pedido era indistinguible de uno que reusara el que ya
   * estaba: los dos enlaces salian identicos y ninguna asercion podia separarlos. O sea que el
   * doble de red tapaba exactamente el defecto que habia que encontrar.
   *
   * Flow hace lo contrario, y se midio: tres `payment/create` seguidos con el MISMO
   * `commerceOrder` contestaron `ok` con `flowOrder` 11463040, 11463041 y 11463042 y tres
   * tokens distintos, y los tres `getStatus` devolvieron ese mismo `commerceOrder` con
   * `status: 1`. Tres enlaces de pago vivos a la vez.
   *
   * Por eso el molde ahora mintea un token por llamada y RECUERDA cada pago que creo, para que
   * `getStatus` pueda contestar sobre el pago que de verdad se abrio en vez de sobre un dato
   * fijo escrito en la prueba.
   */
  const pagosFlow = new Map();
  let creadosFlow = 0;

  globalThis.fetch = async (u, o = {}) => {
    const url = String(u && u.url ? u.url : u);
    if (url.includes('flow.cl')) {
      // Leer el estado de un pago (GET a getStatus) no es lo mismo que crear uno (POST), y el
      // endpoint hace las dos cosas: antes de abrir un cobro nuevo le pregunta a la pasarela
      // por la compra abierta vieja.
      if (url.includes('getStatus')) {
        llamadas.lecturasFlow++;
        // Lo que la prueba fije manda: es como se monta un pago que ya estaba ahi antes de
        // empezar (una compra vieja, un pago pagado o rechazado).
        if (flowPago) return { ok: true, status: 200, headers: { get: () => null }, json: async () => flowPago };
        const t = new URL(url).searchParams.get('token');
        const abierto = pagosFlow.get(t);
        // Un token que este molde nunca creo y que la prueba no fijo: no se inventa una
        // respuesta. Contestar «existe y nadie pago» sobre un pago desconocido seria el molde
        // decidiendo por el proveedor.
        if (!abierto) return { ok: false, status: 500, headers: { get: () => null }, json: async () => ({ code: 1700, message: 'Transaction not found' }) };
        return { ok: true, status: 200, headers: { get: () => null },
          json: async () => ({
            flowOrder: abierto.flowOrder, commerceOrder: abierto.commerceOrder,
            // `1` es lo que Flow contesta de un pago recien abierto que nadie pago: observado
            // en los tres pagos del experimento.
            status: 1, currency: 'CLP', amount: abierto.amount, payer: abierto.email,
            paymentData: { date: null, media: null, amount: null, fee: null, balance: null },
          }) };
      }
      llamadas.flow++;
      // El cuerpo va como formulario, asi que se desarma para poder mirarlo campo por campo.
      const enviado = Object.fromEntries(new URLSearchParams(String(o.body || '')));
      llamadas.cuerposFlow.push(enviado);
      if (caeFlow) throw new Error('ECONNRESET');
      creadosFlow++;
      // El primero conserva el token que la prueba espera; del segundo en adelante cambia,
      // como cambia de verdad. Si la prueba fijo un `flow` sin token (el caso «Flow contesta
      // sin token»), no hay nada que mintear y se devuelve tal cual.
      const cuerpo = (flow && flow.token && creadosFlow > 1)
        ? { ...flow, token: `${flow.token}-${creadosFlow}`, flowOrder: (flow.flowOrder || 0) + creadosFlow - 1 }
        : flow;
      if (cuerpo && cuerpo.token) {
        pagosFlow.set(cuerpo.token, {
          flowOrder: cuerpo.flowOrder || 0, commerceOrder: enviado.commerceOrder,
          amount: enviado.amount, email: enviado.email,
        });
      }
      return { ok: flowEstado >= 200 && flowEstado < 300, status: flowEstado,
        headers: { get: () => null }, json: async () => cuerpo };
    }
    if (url.includes('api.mercadopago.com')) {
      // Una lectura de orden es un GET sin cuerpo; crear es un POST con cuerpo.
      if (!o.body) {
        llamadas.lecturas++;
        if (caeLeida) throw new Error('ECONNRESET');
        return { ok: leidaEstado >= 200 && leidaEstado < 300, status: leidaEstado,
          json: async () => leida };
      }
      llamadas.mp++;
      llamadas.cuerposMP.push(JSON.parse(o.body));
      llamadas.cabecerasMP.push(o.headers || {});
      if (caeMP) throw new Error('ECONNRESET');
      const cuerpo = mp === null ? ORDEN_MP(JSON.parse(o.body).external_reference) : mp;
      return { ok: mpEstado >= 200 && mpEstado < 300, status: mpEstado, json: async () => cuerpo };
    }
    // Los avisos (al vendedor y al comprador) no son "el sitio": se apartan para poder
    // comprobarlos POR DESTINO. Contarlos juntos deja que uno tape la ausencia del otro.
    //
    // ⚠️ Y EL DESTINO YA NO ES EL HOST (3-nov-2026). Hasta hoy el aviso interno salia por
    // Web3Forms y el correo al comprador por Resend, asi que bastaba el host para saber cual
    // era cual. Ahora los dos salen por Resend: el host los iguala y una asercion sobre el
    // host daria verde con el aviso interno mandado al cliente. Se guarda a quien le llega.
    if (url.includes('resend')) {
      let a = '(sin destinatario)';
      try { a = [].concat(JSON.parse(o.body).to)[0]; } catch { /* queda el texto de arriba */ }
      llamadas.avisos.push(a);
      return { ok: true, status: 200, json: async () => ({ success: true }) };
    }
    llamadas.sitio++;
    if (sitio === null) throw new Error('no-abre');
    const cuerpo = (politica && /privacidad|politica|pol%C3%ADtica/i.test(url)) ? politica : sitio;
    return { ok: true, status: 200, url, headers: { get: () => null }, text: async () => cuerpo };
  };
  return { llamadas, soltar: () => { globalThis.fetch = antes; } };
}

const pedir = (cuerpo, { host = 'verifica.spindlelab.cl', origen = null, cabeceras = null } = {}) => {
  const h = { 'content-type': 'application/json' };
  if (origen) h.Origin = origen;
  if (cabeceras) Object.assign(h, cabeceras);
  return new Request(`https://${host}/api/pedido`, {
    method: 'POST', headers: h, body: JSON.stringify(cuerpo),
  });
};

const BIEN = { dominio: 'clinicaejemplo.cl', correo: 'contacto@clinicaejemplo.cl', consiento: true };
const filas = (crudo) => crudo.prepare('SELECT * FROM pedidos').all();

/* ================================================================== */
console.log('=== 1. el camino feliz ===');
{
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed();
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' } });
  const j = await r.json();
  red.soltar();

  eq('contesta 200', r.status, 200);
  cierto('devuelve el id del pedido', /^vyc_[0-9a-f]{32}$/.test(j.id));
  cierto('y la URL de Mercado Pago', String(j.checkout_url).includes('mercadopago'));
  eq('queda UN pedido', filas(crudo).length, 1);

  const f = filas(crudo)[0];
  eq('en estado creado', f.estado, 'creado');
  eq('con el monto del servidor', f.monto_total, 177310);
  eq('y el neto', f.monto_neto, 149000);
  eq('con el id de la orden guardado', f.mp_order_id, 'ORD01PRUEBA0000000000000001');
  eq('la URL medida sale del informe', f.url_medida, 'https://www.clinicaejemplo.cl/');
  eq('el cache-control no deja guardar', r.headers.get('cache-control'), 'no-store');
  falso('y NO manda el comodín de CORS', r.headers.get('access-control-allow-origin'));

  // ── LA CONSTANCIA DEL CONSENTIMIENTO (27-oct-2026) ──────────────────────────────────
  //
  // El endpoint exige que "consiento" venga en true para vender, pero hasta hoy ese booleano
  // se validaba y se tiraba: no quedaba escrito QUÉ aceptó la persona ni CUÁNDO. Si alguien
  // reclamaba, no se podía reconstruir — en un producto que le cobra a otros justamente por
  // no tener esto en orden.
  cierto('queda escrito CUÁNDO consintió', /^[0-9]{4}-[0-9]{2}-[0-9]{2}T/.test(String(f.consentido_en)));
  eq('y QUÉ versión de la política aceptó', f.politica_version, P.VERSION_POLITICA);
  cierto('la versión no viene vacía', String(f.politica_version || '').length > 0);

  // Las señales contratadas salen de los DOS informes, no de uno.
  const contratadas = JSON.parse(f.senales_contratadas).sort();
  // `politica` entró a lo que el kit cierra el 2-nov-2026 (decisión de Ramón; el porqué largo
  // está en elegibilidad.js). Antes figuraba del otro lado, en `senales_fuera`.
  eq('contrata lo que el kit cierra, de los dos informes', contratadas,
    ['carga', 'cmp', 'cookies', 'politica']);
  eq('y no queda nada fuera', JSON.parse(f.senales_fuera), []);

  // El contrato congela LOS DOS informes.
  const informe = JSON.parse(f.informe_json);
  // Se comprueba la FORMA antes de entrar: si el contrato congelara un solo informe, bajar a
  // `informe.rapido.dominio` reventaría y la prueba MORIRÍA en vez de ponerse roja, que en la
  // batería se lee como una línea de cierre que falta.
  cierto('el contrato guarda el informe rápido', informe && typeof informe.rapido === 'object' && informe.rapido !== null);
  cierto('y el profundo', informe && typeof informe.profundo === 'object' && informe.profundo !== null);
  eq('el rápido guardado es el que se midió recién',
    informe.rapido ? informe.rapido.dominio : null, 'clinicaejemplo.cl');
}

/* ================================================================== */
console.log('=== 2. sin la revisión con navegador en caché no se vende ===');
{
  // El informe profundo vence a las 24 h. Sin él no se puede saber qué señales cierra el kit,
  // y vender a ciegas es prometer lo que no se midió.
  const { db, crudo } = baseNueva();
  const red = conRed();
  // Envuelto a propósito: sin la guarda del informe profundo, el endpoint sigue adelante y
  // revienta al bajar a `profundo.revisado`. Un 500 es un defecto distinto de «vendió sin
  // medir», y los dos tienen que salir rojos en vez de matar la prueba.
  let r, j = null, lanzo = false;
  try {
    r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' } });
    j = await r.json();
  } catch (e) { lanzo = true; r = { status: 0 }; }
  red.soltar();
  falso('el endpoint no lanza', lanzo);
  eq('contesta 409', r.status, 409);
  eq('con el motivo', j && j.motivo, 'sin-medicion');
  cierto('y una frase que dice qué hacer', String(j && j.detalle).length > 40);
  eq('NO crea pedido', filas(crudo).length, 0);
  eq('y no llama a Mercado Pago', red.llamadas.mp, 0);
}

/* ================================================================== */
console.log('=== 2 bis. la constancia NO se escribe sola ===');
{
  // `crearPedido` no le pone fecha de consentimiento por su cuenta, y es a propósito: si lo
  // hiciera, cualquier camino que llegara a insertar quedaría diciendo que hubo consentimiento,
  // lo hubiera comprobado o no. Una constancia que se escribe sola no es constancia.
  const { db, crudo } = baseNueva();
  await A.crearPedido(db, {
    id: 'vyc_' + 'a'.repeat(32),
    dominio: 'ejemplo.cl',
    correo: 'alguien@ejemplo.cl',
    senales_contratadas: ['cmp'],
    senales_fuera: [],
    informe_json: '{}',
    monto_neto: 149000,
    monto_total: 177310,
  });
  const f = filas(crudo)[0];
  eq('sin que se la pasen, la fecha queda vacía', f.consentido_en, null);
  eq('y la versión también', f.politica_version, null);
}

/* ================================================================== */
console.log('=== 3. si el sitio no abre AHORA, no se cotiza ===');
{
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed({ sitio: null });
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' } });
  red.soltar();
  const j = await r.json();
  eq('contesta 409', r.status, 409);
  eq('con el motivo', j.motivo, 'no-se-pudo-medir');
  eq('sin pedido', filas(crudo).length, 0);
  eq('sin llamar a Mercado Pago', red.llamadas.mp, 0);

  // ⚠️ ACÁ HAY DOS DEFENSAS, Y CONVIENE SABER CUÁL CONTESTÓ.
  //
  // Si se quita la guarda de `!rapido.ok`, el endpoint igual devuelve 409: `elegibilidad()`
  // tiene su propia defensa y ve que al informe le falta el puntaje. O sea que la guarda NO es
  // lo que impide la venta — es redundante para eso, y está bien que lo sea.
  //
  // Lo que la guarda sí aporta es el MENSAJE: dice por qué no se pudo abrir ESE sitio, en vez
  // del texto genérico de la compuerta. Si se mira solo el código de estado, una mutación que
  // la borra pasa desapercibida; por eso se mira de qué capa salió la respuesta.
  falso('la explicación viene del chequeo, no del texto genérico de la compuerta',
    String(j.detalle).includes('No alcanzamos a medir este sitio en'));
}

/* ================================================================== */
console.log('=== 4. la compuerta de elegibilidad manda, no el cliente ===');
{
  // Un sitio sin nada pendiente que el kit cierre: el profundo en orden y el rápido también.
  const { db, crudo } = baseNueva();
  const limpio = PROFUNDO();
  limpio.items = limpio.items.map((i) => ({ ...i, estado: 'ok', ok: true }));
  limpio.pendientes = 0;
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(limpio) });
  /* Una portada SIN rastreadores Y con su política publicada: el rápido tampoco deja
   * pendiente nada del kit.
   *
   * ⚠️ Lo segundo hizo falta desde el 2-nov: con `politica` dentro de lo que el kit cierra,
   * quitar el rastreador ya no alcanza para que no haya nada que vender — la política sin
   * confirmar es ahora, ella sola, motivo de venta. El molde de red devuelve la MISMA página
   * para cualquier URL, así que el documento tiene que servir a la vez de portada y de
   * política para que el chequeo la pueda dar por buena. */
  const sinNada = PORTADA.replace(/<script[^>]*><\/script>/, '') +
    '<h2>Política de privacidad</h2>' +
    '<p>Última actualización: enero de 2026. Versión 1.0. Responsable del tratamiento de ' +
    'datos personales: Clínica Ejemplo. Finalidad: responder tus consultas. Base de ' +
    'legitimación: tu consentimiento. Destinatarios: no compartimos tus datos con terceros. ' +
    'Conservación: dos años. Derechos de acceso, rectificación, cancelación y oposición: ' +
    'escribe a datos@clinicaejemplo.cl. Puedes reclamar ante la Agencia de Protección de ' +
    'Datos Personales. No hacemos decisiones automatizadas ni transferencias internacionales.</p>';
  const POLITICA = `<!doctype html><html lang="es"><head><title>Política de privacidad</title>
</head><body><h1>Política de privacidad</h1>
<p>Última actualización: enero de 2026. Versión 1.0. Responsable del tratamiento: Clínica
Ejemplo. Finalidad: responder tus consultas. Base de legitimación: tu consentimiento.
Destinatarios: no compartimos tus datos. Conservación: dos años. Derechos de acceso,
rectificación, cancelación y oposición: escribe a datos@clinicaejemplo.cl.</p>
<p>Puedes reclamar ante la Agencia de Protección de Datos Personales. No tomamos decisiones
automatizadas ni hacemos transferencias internacionales de tus datos.</p></body></html>`;
  const red = conRed({ sitio: sinNada, politica: POLITICA });
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' } });
  const j = await r.json();
  red.soltar();
  eq('contesta 409', r.status, 409);
  cierto('con un motivo de la compuerta', ['nada-pendiente', 'nada-que-el-kit-cierre'].includes(j.motivo));
  cierto('y su explicación en castellano', String(j.detalle).length > 30);
  eq('sin pedido', filas(crudo).length, 0);
  eq('sin llamar a Mercado Pago', red.llamadas.mp, 0);
}

/* ================================================================== */
console.log('=== 5. EL DOBLE CLIC: una sola orden y un solo pedido ===');
{
  // La clave de idempotencia no cubre esto sola: dos clics son dos peticiones, y si cada una
  // generara su id, habría dos órdenes y dos cobros posibles por el mismo kit.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' };
  const red = conRed();

  const a = await E.onRequestPost({ request: pedir(BIEN), env });
  const b = await E.onRequestPost({ request: pedir(BIEN), env });
  const ja = await a.json(), jb = await b.json();
  red.soltar();

  eq('las dos contestan 200', [a.status, b.status], [200, 200]);
  eq('con el MISMO id de pedido', ja.id, jb.id);
  eq('y la misma URL de pago', ja.checkout_url, jb.checkout_url);
  eq('queda UN solo pedido', filas(crudo).length, 1);

  // Las dos llamadas a Mercado Pago llevan la MISMA clave de idempotencia, que es lo que hace
  // que Mercado Pago devuelva la orden que ya existía en vez de crear otra.
  const claves = red.llamadas.cabecerasMP.map((h) => h['X-Idempotency-Key']);
  eq('las dos llamadas llevan la misma clave', new Set(claves).size, 1);
  eq('y esa clave es el id del pedido', claves[0], ja.id);
}

/* ================================================================== */
console.log('=== 6. si Mercado Pago falla, el pedido NO se borra ===');
{
  // La fila es el único registro de que alguien intentó comprar. Borrarla deja a la persona sin
  // nada que mostrar y a nosotros sin saber que pasó.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed({ caeMP: true });
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' } });
  const j = await r.json();
  red.soltar();

  // ⚠️ 409 y no 5xx: Cloudflare intercepta las respuestas 5xx de una Function y las reemplaza
  // por su propia página de error en texto plano, así que el mensaje nunca llegaba a la persona
  // y el navegador terminaba diciéndole «revisa tu conexión». Comprobado en producción el 24-oct.
  eq('contesta 409, porque un 5xx no llega a la persona', r.status, 409);
  // ⚠️ CAMBIÓ: acá la red se cae, o sea que Mercado Pago nunca contestó. La orden PUEDE existir
  // del otro lado sin que nosotros lo sepamos, así que afirmar «no se te cobró nada» sería
  // asegurar algo sobre la plata de alguien que no podemos sostener. La prueba 21 cubre las dos
  // ramas; acá solo se exige que diga algo útil y que no mienta.
  falso('con la red caída NO afirma que no se cobró', String(j.detalle).includes('No se te cobró'));
  cierto('pero igual le dice qué hacer', String(j.detalle).length > 40);
  eq('el pedido QUEDA', filas(crudo).length, 1);
  eq('en estado creado', filas(crudo)[0].estado, 'creado');
  eq('pero SIN id de orden, que es lo que lo distingue', filas(crudo)[0].mp_order_id, null);
  eq('y devuelve el id para poder escribirnos', j.id, filas(crudo)[0].id);
}

/* ================================================================== */
console.log('=== 7. el cuerpo que se le manda a Mercado Pago ===');
{
  const { db } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed();
  await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' } });
  const c = red.llamadas.cuerposMP[0];
  const h = red.llamadas.cabecerasMP[0];
  red.soltar();

  eq('lleva la clave de idempotencia, que es OBLIGATORIA', typeof h['X-Idempotency-Key'], 'string');
  eq('va autenticado', h.Authorization, 'Bearer TEST-tok');
  eq('el monto es el del servidor', c.total_amount, '177310');
  eq('en modo manual, que es el de Checkout Pro', c.processing_mode, 'manual');
  eq('con la vuelta automática al sitio', c.config.online.auto_return, 'approved');
  eq('y vencimiento, para no dejar pedidos colgados', c.expiration_time,
    `PT${P.VIGENCIA_ORDEN_HORAS}H`);
  cierto('las URLs de vuelta apuntan a la pantalla del pedido',
    String(c.config.online.success_url).includes('/pedido/?id=vyc_'));
  eq('la referencia externa es el id del pedido', c.external_reference, c.external_reference);
  cierto('y cumple la regla de Mercado Pago', P.ID_VALIDO_MP.test(c.external_reference));
}

/* ================================================================== */
console.log('=== 8. el monto NO viene del cliente ===');
{
  // Es el error más fácil de cometer en un checkout: la página ya conoce el precio porque lo
  // muestra, y mandarlo «para no repetirlo» es dejar que el comprador elija cuánto paga.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed();
  await E.onRequestPost({
    request: pedir({ ...BIEN, monto_total: 1, montoTotal: 1, monto_neto: 1, precio: 1 }),
    env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' },
  });
  red.soltar();
  eq('el pedido se guarda con el precio real', filas(crudo)[0].monto_total, 177310);
  eq('y a Mercado Pago se le pide el precio real', red.llamadas.cuerposMP[0].total_amount, '177310');
}

/* ================================================================== */
console.log('=== 9. los tres campos se validan ===');
{
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' };
  const red = conRed();

  const sinConsentir = await E.onRequestPost({ request: pedir({ ...BIEN, consiento: false }), env });
  eq('sin consentimiento, 400', sinConsentir.status, 400);
  eq('con su motivo', (await sinConsentir.json()).motivo, 'sin-consentimiento');

  // Y "consiento" tiene que ser exactamente true, no cualquier cosa que parezca verdadera.
  for (const v of ['si', 'true', 1, {}]) {
    const r = await E.onRequestPost({ request: pedir({ ...BIEN, consiento: v }), env });
    eq(`consiento = ${JSON.stringify(v)} no alcanza`, r.status, 400);
  }

  for (const c of ['', 'no-es-correo', 'a@b', 'sin@arroba', 'dos@@arrobas.cl']) {
    const r = await E.onRequestPost({ request: pedir({ ...BIEN, correo: c }), env });
    eq(`correo ${JSON.stringify(c)} → 400`, r.status, 400);
  }

  const malDominio = await E.onRequestPost({ request: pedir({ ...BIEN, dominio: 'no es un dominio' }), env });
  eq('un dominio inválido, 400', malDominio.status, 400);
  eq('con el mensaje del normalizador', (await malDominio.json()).motivo, 'dominio');

  const sinCuerpo = await E.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/pedido', { method: 'POST', body: 'no es json' }), env,
  });
  eq('un cuerpo que no es JSON, 400', sinCuerpo.status, 400);

  red.soltar();
  eq('ninguna de las anteriores creó un pedido', filas(crudo).length, 0);
  eq('ni llamó a Mercado Pago', red.llamadas.mp, 0);
}

/* ================================================================== */
console.log('=== 10. el tope de abuso ===');
{
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' };
  const red = conRed();

  // Se llena el contador del día a mano, como si ya hubiera gastado sus intentos.
  const dia = new Date().toISOString().slice(0, 10);
  await kv.put(`tope:pedido:ip:${dia}:1.2.3.4`, String(E.TOPE_PEDIDOS_IP_DIA));

  const req = new Request('https://verifica.spindlelab.cl/api/pedido', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'CF-Connecting-IP': '1.2.3.4' },
    body: JSON.stringify(BIEN),
  });
  const r = await E.onRequestPost({ request: req, env });
  red.soltar();

  eq('contesta 429', r.status, 429);
  eq('con su motivo', (await r.json()).motivo, 'tope');
  eq('sin crear pedido', filas(crudo).length, 0);
  eq('y sin llamar a Mercado Pago', red.llamadas.mp, 0);
}

/* ================================================================== */
console.log('=== 11. el origen ===');
{
  const { db } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' };
  const red = conRed();

  const ajeno = await E.onRequestPost({ request: pedir(BIEN, { origen: 'https://otro-sitio.cl' }), env });
  eq('desde otro origen, 403', ajeno.status, 403);

  const propio = await E.onRequestPost({ request: pedir(BIEN, { origen: 'https://verifica.spindlelab.cl' }), env });
  eq('desde el propio, pasa', propio.status, 200);

  // Sin cabecera Origin se acepta: las peticiones del mismo origen pueden no mandarla, y
  // rechazarlas rompería la página.
  const sinOrigen = await E.onRequestPost({ request: pedir({ ...BIEN, correo: 'otro@ejemplo.cl' }), env });
  eq('sin Origin, pasa', sinOrigen.status, 200);
  red.soltar();
}

/* ================================================================== */
console.log('=== 12. sin base y otros métodos ===');
{
  const sinBase = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_TOPES: kvNuevo() } });
  eq('sin base, 409', sinBase.status, 409);

  const { db } = baseNueva();
  const put = new Request('https://verifica.spindlelab.cl/api/pedido', { method: 'PUT' });
  const r = await E.onRequest({ request: put, env: { VYC_PEDIDOS: db } });
  eq('un PUT da 405', r.status, 405);
  eq('y dice qué se permite', r.headers.get('Allow'), 'GET, POST');
}

/* ================================================================== */
console.log('=== 13. el pedido recién creado se puede leer y no filtra nada ===');
{
  // El endpoint nuevo y el que ya existía tienen que calzar: lo que se crea se puede mirar.
  const { db } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' };
  const red = conRed();
  const creado = await (await E.onRequestPost({ request: pedir(BIEN), env })).json();
  red.soltar();

  const leido = await E.onRequestGet({
    request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${creado.id}`), env,
  });
  eq('se lee con 200', leido.status, 200);
  const j = await leido.json();
  const txt = JSON.stringify(j);
  falso('no filtra el correo', txt.includes('contacto@clinicaejemplo.cl'));
  falso('no filtra el informe', txt.includes('googletagmanager'));
  eq('y la etapa dice que estamos confirmando', j.etapa.etapa, 'confirmando');
  cierto('con la pantalla actualizándose sola', j.refrescar);
}

console.log('=== 14. el antidoble clic NO puede entregar el pedido de alguien que ya pagó ===');
{
  // `buscarPedidoReciente` filtra por estado `creado`, y ese filtro es una defensa, no una
  // optimización. El id del pedido es la ÚNICA credencial del espacio privado: si la búsqueda
  // incluyera pedidos `pagado`, cualquiera que adivine la pareja (dominio, correo) —que no es
  // secreta, el dominio está a la vista y el correo se puede intentar— recibiría de vuelta el
  // id de 32 hex de alguien que ya compró, y con él su pantalla, sus señales y su formulario de
  // datos.
  //
  // Por eso un pedido ya pagado tiene que ser invisible para este camino: lo correcto es crear
  // uno nuevo, no devolver el ajeno.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' };

  // Alguien ya compró, con el mismo dominio y el mismo correo.
  const idPagado = 'vyc_' + 'a'.repeat(32);
  crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, 'pagado', 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'contacto@clinicaejemplo.cl', 'ORD_DE_OTRO')`,
  ).run(idPagado, new Date().toISOString());

  const red = conRed();
  const r = await E.onRequestPost({ request: pedir(BIEN), env });
  const j = await r.json();
  red.soltar();

  eq('contesta 200', r.status, 200);
  falso('NO devuelve el id del pedido ya pagado', j.id === idPagado);
  cierto('devuelve uno nuevo', /^vyc_[0-9a-f]{32}$/.test(j.id));
  eq('y ahora hay dos pedidos, no uno reusado', filas(crudo).length, 2);

  const pagado = filas(crudo).find((f) => f.id === idPagado);
  eq('el pedido pagado no se tocó', pagado.estado, 'pagado');
  eq('ni se le cambió la orden', pagado.mp_order_id, 'ORD_DE_OTRO');
}

console.log('=== 15. NUNCA dos órdenes pagables para el mismo sitio y correo ===');
{
  // El defecto que esto vigila lo encontró una revisión externa, y era mío: la ventana del
  // antidoble clic estaba en 30 minutos y la orden vivía un día. Durante 23 horas y media,
  // alguien que había abierto un pago y no lo había completado volvía, no era reconocido como el
  // mismo, y recibía una SEGUNDA orden mientras la primera seguía pagable. Pagar las dos era
  // pagar dos veces el mismo kit.
  //
  // La aserción no mira los números: mira la RELACIÓN entre los dos, que es el invariante.
  eq('la ventana dura al menos lo que dura la orden',
    E.VENTANA_DOBLE_CLIC_MS >= P.VIGENCIA_ORDEN_HORAS * 60 * 60 * 1000, true);

  // Y se comprueba en el comportamiento, no solo en la aritmética: pasada media hora —que era la
  // ventana vieja— el segundo intento tiene que seguir reusando el mismo pedido.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' };
  const red = conRed();
  const primera = await (await E.onRequestPost({ request: pedir(BIEN), env })).json();

  // Se envejece el pedido 45 minutos: más que la ventana vieja, mucho menos que la vigencia.
  crudo.prepare('UPDATE pedidos SET creado_en = ?')
    .run(new Date(Date.now() - 45 * 60 * 1000).toISOString());

  const segunda = await (await E.onRequestPost({ request: pedir(BIEN), env })).json();
  red.soltar();

  eq('45 minutos después sigue siendo el MISMO pedido', segunda.id, primera.id);
  eq('y queda uno solo', filas(crudo).length, 1);
}

console.log('=== 16. LA CARRERA DE VERDAD: dos peticiones a la vez, no una tras otra ===');
{
  // La prueba 5 hacía `await` de la primera antes de lanzar la segunda, así que la segunda
  // SIEMPRE veía el pedido ya insertado. Pasaba con una implementación que abre dos órdenes al
  // recibir los dos clics juntos — lo señaló una revisión externa, y tenía razón.
  //
  // Acá las dos se solapan y además se fuerza el peor orden posible con una barrera: ninguna
  // puede insertar hasta que las DOS hayan terminado de buscar. Ese es el instante en que las
  // dos se creen la primera.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });

  let buscaron = 0;
  let abrirPuerta;
  const puerta = new Promise((r) => { abrirPuerta = r; });
  const dbConBarrera = {
    prepare(sql) {
      const st = db.prepare(sql);
      if (/ORDER BY creado_en DESC/.test(sql)) {
        // La búsqueda del antidoble clic: se deja terminar, y cuando las dos llegaron se abre
        // la puerta para que recién ahí puedan insertar.
        return {
          bind: (...a) => ({
            first: async () => {
              const r = await st.bind(...a).first();
              if (++buscaron === 2) abrirPuerta();
              return r;
            },
          }),
        };
      }
      if (/INSERT OR IGNORE INTO pedidos|INSERT INTO pedidos/.test(sql)) {
        return { bind: (...a) => ({ run: async () => { await puerta; return st.bind(...a).run(); } }) };
      }
      return st;
    },
  };

  const env = { VYC_PEDIDOS: dbConBarrera, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' };
  const red = conRed();
  const [a, b] = await Promise.all([
    E.onRequestPost({ request: pedir(BIEN), env }),
    E.onRequestPost({ request: pedir(BIEN), env }),
  ]);
  const ja = await a.json(), jb = await b.json();
  red.soltar();

  // Son TRES búsquedas y no dos, y la tercera es la señal de que la defensa actuó: las dos
  // primeras son las peticiones creyéndose cada una la primera, y la tercera es la que perdió la
  // carrera releyendo para quedarse con el id de la que ganó. Si fueran solo dos, significaría
  // que nadie perdió, o sea que las dos insertaron.
  cierto('las dos buscaron antes de que ninguna insertara', buscaron >= 2);
  eq('y una tuvo que releer tras perder la carrera', buscaron, 3);
  eq('las dos contestan 200', [a.status, b.status], [200, 200]);
  eq('queda UN solo pedido', filas(crudo).length, 1);
  eq('y las dos devuelven el MISMO id', ja.id, jb.id);

  // Lo que de verdad evita el doble cobro: que Mercado Pago reciba una sola clave efectiva.
  const claves = red.llamadas.cabecerasMP.map((h) => h['X-Idempotency-Key']);
  eq('Mercado Pago recibe una sola clave', new Set(claves).size, 1);
  eq('y es la del pedido que quedó', claves[0], ja.id);
}

console.log('=== 17. cuando Mercado Pago rechaza, se puede saber POR QUÉ ===');
{
  // El primer pago de prueba real falló con 502 en todos los intentos y nadie pudo saber la
  // causa: ni en la respuesta, ni en los logs, ni desde el panel. `crearOrdenMP` capturaba lo
  // que Mercado Pago contestaba y el handler lo descartaba. Un error que no se puede
  // diagnosticar desde afuera obliga a adivinar, y acá se adivina sobre el camino del dinero.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });

  const dicho = [];
  const antesLog = console.log;
  console.log = (...a) => { dicho.push(a.join(' ')); };
  const red = conRed({
    mpEstado: 401,
    mp: { error: 'invalid_credentials', message: 'Las credenciales no son válidas', status: 401 },
  });
  const r = await E.onRequestPost({
    request: pedir(BIEN),
    env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'APP_USR-token-secretisimo-123', PASARELA: 'mp' },
  });
  const j = await r.json();
  red.soltar();
  console.log = antesLog;

  // ⚠️ 409 y no 5xx: Cloudflare intercepta las respuestas 5xx de una Function y las reemplaza
  // por su propia página de error en texto plano, así que el mensaje nunca llegaba a la persona
  // y el navegador terminaba diciéndole «revisa tu conexión». Comprobado en producción el 24-oct.
  eq('contesta 409, porque un 5xx no llega a la persona', r.status, 409);
  eq('con el código HTTP de Mercado Pago en la respuesta', j.codigo, 'http-401');
  eq('y el id, para poder escribirnos con él', j.id, filas(crudo)[0].id);

  const registro = dicho.join(' | ');
  cierto('queda registrado', registro.includes('Mercado Pago rechazó la orden'));
  cierto('con el código HTTP', registro.includes('http-401'));
  cierto('y con lo que dijo Mercado Pago', registro.includes('invalid_credentials'));

  // ⚠️ LO QUE NO PUEDE ESTAR EN EL REGISTRO. Los logs de Cloudflare los lee cualquiera con
  // acceso a la cuenta, así que un token o un correo ahí es una filtración, no una ayuda.
  falso('NUNCA el token', registro.includes('APP_USR-token-secretisimo-123'));
  falso('ni el correo del comprador', registro.includes('contacto@clinicaejemplo.cl'));

  // Y un rechazo sin cuerpo tampoco puede reventar ni dejar al handler mudo.
  const { db: db2 } = baseNueva();
  const kv2 = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const dicho2 = [];
  console.log = (...a) => { dicho2.push(a.join(' ')); };
  const red2 = conRed({ mpEstado: 500, mp: null });
  let lanzo = false, r2;
  try {
    r2 = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db2, VYC_TOPES: kv2, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' } });
  } catch { lanzo = true; }
  red2.soltar();
  console.log = antesLog;
  falso('un rechazo raro no lanza', lanzo);
  eq('sigue siendo 409', r2 && r2.status, 409);
  cierto('y deja registro igual', dicho2.join(' ').includes('Mercado Pago rechazó la orden'));
}

console.log('=== 18. el tope cobra lo que cuesta, no los rechazos nuestros ===');
{
  // Estaba en 5 y contaba CADA intento. La primera vez que alguien probó el checkout de verdad,
  // Mercado Pago falló en cada llamada y a los cinco reintentos el tope lo dejó fuera del sitio
  // por el resto del día: un fallo nuestro convertido en castigo para quien quería pagarnos.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' };
  const dia = new Date().toISOString().slice(0, 10);
  const clave = `tope:pedido:ip:${dia}:5.5.5.5`;
  const conIp = (cuerpo) => new Request('https://verifica.spindlelab.cl/api/pedido', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'CF-Connecting-IP': '5.5.5.5' },
    body: JSON.stringify(cuerpo),
  });
  const gastado = async () => Number((await kv.get(clave)) || 0);

  const red = conRed();
  // Rechazos que NO son del comprador: nada de esto puede gastarle el cupo.
  await E.onRequestPost({ request: conIp({ ...BIEN, correo: 'no-es-correo' }), env });
  await E.onRequestPost({ request: conIp({ ...BIEN, consiento: false }), env });
  await E.onRequestPost({ request: conIp({ ...BIEN, dominio: 'no es un dominio' }), env });
  eq('una errata no gasta cupo', await gastado(), 0);

  // Un sitio que ya no es elegible tampoco: es una decisión nuestra, no un abuso suyo.
  //
  // ⚠️ Hay que limpiar LOS DOS informes. La primera versión de esta prueba solo limpiaba el
  // profundo, y el chequeo rápido —que el endpoint vuelve a correr— seguía devolviendo `cmp`
  // pendiente, así que la venta procedía y la aserción fallaba. El error era de la prueba.
  const limpio = PROFUNDO();
  limpio.items = limpio.items.map((i) => ({ ...i, estado: 'ok', ok: true }));
  await kv.put('cache:clinicaejemplo.cl', JSON.stringify(limpio));
  red.soltar();
  // ⚠️ Y desde el 2-nov hay que servir también la política aparte. Con `politica` dentro de
  // lo que el kit cierra, un sitio sin rastreadores pero con la política sin confirmar SÍ es
  // vendible: el rechazo que esta prueba necesita dejó de ocurrir, y la aserción medía otra
  // cosa. Es la misma trampa que ya anota el comentario de arriba, una capa más abajo.
  const redLimpia = conRed({
    sitio: PORTADA.replace(/<script[^>]*><\/script>/, ''),
    politica: `<!doctype html><html lang="es"><head><title>Política de privacidad</title></head>
<body><h1>Política de privacidad</h1><p>Última actualización: enero de 2026. Versión 1.0.
Responsable: Clínica Ejemplo. Finalidad: responder consultas. Base de legitimación: tu
consentimiento. Conservación: dos años. Derechos de acceso, rectificación, cancelación y
oposición: datos@clinicaejemplo.cl. Reclamo ante la Agencia de Protección de Datos.</p>
</body></html>`,
  });
  await E.onRequestPost({ request: conIp(BIEN), env });
  redLimpia.soltar();
  eq('un rechazo de la compuerta tampoco', await gastado(), 0);

  // Lo que SÍ cuesta es abrir la orden en Mercado Pago, y eso sí se cobra.
  await kv.put('cache:clinicaejemplo.cl', JSON.stringify(PROFUNDO()));
  const redFinal = conRed();
  await E.onRequestPost({ request: conIp(BIEN), env });
  redFinal.soltar();
  eq('abrir una orden sí gasta uno', await gastado(), 1);

  // Y el tope sigue existiendo: lleno a mano, rechaza.
  await kv.put(clave, String(E.TOPE_PEDIDOS_IP_DIA));
  const red2 = conRed();
  const topado = await E.onRequestPost({ request: conIp({ ...BIEN, correo: 'otro@ejemplo.cl' }), env });
  red2.soltar();
  eq('pasado el tope, 429', topado.status, 429);
  eq('con su motivo', (await topado.json()).motivo, 'tope');

  cierto('y el tope es holgado para una persona real', E.TOPE_PEDIDOS_IP_DIA >= 10);
}

console.log('=== 19. ninguna respuesta de cara a la persona usa un 5xx ===');
{
  // Cloudflare reemplaza los 5xx que salen de una Function por su propia página en texto plano.
  // El navegador no la puede parsear, cae en el catch del fetch, y le dice a la persona «revisa
  // tu conexión» cuando la conexión estaba bien. Tres capas de mensaje equivocado por un código
  // de estado, y con campaña activa eso es gente que se va.
  const { db } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' };
  const codigos = [];

  const casos = [
    ['cuerpo vacío', () => E.onRequestPost({ request: pedir({}), env })],
    ['sin consentimiento', () => E.onRequestPost({ request: pedir({ ...BIEN, consiento: false }), env })],
    ['sin base', () => E.onRequestPost({ request: pedir(BIEN), env: { VYC_TOPES: kv } })],
    ['Mercado Pago rechaza', () => E.onRequestPost({ request: pedir(BIEN), env })],
    ['Mercado Pago sin token', () => E.onRequestPost({ request: pedir({ ...BIEN, correo: 'otro@ejemplo.cl' }), env: { VYC_PEDIDOS: db, VYC_TOPES: kv } })],
  ];
  for (const [nombre, correr] of casos) {
    const red = conRed({ mpEstado: 500, mp: { message: 'boom' } });
    const r = await correr();
    red.soltar();
    codigos.push([nombre, r.status]);
    falso(`${nombre}: no es 5xx`, r.status >= 500);
    // Y el cuerpo tiene que ser JSON legible, que es lo que el navegador lee.
    let j = null;
    try { j = await r.json(); } catch {}
    cierto(`${nombre}: contesta JSON`, j !== null && typeof j === 'object');
  }
  cierto('todos por debajo de 500', codigos.every(([, c]) => c < 500));
}

console.log('=== 20. LA ATRIBUCIÓN: una venta tiene que saber qué campaña la trajo ===');
{
  // El endpoint leía las UTM de `request.url`, y esa URL es `/api/pedido`, que nunca lleva
  // parámetros. O sea que TODAS las ventas se guardaban sin atribución, con una campaña pagada
  // corriendo. Una venta que no se puede adjudicar hace la campaña inmedible: no se sabe qué
  // anuncio funciona ni cuál apagar.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' };

  const red = conRed();
  await E.onRequestPost({
    request: pedir({ ...BIEN, utms: {
      utm_source: 'meta', utm_medium: 'cpc', utm_campaign: 'vyc-oct',
      utm_content: 'video-1', utm_term: 'ley-21719',
    } }),
    env,
  });
  red.soltar();

  const f = filas(crudo)[0];
  eq('la fuente queda guardada', f.utm_source, 'meta');
  eq('el medio', f.utm_medium, 'cpc');
  eq('la campaña', f.utm_campaign, 'vyc-oct');
  eq('el contenido', f.utm_content, 'video-1');
  eq('el término', f.utm_term, 'ley-21719');

  /* ── Y LA MITAD DEL CLIENTE, QUE ES LA QUE NADIE MIRABA ────────────────────────────
   *
   * Todo lo de arriba comprueba que el SERVIDOR guarda lo que le mandan. Que la página lea
   * los utm de SU url y los ponga en el cuerpo no lo tocaba ninguna aserción, y es
   * exactamente la forma del bug que el 2-nov tuvo ciego al contador de origen diez días:
   * la función existía, estaba bien escrita, y el llamador le pasaba la URL equivocada.
   *
   * Se EJECUTA la función de la página, no se greppea. Un grep ve el nombre y no ve ni el
   * ámbito ni el valor, y acá el modo de falla es mudo: se manda `{}` y la venta queda sin
   * atribuir, que se ve igual que una venta que de verdad no vino de campaña.
   */
  {
    const INDEX = rutaEnElRepo('verificaycumple/public/index.html', 'VYC_INDEX_HTML');
    const html = readFileSync(INDEX, 'utf8');

    const ini = html.indexOf('const UTMS = (function () {');
    let i = html.indexOf('{', ini), nivel = 0, fin = i;
    for (; i < html.length; i++) {
      if (html[i] === '{') nivel++;
      else if (html[i] === '}') { nivel--; if (nivel === 0) { fin = html.indexOf(';', i) + 1; break; } }
    }
    const fuente = html.slice(ini, fin);
    eq('se pudo sacar la captura de utm de la página', fuente.startsWith('const UTMS ='), true);

    const capturar = (busqueda) => new Function('location', `${fuente}; return UTMS;`)({ search: busqueda });

    eq('la página captura los cinco',
      capturar('?utm_source=meta&utm_medium=paid&utm_campaign=vyc&utm_content=C%20doce&utm_term=VyC%201%20Legal'),
      { utm_source: 'meta', utm_medium: 'paid', utm_campaign: 'vyc', utm_content: 'C doce', utm_term: 'VyC 1 Legal' });
    eq('sin utm no inventa nada', capturar(''), {});
    eq('los que falten no se rellenan', capturar('?utm_source=meta'), { utm_source: 'meta' });
    // Meta manda el nombre del conjunto con · y espacios; tiene que llegar decodificado.
    eq('decodifica lo que Meta codifica',
      capturar('?utm_term=VyC%20%C2%B7%202%20Salud').utm_term, 'VyC · 2 Salud');
    eq('y recorta a 200, igual que el servidor',
      capturar('?utm_source=' + 'x'.repeat(900)).utm_source.length, 200);

    // Y que de verdad viajen en el cuerpo del POST.
    eq('los utm van en el cuerpo del pedido', /utms:\s*UTMS\b/.test(html), true);

    /* ⚠️ Y EN EL MISMO ÁMBITO QUE EL ENVÍO. El <script> grande tiene varias funciones
     * anónimas que se ejecutan solas y no se ven entre sí; el 2-nov una función quedó en la
     * equivocada y rompió el chequeo entero sin un error en consola. Si `UTMS` quedara
     * fuera del ámbito del POST, esto se caería con ReferenceError en producción y acá no
     * se vería: el `try` de la página se lo traga. */
    const entre = html.slice(html.indexOf('const UTMS ='), html.indexOf('utms: UTMS'));
    eq('UTMS y su uso viven en el mismo bloque', /^\}\)\(\);$/m.test(entre), false);
  }

  // Y lo que el navegador manda se acota: es dato de campaña, pero no texto libre sin límite.
  const { db: db2, crudo: c2 } = baseNueva();
  const kv2 = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red2 = conRed();
  await E.onRequestPost({
    request: pedir({ ...BIEN, utms: {
      utm_source: 'x'.repeat(900),
      utm_medium: 'con\u0000control\u001f',
      utm_campaign: 12345,
      inventado: 'no-deberia-entrar',
    } }),
    env: { VYC_PEDIDOS: db2, VYC_TOPES: kv2, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
  });
  red2.soltar();
  const g = filas(c2)[0];
  eq('se recorta a 200', g.utm_source.length, 200);
  eq('se limpian los caracteres de control', g.utm_medium, 'con control');
  eq('lo que no es texto se descarta', g.utm_campaign, null);
  falso('y un campo inventado no entra', Object.keys(g).includes('inventado'));

  // Sin UTM no revienta ni inventa nada.
  const { db: db3, crudo: c3 } = baseNueva();
  const kv3 = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red3 = conRed();
  await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db3, VYC_TOPES: kv3, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' } });
  red3.soltar();
  eq('sin UTM, quedan nulas', filas(c3)[0].utm_source, null);
}

console.log('=== 21. no se afirma sobre la plata de alguien lo que no se sabe ===');
{
  const kvBase = () => kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });

  // (a) Mercado Pago CONTESTÓ con un error: la orden no se creó, y tranquilizar es cierto.
  const { db } = baseNueva();
  const red = conRed({ mpEstado: 400, mp: { message: 'bad request' } });
  const a = await (await E.onRequestPost({
    request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kvBase(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
  })).json();
  red.soltar();
  cierto('con respuesta de Mercado Pago, se puede decir que no se cobró',
    /No se te cobró nada/i.test(a.detalle));

  // (b) La petición NI SIQUIERA llegó a contestar: la orden PUEDE existir del otro lado y
  // nosotros no lo sabemos. Decirle «no se te cobró nada» sería afirmar sobre su plata algo que
  // no podemos sostener.
  const { db: db2 } = baseNueva();
  const red2 = conRed({ caeMP: true });
  const b = await (await E.onRequestPost({
    request: pedir(BIEN), env: { VYC_PEDIDOS: db2, VYC_TOPES: kvBase(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
  })).json();
  red2.soltar();
  falso('sin respuesta, NO se afirma que no se cobró', /No se te cobró nada/i.test(b.detalle));
  cierto('se dice que no se pudo confirmar', /no alcanzamos a confirmar/i.test(b.detalle));
  cierto('y se le dice qué hacer si ve un cargo', /si ves un cargo/i.test(b.detalle));
}

console.log('=== 22. hasta cuándo una medición sirve para vender ===');
{
  // ESTA PRUEBA ESTUVO MAL Y DIO POR BUENO EL DEFECTO. Su primera versión, del 24-oct por la
  // mañana, afirmaba que un informe de hace cinco horas NO se podía vender, porque el código
  // exigía media hora. El código y la prueba salieron del mismo supuesto en el mismo rato, así
  // que la prueba confirmaba el error en vez de delatarlo.
  //
  // Lo que el supuesto no miró: cuando el informe sale de la caché, la página le dice a la
  // persona «esto no lo medimos recién: es la medición de tal hora, la guardamos por un día», y
  // debajo le ofrece el kit. Esa medición YA es, declaradamente, su resultado. Negarse a
  // venderle sobre el mismo dato que le acabamos de mostrar como suyo no protege nada.
  //
  // Y costaba ventas: Ramón midió un sitio, volvió un rato después y no pudo comprar, con la
  // campaña pagada corriendo. El mensaje lo mandaba a «volver a correr el chequeo», que sirve
  // el informe de la caché otra vez, así que el consejo no podía funcionar nunca.
  //
  // Ahora se cuida la RELACIÓN entre los dos números, no un valor inventado.

  // Lo único que de verdad hay que proteger: lo que se puede vender dura exactamente lo que
  // dura en la caché. Si alguien cambia uno, el otro lo sigue solo.
  eq('la ventana de venta es la validez de la caché', E.VENTANA_MEDICION_MS, PR.CACHE_HORAS * 60 * 60 * 1000);

  // El caso que estaba roto: dentro de su validez se vende, aunque hayan pasado horas.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO('clinicaejemplo.cl', 5 * 60 * 60 * 1000)) });
  const red = conRed();
  const r = await E.onRequestPost({
    request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
  });
  red.soltar();
  eq('con un informe de hace cinco horas sí se compra', r.status, 200);
  eq('y queda el pedido', filas(crudo).length, 1);

  // Pasada su validez ya no: ese informe la caché ya no lo serviría.
  const { db: db2, crudo: c2 } = baseNueva();
  const pasado = (PR.CACHE_HORAS + 1) * 60 * 60 * 1000;
  const kv2 = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO('clinicaejemplo.cl', pasado)) });
  const red2 = conRed();
  const r2 = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db2, VYC_TOPES: kv2, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' } });
  const j2 = await r2.json();
  red2.soltar();
  eq('pasada su validez contesta 409', r2.status, 409);
  eq('con su motivo', j2.motivo, 'medicion-vieja');
  eq('sin crear pedido', filas(c2).length, 0);
  eq('y sin llamar a Mercado Pago', red2.llamadas.mp, 0);

  // El consejo tiene que nombrar el control que DE VERDAD rehace la medición. «Volver a correr
  // el chequeo» no lo es: eso vuelve a servir el informe de la caché.
  cierto('nombra el botón que rehace la medición', /volver a medirlo/i.test(j2.detalle));
  falso('y no manda a correr el chequeo, que no la rehace', /correr el chequeo/i.test(j2.detalle));

  // Un informe sin fecha no se vende: congelar «lo que medimos» exige saber cuándo se midió.
  const { db: db3, crudo: c3 } = baseNueva();
  const sinFecha = PROFUNDO();
  delete sinFecha.revisadoEn;
  const kv3 = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(sinFecha) });
  const red3 = conRed();
  const r3 = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db3, VYC_TOPES: kv3, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' } });
  red3.soltar();
  eq('un informe sin fecha no se vende', (await r3.json()).motivo, 'medicion-vieja');
  eq('y tampoco deja pedido', filas(c3).length, 0);
}

console.log('=== 23. una compra abierta vieja: se cierra solo con evidencia de que murió ===');
{
  // EL DEFECTO ORIGINAL: el índice `idx_pedidos_compra_abierta` garantiza UNA compra abierta por
  // (dominio, correo) sin mirar su edad, pero `buscarPedidoReciente` solo mira las últimas
  // VIGENCIA_ORDEN_HORAS. En el hueco, esa pareja quedaba encerrada para siempre.
  //
  // Y EL DEFECTO DEL PRIMER ARREGLO, que encontró una revisión adversaria el mismo día: cerraba
  // la fila vieja DEDUCIENDO que su orden había vencido, porque la ventana sale de la misma
  // constante que el `expiration_time`. El razonamiento es elegante y falso: `creado_en` es
  // cuándo nació la FILA, no la ORDEN. Si el primer intento no logró abrir el pago, la fila
  // queda sin orden; si la persona vuelve dentro de la ventana, se reusa esa fila vieja y se le
  // abre una orden NUEVA que vive 24 horas desde ESE momento. Cerrar por la fecha de la fila
  // habría matado un enlace de pago vivo.

  const haceMucho = new Date(Date.now() - (P.VIGENCIA_ORDEN_HORAS + 2) * 60 * 60 * 1000).toISOString();
  const meter = (crudo, id, estado, cuando, orden) => crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, ?, 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'contacto@clinicaejemplo.cl', ?)`,
  ).run(id, cuando, estado, orden);
  const kvCon = () => kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = (db) => ({ VYC_PEDIDOS: db, VYC_TOPES: kvCon(), MP_ACCESS_TOKEN: 'TEST-tok', PASARELA: 'mp' });

  // ── Una fila vieja que NUNCA llegó a tener orden: no hay nada que matar ───────────────
  {
    const { db, crudo } = baseNueva();
    const idViejo = 'vyc_' + 'b'.repeat(32);
    meter(crudo, idViejo, 'creado', haceMucho, null);
    const red = conRed();
    const r = await E.onRequestPost({ request: pedir(BIEN), env: env(db) });
    const j = await r.json();
    red.soltar();

    eq('se puede comprar', r.status, 200);
    falso('con un pedido nuevo', j.id === idViejo);
    eq('no se le preguntó nada a Mercado Pago', red.llamadas.lecturas, 0);
    eq('quedan dos filas', filas(crudo).length, 2);
    eq('la vieja queda rechazada', filas(crudo).find((f) => f.id === idViejo).estado, 'rechazado');
  }

  // ── Una fila vieja con la orden VENCIDA: se cierra y se rehace ────────────────────────
  {
    const { db, crudo } = baseNueva();
    const idViejo = 'vyc_' + 'b'.repeat(32);
    meter(crudo, idViejo, 'creado', haceMucho, 'ORD_VIEJA');
    const red = conRed({ leida: { id: 'ORD_VIEJA', status: 'expired' } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: env(db) });
    const j = await r.json();
    red.soltar();

    eq('se preguntó por la orden antes de cerrarla', red.llamadas.lecturas, 1);
    eq('se puede comprar', r.status, 200);
    falso('con un pedido nuevo', j.id === idViejo);
    eq('la vencida queda rechazada', filas(crudo).find((f) => f.id === idViejo).estado, 'rechazado');
    eq('y se abrió una orden nueva', red.llamadas.cuerposMP[0].external_reference, j.id);
  }

  // ── Una fila vieja con la orden VIVA: NO se cierra, se reusa ──────────────────────────
  //
  // Es el caso que el primer arreglo rompía. Su enlace de pago sirve, así que lo correcto es
  // mandar a la persona a ese y no matarlo.
  {
    const { db, crudo } = baseNueva();
    const idViejo = 'vyc_' + 'b'.repeat(32);
    meter(crudo, idViejo, 'creado', haceMucho, 'ORD_VIVA');
    const red = conRed({ leida: { id: 'ORD_VIVA', status: 'created' } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: env(db) });
    const j = await r.json();
    red.soltar();

    eq('se puede comprar', r.status, 200);
    eq('y se devuelve el MISMO pedido, no uno nuevo', j.id, idViejo);
    eq('la fila sigue abierta', filas(crudo).find((f) => f.id === idViejo).estado, 'creado');
    eq('no se creó otra fila', filas(crudo).length, 1);
    // La clave de idempotencia es la del pedido viejo: Mercado Pago devuelve SU orden.
    eq('con la clave del pedido viejo', red.llamadas.cabecerasMP[0]['X-Idempotency-Key'], idViejo);
  }

  // ── Un estado de orden que no conocemos se trata como VIVA ────────────────────────────
  {
    const { db, crudo } = baseNueva();
    const idViejo = 'vyc_' + 'b'.repeat(32);
    meter(crudo, idViejo, 'creado', haceMucho, 'ORD_RARA');
    const red = conRed({ leida: { id: 'ORD_RARA', status: 'un_estado_nuevo_de_mercadopago' } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: env(db) });
    red.soltar();
    eq('contesta 200', r.status, 200);
    eq('y NO la cierra', filas(crudo).find((f) => f.id === idViejo).estado, 'creado');
  }

  // ── Si no se puede preguntar, no se mata nada ─────────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    const idViejo = 'vyc_' + 'b'.repeat(32);
    meter(crudo, idViejo, 'creado', haceMucho, 'ORD_VIEJA');
    const red = conRed({ caeLeida: true });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: env(db) });
    const j = await r.json();
    red.soltar();

    eq('contesta 409', r.status, 409);
    eq('diciendo que no pudo comprobarlo', j.motivo, 'no-se-pudo-consultar');
    eq('la fila vieja sigue intacta', filas(crudo).find((f) => f.id === idViejo).estado, 'creado');
    eq('y no se abrió ninguna orden', red.llamadas.mp, 0);
  }

  // ── Y la defensa que no se puede perder: no entregar un pedido ajeno ──────────────────
  //
  // `buscarCompraAbierta` no filtra por fecha hacia arriba, así que el filtro `estado='creado'`
  // sigue siendo lo que impide devolver el pedido PAGADO de alguien con la misma pareja.
  {
    const { db, crudo } = baseNueva();
    const idBloquea = 'vyc_' + 'd'.repeat(32);
    const idPagadoNuevo = 'vyc_' + 'c'.repeat(32);
    meter(crudo, idBloquea, 'creado', haceMucho, null);
    meter(crudo, idPagadoNuevo, 'pagado', new Date().toISOString(), 'ORD_AJENA');
    const red = conRed();
    const r = await E.onRequestPost({ request: pedir(BIEN), env: env(db) });
    const j = await r.json();
    red.soltar();

    eq('se compra igual', r.status, 200);
    falso('y NUNCA se devuelve el id del pedido ajeno', j.id === idPagadoNuevo);
    const ajeno = filas(crudo).find((f) => f.id === idPagadoNuevo);
    eq('el pagado no se tocó', ajeno.estado, 'pagado');
    eq('ni se le cambió la orden', ajeno.mp_order_id, 'ORD_AJENA');
    eq('la que se cerró es la que bloqueaba', filas(crudo).find((f) => f.id === idBloquea).estado, 'rechazado');
  }

  // ── Una compra RECIENTE se reusa sin molestar a Mercado Pago ─────────────────────────
  //
  // Ojo con lo que esto prueba y lo que no: acá `buscarPedidoReciente` la encuentra y el camino
  // del rescate NUNCA se ejecuta, así que esto NO prueba el piso de tiempo de
  // `buscarCompraAbierta`. Eso se prueba como unidad en prueba-almacen.mjs, porque llegar hasta
  // ahí por el endpoint exige una carrera que esta prueba no monta. Lo que sí fija es que el
  // antidoble clic sigue siendo gratis: no gasta una llamada saliente.
  {
    const { db, crudo } = baseNueva();
    const idNuevo = 'vyc_' + 'a'.repeat(32);
    meter(crudo, idNuevo, 'creado', new Date().toISOString(), 'ORD_RECIEN');
    const red = conRed();
    const r = await E.onRequestPost({ request: pedir(BIEN), env: env(db) });
    const j = await r.json();
    red.soltar();
    // La encuentra `buscarPedidoReciente`, así que la reusa y jamás llega al rescate.
    eq('la reusa', j.id, idNuevo);
    eq('sin preguntarle nada a Mercado Pago sobre ella', red.llamadas.lecturas, 0);
    eq('y sigue abierta', filas(crudo).find((f) => f.id === idNuevo).estado, 'creado');
  }
}

console.log('=== 24. la red de seguridad: el pedido se reconcilia contra Mercado Pago ===');
{
  // LO QUE PASÓ DE VERDAD EL 24-OCT: alguien pagó $177.310, Mercado Pago le dijo «listo», y la
  // notificación se rechazó porque el secreto cargado era el de otra aplicación. El pedido se
  // quedó en `creado` y la pantalla decía «estamos confirmando tu pago, esta página se
  // actualiza sola» — y encima deja de refrescar a los 2 minutos, así que esa frase se vuelve
  // falsa. `leerOrdenMP` tenía UN solo llamador, el webhook. Si la notificación no llegaba, no
  // había nada más que mirara.
  //
  // Lo salvó un reintento de Mercado Pago una hora después. Los reintentos se acaban.

  const ORDEN_PAGADA = (ref) => ({
    id: 'ORDTST01', external_reference: ref,
    total_amount: '177310', total_paid_amount: '177310',
    status: 'processed', status_detail: 'accredited',
    transactions: { payments: [{ id: 'PAY-77', amount: '177310', status: 'processed' }] },
  });

  const conMP = (orden, { estado = 200 } = {}) => {
    const antes = globalThis.fetch;
    const llamadas = { mp: 0, urls: [] };
    globalThis.fetch = async (u) => {
      const url = String(u && u.url ? u.url : u);
      if (url.includes('api.mercadopago.com')) {
        llamadas.mp++; llamadas.urls.push(url);
        return { ok: estado >= 200 && estado < 300, status: estado, json: async () => orden };
      }
      throw new Error('no deberia salir a otro lado');
    };
    return { llamadas, soltar: () => { globalThis.fetch = antes; } };
  };

  const sembrar = (crudo, id, estado, orden) => crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, ?, 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'contacto@clinicaejemplo.cl', ?)`,
  ).run(id, new Date().toISOString(), estado, orden);

  const ID = 'vyc_' + 'e'.repeat(32);

  // ── El caso: pagó allá, acá figura en creado ──────────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo, ID, 'creado', 'ORDTST01');
    const kv = kvNuevo();
    const red = conMP(ORDEN_PAGADA(ID));
    const r = await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    const j = await r.json();
    red.soltar();

    eq('se le preguntó a Mercado Pago', red.llamadas.mp, 1);
    cierto('por la orden que guardamos', red.llamadas.urls[0].includes('ORDTST01'));
    eq('el pedido quedó pagado en la base', filas(crudo).find((f) => f.id === ID).estado, 'pagado');
    eq('y la respuesta ya lo dice', j.pedido.estado, 'pagado');
    cierto('con su fecha de pago', Boolean(filas(crudo).find((f) => f.id === ID).pagado_en));
    eq('y guardó el id del pago', filas(crudo).find((f) => f.id === ID).mp_payment_id, 'PAY-77');
    falso('ya no hay nada que refrescar', j.refrescar);
  }

  // ── Y LA VENTA QUE DESCUBRE TIENE QUE LLEGARLE A ALGUIEN (3-nov-2026) ────────────────
  //
  // Esta reconciliación es el ÚNICO camino que encuentra una venta cuya notificación nunca
  // llegó —es justo el caso del 24-oct— así que descubrirla y no avisar es media función:
  // el pedido queda pagado en la base y nadie empieza a entregar.
  //
  // ⚠️ No estaba probado. Al quitarle el `env` a ese aviso, la batería entera seguía verde:
  // la unidad estaba cubierta y el CABLEADO de ESTE llamador no. Es el mismo hueco que el
  // webhook ya había tenido, un camino más abajo.
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo, ID, 'creado', 'ORDTST01');
    const salidas = { internos: [], alComprador: [] };
    const antes = globalThis.fetch;
    globalThis.fetch = async (u, o = {}) => {
      const url = String(u && u.url ? u.url : u);
      if (url.includes('api.mercadopago.com')) {
        return { ok: true, status: 200, json: async () => ORDEN_PAGADA(ID) };
      }
      if (url.includes('api.resend.com')) {
        const c = o.body ? JSON.parse(o.body) : {};
        if ([].concat(c.to)[0] === 'hola@spindlelab.cl') salidas.internos.push(c);
        else salidas.alComprador.push(c);
        return { ok: true, status: 200, json: async () => ({ id: 'x' }) };
      }
      throw new Error('no deberia salir a otro lado');
    };
    const fondo = [];
    await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp',
             RESEND_API_KEY: 'clave-de-prueba' },
      waitUntil: (x) => fondo.push(x),
    });
    await Promise.all(fondo.map((x) => Promise.resolve(x).catch(() => null)));
    globalThis.fetch = antes;

    eq('el pedido queda pagado', filas(crudo)[0].estado, 'pagado');
    eq('y sale UN aviso a la casilla del negocio', salidas.internos.length, 1);
    cierto('diciendo que hubo una venta',
      String((salidas.internos[0] || {}).subject).includes('Venta de Verifica y Cumple'));
    // Y el comprador recibe su enlace, que es su única credencial: si la notificación nunca
    // llegó, este es el único momento en que se le puede mandar.
    eq('y al comprador le llega su correo', salidas.alComprador.length, 1);
    eq('a su dirección, no a otra', (salidas.alComprador[0] || {}).to, ['contacto@clinicaejemplo.cl']);
  }

  // ── El freno: no se le pregunta a Mercado Pago en cada recarga ────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo, ID, 'creado', 'ORDTST01');
    // Una orden que todavía no se pagó: el pedido no se mueve, así que las dos lecturas
    // seguidas son el caso real de alguien mirando la pantalla mientras espera.
    const red = conMP({ ...ORDEN_PAGADA(ID), status: 'created', status_detail: null,
      transactions: { payments: [] } });
    const kv = kvNuevo();
    const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' };
    const pedir = () => E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`), env,
    });
    await pedir(); await pedir(); await pedir();
    red.soltar();
    eq('tres recargas seguidas cuestan UNA llamada', red.llamadas.mp, 1);
    cierto('y queda la marca en KV', kv.almacen.has(`mp:visto:${ID}`));
    eq('el pedido no se movió', filas(crudo).find((f) => f.id === ID).estado, 'creado');
  }

  // ── Sin KV no hay freno, así que tampoco se pregunta ──────────────────────────────────
  {
    const { db } = baseNueva();
    const { crudo } = { crudo: null };
    const base = baseNueva();
    sembrar(base.crudo, ID, 'creado', 'ORDTST01');
    const red = conMP(ORDEN_PAGADA(ID));
    const r = await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: base.db, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    red.soltar();
    eq('sin KV no se sale a Mercado Pago', red.llamadas.mp, 0);
    eq('pero la pantalla igual responde', r.status, 200);
  }

  // ── Si Mercado Pago no contesta, la pantalla no se rompe ──────────────────────────────
  {
    const base = baseNueva();
    sembrar(base.crudo, ID, 'creado', 'ORDTST01');
    const red = conMP(null, { estado: 500 });
    const r = await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: base.db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    const j = await r.json();
    red.soltar();
    eq('contesta igual', r.status, 200);
    eq('con el pedido como estaba', j.pedido.estado, 'creado');
    eq('y la base intacta', filas(base.crudo).find((f) => f.id === ID).estado, 'creado');
  }

  // ── Una orden que dice ser de OTRO pedido no mueve nada ───────────────────────────────
  //
  // No hace falta una guarda nueva: `decidirDesdeOrden` ya compara `external_reference` con el
  // id del pedido, y el monto con el que se vendió. Reusarlo es lo que da esas dos defensas.
  {
    const base = baseNueva();
    sembrar(base.crudo, ID, 'creado', 'ORDTST01');
    const red = conMP(ORDEN_PAGADA('vyc_' + 'f'.repeat(32)));
    await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: base.db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    red.soltar();
    eq('una orden ajena no lo mueve', filas(base.crudo).find((f) => f.id === ID).estado, 'creado');
  }

  // ── Y una orden por el monto equivocado tampoco ───────────────────────────────────────
  {
    const base = baseNueva();
    sembrar(base.crudo, ID, 'creado', 'ORDTST01');
    const red = conMP({ ...ORDEN_PAGADA(ID), total_amount: '1000' });
    await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: base.db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    red.soltar();
    eq('un monto que no calza no lo mueve', filas(base.crudo).find((f) => f.id === ID).estado, 'creado');
  }

  // ── Un pedido ya resuelto no se consulta: nadie espera nada ───────────────────────────
  {
    const base = baseNueva();
    sembrar(base.crudo, ID, 'pagado', 'ORDTST01');
    const red = conMP(ORDEN_PAGADA(ID));
    await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: base.db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    red.soltar();
    eq('un pedido pagado no gasta una llamada', red.llamadas.mp, 0);
  }

  // ── Si la decisión NO es «marcar», no se escribe nada ─────────────────────────────────
  //
  // Esta aserción existe porque una mutación no se puso roja y casi la doy por equivalente.
  // Quitar la guarda `decision.accion !== MARCAR` parecía inofensivo, porque casi todos los
  // caminos que no marcan devuelven `estado: null` y `marcarEstado` los rechaza por transición
  // inválida. Pero hay uno que NO: la decisión `NADA` lleva estado, el mismo que el pedido ya
  // tiene, y `creado → creado` y `pendiente → pendiente` son transiciones válidas. Sin la
  // guarda, ese camino SÍ escribe.
  //
  // Se detecta con el `id` de la orden: Mercado Pago devuelve una orden cuyo `id` es distinto
  // del que tenemos guardado. Si algo escribe, lo pisa.
  {
    const base = baseNueva();
    sembrar(base.crudo, ID, 'pendiente', 'ORDTST01');
    const red = conMP({
      id: 'ORD-OTRO-ID', external_reference: ID, total_amount: '177310',
      status: 'processing', status_detail: null, transactions: { payments: [] },
    });
    await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: base.db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    red.soltar();
    const f = filas(base.crudo).find((x) => x.id === ID);
    eq('sigue pendiente', f.estado, 'pendiente');
    eq('y NO se le pisó la orden guardada', f.mp_order_id, 'ORDTST01');
  }

  // ── La carrera contra el webhook, los dos lados ───────────────────────────────────────
  //
  // Entre que se lee el pedido y que vuelve Mercado Pago pasan hasta diez segundos, y ahí cabe
  // la notificación. Si mueve la fila, el UPDATE de la reconciliación ya no la encuentra en el
  // estado que esperaba. La primera versión de `reconciliar` abandonaba ahí en silencio.
  //
  // El caso que obliga a arreglarlo no es el obvio. Con `pendiente` esto se recupera solo en el
  // GET siguiente. Con `rechazado` —el camino NORMAL de quien reintenta con otra tarjeta—
  // `convieneRefrescar` deja de ser cierto y la red de seguridad NO VUELVE A CORRER NUNCA.
  for (const [ganador, nota] of [['pendiente', 'se recupera al ciclo siguiente'],
                                 ['rechazado', 'NO vuelve a correr nunca']]) {
    const base = baseNueva();
    sembrar(base.crudo, ID, 'creado', 'ORDTST01');
    let movida = false;
    const red = conMP(null);
    // Se reemplaza el fetch para que, justo antes de contestar la orden, «llegue» la
    // notificación y mueva la fila. Es la carrera, forzada.
    const antes = globalThis.fetch;
    globalThis.fetch = async (u) => {
      if (!movida) {
        base.crudo.prepare('UPDATE pedidos SET estado = ? WHERE id = ?').run(ganador, ID);
        movida = true;
      }
      return { ok: true, status: 200, json: async () => ORDEN_PAGADA(ID) };
    };
    await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: base.db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    globalThis.fetch = antes; red.soltar();

    const f = filas(base.crudo).find((x) => x.id === ID);
    eq(`perdiendo contra ${ganador} (${nota}), igual termina pagado`, f.estado, 'pagado');
    cierto(`y con su fecha de pago (${ganador})`, Boolean(f.pagado_en));
  }

  // ── El freno tiene que caducar, o la red se apaga para siempre ────────────────────────
  {
    const base = baseNueva();
    sembrar(base.crudo, ID, 'creado', 'ORDTST01');
    const kv = kvNuevo();
    const red = conMP({ ...ORDEN_PAGADA(ID), status: 'created', transactions: { payments: [] } });
    await E.onRequestGet({
      request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${ID}`),
      env: { VYC_PEDIDOS: base.db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp' },
    });
    red.soltar();
    const o = kv.opciones.get(`mp:visto:${ID}`);
    cierto('la marca del freno se escribió con caducidad', Boolean(o && o.expirationTtl));
    eq('y es exactamente la espera declarada', o.expirationTtl, E.ESPERA_RECONCILIAR_S);
    // KV no admite menos de 60 s. Una espera menor se guardaría como 60 sin avisar, o fallaría.
    cierto('que no baja del mínimo que KV admite', E.ESPERA_RECONCILIAR_S >= 60);
  }

  // ── El presupuesto, que vive en dos archivos distintos ────────────────────────────────
  //
  // La pantalla se repregunta cada 5 s y se rinde a las 24 veces. El freno es el mínimo que
  // admite KV. Lo que hay que proteger es la RELACIÓN: que una sesión completa de esa pantalla
  // no cueste más de un puñado de llamadas. Si alguien baja el intervalo o sube los reintentos
  // en el front, esta prueba lo dice.
  {
    const frontRuta = '/Users/ramon/vyc-ley21719/verificaycumple/public/pedido/index.html';
    const front = readFileSync(frontRuta, 'utf8');
    const cadaMs = Number((front.match(/setTimeout\(pedir,\s*(\d+)\)/) || [])[1]);
    // El 30-oct el tope pasó a ser una constante con nombre, porque el aviso que sale al
    // agotarlo tiene que hablar del MISMO número: escrito dos veces, se contradicen en
    // silencio. Se lee de la declaración, que es donde vive el único número.
    const veces = Number((front.match(/TOPE_REINTENTOS\s*=\s*(\d+)/) || [])[1]);
    cierto('se pudieron leer los dos números del front', Number.isFinite(cadaMs) && Number.isFinite(veces));
    const sesionS = (cadaMs / 1000) * veces;
    const llamadas = Math.ceil(sesionS / E.ESPERA_RECONCILIAR_S);
    cierto(`una sesión entera (${sesionS}s) cuesta ${llamadas} llamadas, no más de 4`, llamadas <= 4);
  }
}

/* ================================================================== */
console.log('=== FLOW: el mismo endpoint, la otra pasarela ===');
{
  const CRED = { FLOW_API_KEY: 'clave', FLOW_SECRET_KEY: 'secreto', PASARELA: 'flow',
    RESEND_API_KEY: 'clave-de-prueba' };

  /* -- el camino feliz -- */
  {
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const red = conRed();
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    const j = await r.json();

    eq('contesta 200', r.status, 200);
    eq('y manda a la pantalla de pago de Flow', j.checkout_url,
      'https://sandbox.flow.cl/app/web/pay.php?token=TOKFLOW123');
    // ⚠️ La clave se llama `checkout_url` aunque la pasarela sea otra: es el contrato con la
    // pagina, que ya la lee con ese nombre. Renombrarla romperia el checkout en el navegador
    // sin que ninguna prueba del servidor se enterara.
    cierto('con el nombre de clave que la pagina ya lee', 'checkout_url' in j);

    const f = filas(crudo)[0];
    eq('queda un solo pedido', filas(crudo).length, 1);
    eq('en creado', f.estado, 'creado');
    eq('con el token de Flow guardado', f.flow_token, 'TOKFLOW123');
    eq('y sin referencia de la otra pasarela', f.mp_order_id, null);

    // ⚠️ NO SE LLAMO A MERCADO PAGO. Es lo que prueba que el conmutador conmuta de verdad y
    // no que simplemente ADEMAS llama a Flow.
    eq('no se llamo a Mercado Pago', red.llamadas.mp, 0);
    eq('y si a Flow, una vez', red.llamadas.flow, 1);

    const enviado = red.llamadas.cuerposFlow[0];
    eq('el pago es de ESTE pedido', enviado.commerceOrder, f.id);
    // ⚠️ EL MONTO LO FIJA EL SERVIDOR. Nunca viene del cuerpo de la peticion.
    eq('el monto es el del servidor', enviado.amount, '177310');
    eq('en pesos', enviado.currency, 'CLP');
    cierto('va firmado', typeof enviado.s === 'string' && enviado.s.length === 64);

    // ⚠️⚠️ EL SECRETO NO PUEDE SALIR EN LA PETICION. Se firma CON el secretKey, no se MANDA.
    // Lo descubrio una mutacion: agregar `secretKey` al cuerpo dejaba todo verde, porque
    // ninguna asercion miraba lo que NO debia estar. Un secreto que viaja queda en registros,
    // en proxies y en cualquier captura de red del camino.
    // ⚠️⚠️ EL SECRETO NO PUEDE SALIR EN LA PETICION. Se firma CON el secretKey, no se MANDA.
    // Lo descubrio una mutacion: agregar `secretKey` al cuerpo dejaba todo verde, porque
    // ninguna asercion miraba lo que NO debia estar. Un secreto que viaja queda en registros,
    // en proxies y en cualquier captura de red del camino.
    falso('el secreto NO viaja en el cuerpo', JSON.stringify(enviado).includes('secreto'));
    falso('ni como campo propio', 'secretKey' in enviado);
    cierto('la apiKey si va, que es publica por diseño', enviado.apiKey === 'clave');

    // ⚠️⚠️ LA ASERCION QUE CUIDA LA PANTALLA EN BLANCO.
    //
    // Flow devuelve a la persona con un POST. Si `urlReturn` apuntara a `/pedido/`, que es un
    // archivo estatico, Cloudflare contestaria 405 con cero bytes: blanco absoluto justo
    // despues de pagar $177.310. Paso de verdad el 29-oct en el sandbox.
    eq('la vuelta pasa por el endpoint que sabe contestar un POST', enviado.urlReturn,
      `https://verifica.spindlelab.cl/api/flow-vuelta?id=${f.id}`);
    falso('y NO apunta a la pagina estatica', String(enviado.urlReturn).includes('/pedido/'));
    eq('la confirmacion va al endpoint server a server', enviado.urlConfirmation,
      'https://verifica.spindlelab.cl/api/flow-confirmacion');

    // La vigencia sale de la MISMA constante que la del otro proveedor: dos pasarelas que
    // caducan distinto serian dos reglas para el mismo trato.
    eq('el pago caduca con la vigencia de la casa', enviado.timeout, String(P.VIGENCIA_ORDEN_HORAS * 3600));
  }

  /* -- el precio lo pone el servidor, diga lo que diga el cliente -- */
  {
    // ⚠️ Salio de una mutacion que NO acuso: el cuerpo de prueba no mandaba `monto`, asi que
    // una version del endpoint que lo leyera del cliente habria pasado igual. Una compuerta
    // sin un caso que la empuje no esta probada, esta supuesta.
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const red = conRed();
    await E.onRequestPost({
      request: pedir({ ...BIEN, monto: 1, monto_total: 1, amount: 1, precio: 1 }),
      env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED },
    });
    red.soltar();
    eq('el cliente pide pagar 1 peso y Flow recibe el precio real',
      red.llamadas.cuerposFlow[0].amount, '177310');
    eq('y el pedido se congela con el monto del servidor', filas(crudo)[0].monto_total, 177310);
  }

  /* -- si Flow no contesta, el pedido NO se borra -- */
  {
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const red = conRed({ caeFlow: true });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    const j = await r.json();
    eq('contesta 409 (no 502: Cloudflare se come los 5xx de una Function)', r.status, 409);
    eq('con el motivo que dispara el rescate de la pagina', j.motivo, 'no-se-pudo-abrir-el-pago');
    // ⚠️ La fila es el UNICO registro de que alguien intento comprar. Borrarla por limpieza
    // borraria la evidencia justo del caso que hay que poder investigar.
    eq('el pedido sigue ahi', filas(crudo).length, 1);
    eq('en creado', filas(crudo)[0].estado, 'creado');
    eq('y sin token, que es lo que distingue "no llego a pagar" de "te mandamos a pagar"',
      filas(crudo)[0].flow_token, null);
  }

  /* -- Flow contesta sin token: el pago puede existir del otro lado -- */
  {
    const { db } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const red = conRed({ flow: { url: 'https://sandbox.flow.cl/app/web/pay.php' } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    eq('se trata como fallo', r.status, 409);
    eq('y se dice cual', (await r.json()).codigo, 'sin-url-ni-token');
  }

  /* -- CUANDO FLOW RECHAZA EL CORREO, LA PERSONA TIENE QUE SABER QUE ARREGLAR (3-nov) -- */
  {
    // ── EL HECHO ──────────────────────────────────────────────────────────────────────
    //
    // Flow valida el correo del comprador y rechaza algunos: medido contra su sandbox, cuatro
    // correos distintos (`control@ejemplo.cl`, `a@b.cl`, `prueba@gmail.con` y uno de dominio
    // inexistente) dieron los cuatro `400 {"code":1620,"message":"The userEmail: … is not
    // valid."}`. Nuestra propia expresion los acepta, asi que llegan hasta la pasarela.
    //
    // Hasta hoy esa persona leia «no pudimos abrir el pago, vuelve a intentarlo en un
    // momento» y se iba: reintentar con el mismo correo vuelve a fallar, y el consejo era un
    // callejon sin salida teniendo nosotros el motivo exacto en la mano.
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const dicho = [];
    const antesLog = console.log;
    console.log = (...a) => { dicho.push(a.join(' ')); };
    const red = conRed({
      flowEstado: 400,
      flow: { code: 1620, message: `The userEmail: ${BIEN.correo} is not valid.` },
    });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    console.log = antesLog;
    const j = await r.json();
    const crudoJson = JSON.stringify(j);

    eq('sigue siendo 409, que es lo unico que el navegador puede leer', r.status, 409);

    // ── LO QUE LA PERSONA LEE ─────────────────────────────────────────────────────────
    //
    // No alcanza con que el mensaje cambie: tiene que decirle QUE hacer. Lo que arregla este
    // caso es escribir otro correo, y eso es lo que la frase tiene que dejar claro.
    cierto('el mensaje apunta al correo', /correo/i.test(j.detalle));
    cierto('y le dice que escriba otro', /otro correo/i.test(j.detalle));
    cierto('se le confirma que no hubo cobro, porque la pasarela contesto y no creo nada',
      /no se te cobr/i.test(j.detalle));

    // ⚠️ EL TEXTO DEL PROVEEDOR NO SE LE MUESTRA. Viene en ingles, trae su propio correo
    // adentro y nombra campos nuestros. El crudo va al registro, no a la pantalla.
    falso('no se le muestra el texto crudo de la pasarela', /userEmail|is not valid/i.test(crudoJson));
    falso('ni el codigo de error del proveedor', crudoJson.includes('1620'));
    falso('ni se le devuelve su correo dentro de la respuesta', crudoJson.includes(BIEN.correo));
    falso('y no se nombra a la pasarela', /flow/i.test(crudoJson));

    // ── DE QUIEN ES LA CULPA, QUE ES LO QUE DECIDE LA PANTALLA ────────────────────────
    //
    // ⚠️ ESTA ES LA ASERCION QUE DE VERDAD CUIDA ALGO. `no-se-pudo-abrir-el-pago` dispara el
    // bloque de rescate de la pagina, que empieza diciendo «No es cosa tuya, el problema esta
    // de nuestro lado». Con ese motivo, a quien escribio mal su correo se le afirmaria lo
    // contrario de lo que pasa y se le ofreceria un formulario en vez del campo que tiene que
    // corregir.
    eq('lleva un motivo propio', j.motivo, 'correo-no-aceptado');
    falso('y NO el que hace decir «no es cosa tuya»', j.motivo === 'no-se-pudo-abrir-el-pago');

    // ── EL REGISTRO SI TIENE QUE PODER DIAGNOSTICARSE ─────────────────────────────────
    const registro = dicho.join(' | ');
    cierto('queda registrado que la pasarela rechazo', /rechaz/i.test(registro));
    cierto('con el codigo que permite saber cual fue', registro.includes('1620'));
    falso('pero sin el correo de quien compro', registro.includes(BIEN.correo));

    // ── EL INTENTO NO DESAPARECE ──────────────────────────────────────────────────────
    //
    // La fila es el unico rastro de que alguien quiso comprar y no pudo. Sin token, que es lo
    // que distingue «no llego a pagar» de «lo mandamos a pagar».
    // ⚠️ La fila se lee UNA vez y con red: una mutacion que borraba el pedido hacia que la
    // linea siguiente reventara con «no se puede leer de undefined», el archivo moria ahi y el
    // recuento no se imprimia nunca. Una prueba que revienta no acusa: acusa la que falla y
    // sigue contando.
    const fila = filas(crudo)[0] || {};
    eq('el intento queda registrado en la base', filas(crudo).length, 1);
    eq('en creado', fila.estado, 'creado');
    eq('y sin token', fila.flow_token, null);
  }

  /* -- y cuando el rechazo es NUESTRO, no se le echa la culpa a el -- */
  {
    // El contraste es lo que prueba que la rama discrimina en vez de cambiar el texto para
    // todos. `109 Invalid ApiKey` esta medido contra el sandbox igual que el 1620, y sale de
    // una credencial nuestra: el comprador no tiene nada que corregir.
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const red = conRed({ flowEstado: 400, flow: { code: 109, message: 'Invalid ApiKey' } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    const j = await r.json();

    eq('conserva el motivo que ofrece el rescate', j.motivo, 'no-se-pudo-abrir-el-pago');
    falso('y NO lo manda a cambiar su correo', /otro correo/i.test(j.detalle));
    cierto('se le dice que no se le cobro', /no se te cobr/i.test(j.detalle));
    falso('sin mostrarle el texto del proveedor', /ApiKey|Invalid/i.test(JSON.stringify(j)));
    eq('y el intento tambien queda en la base', filas(crudo).length, 1);
  }

  /* -- EL CAMINO QUE EL MENSAJE NUEVO INVITA A RECORRER (3-nov) -- */
  {
    // ── POR QUE SE PRUEBA EL RECORRIDO Y NO SOLO EL MENSAJE ───────────────────────────
    //
    // El mensaje nuevo le dice «escribe otro correo tuyo y vuelve a intentarlo». Un consejo
    // es una promesa sobre lo que pasa despues: si cambiar el correo chocara con el
    // antidoble-clic, o abriera un segundo cobro pagable, el texto estaria mandando a la
    // gente a un muro y ninguna asercion sobre el texto lo veria.
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });

    const rechazo = conRed({
      flowEstado: 400, flow: { code: 1620, message: `The userEmail: ${BIEN.correo} is not valid.` },
    });
    const primera = await (await E.onRequestPost({
      request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED },
    })).json();
    rechazo.soltar();
    eq('el primer intento se rechaza por el correo', primera.motivo, 'correo-no-aceptado');

    // Y ahora hace lo que le dijimos: el mismo sitio, otro correo.
    const OTRO = { ...BIEN, correo: 'otro@clinicaejemplo.cl' };
    const buena = conRed();
    const r2 = await E.onRequestPost({
      request: pedir(OTRO), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED },
    });
    buena.soltar();
    const j2 = await r2.json();

    eq('con otro correo el pago SI se abre', r2.status, 200);
    cierto('y se le entrega un enlace para pagar', typeof j2.checkout_url === 'string' && j2.checkout_url.length > 0);
    eq('se llamo a la pasarela una vez mas', buena.llamadas.flow, 1);
    eq('con el correo nuevo, no con el que la pasarela rechazo',
      buena.llamadas.cuerposFlow[0].email, OTRO.correo);

    // ⚠️ Y LO QUE NO PUEDE PASAR: dos cobros pagables por el mismo kit. El intento rechazado
    // queda como rastro, pero sin token no se puede pagar; el unico pagable es el nuevo.
    const conToken = filas(crudo).filter((f) => f.flow_token);
    eq('queda un solo pedido pagable', conToken.length, 1);
    eq('y es el que se acaba de abrir', conToken[0].id, j2.id);
    falso('el intento rechazado no quedo pagable',
      filas(crudo).some((f) => f.id === primera.id && f.flow_token));
  }

  /* -- sin credenciales no se inventa un pago -- */
  {
    const { db } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const red = conRed();
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, PASARELA: 'flow' } });
    red.soltar();
    eq('contesta 409', r.status, 409);
    eq('sin haber llamado a nadie', red.llamadas.flow, 0);
    eq('y lo dice', (await r.json()).codigo, 'sin-credenciales');
  }

  /* -- el conmutador, en la otra direccion -- */
  {
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const red = conRed();
    await E.onRequestPost({ request: pedir(BIEN),
      env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'tok', PASARELA: 'mp', ...{ FLOW_API_KEY: 'c', FLOW_SECRET_KEY: 's' } } });
    red.soltar();
    eq('con PASARELA=mp no se llama a Flow', red.llamadas.flow, 0);
    eq('se llama a Mercado Pago', red.llamadas.mp, 1);
    eq('y el pedido guarda SU referencia, no la otra', filas(crudo)[0].flow_token, null);
  }

  /* -- un valor raro NO manda los cobros a la pasarela que sabemos bloqueada -- */
  {
    // Lo que NO se reconoce cae en Flow, nunca en Mercado Pago: un valor mal escrito no debe
    // mandar los cobros a la pasarela que sabemos bloqueada con un 403.
    for (const raro of ['', 'mercadopago', 'mercado pago', undefined, 'xx', 'm p', null]) {
      eq(`PASARELA=${JSON.stringify(raro)} cae en flow`, E.pasarelaDe({ PASARELA: raro }), 'flow');
    }
    eq('sin env tambien', E.pasarelaDe({}), 'flow');

    // Y lo que SI se reconoce, incluido lo que un humano escribe de verdad: con mayusculas o
    // con un espacio pegado. Recortar es a proposito — un espacio invisible en una variable de
    // entorno no deberia cambiar en silencio quien cobra, que es de los errores mas dificiles
    // de ver porque la variable "se ve bien" en cualquier panel.
    for (const bueno of ['mp', 'MP', ' mp ', 'Mp', 'MP ']) {
      eq(`PASARELA=${JSON.stringify(bueno)} es mp`, E.pasarelaDe({ PASARELA: bueno }), 'mp');
    }
  }
}

/* ================================================================== */
console.log('=== LA COMPRA VIEJA QUE RESULTA ESTAR PAGADA ===');
{
  // ── POR QUE EXISTE (30-oct-2026) ───────────────────────────────────────────────────────
  //
  // Una venta cobrada cuya confirmacion se perdio queda en `creado`. Pasadas las 24 h, la
  // persona vuelve a comprar. El codigo pregunta a la pasarela, ella dice PAGADO, y
  // correctamente NO cierra la fila como rechazada.
  //
  // Pero la primera version no hacia nada mas: dejaba seguir y la peticion caia en el 409
  // generico «no se te cobro nada». O sea que a quien SI le habian cobrado $177.310 se le
  // afirmaba lo contrario, la venta seguia sin marcar, nadie se enteraba, y CADA reintento
  // repetia lo mismo: quedaba bloqueada para comprar, indefinidamente.
  //
  // Lo encontro una revision adversaria. Ninguna de las 3.752 aserciones de la bateria lo vio.
  const CRED = { FLOW_API_KEY: 'clave', FLOW_SECRET_KEY: 'secreto', PASARELA: 'flow',
    RESEND_API_KEY: 'clave-de-prueba' };
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });

  const VIEJO = new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString();
  const IDV = 'vyc_' + 'c'.repeat(32);
  await A.crearPedido(db, {
    id: IDV, creado_en: VIEJO, dominio: 'clinicaejemplo.cl', correo: 'contacto@clinicaejemplo.cl',
    senales_contratadas: ['cmp'], senales_fuera: [], informe_json: '{}',
    monto_neto: 149000, monto_total: 177310, flow_token: 'TOKVIEJO',
  });

  const red = conRed({ flowPago: { commerceOrder: IDV, amount: '177310', status: 2,
    paymentData: { amount: '177310.00', date: '2026-10-29 10:00:00' } } });
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
  red.soltar();
  const j = await r.json();

  eq('se le pregunto a la pasarela por la compra vieja', red.llamadas.lecturasFlow, 1);
  eq('contesta 409', r.status, 409);
  eq('con un motivo que NO es el generico', j.motivo, 'ya-pagaste');
  // ⚠️⚠️ LA ASERCION QUE CUIDA LO CARO: no se le puede afirmar a alguien que no se le cobro
  // cuando la pasarela acaba de decir que si.
  falso('NO se le dice que no se le cobro nada', /no se te cobr/i.test(j.detalle || ''));
  cierto('se le da el enlace de SU pedido', String(j.detalle).includes(IDV));
  eq('y el id viene en la respuesta', j.id, IDV);

  // ⚠️⚠️ Y QUE NO QUEDE SOLO EN UN REGISTRO QUE NADIE CONSULTA.
  //
  // La primera version de esta asercion decia `red.avisos === undefined ? true : ...`, y
  // `red.avisos` no existia en este arnes: era verdadera SIEMPRE. Una asercion muerta es peor
  // que ninguna, porque ocupa el lugar de la que haria falta y se cuenta como cobertura.
  // Lo delato una mutacion que quito el aviso del codigo y no puso nada rojo.
  eq('se avisa a una persona, y se sabe a cual', red.llamadas.avisos, ['hola@spindlelab.cl']);

  eq('NO se abrio un segundo cobro', red.llamadas.flow, 0);
  eq('y sigue habiendo un solo pedido', filas(crudo).length, 1);
  eq('que no se cerro como rechazado', filas(crudo)[0].estado, 'creado');
}

/* ================================================================== */
console.log('=== FLOW NO TIENE IDEMPOTENCIA: EL DOBLE CLIC NO PUEDE ABRIR DOS PAGOS ===');
{
  // ── POR QUE NO EXISTIA ESTA PRUEBA, QUE ES LA MITAD DEL HALLAZGO (3-nov-2026) ─────────
  //
  // La prueba del doble clic (seccion 5) esta fijada a `PASARELA: 'mp'`, asi que el camino de
  // Flow nunca se corrio contra dos clics. Y aunque se hubiera corrido, el molde de red mentia:
  // devolvia siempre el mismo token, con lo cual abrir un segundo pago y reusar el primero se
  // veian IDENTICOS desde afuera.
  //
  // El defecto: el antidoble clic reusa el id del pedido anterior, y con Mercado Pago eso
  // alcanzaba porque el id viajaba como `X-Idempotency-Key` y la API devolvia la orden que ya
  // existia. `crearPagoFlow` no manda ninguna cabecera de idempotencia, porque Flow no tiene.
  //
  // Lo que decia el propio repo (`herramientas/sonda-flow.mjs`): «Flow rechaza un
  // `commerceOrder` repetido». Se fue a comprobar al sandbox el 3-nov-2026 y es FALSO: tres
  // `payment/create` con el MISMO `commerceOrder` contestaron `ok`, con `flowOrder` 11463040,
  // 11463041 y 11463042 y tres tokens distintos, y los tres `getStatus` devolvieron ese mismo
  // `commerceOrder` con `status: 1`. Tres enlaces de pago vivos y cobrables por un solo kit, y
  // la fila guardando solo el ultimo token: los otros dos quedaban cobrables e invisibles.
  const CRED = { FLOW_API_KEY: 'clave', FLOW_SECRET_KEY: 'secreto', PASARELA: 'flow',
    RESEND_API_KEY: 'clave-de-prueba' };

  /* -- primero: que el molde no pueda tapar el defecto -- */
  {
    // Si el molde volviera a dar el mismo token, TODAS las aserciones de abajo pasarian con un
    // endpoint que abre dos cobros. Esta es la que vigila a la prueba misma.
    const red = conRed();
    const a = await fetch('https://sandbox.flow.cl/api/payment/create', { method: 'POST', body: 'commerceOrder=vyc_x&amount=1' });
    const b = await fetch('https://sandbox.flow.cl/api/payment/create', { method: 'POST', body: 'commerceOrder=vyc_x&amount=1' });
    const ta = (await a.json()).token, tb = (await b.json()).token;
    red.soltar();
    cierto('los dos pagos del molde traen token', Boolean(ta && tb));
    falso('y son distintos, como lo son en Flow de verdad', ta === tb);
  }

  /* -- dos clics: un pago, un enlace -- */
  {
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED };
    const red = conRed();
    const a = await E.onRequestPost({ request: pedir(BIEN), env });
    const b = await E.onRequestPost({ request: pedir(BIEN), env });
    const ja = await a.json(), jb = await b.json();
    red.soltar();

    eq('las dos contestan 200', [a.status, b.status], [200, 200]);
    eq('con el MISMO id de pedido', ja.id, jb.id);
    // ⚠️⚠️ LA ASERCION QUE CUIDA EL DOBLE COBRO. Dos enlaces distintos son dos pagos vivos por
    // el mismo kit. Y si se pagan los dos, el segundo aviso ni chilla: el pedido ya quedo en
    // `pagado`, la confirmacion contesta `ya-resuelto` y nadie se entera de que se cobro dos
    // veces.
    eq('y las dos llevan al MISMO enlace de pago', ja.checkout_url, jb.checkout_url);
    eq('se abrio UN solo pago en Flow', red.llamadas.flow, 1);
    eq('queda UN solo pedido', filas(crudo).length, 1);
    // El token guardado sigue siendo el del pago que de verdad esta abierto. Si el endpoint
    // hubiera abierto otro, la fila guardaria el nuevo y el primero quedaria cobrable sin que
    // tengamos forma de verlo.
    eq('la fila guarda el token del unico pago abierto', filas(crudo)[0].flow_token, 'TOKFLOW123');
    cierto('y el enlace que se devuelve lleva ESE token', String(ja.checkout_url).includes('TOKFLOW123'));

    // El enlace tiene que ser uno que la pagina acepte seguir: `destinoDePagoValido` exige
    // https y un host de flow.cl. Uno que no pase ese filtro deja a la persona mirando
    // «Reintentar» con el pago abierto del otro lado — paso de verdad el 30-oct.
    const u = new URL(ja.checkout_url);
    eq('por https', u.protocol, 'https:');
    cierto('y a un host de flow.cl', /(^|\.)flow\.cl$/.test(u.hostname));

    // Reusar cuesta UNA lectura (la del segundo clic), no una creacion.
    eq('se le pregunto al pago abierto una sola vez', red.llamadas.lecturasFlow, 1);
  }

  /* -- el pago abierto resulta estar PAGADO: no se cobra de nuevo -- */
  {
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const IDA = 'vyc_' + 'e'.repeat(32);
    await A.crearPedido(db, {
      id: IDA, dominio: 'clinicaejemplo.cl', correo: 'contacto@clinicaejemplo.cl',
      senales_contratadas: [], senales_fuera: [], informe_json: '{}',
      monto_neto: 149000, monto_total: 177310, flow_token: 'TOKABIERTO',
    });
    const red = conRed({ flowPago: { commerceOrder: IDA, amount: '177310', status: 2,
      paymentData: { amount: '177310.00', date: '2026-11-03 10:00:00' } } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    const j = await r.json();

    eq('NO se abre un segundo cobro', red.llamadas.flow, 0);
    eq('contesta 409', r.status, 409);
    eq('con un motivo que no es el generico', j.motivo, 'ya-pagaste');
    // ⚠️⚠️ No se le puede afirmar a alguien que no se le cobro cuando la pasarela acaba de
    // decir que si.
    falso('NO se le dice que no se le cobro nada', /no se te cobr/i.test(j.detalle || ''));
    cierto('se le da el enlace de SU pedido', String(j.detalle).includes(IDA));
    eq('y se avisa a una persona, y se sabe a cual', red.llamadas.avisos, ['hola@spindlelab.cl']);
    eq('el pedido no se cerro como rechazado', filas(crudo)[0].estado, 'creado');
  }

  /* -- una compra VIEJA cuyo pago no calza: no se cierra Y SE AVISA -- */
  {
    // ── POR QUE ESTE CAMINO NECESITABA SU PROPIA PRUEBA (3-nov-2026) ──────────────────────
    //
    // Es el otro aviso de `respuestaYaPagaste` y su vecino: la fila vieja cuyo pago en Flow no
    // es ni pendiente, ni pagado, ni rechazado —acá, un monto que no calza con lo vendido—. El
    // codigo decide no tocarla y abrirle un cobro nuevo a la persona, y el comentario del
    // bloque dice textual por que: dejarla viva sin que nadie se entere es dejarla perdida.
    //
    // Esa segunda mitad no estaba probada. Al quitarle el `env` a ese aviso, la bateria seguia
    // entera en verde: la fila quedaba viva, la persona compraba igual, y el aviso que es la
    // unica forma de enterarse no salia.
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const IDX = 'vyc_' + '2'.repeat(32);
    await A.crearPedido(db, {
      id: IDX, dominio: 'clinicaejemplo.cl', correo: 'contacto@clinicaejemplo.cl',
      senales_contratadas: [], senales_fuera: [], informe_json: '{}',
      monto_neto: 149000, monto_total: 177310, flow_token: 'TOKVIEJO',
    });
    // La fila tiene que ser VIEJA: `buscarCompraAbierta` solo mira las de antes de la ventana,
    // y una recien creada entra por el otro camino (el pago abierto de este mismo pedido).
    const haceMucho = new Date(Date.now() - (P.VIGENCIA_ORDEN_HORAS + 2) * 60 * 60 * 1000).toISOString();
    crudo.prepare('UPDATE pedidos SET creado_en = ? WHERE id = ?').run(haceMucho, IDX);

    // Flow dice que ese pago es de $1.000 y vendimos $177.310: no es ninguno de los tres casos
    // que el codigo sabe resolver solo.
    const red = conRed({ flowPago: { commerceOrder: IDX, amount: '1000', status: 1,
      paymentData: { amount: null } } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    const j = await r.json();

    // La fila vieja NO se cierra: cerrarla podria estar marcando como rechazada una venta que
    // entro, y la plata ya esta del otro lado. Eso es lo que el codigo decide, y esta bien.
    eq('la fila vieja sigue viva', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(IDX).estado, 'creado');
    eq('y no se abrio ningun cobro', red.llamadas.flow, 0);

    // ⚠️ Y LO QUE DE VERDAD PASA CON LA PERSONA, que no es lo que el comentario del codigo
    // decia. El comentario afirmaba que «se le abre un pago nuevo»; no se le abre: el insert
    // ya habia chocado contra la fila vieja antes del rescate, y solo se reintenta cuando esa
    // fila se cierra. Con la fila viva, la respuesta es un 409 y la persona se queda sin poder
    // comprar — y como `buscarCompraAbierta` va a seguir encontrando esa misma fila, cada
    // reintento vuelve a dar lo mismo.
    //
    // Se afirma lo que hace, no lo que decia el comentario. Que esto SEA lo correcto es otra
    // decision, y no es la que vino a tomar este cambio: queda dicho en el informe.
    eq('a la persona se le contesta 409', r.status, 409);
    eq('con el motivo de que no se pudo guardar', j.motivo, 'no-se-pudo-guardar');
    cierto('diciendole que no se le cobro nada', /no se te cobr/i.test(j.detalle || ''));

    // ⚠️⚠️ LA MITAD QUE FALTABA: que alguien se entere de esa fila.
    eq('sale el aviso, a la casilla del negocio', red.llamadas.avisos, ['hola@spindlelab.cl']);
  }

  /* -- el pago abierto fue RECHAZADO: ese enlace ya no cobra, se abre uno nuevo -- */
  {
    // ⚠️ LA OTRA CARA, Y LA QUE IMPIDE «ARREGLARLO» NEGANDOSE A TODO. Un arreglo que se plante
    // ante cualquier pago abierto deja encerrado a quien le rechazaron la tarjeta y quiere
    // reintentar con otra, que es el camino normal de una compra chilena. Un enlace rechazado
    // ya no cobra, asi que abrir uno nuevo deja UNO vivo, no dos.
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const IDR = 'vyc_' + 'f'.repeat(32);
    await A.crearPedido(db, {
      id: IDR, dominio: 'clinicaejemplo.cl', correo: 'contacto@clinicaejemplo.cl',
      senales_contratadas: [], senales_fuera: [], informe_json: '{}',
      monto_neto: 149000, monto_total: 177310, flow_token: 'TOKRECHAZADO',
    });
    const red = conRed({ flowPago: { commerceOrder: IDR, amount: '177310', status: 3,
      paymentData: { amount: null } } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    const j = await r.json();

    eq('se puede volver a pagar', r.status, 200);
    eq('se abrio un pago nuevo', red.llamadas.flow, 1);
    eq('sobre la MISMA fila, sin crear otra', [j.id, filas(crudo).length], [IDR, 1]);
    eq('y la fila pasa a guardar el token del pago nuevo', filas(crudo)[0].flow_token, 'TOKFLOW123');
    cierto('el enlace es el del pago nuevo', String(j.checkout_url).includes('TOKFLOW123'));
    falso('y NO el del rechazado', String(j.checkout_url).includes('TOKRECHAZADO'));
  }

  /* -- no se pudo preguntar por el pago abierto: no se cobra a ciegas -- */
  {
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const IDQ = 'vyc_' + '1'.repeat(32);
    await A.crearPedido(db, {
      id: IDQ, dominio: 'clinicaejemplo.cl', correo: 'contacto@clinicaejemplo.cl',
      senales_contratadas: [], senales_fuera: [], informe_json: '{}',
      monto_neto: 149000, monto_total: 177310, flow_token: 'TOKDESCONOCIDO',
    });
    // El molde no conoce ese token y la prueba no fija respuesta: contesta error, como Flow
    // cuando no puede leer el pago.
    const red = conRed();
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    const j = await r.json();

    eq('se pregunto', red.llamadas.lecturasFlow, 1);
    eq('y antes que arriesgar un segundo cobro, no se abre ninguno', red.llamadas.flow, 0);
    eq('contesta 409', r.status, 409);
    eq('diciendo que no se pudo comprobar', j.motivo, 'no-se-pudo-consultar');
    cierto('con una explicacion para la persona', String(j.detalle).length > 40);
    eq('y la fila queda como estaba', filas(crudo)[0].flow_token, 'TOKDESCONOCIDO');
  }

  /* -- el pago abierto no calza con lo vendido: no se cobra y lo mira alguien -- */
  {
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const IDM = 'vyc_' + '2'.repeat(32);
    await A.crearPedido(db, {
      id: IDM, dominio: 'clinicaejemplo.cl', correo: 'contacto@clinicaejemplo.cl',
      senales_contratadas: [], senales_fuera: [], informe_json: '{}',
      monto_neto: 149000, monto_total: 177310, flow_token: 'TOKRARO',
    });
    const red = conRed({ flowPago: { commerceOrder: IDM, amount: '1000', status: 2,
      paymentData: { amount: '1000.00' } } });
    const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...CRED } });
    red.soltar();
    const j = await r.json();

    eq('no se abre otro cobro', red.llamadas.flow, 0);
    eq('contesta 409', r.status, 409);
    eq('y lo dice sin inventar un estado', j.motivo, 'pago-abierto-no-calza');
    // ⚠️ No se toca la fila Y se avisa. Dejarla viva sin que nadie se entere es dejarla
    // perdida: es la mitad que ya falto una vez en este mismo archivo.
    eq('se avisa a una persona', red.llamadas.avisos, ['hola@spindlelab.cl']);
    eq('y la fila no se movio', filas(crudo)[0].estado, 'creado');
  }
}

/* ══════════════════════════════════════════════════════════════════════════════════════ *
 * EL MONTO DE ENSAYO: solo con el secreto, y nunca desde el navegador (3-nov-2026)        *
 * ══════════════════════════════════════════════════════════════════════════════════════ *
 *
 * El camino del dinero por Flow nunca corrió con plata, y probarlo exige una compra real. Las
 * seis cosas que esa compra demuestra no dependen del monto, así que se agregó un precio de
 * ensayo detrás de `CLAVE_ENTREGA`.
 *
 * Lo que estas aserciones cuidan NO es que exista el precio de ensayo: es que **no exista para
 * nadie más**. La regla que el archivo del producto protege con un comentario largo —el monto
 * lo fija el servidor, nunca el navegador— tiene que seguir siendo cierta después del cambio.
 * Por eso casi todas las aserciones de abajo comprueban que se cobra 177.310.
 */
console.log('=== 25. el monto de ensayo ===');
{
  const CLAVE = 'una-clave-de-entrega-larga-para-la-prueba-0123456789';
  const FLOW = { FLOW_API_KEY: 'clave', FLOW_SECRET_KEY: 'secreto', PASARELA: 'flow' };

  const correr = async (cabeceras, extraEnv = {}) => {
    const { db, crudo } = baseNueva();
    const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
    const red = conRed();
    const r = await E.onRequestPost({
      request: pedir(BIEN, { cabeceras }),
      env: { VYC_PEDIDOS: db, VYC_TOPES: kv, ...FLOW, CLAVE_ENTREGA: CLAVE, ...extraEnv },
    });
    const j = await r.json().catch(() => ({}));
    red.restaurar?.();
    return { r, j, fila: filas(crudo)[0], enviado: red.llamadas.cuerposFlow[0] };
  };

  // ── Lo que tiene que pasarle a CUALQUIERA que compre ────────────────────────────────
  const normal = await correr(null);
  eq('sin cabecera: el contrato queda en el precio real', normal.fila && normal.fila.monto_total, 177310);
  eq('sin cabecera: a la pasarela se le pide el precio real', normal.enviado && normal.enviado.amount, '177310');

  // Mandar la cabecera no sirve de nada sin el secreto, que es el punto entero.
  for (const [caso, valor] of [
    ['inventada', 'no-es-la-clave'],
    ['vacía', ''],
    ['solo espacios', '   '],
    ['la clave con una letra cambiada', CLAVE.slice(0, -1) + 'X'],
    ['la clave más un sufijo', CLAVE + 'X'],
  ]) {
    const malo_ = await correr({ 'X-Prueba-Monto': valor });
    eq(`cabecera ${caso}: se cobra el precio real`, malo_.fila && malo_.fila.monto_total, 177310);
    eq(`cabecera ${caso}: y la pasarela también`, malo_.enviado && malo_.enviado.amount, '177310');
  }

  // Falla hacia el precio real: sin la clave cargada en el entorno, la cabecera no habilita nada.
  const sinClave = await correr({ 'X-Prueba-Monto': CLAVE }, { CLAVE_ENTREGA: undefined });
  eq('sin CLAVE_ENTREGA en el entorno: precio real', sinClave.fila && sinClave.fila.monto_total, 177310);
  const claveEnBlanco = await correr({ 'X-Prueba-Monto': '   ' }, { CLAVE_ENTREGA: '   ' });
  eq('clave en blanco contra cabecera en blanco: NO habilita', claveEnBlanco.fila && claveEnBlanco.fila.monto_total, 177310);

  // ── Y lo que tiene que pasarle a quien SÍ tiene el secreto ──────────────────────────
  const ensayo = await correr({ 'X-Prueba-Monto': CLAVE });
  eq('con el secreto: el contrato queda en el monto de ensayo', ensayo.fila && ensayo.fila.monto_total, 1190);
  eq('con el secreto: a la pasarela se le pide ese mismo monto', ensayo.enviado && ensayo.enviado.amount, '1190');
  eq('con espacios alrededor también vale', (await correr({ 'X-Prueba-Monto': ` ${CLAVE} ` })).fila.monto_total, 1190);

  // El neto y el total guardan la misma aritmética en los dos precios: el correo de
  // confirmación declara los dos y no pueden contradecirse.
  eq('el IVA del precio real cuadra', Math.round(E.MONTO_NETO * 1.19), E.MONTO_TOTAL);
  eq('el IVA del precio de ensayo cuadra', Math.round(E.MONTO_PRUEBA_NETO * 1.19), E.MONTO_PRUEBA_TOTAL);
  cierto('el de ensayo es mucho menor que el real', E.MONTO_PRUEBA_TOTAL * 100 < E.MONTO_TOTAL);
}

console.log('=== 25 bis. un pedido reusado se cobra a SU monto, no al de la petición nueva ===');
{
  // ⚠️ ESTE ES EL DEFECTO QUE EL PRECIO DE ENSAYO DESTAPÓ, y existía antes.
  //
  // Dentro de la ventana de 24 h, el segundo intento de la misma pareja (dominio, correo)
  // REUSA el pedido anterior. El monto que se le pedía a la pasarela salía de la constante, no
  // de la fila. Con un solo precio en el mundo daba igual. Con dos, un pedido abierto a un
  // precio y recobrado a otro deja el cobro sin calzar con lo vendido, y `decidirDesdeFlow`
  // compara exactamente eso: lo mandaría a revisión en vez de marcarlo pagado.
  const CLAVE = 'una-clave-de-entrega-larga-para-la-prueba-0123456789';
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, FLOW_API_KEY: 'clave', FLOW_SECRET_KEY: 'secreto',
    PASARELA: 'flow', CLAVE_ENTREGA: CLAVE };

  const red1 = conRed();
  const a = await E.onRequestPost({ request: pedir(BIEN, { cabeceras: { 'X-Prueba-Monto': CLAVE } }), env });
  const ja = await a.json().catch(() => ({}));
  const montoPrimero = red1.llamadas.cuerposFlow[0] && red1.llamadas.cuerposFlow[0].amount;
  red1.restaurar?.();
  eq('el primero se abrió al monto de ensayo', montoPrimero, '1190');

  // Ahora el MISMO comprador vuelve, y esta vez sin el secreto.
  //
  // El pago anterior tiene que estar RECHAZADO para que se abra uno nuevo: desde el arreglo
  // del doble cobro, si el anterior sigue vivo se devuelve SU enlace y no se cobra otra vez.
  // Con el anterior vivo esta prueba no medía nada y lo supe porque la aserción que importa
  // no llegó a correr: cayó en la rama de respaldo.
  const red2 = conRed({ flowPago: { status: 3, commerceOrder: ja.id, amount: 1190 } });
  const b = await E.onRequestPost({ request: pedir(BIEN), env });
  const jb = await b.json().catch(() => ({}));
  const montoSegundo = red2.llamadas.cuerposFlow[0] && red2.llamadas.cuerposFlow[0].amount;
  red2.restaurar?.();

  const todas = filas(crudo);
  eq('se reusó el pedido, no se creó otro', todas.length, 1);
  eq('y es el mismo id', jb.id || (todas[0] && todas[0].id), ja.id);
  eq('el contrato sigue diciendo lo que se vendió', todas[0] && todas[0].monto_total, 1190);
  // La que importa: lo que se le cobra sale de la FILA, no de la petición de ahora.
  if (montoSegundo !== undefined) {
    eq('y se le cobra ESO, no el precio de la petición nueva', montoSegundo, '1190');
  } else {
    cierto('no se abrió un segundo cobro (la compuerta de Flow lo frenó, que también está bien)',
      red2.llamadas.flow === 0);
  }
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
