#!/usr/bin/env node
// Busca el correo PUBLICADO de cada sitio de una lista de dominios. Sin Apollo, sin pagar: lee la portada y las paginas de contacto
// como lo haria un visitante (solo GET, pocas paginas por sitio) y extrae mailto:, correos en el texto y correos ofuscados con
// Cloudflare (data-cfemail). NO envia nada. NO adivina correos: solo devuelve los que el sitio muestra.
//   NODE_USE_ENV_PROXY=1 node contactos.mjs <dominios.csv|.txt> --out <salida.csv> [--concurrencia 8] [--max N]
// Entrada: CSV con columna `dominio` (y opcional `empresa`) o un .txt con un dominio por linea.
// Salida: dominio,empresa,estado,correo_principal,tipo,otros_correos,telefono,mx_ok,pagina,nota
import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns/promises';
import { leerCsv } from './lib/csv.mjs';
import { limpiarDominio } from './pasadas/p0.mjs';

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const entrada = args.find((a) => !a.startsWith('--') && !['--out', '--concurrencia', '--max'].includes(args[args.indexOf(a) - 1]));
if (!entrada || !arg('--out')) { console.error('Uso: node contactos.mjs <dominios.csv|.txt> --out <salida.csv> [--concurrencia 8] [--max N]'); process.exit(2); }
const salida = path.resolve(arg('--out')), conc = +arg('--concurrencia', 8), max = +arg('--max', 0);

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const RUTAS = ['/contacto', '/contact', '/contactenos', '/contáctanos', '/contactanos', '/nosotros', '/quienes-somos', '/equipo'];
const GENERICOS = /^(contacto|contact|info|informaciones|informacion|hola|ventas|comercial|administracion|admin|secretaria|recepcion|reservas|reserva|oficina|atencion|atencionalcliente|clientes|soporte|consultas|contactenos|mail|correo|gerencia|comunicaciones|rrhh|contabilidad|cotizaciones|propiedades|coor|somos|infochile|abogados|gerente|direccion|director|reclamos|postulaciones|trabaja|marketing|prensa|sac|cotiza|cotizacion|pagos|facturacion|finanzas|operaciones|booking)$/i;
const BASURA_DOM = /(sentry|wixpress|example|domain\.com|tudominio|tuempresa|email\.com|yourdomain|sentry-next|godaddy|cloudflare|googleapis|w3\.org|schema\.org|gravatar)/i;
const BASURA_EXT = /\.(png|jpe?g|gif|svg|webp|css|js|woff2?|ico)$/i;
const FREE = /^(gmail|hotmail|outlook|yahoo|live|icloud|msn)\./i;

const leer = () => {
  const t = fs.readFileSync(path.resolve(entrada), 'utf8');
  if (/\.csv$/i.test(entrada)) return leerCsv(path.resolve(entrada)).map((r) => ({ dominio: limpiarDominio(r.dominio || (r.email || '').split('@')[1] || ''), empresa: r.empresa || r.nombre || '' }));
  return t.split(/\r?\n/).map((l) => ({ dominio: limpiarDominio(l.trim()), empresa: '' }));
};
const vistos = new Set();
let lista = leer().filter((l) => l.dominio && !FREE.test(l.dominio) && !vistos.has(l.dominio) && vistos.add(l.dominio));
if (max) lista = lista.slice(0, max);

