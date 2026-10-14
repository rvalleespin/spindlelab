# Acta de QA · SpindleLab v3 · E8, pase de voz

Dos rondas. La ronda 2 va primero. La ronda 1 queda abajo tal como se firmó en `8417701`, con los
títulos un nivel más abajo y sin otro cambio.

## Ronda 2 · 14-oct-2026

**Javiera (`/web-qa-critico`), en contexto limpio.** No leí la conversación de Diego ni la de Clara, y
no tomé sus cifras: lo que va abajo sale de builds y extracciones mías. Leí entero el plan aprobado
(`dazzling-snacking-river.md`, con «Decisiones de Ramón (14-oct)» y «Tanda 3»), el acta de la ronda 1,
el diff de `f0d911c` y `f57f227`, y `e8-antes-despues.md` en todo lo que cambió. De `copy-secciones.md`
leí las decisiones de Ramón, «Lo que queda para ti», el anexo D y «Para Diego», y las tablas las
comparé con el registro por script. De `hoja-de-voz.md` releí el glosario del chequeo (2.1) y la
regla de las frases enlazadas, que es lo que toca esta ronda. De `censo-parches.md` e
`inventario-resumen.md`, lo que dicen de `enlaza` y de los espacios duros.

**Auditado:** rama `claude/magical-franklin-ckfki2`, HEAD `f57f227` (la rama remota está en el mismo
commit). Desde `c17a788`: `b90679a`, `3877e51`, `2dbaa09`, `eaa0c33` y `9b9d590`, que revisé en la
ronda 1, y tres nuevos: `8417701` (el acta de la ronda 1), `f0d911c` (arreglos en el sitio) y `f57f227`
(arreglos en los documentos).

### Veredicto: **aprobado**

Los cuatro defectos de la ronda 1 que le tocaban al constructor (1, 3, 5 y 6) están cerrados, y lo
medí. El arreglo no movió nada más. Entre el sitio de la ronda 1 y el de hoy cambian 4 archivos HTML,
una línea en cada uno: 2 diferencias de texto (los dos espacios duros) y 2 enlaces nuevos (los de
«chequeo gratis»). No cambia nada en el head, los atributos, el JSON-LD, las zonas cerradas ni las
invariantes. Contra `c17a788`, el pase completo sigue explicado fila por fila: 245 de 245.

Quedan abiertos dos menores que no son del constructor, cada uno con su dueño y su plazo (ver
«Defectos»). Uno es la frase «como si … frena» de Trabajo, que Ramón ya tiene en el punto 9 de las
confirmaciones. El otro es el descuadre de la fila de Trabajo, que decide Lucía y se registra en el §7
en el paso 9. Ninguno impide mandarle `e8-antes-despues.md` a Ramón.

No hay ronda 3. Lo que sigue abierto no se arregla en el código sin una decisión que no es mía ni de
Diego. Si Lucía no decide antes del paso 9, el defecto 2 de esta acta pasa a Ramón como una
confirmación más, con las medidas de abajo.

### Cómo se verificó

Tres builds, cada uno desde `git archive` de su commit y con su propio `npm run build` (exit 0, 27
páginas):
- HEAD (`f57f227`), servido en el puerto 8861;
- `9b9d590`, el sitio que revisé en la ronda 1, en el 8863 (`8417701` solo agregó el acta);
- `c17a788`, la base, en el 8862. Comprobé que es la base: su extracción contra `migrado.json` da solo
  las 2 diferencias de `a70e945`, la meta de la home con Claude.

Navegador: Chromium de Playwright (`/opt/pw-browsers/chromium-1194`), con el aviso de cookies cerrado
por `localStorage`.

Archivos de trabajo, que no se commitean: `scratchpad/e8/tanda3/javiera-r2/`. Ahí están `ahora.json`,
`base.json` y `r1.json`, las comparaciones `*-vs-*.{md,json}`, los scripts (`estricto3.py`,
`conciliar.py`, `reglas.py`, `doc-vs-reg.py`, `enlaces.py`, `jsonld.mjs`, `viudas*.mjs`, `lineas.mjs`,
`par.mjs`, `foco.mjs`, `capturas.mjs`, `cap-trabajo.mjs`) y `capturas/`.

### Las mediciones

