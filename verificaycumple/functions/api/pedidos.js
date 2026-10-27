/**
 * El pedido: lo que alguien compró, congelado.
 *
 * LA DECISIÓN QUE MANDA SOBRE TODO LO DEMÁS (23-oct-2026)
 *
 * Un pedido NO guarda una referencia a «el chequeo de ese dominio» ni a «el precio del kit».
 * Guarda una COPIA de lo que se vendió, en el momento en que se vendió. El instrumento se
 * mueve; lo vendido no puede moverse con él.
 *
 * No es una precaución teórica. En este mismo producto, en un mes:
 *   - el catálogo de rastreadores creció (el código dice «entradas, o dieciséis», y antes eran
 *     menos), así que un sitio puede pasar de limpio a pendiente sin haber tocado nada;
 *   - el puntaje de spindlelab.cl pasó de 73 a 100 en dos días por un cambio en cómo se
 *     puntúa, no por un cambio en el sitio;
 *   - el 16-oct se arregló el «falso rojo» y sitios que sacaban 77 pasaron a 100.
 *
 * Si cualquiera de esos cambios hubiera caído entre el pago y la entrega, el informe final
 * habría comparado contra una regla distinta de la que disparó la compra. Por eso el pedido
 * congela cuatro cosas: el informe completo, qué señales se contrataron, el monto, y la URL
 * que se midió de verdad.
 *
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * POR QUÉ D1 Y NO KV
 *
 * El KV que ya existe es eventualmente consistente: después de que el webhook escribe «pagado»,
 * una lectura puede devolver el estado viejo por un rato. Para un tope de abuso da lo mismo;
 * para «pagué y me dice que no» no. Además KV no tiene actualización por campo, así que dos
 * escrituras cercanas —el webhook marcando pagado y el cliente mandando sus datos de
 * facturación— se pisarían entre sí.
 */

/** Los estados por los que pasa un pedido, y nada más. */
export const ESTADOS = {
  CREADO: 'creado',        // existe el pedido y la orden en Mercado Pago; nadie pagó todavía
  PENDIENTE: 'pendiente',  // está pagando con un medio que no acredita al instante
  PAGADO: 'pagado',        // confirmado CONTRA LA API, no por la vuelta del navegador
  RECHAZADO: 'rechazado',  // Mercado Pago lo rechazó
  DEVUELTO: 'devuelto',    // NOSOTROS devolvimos la plata
  CONTRACARGADO: 'contracargado',  // el emisor la revirtió por una disputa; no fuimos nosotros
  ENTREGADO: 'entregado',  // el trabajo está hecho y verificado
};

/*
 * POR QUÉ EXISTE `pendiente` (24-oct-2026)
 *
 * Sin él, un pago que no acredita al instante —un medio en proceso, o una orden autorizada sin
 * capturar— dejaba el pedido en `creado`, que es el mismo estado de quien nunca volvió de
 * Mercado Pago. La persona veía «esperando que Mercado Pago avise» sin saber si su plata salió.
 *
 * La alternativa era guardar el estado de la orden en una columna nueva, o sea un ALTER TABLE
 * sobre una base que ya está en producción. No hace falta: el pedido ESTÁ pendiente, así que
 * corresponde un estado, y la columna `estado` es TEXT y no cambia.
 */

/**
 * Qué transiciones existen. Todo lo que no esté acá no pasa.
 *
 * Importa que `creado → creado` y `pagado → pagado` sean válidas: Mercado Pago reintenta la
 * misma notificación cada 15 minutos hasta recibir un 200, así que el webhook va a procesar el
 * mismo evento más de una vez y eso tiene que ser inofensivo.
 *
 * Y NO existe `pagado → rechazado`. Una vez confirmado contra la API, una notificación
 * posterior que diga otra cosa no degrada el pedido sola: eso se mira a mano.
 */
