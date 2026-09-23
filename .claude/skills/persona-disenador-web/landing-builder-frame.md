# Landing Builder — Framework F.R.A.M.E.

> Referencia para cuando una landing (propia o de cliente) necesita nivel "hero premium
> con imagen/video", no solo HTML correcto. Origen: framework de Ben Corde / Imperio
> Digital, adaptado como material de consulta de esta skill — no se ejecuta literal, se
> usa como checklist de criterio visual y, si aplica, como pipeline de producción de
> imagen/video para el hero.

## Cuándo usar esto
No para cada página. Para un hero de landing donde vale la pena el esfuerzo extra
(lanzamiento de un servicio, cliente que paga la línea de diseño premium): imagen o
video de fondo con composición cuidada, no un stock genérico ni una caja plana con
degradé.

## Jerarquía de decisiones
Si hay una referencia visual concreta (un sitio real, un template) y un brief de
producto/cliente, y compiten:
- **La referencia manda en**: mood, estilo, cámara, iluminación, ritmo, tipo de
  movimiento.
- **El brief manda en**: qué se muestra, paleta de marca, copy, posicionamiento, voz.

Ambos se combinan. Se extrae el **espíritu visual** de la referencia, nunca se copia el
contenido literal.

## Directrices generales
1. **Buen espaciado** — composiciones respiradas, nada saturado.
2. **Strong opening** — el hero engancha desde el primer segundo, con peso visual y
   jerarquía clara.
3. **Transiciones suaves** — pacing meditativo, nunca brusco.
4. **Coherencia de marca** en todos los assets (imagen, video, copy, layout).
5. **Mobile-first** — funciona igual de bien en celular.

## Buenas prácticas (si hay movimiento)
- **Movimiento**: paralaje sutil, scroll-driven animation donde aplique, ping-pong loop
  para hero videos de 5-10s, elementos 3D flotando con rotación lenta, partículas
  drifting sutiles, luz que "respira".
- **Cámara**: fija en hero videos de fondo (no distrae del texto encima); dolly-in muy
  sutil solo si el mood lo pide; orbital drift mínimo (máx 5°).
- **Iluminación**: soft studio light por defecto; luz direccional natural para
  wellness/orgánico; rim light sutil sobre el producto.
- **Composición**: 16:9 para hero video; el producto es protagonista pero no
  centrado rígido — la asimetría se siente más premium.
- **Mood**: calm, premium, editorial. Nada de cliché stock ni "AI slop" ni exceso de
  efectos. Referencias útiles: Apple product reveal, Linear 2024, Arc Browser, On
  Running, Rauno Freiberg aesthetic.

## Pipeline de producción (cuando el hero lleva imagen/video generado)
1. **Image 1** (frame inicial) — 16:9, deja espacio para el texto encima, strong
   opening. Generado con ChatGPT Images 2 o el generador disponible.
2. **Image 2** (frame final) — misma escena un instante después, adjuntando Image 1
   como referencia explícita para que no se genere una escena distinta. Evolución
   sutil (rotación, luz, partículas), no ruptura.
3. **Transición** Image 1 → Image 2 — con Higgsfield/Seedance (ya se usa para b-roll en
   este repo, ver CLAUDE.md), 7s, cámara fija, motion interno sutil, sin audio. Se monta
   en ping-pong loop.
4. **Ensamblaje one-shot** — los 3 assets (video + Image 1 + Image 2) más el design
   system del brief (paleta hex, tipografía, tono) y la estructura de secciones, en un
   solo prompt/pase. Si el resultado no convence, se refina con tweaks puntuales — no
   con un prompt nuevo desde cero.

## Reglas críticas
- Nunca reproducir literal el prompt de una referencia — extraer principios, no copiar
  contenido.
- Image 2 siempre explicita que Image 1 va adjunta como referencia de consistencia.
- Paleta de marca siempre en hex exacto, nunca en adjetivos ("cálido", "oscuro").
- Prompts de generación en inglés (mejor resultado); el copy final de la landing en el
  idioma del sitio.
