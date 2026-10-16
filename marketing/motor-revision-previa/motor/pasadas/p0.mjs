// Pasada 0: corte previo. Segundos, sin navegador. Puede descartar con motivo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { leerCsv } from '../lib/csv.mjs';
import { pedir } from '../lib/http.mjs';

const RAIZ = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const NO_PROPIOS = /(^|\.)(facebook|instagram|linkedin|twitter|x|youtube|tiktok|wa|wix|wixsite|business|google|linktr|linktree|yelp|tripadvisor|booking|portalinmobiliario|yapo|mercadolibre|goo|bit)\.(com|cl|me|ee|ly|site)$/i;
const PARKING = /domain (is )?for sale|this domain|dominio (en venta|disponible)|parked|buy this domain|godaddy|sedo\.com|hugedomains|sitio en construcci[oó]n|p[aá]gina en construcci[oó]n|coming soon|under conn?struction|bluehosting|haulmer|default web site page|welcome to nginx|apache2 (ubuntu )?default page/i;   // incluye paginas de relleno de hosting: el dueño diria "ese no es mi sitio"

export function limpiarDominio(d) {
  return String(d).trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
}

// Solo lectura. Por correo Y por dominio: la baja es de la empresa, no del buzon.
export function enExclusion(dominio, correo) {
  const filas = leerCsv(path.join(RAIZ, 'ventas/lista-exclusion.csv'));
  const hit = filas.find((f) => limpiarDominio(f.dominio) === dominio || (correo && f.email && f.email.toLowerCase() === correo.toLowerCase()));
  return hit ? { tipo: hit.tipo, motivo: hit.motivo, fecha: hit.fecha } : null;
}

// "Ya contactado". REGLA (corregida el 15-oct tras la prueba de la sesion de leads): corta SOLO lo que prueba un envio.
//   seguro  = aparece en ventas/enviados/REGISTRO-enviados.csv, o en una fila de un CSV cuyo `estado` dice que se envio / hubo respuesta.
//   posible = mencionado en un plan, un .md o una fila "Pendiente / Redactado / Borrador": se ADVIERTE, no se corta.
// Antes grepeaba el dominio en archivos de plan y descartaba como contactados a 11 leads que nunca se enviaron ("Pendiente 2a ola").
// La verdad definitiva esta en Gmail (in:sent to:dominio); el motor no tiene Gmail.
const ESTADO_ENVIADO = /enviad|toque|respond|rebot|cerrad|sin respuesta|negativa|baja|interesad/i, ESTADO_NO_ENVIADO = /pendiente|redactad|borrador|listo|verificar|no enviar|por enviar|sin contactar|descartad/i;
export function yaContactado(dominio) {
  const rutas = ['ventas/enviados', 'ventas/pipeline.md', 'marketing/outbound', 'marketing/lanzamiento-vyc-23sep'];
  const re = new RegExp(dominio.replace(/\./g, '\\.'), 'i');
  const seguro = [], posible = [];
  const recorrer = (p) => {
    const abs = path.join(RAIZ, p);
    if (!fs.existsSync(abs)) return;
    const st = fs.statSync(abs);
    if (st.isDirectory()) { for (const f of fs.readdirSync(abs)) recorrer(path.join(p, f)); return; }
    if (!/\.(md|csv|txt|json|jsonl)$/i.test(p) || st.size > 3e6) return;
    const texto = fs.readFileSync(abs, 'utf8');
    if (!re.test(texto)) return;
    if (/REGISTRO-enviados\.csv$/i.test(p)) { seguro.push(p); return; }   // registro de lo enviado: estar ahi ES haber recibido un correo
    if (/\.csv$/i.test(p)) {
      try {
        const filas = leerCsv(abs).filter((r) => re.test(Object.values(r).join(' ')));
        const enviadas = filas.filter((r) => ESTADO_ENVIADO.test(r.estado || '') && !ESTADO_NO_ENVIADO.test(r.estado || ''));
        (enviadas.length ? seguro : posible).push(p); return;
      } catch { /* csv raro: se trata como mencion */ }
    }
    posible.push(p);
  };
  rutas.forEach(recorrer);
  return { seguro, posible };
}

// Redireccion a otro sitio: mismo dominio registrable (ultimas dos etiquetas) = www o subdominio, no cuenta.
const base = (h) => h.replace(/^www\./, '').split('.').slice(-2).join('.');
const redirigeFuera = (dominio, host) => !!host && base(host) !== base(dominio);