const TRANSICIONES = {
  [ESTADOS.CREADO]: [ESTADOS.CREADO, ESTADOS.PENDIENTE, ESTADOS.PAGADO, ESTADOS.RECHAZADO,
    ESTADOS.DEVUELTO, ESTADOS.CONTRACARGADO],
  // Un pendiente puede terminar en cualquiera de las tres puntas, y puede llegar dos veces
  // (Mercado Pago avisa cada cambio del medio de pago), así que se admite a sí mismo.
  [ESTADOS.PENDIENTE]: [ESTADOS.PENDIENTE, ESTADOS.PAGADO, ESTADOS.RECHAZADO,
    ESTADOS.DEVUELTO],
  [ESTADOS.PAGADO]: [ESTADOS.PAGADO, ESTADOS.ENTREGADO, ESTADOS.DEVUELTO, ESTADOS.CONTRACARGADO],
  // PAGADO entra acá porque un rechazo seguido de un pago es el camino NORMAL de un
  // reintento, no una anomalía: `failed` no es un estado terminal en la Orders API, y la
  // persona puede volver a intentar con otra tarjeta sobre la misma orden. Sin esta
  // transición, esa segunda vuelta caía en `transicion-invalida`, el handler contestaba 200
  // y el pedido se quedaba en `rechazado` con la plata ya cobrada.
  [ESTADOS.RECHAZADO]: [ESTADOS.RECHAZADO, ESTADOS.CREADO, ESTADOS.PENDIENTE, ESTADOS.PAGADO],
  [ESTADOS.DEVUELTO]: [ESTADOS.DEVUELTO],
  // Un contracargo se puede revertir si la disputa se gana, así que no es un pozo sin salida.
  [ESTADOS.CONTRACARGADO]: [ESTADOS.CONTRACARGADO, ESTADOS.PAGADO, ESTADOS.DEVUELTO],
  [ESTADOS.ENTREGADO]: [ESTADOS.ENTREGADO, ESTADOS.DEVUELTO, ESTADOS.CONTRACARGADO],
};

export function transicionValida(de, a) {
  return Boolean(TRANSICIONES[de] && TRANSICIONES[de].includes(a));
}

/**
 * El identificador del pedido.
 *
 * Tiene que cumplir dos cosas a la vez:
 *   1. La regla de Mercado Pago para `external_reference`, literal de su referencia: «máximo 64
 *      caracteres, y solo números, letras, guiones (-) y guiones bajos (_)».
 *   2. Ser imposible de adivinar, porque es la llave con la que alguien entra a ver su pedido.
 *      Un id secuencial dejaría que cualquiera recorra los pedidos ajenos.
 *
 * `crypto.randomUUID()` da 122 bits de azar. Sin los guiones son 32 caracteres hex, más el
 * prefijo son 36: bien bajo el tope de 64.
 */
export function nuevoIdPedido(uuid = null) {
  const u = (uuid || crypto.randomUUID()).replace(/-/g, '').toLowerCase();
  return `vyc_${u}`;
}

/** La regla de Mercado Pago, para poder comprobarla en las pruebas y antes de mandar. */
/**
 * La forma de NUESTROS ids, para reconocerlos entre los ajenos.
 *
 * Vivía escrita en línea dentro de `webhook-mp.js`, que la usa para distinguir «el pedido
 * todavía no aterrizó» de «esta referencia es de otra integración de la misma cuenta». Ahora que
 * además la necesita el intake, se exporta desde acá, al lado de la función que genera el id:
 * una segunda copia es una segunda cosa que se desincroniza.
 */
export const ID_PEDIDO_NUESTRO = /^vyc_[0-9a-f]{32}$/;

export const ID_VALIDO_MP = /^[A-Za-z0-9_-]{1,64}$/;