const decodeCf = (hex) => { try { const k = parseInt(hex.slice(0, 2), 16); let s = ''; for (let i = 2; i < hex.length; i += 2) s += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ k); return s; } catch { return ''; } };
const traer = async (url) => {
  try {
    const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(12000), headers: { 'user-agent': UA, 'accept-language': 'es-CL,es;q=0.9' } });
    const ct = r.headers.get('content-type') || '';
    if (!r.ok || !/html|text/i.test(ct)) return { ok: false, status: r.status, url: r.url, html: '' };
    const html = (await r.text()).slice(0, 1500000);
    return { ok: true, status: r.status, url: r.url, html };
  } catch (e) { return { ok: false, status: 0, url, html: '', error: String(e.cause?.code || e.message || e).slice(0, 60) }; }
};
const correosDe = (html) => {
  const h = html.replace(/&#64;|&commat;|\[at\]|\(at\)|\s@\s/gi, '@').replace(/&#46;|\[dot\]|\(dot\)/gi, '.');
  const set = new Set();
  for (const m of h.matchAll(/mailto:([^"'?>\s]+)/gi)) set.add(decodeURIComponent(m[1]).trim().toLowerCase());
  for (const m of h.matchAll(/data-cfemail="([0-9a-f]+)"/gi)) { const c = decodeCf(m[1]).toLowerCase(); if (c.includes('@')) set.add(c); }
  const texto = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
  for (const m of texto.matchAll(/[a-z0-9._%+-]{2,}@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}/gi)) set.add(m[0].toLowerCase());
  return [...set].map((c) => c.replace(/[.,;:)>\]]+$/, '')).filter((c) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/.test(c) && !BASURA_EXT.test(c) && !BASURA_DOM.test(c.split('@')[1]));
};
const telefonoDe = (html) => {
  const m = html.match(/tel:([+0-9()\-\s%]{7,20})/i) || html.replace(/<[^>]+>/g, ' ').match(/(\+?56[\s-]?9[\s-]?\d{4}[\s-]?\d{4}|\+?56[\s-]?2[\s-]?\d{4}[\s-]?\d{4}|\(?0?2\)?[\s-]?2\d{3}[\s-]?\d{4})/);
  return m ? decodeURIComponent(m[1]).replace(/\s+/g, ' ').trim() : '';
};
const enlacesContacto = (html, base) => {
  const out = new Set();
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]{0,120}?)<\/a>/gi)) {
    const href = m[1], txt = m[2].replace(/<[^>]+>/g, ' ');
    if (/contact|contáct|contact|nosotros|equipo|quienes|team/i.test(href + ' ' + txt)) { try { const u = new URL(href, base); if (u.protocol.startsWith('http')) out.add(u.href); } catch {} }
  }
  return [...out].slice(0, 3);
};
const puntaje = (c, dom) => {
  const [loc, d] = c.split('@'); let p = 0;
  if (d === dom || d.endsWith('.' + dom) || dom.endsWith('.' + d)) p += 10;
  if (FREE.test(d)) p -= 4;
  if (!GENERICOS.test(loc)) p += 3;          // preferimos una persona a un buzon generico
  return p;
};
const tieneMx = async (d) => {
  try { const m = await dns.resolveMx(d); if (m.length) return 'si'; } catch {}
  try {   // fallback: DNS sobre HTTPS (Cloudflare), sirve cuando el DNS directo esta bloqueado
    const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(d)}&type=MX`, { headers: { accept: 'application/dns-json' }, signal: AbortSignal.timeout(8000) });
    const j = await r.json(); return (j.Answer || []).some((a) => a.type === 15) ? 'si' : 'no';
  } catch { return 'no-verificado'; }
};
const tipoDe = (c) => (GENERICOS.test(c.split('@')[0]) ? 'generico' : 'personal');

const resolver = async (l) => {
  const base = 'https://' + l.dominio;
  let r = await traer(base + '/');
  if (!r.ok && r.status !== 0) r = await traer('https://www.' + l.dominio + '/');
  if (!r.ok) { const r2 = await traer('http://' + l.dominio + '/'); if (r2.ok) r = r2; }
  if (!r.ok) return { ...l, estado: r.status === 0 ? 'no-responde' : 'http-' + r.status, nota: r.error || '' };
  const paginas = [r]; const intentadas = new Set([r.url]);
  const extra = [...enlacesContacto(r.html, r.url), ...RUTAS.slice(0, 4).map((p) => new URL(p, r.url).href)];
  for (const u of extra) { if (paginas.length >= 5 || intentadas.has(u)) continue; intentadas.add(u); const p = await traer(u); if (p.ok) paginas.push(p); }
  const hallados = new Map(); let tel = '';
  for (const p of paginas) {
    for (const c of correosDe(p.html)) if (!hallados.has(c)) hallados.set(c, p.url);
    tel = tel || telefonoDe(p.html);
  }
  const dom = l.dominio.replace(/^www\./, '');
  const propio = (c) => { const d = c.split('@')[1]; return d === dom || d.endsWith('.' + dom) || dom.endsWith('.' + d) || FREE.test(d); };
  const terceros = [...hallados.keys()].filter((c) => !propio(c));
  const ord = [...hallados.keys()].filter(propio).sort((a, b) => puntaje(b, dom) - puntaje(a, dom));
  if (!ord.length) return { ...l, estado: 'sin-correo-publicado', telefono: tel, pagina: r.url, nota: `${paginas.length} paginas leidas` + (terceros.length ? `; solo correos de terceros: ${terceros.slice(0, 2).join(' ')}` : '') };
  const principal = ord[0];
  const mx = await tieneMx(principal.split('@')[1]);
  return { ...l, estado: 'correo-publicado', correo_principal: principal, tipo: tipoDe(principal), otros_correos: ord.slice(1, 5).join(' '), telefono: tel, mx_ok: mx, pagina: hallados.get(principal), nota: `${paginas.length} paginas leidas` };
};

const cols = ['dominio', 'empresa', 'estado', 'correo_principal', 'tipo', 'otros_correos', 'telefono', 'mx_ok', 'pagina', 'nota'];
const csv = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const res = new Array(lista.length); let i = 0, hechos = 0;
await Promise.all(Array.from({ length: conc }, async () => {
  while (i < lista.length) { const k = i++; res[k] = await resolver(lista[k]).catch((e) => ({ ...lista[k], estado: 'error', nota: String(e.message || e).slice(0, 80) })); hechos++; if (hechos % 20 === 0) console.error(`[contactos] ${hechos}/${lista.length}`); }
}));
fs.mkdirSync(path.dirname(salida), { recursive: true });
fs.writeFileSync(salida, [cols.join(','), ...res.map((r) => cols.map((c) => csv(r[c])).join(','))].join('\n') + '\n');
const cuenta = res.reduce((a, r) => { a[r.estado] = (a[r.estado] || 0) + 1; return a; }, {});
console.error(`[contactos] ${res.length} dominios -> ${salida}`); console.error(JSON.stringify(cuenta));
