# Encargo → sesión de exploración: el rebranding «Desarrollo Web + AEO incorporado»

**Creado por la troncal · 27-sep-2026 · Pedido explícito de Ramón.**
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

## Las tres condiciones mínimas (vienen de datos del repo, no son opinión)
Si la maqueta las incumple, no sirve para decidir:

1. **El retainer NO puede costar $590.000/mes.** El precedente propio de mantención es
   **$50.000/mes** (`ventas/proyectos-en-curso.md`). Propón un precio defendible y **justifícalo**;
   si no encuentras uno que cierre, dilo en vez de inventarlo.
2. **La «vigilancia de menciones en IA» no entra en la promesa.** `marketing/capacidad-servicios.md`
   la marca ❌: depende de un paso manual que **no escala más allá de 1-2 clientes**. Vender eso
   sería prometer lo que no se cumple, y rompe el lema de la casa.
3. **Tiene que quedar una entrada para el cliente que YA tiene sitio y no lo va a rehacer.** Es la
   mayoría del nicho legal donde hoy hay tracción. Si el mensaje nuevo lo deja fuera, la maqueta
   pierde el mercado que ya responde.

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
3. **La oferta reescrita** con precios defendibles y el porqué de cada uno.
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
qué gana, qué pierde, cuánto trabajo cuesta adoptarlo, y qué habría que dejar de hacer para
pagarlo con sus 6-10 horas semanales.

---
**Estado:** ⬜ sin empezar · rama creada por la troncal el 27-sep