// descartado antes: otra sesion o Dereck ya lo marco como no escribir (dominio reciclado, aparcado, distribuidor, sitio caido, hallazgo flaco).
const MARCA_DESCARTE = /descartad|NO escribir|DOMINIO RECICLADO|aparcad|parked|no es cl[ií]nica|distribuidor de/i;
export function descartadoAntes(dominio) {
  const dir = path.join(RAIZ, 'ventas'); if (!fs.existsSync(dir)) return null;
  const re = new RegExp('(^|[@.\\s/])' + dominio.replace(/\./g, '\\.') + '([^a-z0-9-]|$)', 'i');
  for (const f of fs.readdirSync(dir).filter((x) => /\.csv$/i.test(x) && x !== 'lista-exclusion.csv')) {
    try {
      for (const r of leerCsv(path.join(dir, f))) {
        const dom = String(r.dominio || (r.email || '').split('@')[1] || '').toLowerCase();
        if (!(dom === dominio || re.test(dom))) continue;
        const marca = [r.estado, r.hallazgo_medido, r.hallazgo].filter(Boolean).join(' ');
        if (MARCA_DESCARTE.test(marca)) return { en: 'ventas/' + f, motivo: marca.slice(0, 160) };
      }
    } catch { /* csv raro: se ignora */ }
  }
  return null;
}

// remedir: se mide un prospecto YA contactado (para un seguimiento). Se salta 'ya contactado', pero la lista de exclusion SIGUE mandando.
export async function pasada0(dominio, { correo, sinCorte = false, remedir = false } = {}) {
  const out = { pasada: 0, dominio, ...(sinCorte ? { sin_corte: true } : {}) };
  const ex = enExclusion(dominio, correo);
  if (ex && !sinCorte) return { ...out, corte: 'excluido', detalle: ex };
  if (!sinCorte && !remedir) { const d = descartadoAntes(dominio); if (d) return { ...out, corte: 'descartado-antes', detalle: { ...d, nota: 'Ya estaba marcado como no escribir en una lista de ventas/. Si cambio, correr con --sin-corte.' } }; }
  const cont = (sinCorte || remedir) ? { seguro: [], posible: [] } : yaContactado(dominio);
  if (cont.seguro.length) return { ...out, corte: 'ya-contactado', detalle: { en: cont.seguro.slice(0, 5), nota: 'Hay un envio registrado. Confirmar en Gmail (in:sent to:dominio).' } };

  let r = null;
  for (const u of [`https://${dominio}/`, `https://www.${dominio}/`, `http://${dominio}/`]) {
    r = await pedir(u);
    if (r.ok && r.status < 500) break;
  }
  if (!r?.ok) return { ...out, corte: 'no-responde', detalle: { error: r?.error } };
  if (r.status >= 400) return { ...out, corte: 'no-responde', detalle: { status: r.status } };
  const final = new URL(r.url);
  const host = final.host.replace(/^www\./, '');
  if (NO_PROPIOS.test(host) && host !== dominio) return { ...out, corte: 'no-es-sitio-propio', detalle: { final: final.host } };
  const texto = r.cuerpo.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  // Se mide el texto visible, no el HTML: una pagina de relleno puede pesar cientos de KB por assets en linea.
  if (!sinCorte && texto.length < 4000 && PARKING.test(texto)) return { ...out, corte: 'parking', detalle: { texto: texto.slice(0, 120) } };
  const spa = /<div[^>]+id=["'](root|app|__next|__nuxt)["']/i.test(r.cuerpo);
  return { ...out, corte: null, url_final: r.url, status: r.status, cabeceras: r.cab, html: r.cuerpo,
    advertencias: [
      ...(cont.posible.length ? [`El dominio se menciona en ${cont.posible.slice(0, 3).join(', ')} pero ningun registro prueba un envio. Confirmar en Gmail (in:sent to:dominio) antes de escribir.`] : []),
      ...(redirigeFuera(dominio, host) ? [`El dominio ${dominio} redirige a ${host}: lo medido (cookies, formulario, contacto) es del sitio de destino. No decir "tu sitio ${dominio}" sin confirmar que el destinatario administra ${host}.`] : []),
      ...(/sample page/i.test(r.cuerpo) && /hello world/i.test(r.cuerpo) ? ['Parece una plantilla de WordPress sin personalizar ("Sample Page", "Hello world!"): puede ser un sitio abandonado o un dominio que ya no es el sitio real. Redactar con cautela.'] : []),
    ],
    html_no_alcanza: texto.length < 500 && spa, largo_texto_html: texto.length, spa_detectada: spa,
    redirige_a_otro_host: host !== dominio ? host : null };
}
