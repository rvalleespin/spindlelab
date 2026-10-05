# Spec visual — SpindleLab · sitio entero en el lenguaje de driftime

**Vigente desde el 5-oct-2026.** El contrato que construye Diego y audita Javiera. Una
corrección que no termina escrita acá vuelve a aparecer en la pasada siguiente.

- **Referencia dominante:** driftime.com, **medida** (`referencia-driftime/lock-driftime.md`).
- **Rasgo que se preserva:** un sistema de imágenes con una tipografía display escasa.
- **Qué sacrifica:** densidad de imagen (hay ~13 honestas contra ~25 de driftime) y el muro
  de logos (no existe: cero prueba social inventada).
- **Implementación de referencia:** `tableros/driftime-home/` y `tableros/driftime-desarrollo/`.
  Ante la duda, se mira el tablero, no se improvisa.

## 0 · Decisiones de Ramón que este documento ejecuta (5-oct-2026)
1. Se extiende a **todo el sitio**, no solo el hero.
2. **Mayúsculas 800 solo en cinco lugares** (titular del hero y las cuatro palabras de campo).
   El manual de marca quedó actualizado (§05).
3. **Mockups compuestos con lo que hay, sin costo**: la obra real montada en dispositivos
   sobre fotografía propia. Nada de generación pagada.
4. Sigue vigente de antes: **dirección A** (el instrumento primero en la home), **criterio de
   éxito = conversión**, **no se publica** (todo bajo `/v3/` con `noindex`).

## 1 · Tokens (`src/styles/driftime.css`)

| Token | Valor | Rol | Dónde NO |
|---|---|---|---|
| `--noche` | `#000` | lienzo | — |
| `--modulo` | `#161616` | módulo de nav, píldoras, notas, botón secundario | nunca como fondo de sección |
| `--filete` | papel al 12 % | separadores de fila | nunca como borde de tarjeta |
| `--papel` | `#F7F5F0` | texto principal, botón primario, el campo del chequeo | nunca blanco puro salvo en brasa |
| `--gris` | `#9AA4B0` | texto secundario (6,9:1 sobre negro) | nunca para texto de acción |
| `--oro` | `#C9A227` | **solo** el punto del wordmark del módulo | nada más, nunca |
| `--brasa` / texto `#FFFFFF` | `#DA3400` | campo Desarrollo | — |
| `--navy` / `#E4F1EC` | `#0E2A47` | campo Visibilidad | — |
| `--petroleo` / `#FFF4E2` | `#0F766E` | campo Continuidad | — |
| `--ciruela` / `#FFEFDD` | `#341F34` | campo Alcance | — |
| `--r` | `6px` | **el único radio** | 4 px solo dentro de un control (botón dentro del campo, píldora activa) |
| `--m` | 40 px / 20 px celular | margen lateral | — |
| `--g` | 16 px / 10 px celular | gutter entre piezas | — |

Los cuatro pares campo/texto tienen el contraste medido (AA de cuerpo) desde la v3. Brasa
lleva blanco puro: driftime falla ahí (3,70:1) y no se copia.

## 2 · Tipografía
Ver manual §05. Resumen operativo:
- **`.display`** — Manrope 800 MAYÚSCULAS, `clamp(2.4rem,10vw,7.5rem)`, interlínea 0,9. **Cinco
  usos en todo el sitio. Una página interna tiene cero.** Si una interna necesita gritar,
  está mal diseñada.
- **`.h-caso`** (h1 interno) 60 px 500 · **`.h-sec`** (h2) 30 px 500 · **`.h-sub`** (h3) 24 px 500.
- **`.guia`** 24 px 400 · **`.cuerpo`** 18 px 400 gris · **`.btn`** 14 px 500.
- Gabarito: **solo** el wordmark (módulo y pie gigante).

## 3 · Componentes
- **Nav** (módulo fijo arriba a la izquierda): wordmark con punto de oro · `Escríbenos` ·
  menú. El menú abre el overlay con todas las páginas (lógica de `NavV3`).
- **`.btn`** papel/negro, 36 px de alto, 14 px. **`.btn.alt`** módulo/papel. Nunca un botón
  grande, salvo el del chequeo.
- **`.pills`**: píldoras dentro de un módulo; la activa en papel al 14 %. En los campos con
  dos servicios funcionan como pestañas.
- **`.pieza`**: figura con radio 6 y etiquetas **arriba a la izquierda** (abajo las tapa el
  aviso de cookies). La pieza de concepto lleva su rótulo en papel, visible sin scroll.
