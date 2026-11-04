/**
 * Los tres huecos entre que alguien paga y recibe lo que compró.
 *
 *   VYC_REPO=/Users/ramon/vyc-ley21719 node prueba-contrato-y-borrador.mjs
 *
 * ── POR QUÉ EXISTE (3-nov-2026) ─────────────────────────────────────────────────────────
 *
 * Los tres salen de la auditoría de hoy y de la investigación legal, y los tres viven en el
 * mismo tramo: el pago entró, el trabajo se hace, y la persona del otro lado no recibe lo que
 * la ley obliga a darle ni lo que pagó.
 *
 *   1. LA CONFIRMACIÓN ESCRITA NO DECÍA QUÉ SE COMPRÓ. El artículo 12 A de la Ley 19.496
 *      obliga a mandar, una vez perfeccionado el contrato, una «confirmación escrita» con
 *      «una copia íntegra, clara y legible del contrato». El correo que salía al confirmarse
 *      el pago daba el monto, el enlace y los pasos siguientes, y nada del contrato. Y el
 *      artículo 3° bis dice que si esa confirmación no se manda, el plazo de retracto no es
 *      de 10 días sino de 90: la omisión multiplicaba por nueve la exposición de cada venta.
 *
 *   2. NADIE LE AVISABA AL CLIENTE QUE EL TRABAJO EMPEZÓ. El artículo 5 del Decreto 52 de
 *      2024 del Ministerio de Economía dice que la prestación de un servicio contratado a
 *      distancia se entiende iniciada «desde el momento en que el proveedor notifique esta
 *      circunstancia al consumidor». O sea que la ventana de retracto seguía abierta mientras
 *      le trabajábamos el sitio, porque el aviso no existía en ninguna línea del repo.
 *
 *   3. EL BORRADOR DE LA POLÍTICA NO LE LLEGABA POR NINGÚN CAMINO. El documento central del
 *      kit. El correo de cierre no lleva adjuntos, no había columna que lo guardara, y la
 *      pantalla afirmaba «lo que dejamos hecho» sin mostrar lo único que se dejó hecho.
 *
 * Lo que esta batería cuida, más allá de que las funciones existan: que lo que el correo
 * afirma sea VERDAD, que la fecha del aviso no se escriba sin correo detrás, y que el
 * borrador no pueda volver a quedarse sin camino.
 */

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import { rutaEnElRepo } from './rutas.mjs';

const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const E = await import(rutaEnElRepo('verificaycumple/functions/api/etapas.js', 'ETAPAS_JS'));
const C = await import(rutaEnElRepo('verificaycumple/functions/api/correo.js', 'CORREO_JS'));
const EN = await import(rutaEnElRepo('verificaycumple/functions/api/entregar.js', 'ENTREGAR_JS'));
const I = await import(rutaEnElRepo('verificaycumple/functions/api/intake.js', 'INTAKE_JS'));
const AVISO = await import(rutaEnElRepo('verificaycumple/functions/api/aviso.js', 'AVISO_JS'));
const HTML = fs.readFileSync(
  rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8');
const TERMINOS = fs.readFileSync(
  rutaEnElRepo('verificaycumple/public/terminos/index.html', 'VYC_TERMINOS_HTML'), 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

function comoD1(sq) {
  return { prepare(sql) { const st = sq.prepare(sql); let a = []; const o = {
    bind(...x) { a = x; return o; },
    async run() { const r = st.run(...a); return { meta: { changes: Number(r.changes) } }; },
    async first() { return st.get(...a) ?? null; },
    async all() { return { results: st.all(...a) }; } }; return o; } };
}

/** El texto visible de una página, sin etiquetas ni entidades, para buscar frases en él. */
function textoPlano(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&laquo;|&raquo;/g, '"')
    .replace(/\s+/g, ' ');
}
const TERMINOS_TEXTO = textoPlano(TERMINOS);

const BORRADOR = [
  'POLÍTICA DE PRIVACIDAD DE CLÍNICA EJEMPLO SPA',
  '',
  '1. Quién trata tus datos. Clínica Ejemplo SpA, RUT 76.086.428-5, Av. Siempre Viva 742.',
  '2. Qué datos tratamos y para qué. Los que escribes en el formulario de contacto, para',
  '   responderte, y los de navegación cuando aceptas las cookies de medición.',
  '3. Base de licitud de cada tratamiento.',
  '4. Por cuánto tiempo los guardamos y cuándo los borramos.',
  '5. Con quién los compartimos, y si salen de Chile.',
  '6. Tus derechos: acceso, rectificación, supresión, oposición y portabilidad, y el correo',
  '   por el que los ejerces.',
].join('\n');

const ID = 'vyc_' + 'f'.repeat(32);
const ID_POL = 'vyc_' + 'b'.repeat(32);
const INFORME = { rapido: { puntaje: 30 }, profundo: { puntaje: 41 } };
const CLAVE = 'c'.repeat(64);

/**
 * La base con un pedido pagado. `senales` decide de qué tipo de comprador se trata: con `cmp`
 * hay que entrarle al sitio, con solo `politica` no.
 */
async function basePagada(id = ID, senales = ['cmp', 'carga'], fuera = ['aviso']) {
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  const db = comoD1(sq);
  await A.crearPedido(db, {
    id, dominio: 'ejemplo.cl', url_medida: 'https://ejemplo.cl/', correo: 'cliente@ejemplo.cl',
    senales_contratadas: senales, senales_fuera: fuera,
    informe_json: JSON.stringify(INFORME), monto_neto: 149000, monto_total: 177310,
  });
  await A.marcarEstado(db, id, 'creado', 'pagado', { pagado_en: '2026-11-03T12:00:00.000Z' });
  const crudo = () => sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);
  return { db, sq, crudo };
}

