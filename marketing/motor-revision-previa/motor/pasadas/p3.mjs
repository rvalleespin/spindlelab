// Pasada 3: sondas dirigidas. Cada una corre DOS rondas independientes (estrategia §3: todo dos veces).
import dns from 'node:dns/promises';
import { pedir, UA_NORMAL } from '../lib/http.mjs';

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

// OJO: son aproximaciones del nombre publicado de cada agente, desde una IP que NO es la oficial.
// Por eso el motor solo puede decir "al presentarse con el nombre X, el servidor respondio Y",
// nunca "bloquea al bot real X".
export const AGENTES_IA = {
  'GPTBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot',
  'OAI-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  'ChatGPT-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
  'ClaudeBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  'Claude-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-User/1.0; +Claude-User@anthropic.com)',
  'PerplexityBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  'Perplexity-User': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Perplexity-User/1.0',
};

const HUELLAS = [
  ['Cloudflare (regla del borde)', (c, b) => /cloudflare/i.test(c.server || '') && (c['cf-mitigated'] || /Attention Required! \| Cloudflare|Just a moment|cf-error-details|error code: 10(10|15|20)/i.test(b))],
  ['Sucuri (firewall)', (c, b) => c['x-sucuri-id'] || /Sucuri Website Firewall/i.test(b)],
  ['Wordfence (plugin de seguridad)', (c, b) => /Wordfence|Your access to this site has been limited/i.test(b)],
  ['Imperva/Incapsula', (c, b) => c['x-iinfo'] || /Incapsula incident/i.test(b)],
  ['Akamai', (c, b) => /AkamaiGHost/i.test(c.server || '') || /Reference #\d+\.[0-9a-f]+/i.test(b)],
  ['AWS WAF / CloudFront', (c, b) => (c['x-amz-cf-id'] || c['x-amzn-waf-action']) && /Request blocked|could not be satisfied/i.test(b)],
  ['ModSecurity del hosting', (c, b) => /mod_security|ModSecurity|Not Acceptable!/i.test(b)],
];
const nombrarCausa = (cab, cuerpo) => HUELLAS.find(([, f]) => f(cab, cuerpo))?.[0] || null;
const DESAFIO = /Just a moment|Attention Required|cf-chl|Checking your browser|captcha|Access Denied/i;

async function rondaBorde(url, agentes) {
  const normal = await pedir(url, { ua: UA_NORMAL, ms: 8000 });
  const filas = {};
  if (!normal.ok) return { normal: { ok: false, error: normal.error }, agentes: {}, abortada: 'el sitio no respondio al agente normal en 8 s' };
  for (const [nombre, ua] of Object.entries(agentes)) {
    const r = await pedir(url, { ua, ms: 8000 });
    const bloqueado = r.ok && ([401, 403, 406, 429, 451, 503].includes(r.status) || (r.status < 300 && DESAFIO.test(r.cuerpo.slice(0, 4000)) && r.cuerpo.length < 20000));
    filas[nombre] = { ok: r.ok, status: r.status, bytes: r.cuerpo?.length ?? 0, bloqueado, causa: bloqueado ? nombrarCausa(r.cab, r.cuerpo) : null, error: r.error };
    await dormir(400);
  }
  return { normal: { ok: normal.ok, status: normal.status, bytes: normal.cuerpo?.length ?? 0 }, agentes: filas };
}

export async function sondaBorde(url, robotsAgentes) {
  // Solo se prueban agentes que robots.txt SI deja pasar: si robots los bloquea, es visible y es capa 1.
  const agentes = Object.fromEntries(Object.entries(AGENTES_IA).filter(([n]) => !robotsAgentes?.[n]?.bloquea_en_robots));
  const rondas = [];
  for (let i = 0; i < 2; i++) { rondas.push(await rondaBorde(url, agentes)); await dormir(1500); }
  const normalOk = rondas.every((r) => r.normal.ok && r.normal.status < 400);
  const mezclaAbortada = rondas.some((r) => r.abortada);
  const estables = mezclaAbortada ? [] : Object.keys(agentes).filter((n) => rondas.every((r) => r.agentes[n]?.bloqueado));
  const causas = estables.map((n) => rondas[0].agentes[n].causa).filter(Boolean);
  const mezcla = Object.keys(agentes).some((n) => rondas.some((r) => r.agentes[n]?.bloqueado) && !rondas.every((r) => r.agentes[n]?.bloqueado));
  return { rondas, probados: Object.keys(agentes), omitidos_por_robots: Object.keys(AGENTES_IA).filter((n) => !(n in agentes)),
    normal_ok_en_ambas: normalOk, bloqueados_en_ambas: estables, causa_nombrada: causas[0] || null, discrepancia_entre_rondas: mezcla,
    limite: 'UA presentado desde una IP que no es la oficial del agente: un firewall que verifica bots por IP puede dejar pasar al real.' };
}

// Contenedor de Tag Manager: que etiquetas tiene. Es la parte que exige oficio.
const FN_EVENTO = new Set(['__gaawe', '__awct', '__flc', '__fls', '__baut']);
export async function leerContenedor(gtmId) {
  const r = await pedir(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
  if (!r.ok || r.status !== 200) return { id: gtmId, leido: false, motivo: r.error || `HTTP ${r.status}` };
  const t = r.cuerpo;
  const funciones = [...new Set([...t.matchAll(/"function":"(__[a-z0-9_]+)"/gi)].map((m) => m[1].toLowerCase()))];
  const htmlTags = [...t.matchAll(/"vtp_html":"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  return { id: gtmId, leido: true, bytes: t.length, funciones,
    tags_de_evento: funciones.filter((f) => FN_EVENTO.has(f)),
    config_ga4: funciones.includes('__gaawc') || funciones.includes('__googtag'),
    html_personalizado: htmlTags.length,
    html_con_conversion: htmlTags.some((h) => /fbq\(\\?['"]track\\?['"],\s*\\?['"](Lead|Contact|CompleteRegistration|Schedule|SubmitApplication)|gtag\(\\?['"]event|generate_lead|conversion/i.test(h)),
    menciona_conversion: /generate_lead|\bconversion\b|"Lead"/i.test(t), etiquetas_ads_con_label: /AW-\d+\/[\w-]{6,}/.test(t) };
}

// Contacto estructural: un GET al destino del formulario NO es un envio.
async function destinoFormulario(f, paginaUrl) {
  const act = typeof f.accion_abs === 'string' ? f.accion_abs : '';
  if (!act || /^(javascript:|#)/i.test(String(f.action || '')) || act === paginaUrl || act.startsWith(paginaUrl + '#')) return { estado: 'no-evaluable', porque: 'el envio lo maneja JavaScript o el CMS' };
  const r = await pedir(act, { ms: 12000 });
  if (!r.ok) return { estado: /ENOTFOUND|EAI_AGAIN/.test(r.error || '') ? 'roto-dns' : 'no-concluyente', porque: r.error };
  if ([404, 410].includes(r.status)) return { estado: 'roto-404', status: r.status };
  if ([401, 403, 429].includes(r.status)) return { estado: 'no-concluyente', porque: `HTTP ${r.status} (puede ser un firewall)` };
  return { estado: 'vivo', status: r.status };
}
// Control: si el resolutor no puede dar MX de un dominio que sabemos que tiene, NO se concluye nada.
// (En el entorno cloud el resolutor falla con ENODATA hasta para gmail.com.)
let _mxDisponible = null;
async function mxDisponible() {
  if (_mxDisponible === null) { try { _mxDisponible = (await dns.resolveMx('gmail.com')).length > 0; } catch { _mxDisponible = false; } }
  return _mxDisponible;
}
async function mxDe(correo) {
  const dom = correo.split('@')[1]; if (!dom) return null;
  if (!(await mxDisponible())) return { dominio: dom, tiene_mx: null, no_evaluable: 'el resolutor de este entorno no sirve registros MX (falla con gmail.com)' };
  try { const mx = await dns.resolveMx(dom); return { dominio: dom, tiene_mx: mx.length > 0 }; }
  catch (e) {
    if (e.code === 'ENODATA' || e.code === 'ENOTFOUND') {
      try { await dns.resolve4(dom); return { dominio: dom, tiene_mx: false, tiene_a: true }; } catch { return { dominio: dom, tiene_mx: false, tiene_a: false }; }
    }
    return { dominio: dom, tiene_mx: null, error: e.code };
  }
}
export async function sondaContacto(formularios, correos, paginaUrl) {
  const rondas = [];
  for (let i = 0; i < 2; i++) {
    const forms = [];
    for (const f of formularios.filter((x) => x.pide_correo_o_tel !== false)) forms.push({ action: f.accion_abs || f.action, ...(await destinoFormulario(f, paginaUrl)) });
    const mails = []; for (const c of correos.slice(0, 5)) mails.push({ correo_dominio: c.split('@')[1], ...(await mxDe(c)) });
    rondas.push({ forms, mails }); await dormir(1000);
  }
  const rotosForm = rondas[0].forms.filter((f, i) => /^roto/.test(f.estado) && rondas[1].forms[i]?.estado === f.estado);
  const rotosMail = rondas[0].mails.filter((m, i) => m.tiene_mx === false && m.tiene_a === false && rondas[1].mails[i]?.tiene_mx === false);
  return { rondas, formularios_rotos_en_ambas: rotosForm, correos_sin_mx_en_ambas: rotosMail };
}

// Entidad DENTRO del sitio. El cruce con la ficha de Google y LinkedIn no se automatiza.
const SUFIJOS = /\b(spa|s\.?a\.?|ltda|limitada|e\.?i\.?r\.?l\.?|sociedad|y cia|y compania|chile|cl)\b/g;
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(SUFIJOS, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
export function entidadInterna({ titulo, og_site_name, jsonld }) {
  const fuentes = [];
  if (og_site_name) fuentes.push(['og:site_name', og_site_name]);
  for (const o of jsonld?.org || []) { if (o.name) fuentes.push(['JSON-LD name', o.name]); if (o.legalName) fuentes.push(['JSON-LD legalName', o.legalName]); }
  if (titulo) for (const parte of titulo.split(/\s[|\-–—·]\s/)) if (parte.trim().length > 2) fuentes.push(['title', parte.trim()]);
  const ncs = fuentes.map(([f, v]) => ({ fuente: f, valor: v, n: norm(v) })).filter((x) => x.n.length > 2);
  const marcas = ncs.filter((x) => x.fuente !== 'title');
  // Distintos = ninguno contiene al otro. Solo se comparan fuentes que DECLARAN nombre (no los trozos del title).
  const distintos = [];
  for (const a of marcas) for (const b of marcas) if (a.fuente < b.fuente || (a.fuente === b.fuente && a.valor < b.valor))
    if (!a.n.includes(b.n) && !b.n.includes(a.n)) distintos.push([a, b]);
  const enTitle = marcas.length ? !ncs.filter((x) => x.fuente === 'title').some((t) => marcas.some((m) => t.n.includes(m.n) || m.n.includes(t.n))) : null;
  return { fuentes: ncs.map(({ fuente, valor }) => ({ fuente, valor })), nombres_en_conflicto: distintos.slice(0, 3).map(([a, b]) => [`${a.fuente}: ${a.valor}`, `${b.fuente}: ${b.valor}`]), marca_declarada_ausente_del_title: enTitle };
}

// F7: enlaces internos de la portada que responden 404/410. Dos rondas; solo cuenta lo que se repite. Un 403 o un timeout NO es un enlace roto.
export async function sondaEnlaces(baseUrl, hrefs) {
  const base = new URL(baseUrl);
  const internos = [...new Set(hrefs.map((h) => { try { const u = new URL(h, base); if (u.host !== base.host || !/^https?:$/.test(u.protocol)) return null; u.hash = ''; return u.href; } catch { return null; } }).filter(Boolean))]
    .filter((u) => u !== base.href && !/\.(pdf|jpe?g|png|webp|gif|svg|zip|docx?|xlsx?|mp4)(\?|$)/i.test(u) && !/wp-admin|wp-login|logout|cart|checkout/i.test(u)).slice(0, 30);
  const ronda = async () => {
    const rotos = new Set(); let i = 0;
    await Promise.all(Array.from({ length: 4 }, async () => { while (i < internos.length) { const u = internos[i++]; const r = await pedir(u, { ms: 8000 }); if (r.ok && [404, 410].includes(r.status)) rotos.add(u); } }));
    return rotos;
  };
  const r1 = await ronda(); await dormir(1000); const r2 = await ronda();
  const enAmbas = [...r1].filter((u) => r2.has(u));
  return { revisados: internos.length, rotos_en_ambas: enAmbas, discrepancia_entre_rondas: [...r1].filter((u) => !r2.has(u)).length + [...r2].filter((u) => !r1.has(u)).length };
}
