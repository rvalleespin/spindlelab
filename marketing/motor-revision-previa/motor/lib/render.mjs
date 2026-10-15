// Ficha en Markdown a partir de ficha.json (sirve para corridas nuevas y para re-emitir las ya guardadas).
const marca = { si: '✔', medias: '◐', no: '✘' };
const cond = (c) => Object.entries(c.condiciones).map(([k, x]) => `  - **${k}** (${marca[x.v]}): ${x.razon}`).join('\n');

function propuestaMd(p) {
  if (!p) return '';
  const pd = p.por_definir?.length ? `- **por definir (decide Ramón):** ${p.por_definir.join(' ')}\n` : '';
  return `- **Propuesta (el arreglo que se vende)**\n  - **cómo se le diría (castellano, para el correo):** «${p.en_castellano}»\n  - **el hecho técnico detrás (no va en el correo):** ${p.problema_tecnico}\n  - **se vende:** ${p.se_vende.producto} (${p.se_vende.linea}). ${p.se_vende.alcance}\n  - **precio en el correo:** ${p.se_vende.precio_en_el_correo}\n${p.se_vende.linea_de_precio ? `  - **línea de precio (referencia):** «${p.se_vende.linea_de_precio}»\n` : ''}  - **servicio publicado más cercano:** ${p.se_vende.vehiculo_publicado} · **plazo:** ${p.se_vende.plazo}\n  - **frase de arreglo:** «${p.frase_de_arreglo}»\n  - **puerta a la reunión:** «${p.apertura_a_reunion}»${p.cierre_sugerido ? `\n  - **cierre sugerido:** ${p.cierre_sugerido}` : ''}\n  - **texto:** ${p.estado_del_texto} · **tono:** ${typeof p.revision_de_tono === 'string' ? p.revision_de_tono : 'PROBLEMAS: ' + p.revision_de_tono.problemas.join(', ')}\n  - **registro:** ${p.registro}\n${pd ? '  ' + pd : ''}`;
}

export function bloque(c) {
  return `### ${c.id} · ${c.nombre}\n- **capa:** ${c.capa || 2} · **estado:** ${c.estado}${c.tope ? ` (${c.tope})` : ''}\n- **línea:** ${c.linea} · **lo comprueba:** ${c.quien_comprueba}\n- **dónde mirar:** ${c.donde_mirar}\n- **se puede afirmar:** ${c.afirmable}\n- **NO se puede afirmar:** ${c.no_afirmable.join('; ')}\n${c.advertencias?.length ? `- **advertencias:** ${c.advertencias.join(' ')}\n` : ''}${propuestaMd(c.propuesta)}- **cuatro condiciones:**\n${cond(c)}\n`;
}

export function renderFicha(f) {
  const ruta = f.ruta_interna || [], capa1 = f.capa1 || { consecuencia: [], higiene: [] };
  return `# Ficha ${f.id}\n\n**resultado:** \`${f.resultado}\` · motor v0 · ${f.cuando} · ${f.entorno}\n\n> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.\n\n## Hallazgo (el de mayor posición con estado estable)\n\n${f.hallazgo ? bloque(f.hallazgo) : '_Ninguno._\n'}\n## Ruta interna (no va en el correo)\n\n${ruta.length ? ruta.map(bloque).join('\n') : '_Vacía._\n'}\n## Capa 1 (contexto)\n\n- con consecuencia: ${capa1.consecuencia.join(', ') || '-'}\n- higiene: ${capa1.higiene.join(', ') || '-'}\n${f.notas?.length ? `\n## Notas\n\n${f.notas.map((n) => '- ' + n).join('\n')}\n` : ''}\n## Evidencia\n\n${(f.evidencia?.capturas || []).map((c) => `- ${c}`).join('\n')}\n`;
}
