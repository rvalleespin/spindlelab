# Encargo → sesión de exploración: el rebranding «Desarrollo Web + AEO incorporado»

**Creado por la troncal · 27-sep-2026 · Pedido explícito de Ramón.**
**Nota de encuadre (Ramón, 27-sep):** lo de Gemini es *una observación externa*, no un plan a
ejecutar al pie de la letra. Se toma la idea de fondo (entrar por Desarrollo Web) y se descarta
lo demás, empezando por su propuesta de precios.
**Rama de trabajo: `claude/rebranding-webdev-exploracion`.**

## Qué es esto, en una frase
Construir una **versión alternativa del sitio y de la oferta** bajo el posicionamiento nuevo
(«Sitios web preparados para la IA»), **en una rama aislada**, para poder mirarla y compararla
con lo que hay hoy **antes de decidir si se adopta**. Es una maqueta para decidir, no un cambio.

## ⛔ Límites duros (no negociables)
1. **No tocar `main` jamás.** El sitio en producción despliega desde `main`: cualquier push ahí
   sale al aire. Todo el trabajo vive en `claude/rebranding-webdev-exploracion`.
2. **No mergear.** Ni siquiera proponerlo. La decisión de adoptar el pivote **no está tomada**
   (ver `marketing/decision-pendiente-pivote-webdev-2026-09-27.md`, léelo completo antes de
   empezar).
3. **No cambiar precios en producción** ni en ningún documento fuera de la rama.
4. **No enviar correos, no publicar, no contactar prospectos.** Esto es trabajo de maqueta.

## Contexto que hay que leer primero (en este orden)
1. `marketing/decision-pendiente-pivote-webdev-2026-09-27.md` — la propuesta, lo que acierta y
   **los tres problemas verificados**. Es el documento más importante.
2. `marketing/informe-revision-externa-2026-09-27.md` — el estado completo del negocio.
3. `marketing/brand/manual-de-marca.md` — la voz y el sistema visual **no cambian** en este
   ejercicio. Cambia el mensaje comercial, no la identidad.

## Las condiciones mínimas (decisión de Ramón, 27-sep · no se re-discuten)

### 1. ⛔ LOS PRECIOS NO SE TOCAN
**Decisión explícita de Ramón: la lista de precios vigente se mantiene tal cual.** Gemini propuso
reestructurarla; **eso queda descartado**. Este ejercicio es de **mensaje y estructura, no de
pricing.** La lista vigente, verificada contra el sitio en producción el 27-sep-2026 (todos
**+ IVA**):

| Servicio | Precio vigente |
|---|---|
| Auditoría SEO Técnica | $490.000 · $690.000 (con Visibilidad IA) |
| Visibilidad en IA (AEO/GEO) | $400.000 |
| Acompañamiento Mensual | $590.000/mes · $790.000/mes (Pro) |
| Gestión de Redes Sociales | $390.000/mes · $590.000/mes (con pauta) |
| Paid Media (Google) | $350.000/mes · $550.000/mes (Pro) |
| Desarrollo Web | $390.000 · $690.000 · $1.190.000 |

Si al reordenar la oferta un precio parece quedar fuera de lugar, **se anota como observación
para Ramón — no se cambia.**

### 2. La «vigilancia de menciones en IA» no entra en la promesa
`marketing/capacidad-servicios.md` la marca ❌: depende de un paso manual que **no escala más
allá de 1-2 clientes**. Da igual cómo se llame el paquete: si la maqueta promete monitoreo
continuo de menciones en IA para varios clientes, promete lo que hoy no se cumple, y eso rompe
«No te prometo. Te muestro».

### 3. Tiene que quedar una entrada para el cliente que YA tiene sitio
«Sitios web preparados para la IA» solo le habla a quien va a construir o rehacer. El prospecto
más caliente de los últimos dos meses (estudio legal, 257 artículos, WordPress que funciona) nunca
iba a rehacer su sitio, pero sí podía pagar por abrir la puerta que lo deja fuera de ChatGPT. **Si
el mensaje nuevo lo deja fuera, la maqueta pierde el mercado que ya responde.**

## ⚠️ La estructura real del sitio (Gemini apuntó a rutas que no existen)
El texto original manda editar `/src/pages/servicios/...`. **Ese directorio no existe.** La
arquitectura es híbrida:

| Qué | Dónde vive de verdad |
|---|---|
| **Home** | `spindlelab-astro/src/pages/index.astro` + componentes en `src/components/` (`Hero.astro`, `Problema.astro`, `Servicios.astro`, `Metodo.astro`, `Evidencia.astro`, `Faq.astro`, `Contacto.astro`) |
| **Nosotros** | `src/pages/nosotros.astro` |
| **Servicios (6 páginas)** | `spindlelab-astro/public/servicios/` — **HTML estático, no Astro** |
| **Diagnóstico, método, blog, contacto** | `public/diagnostico/`, `public/metodo/`, `public/blog/`, `public/contacto/` — HTML estático |

Ojo con la trampa de caché documentada: los assets se cachean fuerte, así que si tocas CSS o
imágenes hay que subir el `?v=N` en todas las referencias.

## Qué entregar
1. **La maqueta de la home nueva**, renderizada y **mirada** (captura con Chromium headless; la
   regla de la casa es que nada se da por bueno sin verlo).
2. **Una comparación lado a lado**: mensaje actual vs. propuesto, en los puntos donde cambia
   (hero, problema, servicios, CTA).
3. **La oferta reordenada** bajo la jerarquía nueva (Desarrollo Web al frente, AEO incorporado
   como diferenciador) **con los precios vigentes intactos**. Lo que cambia es el orden, el
   encuadre y el argumento, no el número.
4. **Un documento corto de recomendación**: qué mejora de verdad, qué se pierde, y tu veredicto
   honesto de si conviene adoptarlo. **Si concluyes que no conviene, dilo.** Nadie pidió que
   salga aprobado: se pidió material para decidir.

## Cómo verificar antes de entregar
- Render con Chromium headless: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
  --headless=new --disable-gpu --screenshot=... <url|archivo>`.
- Para el sitio Astro completo, levantarlo local y mirarlo, no confiar en el markup.
- Cloudflare Pages suele generar un **preview deploy por rama**: si aparece, esa URL sirve para
  que Ramón lo vea desde el teléfono sin tocar producción. Confírmalo antes de prometérselo.

## Lo que Ramón necesita al final
Poder mirar las dos versiones y decidir. **Una vista de decisión**, no un informe largo:
qué gana, qué pierde, cuánto trabajo cuesta adoptarlo, y y qué habría que reordenar para
abordarlo. **No plantear la falta de horas como limitante** (corrección de Ramón, 28-sep: dedicación
completa al proyecto).

---
**Estado:** ⬜ sin empezar · rama creada por la troncal el 27-sep
