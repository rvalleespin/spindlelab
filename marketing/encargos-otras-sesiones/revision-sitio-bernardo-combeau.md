# Encargo — Revisión del sitio de Bernardo Combeau: corregir, y después darle vida

**Fecha:** 2026-09-03 · **Para:** la sesión que mantiene el repo de Bernardo Combeau
**De:** sesión troncal (a pedido de Ramón) · **Cliente:** Bernardo Combeau (fotógrafo, Santiago)
**Origen:** Ramón encuentra el sitio "un poquito plano, fome", y pide más creatividad,
impacto y memoria **sin perder la esencia**.

> **Cómo se hizo esta revisión, y su límite.** Se leyó el **sitio en vivo**
> (`https://bernardocombeau.cl`): HTML servido y el CSS completo (`/_astro/nav.Dqq3zwkF.css`).
> **No se vio la página renderizada** — el navegador headless de la sesión cloud no
> atraviesa su proxy. Todo lo de abajo sale del código, no de mirar la pantalla.
> **Verifica cada punto contra el repo antes de tocar nada:** el sitio pudo cambiar, y la
> versión servida puede no ser la del código fuente.

---

> **Actualización 1 (7-sep-2026) — primera corrección de botones/UI-UX del sitio
> público, ejecutada.** A pedido de Ramón conecté el MCP de Refero (referencias de
> diseño real) e hice un inventario completo de cada botón/link del sitio — con
> Chromium headless corriendo local y capturas, no solo lectura de código. Encontré 5
> gaps reales; los primeros 4 son correcciones (Parte 1, no rediseño):
>
> - **Servicios → "Otros proyectos" decía "Conversemos →" pero era un `<div>` sin
>   acción** — un visitante no podía hacer clic ahí. Ahora es un link real a
>   `/contacto`.
> - **El CTA del hero y los 3 botones de Contacto** (WhatsApp/Email/Instagram) no
>   tenían ningún estado hover ni focus-visible — cero feedback de que son
>   interactivos, ni para mouse ni para teclado.
> - **El tag "Publicado en" de las fichas de Retratos** tampoco tenía hover/focus —
>   mismo bug, mismo arreglo.
> - **Los controles del lightbox de Retratos/Proyectos** (cerrar/anterior/siguiente)
>   tenían menos área de toque que el Visor nuevo de Modelo — parejados a 48×48px.
>
> El quinto punto sí toca el look, no solo la corrección — respaldado en 8 referencias
> de sitios editoriales de fotografía en Refero (Atelier Deux-Cé, Julia Krantz,
> Christopher Ireland, Artandcommerce, Bibliothèque, Simone Sniekers, Jakub Reis, Laura
> Monin) más 3 sitios con CTA real (Sequel, Handhold, Medium): **el único CTA "duro"
> del sitio (el pill del hero y el WhatsApp de Contacto) pasó de solo-contorno a
> relleno sólido** — invierte a fantasma en hover para dar feedback, sin sumar ningún
> color nuevo a la paleta. Email e Instagram siguen fantasma; nada más cambió.
>
> **Este último punto es exactamente el tipo de cambio que la Parte 3 de este
> documento (punto 4, "un acento cálido... usado en el CTA") dejó como rediseño pagado
> aparte (Parte 6).** Antes de tocarlo le pregunté a Ramón directamente si ya se
> habían cobrado los $235.200 de Fases 1 y 5 — confirmó que sí, así que lo hice.
> **Sigue pendiente y sin tocar:** el resto de la Parte 2-3 completa (romper la grilla
> cuadrada, aparición al scroll, movimiento en el hero, etc.) — esto no fue eso, fue
> solo el relleno del botón.
>
> Verificado con Chromium headless local: estados hover/focus por color computado (no
> solo por ojo), el link de Servicios navegando de verdad a `/contacto` al hacer clic,
> y el tamaño real (48×48px) de los tres controles del lightbox. Mergeado directo a
> `main` (commit `058dbf6`), confirmado en producción.

