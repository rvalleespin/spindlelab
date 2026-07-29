# Dirección de rediseño — spindlelab.cl (rama `redesign`)

**Estado:** dirección cerrada, pendiente de tu aprobación.
**Fecha:** 29 jul 2026 · **Rama:** `redesign` · **Línea base:** `0b321a7`
**Nada aplicado al sitio desde este documento.**

Este documento es el **contrato de las rondas que vienen**. Lo que aquí queda cerrado
no se vuelve a discutir en cada ronda; las rondas afinan secciones concretas contra
estas reglas.

---

## 0. Procedencia — qué verifiqué y qué no

Revisé el hilo `9cc81738` completo en disco (8.334 líneas, 29 capturas tuyas indexadas
por mensaje). No reusé su contexto: leí el registro.

**Verificado contra el código de esta rama** (no es memoria, es lectura de archivo):

- La paleta completa, token por token, contra `spindlelab-site/assets/css/style.css:28-50`.
- La escala tipográfica y el tratamiento de foto, contra el mismo archivo.
- El estado de git, el plazo del mini-diagnóstico y las páginas afectadas.

**No verificado en vivo:** no abrí K72, Exo Ape ni Cosmos en el navegador en esta
sesión. Sus caracterizaciones vienen de la investigación Refero registrada en el hilo.
El propio hilo advierte que las capturas de Refero pueden no coincidir con el sitio
vivo actual. Si quieres que los abra y lo confirme antes de construir, lo hago en la
Ronda 1.

### Correcciones a la versión del 28 jul de este mismo documento

| Decía | Realidad |
|---|---|
| «Las tres fuentes son las del manual de marca» | **Falso.** El manual §05 pide **Inter** para cuerpo, no Manrope. IBM Plex Mono no aparece en el manual. |
| «Falta definir el plazo, hoy dice 48 horas» | **Resuelto.** Las 15 páginas ya dicen «menos de 24» (commit `533ae50`). |
| «Las dos piezas quedaron sin ejecutar» | **Resuelto.** El mini-chat se construyó en `533ae50`. |
| «22 archivos sin commitear = estado actual» | **Falso.** `git diff -- spindlelab-site/` está limpio. Los 22 modificados son de `marketing/`, ajenos al rediseño. |

**Lo que ya aprobaste y por lo tanto no se re-litiga:**

| Aprobado | Tu frase |
|---|---|
| Hero cinematográfico a sangre | *«si. tiene mejor carácter. tiene más fuerza. me gusta el uso de las imágenes»* |
| Dirección 2 + la tabla de la Dirección 3 | *«toma la recomendación (dirección 2 con componentes del 3)»* |
| El cambio de tipografía | *«mejora con el cambio de tipografía»* |
| El resultado corporativo | *«me gusta mucho el cambio. se ve más corporativo»* · *«se ve mucho más profesional sin gritar IA en el diseño»* |
| El logo | *«logo me gusta y se queda»* — intocable |
| El estado actual como línea base | *«al fin lo vi. se ve bastante bien»* |

**Lo que rechazaste (cerrado, queda fuera):** paleta menta/pastel · serif editorial
solemne · ilustración SVG dibujada a mano (dos rondas) · hero tipográfico con la
pregunta como titular · estética terminal oscura · fotos de stock luminosas de «equipo
en pizarra» · repetir la imagen del hero en otra sección.

---

## 1. La dirección en una frase

**Cine corporativo sobre papel.** Un sitio de papel cálido y tipografía grande y
segura, interrumpido por dos momentos de fotografía cinematográfica a sangre, con los
datos duros presentados como un registro oscuro tipo *ledger*. Seriedad de consultora
financiera, no brillo de agencia de IA.

---

## 2. Referencias ancla

Tres, cada una con un rol distinto. No se promedian: **K72 manda**, las otras dos
aportan detalles acotados.

### 2.1 Agence K72 — *dominante: el hero y los momentos de foto*
Fotografía a sangre tratada como textura de fondo, velo oscuro encima, titular grande
abajo. Es lo que ya construimos y aprobaste.
**Se toma:** foto full-bleed + velo + titular corto abajo a la izquierda · escala
tipográfica grande y sin miedo.
**No se toma:** su desmadre cromático ni su humor. Aquí el color se queda en navy.

### 2.2 Exo Ape — *ritmo y respiración*
Pacing calmo, mucho aire, tipografía contenida, la foto hace el trabajo emocional.
**Se toma:** el aire entre secciones · un solo gesto fuerte por pantalla · el segundo
momento cine antes del CTA final.
**No se toma:** sus animaciones envolventes de scroll.

