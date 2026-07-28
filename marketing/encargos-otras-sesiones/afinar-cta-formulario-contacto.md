# Encargo → sesión de `spindlelab-site/`: afinar el CTA y bajar la fricción al formulario en `/contacto/`

**✅ Resuelto — 27 jul 2026.** Aplicado en `main` (commit `cc13a87`), pendiente solo de que Ramón lo publique con GitHub Desktop (push manual, esta sesión no tiene credenciales para `git push`). Se implementaron los tres cambios pedidos:
1. `#contacto-form{scroll-margin-top:112px}` — el salto del botón "Completar formulario ↓" ya no queda tapado por el header sticky.
2. El formulario se movió a **inmediatamente después del hero** (antes: hero → tres pasos → entregable → FAQ → formulario). Orden nuevo: hero → **formulario** → tres pasos → entregable → FAQ → footer.
3. El select "Qué te interesa" dejó de ser obligatorio — solo Nombre y Email son requeridos ahora.

Verificado con Chromium headless en viewport móvil (375px): el salto de ancla aterriza con el título "Cuéntanos de tu proyecto" visible bajo el header, sin scroll horizontal, y un envío de prueba real confirmó que `generate_lead` sigue disparando correctamente después del reordenamiento (no se tocó el JS de UTM ni el de tracking, tal como pedía el encargo).

**Nota aparte:** la rama `redesign` (rediseño visual completo, todavía no fusionada a `main`) tiene su propia copia de `contacto/index.html` con la estructura antigua — no incluye todavía este fix. Cuando `redesign` se fusione a `main`, este reordenamiento habrá que reaplicarlo ahí (o fusionar en el orden correcto para no perderlo).

**Origen:** sesión de paid media (Google Ads). Auditoría del embudo hecha el 27 jul porque la campaña tiene 28 clics y 0 conversiones. El tracking funciona (verificado: `generate_lead` dispara); parte del problema es **fricción en el embudo móvil** de `/contacto/`, que es la landing del anuncio. Ramón confirmó que en su teléfono el formulario **sí** envía — o sea NO hay bug bloqueante; esto fue **afinar**, no reparar.

**Archivo:** `spindlelab-site/contacto/index.html` (+ `assets/css/style.css`).
**Marca:** sin cambios de color/tipografía. Se mantiene el único acento dorado (el botón). No se tocó el JS de UTM ni el de `generate_lead`.

---

## Diagnóstico (por qué)
1. **El ancla del CTA quedaba tapada por el header.** El botón del hero es `<a class="btn gold" href="#contacto-form">Completar formulario ↓</a>`. El target `#contacto-form` es la sección del formulario. Pero `.site-header` es `position:sticky; top:0; height:96px` — al saltar, el título "Cuéntanos de tu proyecto" quedaba debajo del header. No había `scroll-margin-top` en ningún lado del CSS.
2. **El formulario era la última sección** antes del footer: hero → "Tres pasos" → "El entregable" → FAQ → **formulario**. El visitante del anuncio (alta intención) tenía que pasar 4 secciones para convertir.

## Reporte
La sesión de paid media seguirá mirando si sube la tasa clic→formulario una vez publicado en producción.
