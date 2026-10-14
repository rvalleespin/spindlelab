# Acta de QA · SpindleLab v3 · E8, pase de voz · ronda 1

**14-oct-2026.** Javiera (`/web-qa-critico`), en contexto limpio: no leí la conversación de Clara ni la
de Diego. Leí el plan aprobado (`dazzling-snacking-river.md`, entero, con «Decisiones de Ramón
(14-oct)» y «Tanda 3»), `copy-secciones.md`, `e8-antes-despues.md`, `hoja-de-voz.md`,
`censo-parches.md`, `inventario-resumen.md`, los registros y el código. Lo que digo abajo lo medí yo,
con mis propias corridas; donde coincide con lo que Diego reporta, lo digo, pero no lo tomé de él.

**Auditado:** rama `claude/magical-franklin-ckfki2`, commits `b90679a`, `3877e51`, `2dbaa09`, `eaa0c33` y
`9b9d590` sobre `c17a788` (HEAD `9b9d590`; la rama remota no avanzó). Rondas previas: ninguna.

## Veredicto: **aprobado con reparos**

El sitio está bien: cada diferencia del texto servido sale de una fila aprobada y nada más cambió.
Lo cerrado, los precios, los `name`, los `chq-*`, la cadencia y el JSON-LD quedan intactos. Las
decisiones de Ramón del 14-oct están aplicadas como las tomó. Los seis defectos son menores.

**El reparo, con plazo:** el defecto 1 se arregla antes de mandarle `e8-antes-despues.md` a Ramón. Ese
documento es el que lee con la vista previa, y hoy no le muestra arriba todo lo que le queda por
confirmar. Los defectos 2 a 6 van en la misma ronda de arreglo si no cuestan, o quedan anotados.

## Cómo se verificó

Build propio de HEAD (`npm run build`, 27 páginas, exit 0). El `dist` copiado a mi carpeta, servido en
el puerto 8847. La base de comparación es `tanda3/diego/dist-base`, servida en el 8848. Antes de usarla
comprobé que es `c17a788`: extraída y comparada con `migrado.json`, da solo las 2 diferencias de
`a70e945` (la meta de la home con Claude). Navegador: Chromium de Playwright
(`/opt/pw-browsers/chromium-1194`), con el aviso de cookies cerrado por `localStorage`, salvo donde se
mide con el aviso abierto.

Archivos de trabajo, capturas y scripts (no se commitean):
`scratchpad/e8/tanda3/javiera-r1/` (`ahora.json`, `migrado-vs-ahora.{md,json}`, `conciliar.py`,
`estricto.py`, `doc-vs-reg.py`, `reglas.py`, `jsonld.mjs`, `viudas*.mjs`, `medidas.mjs`, `sim.mjs`,
`par.mjs` y `capturas/`).

### Las mediciones