/**
 * Las UTM, completas.
 *
 * El chequeo ya guarda un «origen» de lista cerrada (instagram, linkedin, ...) para contar uso
 * sin identificar a nadie. Eso sirve para saber si entra gente; NO sirve para saber qué
 * conjunto y qué creatividad trajeron una compra.
 *
 * Con nueve conjuntos por rubro en la campaña, la diferencia entre «vino de Instagram» y «vino
 * del conjunto de contadores con la creatividad B» es la diferencia entre poder escalar y no
 * poder. Por eso el PEDIDO sí guarda la UTM entera: a esa altura la persona ya decidió
 * comprar y nos está dando sus datos igual.
 */
export const CAMPOS_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export function utmsDe(url) {
  let params;
  try { params = new URL(url).searchParams; } catch { return {}; }
  return limpiarUtms(Object.fromEntries(CAMPOS_UTM.map((c) => [c, params.get(c)])));
}

/**
 * Los parámetros de campaña que manda el navegador, acotados.
 *
 * ── POR QUÉ ESTO EXISTE, Y POR QUÉ ACÁ SÍ SE LE CREE AL NAVEGADOR ────────────────────────
 *
 * El checkout usaba `utmsDe(request.url)`, y esa URL es la del POST: `/api/pedido`, que nunca
 * lleva parámetros. O sea que TODAS las ventas se guardaban sin atribución, y con una campaña
 * pagada corriendo eso significa no poder decir qué anuncio trajo qué venta. Lo encontró una
 * revisión externa y se comprobó: `utmsDe('https://.../api/pedido')` devuelve `{}` siempre.
 *
 * Los parámetros viven en la URL de la PÁGINA, así que tiene que mandarlos el navegador. Y acá
 * creerle está bien, a diferencia del monto o de las señales: lo peor que puede hacer alguien
 * mintiendo es atribuirse mal su propia visita. No toca el precio, ni la elegibilidad, ni lo
 * que se promete. Lo único que hay que impedir es que meta un texto enorme o campos que no son.
 */
export function limpiarUtms(obj) {
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const c of CAMPOS_UTM) {
    const v = obj[c];
    if (typeof v !== 'string') continue;
    // Se limpian los caracteres de control y se recorta a 200. Dentro de eso se guarda tal cual
    // llega: es un dato de campaña, no se normaliza ni se mete en una lista cerrada.
    // eslint-disable-next-line no-control-regex
    const limpio = v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 200);
    if (limpio) out[c] = limpio;
  }
  return out;
}

/**
 * Congela lo que se está vendiendo.
 *
 * `senales` son los ids que el kit se compromete a cerrar EN ESTE PEDIDO, tomados de la
 * compuerta de elegibilidad en el momento de la compra. Si mañana el kit cubre una señal más,
 * este pedido sigue valiendo por las que se contrataron hoy.
 *
 * `informe` va entero y sin tocar: es la evidencia de por qué se compró, y el «antes» del
 * informe final.
 */
export function congelarContrato({ informe, elegibilidad, montoNeto, montoTotal, urlMedida }) {
  if (!elegibilidad || !elegibilidad.puede) {
    throw new Error('No se congela un contrato de un pedido que no puede comprar');
  }
  return {
    // Lo contratado es TODO lo que el kit va a arreglar: las que justifican la venta y las que
    // entran en el trabajo sin justificarla (ver `TAMBIEN_ARREGLA` en elegibilidad.js). Si acá
    // fueran solo las primeras, el contrato congelado prometería menos de lo que se entrega, y
    // el informe final mostraría un arreglo que nadie compró.
    senales_contratadas: [...elegibilidad.cierra, ...(elegibilidad.tambien || [])].map((i) => i.id),
    senales_fuera: elegibilidad.noCierra.map((i) => i.id),
    informe_json: JSON.stringify(informe),
    url_medida: urlMedida || (informe && informe.revisado) || null,
    monto_neto: montoNeto,
    monto_total: montoTotal,
    congelado_en: new Date().toISOString(),
  };
}

