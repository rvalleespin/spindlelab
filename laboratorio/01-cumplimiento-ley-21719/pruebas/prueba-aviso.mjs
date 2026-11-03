/**
 * Pruebas de los avisos internos (functions/api/aviso.js).
 *
 *   node prueba-aviso.mjs
 *
 * ── POR QUÉ EXISTE (3-nov-2026) ───────────────────────────────────────────────────────────
 *
 * Una auditoría buscó en hola@spindlelab.cl los asuntos que generan los tres avisos de este
 * módulo —venta, REVISAR, avance— y no encontró NI UNO, mientras que los del formulario del
 * sitio, que usaban la MISMA clave de Web3Forms, sí estaban. Al mandar uno de prueba apareció
 * la causa: Web3Forms contestó 403 con
 *
 *     {"success": false, "message": "This method is not allowed. Use our API in client side
 *      or contact support with server IP address (Pro plan is required)"}
 *
 * O sea que el canal estaba ROTO, no «nunca se llamó»: no faltaba un pago para probarlo, era
 * que cuando llegara el pago el aviso tampoco iba a salir.
 *
 * ── QUÉ CAMBIÓ HOY, Y QUÉ CUIDAN ESTAS PRUEBAS ───────────────────────────────────────────
 *
 * Los tres avisos se mudaron a Resend, que ya está pagado y es el canal por el que ya le
 * escribimos al comprador. Eso mueve el riesgo de sitio: ya no es «¿sale?», es «¿sale POR
 * DONDE corresponde y sin llevarse de más?». En orden de importancia:
 *
 * 1. QUE VAYAN A LA CASILLA DEL NEGOCIO Y DESDE EL REMITENTE VERIFICADO, y que no quede nada
 *    del proveedor anterior. Un aviso con un remitente sin verificar lo rechaza Resend, que es
 *    volver al mismo silencio con otro código.
 * 2. QUE EL ID ENTERO DEL PEDIDO NO SALGA, ni en el correo ni en el registro. Son 32 hex que
 *    son la única credencial de la pantalla del cliente: no hay cuenta ni contraseña. Un
 *    correo se reenvía y se queda en un buzón, así que la regla no se relaja por cambiar de
 *    proveedor.
 * 3. QUE UN AVISO PERDIDO SE PUEDA ENCONTRAR DESPUÉS: el rastro dice qué contestó el
 *    proveedor, con qué código y de qué pedido, y queda a nivel de error para poder buscarlo
 *    por nivel en vez de leyendo todas las invocaciones.
 * 4. QUE LA CLAVE AUSENTE SE NOTE. Es el modo de fallar más barato de todos —una variable sin
 *    cargar— y el que se parece más al silencio de los últimos meses.
 * 5. QUE LAS TRES FUNCIONES SE PORTEN IGUAL. Tenían tres copias del mismo bloque y las tres
 *    trataban el fallo distinto; esa divergencia es la que dejó el hueco.
 * 6. QUE NADA DE ESTO LANCE. Un pago que entró no se puede perder porque un aviso no salió.
 */

import { rutaEnElRepo } from './rutas.mjs';