| Comprobación | Resultado |
|---|---|
| `npm run verificar -- --prefijo /v3/ --sin-pildoras` a 390, 768 y 1440 | 21 páginas «Sin hallazgos» en los tres anchos (exit 0) |
| `extraer.mjs` sobre HEAD contra `migrado.json` | 245 diferencias en 21 rutas: 174 textos cambiados, 5 agregados, 4 quitados, 24 movidos, 8 del head y 30 del JSON-LD. Mi extracción es idéntica, salvo la URL de origen, al `despues.json` de Diego |
| Cada diferencia sale de una fila «cambia» de `registro-aplicar.json` | 245 de 245. Reconstruí cada texto «después» desde el «antes» con las filas de su ruta y calza exacto. Las únicas que no salen de una fila sola son las metas de la home, que contra `migrado.json` llevan además el cambio de `a70e945`, y la fila 50 lo revierte como decidió Ramón |
| Cada fila «cambia» aparece en el sitio | 141 de 141. La 1444 («Revisando…») solo se ve con el chequeo corriendo, y la comprobé simulada (abajo) |
| `registro-aplicar.json` contra `copy-secciones.md` | Las 136 filas numeradas de las tablas «Copy por página» calzan con su «Después», sin diferencias. De las 6 «nueva», entran 5. No entra la sexta, el plazo de la Auditoría + Visibilidad en IA, que es «dato a verificar», y la tarjeta va sin ese punto. Ninguna fila «cambia» del registro falta en el documento |
| Hojas de los JSON (`c17a788` contra HEAD) | `servicios-v3.json` 83, `paginas-v3.json` 17, `oferta-v3.json` 3 y `obra-v3.json` 1. Cada hoja cambiada tiene su fila y su valor es exactamente la propuesta. No hay hojas cambiadas sin fila. Los cuatro archivos conservan el formato `JSON.stringify(x, null, 2) + "\n"`. `oferta-v3.json#/momentos/1/planes/0/d` no se tocó |
| Zonas cerradas (hash del innerHTML servido) | 40 zonas en 21 rutas (hero, `.d-pres`, la línea del campo Desarrollo, la bio, el «Te lo muestro…» de R4, el aviso de cookies y los cuerpos y cabezas de los 7 artículos): 0 distintas |
| «No te prometo. Te muestro.» (h1 de Nosotros y h2 de la home) | sin diferencia en el texto |
| Invariantes: precios del texto, `name` del formulario, ids `chq-*` | iguales en las 21 rutas (12 `name` en Contacto). Los números y booleanos del JSON-LD (precios de las Offer): iguales en las 21 |
| Archivos que no se tocan | `git diff` contra `c17a788` y contra `63f1e55` vacío en `Layout.astro`, `functions/`, `public/js/consent-banner.js`, `public/assets/js/v3-contacto.js` y `src/data/blog-v3/` |
| Cadencia (`quincen\|cada mes\|mes a mes\|al mes`, en texto, atributos, head y JSON-LD) | 49 antes y 49 después, ruta por ruta igual. Diego y Clara cuentan 51 con otro corte (suman `v3-chequeo.js`). Lo que importa, que no cambie, se cumple con los dos cortes |
| Raya (—) | 0 en el texto, el JSON-LD y el head extraídos, 0 en el HTML de `dist/v3` sin maquetas y 0 en `v3-chequeo.js` |
| «acá» | 3 y 3, las tres en `/v3/blog/21-chequeos-visibilidad-ia/` |
| Voseo, «usted», signos de exclamación, «...» | 0 |
| Frases prohibidas del plan (`equipo dedicado\|bajo NDA … acostumbrados\|el motor\|sin compromiso\|cada (día\|vez) más\|ninguna herramienta del rubro\|móvil\|coste`) | 14 antes y 14 después. Todas están en zonas cerradas (`.d-pres`, cuerpos de artículos, bio) o son la frase válida de Contacto («trabajamos bajo NDA cuando el cliente lo requiere»). Ninguna es nueva |
| JSON-LD | 21 de 21 rutas parsean (2 bloques cada una). FAQPage igual a la FAQ visible, pregunta y respuesta, en las 8 páginas con `section.d-faq` y en 5 de los 6 artículos (ver observación 1). BreadcrumbList igual a la miga en las 20 rutas que la tienen. HowTo de Método: los 4 pasos son h3 de la página |
| Enlaces (href + texto), base contra HEAD | No se perdió ninguno. Cambian solo los textos aprobados («Conocer a Ramón», «Ver el blog», «Pedir el diagnóstico») y se suma uno: «Visibilidad en IA» en la guía de Desarrollo web (fila 983, §7:191). Su foco con Tab es visible (outline sólido de 2 px, posición 7 del recorrido) |
| `?v=3` | `v3-chequeo.js?v=3` en sus 2 referencias (home y Diagnóstico), 0 con `?v=2`. `/assets/*` se cachea 7 días (`_headers`), así que el cambio de versión era obligatorio |
| `v3-chequeo.js` simulado (`/api/chequeo` interceptado, 1,5 s de demora y un 503) | Pide `?v=3`. Mientras corre, el botón dice «Revisando…» y está deshabilitado; después vuelve a su texto y muestra el error con su código. Sin errores de JavaScript, en la home y en Diagnóstico |
| Palabra sola al final en h1, botones y «Siguiente» (63 páginas × ancho, por línea medida con Range) | Los mismos 22 casos antes y después, con el mismo texto. E8 no agrega ninguno |
| Palabra sola en h2 y h3 | 55 antes y 54 después. E8 resuelve tres y agrega dos (defecto 5) |
| «$690.000 con Visibilidad en IA» a 390 | En la pestaña de la home y en el índice no se parte: «Desde $490.000 ·» queda en la primera línea y el bloque de la cifra entero en la segunda. Sin desborde (`scrollWidth` igual a `clientWidth`) |
| Menú | A 768 × 720, «08 Contacto» se ve entero. A 1280 × 650 con el aviso de cookies abierto, el párrafo nuevo (fila 1359) ocupa las mismas 4 líneas que el de antes, y su borde inferior queda 6 px bajo el aviso, igual que antes (el panel se desplaza) |
| Diagnóstico a 320 × 568 y 568 × 320 | sin desborde horizontal |

