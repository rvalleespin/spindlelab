// Pasada 0: corte previo. Segundos, sin navegador. Puede descartar con motivo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { leerCsv } from '../lib/csv.mjs';
import { pedir } from '../lib/http.mjs';

const RAIZ = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const NO_PROPIOS = /(^|\.)(facebook|instagram|linkedin|twitter|x|youtube|tiktok|wa|wix|wixsite|business|google|linktr|linktree|yelp|tripadvisor|booking|portalinmobiliario|yapo|mercadolibre|goo|bit)\.(com|cl|me|ee|ly|site)$/i;
const PARKING = /domain (is )?for sale|this domain|dominio (en venta|disponible)|parked|buy this domain|godaddy|sedo\.com|hugedomains/i;

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

// remedir: se mide un prospecto YA contactado (para un seguimiento). Se salta 'ya contactado', pero la lista de exclusion SIGUE mandando.
export async function pasada0(dominio, { correo, sinCorte = false, remedir = false } = {}) {
  const out = { pasada: 0, dominio, ...(sinCorte ? { sin_corte: true } : {}) };
  const ex = enExclusion(dominio, correo);
  if (ex && !sinCorte) return { ...out, corte: 'excluido', detalle: ex };
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
  if (!sinCorte && PARKING.test(r.cuerpo.slice(0, 20000)) && r.cuerpo.length < 20000) return { ...out, corte: 'parking', detalle: {} };

  const texto = r.cuerpo.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const spa = /<div[^>]+id=["'](root|app|__next|__nuxt)["']/i.test(r.cuerpo);
  return { ...out, corte: null, url_final: r.url, status: r.status, cabeceras: r.cab, html: r.cuerpo,
    advertencias: cont.posible.length ? [`El dominio se menciona en ${cont.posible.slice(0, 3).join(', ')} pero ningun registro prueba un envio. Confirmar en Gmail (in:sent to:dominio) antes de escribir.`] : [],
    html_no_alcanza: texto.length < 500 && spa, largo_texto_html: texto.length, spa_detectada: spa,
    redirige_a_otro_host: host !== dominio ? host : null };
}