const A = await import(rutaEnElRepo('verificaycumple/functions/api/aviso.js', 'AVISO_JS'));
const C = await import(rutaEnElRepo('verificaycumple/functions/api/correo.js', 'CORREO_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

const ID = 'vyc_' + 'a'.repeat(32);
const OTRO_ID = 'vyc_' + 'b'.repeat(32);
const PREFIJO = ID.slice(0, A.LARGO_PREFIJO);
const PEDIDO = {
  id: ID, dominio: 'ejemplo.cl', correo: 'comprador@ejemplo.cl',
  monto_total: 177310, estado: 'pagado', razon_social: 'Clínica Ejemplo SpA',
  plataforma: 'wordpress', pagado_en: '2026-11-03T12:00:00.000Z',
};
// El entorno, que es lo que ahora reciben las tres funciones. La clave es inventada: ninguna
// de estas pruebas toca la red de verdad.
const ENV = { RESEND_API_KEY: 'clave-de-prueba-no-sirve' };

// Un rechazo con la forma que tiene el de Resend cuando el remitente no está verificado.
const RECHAZO_RESEND = JSON.stringify({
  statusCode: 403, name: 'validation_error',
  message: 'The envios.spindlelab.cl domain is not verified.',
}, null, 2);

/**
 * Captura los dos niveles de consola POR SEPARADO, que es la mitad de lo que se comprueba
 * acá: si el fallo sale por `log` queda mezclado con todas las invocaciones normales.
 * Se restituye siempre, y antes de afirmar nada: si no, un FALLA se escribiría en el array
 * en vez de la pantalla y la prueba fallaría en silencio.
 */
async function conConsola(fn) {
  const logs = [], errores = [];
  const antesLog = console.log, antesError = console.error;
  console.log = (...a) => logs.push(a.map(String).join(' '));
  console.error = (...a) => errores.push(a.map(String).join(' '));
  let valor, lanzo = false;
  try { valor = await fn(); }
  catch (e) { lanzo = e; }
  finally { console.log = antesLog; console.error = antesError; }
  return { valor, lanzo, log: logs.join(' | '), error: errores.join(' | '), errores };
}

/** Un `fetch` que contesta lo que se le diga, con la forma que tiene el de verdad. */
const redQueFalla = (status, cuerpo) => async () => ({
  ok: false, status, text: async () => cuerpo, json: async () => ({}),
});

/** Un `fetch` que acepta y guarda lo que se le mandó, para poder mirarlo. */
function redQueAcepta() {
  const visto = { urls: [], cabeceras: [], cuerpos: [] };
  const red = async (url, opciones) => {
    visto.urls.push(String(url));
    visto.cabeceras.push((opciones && opciones.headers) || {});
    try { visto.cuerpos.push(JSON.parse(opciones.body)); } catch { visto.cuerpos.push(null); }
    return { ok: true, status: 200, text: async () => '{}', json: async () => ({ id: 'x' }) };
  };
  return { red, visto };
}

/* ================================================================== */
console.log('=== 1. el id ENTERO no sale por el campo libre ===');
{
  // El caso real: `decidirDesdeFlow` arma el detalle con los dos ids completos y
  // `cuerpoDeRevisar` lo reenviaba tal cual a un correo que se queda guardado.
  const detalle = `El pago dice ser del pedido ${OTRO_ID} y se buscó ${ID}`;
  const cuerpo = A.cuerpoDeRevisar(PEDIDO, { motivo: 'id-no-calza', detalle });
  const texto = JSON.stringify(cuerpo);

  falso('el id del pedido no viaja entero', texto.includes(ID));
  falso('ni el otro id que venía en el mismo detalle', texto.includes(OTRO_ID));
  // Y sigue sirviendo para algo: el aviso tiene que dejar con qué buscar el pedido en la base.
  cierto('pero queda con qué buscarlo en la base', texto.includes(PREFIJO));
  cierto('y el otro también se puede buscar', texto.includes(OTRO_ID.slice(0, A.LARGO_PREFIJO)));
  // El detalle tiene que seguir contando lo que pasó, no quedar en un recorte ilegible.
  cierto('el detalle sigue explicando el problema', /dice ser del pedido/.test(cuerpo.Detalle));

  // No importa cómo venga escrito el id: en mayúsculas es el mismo id y abre la misma pantalla.
  const mayus = 'vyc_' + 'C'.repeat(32);
  falso('un id en mayúsculas tampoco sale entero', A.recortarIds(`ref ${mayus}`).includes(mayus));

  // Un texto que no trae ningún id se tiene que devolver intacto, o el recorte estaría
  // comiéndose el resto del mensaje.
  eq('un texto sin ids queda igual', A.recortarIds('monto 177310 no calza'), 'monto 177310 no calza');

  // Sin detalle no puede reventar: el aviso vale igual sin él.
  let lanzo = false;
  try { A.recortarIds(null); A.recortarIds(undefined); } catch { lanzo = true; }
  falso('un detalle ausente no lanza', lanzo);
  eq('y el aviso sale con su texto de reemplazo',
    A.cuerpoDeRevisar(PEDIDO, { motivo: 'x' }).Detalle, '(sin detalle)');

  // La regla vieja del campo dedicado sigue en pie.
  eq('el campo del pedido sigue siendo un prefijo', cuerpo['Pedido (prefijo)'], `${PREFIJO}…`);
  falso('y el correo del comprador no va en ningún campo', texto.includes(PEDIDO.correo));
}

/* ================================================================== */
console.log('=== 2. el mensaje que recibe Resend ===');
{
  const m = A.mensajeDeAviso(A.cuerpoDelAviso(PEDIDO));

  // Lo primero: a quién le llega. Un aviso que sale perfecto a la casilla equivocada es el
  // mismo silencio con otro nombre.
  eq('el aviso llega a la casilla del negocio', m.to, ['hola@spindlelab.cl']);
  // Y de dónde sale. Resend rechaza un remitente que no esté verificado, y el único verificado
  // del proyecto es el de `correo.js`: escribir otro acá sería volver al 403 por otra puerta.
  eq('sale del único remitente verificado que tenemos', m.from, C.REMITENTE);
  cierto('que es el subdominio de envíos', /@envios\.spindlelab\.cl>?$/.test(m.from));

  // El asunto tiene que decir de qué es sin abrirlo: se lee en el teléfono.
  cierto('el asunto dice que fue una venta', /venta/i.test(m.subject));
  cierto('y de qué sitio', m.subject.includes('ejemplo.cl'));

  // El cuerpo lo armamos nosotros desde hoy —antes lo armaba el proveedor con los nombres de
  // campo— así que hay que comprobar que cada rótulo llegue con su valor y no se pierda uno.
  cierto('el cuerpo trae el sitio con su rótulo', m.text.includes('Sitio: ejemplo.cl'));
  cierto('el monto, en pesos legibles', /Monto: \$177[.,]310/.test(m.text));
  cierto('el prefijo del pedido', m.text.includes(`Pedido (prefijo): ${PREFIJO}…`));
  cierto('y qué hay que hacer con eso', /Qué hacer: .*base de pedidos/.test(m.text));
  // `subject` es la llave reservada: si se colara al cuerpo, el correo diría su propio asunto.
  falso('el asunto no se repite dentro del cuerpo', m.text.includes('subject'));

  // No queda nada del proveedor anterior. Una clave de acceso suelta en el cuerpo sería basura
  // que viaja, y `access_key` era un campo que Resend no entiende.
  const crudo = JSON.stringify(m);
  falso('no va ninguna clave de acceso del proveedor viejo', /access_key/i.test(crudo));
  falso('ni se nombra a Web3Forms', /web3forms/i.test(crudo));

  // La frontera: pase lo que pase con los campos, el id entero no sale del Worker.
  const sucio = A.mensajeDeAviso({
    subject: `REVISAR ${ID}`, Detalle: `otro camino con ${OTRO_ID} adentro`,
  });
  falso('el id entero no sale ni por el asunto', JSON.stringify(sucio).includes(ID));
  falso('ni por un campo que nadie limpió antes', JSON.stringify(sucio).includes(OTRO_ID));
  cierto('y lo que queda sigue sirviendo para buscarlo', sucio.subject.includes(PREFIJO));
}

/* ================================================================== */
console.log('=== 3. un aviso perdido deja con qué diagnosticarlo ===');
{
  const linea = A.rastroDelFallo(`VENTA ${PREFIJO}… · ejemplo.cl`, 'http-403', RECHAZO_RESEND);

  // Lo que faltaba antes, y es lo único que permite diagnosticar sin volver a reproducirlo.
  cierto('dice qué contestó el proveedor', linea.includes('domain is not verified'));
  cierto('y con qué código', linea.includes('http-403'));
  // Y lo otro que faltaba: cuál de las ventas se perdió. Saber que se perdió "un aviso" no
  // sirve de nada si no se puede ir a buscar el pedido.
  cierto('nombra el pedido', linea.includes(PREFIJO));
  cierto('y el sitio', linea.includes('ejemplo.cl'));

  // Un rechazo de configuración no se arregla reintentando. Si la línea no lo dice, quien la
  // lea se queda esperando que el próximo aviso sí salga — que es lo que pasó durante meses.
  cierto('avisa que esto no se va a arreglar solo', /NO ES PASAJERO/.test(linea));

  // La distinción ya no se lee de una frase del proveedor, que con Resend no hemos medido:
  // se lee del código. Un 4xx es configuración nuestra; un 5xx y un corte de red, no.
  for (const c of ['http-400', 'http-401', 'http-403', 'http-422']) {
    falso(`${c} no es pasajero`, A.esPasajero(c));
    cierto(`${c} lleva el cartel`, /NO ES PASAJERO/.test(A.rastroDelFallo('VENTA', c, '{}')));
  }
  for (const c of ['http-429', 'http-500', 'http-502', 'http-503', 'sin-respuesta']) {
    cierto(`${c}: reintentar puede salir distinto`, A.esPasajero(c));
    falso(`${c}: y no lleva el cartel`, /NO ES PASAJERO/.test(A.rastroDelFallo('VENTA', c, '{}')));
  }
  // La clave que falta no tiene forma de código HTTP y aun así es lo más definitivo que hay:
  // sin ella no va a salir NINGÚN aviso, nunca, por más que se reintente.
  falso('una clave sin cargar no es pasajera', A.esPasajero('sin-clave'));
  // El 429 es tope de envíos: esperar es exactamente el arreglo, así que marcarlo como
  // definitivo haría que alguien fuera a revisar una configuración que está bien.
  falso('un tope de envíos no lleva el cartel',
    /NO ES PASAJERO/.test(A.rastroDelFallo('VENTA', 'http-429', '{"name":"rate_limit_exceeded"}')));
  // Y un 500 del proveedor tampoco, pero sí tiene que decir qué contestó.
  const pasajero = A.rastroDelFallo('VENTA x… · ejemplo.cl', 'http-500', '{"error":"upstream"}');
  falso('un error del proveedor no lleva ese cartel', /NO ES PASAJERO/.test(pasajero));
  cierto('pero sí lo que contestó', pasajero.includes('upstream'));

  // Defensa en profundidad: hoy el aviso solo manda el prefijo, así que el proveedor no
  // tiene de dónde devolver un id entero. Si alguna vez lo devuelve, el registro de
  // Cloudflare —que lee cualquiera con acceso a la cuenta— no es lugar para guardarlo.
  const conEco = A.rastroDelFallo('VENTA', 'http-400', `rechazado: ${ID}`);
  falso('un eco del id entero no se guarda en el registro', conEco.includes(ID));

  // Una página de error de Cloudflare son 8 KB de HTML. Sin tope, el dato útil se pierde en
  // su propio volcado y la línea deja de ser legible justo cuando hay que leerla.
  const enorme = A.rastroDelFallo('VENTA', 'http-403', 'z'.repeat(9000));
  falso('un cuerpo enorme no se vuelca completo', enorme.includes('z'.repeat(9000)));
  cierto('la línea sigue siendo de un tamaño legible', enorme.length < A.LARGO_RASTRO + 300);

  // Y una respuesta vacía tiene que dar una línea que se entienda igual, no una que termine
  // en un separador suelto.
  cierto('una respuesta vacía se dice con palabras',
    A.rastroDelFallo('VENTA', 'http-502', '').includes('respuesta vacía'));
}

/* ================================================================== */
console.log('=== 4. las TRES funciones se portan igual ===');
{
  // Acá estaba el hueco: tres copias del mismo bloque, cada una tratando el fallo a su manera.
  const casos = [
    ['avisarVenta', (red) => A.avisarVenta(PEDIDO, ENV, red)],
    ['avisarRevisar', (red) => A.avisarRevisar(PEDIDO, { motivo: 'monto-no-calza', detalle: 'd' }, ENV, red)],
    ['avisarAvance', (red) => A.avisarAvance(PEDIDO, 'datos', ENV, red)],
  ];

  for (const [nombre, llamar] of casos) {
    const r = await conConsola(() => llamar(redQueFalla(403, RECHAZO_RESEND)));

    falso(`${nombre}: no lanza`, r.lanzo);
    eq(`${nombre}: dice que no pudo`, r.valor, false);

    // ⚠️ LA ASERCIÓN QUE CIERRA EL HUECO. Antes el fallo salía por console.log, mezclado con
    // las invocaciones normales, y sin el cuerpo de la respuesta.
    cierto(`${nombre}: el fallo queda a nivel de error`, r.error.includes('domain is not verified'));
    cierto(`${nombre}: con el código HTTP`, r.error.includes('http-403'));
    cierto(`${nombre}: y diciendo de qué pedido`, r.error.includes(PREFIJO));
    eq(`${nombre}: una sola línea por fallo`, r.errores.length, 1);
    // Y no puede quedar ADEMÁS en el nivel normal: entonces buscar por nivel no serviría.
    falso(`${nombre}: no se repite en el nivel normal`, /FALL|not verified/.test(r.log));

    // Las reglas de privacidad valen en el registro igual que en el aviso. Se comprueba con
    // una respuesta que DEVUELVE el id entero: con la respuesta real no se podría distinguir
    // un recorte que funciona de un id que nunca estuvo ahí.
    const conEco = await conConsola(() => llamar(redQueFalla(400, `rechazado: ${ID}`)));
    falso(`${nombre}: el id entero no queda en el registro`, conEco.error.includes(ID));
    cierto(`${nombre}: pero el rechazo sí queda`, conEco.error.includes('rechazado'));
    falso(`${nombre}: ni el correo del comprador`, r.error.includes(PEDIDO.correo));

    // Caída de red: no hay código HTTP y el rastro tiene que salir igual.
    const caida = await conConsola(() => llamar(async () => { throw new Error('la red se cayó'); }));
    falso(`${nombre}: una caída de red tampoco lanza`, caida.lanzo);
    eq(`${nombre}: y dice que no pudo`, caida.valor, false);
    cierto(`${nombre}: la caída deja rastro de error`, caida.error.includes('la red se cayó'));
    cierto(`${nombre}: y también nombra el pedido`, caida.error.includes(PREFIJO));

    // Una respuesta de error SIN cuerpo legible es la forma que usan varias pruebas viejas
    // ({ ok: false, status }) y la que daría un proveedor mudo. No puede reventar el rastro.
    const muda = await conConsola(() => llamar(async () => ({ ok: false, status: 500 })));
    falso(`${nombre}: una respuesta muda no lanza`, muda.lanzo);
    eq(`${nombre}: y dice que no pudo`, muda.valor, false);
    cierto(`${nombre}: y deja rastro igual`, muda.error.includes('http-500'));

    // Y el camino bueno sigue siendo bueno: si sale, no se ensucia el nivel de error.
    const bien = await conConsola(() => llamar(async () => ({ ok: true, status: 200 })));
    eq(`${nombre}: cuando sale, dice que salió`, bien.valor, true);
    eq(`${nombre}: y no deja nada a nivel de error`, bien.errores.length, 0);
    cierto(`${nombre}: deja constancia de que salió`, bien.log.includes(PREFIJO));

    // ── Y QUE SALGA POR DONDE CORRESPONDE ───────────────────────────────────────────────
    const r5 = redQueAcepta();
    await conConsola(() => llamar(r5.red));
    eq(`${nombre}: le habla a Resend y a nadie más`, r5.visto.urls, ['https://api.resend.com/emails']);
    cierto(`${nombre}: con la clave del entorno`,
      String(r5.visto.cabeceras[0].Authorization) === `Bearer ${ENV.RESEND_API_KEY}`);
    eq(`${nombre}: a la casilla del negocio`, r5.visto.cuerpos[0].to, ['hola@spindlelab.cl']);
    eq(`${nombre}: desde el remitente verificado`, r5.visto.cuerpos[0].from, C.REMITENTE);
    falso(`${nombre}: sin el id entero en lo que viaja`, JSON.stringify(r5.visto.cuerpos[0]).includes(ID));

    // ── LA CLAVE QUE NO ESTÁ ────────────────────────────────────────────────────────────
    //
    // Es el modo de fallar más barato —una variable sin cargar en el panel— y el que más se
    // parece al silencio de los últimos meses: todo se ve bien y no llega nada. Tiene que
    // quedar a nivel de error, no en un `log` suelto.
    for (const [comoSeLlama, entorno] of [['sin env', undefined], ['sin la clave', {}], ['clave en blanco', { RESEND_API_KEY: '   ' }]]) {
      const red = redQueAcepta();
      const sinClave = await conConsola(() => {
        const l = { avisarVenta: () => A.avisarVenta(PEDIDO, entorno, red.red),
          avisarRevisar: () => A.avisarRevisar(PEDIDO, { motivo: 'm' }, entorno, red.red),
          avisarAvance: () => A.avisarAvance(PEDIDO, 'datos', entorno, red.red) };
        return l[nombre]();
      });
      falso(`${nombre}: ${comoSeLlama} no lanza`, sinClave.lanzo);
      eq(`${nombre}: ${comoSeLlama} dice que no pudo`, sinClave.valor, false);
      eq(`${nombre}: ${comoSeLlama} no llama a la red`, red.visto.urls.length, 0);
      cierto(`${nombre}: ${comoSeLlama} queda a nivel de error`, sinClave.errores.length === 1);
      cierto(`${nombre}: ${comoSeLlama} dice que falta la clave`, /RESEND_API_KEY/.test(sinClave.error));
      cierto(`${nombre}: ${comoSeLlama} nombra el pedido`, sinClave.error.includes(PREFIJO));
      cierto(`${nombre}: ${comoSeLlama} no se lee como pasajero`, /NO ES PASAJERO/.test(sinClave.error));
    }
  }

  // Sin pedido no hay nada que avisar, y eso no es un fallo que reportar.
  const sinPedido = await conConsola(async () => [
    await A.avisarVenta(null, ENV, async () => { throw new Error('no debería llamarse'); }),
    await A.avisarRevisar({}, {}, ENV, async () => { throw new Error('no debería llamarse'); }),
    await A.avisarAvance(undefined, 'datos', ENV, async () => { throw new Error('no debería llamarse'); }),
  ]);
  eq('sin pedido los tres dicen que no', sinPedido.valor, [false, false, false]);
  eq('y no ensucian el registro de errores', sinPedido.errores.length, 0);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