Capturas de lo nuevo a 390, 768 y 1440 (`capturas/`): compromiso en Visibilidad y en Acompañamiento,
planes y entrada de Desarrollo web, planes de Auditoría, ficha de Verifica y Cumple, «Quién» y el blog
de la home, pestaña de la Auditoría, entrada y tarjeta de Visibilidad del índice, cabecera y FAQ de
Visibilidad, metodología de Diagnóstico, formulario de Contacto y pie. Además: el menú a 1280 × 650
(antes y ahora) y a 768 × 720, Diagnóstico a 320 × 568 y en apaisado, la fila de Trabajo (antes y
ahora) y el cierre de Redes. Lo nuevo usa las clases del sistema (`d-cuerpo`, `d-chico`, `d-enl-dw`),
y `verificar` mide su contraste sin hallazgos.

## Lo que pedía el encargo, punto por punto

1. **Build y `verificar` a 390, 768 y 1440:** cumple.
2. **Toda diferencia sale de `copy-secciones.md` o de una decisión de Ramón, y nada más cambió:**
   cumple, medido en el HTML servido, en las hojas de los JSON y en los hashes de las zonas cerradas.
   También cumplen precios, `name`, `chq-*`, cadencia, rayas, «acá» y voseo, el JSON-LD (21 de 21 y
   sus tres paridades), los archivos intocables y el `?v=3`.
3. **Detector anti-slop (secciones A y D) sobre el texto nuevo:** sin hallazgos de regla. Hay un
   tropiezo de lectura en voz alta (defecto 2). Detalle abajo.
4. **Las decisiones de Ramón:**
   - **El compromiso de los 3 meses** está en Visibilidad y en Acompañamiento como último párrafo de
     `#planes`. No promete una cita en un modelo: promete puntos en el chequeo gratis, «contando las
     mismas señales», y que los robots de ChatGPT, Claude y Perplexity puedan entrar.
   - Lleva los dos ajustes:
     - «Si tu sitio ya parte en 100, el compromiso es que no baje y que cerremos lo que encontremos
       pendiente»;
     - «acceso a donde se configura qué robots entran, como Cloudflare u otro CDN».
   - No dice qué pasa si no se cumple. Clara acotó el «lo que falte» de Ramón a «lo que encontremos
     pendiente», con su razón (copy-secciones, decisión 4). El plan le delegaba esa redacción.
   - **La prueba de Trabajo** está en la ficha de Verifica y Cumple, versión a: 36 el 9-sep, 73 el
     21-sep y 100 el 14-oct, «ya con otra forma de puntuar».
     - Va inmediatamente después de «Chequeo gratuito de las señales técnicas que pide la Ley
       21.719», que es su sujeto, y no dice «el chequeo» a secas.
     - El chequeo de IA no aparece en esa ficha, y el JSON-LD de Trabajo no cambió.
     - Cifras con respaldo: el 36 del 9-sep y el 73 están en `1a0ae0a:ventas/casos-de-exito/verifica-y-cumple.md`
       («lo apuntas primero a ti mismo»), y el 100 del 14-oct en `scratchpad/e8/chq-spindlelab.cl.json`
       (`puntaje: 100`, `revisadoEn` 14-oct 12:12 UTC).
   - **El mini-diagnóstico** sigue nombrando a ChatGPT, Gemini y Perplexity en las filas 617 y 639,
     en la FAQ de Diagnóstico y en el remate del chequeo (fila 1440, `v3-chequeo.js:106`). Las tres
     filas están como «se mantiene».
   - **La meta de la home** dice «…para que ChatGPT, Gemini y Perplexity puedan citarte», en la meta y
     en `og:description`.
   - **R2, R4, R7 y los datos que faltan** no se aplicaron: las 54 «espera-R2» siguen iguales y la
     tarjeta de la Auditoría + Visibilidad en IA no tiene punto de plazo. La fila 1256 es la única
     ranura R2 que cambia, por la excepción de 5a que `copy-secciones.md` declara, con «Medimos» y «mes
     a mes» intactos.