| Comprobación | Resultado |
|---|---|
| `npm run verificar -- --prefijo /v3/ --sin-pildoras` a 390, 768 y 1440 | 21 páginas «Sin hallazgos» en los tres anchos (exit 0). Ningún comentario HTML servido |
| `diff -rq` del `dist` de `9b9d590` contra el de HEAD | Cambian 4 archivos: Contacto, Visibilidad, Acompañamiento y Redes, una línea de HTML cada uno. El CSS, el JS, las imágenes y las otras 17 rutas son idénticos byte a byte |
| `extraer.mjs` y `comparar.mjs`, `9b9d590` contra HEAD | 2 diferencias, las dos de texto visible: «realmente⍽gratis?» y «tus⍽redes». 0 en el head, los atributos, el JSON-LD (textos y números), las zonas cerradas y las invariantes |
| Enlaces: href, texto y clase de cada `<a>` en las 21 rutas, `9b9d590` contra HEAD | 2 agregados y ninguno quitado: «chequeo gratis» → `/v3/diagnostico/`, clase `d-enl-svc`, en Visibilidad y en Acompañamiento. La frase nueva de `ENLACES` no agregó enlaces en Auditoría, Redes ni Paid Media |
| Enlaces, `c17a788` contra HEAD | 21 diferencias. Son los textos de filas aprobadas («Conocer a Ramón», «Ver el blog», «Pedir el diagnóstico» y las dos filas del índice) y tres enlaces nuevos: «Visibilidad en IA» en Desarrollo web (fila 983) y los dos de esta ronda |
| `extraer.mjs` y `comparar.mjs`, `migrado.json` contra HEAD | 245 diferencias en 21 rutas (174 cambiadas, 5 agregadas, 4 quitadas, 24 movidas, 8 del head y 30 del JSON-LD), las mismas de la ronda 1 |
| Cada diferencia sale de una fila «cambia» de `registro-aplicar.json` | Las 212 cambiadas se reconstruyen exactas desde el «antes» con las filas de su ruta (`estricto3.py`: 0 que no calcen). Las 4 quitadas son las hojas vacías 790, 837 y 1093 y la mitad del 1107. Las 5 agregadas son los dos compromisos, el plazo de la Auditoría Completa, la prueba de Trabajo y la otra mitad del 1107. Las metas de la home llevan además la reversión de `a70e945` (fila 50), como decidió Ramón |
| Cada fila «cambia» aparece en el sitio | 141 de 141. La 1444 («Revisando…») solo se ve con el chequeo corriendo. `v3-chequeo.js` y las dos páginas que lo cargan son idénticos a los de la ronda 1, donde la comprobé con el chequeo simulado |
| `copy-secciones.md` de hoy contra `registro-aplicar.json` (`doc-vs-reg.py`) | 142 filas de tabla, 0 diferencias, y ninguna fila «cambia» del registro sin su fila en el documento. `f57f227` solo cambió la cita de la fila 983 |
| Zonas cerradas (40, por hash del innerHTML servido), precios, `name`, `chq-*` y números del JSON-LD | iguales en las 21 rutas, contra `migrado.json` y contra la ronda 1 |
| Archivos que no se tocan | `git diff c17a788 HEAD` y `git diff 63f1e55 HEAD` vacíos en `Layout.astro`, `functions/`, `public/js/consent-banner.js`, `public/assets/js/v3-contacto.js` y `src/data/blog-v3/` |
| Cadencia (`quincen\|cada mes\|mes a mes\|al mes`, en texto, atributos, head y JSON-LD) | 49 y 49, ruta por ruta. Diego y Clara cuentan 51 porque suman `v3-chequeo.js`. Con los dos cortes, el conteo no cambia |
| Raya, «acá», voseo, «usted», exclamación y «...» | 0, 3 (las tres en el artículo de los 21 chequeos), 0, 0, 0 y 0 |
| Frases prohibidas del plan | 14 y 14. Todas están en zonas cerradas, o son la frase válida de Contacto («bajo NDA cuando el cliente lo requiere») |
| JSON-LD | Parsean las 21 rutas (42 bloques). El FAQPage es igual a la FAQ visible en todas las páginas que la pintan. En Contacto lo es leyendo el espacio duro como espacio: la pregunta del grafo sigue con espacio normal, a propósito. El BreadcrumbList es igual a la miga en 20 rutas. Los 4 pasos del HowTo de Método son h3. La única diferencia es la que ya estaba en la zona cerrada del artículo «Cuánto cuesta el SEO técnico» (observación 1 de la ronda 1) |
| `?v=3` | `v3-chequeo.js?v=3` en sus 2 referencias servidas (home y Diagnóstico). Ninguna con `?v=2` |
| Palabra sola al final en h1, botones y «Siguiente» | 22 en `c17a788`, 22 en la ronda 1 y 22 hoy: los mismos casos |
| Palabra sola al final en h2 y h3 | 55 en `c17a788`, 54 en la ronda 1 y 52 hoy. Las 52 ya estaban en `c17a788`, así que el pase no deja ninguna nueva |
| Las dos de la ronda 1, medidas línea por línea (Range) | **Redes, h2 del cierre:** a 1440 queda «…llevan / tus redes» (antes, «…tus / redes»). A 390 y 768, igual que antes. **Contacto, primera pregunta:** a 390 queda «¿El mini-diagnóstico es / realmente gratis?» (antes, «…realmente / gratis?»). A 768 y 1440 cabe en una línea |
| Desborde horizontal, medido en la página (`scrollWidth` contra `clientWidth`) | Visibilidad, Acompañamiento, Redes, Contacto y Trabajo, a 390, 768 y 1440: iguales en los 15 casos |
| Foco del enlace nuevo, recorrido con Tab | En Visibilidad y en Acompañamiento, a 390 y a 1440, «chequeo gratis» es la parada 9. Tiene `:focus-visible` y un contorno sólido de 2 px (`rgb(247,245,240)`) con 3 px de separación, y queda dentro de la pantalla. El contraste lo mide `verificar`, sin hallazgos |
| Fila de dos de Trabajo (`par.mjs`: diferencia vertical entre los enlaces de Combeau modelo y Verifica) | A 768, de 0 a 202 px. A 1024, de 27 a 148 px. A 1440, de 0 a 185 px. Igual que en la ronda 1 |