/** La red fingida. Guarda cada mensaje y contesta lo que se le diga. */
function conRed(contesta = () => ({ ok: true, status: 200 })) {
  const antes = globalThis.fetch;
  const envios = [];
  globalThis.fetch = async (u, o) => {
    let cuerpo = null;
    try { cuerpo = JSON.parse(String((o && o.body) || '{}')); } catch { cuerpo = null; }
    envios.push({ host: new URL(String(u)).host, cuerpo: cuerpo || {} });
    const r = contesta(envios.length);
    if (r.lanza) throw new Error('conexión cortada');
    return { ok: r.ok, status: r.status, json: async () => ({}), text: async () => '' };
/* ⚠️ EL DESTINO DE LOS AVISOS SE LEE DE `aviso.js`, NO SE ESCRIBE ACÁ (4-nov-2026).
 *
 * Estaba escrito a mano, la dirección literal, en SEIS archivos de prueba. El día que
 * cambió —Gmail estaba mandando esos avisos a spam porque iban del subdominio de envío al
 * propio dominio de Workspace— los seis se pusieron rojos a la vez, y ninguno estaba
 * midiendo un defecto: todos separaban «aviso interno» de «correo al cliente» por una
 * dirección copiada.
 *
 * Leerla de la constante hace que ese cambio no toque ninguna prueba, y que la prueba siga
 * hablando del HECHO —esto es el aviso interno— en vez de un valor que puede mudarse. */
  };
  const paraHola = (x) => JSON.stringify((x.cuerpo && x.cuerpo.to) || []) === JSON.stringify([AVISO.DESTINO_AVISOS]);
  return {
    envios,
    get alCliente() { return envios.filter((x) => !paraHola(x)); },
    get internos() { return envios.filter(paraHola); },
    soltar() { globalThis.fetch = antes; },
  };
}

const postIntake = (cuerpo, db) => {
  const fondo = [];
  return { fondo, p: I.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/intake', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
    }),
    env: { VYC_PEDIDOS: db, RESEND_API_KEY: 'k' }, waitUntil: (x) => fondo.push(x) }) };
};

/**
 * Un cierre por el endpoint de verdad.
 *
 * ⚠️ ATRAPA LA EXCEPCIÓN, y no es cortesía con el código. Una mutación que le quite la guarda
 * del borrador hace que la Function siga de largo con `null` y lance; sin este try, la
 * promesa se rechaza, el archivo ABORTA en esta línea y las secciones que nombran el
 * problema no corren. Lo que se devuelve entonces es un estado imposible (0), que no calza
 * con ninguna aserción y las hace acusar todas en vez de callarlas.
 */