- **`.fila`**: grilla de piezas en escritorio; **carrusel con la siguiente asomándose** en
  celular (`scroll-snap`).
- **`.campo`**: pantalla completa, `position: sticky`, se apilan. Título display · píldoras ·
  descripción 24 px · línea de precio · botones · fila de imágenes al fondo.
- **`.precio`**: `Desde | $X … | + IVA`, **exactamente** con las cifras de los JSON de datos.
- **Sección pegajosa** (`.sec` + `.eti`): etiqueta h2 pegajosa a la izquierda (5/12), texto a
  la derecha (7/12). En celular se apila y la etiqueta deja de pegarse.
- **`.filas`**: lista editorial separada por filetes. **Nunca tarjetas iguales en grilla**
  (tell B1 del detector).
- **Pie**: llamado + enlaces en dos columnas + **wordmark gigante** (`100cqi / 4.78`) con el
  punto en papel.

## 4 · Plantillas por tipo de página

| Plantilla | Páginas | Estructura |
|---|---|---|
| **Home** | `/` | instrumento → display → fila de 4 obras → presentación → 4 campos pegajosos → quién está detrás → El Taller → pie |
| **Servicio** (el caso de driftime) | las 6 de `/servicios/*` | miga · h1 60 px · línea · 2 botones → imagen a sangre → nota + entrada → secciones pegajosas (incluye, planes, fases, preguntas) con una galería entre medio → siguiente servicio → pie |
| **Índice** | `/servicios/`, `/trabajo/`, `/blog/` | h1 60 px + entrada → filas editoriales (servicios: con su campo de color y precio; trabajo: piezas grandes con rótulo; blog: fecha · título · flecha) |
| **Editorial** | `/metodo/`, `/nosotros/` | h1 60 px → imagen → secciones pegajosas |
| **Artículo** | los 7 posts | miga · h1 60 px · fecha → imagen editorial → etiqueta pegajosa con el índice del artículo + cuerpo verbatim a la derecha → siguiente artículo |
| **Herramienta** | `/diagnostico/`, `/contacto/` | h1 60 px + una línea → el instrumento o el formulario como protagonista → secciones pegajosas de apoyo |

## 5 · Imagen
**Se usa** (pool honesto): obra (Combeau ×2 con permiso, Verifica y Cumple propio, Raigal
concepto rotulado), mockups compuestos de esa obra, hilo de oro, dominó ×2, hilos, escritorio,
ventana, retrato de Ramón.
**No se usa nunca:** `hero-*.jpg`, `estrategia-mesa.jpg`, `equipo-creativo.jpg`,
`servicios-oficina`, `evidencia-oficina`, `metodo`, `problema`, `foto-banner-original` — son de
banco o muestran equipos que no existen. `servicios-capas` y `evidencia-medicion` llevan un
punto dorado dibujado: serían un segundo oro en la vista, así que tampoco.
**Video:** solo `hero-hilo-de-oro.mp4`, y solo si no hay `prefers-reduced-motion`.

## 6 · Lo que esta spec prohíbe explícitamente
- Mayúsculas 800 fuera de los cinco lugares. Rótulos en mayúsculas espaciadas tampoco.
- Más de un oro por vista. El oro es el punto del módulo; nada más.
- Tarjetas con borde parejo en grilla. Se usan filas con filete.
- Cualquier imagen de la lista negra de §5.
- Cifras, logos o testimonios sin respaldo. Precios distintos a los de los JSON de datos.
- Tocar `Layout.astro`: ahí viven gtag, el consentimiento, el Pixel y el aviso de cookies.
- Cambiar los nombres del formulario (`.contact-form`, `#f-utm-*`, `.form-status`,
  `.form-success`) o los ids del chequeo (`chq-form`, `chq-dominio`, `chq-btn`, `chq-out`,
  `chq-error`).
- Cambiar una URL publicada.

## 7 · Historial de correcciones
| Fecha | Qué | Regla o preferencia | Quién |
|---|---|---|---|
| 5-oct | Mayúsculas solo en el display | **regla** (manual §05) | Ramón |
| 5-oct | Precios siempre «desde … + IVA» | **regla** | encuadre (se publicaban sin IVA en el tablero) |
| 5-oct | Etiquetas de pieza arriba, no abajo | **regla** | QA del tablero (el aviso de cookies las tapaba) |
| 5-oct | Wordmark del pie con `cqi`, no `vw` | **regla** | QA del tablero (se cortaba) |
| 5-oct | Sin Gabarito/Inter: la escasez se logra en Manrope | **regla** | corrección propia (revertía la aprobación del 29-sep) |
