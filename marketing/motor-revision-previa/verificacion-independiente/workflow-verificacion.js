export const meta = {
  name: 'verificacion-independiente-hallazgos',
  description: 'Dos revisores independientes re-miden en vivo cada hallazgo fuerte del motor; solo sobreviven los que ambos confirman',
  phases: [{ title: 'Verificar', detail: 'dos verificadores por hallazgo, con lentes distintos' }, { title: 'Veredicto', detail: 'cruce de los dos veredictos' }],
}

const VEREDICTO = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    veredicto: { type: 'string', enum: ['confirma', 'refuta', 'no_concluyente'] },
    que_vi: { type: 'string', description: 'Lo que viste con tus propios ojos y tu propia medición, concreto y breve' },
    cookies_vistas: { type: 'array', items: { type: 'string' }, description: 'Solo para C1: nombres de cookies guardadas antes de cualquier consentimiento' },
    banner_visible: { type: ['boolean', 'null'], description: 'Solo para C1: ¿se ve un aviso de cookies en tus capturas? null si no aplica' },
    detalle_para_correo: { type: 'string', description: 'Hechos concretos y comprobables que podrían ir en el correo (sin redactar el correo). Vacío si no confirma.' },
    advertencias: { type: 'array', items: { type: 'string' }, description: 'Cosas que NO se deben afirmar o que dependen del criterio' },
    motivo: { type: 'string', description: 'Si refutas o no concluyes: por qué' },
  },
  required: ['id', 'veredicto', 'que_vi', 'detalle_para_correo', 'advertencias', 'motivo'],
}

const LENTES = [
  { clave: 'repetidor', texto: 'Tu lente: REPETIR la medición como lo haría un visitante nuevo y decir si sale lo mismo. Sé fiel a lo que mides, no a lo que el motor dijo.' },
  { clave: 'escéptico', texto: 'Tu lente: ESCÉPTICO. Tu trabajo es intentar refutar la afirmación. Busca la razón por la que el dueño del sitio diría "eso no es cierto" (aviso de cookies que sí existe, política enlazada en el pie, botón de contacto que el motor no vio, página que no cargó bien desde esta IP). Si no encuentras cómo refutarla tras buscar de verdad, confirma. Ante la duda real, no_concluyente.' },
]