const postEntregar = async (cuerpo, db) => {
  try {
    return await EN.onRequestPost({
      request: new Request('https://verifica.spindlelab.cl/api/entregar', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${CLAVE}` }),
        body: JSON.stringify(cuerpo),
      }),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE, RESEND_API_KEY: 'k' },
    });
  } catch (e) {
    console.log(`  (el endpoint de entrega LANZÓ: ${e && e.message})`);
    return { status: 0, json: async () => ({ motivo: `lanzo:${e && e.message}` }) };
  }
};

const DATOS = { razon_social: 'Clínica Ejemplo SpA', rut: '76.086.428-5',
  giro: 'Servicios médicos', direccion: 'Av. Siempre Viva 742' };

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 1 · LA CONFIRMACIÓN ESCRITA DICE QUÉ SE COMPRÓ (art. 12 A) ===\n');
{
  const pedido = {
    id: ID, dominio: 'ejemplo.cl', correo: 'cliente@ejemplo.cl',
    url_medida: 'https://ejemplo.cl/', monto_total: 177310,
    // ⚠️ UNA FECHA QUE NO ES HOY, A PROPÓSITO. Con la de hoy, la aserción de más abajo pasaba
    // igual con el dato del pedido y con un `new Date()` escrito a mano: habría defendido el
    // defecto de poner en la confirmación la fecha en que se armó el mensaje en vez de la del
    // contrato. Es la trampa de la aserción copiada del código, con otra forma.
    pagado_en: '2026-10-28T12:00:00.000Z',
    senales_contratadas: ['cmp', 'carga'], senales_fuera: ['aviso'],
  };
  const m = C.correoDePago(pedido);

  // ═══ LO QUE FALTABA Y ES LO QUE LA LEY PIDE ═══
  //
  // Antes este correo decía el monto, el enlace y los pasos. No decía qué se compró, y por eso
  // no era la confirmación escrita del artículo 12 A.
  cierto('nombra lo contratado con su título', m.text.includes(E.TITULOS.cmp));
  cierto('y la segunda señal también', m.text.includes(E.TITULOS.carga));
  falso('no muestra ids crudos', /· cmp\b|· carga\b/.test(m.text));
  cierto('dice lo que queda fuera', m.text.includes(E.TITULOS.aviso));
  cierto('dice el monto pagado', m.text.includes('$177.310'));
  cierto('y que es con IVA incluido', /IVA incluido/.test(m.text));
  cierto('dice el sitio', m.text.includes('ejemplo.cl'));
  cierto('dice la página que se midió', m.text.includes('https://ejemplo.cl/'));
  // La fecha es la del PAGO, no la de hoy: es un dato del contrato.
  cierto('y la fecha del contrato, que es la del pago y no la de hoy',
    /28 de octubre de 2026/.test(m.text));

  // El borrador se anuncia como lo que es, desde el primer correo.
  cierto('anuncia el borrador de la política', /borrador de tu política/i.test(m.text));
  cierto('y dice que es un BORRADOR para su abogado',
    m.text.includes(C.EL_BORRADOR_ES_BORRADOR));

  // ═══ LAS CONDICIONES, EN EL CUERPO Y NO SOLO COMO ENLACE ═══
  //
  // Un enlace apunta a la página de hoy, y las propias condiciones dicen que lo que le aplica
  // es la versión vigente el día que compró. «Copia íntegra» no se cumple con un puntero a
  // algo que podemos editar después.
  cierto('lleva el enlace a las condiciones completas', m.text.includes(C.ENLACE_TERMINOS));
  cierto('con su número de versión', m.text.includes(P.VERSION_TERMINOS));
  for (const [titulo] of C.CONDICIONES_ESENCIALES) {
    cierto(`y la cláusula «${titulo}» va en el cuerpo`, m.text.includes(titulo));
  }
  // Las cuatro cosas que decidien qué puede HACER, nombradas: retractarse, hasta cuándo,
  // cuánto le devuelven y en cuánto tiempo.
  cierto('dice el plazo de retracto', /10 días corridos/.test(m.text));
  cierto('dice que no se excluye el retracto', /No lo excluimos/.test(m.text));
  cierto('dice que el trabajo empieza cuando se avisa',
    /mpieza cuando te avisamos/.test(m.text));
  cierto('dice que hasta ese aviso el retracto sigue abierto',
    /derecho a retracto sigue abierto/.test(m.text));
  cierto('dice que se devuelve el 100%', /100%/.test(m.text));
  cierto('y en cuánto tiempo', /45 días/.test(m.text));
  cierto('y se dice que este correo ES la confirmación',
    /confirmación escrita que la ley nos obliga/.test(m.text));

  // El HTML no puede quedar atrás del texto: hay clientes que solo muestran uno.
  const htmlPlano = textoPlano(m.html);
  cierto('el HTML también nombra lo contratado', htmlPlano.includes(E.TITULOS.cmp));
  cierto('el HTML también lleva el monto', htmlPlano.includes('$177.310'));
  cierto('el HTML también lleva el enlace a las condiciones', m.html.includes(C.ENLACE_TERMINOS));
  for (const [titulo] of C.CONDICIONES_ESENCIALES) {
    cierto(`el HTML también lleva «${titulo}»`, htmlPlano.includes(titulo));
  }
  falso('y no carga nada de fuera', /<img|<script|@font-face|url\(http/i.test(m.html));
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 1 bis · EL RESUMEN Y LA PÁGINA PUBLICADA SON EL MISMO HECHO ===\n');
{
  /* ⚠️ ESTE ES EL ÚNICO LUGAR DONDE SE TOCAN.
   *
   * `CONDICIONES_ESENCIALES` resume lo que dice `public/terminos/index.html`. Son dos copias,
   * y dos copias del mismo hecho se contradicen en silencio: si alguien sube el plazo de
   * devolución en la página y no acá, el correo del comprador le sigue prometiendo el viejo y
   * cada copia es coherente consigo misma. Es exactamente el guardia que ya existe entre
   * `VERSION_POLITICA` y la página de privacidad.
   */
  const hallada = /Versi[oó]n\s+([0-9]+\.[0-9]+)/i.exec(TERMINOS_TEXTO);
  cierto('la página de condiciones publica un número de versión', Boolean(hallada));
  eq('y es el mismo que afirma el correo', hallada && hallada[1], P.VERSION_TERMINOS);

  // Cada cifra y cada nombre que el resumen afirma tiene que estar en la página publicada.
  // Si el resumen inventara un número, acá se cae.
  const AFIRMACIONES = [
    'SpindleLab SpA', '78.474.925-8', '10 días corridos', '45 días', '90 días corridos',
    'SERNAC', 'Ley 19.496', 'derecho a retracto',
  ];
  const resumen = C.CONDICIONES_ESENCIALES.map(([t, c]) => `${t}. ${c}`).join(' ');
  for (const frase of AFIRMACIONES) {
    cierto(`«${frase}» está en el resumen del correo`, resumen.includes(frase));
    cierto(`y también en la página publicada`, TERMINOS_TEXTO.includes(frase));
  }

  // Y al revés en lo que más importa: las dos dicen lo mismo sobre cuándo empieza el trabajo,
  // que es el hueco 2 de esta misma batería.
  cierto('la página dice que la prestación empieza con el aviso',
    /empieza cuando te avisamos que empez/i.test(TERMINOS_TEXTO));
  cierto('y que queda anotado en la pantalla del pedido',
    /anotado en la pantalla de tu pedido/i.test(TERMINOS_TEXTO));
  // Lo que la página promete sobre el borrador, que es el hueco 3.
  cierto('la página dice que el borrador es un borrador',
    /El borrador es un borrador/i.test(TERMINOS_TEXTO));
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 1 ter · LA FILA CRUDA NO ROMPE LA CONFIRMACIÓN ===\n');
{
  /* Las dos columnas de señales llegan como arreglo cuando el pedido viene hidratado y como
   * TEXTO JSON cuando viene de la consulta de la cola. Un `.map` sobre un string revienta, y
   * eso ya costó un correo de cierre: el error ocurría DESPUÉS de marcar el pedido como
   * entregado, así que el trabajo quedaba hecho y el cierre se caía.
   *
   * Este correo acaba de pasar a leer las mismas dos columnas, así que hereda la trampa. Se
   * comprueba con la fila cruda de verdad, no con un objeto armado a mano.
   */
  const { crudo } = await basePagada();
  const fila = crudo();
  eq('la fila cruda trae las señales como texto', typeof fila.senales_contratadas, 'string');
  let m = null;
  try { m = C.correoDePago(fila); } catch (e) { m = { error: e.message }; }
  falso('y el correo no revienta', m && m.error);
  cierto('y aun así nombra lo contratado con su título',
    Boolean(m && m.text && m.text.includes(E.TITULOS.cmp)));
  cierto('y lo que queda fuera', Boolean(m && m.text && m.text.includes(E.TITULOS.aviso)));

  // Un pedido sin nada fuera no deja un rótulo huérfano hablando de una lista vacía.
  //
  // ⚠️ CON LA MISMA GUARDA, y por lo mismo: una mutación que haga reventar el armado del
  // correo abortaría el archivo acá y las secciones 2 y 3 —que son la mitad de esta batería—
  // no llegarían a correr. Una prueba que revienta acusa una sola vez.
  const { crudo: crudoPol } = await basePagada(ID_POL, ['politica'], []);
  let mPol = null;
  try { mPol = C.correoDePago(crudoPol()); } catch { mPol = null; }
  const textoPol = (mPol && mPol.text) || '';
  falso('sin señales fuera, no se anuncia lo que queda fuera',
    /Queda fuera del kit/.test(textoPol));
  cierto('pero el borrador se anuncia igual, porque todo kit lo lleva',
    /borrador de tu política/i.test(textoPol));
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 2 · CUÁNDO EMPIEZA EL TRABAJO, Y QUIÉN LO DECIDE ===\n');
{
  /* El instante no es el mismo para los dos tipos de comprador, y por eso la pregunta vive en
   * `etapas.js` y no en el módulo que manda el correo: al que hay que entrarle al sitio le
   * empieza cuando declara el acceso, y al que compró solo el borrador cuando manda los datos
   * de su empresa. Escribir esa regla otra vez en `intake.js` sería la tercera copia de algo
   * que este proyecto ya tuvo que unificar dos veces.
   */
  const conGestor = (extra) => ({ estado: 'pagado', senales_contratadas: ['cmp'], ...extra });
  const soloPol = (extra) => ({ estado: 'pagado', senales_contratadas: ['politica'], ...extra });

  falso('recién pagado y sin datos: todavía no empieza', E.yaEmpezoElTrabajo(conGestor({})));
  falso('con los datos pero sin el acceso: tampoco',
    E.yaEmpezoElTrabajo(conGestor({ razon_social: 'Ejemplo SpA' })));
  cierto('con el acceso declarado: ahí empieza',
    E.yaEmpezoElTrabajo(conGestor({ razon_social: 'Ejemplo SpA', acceso_recibido_en: 'x' })));

  falso('el de solo-política sin datos: todavía no', E.yaEmpezoElTrabajo(soloPol({})));
  cierto('el de solo-política con sus datos: ahí empieza, sin ningún acceso',
    E.yaEmpezoElTrabajo(soloPol({ razon_social: 'Ejemplo SpA' })));

  falso('sin pagar no empieza nada',
    E.yaEmpezoElTrabajo({ estado: 'creado', senales_contratadas: ['cmp'], razon_social: 'X' }));
  // ⚠️ `entregado` NO cuenta, y no porque el trabajo no haya empezado: esto decide si MANDAR
  // el aviso de inicio, y mandarlo junto con el cierre no avisa nada.
  falso('y un pedido ya entregado no vuelve a empezar',
    E.yaEmpezoElTrabajo({ estado: 'entregado', senales_contratadas: ['cmp'],
      razon_social: 'X', acceso_recibido_en: 'x' }));
  eq('sin pedido, no', E.yaEmpezoElTrabajo(null), false);
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 2 bis · EL AVISO DE INICIO SALE, Y RECIÉN ENTONCES SE ANOTA ===\n');
{
  const { db, sq, crudo } = await basePagada();
  const red = conRed();
  let x = postIntake({ id: ID, ...DATOS, plataforma: 'wordpress' }, db);
  await x.p; await Promise.all(x.fondo);
  // Los datos de su empresa no arrancan nada: a este hay que entrarle al sitio.
  eq('mandar los datos no arranca la prestación', red.alCliente.length, 0);
  eq('y no se anota ninguna fecha', crudo().inicio_avisado_en, null);

  x = postIntake({ id: ID, acceso_listo: true }, db);
  const r = await x.p; await Promise.all(x.fondo);
  red.soltar();
  const j = (await r.json()) || {};

  eq('declarar el acceso sí la arranca', red.alCliente.length, 1);
  const av = (red.alCliente[0] || { cuerpo: {} }).cuerpo;
  eq('y el aviso va a su correo', av.to, ['cliente@ejemplo.cl']);
  cierto('el asunto dice que empezamos', /Empezamos/i.test(av.subject || ''));
  cierto('el aviso dice la fecha en castellano', /noviembre de 2026/.test(av.text || ''));
  cierto('explica que de este aviso depende su retracto',
    /derecho a retractarte/.test(av.text || ''));
  cierto('y le dice qué hacer si igual quiere parar',
    /quieres parar/.test(av.text || ''));
  cierto('el HTML dice lo mismo', /Empezamos a trabajar/.test(textoPlano(av.html || '')));

  const anotado = crudo().inicio_avisado_en;
  cierto('la fecha queda anotada', Boolean(anotado));
  eq('y es la del aviso que salió', j.aviso_de_inicio, 'ok');
  eq('la pantalla la recibe en la misma respuesta', (j.pedido || {}).inicio_avisado_en, anotado);

  // No se repite: un segundo envío no le manda el aviso otra vez ni mueve la fecha.
  const red2 = conRed();
  x = postIntake({ id: ID, acceso_listo: true }, db);
  await x.p; await Promise.all(x.fondo);
  red2.soltar();
  eq('no se le avisa dos veces', red2.alCliente.length, 0);
  eq('y la fecha no se mueve', crudo().inicio_avisado_en, anotado);
  void sq;
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 2 ter · UN CORREO QUE NO SALE NO DEJA UNA CONSTANCIA FALSA ===\n');
{
  /* ═══ LA ASERCIÓN QUE DEFINE ESTA SECCIÓN ═══
   *
   * El orden es primero el correo y después la fecha, y es al revés de lo que sale natural.
   * Si se anotara antes, un correo que falla dejaría escrito que avisamos cuando no avisamos,
   * y con esa fecha le estaríamos cerrando el plazo de retracto a alguien que nunca se
   * enteró. Es justo lo que el artículo 5 del Decreto 52 viene a impedir.
   */
  const { db, crudo } = await basePagada();
  // ⚠️ LA RED FINGIDA SE PONE ANTES DEL PRIMER ENVÍO. Sin esto el aviso interno de este
  // intake salía de verdad a api.resend.com: la prueba quedaba en verde y por el camino le
  // pegaba a un tercero. Es el mismo descuido que ya se corrigió en `prueba-entrega`.
  let red = conRed();
  let x = postIntake({ id: ID, ...DATOS, plataforma: 'wordpress' }, db);
  await x.p; await Promise.all(x.fondo);
  red.soltar();

  // Resend rechaza el envío.
  red = conRed(() => ({ ok: false, status: 500 }));
  x = postIntake({ id: ID, acceso_listo: true }, db);
  let r = await x.p; await Promise.all(x.fondo);
  red.soltar();
  let j = (await r.json()) || {};
  eq('el intake del cliente igual se guarda', r.status, 200);
  cierto('y su pedido igual avanza', (j.etapa || {}).etapa === 'en-curso');
  eq('pero NO queda anotado que se le avisó', crudo().inicio_avisado_en, null);
  eq('y se dice por qué', j.aviso_de_inicio, 'el-correo-no-salio');

  // La red revienta en vez de contestar, que es el modo de falla real: el corte de tiempo de
  // los 8 segundos, el DNS caído. Este camino no lo probaba nada.
  red = conRed(() => ({ lanza: true }));
  x = postIntake({ id: ID, acceso_listo: true }, db);
  r = await x.p; await Promise.all(x.fondo);
  red.soltar();
  j = (await r.json()) || {};
  eq('con la red reventada el intake tampoco se cae', r.status, 200);
  eq('y sigue sin constancia', crudo().inicio_avisado_en, null);

  // Y cuando por fin sale, se anota: el reintento es el siguiente envío del formulario.
  red = conRed();
  x = postIntake({ id: ID, acceso_listo: true }, db);
  r = await x.p; await Promise.all(x.fondo);
  red.soltar();
  eq('el envío siguiente lo vuelve a intentar', red.alCliente.length, 1);
  cierto('y ahí sí queda anotado', Boolean(crudo().inicio_avisado_en));
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 2 quater · AL DE SOLO-POLÍTICA SE LE AVISA SIN PEDIRLE NINGÚN ACCESO ===\n');
{
  const { db, crudo } = await basePagada(ID_POL, ['politica'], []);
  const red = conRed();
  const x = postIntake({ id: ID_POL, ...DATOS }, db);
  const r = await x.p; await Promise.all(x.fondo);
  red.soltar();
  const j = (await r.json()) || {};

  eq('con sus datos el pedido pasa a redactando', (j.etapa || {}).etapa, 'redactando');
  eq('y ahí mismo se le avisa que empezamos', red.alCliente.length, 1);
  const av = (red.alCliente[0] || { cuerpo: {} }).cuerpo;
  cierto('queda anotado', Boolean(crudo().inicio_avisado_en));

  // ⚠️ No se le afirma un trabajo sobre su sitio: a él no se le toca el sitio, se le redacta
  // un texto. Es la misma clase de falsedad que el correo de cierre ya tuvo que corregir.
  falso('no se le dice que empezamos a trabajar en su sitio',
    /Empezamos a trabajar en/.test(av.text || ''));
  cierto('se le dice que empezamos a redactar su borrador',
    /Empezamos a redactar el borrador/.test(av.text || ''));
  falso('y no se le menciona ningún acceso', /acceso/i.test(av.text || ''));
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 2 quinquies · LA FECHA DEL AVISO SE ESCRIBE UNA SOLA VEZ Y SOBRE UN PAGADO ===\n');
{
  const { db, sq, crudo } = await basePagada();

  const primera = '2026-11-03T10:00:00.000Z';
  const segunda = '2026-11-03T20:00:00.000Z';
  eq('la primera se escribe', (await A.marcarInicioAvisado(db, ID, primera)).anotado, true);
  // ⚠️ SE QUEDA CON LA MÁS TEMPRANA, y no es un detalle: la fecha posterior le cerraría el
  // plazo de retracto más tarde en el papel y antes en la realidad. La que vale es la que de
  // verdad ocurrió primero.
  eq('la segunda no la pisa', (await A.marcarInicioAvisado(db, ID, segunda)).anotado, false);
  eq('y queda la primera', crudo().inicio_avisado_en, primera);

  // Sobre un pedido que no está pagado no se escribe: avisar el inicio de una prestación que
  // nadie compró no significa nada, y dejar la fecha arrancaría su plazo antes de existir.
  await A.crearPedido(db, { id: 'vyc_' + '9'.repeat(32), dominio: 'otro.cl', correo: 'o@e.cl',
    senales_contratadas: ['cmp'], senales_fuera: [], informe_json: '{}',
    monto_neto: 1, monto_total: 1 });
  eq('un pedido sin pagar no acepta la fecha',
    (await A.marcarInicioAvisado(db, 'vyc_' + '9'.repeat(32), primera)).anotado, false);
  eq('y la columna sigue vacía',
    sq.prepare('SELECT inicio_avisado_en i FROM pedidos WHERE id=?').get('vyc_' + '9'.repeat(32)).i,
    null);

  eq('sin id no se escribe nada', (await A.marcarInicioAvisado(db, '', primera)).anotado, false);
  eq('sin fecha tampoco', (await A.marcarInicioAvisado(db, ID, null)).anotado, false);
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 2 sexies · Y SE VE EN LA PANTALLA, CON SU HORA ===\n');
{
  // Las condiciones de venta prometen, literal, que el aviso queda anotado en la pantalla del
  // pedido con su fecha y su hora. Si la columna no viajara, la promesa sería falsa.
  const vista = A.vistaPublica({ id: ID, estado: 'pagado', senales_contratadas: ['cmp'],
    inicio_avisado_en: '2026-11-03T13:30:00.000Z' });
  eq('la vista pública lleva la fecha del aviso',
    vista.inicio_avisado_en, '2026-11-03T13:30:00.000Z');

  cierto('la pantalla dibuja el dato', /Te avisamos que empezamos/.test(HTML));
  cierto('leyéndolo del pedido', /p\.inicio_avisado_en/.test(HTML));
  // Con hora: el plazo se cuenta desde un instante, no desde un día.
  cierto('con hora y no solo con fecha',
    /inicio_avisado_en[\s\S]{0,120}fechaYHora\(p\.inicio_avisado_en\)/.test(HTML));
  cierto('y existe la función que la formatea con hora',
    /function fechaYHora\([\s\S]{0,400}hour: '2-digit'/.test(HTML));
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 3 · SIN BORRADOR NO SE CIERRA UN PEDIDO ===\n');
{
  /* ═══ EL HUECO MÁS GRANDE DE LOS TRES ═══
   *
   * Cerrar sin borrador deja al producto afirmando por escrito, tres veces, algo que no
   * entregó: el correo de pago le prometió el borrador, las condiciones de venta lo listan
   * dentro del kit, y el correo de cierre le dice que lo tiene que revisar su abogado. Así que
   * no es un descuido que se avise: es un 409.
   */
  const { db, crudo } = await basePagada();
  const sinNada = await postEntregar({ id: ID }, db);
  eq('cerrar sin borrador: 409', sinNada.status, 409);
  eq('y el motivo lo nombra', (await sinNada.json()).motivo, 'falta-borrador');
  eq('el pedido NO se movió', crudo().estado, 'pagado');

  const corto = await postEntregar({ id: ID, borrador_politica: 'listo' }, db);
  eq('un borrador de cuatro palabras no es un borrador: 400', corto.status, 400);
  eq('y se dice cuál es el mínimo', (await corto.json()).motivo, 'borrador-muy-corto');
  eq('tampoco se movió', crudo().estado, 'pagado');

  const largo = await postEntregar({ id: ID, borrador_politica: 'x'.repeat(EN.MAXIMO_BORRADOR + 1) }, db);
  eq('uno que no cabe en un correo: 400', largo.status, 400);
  eq('y se dice', (await largo.json()).motivo, 'borrador-muy-largo');

  // Un espacio en blanco no cuenta como texto.
  const vacio = await postEntregar({ id: ID, borrador_politica: '   \n\n  ' }, db);
  eq('ni espacios en blanco', vacio.status, 409);
  eq('se trata igual que no mandarlo', (await vacio.json()).motivo, 'falta-borrador');

  // Y el que no es texto tampoco.
  const raro = await postEntregar({ id: ID, borrador_politica: { texto: BORRADOR } }, db);
  eq('ni un objeto', raro.status, 409);
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 3 bis · CON BORRADOR: SE GUARDA, SE MUESTRA Y SE MANDA ===\n');
{
  const { db, crudo } = await basePagada();
  // La red fingida, desde el primer envío: ver la nota de la sección 2 ter.
  let red = conRed();
  let x = postIntake({ id: ID, ...DATOS, plataforma: 'wordpress' }, db);
  await x.p; await Promise.all(x.fondo);
  x = postIntake({ id: ID, acceso_listo: true }, db);
  await x.p; await Promise.all(x.fondo);
  red.soltar();

  red = conRed();
  const r = await postEntregar({
    id: ID, informe_final: { profundo: { puntaje: 88 } }, borrador_politica: BORRADOR,
  }, db);
  red.soltar();
  const j = (await r.json()) || {};

  eq('el cierre se acepta', r.status, 200);
  cierto('y queda entregado', j.entregado);
  eq('el borrador queda guardado con el pedido', crudo().borrador_politica, BORRADOR);
  eq('y quien entrega ve que quedó', j.borrador_guardado, BORRADOR.length);
  // ⚠️ El camino que NO depende de que un correo salga.
  eq('viaja a la pantalla del cliente', (j.pedido || {}).borrador_politica, BORRADOR);

  // Y va en el correo de cierre, con la advertencia antes Y después del texto.
  const m = (red.alCliente[0] || { cuerpo: {} }).cuerpo;
  cierto('el correo de cierre lleva el borrador entero',
    String(m.text || '').includes(BORRADOR));
  const partes = String(m.text || '').split(BORRADOR);
  eq('y el borrador va una sola vez', partes.length, 2);
  cierto('la advertencia va ANTES del texto', partes[0].includes(C.EL_BORRADOR_ES_BORRADOR));
  // ⚠️ Y DESPUÉS, que no es insistencia: quien copie el texto selecciona desde donde empieza,
  // así que una advertencia que estuviera solo arriba se queda fuera de lo que pega en su
  // sitio.
  cierto('y también DESPUÉS', partes[1].includes(C.EL_BORRADOR_ES_BORRADOR));
  cierto('el HTML también lo lleva', textoPlano(m.html || '').includes('Quién trata tus datos'));
  cierto('y el HTML también advierte dos veces',
    textoPlano(m.html || '').split(C.EL_BORRADOR_ES_BORRADOR).length === 3);
  falso('el HTML del cierre no carga nada de fuera',
    /<img|<script|@font-face|url\(http/i.test(String(m.html || '')));

  // Entregar otra vez no vuelve a pedir el borrador ni manda otro correo.
  const red3 = conRed();
  const otra = await postEntregar({ id: ID }, db);
  red3.soltar();
  const j2 = (await otra.json()) || {};
  eq('un segundo cierre no pide el borrador de nuevo', otra.status, 200);
  cierto('dice que ya estaba', j2.ya_estaba);
  eq('y no manda otro correo', red3.alCliente.length, 0);
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 3 ter · EL TEXTO SE GUARDA LIMPIO, Y SIGUE SIENDO UN DOCUMENTO ===\n');
{
  eq('los saltos de Windows se normalizan',
    EN.interpretarBorrador('uno\r\ndos\rtres'), 'uno\ndos\ntres');
  cierto('los saltos de línea se conservan, que es lo que lo hace un documento',
    EN.interpretarBorrador('uno\n\ndos').includes('\n\n'));
  eq('un byte de control se va', EN.interpretarBorrador('ho\u0000la'), 'hola');
  eq('la tabulación se queda', EN.interpretarBorrador('a\tb'), 'a\tb');
  eq('lo que no es texto no sirve', EN.interpretarBorrador(42), null);
  eq('ni el vacío', EN.interpretarBorrador('   '), null);
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 3 quater · LA PANTALLA LO MUESTRA, CON SUS DOS ADVERTENCIAS ===\n');
{
  cierto('la pantalla dibuja el borrador cuando lo hay', /p\.borrador_politica/.test(HTML));
  cierto('en su propia tarjeta', /El borrador de tu política de privacidad/.test(HTML));
  cierto('en una caja copiable', /data-caja-copiable/.test(HTML));
  cierto('con su botón', /Copiar el borrador/.test(HTML));
  // Y el texto va ESCAPADO: es contenido que escribimos nosotros, pero pasa por la base y se
  // inyecta con innerHTML, así que no puede entrar sin escapar.
  cierto('y escapado', /escapar\(p\.borrador_politica\)/.test(HTML));

  // Las dos advertencias, una antes de la caja y otra después. Se ancla al orden, no al
  // conteo: dos advertencias seguidas arriba dejarían el conteo en dos y el texto pegado en su
  // sitio sin ninguna.
  const tarjeta = HTML.slice(HTML.indexOf('p.borrador_politica'));
  const iAntes = tarjeta.indexOf('aviso-borrador');
  const iCaja = tarjeta.indexOf('data-caja-copiable');
  const iDespues = tarjeta.indexOf('aviso-borrador', iCaja);
  cierto('hay una advertencia antes de la caja', iAntes > 0 && iAntes < iCaja);
  cierto('y otra después', iDespues > iCaja);
  cierto('la de abajo dice que sigue siendo un borrador',
    /sigue[\s\S]{0,30}siendo un borrador/.test(tarjeta));
  cierto('y que no es asesoría legal', /no es asesoría legal/.test(tarjeta.slice(iCaja)));

  /* ⚠️ EL BOTÓN DE COPIAR BUSCABA SU CAJA POR EL NOMBRE DEL ÚNICO TEXTO QUE HABÍA.
   *
   * `montarCopiar` encontraba su caja con `querySelector('[data-texto-reenviar]')`, que es el
   * texto que se le reenvía a quien administra el sitio. El borrador no es eso, así que con el
   * código viejo su botón habría encontrado `caja` en `null` y el clic habría reventado. En
   * pantalla no se ve: el botón no copia, y lo que no copia es lo que la persona compró. Quién
   * lo juzga de verdad es el navegador, en la sección siguiente; esto es el guardia.
   *
   * El `querySelectorAll` es el otro arreglo, y es por lo que viene: hoy las dos cajas no
   * coinciden nunca —el borrador sale en `entregado` y el texto del acceso en `falta-acceso`,
   * que se excluyen— pero el día que coincidan, el segundo botón queda muerto en silencio.
   */
  cierto('cada botón busca su caja por el atributo genérico, no por el del acceso',
    /b\.parentNode\.querySelector\('\[data-caja-copiable\]'\)/.test(HTML));
  falso('y ya no la busca por el nombre del texto para reenviar',
    /parentNode\.querySelector\('\[data-texto-reenviar\]'\)/.test(HTML));
  // ⚠️ ANCLADO A LA LÍNEA QUE RECOGE LOS BOTONES, no a que la palabra aparezca en el archivo.
  // La primera versión de esto fue un `falso(... /querySelector\('\[data-copiar\]'\)/ ...)` y se
  // puso roja sola: el comentario que explica el arreglo CITA el código viejo, así que el
  // regex lo encontraba en la prosa. Un grep no distingue código de comentario.
  cierto('la línea que recoge los botones los recoge todos',
    /var botones = contenido\.querySelectorAll\('\[data-copiar\]'\)/.test(HTML));
  cierto('y el texto para reenviar sigue siendo copiable',
    /data-texto-reenviar data-caja-copiable/.test(HTML));
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 3 quinquies · EL BORRADOR EN UN NAVEGADOR DE VERDAD ===\n');
{
  /* ── POR QUÉ ESTA SECCIÓN, Y POR QUÉ NO ALCANZA LA DE ARRIBA ─────────────────────────────
   *
   * La sección anterior son regex sobre el archivo, y un grep ve el nombre y no el ámbito. El
   * defecto que de verdad había que evitar acá no se ve en ningún nombre: el botón de copiar
   * buscaba su caja con el atributo del texto del acceso, así que en la tarjeta del borrador
   * encontraba `null` y el clic reventaba. El archivo sigue teniendo todas las palabras en su
   * sitio; lo que falla es la ejecución.
   *
   * Así que el juez es el navegador: se levanta la página real contra una API falsa que
   * contesta con lo que contestan las MISMAS funciones del servidor, se mira si el borrador
   * está en pantalla, y se APRIETA el botón para ver si pasa algo.
   *
   * En headless sobre http el portapapeles no está disponible, así que el camino que corre es
   * el de respaldo (`aMano`): selecciona el texto y dice qué apretar. Da igual cuál de los dos
   * corra: los dos escriben en la región de estado, y lo que se mide es que el manejador
   * llegue a ejecutarse. Con el defecto puesto, no escribe nada y `window.onerror` recoge el
   * TypeError.
   */
  const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const http = await import('node:http');
  const os = await import('node:os');
  const path = await import('node:path');
  const { spawn } = await import('node:child_process');

  const CONDUCTOR = `<script>
(function () {
  var reportado = false;
  function reportar(x) {
    if (reportado) return; reportado = true;
    var d = document.createElement('div');
    d.id = 'resultado';
    d.textContent = 'RESULTADO:' + btoa(unescape(encodeURIComponent(JSON.stringify(x))));
    document.body.appendChild(d);
  }
  window.onerror = function (m) { window.__errorJs = String(m); };
  var intentos = 0;
  var esperar = setInterval(function () {
    if (++intentos > 120) { clearInterval(esperar); reportar({ fatal: 'nunca se dibujó el pedido' }); return; }
    var caja = document.querySelector('[data-caja-copiable]');
    if (!caja) return;
    clearInterval(esperar);
    var boton = document.querySelector('[data-copiar]');
    var antes = document.body.innerText;
    /* ⚠️ EL PORTAPAPELES DE CHROME NO ES EL SUJETO DE ESTA PRUEBA (4-nov-2026).
       127.0.0.1 es contexto seguro, así que navigator.clipboard SÍ existe en headless, y su
       promesa tarda lo que quiere: a veces resuelve en 20 ms y a veces no resuelve nunca.
       Contra una espera fija, esta aserción fallaba 4 de cada 6 corridas con el código
       intacto, y mandó a buscar una regresión que no existía.
       Lo que se quiere medir acá es que el MANEJADOR corre y deja un mensaje, no que Chrome
       sepa copiar. Así que el portapapeles se reemplaza por un doble que contesta al instante,
       y el modo se elige desde la URL para recorrer los DOS caminos del manejador —el que
       copia y el de respaldo— en vez de uno al azar. */
    var modo = (location.search.match(/[?&]portapapeles=([a-z]+)/) || [])[1] || 'rechaza';
    try {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: function () {
            return modo === 'acepta'
              ? Promise.resolve()
              : Promise.reject(new Error('doble: el portapapeles rechaza'));
          },
        },
      });
    } catch (e) { window.__sinDoble = String(e); }
    if (boton) boton.click();
    setTimeout(function () {
      var dicho = document.querySelector('.copiado');
      reportar({
        texto: antes,
        enLaCaja: caja.value,
        hayBoton: Boolean(boton),
        modo: modo,
        sinDoble: window.__sinDoble || null,
        seleccionado: caja.selectionEnd - caja.selectionStart,
        dijoAlCopiar: dicho ? dicho.textContent : null,
        avisos: [].slice.call(document.querySelectorAll('.aviso-borrador'))
          .map(function (e) { return e.innerText; }),
        errorJs: window.__errorJs || null,
      });
    }, 300);
  }, 50);
})();
<\/script>`;

  /** La página real, servida contra una API que contesta lo que contesta el servidor. */
  async function enElNavegador(pedidoCrudo, portapapeles = 'rechaza') {
    const etapa = E.etapaDelPedido(pedidoCrudo);
    const cuerpo = {
      ok: true, pedido: A.vistaPublica(pedidoCrudo), etapa,
      señales: E.señalesDelPedido(pedidoCrudo, E.TITULOS), acceso: null, refrescar: false,
    };
    const pagina = fs.readFileSync(
      rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8');
    const s = http.createServer((req, res) => {
      const u = new URL(req.url, 'http://127.0.0.1');
      if (u.pathname === '/api/pedido') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(cuerpo));
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(pagina.replace('</body>', CONDUCTOR + '</body>'));
    });
    await new Promise((r) => s.listen(0, '127.0.0.1', r));
    const puerto = s.address().port;
    const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'vyc-chrome-'));
    try {
      // Misma receta que las otras pruebas con navegador: no se espera a que Chrome muera
      // —con un perfil nuevo escribe el DOM y se queda colgado— sino al `</html>`.
      const dom = await new Promise((listo) => {
        const ch = spawn(CHROME, [
          '--headless', '--disable-gpu', '--no-sandbox', '--no-first-run',
          '--disable-extensions', '--user-data-dir=' + perfil,
          '--virtual-time-budget=20000', '--dump-dom',
          `http://127.0.0.1:${puerto}/pedido/?id=${pedidoCrudo.id}&portapapeles=${portapapeles}`,
        ], { stdio: ['ignore', 'pipe', 'ignore'], detached: true });
        let salida = '', cerrado = false, muerte = null;
        const matar = () => { try { process.kill(-ch.pid, 'SIGKILL'); } catch { try { ch.kill('SIGKILL'); } catch { /* ya murió */ } } };
        const fin = () => { if (cerrado) return; cerrado = true; clearTimeout(muerte); matar(); listo(salida); };
        muerte = setTimeout(fin, 60000);
        ch.stdout.on('data', (d) => { salida += d; if (salida.includes('</html>')) fin(); });
        ch.on('close', fin);
        ch.on('error', fin);
      });
      const m = /RESULTADO:([A-Za-z0-9+/=]+)/.exec(dom);
      if (!m) return { fatal: 'la página no llegó a reportar' };
      return JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'));
    } finally {
      s.close();
      fs.rmSync(perfil, { recursive: true, force: true });
    }
  }

  if (!fs.existsSync(CHROME)) {
    // No se salta en silencio: una sección que no corre no acusa nada, y esta es la única que
    // mira la ejecución en vez del nombre.
    malo++;
    console.log(`  FALLA no está Chrome en ${CHROME}: esta sección no se puede saltar en silencio`);
  } else {
    const { db, crudo } = await basePagada();
    // La red fingida, desde el primer envío: ver la nota de la sección 2 ter.
    const red = conRed();
    let x = postIntake({ id: ID, ...DATOS, plataforma: 'wordpress' }, db);
    await x.p; await Promise.all(x.fondo);
    x = postIntake({ id: ID, acceso_listo: true }, db);
    await x.p; await Promise.all(x.fondo);
    await postEntregar({ id: ID, borrador_politica: BORRADOR }, db);
    red.soltar();

    const r = await enElNavegador(crudo(), 'rechaza');
    falso('la página reporta', r.fatal);
    eq('y sin errores de JavaScript', r.errorJs, null);
    cierto('el borrador está en pantalla, entero', String(r.enLaCaja || '') === BORRADOR);
    cierto('con su botón', r.hayBoton);
    eq('el doble del portapapeles se pudo instalar', r.sinDoble, null);
    // ═══ LAS ASERCIONES QUE MIDEN LA EJECUCIÓN Y NO EL NOMBRE ═══
    // Camino de respaldo: el portapapeles rechaza y el cliente igual recibe una respuesta.
    cierto('y al apretarlo pasa algo', String(r.dijoAlCopiar || '').length > 10);
    cierto('cuando el portapapeles rechaza, deja el texto seleccionado',
      r.seleccionado === BORRADOR.length);
    cierto('y le dice con qué teclas copiarlo',
      /ctrl\+c|cmd\+c/i.test(String(r.dijoAlCopiar || '')));
    // Camino feliz: el portapapeles acepta y confirma la copia, sin pedirle teclas.
    const rOk = await enElNavegador(crudo(), 'acepta');
    eq('con el portapapeles funcionando, tampoco hay errores', rOk.errorJs, null);
    cierto('y confirma que lo copió', String(rOk.dijoAlCopiar || '').length > 10);
    falso('sin pedirle que lo copie a mano', /ctrl\+c|cmd\+c/i.test(String(rOk.dijoAlCopiar || '')));
    // Las dos advertencias, en el DOM dibujado y no en el código que lo dibuja.
    eq('hay dos advertencias dibujadas', (r.avisos || []).length, 2);
    cierto('la primera dice que es un borrador para su abogado',
      /borrador para que lo revise tu abogado/i.test((r.avisos || [])[0] || ''));
    cierto('y la segunda también advierte',
      /borrador|asesoría legal/i.test((r.avisos || [])[1] || ''));
    // Y la fecha del aviso de inicio, con su hora, en la pantalla de verdad.
    cierto('la pantalla muestra cuándo se le avisó que empezamos',
      /Te avisamos que empezamos/.test(r.texto || ''));
    cierto('y con hora', /\d{1,2}:\d{2}/.test(r.texto || ''));
  }
}

console.log(`\n${malo ? 'HAY FALLAS' : 'TODO EN VERDE'} — ${ok} aserciones, ${malo} fallas\n`);
process.exit(malo ? 1 : 0);