> **Actualización 2 (7-sep-2026) — Ramón corrige: "me equivoqué en separar los
> sitios", fondo negro permanente para todo Bernardo-fotógrafo.** Instrucción directa:
> el sitio de fotografía (Home, Retratos, Proyectos, Estudio, Servicios, Sobre mí,
> Contacto) va en fondo negro, y **solo** la sección Modelo queda en blanco. Antes de
> tocar nada confirmé en el propio código que hoy no existe ningún mecanismo activo
> que fuerce un tema — el sitio solo se veía oscuro si el visitante tenía dark mode
> activado en su sistema operativo (`prefers-color-scheme`), y los selectores
> `[data-theme]` que ya estaban escritos en el CSS nunca se activaban desde ningún
> `.astro` (código muerto).
>
> Ejecutado: el fondo oscuro pasa a ser **fijo**, no condicional al tema del sistema —
> se usa la misma paleta oscura que ya vivía en el CSS (nunca se inventó un color
> nuevo), y se retiró el `@media(prefers-color-scheme)` más los `[data-theme]`
> muertos. La sección Modelo no se tocó — tiene sus propios tokens
> (`--mp`/`--mi`/`--mm`/`--ml`), siempre claros, completamente aislados de los del
> sitio principal (`--paper`/`--ink`/etc.), así que sigue blanca sin que hiciera falta
> ningún cambio ahí. Confirmé además que ningún archivo de página tiene un color
> "a mano" (grep sin resultados fuera de `global.css`) — todo el sitio ya dependía de
> estos tokens, por eso el cambio fue de una sola pieza del CSS.
>
> Verificado con Chromium headless local, forzando el color-scheme del navegador a
> "dark" y a "light" por separado en las mismas páginas — el sitio principal se ve
> **idéntico** en ambos casos (ya no depende del sistema del visitante), con buen
> contraste en cada página (Servicios, Contacto, Retratos + lightbox, Estudio, Sobre
> mí); Modelo (portada y Work) se ve sin ningún cambio, blanca, con el trabajo de
> rondas anteriores (grilla de 2 columnas, flechas, tipografía) intacto. Mergeado
> directo a `main` (commit `00b134c`), confirmado en producción.

> **Actualización 3 (7-sep-2026) — "la franja de video del home está estática en el
> teléfono".** Ramón reportó que la franja de Motion/Commercials (la sección con
> video de fondo en `/modelo/`) no se movía en su celular. Causa encontrada en el
> código, no es un bug nuevo — es una decisión de una sesión anterior, explícita en
> un comentario del propio archivo: el video solo arranca solo al hacer scroll en
> pantallas ≥768px (dato móvil + autoplay poco confiable en celular). El problema
> real es que en pantallas chicas el botón Play **tampoco se mostraba** — quedaba la
> franja fija sin absolutamente ninguna forma de hacerla andar.
>
> Corregido sin tocar la lógica de autoplay automático (que sigue siendo solo
> desktop, respetando datos y `prefers-reduced-motion`, como ya estaba pensado): el
> botón Play/Pause ahora aparece siempre que haya video, en cualquier pantalla. Un
> tap es un gesto real del usuario, así que reproduce de forma confiable incluso
> donde el autoplay automático no corre — el propio código ya advertía que el modo
> de bajo consumo de iOS bloquea el autoplay "aun con muted + playsinline, y no es
> detectable", así que forzar autoplay en todo celular no habría sido una solución
> confiable; un botón que sí depende de un gesto del usuario, sí lo es.
>
> Verificado con Chromium headless local en viewport de celular (390×844, con
> touch): antes del tap el botón ya está visible y el video no cargó nada
> (`videoSrc:""`, cero costo de datos); después del tap el video carga y reproduce
> de verdad (`paused:false`). En desktop, sin tocar nada, el autoplay automático
> sigue exactamente igual que antes. Mergeado directo a `main` (commit `02cc02a`).
> Confirmado en producción de forma indirecta pero concluyente: extraje el script
> minificado real que sirve `bernardocombeau.cl/modelo/` y confirmé que
> `botón.hidden=false` y su listener de clic ya no dependen del ancho de pantalla —
> solo el arranque automático por `IntersectionObserver` sigue condicionado a
> desktop, exactamente como quedó en el commit.