/**
 * El cuerpo de la orden para Mercado Pago.
 *
 * Los nombres y los tipos salen de su referencia, leída el 23-oct-2026:
 *   - `type` solo acepta "online"; `processing_mode` solo acepta "manual".
 *   - `total_amount` va como STRING. La doc se contradice sobre decimales («debe ser entero»
 *     para total_amount, «puede llevar dos decimales» para unit_price), así que para CLP se
 *     mandan enteros como string, que cumple las dos lecturas. El peso chileno no tiene
 *     decimales.
 *   - NO existe campo de moneda. El CLP sale de la cuenta del vendedor.
 *   - `payer.email` es obligatorio para todas las órdenes de Checkout Pro. Por eso el correo
 *     se pide ANTES del pago: no es una decisión de diseño nuestra.
 *   - Las URLs de vuelta van en `config.online`, y la del webhook NO va acá: se configura en
 *     el panel.
 *
 * Esta función es pura a propósito: se puede comprobar el cuerpo exacto sin tocar la red.
 */
/**
 * Cuánto vive una orden de Mercado Pago sin pagar.
 *
 * ── POR QUÉ ESTE NÚMERO MANDA SOBRE OTRO (24-oct-2026) ───────────────────────────────────
 *
 * De acá sale el `expiration_time` de la orden Y la ventana del antidoble clic del checkout.
 * No es elegancia: es que cuando los dos se escribían por separado, se contradecían.
 *
 * La ventana estaba en 30 minutos y la orden vivía un día. O sea que durante 23 horas y media,
 * alguien que había abierto un pago y no lo había completado podía volver, no ser reconocido
 * como el mismo, y recibir una SEGUNDA orden mientras la primera seguía pagable. Dos enlaces
 * vivos por un solo kit: si pagaba los dos, cobrábamos dos veces.
 *
 * Y el comentario que justificaba los 30 minutos decía que pasada la ventana la persona «no
 * queda atada a una orden vencida» — pero a los 30 minutos no estaba vencida. La justificación
 * daba por cierto un hecho que la otra constante desmentía.
 *
 * El invariante que de verdad importa, escrito una sola vez: **nunca puede haber dos órdenes
 * pagables para el mismo sitio y el mismo correo a la vez.** Eso se cumple si, y solo si, la
 * ventana de reutilización dura por lo menos lo que dura la orden.
 *
 * El costo de la regla, dicho: reutilizar una orden creada hace 23 horas le deja a la persona
 * una hora para pagarla. Es incómodo y es mucho menos malo que la alternativa, que es cobrarle
 * dos veces. Si alguna vez molesta, lo que se acorta es la VIGENCIA, no la ventana.
 */
export const VIGENCIA_ORDEN_HORAS = 24;

/**
 * La versión de la política de privacidad que estaba publicada cuando se escribió esto.
 *
 * ── POR QUÉ SE GUARDA, Y POR QUÉ ES ESTE PRODUCTO EL QUE NO PUEDE NO HACERLO (27-oct-2026) ──
 *
 * El checkout exige `consiento === true` para vender, pero hasta hoy ese booleano se validaba y
 * se tiraba: no quedaba en ninguna parte QUÉ aceptó la persona ni CUÁNDO. Si alguien reclamaba,
 * no se podía reconstruir. En un producto que vende cumplimiento de la Ley 21.719, y que le
 * cobra a otros por no tener esto en orden, es el peor sitio donde dejar un hueco.
 *
 * Se guarda la VERSIÓN, no el texto entero: la política publicada lleva su propio registro de
 * cambios, así que de la versión se reconstruye el contenido. Y no se guarda ningún dato nuevo
 * de la persona —la fila ya tiene su correo y su fecha—, así que esto no agranda lo que
 * retenemos: lo vuelve legible.
 *
 * ⚠️ Este número y el que imprime `public/privacidad/index.html` son DOS COPIAS DEL MISMO
 * HECHO. Si se separan, se guardan pedidos diciendo que aceptaron una versión que nunca
 * estuvo publicada, y nadie se entera. Por eso hay una prueba que los compara: no se cambia
 * uno sin el otro.
 */