Lo demás de la ronda 1 no lo volví a medir: el menú a 768 × 720 y a 1280 × 650, Diagnóstico a
320 × 568 y en apaisado, el chequeo simulado y «$690.000 con Visibilidad en IA» a 390. Las páginas, el
CSS y el JS de esas mediciones son idénticos byte a byte a los de la ronda 1 (`diff -rq`).

**Capturas** (`capturas/`):
- `visibilidad-compromiso-{390,768,1440}.png` y `acompanamiento-compromiso-{390,768,1440}.png`: el
  compromiso con «chequeo gratis» enlazado;
- `foco-visibilidad-en-ia-{390,1440}.png` y `foco-acompanamiento-mensual-{390,1440}.png`: el foco del
  enlace;
- `redes-cierre-{390,768,1440}.png` y `contacto-faq-{390,768,1440}.png`: los dos espacios duros;
- `trabajo-fila-{antes,ahora}-{390,768,1440}.png` y `trabajo-par-{antes,ahora}-1440.png`: la fila de
  Trabajo.

Lo nuevo está dentro del sistema. El enlace usa `d-enl-svc`, la clase de los otros enlaces del texto
corrido de esas páginas, y lleva al mismo destino que «Correr el chequeo» del cierre y que «Chequeo
gratis» del pie.

### Los defectos de la ronda 1, uno por uno