5. **Capturas a 390, 768 y 1440, sin palabra sola en h1, botones ni «Siguiente», y dentro del
   sistema:** cumple. Lo único que movió la composición es la fila de Trabajo (defecto 4).

## Defectos

| # | Severidad | Dónde | Qué está mal | Contra qué | Cómo se reproduce |
|---|---|---|---|---|---|
| 1 | menor (es el reparo: antes de mandarlo a Ramón) | `e8-antes-despues.md`, «Lo que todavía decides tú» | No trae arriba todo lo que `copy-secciones.md` deja para Ramón sobre texto **ya aplicado**. Falta (a) la postura de Desarrollo web de la fila 983, que `copy-secciones.md` pone cuarta en «Lo que queda para ti»: la página de entrada de Ads ahora le dice a quien ya tiene sitio que le sirve más Visibilidad en IA. Faltan también las confirmaciones del anexo D: (b) el punto 8, «Te escribimos dentro de 24 horas … o para conversar tu proyecto si partes de cero», que amplía el plazo de 24 h a proyectos nuevos; (c) el 7, «Nos agregas como usuario…» en Método; (d) el 2, el caso borde del Esencial solo de SEO técnico bajo el compromiso; (e) el 6, el 10, el 12 y el 13, que son «a diario» en Paid Media, el cierre de Redes, la fecha de la Ley 21.719 y el title sin sufijo del índice. Además, la fila 983 cita «anexo D, 10» en los dos documentos, y es el punto 9 | Plan, paso 7: «arriba tus decisiones pendientes» | Comparar «Lo que queda para ti» y el anexo D, puntos 2 y 6 a 13, de `copy-secciones.md`, con las líneas 15 a 45 de `e8-antes-despues.md`. La postura solo aparece en la tabla, en la fila 983 |
| 2 | menor | Trabajo, ficha de Verifica y Cumple, prueba (`obra-v3.json#/casos/2/prueba`) | «como si el aviso de cookies frena de verdad a los rastreadores»: «como si» se lee como *as if* y pide subjuntivo («frenara»). Leído en voz alta, la frase tropieza justo en la cláusula que Simón hizo obligatoria. Propuesta, sin cambiar el sentido: «por ejemplo, si el aviso de cookies frena de verdad a los rastreadores». Es texto aprobado por Ramón, así que lo propone Clara y se le avisa en `e8-antes-despues.md` | antislop D, prueba en voz alta | Leer en voz alta `/v3/trabajo/`, la ficha de Verifica y Cumple |
| 3 | menor | Visibilidad y Acompañamiento, párrafo del compromiso | Nombra «el chequeo gratis» en texto corrido sin enlace, y el párrafo termina «El chequeo es público, así que lo compruebas tú». El único acceso al chequeo en esas páginas es el botón del cierre, más abajo. `[slug].astro` pinta `{secPlanes.compromiso}` en texto plano, sin la transformación que enlaza | spec §7:191 (regla: lo que el texto corrido nombra va enlazado, una vez por página, solo en lo visible) y web-qa-critico paso 3 | `/v3/servicios/visibilidad-en-ia/#planes` y `/v3/servicios/acompanamiento-mensual/#planes`: el último párrafo no tiene `<a>` |
| 4 | menor | Trabajo, fila de dos (Bernardo Combeau \| Model y Verifica y Cumple) | La prueba alarga solo la ficha de Verifica, así que el par perdió la alineación de sus botones. Antes estaban a la misma altura a 768 y a 1440 (y), y ahora no. `e8-antes-despues.md` dice «sin descuadrar el par con la ficha de Combeau modelo», y es un cambio de composición no declarado. Se decide en dirección de arte: alinear los enlaces al pie de `.d-pie-trab`, o aceptarlo y declararlo en §7 | web-qa-critico paso 4 (desvío no declarado) | `par.mjs`: diferencia vertical entre los dos enlaces. 768: antes 0, ahora 202 px. 1024: antes 27, ahora 148 px. 1440: antes 0, ahora 185 px. Capturas `trabajo-fila-antes-1440.png` y `trabajo-fila-ahora-1440.png` |
| 5 | menor | Redes, h2 del cierre a 1440; Contacto, primer h3 de «Antes de escribir» a 390 | El copy nuevo deja dos palabras solas en encabezados: «Partimos por el sitio al que llevan tus / redes» y «¿El mini-diagnóstico es realmente / gratis?». La de Redes está declarada en `e8-antes-despues.md`; la de Contacto, no. La regla del plan cubre h1, botones y «Siguiente», no h2 ni h3, y el sistema no equilibra estos encabezados (52 casos que ya existían). Se arregla con un espacio duro entre las dos últimas palabras, o se acepta y se declara | spec, cierre tipográfico; plan, «Diseño» (por extensión) | `viudas-h2.mjs` contra la base: `diff` de `h2-antes.txt` y `h2-ahora.txt`. Capturas `redes-cierre-1440.png` y `contacto-faq-390.png` |
| 6 | menor | `src/pages/v3/diagnostico.astro`, comentario sobre el `<script>` del chequeo | El comentario sigue diciendo «?v=2: el archivo cambió en la QA final…» encima de `v3-chequeo.js?v=3`. La home no tiene ese comentario. No se publica (es `{/* */}`), pero el próximo que suba la versión lee un motivo viejo | Plan, paso 7: «los comentarios … se actualizan» | `git show HEAD:spindlelab-astro/src/pages/v3/diagnostico.astro`, líneas 226 a 228 |