### 2.3 Cosmos Network — *solo la tabla comparativa*
Tratamiento oscuro de «registro» para datos densos, creíble en fintech.
**Se toma:** la tarjeta navy de comparación de servicios, con teal-tint solo en
encabezados.
**No se toma:** nada más. Es un componente, no un lenguaje.

> Referencias ya gastadas en rondas anteriores, no reutilizar: Carrot, Vanta, Pitch,
> WGSN, Titan.

---

## 3. Tipografía — cerrada

**Dos familias. Se elimina IBM Plex Mono** (decisión del 29 jul).

| Rol | Fuente | Valores |
|---|---|---|
| Titulares, cifras destacadas, wordmark | **Gabarito** 600 | `--headline` |
| Cuerpo, UI, tablas, eyebrows y etiquetas | **Manrope** 400/500/700/800 | `--sans`, base 15px / 1.6 |

Los eyebrows pasan a **Manrope 600 en mayúsculas con tracking** (≥ `.05em`), que es
exactamente lo que pide el manual de marca §05 para etiquetas. Mantienen el punto de
6px antes.

**Escala (cerrada, ya en `style.css`):**

- Hero H1 — `clamp(38px, 5.4vw, 66px)`, tracking `-.015em`, `max-width: 21ch`
- Línea cine — `clamp(44px, 5.4vw, 80px)`, tracking `-.02em`
- H2 de sección — `clamp(28px, 3.2vw, 44px)`, tracking `-.01em`
- Lead — 17px / 1.6, `max-width: 58ch`, en gris pluma
- Cuerpo — 15px / 1.6

**Reglas:** ningún titular en Manrope · ningún párrafo en Gabarito · titulares en
*sentence case*, nunca Title Case ni ALL CAPS · mayúsculas solo en etiquetas pequeñas
con tracking · `text-wrap: balance` en titulares.

**La coherencia logo↔tipografía** que echabas de menos (*«sitio y logo no me transmiten
coherencia»*) la resuelve Gabarito, que es la fuente del wordmark. No se cambia.

**Única excepción monoespaciada:** los bloques `code` y `pre` de los artículos del blog
se quedan monoespaciados, apuntando al stack del sistema (`ui-monospace, Menlo,
Consolas`), sin cargar ningún webfont. Renderizar código en una fuente proporcional
sería una regresión real. Plex Mono desaparece como tipografía de marca y deja de
descargarse en las 15 páginas; esto no lo revive.

**Deuda documental — saldada el 29 jul.** El manual §05 decía «Inter» para todo. La
causa real no era el sitio: la marca ya tenía *de facto* **dos sans de cuerpo partidas
por medio**, y nunca se escribió.

| Medio | Cuerpo | Por qué |
|---|---|---|
| `spindlelab-site/` | **Manrope** | Se sirve desde Google Fonts |
| Piezas renderizadas (redes, mini-diagnóstico, firmas) | **Inter** | 22 `inter.woff2` embebidos; el render HTML→PNG es offline |

Gabarito es la única fuente transversal, y es lo que sostiene la coherencia con el logo.
Unificar todo en Manrope se evaluó y se descartó: `Manrope.woff2` no existe en el repo y
habría que re-renderizar 23 carpetas, varias ya publicadas. Queda escrito en el manual
§05 (v1.4), en `CLAUDE.md` y en las tres skills de producción.

---

## 4. Paleta — cerrada

Verificada token por token contra `style.css:28-50`.

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#F7F5F0` | Fondo dominante del sitio |
| `--surface-2` | `#ECE8E1` | Paneles hundidos |
| `--ink` | `#131A22` | Texto principal |
| `--ink-70` | `#5D6673` | Texto secundario (5,33:1 sobre papel) |
| `--navy` | `#0E2A47` | Bandas oscuras, velo de foto, tabla ledger |
| `--teal` | `#0F766E` | Acción: botones, foco, punto del eyebrow |
| `--teal-2` | `#0C5E58` | Hover de acción |
| `--teal-tint` | `#8FD4C9` | Acento **solo sobre fondo oscuro** |
| `--gold` | `#C9A227` | Acento escaso: **un uso por página** |

**Reglas duras:** el dorado funciona por escasez — nunca en viñetas, nunca de fondo,
nunca en texto corrido · el teal es color de *acción*, no de decoración · el teal-tint
jamás sobre papel · sin gradientes de marca · sin blanco puro como fondo de página ·
proporción objetivo ≈ 70% papel / 20% tinta / 8% navy / 2% acento.

---

## 5. Tratamiento de imágenes — cerrado