// args: { archivo: ruta al hallazgos.json (lo genera motor/preparar-verificacion.mjs), ids: [..], scratch: carpeta de trabajo }
const ARCHIVO = args.archivo, SCRATCH = args.scratch
const prompt = (id, lente) => `Eres un verificador independiente. Un detector automático ("el motor") afirmó un hallazgo sobre el sitio de una empresa chilena. Un correo comercial se va a escribir a partir de lo que tú confirmes, así que un falso positivo le cuesta credibilidad al remitente. Prefieres decir no_concluyente antes que confirmar algo que no viste.

${lente.texto}

DATOS: abre el archivo ${ARCHIVO} (arreglo JSON) y toma el objeto cuyo "id" es "${id}". Trae: dominio, oferta (C1 | F1 | F10 | F2), afirmable (la afirmación del motor), no_afirmable, cookies (solo C1) y dir (carpeta con las capturas del motor).

INDEPENDENCIA: NO leas el código del motor ni ficha.md ni ficha.json. Haz primero tu PROPIA medición del sitio en vivo. Recién después puedes mirar las capturas del motor (dir/r1-A.jpg y dir/r1-B.jpg, con la herramienta Read) para comparar.

REGLAS DURAS: solo cargas de página (GET). No hagas clic en nada, no envíes formularios, no aceptes cookies, no inicies sesión. Una sola visita completa por sitio más lo que necesites para mirar.

CÓMO MEDIR (Playwright ya está instalado; escribe tu script como archivo .cjs en ${SCRATCH}/ver/${id}-${lente.clave}/ y córrelo con: NODE_PATH=/opt/node-tools/node_modules NODE_USE_ENV_PROXY=1 node script.cjs ; usa require('playwright'), chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']}), un contexto nuevo con locale 'es-CL' y timezoneId 'America/Santiago', viewport 1280x800):
- Si oferta = C1 (cookies de rastreo escritas antes de cualquier consentimiento): abre https://<dominio>/ sin tocar nada, espera 11 s, guarda context.cookies() y una captura; luego mueve el mouse y haz scroll con la rueda unos 9 s, guarda cookies y captura de nuevo. Cookies de rastreo/medición/publicidad típicas: _ga, _ga_*, _gcl_*, _fbp, _clck, _clsk, _uet*, _hj*, _ttp, _rdt_uuid, IDE, etc. Cookies funcionales (idioma, sesión, PHPSESSID, cookie de aviso, cloudflare __cf_bm) NO cuentan. Mira tus capturas con Read: ¿hay un aviso/banner de cookies visible en alguna? Confirma si hay cookies de rastreo escritas antes de cualquier interacción. Anota en banner_visible si se ve o no un aviso de cookies en tus capturas: si el motor afirmó 'sin aviso' (o su afirmación no menciona aviso) y tú ves un aviso real, la variante es 'con aviso': confirma igual los hechos de cookies, pon banner_visible=true y dilo en advertencias (el correo no puede decir que no tiene aviso).
- Si oferta = F1 (formulario en la portada que pide correo o teléfono y ningún enlace a política de privacidad): carga la portada, lista los formularios visibles con sus campos (type/name/placeholder) y busca TODOS los enlaces de la página (incluido el pie) cuyo texto o href mencione privacidad, datos personales, política(s), protección de datos o similar. Confirma solo si hay un formulario visible que pide correo o teléfono y no hay ningún enlace de ese tipo. Anota si hay enlace a "Términos y condiciones" u otro aviso legal (advertencia).
- Si oferta = F10 (en la primera pantalla no hay botón o enlace para contactar, cotizar, escribir por WhatsApp o comprar): viewport 1280x720 y también 390x844; captura la primera pantalla de cada una y mírala con Read. Lista los enlaces/botones visibles sobre el pliegue. Confirma solo si de verdad no hay ninguna acción de contacto visible en la primera pantalla en ninguno de los dos tamaños. Un ítem de menú llamado "Contacto"/"Contato" o equivalente, un teléfono visible escrito como texto o un chat flotante cuentan como acción de contacto: en ese caso refuta. Ítems como "Oficinas" o "Equipo" no cuentan, pero anótalo como advertencia.
- Si oferta = F2 (sin ruta de contacto en la portada): igual que F10 pero sobre toda la portada y su pie: teléfono, correo, WhatsApp, formulario o enlace a página de contacto. Confirma solo si no hay ninguna. Verifica además que la página cargó de verdad (si sale en blanco o con error de red, es no_concluyente) y que es el sitio real de la empresa (no una página de hosting 'en construcción' ni una plantilla sin personalizar; si el dominio redirige a otro sitio o el sitio parece de otra organización, dilo en advertencias con la palabra ALERTA DE IDENTIDAD).

Si el sitio no carga o carga distinto desde tu medición, no concluyas por intuición: di no_concluyente y por qué.

SALIDA: devuelve el objeto estructurado. "que_vi" y "detalle_para_correo" deben ser hechos concretos y comprobables (por ejemplo los nombres de las cookies, los campos del formulario, qué hay en el pie), sin redactar el correo. "advertencias" lista lo que NO se debe afirmar o depende del criterio.`

phase('Verificar')
const ids = args.ids
const resultados = await pipeline(
  ids,
  (id) => parallel(LENTES.map((l) => () => agent(prompt(id, l), { label: `${id}:${l.clave}`, phase: 'Verificar', schema: VEREDICTO }))),
  (vs, id) => {
    const v = (vs || []).filter(Boolean)
    const conf = v.filter((x) => x.veredicto === 'confirma').length
    const ref = v.filter((x) => x.veredicto === 'refuta').length
    const final = v.length < 2 ? 'incompleto' : conf === 2 ? 'confirmado' : ref >= 1 ? 'refutado' : 'no_concluyente'
    return { id, final, veredictos: v }
  },
)
phase('Veredicto')
const ok = resultados.filter(Boolean)
const resumen = { confirmado: 0, refutado: 0, no_concluyente: 0, incompleto: 0 }
ok.forEach((r) => { resumen[r.final]++ })
log(`confirmados ${resumen.confirmado}, refutados ${resumen.refutado}, no concluyentes ${resumen.no_concluyente}, incompletos ${resumen.incompleto}`)
return { resumen, resultados: ok }