**Bloqueantes: ninguno.** Ninguno de los seis rompe una regla de la marca o de accesibilidad, ni toca
algo cerrado o no aprobado.

## Detector anti-slop sobre el texto nuevo (`antislop-web.md` A y D)

Lo corrí sobre las 221 ranuras que cambiaron o entraron (texto, head y JSON-LD), con búsquedas y
leyendo. En voz alta leí completas las cinco páginas de servicio, Desarrollo web, Diagnóstico y
Trabajo.

- **A1, verbos de folleto:** 0. Salieron «escalamos con cabeza», «bien hecha» y «captura». «Optimizamos»
  queda solo en frases que ya existían, R2 incluida.
- **A2, relleno de apertura:** 0 en lo nuevo. El «cada vez más» del sitio está en `.d-pres` y en un
  artículo, los dos cerrados.
- **A3, tricolon:** lo nuevo no agrega series de ritmo. El compromiso nombra tres robots, que son un
  hecho y no ritmo. Visibilidad conserva «la claridad de entidad, la autoridad y el contenido citable»
  en la FAQ (fila 1285). Ya estaba antes del pase y son los tres factores del «Lo que incluye», así que
  queda abierto con esa razón.
- **A4, «no solo»:** 1, en Diagnóstico («y no solo el sitio de quien recomiendan»). Es un contraste
  real y comprobable, así que se acepta.
- **A5:** las únicas preguntas nuevas son de FAQ («¿El mini-diagnóstico es realmente gratis?», «¿Se
  integra con el SEO?»). No hay ningún «¿Listo para…?».
- **A6, Title Case:** 0. Los nombres de plan y de servicio son nombres propios.
- **A7:** «Correo» en vez de «Email» y «celular y computador». Registro es-CL, todo en tuteo.
- **A8:** 0 rayas.
- **A9:** las cifras nuevas tienen fuente (36, 73, 100, 21 señales, 2 a 3 semanas, 30 días). Salieron
  «200 hallazgos» y «la mayoría del rubro». No hay ningún singular nuevo de la marca.
- **A10, prueba del 30 %:** las páginas quedaron más cortas, salvo dos textos. El compromiso tiene 15
  líneas a 390, pero cada cláusula es una condición que alguien pidió (Simón, Ramón). No se puede borrar
  un 30 % sin quitar una obligación, así que pasa, denso. La prueba de Trabajo también pasa.
