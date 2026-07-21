# Encargo: foto de portada de la Página de Facebook

**Para:** la sesión de contenido en redes (`/persona-social-media`) · **De:** sesión de Meta Ads · **Fecha:** 20 jul 2026

## Qué se necesita

La **Página de Facebook de SpindleLab** (`facebook.com/profile.php?id=61592147941168`) ya está creada con avatar (monograma S.), pero **le falta la foto de portada**. Diséñala coherente con el sistema de marca y con el banner de LinkedIn (misma familia visual entre redes).

## Especificaciones técnicas (portada de Página de Facebook)

- **Tamaño de archivo a subir:** **1640 × 624 px** (ratio 2.63:1). Meta lo muestra a ~820×312 en escritorio y recorta los lados en móvil (~640 de ancho visible).
- **Zona segura:** todo lo importante (wordmark + promesa) **centrado**. Evitar:
  - el **extremo inferior izquierdo** (ahí se superpone la foto de perfil en escritorio),
  - los **lados** (se recortan en móvil).
- Formato PNG. Fondo que no pelee con el avatar (monograma sobre papel).

## Sistema de marca (del manual v1.3)

- **Paleta:** Tinta `#131A22` · Papel `#F7F5F0` · Blanco `#FFFFFF` · Dorado `#C9A227` (SOLO acento: el punto, un separador, un dato) · Gris pluma `#5D6673`. Proporción: papel/blanco dominan (~70%), tinta trabaja (~25%), **el dorado aparece una sola vez**.
- **Tipografía:** **Gabarito** semibold (wordmark, titular) · **Manrope** (texto de apoyo si hace falta).
- **Wordmark:** `SpindleLab` con **punto final SIEMPRE dorado** `#C9A227`. Sobre fondo tinta, el texto pasa a papel `#F7F5F0`; el punto no cambia nunca. Prohibido: punto de otro color/apagado, otra tipografía, mayúsculas, el dorado como color del texto, contenedores tipo ícono de app.

## Dos conceptos posibles (elige uno, o propón)

**A — Foto + velo de tinta (como el banner de LinkedIn):**
- Base: `marketing/brand/redes/fuentes/foto-banner-original.jpg` (Unsplash, libre uso comercial).
- Velo de tinta `#131A22` a **≥50%** para que la marca mande sobre la foto.
- Encima, centrado: wordmark `SpindleLab.` + una línea de promesa.

**B — Tipográfico (como `redes/banner-linkedin-alt-tipografico.png` y `post-tipografico.html`):**
- Fondo papel `#F7F5F0` o tinta `#131A22`.
- Wordmark grande + promesa, mucho aire, el punto dorado como único acento.
- Este camino se puede construir como plantilla HTML renderizada a PNG (mismo patrón que los otros assets de `redes/`).

## Copy sugerido (coherente con Instagram/LinkedIn)

- Wordmark: **SpindleLab.**
- Promesa (una línea, elegir): *"SEO técnico y visibilidad en IA"* · o *"¿Apareces cuando le preguntan a ChatGPT por tu categoría?"*
- Opcional, gris pluma, chico: *"Mini-diagnóstico gratis · spindlelab.cl"*

## Entrega

Guardar el PNG final en `marketing/brand/redes/` (ej. `portada-facebook.png`) + su fuente HTML si aplica. Avisar a Ramón cuando esté; **la subida a la Página de Facebook la puede hacer la sesión de Meta Ads** (tengo navegador) o Ramón directo.
