// Pasada 0: corte previo. Segundos, sin navegador. Puede descartar con motivo.
import fs from 'node:fs';
import path from 'node:path';
import { leerCsv } from '../lib/csv.mjs';
import { pedir } from '../lib/http.mjs';

const RAIZ = path.resolve(new URL('../../../../', import.meta.url).pathname);
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

// "Ya contactado": el dominio aparece en lo enviado o en el pipeline. Es advertencia dura, con la ruta como prueba.
export function yaContactado(dominio) {
  const rutas = ['ventas/enviados', 'ventas/pipeline.md', 'marketing/outbound', 'marketing/lanzamiento-vyc-23sep'];
  const re = new RegExp(dominio.replace(/\./g, '\\.'), 'i');
  const hallados = [];
  const recorrer = (p) => {
    const abs = path.join(RAIZ, p);
    if (!fs.existsSync(abs)) return;
    const st = fs.statSync(abs);
    if (st.isDirectory()) { for (const f of fs.readdirSync(abs)) recorrer(path.join(p, f)); return; }
    if (!/\.(md|csv|txt|json|jsonl)$/i.test(p) || st.size > 3e6) return;
    if (re.test(fs.readFileSync(abs, 'utf8'))) hallados.push(p);
  };
  rutas.forEach(recorrer);
  return hallados;
}

export async function pasada0(dominio, { correo, sinCorte = false } = {}) {
  const out = { pasada: 0, dominio, ...(sinCorte ? { sin_corte: true } : {}) };
  const ex = enExclusion(dominio, correo);
  if (ex && !sinCorte) return { ...out, corte: 'excluido', detalle: ex };
  const cont = sinCorte ? [] : yaContactado(dominio);
  if (cont.length) return { ...out, corte: 'ya-contactado', detalle: { en: cont.slice(0, 5) } };

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
    html_no_alcanza: texto.length < 500 && spa, largo_texto_html: texto.length, spa_detectada: spa,
    redirige_a_otro_host: host !== dominio ? host : null };
}