**Qué fotografía:** arquitectura corporativa, luz dramática y direccional, manos
trabajando de verdad, oficina real. **Nunca** equipo sonriendo frente a una pizarra, ni
luz plana luminosa, ni nada que se lea como stock.

**Tratamiento unificado** (todas las fotos de contenido, ya en `style.css`):

```css
filter: saturate(.86) contrast(1.04);
/* + velo */
background: linear-gradient(155deg, rgba(14,42,71,.30), rgba(14,42,71,.06) 60%);
mix-blend-mode: multiply;
```

El hero lleva su propio velo, más fuerte, y `object-fit: cover` a `min(82vh, 760px)`.

**Reglas de encuadre** (esto es lo que falló cuando dijiste *«la foto no se ve. en
nada. queda muy mal encuadrada»*): el sujeto nunca en el tercio inferior izquierdo, que
es donde vive el texto · verificar el recorte a **1440, 768 y 390 px** antes de dar
algo por listo · si la foto necesita explicación, está mal elegida.

**Una imagen por sección como máximo.** Ninguna imagen se repite entre secciones —
*«no se entiende la redundancia»*. Sin ilustración vectorial dibujada a mano.

---

## 6. Tono del hero — cerrado

**El hero afirma un desplazamiento competitivo. No promete un servicio.**

Estructura fija en dos frases: (1) lo que dejó de ser cierto, (2) dónde se juega ahora.
La segunda frase lleva el único acento de color.

> **Tu empresa ya no compite solo en Google.**
> *Compite en las respuestas de la IA.*

**Reglas:** dos frases, nunca tres · `max-width: 21ch` · lead de máximo dos líneas que
nombre plataformas reales (ChatGPT, Gemini, Perplexity) · un CTA primario (blanco sobre
navy) + uno secundario en contorno · barra de plataformas inmediatamente debajo · sin
signos de exclamación · sin «revolucionario», «potencia», «transforma», «impulsa» · sin
pregunta como titular (rechazado) · sin em-dash como muletilla de impacto · el diseño no
debe gritar IA aunque el tema sea IA.

---

## 7. Estado real de la rama

- **El rediseño está commiteado.** `git diff -- spindlelab-site/` limpio en `0b321a7`.
  Eso es la línea base y lo que cuenta como «estado actual» en las capturas.
- **El plazo del mini-diagnóstico ya es «menos de 24 horas»** en las 15 páginas. Cerrado.
- **El mini-chat interactivo está construido.** Cerrado.
- **Los 22 archivos modificados sin commitear son de `marketing/`**, no del sitio. No
  bloquean nada del rediseño.

### Advertencia operativa — carpetas duplicadas por iCloud

`spindlelab-site/` contiene seis duplicados, **sin trackear en git y con contenido que
difiere del original**:

```
assets 2/    blog 2/    contacto 2/    metodo 2/    servicios 2/
assets/img/illustrations/hero-inicio 2.svg
```

Un servidor local los sirve igual que los buenos. Pueden envenenar precisamente las
capturas antes/después. **Hay que sacarlos de `spindlelab-site/` antes de la Ronda 1.**

Nota aparte: `hero-inicio.svg` — el original y su duplicado — **no está referenciado en
ninguna página**. Es el resto de la ilustración dibujada a mano que descartaste
(*«no me gusta para nada»*). Peso muerto; propongo borrar ambos en la Ronda 1.

---

## 8. Cómo trabajamos las rondas

Cada ronda cierra con **PNG lado a lado — estado actual y propuesta — a 1440, 768 y
390 px**, y la **ruta exacta** de cada archivo tocado. Los PNG van a
`marketing/brand/rondas/ronda-NN/`, nombrados `<pagina>-<ancho>-antes.png` /
`-despues.png`.

**No se aplica nada al sitio hasta que apruebes la ronda.**

**Trampa de caché:** `_headers` cachea los assets fuerte y largo. Toda ronda que toque
`style.css` o una imagen debe subir el `?v=N` en las 15 páginas (hoy va en `?v=25`), o
seguirás viendo el asset viejo — tú y las capturas.

### Ronda 1 (definida, no aplicada)

Eliminar IBM Plex Mono. 25 usos de `var(--mono)` en `style.css`, en tres grupos:

| Grupo | Destino |
|---|---|
| 21 usos: eyebrows, etiquetas, captions | **Manrope 600** caps + tracking |
| 2 usos: `.step .num`, `.step-row .num` | **Gabarito** (el manual le da las cifras destacadas) |
| 2 usos: `.prose code`, `.prose pre` | **Monoespaciada del sistema**, sin webfont |

Archivos: `assets/css/style.css` + el `<link>` de Google Fonts en las 15 páginas HTML.
