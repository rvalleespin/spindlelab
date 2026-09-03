> **Actualización 2026-09-03 (Diego) — CORRECCIÓN: la rama troncal para Parte 1 es
> `claude/revision-parte-1-correcciones`, no la de abajo.** Este encargo se ejecutó dos
> veces en paralelo, por dos sesiones distintas sin saberlo (yo, y una sesión aparte con
> el git identity de Ramón — probablemente su sesión local). Confirmado con
> `git ls-remote --heads origin` sobre `rvalleespin/bernardo-combeau`: ambas ramas parten
> del mismo commit y ninguna llegó a `main`. Comparadas línea a línea, la otra rama es más
> completa — en particular encontró el root-cause real del punto 5 (`inputtedWidth`, un
> artefacto de `@astrojs/vercel` cuando `width` no es un ancho válido del adaptador; la
> causa era `width={800}` en 8 componentes, varios fuera de lo que yo revisé) y agregó
> `llms.txt` + una medición de LCP más rigurosa (mobile throttled vía CDP). Ramón confirmó:
> **`claude/revision-parte-1-correcciones` queda como troncal**, la rama de abajo
> (`claude/parte-1-correcciones-sitio`, mía) no se usa. El resto de esta nota describe MI
> ejecución, que quedó superseded — se deja como registro, no como la versión vigente.
>
> **Actualización 2026-09-03 (Diego, persona-disenador-web) — Parte 1 hecha (superseded,
> ver corrección arriba).** Ejecutada
> en el repo separado `rvalleespin/bernardo-combeau`, rama `claude/parte-1-correcciones-sitio`
> (push hecho, sin PR — no se pidió explícitamente en esta sesión). Detalle completo en
> `marketing/oficina/memoria/diego-web.md`. Resumen: varios de los 7 puntos no calzaban
> 1:1 con el código fuente (como el propio encargo advertía) — se verificó cada uno
> contra el repo real antes de tocar nada, y el diff terminó siendo más específico que
> la lista original:
> - Alts: eran 9 con `.` literal (no 5) más ~15 numéricos/dash — todos reescritos viendo
>   la foto real.
> - Los "2 placeholders" tenían contenido real detrás (proyecto "La caída" y retratos
>   "Actores") — se renombraron los slugs con redirect 301, no se despublicaron.
> - El descalce de "La caída" era la misma entrada de arriba — corregido junto con eso.
> - `inputtedWidth="800"` no existe en el repo actual — nada que corregir.
> - Hero: no había `loading="lazy"` explícito, es el default de Astro sin `loading` —
>   corregido a `eager`+`fetchpriority="high"`, verificado con Chromium headless que la
>   prioridad de red pasa de "Low" a "High" en la primera request.
> - JSON-LD: Person + LocalBusiness (grafo compartido, en todas las páginas) +
>   ImageObject por foto real en cada galería — datos 100% reales del propio sitio.
> - Años: normalizados a raya en las 3 entradas con guion.
> - Bonus fuera de la lista: `sobremi.json` tenía un `"."` suelto renderizándose en la
>   página Sobre-mí — corregido con el mismo patrón guard que ya usa el código.
>
> Verificado con render (Chromium headless), no solo leyendo código. Build de producción
> sin errores. Parte 2-3 (rediseño) y Parte 5 (regla IA) no tocadas — quedan para cuando
> Ramón decida abrir esa conversación, después del cobro pendiente (Parte 6).

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