> **Actualización 4 (7-sep-2026) — Ramón corrige de nuevo: quiere que arranque sola
> también en el teléfono, no solo con el botón.** La Actualización 3 resolvió "no hay
> forma de hacerla andar" con un botón siempre disponible, pero la idea de Ramón era
> que se reprodujera **automáticamente**, igual que en desktop.
>
> Se sacó la restricción de "solo pantallas ≥768px" del arranque automático — el
> video ya iba `muted+playsinline`, que es justo el caso que los navegadores móviles
> sí dejan autoplayear sin que el visitante toque nada (la restricción real de los
> navegadores es sobre autoplay CON sonido, no sobre autoplay silenciado). Se
> mantienen sin tocar las dos preferencias que sí son del visitante, no del tamaño de
> su pantalla: `prefers-reduced-motion` y ahorro de datos (Data Saver) — si alguien
> pidió explícitamente menos movimiento o cuidar sus datos, el video sigue sin
> arrancar solo. El botón Play/Pause de la Actualización 3 se mantiene, siempre
> visible, como respaldo: el propio código ya advertía que el modo de bajo consumo de
> iPhone puede bloquear cualquier autoplay, muted o no, sin que haya forma de
> detectarlo de antemano — si eso pasa, el botón sigue ahí para arrancarla a mano en
> vez de quedar sin ninguna salida.
>
> Verificado con Chromium headless local, viewport de celular, sin tocar nada: el
> `<video>` pasa a `paused:false` solo, con `muted:true` y `playsInline:true` (las
> condiciones que los navegadores móviles exigen para autoplay sin gesto). No se
> pudo confirmar el avance visual de los fotogramas en este entorno de prueba — el
> Chromium headless de esta sesión no llega al CDN real del video (mismo límite de
> red ya documentado antes para YouTube y unpkg.com; confirmado aparte que ese mismo
> archivo SÍ es alcanzable por HTTP normal, o sea es un límite del navegador de
> prueba, no del video ni del sitio). Verificado también que con
> `prefers-reduced-motion` activado el video NO arranca solo (sigue mostrando el
> póster) pero el botón Play sigue disponible, y que desktop no tuvo ninguna
> regresión. Mergeado directo a `main` (commit `1f0a021`), confirmado en producción
> extrayendo el script real servido: ya no queda ningún `matchMedia` de ancho de
> pantalla, solo el de `prefers-reduced-motion`.

---

## PARTE 1 — Correcciones (esto no es gusto, está roto o falta)

Prioridad sobre lo creativo. Varias son exactamente el servicio que vende SpindleLab, así
que dejarlas pasar es incoherente con lo que se le cobra a cualquier otro cliente.

1. **Cinco imágenes con `alt="."`** (un punto). Ni un buscador de imágenes ni un motor de
   IA pueden leerlas. Cada foto necesita un alt real y descriptivo.
2. **Dos placeholders publicados en producción:** existen y responden las rutas
   `/retratos/nombre-de-la-serie` y `/proyectos/aquí-estoy-creando-algo-nuevo`.
   Renombrar o despublicar. Un placeholder en producción es error de credibilidad, no de
   estilo.
3. **Descalce de contenido:** la tarjeta titulada **"La caída"** lleva
   `alt="de cuando salgo un domingo"`.
4. **El hero tiene `loading="lazy"`.** Es el elemento más grande de la página: cargarlo
   perezoso retrasa la primera pintura y castiga el LCP. Debe ir `loading="eager"` con
   `fetchpriority="high"`. El resto de la grilla sí va lazy.
5. **Atributo inválido `inputtedWidth="800"`** en todas las tarjetas (parece un `width`
   mal tipeado que se filtró desde el generador).
6. **Cero JSON-LD en todo el sitio.** No hay `Person`, ni `ImageObject`, ni negocio local.
   Para un fotógrafo de Santiago que quiere aparecer cuando alguien le pregunta a un motor
   de IA por un retratista, ese es el hueco completo. Es la corrección de mayor valor
   comercial de esta lista.
7. **Formatos de año mezclados** en la misma grilla: `2022-2026` con guion y `2022–2026`
   con raya.

**Criterio de término de la Parte 1:** render verificado (no asumido), LCP medido antes y
después, y el sitio pasando el chequeo de 21 señales de SpindleLab. La regla de la casa
aplica igual cuando el cliente ya aprobó: **una pieza que reprueba nuestro propio chequeo
contradice lo que vendemos.**

---

## PARTE 2 — Por qué se siente plano (diagnóstico, con la evidencia)

- **Una sola animación en todo el sitio:** el reveal del hero al cargar (`@keyframes
  reveal`, 0,9 s, `translateY(10px)` + opacidad). Después nada se mueve nunca más.