| # (ronda 1) | Qué era | Estado | Evidencia |
|---|---|---|---|
| 1, el reparo | `e8-antes-despues.md` no traía arriba lo que Ramón tiene que confirmar sobre texto ya aplicado, y la fila 983 citaba «anexo D, 10» | **Cerrado** | `e8-antes-despues.md`, «Confirmaciones sobre texto ya aplicado» (líneas 15 a 63), con nueve puntos: primero la postura de 983, y después 581, 713, el Esencial solo de SEO técnico, «a diario», el cierre de Redes, la fecha de la Ley 21.719, el title sin sufijo de 804 y la frase de Trabajo. Cada cita calza con el texto servido: la guía de 983, la confirmación de 581, la línea de 713, «Revisamos el rendimiento a diario…», el h2 de Redes y «1 de diciembre de 2026» aparecen una vez cada una, y «Nunca pedimos accesos de administrador» no aparece. Comparé con «Lo que queda para ti» y el anexo D de `copy-secciones.md`, y no falta nada que sea sobre texto ya aplicado. Lo que no lo es (R2, R4, R7, los datos que faltan, Google-Extended y el estudio de Marco) está en «Lo que todavía decides tú» o en «Fuera de E8». Los dos documentos citan «anexo D, 9». El único «anexo D, 10» que queda es la cita de la tabla de la ronda 1 |
| 2 | «como si el aviso de cookies frena…» tropieza leído en voz alta | **Avisado, sin arreglar.** Sigue como defecto 1 de esta ronda | Es el punto 9 de las confirmaciones, con la propuesta «por ejemplo, si…» y la aclaración de que Clara lo revisa y se lo propone a Ramón. El sitio sigue con «como si» |
| 3 | «el chequeo gratis» del compromiso no tenía enlace | **Cerrado** | Hay un `<a class="d-enl-svc" href="/v3/diagnostico/">` en cada una de las dos páginas, en la única aparición de la frase en el texto corrido. `enlaza()` escapa el texto antes de insertar el enlace, así que el `set:html` no abre nada. El texto no cambió |
| 4 | La prueba descuadra la fila de Trabajo, y el documento decía que no | **Afirmación corregida, composición igual.** Sigue como defecto 2 de esta ronda | `e8-antes-despues.md` corrige «sin descuadrar el par» con la tabla de medidas, que calza con la mía. No hay decisión de dirección de arte ni fila en la spec |
| 5 | Dos palabras solas nuevas en encabezados | **Cerrado** | Hay un espacio duro (U+00A0, comprobado en los bytes del HTML) solo en el h2 de Redes y en la primera pregunta de Contacto. Los h2 y h3 con palabra sola pasan de 54 a 52, y no aparece ninguna nueva en ningún ancho |
| 6 | El comentario sobre `v3-chequeo.js` seguía hablando de `?v=2` | **Cerrado** | En `diagnostico.astro`, líneas 226 a 229, el comentario explica por qué la versión subió a 2 y por qué a 3 (la fila 1444). No se publica, porque va en `{/* */}` |

### Defectos (ronda 2)

| # | Severidad | Dónde | Qué está mal | Contra qué | Dueño y plazo |
|---|---|---|---|---|---|
| 1 | menor (sigue de la ronda 1, el 2) | Trabajo, ficha de Verifica y Cumple (`obra-v3.json#/casos/2/prueba`) | El sitio sigue diciendo «como si el aviso de cookies frena de verdad a los rastreadores». Ramón ya lo tiene en el punto 9 de las confirmaciones, con la propuesta «por ejemplo, si…». Falta lo que ese mismo punto promete: que Clara lo revise y se lo proponga | antislop D, la prueba en voz alta | Clara, antes de la lectura de aprobación de Ramón (P0.4). Si Ramón acepta, es un encargo exprés: una hoja, con su fila en `copy-secciones.md` |
| 2 | menor (sigue de la ronda 1, el 4) | Trabajo, fila de dos (Combeau modelo y Verifica y Cumple) | Los enlaces de la fila siguen descuadrados: 202 px a 768, 148 px a 1024 y 185 px a 1440. El descuadre ya está en `e8-antes-despues.md` con sus medidas, pero no en la spec, y dirección de arte no lo ha decidido. El argumento de Diego es razonable: a 1024 ya había 27 px, y ninguna regla pide la alineación. Ese argumento va a la spec, y el defecto sigue anotado hasta que esté la fila | web-qa-critico, paso 4 (un desvío no declarado en la spec) | Lucía decide si alinea los enlaces (columna flex con `margin-top: auto` en `.d-pie-trab__enlace`) o acepta el descuadre, y queda en el §7 en el paso 9. Si no decide antes del paso 9, pasa a Ramón como confirmación 10 |

**Bloqueantes: ninguno.** Esta ronda no rompe ninguna regla del plan, de la marca ni de
accesibilidad. Tampoco toca nada cerrado ni agrega nada sin aprobar. Los tres cambios del sitio (el
enlace y los dos espacios duros) son los que pidió la ronda 1, y no cambian ninguna palabra.

### Detector anti-slop (`antislop-web.md`, A y D)

Esta ronda no cambió ninguna palabra: agregó un enlace sobre un texto que ya estaba y dos espacios
duros. Igual corrí A y D sobre las 217 ranuras que cambiaron o entraron desde `c17a788` (texto, head y
JSON-LD), con búsquedas. Leí en voz alta lo nuevo de los cinco servicios, Desarrollo web, Diagnóstico y
Trabajo (`texto-nuevo.txt`).

- **A1:** hay dos «optimizamos», los dos en Visibilidad y ninguno nuevo. «Medimos y optimizamos mes a
  mes» es la fila 1256 de R2, con su excepción declarada. «Las señales que optimizamos» ya estaba, y
  el pase solo la acortó.
- **A4:** uno, «y no solo el sitio de quien recomiendan» (Diagnóstico). Es un contraste real, y queda
  aceptado como en la ronda 1.
