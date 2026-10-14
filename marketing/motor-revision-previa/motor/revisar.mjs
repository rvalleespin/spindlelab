#!/usr/bin/env node
// Motor de revision previa. Detector de SOSPECHA: dice donde mirar. No produce el hallazgo del correo.
// Uso:  NODE_USE_ENV_PROXY=1 node revisar.mjs <dominio> --id S01 --out ../corridas/<carpeta> [--correo x@y.cl] [--sin-corte]
import fs from 'node:fs';
import path from 'node:path';
import { pasada0, limpiarDominio } from './pasadas/p0.mjs';
import { pasada1 } from './pasadas/p1.mjs';
import { sondear } from './lib/navegador.mjs';
import { sondaBorde, sondaContacto, leerContenedor, entidadInterna } from './pasadas/p3.mjs';
import { veredicto } from './pasadas/p4.mjs';

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const dominio = limpiarDominio(args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1]?.startsWith('--') !== true) || '');
if (!dominio) { console.error('Uso: node revisar.mjs <dominio> --id S01 --out <carpeta> [--correo x] [--sin-corte]'); process.exit(2); }
const id = flag('--id') || dominio;
const salida = path.resolve(flag('--out') || `./corridas/${id}`, id);
fs.mkdirSync(salida, { recursive: true });
const escribir = (n, o) => fs.writeFileSync(path.join(salida, n), typeof o === 'string' ? o : JSON.stringify(o, null, 2));
const log = (...x) => console.error(`[${id}]`, ...x);

const ficha = { id, dominio, motor: 'v0', cuando: new Date().toISOString(), entorno: process.env.CLAUDE_CODE_REMOTE ? 'cloud (IP de datacenter, via proxy)' : 'local', sin_corte: args.includes('--sin-corte') || undefined };

const p0 = await pasada0(dominio, { correo: flag('--correo'), sinCorte: args.includes('--sin-corte') });
if (p0.corte) {
  Object.assign(ficha, { resultado: `descartado:${p0.corte}`, detalle: p0.detalle });
  escribir('ficha.json', ficha); escribir('ficha.md', `# ${id}\n\n**resultado:** descartado:${p0.corte}\n\n${JSON.stringify(p0.detalle, null, 2)}\n`);
  log('descartado:', p0.corte); process.exit(0);
}
log('p0 ok', p0.url_final, p0.html_no_alcanza ? '(el HTML no alcanza)' : '');
const p1 = await pasada1(p0);
log('p1 ok');

const runs = [];
for (const n of [1, 2]) { log(`navegador, corrida ${n}`); runs.push(await sondear(p0.url_final, { outDir: salida, etiqueta: `r${n}` })); }
const htmlEjecutado = (runs[0].html_ejecutado || '') + '\n' + (p0.html || '');
runs.forEach((r, i) => { const { html_ejecutado, ...limpio } = r; escribir(`navegador-r${i + 1}.json`, limpio); });
const corridas = runs.map(({ html_ejecutado, ...r }) => r);

const gtmIds = [...new Set([...p1.html.analitica.gtm, ...corridas[0].peticiones.map((p) => p.clasif?.id).filter((x) => /^GTM-/.test(x || ''))])].slice(0, 2);
log('contenedores', gtmIds.join(',') || '-');
const contenedores = []; for (const g of gtmIds) contenedores.push(await leerContenedor(g));

log('sonda de borde');
const edge = await sondaBorde(p0.url_final, p1.robots.agentes);
const formsDOM = corridas[0].B.dom?.formularios || [];
const correos = [...new Set([...p1.html.contacto.mailto, ...((p0.html.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || []).map((x) => x.toLowerCase()).filter((x) => !/\.(png|jpg|svg|webp|gif)$/.test(x)))])];
const contacto = await sondaContacto(formsDOM, correos, p0.url_final);
const entidad = entidadInterna(p1.html);

const v = veredicto({ p0, p1, runs: corridas, edge, contacto, entidad, contenedores, gtmIds, htmlEjecutado });
Object.assign(ficha, {
  resultado: v.resultado, url: p0.url_final, html_no_alcanza: p0.html_no_alcanza || undefined,
  hallazgo: v.hallazgo, ruta_interna: v.punteros, capa1: v.capa1, notas: v.notas,
  mapa: { contacto: p1.html.contacto, analitica: p1.html.analitica, infraestructura: p1.infraestructura, robots: p1.robots, llms_txt: p1.llms_txt, sitemap: p1.sitemap, jsonld: p1.html.jsonld },
  soporte: v.soporte, borde: edge, contacto_estructural: contacto, entidad,
  evidencia: { capturas: corridas.flatMap((r, i) => [r.A.captura, r.B.captura]), corridas: ['navegador-r1.json', 'navegador-r2.json'] },
  limites: ['Ninguna afirmación está verificada: la palabra verificado la escribe un humano que abrió el sitio.',
    'Contenedor de Tag Manager leído una vez (es un archivo estático).'],
});
escribir('ficha.json', ficha);

const cd = (c) => Object.entries(c.condiciones).map(([k, x]) => `  - **${k}** (${{ si: '✔', medias: '◐', no: '✘' }[x.v]}): ${x.razon}`).join('\n');
const blk = (c) => `### ${c.id} · ${c.nombre}\n- **estado:** ${c.estado}${c.tope ? ` (${c.tope})` : ''}\n- **línea:** ${c.linea} · **lo comprueba:** ${c.quien_comprueba}\n- **dónde mirar:** ${c.donde_mirar}\n- **se puede afirmar:** ${c.afirmable}\n- **NO se puede afirmar:** ${c.no_afirmable.join('; ')}\n${c.advertencias?.length ? `- **advertencias:** ${c.advertencias.join(' ')}\n` : ''}- **cuatro condiciones:**\n${cd(c)}\n`;
escribir('ficha.md', `# Ficha ${id}\n\n**resultado:** \`${v.resultado}\` · motor v0 · ${ficha.cuando} · ${ficha.entorno}\n\n> Detector de sospecha. Nada de esto está verificado.\n\n## Hallazgo (el de mayor posición con estado estable)\n\n${v.hallazgo ? blk(v.hallazgo) : '_Ninguno._\n'}\n## Ruta interna (no va en el correo)\n\n${v.punteros.length ? v.punteros.map(blk).join('\n') : '_Vacía._\n'}\n## Capa 1 (contexto)\n\n- con consecuencia: ${v.capa1.consecuencia.join(', ') || '-'}\n- higiene: ${v.capa1.higiene.join(', ') || '-'}\n${v.notas.length ? `\n## Notas\n\n${v.notas.map((n) => '- ' + n).join('\n')}\n` : ''}\n## Evidencia\n\n${ficha.evidencia.capturas.map((c) => `- ${c}`).join('\n')}\n`);
console.log(`${id} :: ${v.resultado}${v.hallazgo ? ' :: ' + v.hallazgo.id + ' (' + v.hallazgo.estado + ')' : ''}${v.punteros.length ? ' :: punteros ' + v.punteros.map((p) => p.id).join(',') : ''}`);
