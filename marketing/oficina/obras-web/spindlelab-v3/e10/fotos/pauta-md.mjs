// pauta-md.mjs · arma pauta.md desde pauta.json (Bruno, E10, v4 del 16-oct-2026).
// Lo llama `node generar.mjs --sincronizar`; generar.mjs no genera si pauta.md no es el que sale de
// aquí. Determinista: el mismo pauta.json da el mismo pauta.md, byte a byte. Sin dependencias.
//
// La prosa fija (estilo, uso del script, lo que no hace) vive en este archivo; todo lo que es dato
// (fichas, reservas, equivalencia, recortes, costos, revisión, acabado, pruebas, historial) sale de
// pauta.json.

const coma = (n, d = 2) => n.toFixed(d).replace('.', ',');
const lista = (xs) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} y ${xs.at(-1)}`);
const sinPunto = (s) => String(s).replace(/\.$/, '');
const mayuscula = (s) => s.replace(/^./, (c) => c.toUpperCase());

export function armarPautaMd(pauta, a) {
  const { clave, formatos, usd, veces, por, costoUSD, DIRECCIONES, COBERTURA_MIN, ESPACIOS_REL, anchosDe, coberturaMin } = a;
  const nombreDir = (d) => DIRECCIONES[d] ?? d;
  const fotos = pauta.fotos;
  const reservas = pauta.reservas ?? [];
  const eq = pauta.equivalencia_lucia ?? {};
  const fila = (cs) => `| ${cs.join(' | ')} |`;
  const numeros = [...new Set(fotos.map((f) => f.id))];
  const deDir = (d) => fotos.filter((f) => f.direccion === d).map((f) => f.id);
  const variantes = 2;
  const total = fotos.length * variantes;
  const costoGemini = fotos.reduce((t, f) => t + costoUSD(pauta, 'gemini', f, 'high'), 0) * variantes;
  const costoOpenAI = fotos.reduce((t, f) => t + costoUSD(pauta, 'openai', f, 'high'), 0) * variantes;
  const e = pauta.estilo;
  const out = [];
  const p = (...xs) => out.push(...xs);

  // ------------------------------------------------------------ cabecera
  p(`# Pauta de fotos con IA · E10 (spindlelab-v3)

