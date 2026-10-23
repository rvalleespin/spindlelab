# Encargo a la sesión del v3: adaptar el sitio nuevo al modelo de negocio nuevo

**De:** la troncal, a pedido de Ramón · **Fecha:** 23-oct-2026 · **Para:** la sesión que construye el v3 (rama `claude/magical-franklin-ckfki2`)
**Estado:** propuesta de la troncal. Las cuatro decisiones de la sección 3 son de Ramón y están sin cerrar: pregúntaselas.

Ramón adoptó un modelo de negocio y un posicionamiento nuevos para SpindleLab. Reemplazan el giro del 29-sep («el sitio web al centro, el AEO como su especificación») como base del mensaje del v3. Quiere el sitio nuevo publicado en menos de un mes, idealmente antes, porque depende de esto para su estrategia de ventas.

## 1. Lee primero (todo está en `origin`)

```bash
git fetch origin claude/modelo-negocio-y-textos-sitio-borradores claude/sitio-posicionamiento-nuevo
# el modelo de negocio (v1.1)
git show origin/claude/modelo-negocio-y-textos-sitio-borradores:marketing/modelo-de-negocio-v1-BORRADOR.md
# el texto de todo el sitio escrito sobre ese modelo (v1.2). Sobre todo las secciones 1, 11, 12, 13 y 14
git show origin/claude/modelo-negocio-y-textos-sitio-borradores:marketing/sitio-nuevo-textos-v1-BORRADOR.md
# la revisión independiente de TU sitio contra ese modelo (cuatro lentes, con archivo y línea)
git show origin/claude/sitio-posicionamiento-nuevo:marketing/encargos-otras-sesiones/revision-v3-contra-modelo-nuevo-23oct.md
```

**Mensaje nuevo.** Posicionamiento: «Marketing y crecimiento con IA para empresas que ya venden». Titular propuesto: «Te llegan consultas. Veamos dónde se cae el resto.» Ruta: revisión gratis de una página, conversación de 20 minutos, propuesta por escrito por fases, implementación, acompañamiento mensual. Se promete método, entregables y plazos. Nunca resultados.

## 2. Lo que encontró la revisión

- El v3 está terminado para otro mensaje: «A · Archivo», un estudio de diseño y tecnología con el trabajo primero. Su brief dice «No es una agencia de marketing». La palabra «marketing» no aparece en la home, servicios, método ni contacto. El choque es de identidad.
- **No se reinicia de cero: se adapta.** Reiniciar tira dos compuertas de diseño ya respondidas (16 y 19-oct), unas 5.100 líneas de código medidas y dos rondas de QA, y no ahorra tiempo porque el motor y las herramientas se conservarían igual.
- **La home se recompone, no solo se reescribe.** Hoy el portafolio ocupa el 57,5 % de la altura a 1440 px, los precios empiezan al 68 %, la acción principal es el chequeo y el único botón a `/contacto/` está al final. Faltan: el problema en palabras del cliente, para quién, la ruta de cuatro pasos, el FAQ (con FAQPage en el JSON-LD) y los precios arriba.
- Se conserva sin tocar: precios (idénticos a `origin/main`), las seis plantillas de servicio, el formulario con su endpoint, el chequeo, el caso Combeau, el blog, los rótulos de «Concepto» (están bien hechos), el sistema visual, `verificar.mjs` y `mide.mjs`, y las 20 URLs vivas.
- No es publicable hoy: seis compuertas abiertas (R1, R2.1, R2.2, R9, lectura de aprobación, merge), la lista de publicación del 13-oct describe un v3 anterior, y quedan los defectos menores 9 y 10 de la QA.

## 3. Decisiones de Ramón que debes cerrar ANTES de escribir (un solo mensaje, con esta propuesta por defecto)

1. **¿El look del v3 sirve para «marketing y crecimiento con IA»?** (fondo negro, hilo de oro, trabajo primero). Propuesta: sí, se conserva y se recompone la home. Si dice no, es un rediseño y esto cambia de tamaño.
2. **R1: ¿raíz o prefijo `/v3/`, y fecha?** Propuesta: raíz, solo cuando el texto nuevo ya esté publicado sobre el sitio vigente, y con un corte que lleve únicamente `spindlelab-astro/` y lo mínimo de documentos.
3. **¿Qué casos quedan?** Propuesta: Combeau (el único caso público con permiso, de sitio web), Verifica y Cumple como pieza propia, fuera Praxi y los cuatro conceptos. Esto también cierra R9.
4. **R2.1 y R2.2: cadencia y monitoreo.** Propuesta: informe del Acompañamiento mensual, y sacar de las promesas el monitoreo de menciones en IA y el compromiso de puntaje a 3 meses hasta que existan.