export const VERSION_POLITICA = '1.8';

/**
 * Hasta cuántas cuotas se le ofrecen al comprador.
 *
 * ── DECISIÓN DE RAMÓN, 26-oct-2026 ───────────────────────────────────────────────────────
 *
 * Sin este campo, Mercado Pago ofrece las que quiera el emisor de la tarjeta. Se vio en el
 * checkout de prueba: el selector aparecía con más opciones que una.
 *
 * ⚠️ LO QUE NO SE PUSO, A PROPÓSITO. El mismo bloque admite `installments_cost: 'seller'`, que
 * traslada el costo de las cuotas AL VENDEDOR. No va: el propio checkout de Mercado Pago le
 * dice al comprador «si hay intereses, los aplicará tu banco», y así queremos que siga. Poner
 * ese campo sería pagar nosotros el financiamiento sin que nadie lo haya decidido.
 *
 * El campo es `config.payment_method.max_installments`, hermano de `config.online` y NO hijo
 * suyo. Verificado en la referencia de Create order antes de escribirlo: una anidación mal
 * puesta acá no da error, Mercado Pago la ignora en silencio y el límite nunca se aplica.
 */
export const MAX_CUOTAS = 3;

export function armarOrdenMP({ idPedido, correo, montoTotal, titulo, urls }) {
  if (!ID_VALIDO_MP.test(idPedido)) {
    throw new Error(`external_reference inválido para Mercado Pago: ${idPedido}`);
  }
  if (!correo) throw new Error('payer.email es obligatorio en Checkout Pro');
  if (!Number.isInteger(montoTotal) || montoTotal <= 0) {
    throw new Error(`monto inválido: ${montoTotal}`);
  }
  return {
    type: 'online',
    processing_mode: 'manual',
    total_amount: String(montoTotal),
    external_reference: idPedido,
    payer: { email: correo },
    items: [{
      // El tope de la doc es 256 caracteres.
      title: String(titulo).slice(0, 256),
      unit_price: String(montoTotal),
      quantity: 1,
    }],
    config: {
      // Tope de cuotas. Ver `MAX_CUOTAS`: va acá, al lado de `online`, no adentro.
      payment_method: { max_installments: MAX_CUOTAS },
      online: {
        success_url: urls.exito,
        pending_url: urls.pendiente,
        failure_url: urls.rechazo,
        // Sin `auto_return`, la persona paga y se queda en Mercado Pago en vez de aterrizar en
        // su pantalla del pedido. `approved` la devuelve solo cuando el pago se aprobó; exige
        // `success_url`, que ya va arriba.
        auto_return: 'approved',
      },
    },
    // Sin vencimiento, un pedido que nadie paga se queda en `creado` para siempre. Con esto,
    // Mercado Pago lo pasa a `expired`, que el webhook ya sabe tratar como rechazo. Es duración
    // ISO 8601, no una fecha.
    //
    // ⚠️ El número sale de `VIGENCIA_ORDEN_HORAS` y NO se escribe a mano. Ver la nota de esa
    // constante: cuando este valor y la ventana del antidoble clic se escribían por separado,
    // se contradecían.
    expiration_time: `PT${VIGENCIA_ORDEN_HORAS}H`,
  };
}

/* ================================================================== *
 * El esquema. Va acá para que viva al lado del código que lo usa.    *
 * ================================================================== */