${pauta.autor} · v${pauta.version}, ${pauta.fecha} · **Estado: lista para generar en una sesión con
clave. Aquí no se generó ninguna foto** (no hay \`GEMINI_API_KEY\` ni \`OPENAI_API_KEY\` en este entorno).

> Este archivo se escribe solo: sale de \`pauta.json\` con \`node generar.mjs --sincronizar\`. No se
> edita a mano. Si no es el que sale de \`pauta.json\`, \`generar.mjs\` no genera.

| Archivo | Para qué |
|---|---|
| \`pauta.json\` | La fuente de verdad. Una ficha por espacio de foto del tablero. El script lee de aquí y nada más |
| \`pauta.md\` | Esto: la misma pauta para leerla. Lo escribe \`pauta-md.mjs\` desde \`pauta.json\` |
| \`generar.mjs\` | El script que comprueba la pauta contra el tablero y genera (Node 22, sin dependencias). Uso en §4 |
| \`pauta-md.mjs\` | Arma este archivo; lo llama \`generar.mjs --sincronizar\` |
| \`salida/\` | Se crea en la primera corrida: \`<F>-<dirección>-<n>.png\`, \`registro.json\` y \`oro/\` con las máscaras |

Insumos: \`e10/lock-the-ready.md\` (§7 fotos, §9 Gehl, §10 y §10b qué se toma, §13 techos; el §12,
amarillo y oro, en pausa con el logo), \`e10/referentes/marcas-15oct.json\`, el manual de marca §07b
(personas), los espacios de foto del tablero (\`${ESPACIOS_REL}\`), la paleta propia de
\`tableros/e10-direcciones/proto/e10/tokens.css\` y el acta de Javiera (\`e10/acta-paso-2.md\`).

> **El logo y el oro, en pausa.** Ramón, 16-oct: el logo se rediseña después de elegir dirección. El
> punto dorado y la regla de un oro por vista no restringen estas fotos: la pauta ya no prohíbe dorado,
> amarillo ni madera, y ninguna foto se descarta por oro. \`generar.mjs\` lo sigue midiendo, solo como dato.

---

## 0 · En una línea

Fotos documentales de trabajo real en empresas chicas y medianas de Santiago, tomadas desde el lado
de la empresa que vende y no desde el de la consultora. Luz de día neutra, 35 mm a la altura del
ojo, grano fino y color natural sobre neutros fríos con acentos chicos. La gente trabaja en lo suyo,
de espaldas o de perfil, y nunca posa ni se presenta como «el equipo». Se usan dos encuadres, uno por
dirección: **Taller**, cerca y lleno, y **Pizarra limpia**, abierto y quieto. Cada ficha lleva el de
la dirección donde va.

## 1 · El estilo fijo (lo que hace que todas parezcan del mismo fotógrafo)

| Rasgo | La regla | Por qué |
|---|---|---|
| **Luz** | Solo de día, media mañana, balance neutro (~5500 K), suave y pareja, con sombras leves. Lámparas y ampolletas **apagadas** | The Ready fotografía con lámparas encendidas, jardín al sol y hojas de otoño (lock §7): junto con la casa de campo de Hoare, es lo que Ramón llamó «pastoral gringa». La luz de día neutra es lo que hace que estas fotos sean de Santiago y no de un catálogo gringo |
| **Grano** | Grano fino de película, negros levemente levantados, sin virado ni viñeta. Al final se iguala con un solo grano en todas (§6) | The Ready trae el grano en el archivo, no como capa encima: ruido 12,1 contra 8,1 de una foto sin tratar (lock §7, \`lock/the-ready/foto-grano-hero-x2.png\`) |
| **Lente y altura** | Cámara de cuadro completo con 35 mm, a la altura del ojo o un poco más arriba, perspectiva natural, sin gran angular | Lo documental de las dos referencias; el gran angular delata el render |
| **Encuadre Taller** | ${e.encuadre.taller.es} | The Ready a fondo: «más gente trabajando» |
| **Encuadre Pizarra limpia** | ${e.encuadre.pizarra.es} | El aire de Gehl: una persona chica en un cuadro grande (lock §9) |
| **Paleta** | Base en neutros fríos: blanco roto (eco del papel \`#F7F5F0\`), hormigón, grafito, marino y ciruela profundo (eco de la tinta \`#341F34\`). Acentos chicos de nota adhesiva: rosado, lima, lavanda y celeste | La foto conversa con la paleta propia de \`tokens.css\` (papel y una sola tinta ciruela) sin repetir sus bandas. Los acentos son de la escena, no de la página: la paleta propia no tiene lima ni lavanda, y si Ramón elige en el tablero los colores exactos de The Ready, donde sí están, también calzan |
| **El oro y el punto dorado** | En pausa. Ninguna foto se descarta por oro, y la pauta ya no prohíbe dorado, amarillo ni madera | Ramón, 16-oct: el logo se rediseña después de elegir dirección. \`generar.mjs\` sigue midiendo el oro y lo anota como dato para la marca nueva |
| **Lugares (sí)** | ${mayuscula(lista(e.lugares.si))} | Oficinas y talleres reales de Chile, no stock gringo |
| **Lugares (no)** | ${mayuscula(lista(e.lugares.no))} | De Hoare, Ramón dijo «parece pastoral gringa» |
| **Personas** | Adultos chilenos y latinoamericanos de 25 a 60 años, de cuerpos, tonos de piel y pelo variados, con ropa de trabajo común en grafito, marino, ciruela, mezclilla, blanco roto o salvia. Absortos en la tarea, de espaldas, de perfil o de tres cuartos de espalda. **Nadie mira a cámara, nadie posa ni sonríe para la foto.** Manos relajadas y anatómicamente correctas, muchas veces tapadas en parte por objetos | Gente trabajando de verdad (The Ready), sin la grilla de retratos del equipo, que no se toma (lock §10) |
| **Texto y marcas** | Los papeles muestran solo líneas y bloques grises borrosos. Las pantallas van de espaldas o fuera de foco. Ningún logo en tapas de notebook, ropa, tazas, cajas ni muros | Texto inventado nítido es la señal más rápida de imagen generada |
| **Forma en la página** | Radio 0, sin velo, nada escrito encima salvo una etiqueta de pieza | Lock §7 y §10; manual §07b |

### Personas: son ambiente, nunca equipo ni clientes

La regla nueva (plan del 15-oct) permite personas generadas como ambiente con una condición: **nada
puede presentarlas como el equipo de SpindleLab ni como clientes.** En la práctica:

- ${pauta.reglas.personas}
${pauta.reglas.donde_no_van.map((x) => `- ${x}`).join('\n')}
- **Alt:** ${pauta.reglas.alt}
- **Aprobación:** ${pauta.reglas.aprobacion}

### Por qué la gente está en SU empresa

SpindleLab es una persona, y la home lo dice. Una foto de cinco consultores en un taller la
contradice. Por eso nadie de estas fotos está «en una sesión con un asesor»: están en su bodega, su
maestranza, su mesón o su sala de reuniones, haciendo su trabajo. Es el mundo del lector, no el
nuestro.
`);

  // ------------------------------------------------------------ §2 las fotos
  const advertencias = [];
  for (const f of fotos) {
    const fm = formatos(pauta, f);
    for (const prov of ['gemini', 'openai']) {
      for (const ancho of anchosDe(f)) {
        const v = fm[prov].vistas[ancho];
        if (!v.alcanza) advertencias.push({ id: f.id, escala: Boolean(v.archivo), texto: `${clave(f)} con ${prov === 'gemini' ? 'Gemini' : 'OpenAI'} a ${ancho}: ${v.recorte.join('×')} para ${f.espacio[`css_${ancho}`].join('×')} css (${veces(v.cobertura)})` });
      }
    }
  }
  const filasFormato = fotos.map((f) => {
    const fm = formatos(pauta, f);
    const celda = (prov, ancho) => {
      const v = fm[prov].vistas[ancho];
      return `${v.recorte.join('×')} · ${veces(v.cobertura)}${v.alcanza ? '' : ' ⚠'}`;
    };
    return fila([`**${f.id}**`, nombreDir(f.direccion), `\`${f.gemini.aspectRatio}\` → ${fm.gemini.fuente.join('×')}`, celda('gemini', '1440'), celda('gemini', '390'), `\`${f.openai.size}\``, celda('openai', '1440'), celda('openai', '390')]);
  });
  const ids = (xs) => [...new Set(xs.map((x) => x.id))];
  const conTableta = fotos.filter((f) => anchosDe(f).includes('1023'));
  const con1440 = fotos.filter((f) => f.cobertura_min?.['1440'] !== undefined);
  const conArchivos = fotos.filter((f) => f.archivo);
  const mismas = lista(ids(conTableta)) === lista(ids(con1440));
  const pideLock = !conTableta.length ? ''
    : mismas
      ? ` El lock §7 («Tamaño de archivo por tramo») pide dpr 2 en cada tramo: en ${lista(ids(conTableta))}, ${coberturaMin(con1440[0], '1440')}× a 1440 y ${COBERTURA_MIN[1023]}× también en la tableta, medida a 1023, que va aparte, abajo («Tableta y escalado»).`
      : ` El lock §7 («Tamaño de archivo por tramo») pide ${COBERTURA_MIN[1023]}× también en la tableta, medida a 1023 en ${lista(ids(conTableta))}${con1440.length ? `, y ${coberturaMin(con1440[0], '1440')}× a 1440 en ${lista(ids(con1440))}` : ''}; la tableta va aparte, abajo («Tableta y escalado»).`;

  p(`## 2 · Las fotos

**Una sola numeración, la del tablero.** Cada ficha es un espacio de foto de
\`${ESPACIOS_REL}\`: el F<n> es el número que se ve en el rótulo del tablero, y la
dirección va en cada ficha. Son ${fotos.length} fichas para ${numeros.length} números: F8 tiene una por dirección, porque cada
ficha lleva el encuadre de la dirección donde va (y las dos direcciones nunca se publican juntas).
**Taller** usa ${lista(deDir('taller'))} y **Pizarra limpia** ${lista(deDir('pizarra'))}. Todas tienen espacio en el tablero, así que todas son
prioridad 1. Las fotos de la v1 que no tienen espacio están en «Reservas», al final de esta sección,
y no se generan. La equivalencia con la numeración vieja está en §3.

| F | Dirección | Foto | Página · sección | Espacio a 1440 | Espacio a 390 | Personas |
|---|---|---|---|---|---|---|
${fotos.map((f) => fila([`**${f.id}**`, nombreDir(f.direccion), f.titulo_es, `${f.espacio.pagina.split(' (')[0]} · ${sinPunto(f.espacio.seccion.split(/[.:](?:\s|$)/)[0])}`, `${f.espacio.css_1440.join('×')}`, `${f.espacio.css_390.join('×')}`, String(f.personas)])).join('\n')}

### Formato y recorte

Lo que entrega cada proveedor y el recorte desde el centro para cada ancho, calculados por
\`generar.mjs\` con las medidas del tablero. Al lado, la **cobertura**: cuántos px del archivo caen en
cada px CSS del espacio. El tablero pide ${COBERTURA_MIN[1440]}× a 1440 y ${COBERTURA_MIN[390]}× a 390 (nota de \`espacios-foto.json\`).${pideLock}
⚠ es que el recorte no llega sin escalar.

| F | Dirección | Gemini | Recorte a 1440 | Recorte a 390 | OpenAI | Recorte a 1440 | Recorte a 390 |
|---|---|---|---|---|---|---|---|
${filasFormato.join('\n')}
`);
  const sinArchivo = advertencias.filter((x) => !x.escala);
  const aEscalar = advertencias.filter((x) => x.escala);
  p(advertencias.length
    ? `**Lo que no llega sin escalar (${advertencias.length}):** ${advertencias.map((x) => x.texto).join(' · ')}.

${aEscalar.length ? `Los dos modelos entregan entre uno y uno y medio megapíxeles, así que ${lista(ids(aEscalar))} no cubren dpr 2 en
todos sus tramos tal como salen: se escalan después de generar hasta el archivo de cada tramo (abajo, «Tableta y
escalado»), y el registro anota el factor con las medidas que de verdad llegaron. ` : ''}${sinArchivo.length ? `${lista(ids(sinArchivo))} no tiene${ids(sinArchivo).length > 1 ? 'n' : ''} archivos por tramo: si a la vista se nota${ids(sinArchivo).length > 1 ? 'n' : ''} blanda${ids(sinArchivo).length > 1 ? 's' : ''}, se genera${ids(sinArchivo).length > 1 ? 'n' : ''} con el otro proveedor o con un
modelo que acepte \`--tamano=2K\`. ` : ''}No bloquea: se mira en la revisión (§5).
`
    : 'Todas llegan a la cobertura que piden el tablero y el lock.\n');

  if (conArchivos.length) {
    const es = pauta.escalado ?? {};
    const d = es.decision_f5_f7;
    const factor = (v) => (v.escala > 1 ? `**${por(v.escala)}**` : `alcanza (${por(v.escala)}: se reduce)`);
    const filasEsc = [];
    for (const f of conArchivos) {
      const fm = formatos(pauta, f);
      for (const [nombre, x] of Object.entries(f.archivo)) {
        const g = fm.gemini.vistas[x.sirve[0]];
        const o = fm.openai.vistas[x.sirve[0]];
        filasEsc.push(fila([`**${f.id}**`, nombreDir(f.direccion), `${nombre} (${g.proporcion})`, lista(x.sirve), x.px.join('×'), lista((x.srcset ?? []).map(String)), `${g.recorte.join('×')} → ${factor(g)}`, `${o.recorte.join('×')} → ${factor(o)}`]));
      }
    }
    p(`### Tableta y escalado (lock §7)