- **Cero reacción al scroll.** La palabra `scroll` no aparece en el CSS.
- **La única interacción es `scale(1.035)`** en hover de tarjeta. Un 3,5%: imperceptible.
- **La paleta no tiene acento.** Los cinco tokens (`--paper #fbfaf8`, `--ink #111110`,
  `--mute #84817a`, `--line #e7e4dd`, `--stage #f0efe9`) son cinco tonos del mismo beige.
  No hay un punto de tensión en la página.
- **Dos feeds idénticos.** "Retratos" y "Proyectos" comparten grid, tarjeta y leyenda.
  Cero variación de ritmo entre secciones.
- **Y el problema de fondo: todas las tarjetas forzadas a `aspect-ratio: 1`.** Un retrato
  es 4/5, un apaisado 3/2. Se está recortando la composición de un fotógrafo para que
  quepa en una grilla. **Eso es lo que aplana un portafolio:** todo pesa igual, así que
  nada pesa. No es falta de animación, es falta de jerarquía entre las obras.

## PARTE 3 — Movimientos propuestos, por orden de impacto

Son propuestas, no órdenes. Se eligen con Ramón, y Bernardo aprueba.

1. **Romper la cuadrícula cuadrada.** Que el formato lo dicte la foto. Ritmo de una grande
   con dos chicas, o masonry. Cambia más de la mitad de la sensación y no toca la esencia.
2. **Aparición al scroll.** Fade + 12 px de subida, escalonado. El keyframe `reveal` ya
   existe: reutilizarlo con `IntersectionObserver`. Barato y es lo que falta.
3. **Subir el hover** de 1.035 a ~1.06, más lento, y que la leyenda aparezca al pasar por
   encima en vez de estar siempre visible.
4. **Un punto de tensión en la paleta:** un acento cálido extraído de la piel de sus
   propios retratos, usado en el CTA y en el hover. **Uno solo y escaso** (regla de la casa
   sobre el acento único).
5. **Movimiento en el hero.** Hoy es foto fija. Si Bernardo tiene video de sesión, sirve la
   técnica del loop perfecto (mismo frame de inicio y fin). Si no hay video, un ken-burns
   lentísimo (escala 1.0 → 1.04 en ~20 s) da vida sin inventar nada.

**Mantener `prefers-reduced-motion`.** El CSS actual ya apaga el zoom para quien lo pide
(`@media (prefers-reduced-motion: reduce)`). Cualquier animación nueva se agrega dentro de
ese guard, no fuera.

## PARTE 4 — Lo que NO se toca

El sitio está bien hecho. Esto se conserva:

- **El grano por SVG** (`feTurbulence` + `mix-blend-mode: overlay` al 35%) sobre cada foto.
  Es oficio y da textura de película.
- El guard de `prefers-reduced-motion`.
- Canonical, Open Graph completo, imágenes responsivas por Vercel, `aspect-ratio` declarado
  (no hay salto de layout).
- El scrim en gradiente del hero, que resuelve la legibilidad del texto sobre foto.
- **El `h1`:** *"Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su
  mejor versión."* No es relleno, tiene criterio. No reescribirlo.

## PARTE 5 — Regla dura para este cliente

**Ninguna imagen ni video generado con IA entra a este sitio.** El producto de Bernardo es
su ojo; una imagen generada en el sitio de un fotógrafo no es una mejora, es un problema de
credibilidad. Las técnicas de landings con movimiento que quedaron en la memoria de Bruno
sirven para productos sin material propio. Acá hay material real, y ese es el activo.

## PARTE 6 — Nota comercial (decisión de Ramón, no de la sesión que ejecuta)

- La **Parte 1** es corrección y entrega de servicio: candidata natural a la primera entrega
  real de SEO/AEO sobre un cliente que ya confía, y buen momento para pedir el testimonio y
  el permiso de caso público, que siguen pendientes.
- La **Parte 2-3** es rediseño y **no está en el Plan Esencial** que Bernardo contrató. Va
  como fase aparte que se cobra.
- **Quedan $235.200 por cobrar** (Fases 1 y 5, en un solo cobro contra entrega). Recomendación
  de Ramón: cobrar eso **antes** de abrir la conversación del rediseño. No mezclar un
  rediseño con una entrega que todavía no se paga.