export const ESQUEMA = `
CREATE TABLE IF NOT EXISTS pedidos (
  id                  TEXT PRIMARY KEY,
  creado_en           TEXT NOT NULL,
  estado              TEXT NOT NULL,

  -- Qué se compró, CONGELADO. Nada de esto se recalcula después.
  dominio             TEXT NOT NULL,
  url_medida          TEXT,
  senales_contratadas TEXT NOT NULL,
  senales_fuera       TEXT,
  informe_json        TEXT NOT NULL,
  monto_neto          INTEGER NOT NULL,
  monto_total         INTEGER NOT NULL,

  -- Lo único que se pide antes de pagar.
  correo              TEXT NOT NULL,

  -- Constancia del consentimiento: qué versión de la política aceptó y cuándo. El endpoint
  -- exige que "consiento" venga en true para vender, y esto es lo que queda escrito de eso.
  -- ⚠️ DOS CARACTERES PROHIBIDOS EN LOS COMENTARIOS DE ESTE ESQUEMA, y los dos cortan en
  -- silencio: la comilla invertida (esto es un literal de plantilla, una sola lo parte en dos)
  -- y el punto y coma (las pruebas ejecutan el esquema partiéndolo por punto y coma, así que
  -- uno dentro de un comentario deja el CREATE TABLE a la mitad).
  -- ⚠️ Se escriben juntos o no se escribe ninguno: media constancia no es constancia.
  consentido_en       TEXT,
  politica_version    TEXT,

  -- Mercado Pago
  mp_order_id         TEXT,
  mp_payment_id       TEXT,
  pagado_en           TEXT,

  -- De dónde vino, entero
  utm_source          TEXT,
  utm_medium          TEXT,
  utm_campaign        TEXT,
  utm_content         TEXT,
  utm_term            TEXT,

  -- Lo que se pide DESPUÉS del pago, para la factura y para trabajar
  razon_social        TEXT,
  rut                 TEXT,
  giro                TEXT,
  direccion           TEXT,
  plataforma          TEXT,
  acceso_recibido_en  TEXT,

  entregado_en        TEXT,
  informe_final_json  TEXT
);

-- Para que el webhook encuentre el pedido por el id de Mercado Pago sin recorrer la tabla.
CREATE INDEX IF NOT EXISTS idx_pedidos_mp_order ON pedidos (mp_order_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_mp_payment ON pedidos (mp_payment_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos (estado, creado_en);

-- UNA SOLA COMPRA ABIERTA POR SITIO Y CORREO. Es un índice PARCIAL, y su WHERE es la mitad de
-- la idea: solo restringe los pedidos en estado creado, o sea los que tienen una orden pagable. Un
-- cliente puede comprar dos veces en su vida. Lo que no puede es tener dos enlaces de pago
-- vivos a la vez, porque pagar los dos sería pagar dos veces el mismo kit.
--
-- ⚠️ NI UN PUNTO Y COMA DENTRO DE ESTOS COMENTARIOS. Las pruebas aplican el esquema partiéndolo
-- por punto y coma, así que uno dentro de un comentario corta la sentencia por la mitad y la
-- siguiente mitad revienta con un error de sintaxis que no se parece en nada a la causa.
--
-- Esto existe porque buscar-y-después-insertar NO es atómico: dos peticiones simultáneas
-- terminan su búsqueda antes de que cualquiera inserte, las dos creen ser la primera, y cada una
-- abre su propia orden con su propia clave de idempotencia. La defensa tiene que estar en la
-- base, que es la única que puede decidir sin carreras. Es el mismo razonamiento que el
-- INSERT OR IGNORE de eventos_mp.
CREATE UNIQUE INDEX IF NOT EXISTS idx_pedidos_compra_abierta
  ON pedidos (dominio, correo) WHERE estado = 'creado';

-- Cada notificación que llega, una vez. Es la protección contra repetición: Mercado Pago
-- reintenta cada 15 minutos hasta recibir un 200, así que el mismo evento llega varias veces.
-- Con la clave primaria acá, procesarlo dos veces es imposible por construcción y no por
-- cuidado de quien escriba el handler.
CREATE TABLE IF NOT EXISTS eventos_mp (
  id          TEXT PRIMARY KEY,
  recibido_en TEXT NOT NULL,
  tipo        TEXT,
  pedido_id   TEXT,
  resultado   TEXT
);
`;
