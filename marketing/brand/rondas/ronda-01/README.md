# Ronda 01 — retirar IBM Plex Mono

**Aprobada por Ramón el 29 jul 2026.** Contrato de referencia:
`marketing/brand/direccion-rediseno-sitio.md` §3 y §8.

## Qué se hizo

Los 25 usos de `var(--mono)` en `assets/css/style.css` se repartieron en tres grupos:

| Grupo | Usos | Destino |
|---|---|---|
| Eyebrows, etiquetas, tags, captions, breadcrumbs, byline | 21 | **Manrope 600**, versalitas, tracking subido a `.1em` |
| `.step .num`, `.step-row .num` | 2 | **Gabarito** (el manual le asigna las cifras destacadas) |
| `.prose code`, `.prose pre` | 2 | **Monoespaciada del sistema**, sin webfont |

`--mono` dejó de apuntar a IBM Plex Mono y ahora es `ui-monospace,Menlo,Consolas,monospace`.
El webfont se retiró de las 15 páginas y la caché subió a `?v=26`.

**El tracking a `.1em` es un criterio añadido en esta ronda, no venía del contrato.** El
`.04em`–`.05em` original estaba calibrado para una monoespaciada; aplicado a versalitas de
Manrope las deja apelmazadas. El manual §05 pide ≥1,4 px de tracking en etiquetas.

## Limpieza incluida

- Cinco carpetas duplicadas por iCloud (`assets 2/`, `blog 2/`, `contacto 2/`, `metodo 2/`,
  `servicios 2/`). **Estaban vacías** — no envenenaban contenido, solo creaban rutas huecas.
- `hero-inicio.svg` y su duplicado: resto de la ilustración dibujada a mano descartada, sin
  referencias en ninguna página. Movidos a `_cuarentena-ronda-01/`, no borrados.

## ⚠️ Cómo capturar a 390 px (trampa verificada el 29 jul)

**Chrome headless tiene un ancho mínimo de ventana de ~500 px.** `--window-size=390,...`
NO renderiza a 390: devuelve un **recorte izquierdo de un render de 500**, lo que simula un
desbordamiento horizontal que no existe. Se comprobó comparando ambas salidas: la de 390 era
píxel a píxel idéntica al recorte de la de 500.

Para capturar 390 px reales, envolver la página en un iframe y fotografiar una ventana mayor:

```html
<style>html,body{margin:0}iframe{width:390px;height:1400px;border:0;display:block}</style>
<iframe src="http://localhost:8765/"></iframe>
```

…y luego recortar el PNG a `(0,0,390,1400)`. Los anchos de 768 y 1440 no sufren el problema.

## Archivos

- `comparativo-{home,servicios,articulo,codigo}-{1440,768,390}.png` — antes/después lado a lado.
- `comparativo-codigo-detalle.png` — zoom que prueba que los chips de código (`GPTBot`,
  `robots.txt`, `PerplexityBot`) siguen monoespaciados.

Las 24 capturas sueltas quedan fuera de git (ver `.gitignore` de esta carpeta): son
intermedios, 10 MB, reproducibles.