- **A7:** «vale la pena» (FAQ de Redes) es castellano de Chile corriente, no el «vale» de España. El
  tuteo es consistente.
- **A2, A5, A6, A8, A9 y A10:** igual que en la ronda 1, sin hallazgos nuevos. Hay 0 rayas, y ninguna
  cifra ni singular nuevo.
- **D:** el logo tapado y el rubro cambiado pasan, como en la ronda 1. La voz alta pasa con el tropiezo
  de Trabajo (defecto 1). El enlace no cambia la lectura: «saque en el chequeo gratis más puntos» suena
  igual con el subrayado o sin él.
- **Checklist §E.** **Copy:** como en la ronda 1. **Estructura:** sin cambios. **Código:** el foco del
  enlace nuevo es visible, el contraste es AA (`verificar`), el JSON-LD, el canonical y el OG no
  cambiaron, y el `?v=3` está en sus dos referencias. **Índice y sitemap:** no aplican. **Visual:** el
  enlace usa una clase que ya existe, y los espacios duros no tocan la composición.

### Lo que pedía el encargo, punto por punto

1. **Build y `verificar` a 390, 768 y 1440:** cumple.
2. **Toda diferencia sale de `copy-secciones.md` o de una decisión de Ramón, y nada más cambió:**
   cumple. Hay 245 de 245 contra `migrado.json`, y la ronda 2 solo agrega lo que pidió la QA. También
   cumplen las zonas cerradas, los precios, los `name`, los `chq-*`, la cadencia, las rayas, «acá», el
   voseo, el JSON-LD (21 de 21 y sus tres paridades), los archivos intocables y el `?v=3`.
3. **Detector anti-slop, A y D:** cumple, con el defecto 1.
4. **Las decisiones de Ramón:**
   - **El compromiso de los 3 meses** no promete una cita en un modelo. Promete más puntos en el
     chequeo, «contando las mismas señales», y que los robots de ChatGPT, Claude y Perplexity puedan
     entrar. Lleva los dos ajustes, letra por letra: «Si tu sitio ya parte en 100, el compromiso es
     que no baje y que cerremos lo que encontremos pendiente», y «acceso a donde se configura qué
     robots entran, como Cloudflare u otro CDN». No dice qué pasa si no se cumple. Desde esta ronda,
     «chequeo gratis» lleva al chequeo, que es lo que hace cierto el «lo compruebas tú».
   - **La prueba de Trabajo** sigue en la ficha de Verifica y Cumple, justo después de «Chequeo
     gratuito de las señales técnicas que pide la Ley 21.719». No nombra el chequeo de IA y no está en
     el JSON-LD.
   - **El mini-diagnóstico** sigue nombrando a ChatGPT, Gemini y Perplexity en el paso 02 (639), en la
     FAQ de Diagnóstico y en el remate del chequeo (1440, `v3-chequeo.js:106`). La 617 está igual que
     en la base.
   - **R2, R4, R7 y los datos que faltan** no se aplicaron. Las 54 «espera-R2» siguen igual, y la
     tarjeta de la Auditoría + Visibilidad en IA no tiene punto de plazo.
5. **Capturas a 390, 768 y 1440, sin palabra sola en h1, botones ni «Siguiente», y dentro del
   sistema:** cumple, con los mismos 22 casos de siempre. Lo único que sigue fuera de lo decidido es
   la fila de Trabajo (defecto 2).

### Observaciones (no son defectos)

1. **Corrección a mi ronda 1, observación 4.** `comprobar_aplicar.py` sí está en
   `scratchpad/e8/tanda3/clara/`, con fecha 18:22, antes de la ronda 1. Me equivoqué al decir que
   faltaba.
2. **Los dos espacios duros de esta ronda** están escritos como el carácter literal, en
   `[slug].astro:330` y `contacto.astro:76`. En el código parecen un reemplazo que no hace nada:
   «'tus redes' por 'tus redes'». Los mismos archivos usan `' '` en `contacto.astro:46` y
   `[slug].astro:468`. Los comentarios lo explican, pero si alguien vuelve a tocarlos conviene
   escribirlos con ` `.
3. **Los tres parches nuevos** (la frase «chequeo gratis» en `ENLACES` y los dos `.replace` del espacio
   duro) son de los que dejan de calzar en silencio si el texto cambia (plan, «La trampa principal»).
   Están comentados. Conviene que la fila del §7 del paso 9 los nombre, porque R2 agrega una frase al
   final del compromiso, y porque cualquier cambio del h2 de Redes o de la pregunta de Contacto
   tendría que revisarlos.