${es.regla ?? ''}

La tableta se mide a 1023 px de ancho de ventana: ${lista(conTableta.map((f) => `${f.id} ${f.espacio.css_1023.join('×')} css`))}. Cada
archivo se escala desde el recorte del original generado; el factor es el ancho del archivo dividido por el ancho del
recorte. El archivo de columna sirve a la tableta y al teléfono: los anchos del \`srcset\` salen de él, reducidos.

| F | Dirección | Archivo | Sirve a | px | srcset | Gemini: recorte → factor | OpenAI: recorte → factor |
|---|---|---|---|---|---|---|---|
${filasEsc.join('\n')}

**Escalador.** ${es.escalador ?? ''}

**Registro.** ${es.registro ?? ''}
${d ? `
**F5 y F7: la decisión (Bruno).** ${d.decision}

${d.por_que.map((x) => `- ${x}`).join('\n')}

**Lo que no adopto de entrada.** ${d.alternativa}
` : ''}`);
  }

  p(`### Cómo se arma el prompt

Ninguno de los dos modelos tiene un campo de negativo, así que lo que no debe salir va dicho en
positivo dentro del texto y como línea final \`Avoid: …\`. Cada prompt se compone siempre igual:

1. la **escena** propia de la foto (en su ficha, abajo);
2. el **encuadre de su dirección** (Taller o Pizarra limpia). No es un campo de la ficha: sale de la
   dirección, así que una ficha de Taller no puede llevar el encuadre de Pizarra limpia;
3. el **bloque común** de estilo;
4. el **bloque de texto y marcas**;
5. el **bloque de personas**, o el de **sin personas** si la foto no lleva gente;
6. \`Avoid:\` con los **negativos propios** de la foto y después los **negativos comunes**.

El resultado literal está en \`pauta.json\` → \`fotos[].prompt_completo_en\`, y
\`node generar.mjs --ver --solo=F1\` lo imprime. Si alguien edita una parte y no corre
\`--sincronizar\`, el script se niega a generar: lo que se manda es lo que se revisó.

**Encuadre Taller**

\`\`\`text
${e.encuadre.taller.en}
\`\`\`

**Encuadre Pizarra limpia**

\`\`\`text
${e.encuadre.pizarra.en}
\`\`\`

**Bloque común de estilo**

\`\`\`text
${e.comun_en}
\`\`\`

**Texto y marcas**

\`\`\`text
${e.texto_en}
\`\`\`

**Personas (fotos con gente)**

\`\`\`text
${e.personas_en}
\`\`\`

**Sin personas (fotos sin gente)**

\`\`\`text
${e.sin_personas_en}
\`\`\`

**Negativos comunes** (van al final de todas, después de los propios de cada foto). Cubren la luz y
los lugares de la «pastoral gringa», el texto inventado, los logos y las marcas, la gente que posa o
mira a cámara, las manos y caras deformes, la estética genérica de IA y el acabado de render. Desde la
v3 no hay ninguno por el oro: dorado, latón, amarillo, madera clara, cartón y chispas salieron, también
de los negativos propios de cada ficha.

${e.negativo_en.map((x) => `- ${x}`).join('\n')}

### Fichas
`);

  for (const f of fotos) {
    const fm = formatos(pauta, f);
    const t = (eq.tabla ?? []).find((x) => x.tablero === f.id && x.direccion === f.direccion);
    const rec = (ancho) => {
      const g = fm.gemini.vistas[ancho];
      const o = fm.openai.vistas[ancho];
      const esc = (v) => (v.archivo && v.escala > 1 ? `, se escala ${por(v.escala)}` : '');
      return `${g.proporcion} · Gemini ${g.recorte.join('×')} (${veces(g.cobertura)}${esc(g)}), OpenAI ${o.recorte.join('×')} (${veces(o.cobertura)}${esc(o)}). ${f.recorte[ancho]}`;
    };
    const tableta = anchosDe(f).includes('1023');
    const extra = [
      ...(tableta ? [`- **Recorte a 1023 (tableta):** ${rec('1023')}`] : []),
      ...(f.archivo ? [`- **Archivos por tramo (lock §7):** ${Object.entries(f.archivo).map(([n, x]) => `${n} ${x.px.join('×')} para ${lista(x.sirve)}${x.srcset ? ` (srcset ${lista(x.srcset.map(String))})` : ''}`).join(' · ')}. Cobertura pedida: ${lista(anchosDe(f).map((an) => `${coberturaMin(f, an)}× a ${an}`))}.`] : []),
    ].map((x) => `${x}\n`).join('');
    p(`#### ${f.id} · ${nombreDir(f.direccion)} · ${f.titulo_es}

**Qué muestra:** ${f.muestra_es}

- **Dónde va:** ${f.espacio.pagina} · ${f.espacio.seccion}
- **Rótulo en el tablero:** «${f.espacio.rotulo_tablero}»
- **Dirección:** ${nombreDir(f.direccion)} · encuadre ${nombreDir(f.direccion)} · **prioridad ${f.prioridad}**
- **Espacio:** ${f.espacio.css_1440.join('×')} css a 1440 · ${f.espacio.css_390.join('×')} css a 390${tableta ? ` · ${f.espacio.css_1023.join('×')} css a 1023 (tableta, lock §7)` : ''}
- **Salida:** Gemini \`${f.gemini.aspectRatio}\` → ${fm.gemini.fuente.join('×')} · OpenAI \`${f.openai.size}\`
- **Recorte a 1440:** ${rec('1440')}
- **Recorte a 390:** ${rec('390')}
${extra}- **Personas:** ${f.personas}
- **Negativo propio** (más los comunes): ${f.negativo_en.join('; ')}
- **Riesgo:** ${f.riesgos_es}
- **Alt propuesto:** «${f.alt_es}»
- **Salidas:** \`salida/${clave(f)}-<n>.png\`${t ? ` · en la v1 era ${t.pauta_v1}${t.nota ? `. ${t.nota}` : ''}` : ''}

Escena (la parte propia del prompt, en inglés):

\`\`\`text
${f.escena_en}
\`\`\`
`);
  }

  p(`### Reservas (sin espacio en el tablero: no se generan)

${reservas.length ? `Son fotos de la v1 que ningún prototipo usa. No están en \`fotos\`, así que \`generar.mjs\` no las ve.
Si Lucía abre un espacio que les calce, se escriben como ficha nueva con el número del tablero y el
encuadre de esa dirección.

| Reserva | En la v1 | Foto | Dirección | Por qué salió |
|---|---|---|---|---|
${reservas.map((r) => fila([`**${r.id}**`, r.pauta_v1, r.titulo_es, nombreDir(r.direccion), r.por_que_salio])).join('\n')}

${reservas.map((r) => `**${r.id} · ${r.titulo_es}.** ${r.muestra_es} Alt: «${r.alt_es}»

\`\`\`text
${r.escena_en}
\`\`\`
`).join('\n')}` : 'No hay.\n'}`);

  // ------------------------------------------------------------ §3 equivalencia
  p(`## 3 · Equivalencia con los espacios de Lucía

**Numeración:** ${eq.numeracion}

**Estado:** ${eq.estado}

**Qué bloquea:** ${eq.regla}

| Tablero | Dirección | Página | Espacio a 1440 · a 390 | En la v1 de esta pauta | Nota |
|---|---|---|---|---|---|
${(eq.tabla ?? []).map((t) => {
    const f = fotos.find((x) => x.id === t.tablero && x.direccion === t.direccion);
    return fila([`**${t.tablero}**`, nombreDir(t.direccion), f ? f.espacio.pagina.split(' (')[0] : '_sin ficha_', f ? `${f.espacio.css_1440.join('×')} · ${f.espacio.css_390.join('×')}${f.espacio.css_1023 ? ` · ${f.espacio.css_1023.join('×')} a 1023 (lock §7)` : ''}` : '', t.pauta_v1 ?? '_vacío_', t.nota || '']);
  }).join('\n')}
${reservas.length ? `
Fotos de la v1 que salieron: ${reservas.map((r) => `${r.pauta_v1} → ${r.id}`).join(', ')} (§2, «Reservas»).
` : ''}`);

  // ------------------------------------------------------------ §4 uso
  p(`## 4 · Cómo se usa \`generar.mjs\`

**Requisitos:** Node 22 (probado con 22.22.0), sin \`npm install\`. Una de dos claves en el entorno:
\`GEMINI_API_KEY\` (Gemini, modelo \`${pauta.modelos.gemini.modelo}\`) u \`OPENAI_API_KEY\` (OpenAI, modelo
\`${pauta.modelos.openai.modelo}\`). Si están las dos, usa Gemini salvo que se pida \`--proveedor=openai\`.

**Dónde se pone la clave:** en una sesión en la nube, en el menú del entorno de la barra de título,
«Editar», como variable de entorno con ese nombre exacto. **La toma solo una sesión nueva** abierta
después del cambio. En una terminal local: \`export GEMINI_API_KEY=…\` y correr el script desde esa
terminal. Nunca en el chat ni en un archivo del repo.

**Antes de gastar, la pauta contra el tablero.** En cada corrida el script compara \`pauta.json\` con
\`${ESPACIOS_REL}\` y **no genera** (código 2, con la lista de lo que no calza) si:

- falta \`espacios-foto.json\`;
- un espacio del tablero no tiene ficha, o una ficha no tiene espacio;
- la página o la medida de un espacio cambió desde que se escribió la ficha (también la de tableta, cuando el
  tablero la traiga como \`ancho_px_1023\` y \`alto_px_1023\`);
- la tabla de equivalencia (§3) tiene una celda vacía, una fila de más o una de menos;
- una ficha no escribió su recorte a 1440, a 390 o, si tiene tableta, a 1023, o pide un formato que el
  proveedor no tiene;
- una ficha con tableta no trae sus archivos por tramo, o un archivo no tiene la proporción del tramo que
  sirve, no lo cubre a la cobertura pedida o tiene un \`srcset\` que no termina en él (lock §7);
- \`prompt_completo_en\` o este \`pauta.md\` no son los que salen de \`pauta.json\` (falta \`--sincronizar\`).

Que un recorte no llegue a su cobertura sin escalar, que cambie el rótulo de un espacio o que
\`espacios-foto.json\` todavía no traiga la medida de tableta de una ficha, se avisa pero no bloquea.
\`node generar.mjs --verificar\` hace solo esta comprobación.

**La regla del tope.** Sin \`--tope\` el script **no genera nada**: lista lo que pediría, con el recorte
de cada ficha, cuántas llamadas y cuánto costaría, y no toca la red. Con \`--tope=N\` genera como máximo
N imágenes. Si el plan pide más, corta así: primero una variante de cada ficha y después las segundas.
El tope se dice antes de correr.

**La corrida recomendada para el tablero** (las ${fotos.length} fichas, ${variantes} variantes cada una):

\`\`\`sh
cd marketing/oficina/obras-web/spindlelab-v3/e10/fotos
node generar.mjs --verificar      # 0 · la pauta contra el tablero, sin red
node generar.mjs                  # 1 · lista, recortes y costo, sin red
node generar.mjs --tope=${total}        # 2 · genera ${total}: ~${usd(costoGemini)} con Gemini · ~${usd(costoOpenAI)} con OpenAI (high)
\`\`\`

Con \`--tope=${fotos.length}\` sale una variante de cada ficha: alcanza para llenar los ${fotos.length} espacios del tablero. Precios
de lista conocidos: Gemini USD ${coma(pauta.modelos.gemini.precio_ref_usd_por_imagen, 3)} por imagen; \`gpt-image-1\` en calidad alta USD ${coma(pauta.modelos.openai.precio_ref_usd_por_imagen.high['1024x1024'], 3)}
(1024×1024) o ${coma(pauta.modelos.openai.precio_ref_usd_por_imagen.high.otro)} (1536×1024 y 1024×1536), en media ${coma(pauta.modelos.openai.precio_ref_usd_por_imagen.medium['1024x1024'], 3)} o ${coma(pauta.modelos.openai.precio_ref_usd_por_imagen.medium.otro, 3)} y en baja ${coma(pauta.modelos.openai.precio_ref_usd_por_imagen.low['1024x1024'], 3)} o ${coma(pauta.modelos.openai.precio_ref_usd_por_imagen.low.otro, 3)}. Se
verifican en la consola del proveedor antes de una corrida grande.

| Opción | Qué hace |
|---|---|
| \`--tope=N\` | **Obligatorio para generar.** Máximo de imágenes de la corrida (1 a 200) |
| \`--verificar\` | Solo compara la pauta con el tablero (y que esté sincronizada). Código 0 si calza, 2 si no |
| \`--solo=F1,F8\` | Solo esos números del tablero. \`F8\` trae sus dos fichas; \`F8-taller\` trae una |
| \`--direccion=taller\` · \`pizarra\` | Solo las fichas de esa dirección |
| \`--prioridad=N\` | Solo las de prioridad ≤ N (hoy todas son 1) |
| \`--variantes=N\` | Variantes por ficha (por defecto 2, máximo 8) |
| \`--proveedor=gemini\` · \`openai\` | Fuerza el proveedor. Si su clave no está, termina con el mensaje de qué variable falta |
| \`--modelo=…\` | Otro modelo del mismo proveedor |
| \`--calidad=low\` · \`medium\` · \`high\` | Solo OpenAI (por defecto \`high\`) |
| \`--tamano=1K\` · \`2K\` · \`4K\` | Solo Gemini, para modelos que acepten \`imageSize\` (el 2.5 Flash no lo necesita) |
| \`--ver\` | Imprime el prompt completo de cada ficha elegida (sin red) |
| \`--medir=a.png,b.png\` | Mide el oro de PNG ya guardados, por ejemplo después del acabado (sin red). Es un dato: el oro está en pausa con el logo |
| \`--sincronizar\` | Reescribe \`prompt_completo_en\` y este \`pauta.md\` desde \`pauta.json\`, y muestra la comprobación |
| \`--salida=DIR\` | Otra carpeta de salida (para pruebas) |
| \`--ayuda\` | La ayuda |

**Qué deja cada imagen:**

- \`salida/<F>-<dirección>-<n>.png\`, con el número del tablero: \`F1-taller-1.png\`, \`F8-pizarra-2.png\`.
  Nunca pisa: si ya existen \`F1-taller-1\` y \`F1-taller-2\`, la próxima corrida empieza en
  \`F1-taller-3\`. Si el proveedor devolviera JPEG o WebP en vez de PNG, se guarda con su extensión real:
  el script no convierte formatos, porque sin dependencias no hay cómo. Ese archivo no trae el oro
  medido; se mide sobre el PNG final con \`--medir\`.
- Su línea en \`salida/registro.json\`: archivo, número del tablero, dirección, página, sección y medida
  del espacio, proveedor, modelo, parámetros, **el prompt exacto**, **fecha UTC y de Chile**,
  **sha256**, bytes, ancho y alto, mime, el oro medido (porcentaje, píxeles y caja), la ruta de la
  máscara, los segundos, los datos de la respuesta y \`estado: "por revisar"\`. En ${lista(ids(conArchivos)) || 'las fichas con archivos por tramo'}, además,
  \`escalado\`: por archivo, el recorte que sale de las medidas reales, el objetivo y el factor, con
  \`escalador\` y \`factor_aplicado\` vacíos para que los anote el acabado (§6). Los intentos fallidos
  también quedan, en \`fallos\`, con su motivo. **La clave nunca se escribe.**
- Si encuentra oro: \`salida/oro/<F>-<dirección>-<n>-oro.png\`, la foto en gris con el oro en magenta,
  para ver de un vistazo dónde cae. Es un dato para cuando exista la marca nueva, no un motivo de
  descarte (§1, «El oro y el punto dorado»).

**Qué valida antes de guardar:** que los bytes sean de verdad una imagen (firma PNG, JPEG o WebP, y
dimensiones legibles de al menos 256 px). Si el proveedor responde 200 pero sin imagen (un bloqueo de
seguridad, por ejemplo), o con algo que no es una imagen, no se guarda nada y queda en \`fallos\`.

**Errores y reintentos:** un 429 o un 5xx se reintenta dos veces (a los 4 y a los 12 s) y no cuenta
para el tope, porque el proveedor no procesó. Un error de red **no** se reintenta: la imagen pudo
haberse generado y cobrado. Un 400, 401, 403 o 404 corta la corrida, porque se repetiría en todas.
Cualquier mensaje que traiga algo con forma de clave (\`AIza…\`, \`sk-…\`) sale tapado como
\`[clave oculta]\`.

**Códigos de salida:** 0 todo bien (también cuando \`--medir\` encuentra oro: es un dato) · 1 alguna
falló · 2 la pauta no calza con el tablero o no está sincronizada, uso o clave (falta la clave, argumento
malo) · 3 no salió ninguna.

**La red:** desde este entorno, el \`fetch\` nativo de Node llega a los dos proveedores sin
configurar nada (probado el 16-oct sin clave: Google responde 403 «unregistered callers» y OpenAI
401 «Missing bearer», es decir, los dos contestan). Si en otro entorno falla por red, el script
sugiere \`NODE_USE_ENV_PROXY=1 node generar.mjs …\`, que hace que Node use el proxy de \`HTTPS_PROXY\`.

## 5 · Revisión de cada foto (antes de que vaya al tablero)

${pauta.revision.map((x) => x.replace(/^(\d+) · /, '$1. ')).join('\n')}

## 6 · Acabado común (después de elegir, igual para todas)

${e.acabado.nota}

${e.acabado.pasos.map((x) => x.replace(/^(\d+) · /, '$1. ')).join('\n')}

## 7 · Pruebas hechas el 16-oct (sin clave y sin gastar)

Cada prueba dice con qué versión se hizo. Las de la v${pauta.version} son contra el \`espacios-foto.json\` vigente; las
anteriores quedan como registro de lo que se probó entonces, contra el tablero de ese momento.

| Prueba | Resultado |
|---|---|
${(pauta.pruebas ?? []).map((x) => fila([x.prueba, x.resultado])).join('\n')}

## 8 · Lo que esta pauta no hace

- **No genera ni elige fotos.** Eso va en la sesión con clave, y ninguna foto va al sitio sin que
  Ramón la vea.
- **No aplica el acabado** (recorte, escalado, balance, grano, JPG): sin dependencias no hay
  procesamiento de imagen. Va en la sesión que arma el tablero (§6). El script solo calcula el factor de
  escalado y lo deja en el registro.
- **No decide los espacios.** Los pone Lucía en el tablero; esta pauta los sigue y el script
  comprueba que calcen.
- **No toca \`spindlelab-astro/\`**, ni el texto de E8, los precios, el chequeo o el formulario.
- **No escribe los \`alt\` definitivos de la página:** los de las fichas son la propuesta, y Clara los
  revisa al montar.

## 9 · Historial

${(pauta.historial ?? []).map((x) => `- ${x}`).join('\n')}
`);
  return out.join('\n');
}
