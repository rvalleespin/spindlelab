# Línea base — el hero v3 tal como está, renderizado y medido

**2-oct-2026.** Primera vez que este hero se ve compuesto.

## Por qué esto existe
El último render commiteado en `claude/rebranding-webdev-exploracion` es del **27-sep**.
El hero actual se escribió el **29 y 30 de sep** (`v3: el hero afirma en vez de preguntar`,
y después los cuatro intentos de bajada). **No hay ninguna captura entre medio.** El
titular y las cuatro bajadas se juzgaron como texto, en conversación.

Eso explica el bucle mejor que cualquier otra hipótesis: cuando no ves el bloque compuesto,
contar caracteres («de 314 a 224») es la única métrica que queda, y no es la que importa.

## Cómo se obtuvo (reproducible)
```
git worktree add --detach <tmp>/v3-build origin/claude/rebranding-webdev-exploracion
cd <tmp>/v3-build/spindlelab-astro && npm install && npx astro build   # 27 páginas, ok
python3 -m http.server 8777 --directory dist
node render-y-medir.mjs http://localhost:8777/v3/ capturas/linea-base
```
`render-y-medir.mjs` (en esta carpeta) usa Playwright con **viewport real**, no el
`--window-size` del Chromium CLI.

## Lo medido (no estimado)

| Vista | clientWidth | scrollWidth | Overflow | Botón sobre el pliegue | Oro en el DOM |
|---|---|---|---|---|---|
| 1440×900 | 1440 | 1440 | **no** | sí (bottom 543) | 2 |
| 768×1024 | 768 | 768 | **no** | sí (bottom 583) | 2 |
| 390×844 | 390 | 390 | **no** | sí (bottom 545) | 2 |

**Sobre el overflow:** la captura hecha con `chrome --headless --window-size=390` sale
visiblemente cortada por la derecha. **Es el falso positivo que este repo ya tenía
documentado** (clamping de la ventana). Medido en la página, no hay overflow en ninguna
vista. No se reporta como defecto.

**Sobre el oro:** los 2 usos son el mismo punto del wordmark — nav y pie. En el primer
viewport hay **uno**. La regla de escasez se cumple.

## Lo que se ve, y es el material de la compuerta 2

1. **La jerarquía está invertida.** El elemento más grande de la pantalla —`EL EJE DE TU
   NEGOCIO`, a 8rem— no dice a qué se dedica la casa. Serviría igual para una aseguradora,
   una constructora o un ERP. Es exactamente la objeción que quedó escrita en el código y
   nunca se resolvió: *«es reclamable por cualquiera y se sostiene en la bajada, no solo»*.
   Verlo compuesto la confirma: el que dice todo es el párrafo gris chico.
2. **La bajada carga el 100 % del significado y ocupa 7 líneas en celular.** Entre el
   titular y el instrumento hay un muro de texto secundario. Quien llega de un anuncio de
   alta intención tiene que leerlo entero para entender qué puede hacer acá.
3. **El instrumento no se lee como instrumento.** `tuempresa.cl` es texto mono gris sobre
   fondo oscuro, entre dos filetes, sin caja ni fondo ni cursor visible. Es lo único que
   el hero pide hacer, y es lo que menos parece accionable. En celular el botón sí tiene
   peso; el campo, no.
4. **El único color saturado del primer viewport está en el aviso de cookies** (el enlace
   a la política, en verde azulado), compitiendo con el CTA por la atención.

## Qué NO es defecto (verificado, para que nadie lo re-reporte)
- Overflow horizontal a 390: no existe.
- Botón bajo el pliegue: no ocurre a 390, 768 ni 1440.
- Dos dorados en una vista: no ocurre.
- Aviso de cookies tapando el botón: no ocurre desde 360px (el propio código ya lo
  documentó y asumió el caso de 320px).