## 4. Qué hacer, en orden

1. Pausa lo pendiente de la lista de publicación que dependa del mensaje anterior.
2. Reescribe el brief de obra desde el modelo nuevo (a quién le habla, qué pasa en cada ruta, qué NO se hace). Es la compuerta 1. Hazle a Ramón sus preguntas bloqueantes, máximo cinco, junto con la sección 3.
3. Clara reescribe `texto-obra.json` desde el documento de textos v1.2 como borrador de partida, no como definitivo, y re-extrae con `extraer-texto.mjs`. Reglas de la casa: tuteo chileno, sin rayas largas, sin Title Case, sin «¿Listo para…?», cero prueba social inventada.
4. Lucía especifica solo lo que cambia en la home: orden de las nueve secciones, acción principal «Pedir la revisión de una página» hacia `/contacto/` con el chequeo como enlace secundario (eso reabre el hero aprobado el 19-oct, así que Ramón lo ve), y la nav con Blog y botón de acción.
5. Diego recompone `index.astro` moviendo bloques y aplica el texto. Nav: Soluciones, Método, Nosotros, Trabajo, Blog, Contacto y el botón.
6. Barrido de términos sobre TODO lo que se publica, incluido lo que un barrido de textos no ve: `v3-chequeo.js` (líneas 75, 106 y 110), `layout-a.ts`, `llms.txt`, `paginas-v3.json`, `interiores.mjs`, imagen al compartir y JSON-LD.
7. Javiera revisa en un subagente limpio (`verificar`, `mide` a 390, 768 y 1440), incluida la lectura de tres lectores en frío sobre el sitio construido.
8. Reescribe y reensaya la lista de publicación sobre este v3.

## 5. Trampas medidas

- **El texto no se edita en el `.astro`.** Viene de `src/data/archivo/texto/*.json` (copias de Clara con sha256, «no se edita a mano») y el build se cae si los precios o nombres difieren de `oferta-v3.json` y `servicios-v3.json`.
- **Promesas que hay que sacar o decidir** (la revisión las trazó a `capacidad-servicios.md` y a la regla del 27-sep): monitoreo doble quincenal, share-of-voice y AI Overviews; el compromiso de puntaje a 3 meses; «aumentar tu probabilidad de cita»; informe mensual contra quincenal para el mismo plan; «24 horas» en 38 lugares (el único plazo real documentado fue 31 h: usar «un día hábil»); «tu nombre ya esté ahí»; «más de cinco años en agencias» (el CV es un conjunto cerrado de hechos); «es el mismo chequeo que le pasamos a cada sitio que construimos» (ningún sitio entregado pasó por él antes de salir); la frase de resultado del caso Combeau; los dos artículos del blog que dan consejos opuestos sobre los robots de IA.
- **La atribución UTM no funciona en el build actual.** El arreglo vive en `NavV3.astro`, que ninguna ruta usa. Pégalo en `Encabezado.astro` o en la plantilla. (La revisión midió el mismo problema en el sitio vigente: anuncio, home, contacto llega con los tres UTM vacíos.)
- **El peso del merge.** Fusionar la rama tal cual suma unos 486 MB comprimidos a un `main` de 250 MB y las rutinas en la nube clonan `main`. El corte debe llevar solo `spindlelab-astro/` y lo mínimo.
- **`Layout.astro` es el único archivo que ambos caminos tocan.** Hay una segunda sesión poniendo el texto nuevo sobre el diseño vigente en `claude/sitio-posicionamiento-nuevo`, para tener algo publicable antes. Reutiliza su texto, no la esperes y no toques esa rama.

## 6. Límites

- No hagas merge a `main` ni publiques. Push de tu rama y avisa a Ramón.
- Cero cifras, casos, logos o testimonios que no tengan respaldo. Los conceptos siguen rotulados como conceptos.
- Entrégale a Ramón un calendario con fechas para publicar en menos de un mes. La revisión estima que construir y pasar la QA caben en una semana si responde las compuertas en uno o dos días (es una inferencia de los commits y las actas, no una promesa).
