// Pasada 1: capa 1, solo HTTP, sin JavaScript. Produce un MAPA y punteros, nunca ganchos.
import { pedir } from '../lib/http.mjs';

const RE_POLITICA = /privacidad|privacy|datos[-_ ]personales|proteccion[-_ ]de[-_ ]datos|politica[s]?[-_ ]de[-_ ](privacidad|cookies|datos)/i;
const BOTS_IA = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'CCBot'];

// Lee robots.txt y dice, por agente, si hay un Disallow: / que le toque (grupo propio o "*").
export function robotsPorAgente(txt) {
  const grupos = []; let g = null;
  for (const lineaCruda of txt.split(/\r?\n/)) {
    const linea = lineaCruda.replace(/#.*/, '').trim(); if (!linea) continue;
    const [k, ...v] = linea.split(':'); const clave = k.trim().toLowerCase(); const val = v.join(':').trim();
    if (clave === 'user-agent') { if (!g || g.reglas.length) { g = { agentes: [], reglas: [] }; grupos.push(g); } g.agentes.push(val.toLowerCase()); }
    else if (g && (clave === 'disallow' || clave === 'allow')) g.reglas.push([clave, val]);
  }
  const res = {};
  for (const bot of BOTS_IA) {
    const propio = grupos.find((x) => x.agentes.includes(bot.toLowerCase()));
    const estrella = grupos.find((x) => x.agentes.includes('*'));
    const grupo = propio || estrella;
    const bloquea = !!grupo && grupo.reglas.some(([c, v]) => c === 'disallow' && v === '/') && !grupo.reglas.some(([c, v]) => c === 'allow' && v === '/');
    res[bot] = { bloquea_en_robots: bloquea, regla_de: propio ? 'propia' : (estrella ? '*' : 'ninguna') };
  }
  return res;
}

export function extraer(html, base) {
  const abs = (h) => { try { return new URL(h, base).href; } catch { return h; } };
  const meta = (re) => (html.match(re) || [])[1]?.trim();
  const forms = [...html.matchAll(/<form\b([^>]*)>/gi)].map((m) => {
    const a = m[1]; const action = (a.match(/action=["']([^"']*)["']/i) || [])[1] ?? '';
    return { action, accion_abs: action ? abs(action) : '', metodo: ((a.match(/method=["']([^"']*)["']/i) || [])[1] || 'get').toLowerCase() };
  });
  const hrefs = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const ids = (re) => [...new Set([...html.matchAll(re)].map((m) => m[1] || m[0]))];
  const jsonld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
  const nodos = jsonld.flatMap((j) => (j['@graph'] ? j['@graph'] : [j]));
  const org = nodos.filter((n) => /Organization|LocalBusiness|Dentist|LegalService|MedicalOrganization|Hotel|RealEstateAgent|Accountant|ProfessionalService|Store|Restaurant/i.test([].concat(n['@type'] || []).join(',')));
  return {
    titulo: meta(/<title[^>]*>([\s\S]*?)<\/title>/i), og_site_name: meta(/property=["']og:site_name["'][^>]*content=["']([^"']*)["']/i) || meta(/content=["']([^"']*)["'][^>]*property=["']og:site_name["']/i),
    descripcion: meta(/name=["']description["'][^>]*content=["']([^"']*)["']/i),
    formularios: forms,
    contacto: { tel: hrefs.filter((h) => /^tel:/i.test(h)).length, mailto: [...new Set(hrefs.filter((h) => /^mailto:/i.test(h)).map((h) => h.slice(7).split('?')[0].toLowerCase()))],
      whatsapp: hrefs.filter((h) => /wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(h)).slice(0, 4) },
    analitica: { gtm: ids(/\b(GTM-[A-Z0-9]{4,10})\b/g), ga4: ids(/\b(G-[A-Z0-9]{8,12})\b/g), ua: ids(/\b(UA-\d{4,10}-\d+)\b/g), ads: ids(/\b(AW-\d{6,12})\b/g),
      meta_pixel: /connect\.facebook\.net|fbq\(/i.test(html), clarity: /clarity\.ms/i.test(html), hotjar: /hotjar/i.test(html),
      gtag_eventos_inline: [...html.matchAll(/gtag\(\s*['"]event['"]\s*,\s*['"]([^'"]+)['"]/g)].map((m) => m[1]) },
    politica_en_html: hrefs.filter((h) => RE_POLITICA.test(h)).map(abs).slice(0, 5),
    jsonld: { tipos: [...new Set(nodos.flatMap((n) => [].concat(n['@type'] || [])))], org: org.map((n) => ({ name: n.name, legalName: n.legalName })) },
  };
}

export async function pasada1(p0) {
  const base = p0.url_final; const origen = new URL(base).origin;
  const html = extraer(p0.html, base);
  const [rob, llms, sitemap] = await Promise.all([pedir(origen + '/robots.txt'), pedir(origen + '/llms.txt'), pedir(origen + '/sitemap.xml', { metodo: 'GET' })]);
  const robotsOk = rob.ok && rob.status === 200 && !/<html/i.test(rob.cuerpo.slice(0, 300));
  const hdr = p0.cabeceras || {};
  return { pasada: 1, html,
    robots: robotsOk ? { agentes: robotsPorAgente(rob.cuerpo), sitemap_declarado: /^sitemap:/im.test(rob.cuerpo) } : { ausente: true },
    llms_txt: llms.ok && llms.status === 200 && llms.cuerpo.trim().length > 20 && !/<html/i.test(llms.cuerpo.slice(0, 200)),
    sitemap: sitemap.ok && sitemap.status === 200 && /<(urlset|sitemapindex)/i.test(sitemap.cuerpo),
    infraestructura: { server: hdr.server || null, cloudflare: /cloudflare/i.test(hdr.server || '') || 'cf-ray' in hdr, x_powered_by: hdr['x-powered-by'] || null },
    notas: ['Capa 1: lo que cualquier chequeo gratis tambien ve. No produce ganchos.'] };
}