- **D, las pruebas de fuego:**
  - **Logo tapado:** el primer pantallazo de la home es el hero cerrado, que no cambió. En lo nuevo,
    las frases traen datos que solo son de esta empresa (los 21 chequeos, 36 → 73 → 100, Cloudflare,
    OAI-SearchBot), así que pasa.
  - **Rubro cambiado:** el copy nuevo no calza en una clínica dental ni en una inmobiliaria, porque
    nombra instrumentos y robots concretos. Pasa.
  - **Voz alta:** pasa, con un tropiezo («como si … frena», defecto 2) y una frase pesada (la primera
    del compromiso, 59 palabras con dos incisos y un paréntesis, y «entrar a él» todavía suena forzado).
    La segunda queda como observación, porque es texto que Ramón aprobó.
- **Checklist §E, copy:** completo, con los porqués de arriba. **Estructura:** sin cambios, salvo un
  párrafo en dos planes y uno en una ficha. **Código:** landmarks, un h1 y contraste AA medidos por
  `verificar`; foco del enlace nuevo visible; JSON-LD, canonical y OG al día; `?v=3` subido. Índice y
  sitemap no aplican, porque no hay página nueva. **Visual (refero):** el pase es de copy y no toca
  tokens ni componentes. La prueba de la tarjeta, de la imagen y de la marca no aplica. La del copy se
  corrió arriba.

## Observaciones fuera de E8 (no son defectos de este pase)

1. **Blog, «Cuánto cuesta el SEO técnico»:** la segunda respuesta del FAQPage termina en «…el punto de
   partida lógico.», y la visible sigue con «Decidir si necesitas continuidad viene después, con datos
   reales de tu sitio.». Es zona cerrada y ya estaba así antes del pase. Va al pase del blog o al
   encargo de Google-Extended.
2. **Palabras solas que ya existían a 390:** «Siguiente» de Visibilidad («…SEO / técnica»), de
   Auditoría («…/ mensual») y de Redes («…/ (Google)»), el h1 «Acompañamiento / mensual» y el enlace
   final de Diagnóstico. Están iguales antes y después. Las dejo para quien cierre la tipografía.
3. **Menú a 1280 × 650 con el aviso abierto:** el aviso tapa 6 px del párrafo del panel, igual que
   antes del pase.
4. `copy-secciones.md` («Para Diego») cita `scratchpad/e8/tanda3/clara/comprobar_aplicar.py`, y en esa
   carpeta solo está `armar_aplicar.py`. La comprobación que ese script prometía la hice yo por otra vía
   (`doc-vs-reg.py` y `estricto.py`).
5. Antes de publicar sigue pendiente lo que el plan ya anota: volver a correr el chequeo de la Ley
   21.719 sobre la vista previa para la frase del 100.

## Lo que está bien (y conviene no perder en la corrección)

- **La aplicación es exacta.** Cada una de las 104 hojas de JSON cambiadas tiene su fila y su valor es
  la propuesta, letra por letra. Los 34 reemplazos en plantillas calzan con el HTML servido, y no hay
  ni una diferencia sin dueño entre 245. El formato de los JSON quedó idéntico. Este nivel de trazado es
  lo que hace auditable un pase de 141 filas: que no se pierda en la ronda de arreglo.
- **El pase sacó lo que la marca prohíbe sin tocar lo cerrado.** Salieron las promesas de cita
  (Visibilidad, Método, Acompañamiento, la meta de la home), los «y más», los datos falsos de robots
  (la FAQ de Visibilidad y la metodología de Diagnóstico) y las cifras sin fuente, con el hero, la bio,
  R4, los artículos, la cadencia y los precios intactos.
- **Las decisiones de Ramón entraron sin desbordarse.** El compromiso promete solo lo que el cliente
  comprueba y no dice qué pasa si no se cumple. La prueba de Trabajo nunca toca el chequeo de IA. El
  mini-diagnóstico conserva sus tres motores.

## Firma

Javiera, QA crítica del Estudio Web. **Aprobado con reparos.** El reparo es el defecto 1, y se cierra
antes de que `e8-antes-despues.md` llegue a Ramón. Ronda 1 de 2. Si en la ronda 2 el defecto 1 sigue
abierto, escala a Ramón con este diagnóstico.