4. **A 1440, el compromiso de Acompañamiento** deja «tú.» solo en su última línea. Ya pasaba en la
   ronda 1, y la regla del plan no cubre párrafos.
5. **La medida del compromiso a 1440** (unos 93 caracteres por línea, como anota Diego) es la de todo
   `.d-filas .d-cuerpo` en las internas. El §7 ya tiene abierto ese arreglo del sistema (fila del
   5-oct, «Medida del texto corrido en las internas»), y esa fila dice que no se parcha página por
   página.
6. **Antes de publicar** sigue pendiente volver a correr el chequeo de la Ley 21.719 sobre la vista
   previa (punto 5 de «Lo que todavía decides tú»). La comprobación del plan de que la vista previa
   `/v3/` responde 200 con `x-robots-tag: noindex` es del paso 9, y no la medí.

### Lo que está bien (y no hay que perderlo)

- **El arreglo fue quirúrgico.** Son 4 archivos, una línea de HTML en cada uno, y el resto del sitio
  quedó idéntico byte a byte. Cada parche lleva un comentario con el porqué y la condición en que deja
  de calzar.
- **El documento para Ramón quedó completo y honesto.** Las nueve confirmaciones citan el texto tal
  como se sirve, y Diego corrigió por escrito su propia afirmación sobre la fila de Trabajo, con las
  medidas. La tabla de la ronda 1 dice qué se hizo con cada defecto, sin dar por cerrado lo que no
  estaba cerrado.
- **Lo que la ronda 1 encontró bien sigue igual:** la aplicación exacta (245 de 245), lo cerrado
  intacto y las decisiones de Ramón aplicadas sin desbordarse.

### Firma

Javiera, QA crítica del Estudio Web. **Aprobado**, en la ronda 2 de 2. Quedan dos menores abiertos,
con dueño y plazo, y ninguno es del constructor. El 1 es de Clara, antes de la lectura de aprobación
de Ramón. El 2 es de Lucía, en el paso 9, y si ella no decide pasa a Ramón. La decisión de publicar es
de Ramón.

---

## Ronda 1 · firmada en `8417701`

**14-oct-2026.** Javiera (`/web-qa-critico`), en contexto limpio: no leí la conversación de Clara ni la
de Diego. Leí el plan aprobado (`dazzling-snacking-river.md`, entero, con «Decisiones de Ramón
(14-oct)» y «Tanda 3»), `copy-secciones.md`, `e8-antes-despues.md`, `hoja-de-voz.md`,
`censo-parches.md`, `inventario-resumen.md`, los registros y el código. Lo que digo abajo lo medí yo,
con mis propias corridas; donde coincide con lo que Diego reporta, lo digo, pero no lo tomé de él.

**Auditado:** rama `claude/magical-franklin-ckfki2`, commits `b90679a`, `3877e51`, `2dbaa09`, `eaa0c33` y
`9b9d590` sobre `c17a788` (HEAD `9b9d590`; la rama remota no avanzó). Rondas previas: ninguna.

### Veredicto: **aprobado con reparos**

El sitio está bien: cada diferencia del texto servido sale de una fila aprobada y nada más cambió.
Lo cerrado, los precios, los `name`, los `chq-*`, la cadencia y el JSON-LD quedan intactos. Las
decisiones de Ramón del 14-oct están aplicadas como las tomó. Los seis defectos son menores.

**El reparo, con plazo:** el defecto 1 se arregla antes de mandarle `e8-antes-despues.md` a Ramón. Ese
documento es el que lee con la vista previa, y hoy no le muestra arriba todo lo que le queda por
confirmar. Los defectos 2 a 6 van en la misma ronda de arreglo si no cuestan, o quedan anotados.

### Cómo se verificó

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

#### Las mediciones

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

### Lo que pedía el encargo, punto por punto

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

### Defectos

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

### Detector anti-slop sobre el texto nuevo (`antislop-web.md` A y D)

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

### Observaciones fuera de E8 (no son defectos de este pase)

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

### Lo que está bien (y conviene no perder en la corrección)

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

### Firma

Javiera, QA crítica del Estudio Web. **Aprobado con reparos.** El reparo es el defecto 1, y se cierra
antes de que `e8-antes-despues.md` llegue a Ramón. Ronda 1 de 2. Si en la ronda 2 el defecto 1 sigue
abierto, escala a Ramón con este diagnóstico.
