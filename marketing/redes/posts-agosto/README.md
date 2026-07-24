# Sistema visual de posts de empresa — agosto 2026

**Pieza 3 del encargo `piezas-visuales-agosto.md`.** Un mismo sistema para los posts de empresa
del mes, para que agosto se lea como un bloque y cada pieza sirva además como creativo de Meta Ads.
**Estado:** dos direcciones renderizadas + los 4 posts aplicados. Pendiente tu elección y revisión.

## Las dos direcciones (elige, o quédate con las dos)

Renderé las dos con el **mismo mensaje** (el del 6 de agosto) para que la comparación sea limpia:

- **`direccion-a.png` — Ficha tipográfica.** Papel o tinta, etiqueta del mes arriba, línea fina,
  titular Gabarito grande, apoyo en gris, firma abajo. Máxima claridad, cero ruido, se produce en
  30 segundos y admite un "dispositivo" distinto por post (bloque de código, tachado, cifra).
- **`direccion-b.png` — Ventana.** Fotografía real arriba (60 %) + banda tinta abajo con el titular
  corto y la firma. Más humana y más cercana al mood de agencia; menos texto en la imagen, que es
  justo lo que premia la entrega de Meta Ads.

**Mi recomendación: usar las dos como un solo sistema, alternando.** No son dos opciones rivales,
son dos registros del mismo lenguaje (misma etiqueta, misma tipografía, misma firma). Alternarlas
evita el problema real que tenemos, que es un feed donde todo se ve igual, sin perder identidad de mes.
La cadencia que apliqué: **foto → tipográfico → tipográfico → foto**.

Si prefieres una sola: **A**, por consistencia y porque no depende de tener buena foto disponible.

## Los 4 posts aplicados

| Archivo | Fecha | Dirección | Titular en la imagen |
|---|---|---|---|
| `post-06ago.png` | jue 6 ago | A · ficha papel + bloque de código | Tu sitio se ve impecable. Esto es lo que recibe ChatGPT. |
| `post-13ago.png` | jue 13 ago | A · ficha tinta + bloque de código | ¿Sabías que hay clínicas que le dicen a Google que son «una organización»? |
| `post-18ago.png` | mar 18 ago | B · ventana (foto ventana) | Tu competencia no te gana por presupuesto. Te gana porque a ella sí la pueden leer. |
| `post-25ago.png` | mar 25 ago | B · ventana (foto escritorio) | Lo que arreglamos casi nunca es rehacer el sitio. |

**Ganchos actualizados el 23 jul** según `../estrategia-ganchos-agosto.md`: la primera línea ahora
nombra a quién le pasa y qué pierde, en vez de explicar la categoría. El 6 pasó de foto a ficha
con código porque el gancho promete mostrar algo y la pieza tiene que mostrarlo.

El copy completo de cada post está en `../grilla-agosto-2026.md`. La imagen solo lleva el gancho:
el desarrollo va en el texto del post.

**Decisión de criterio en el post del 25:** los rangos de precio (~$200.000 / ~$80.000) los dejé
**fuera de la imagen** y solo en el caption. Un precio quemado en un creativo envejece mal, se
saca de contexto al compartirse y le pone fricción al ad; el gancho de la imagen es la pregunta,
que es lo que hace clic.

## Reglas del sistema (para producir los que falten)

- Etiqueta superior fija todo el mes: `Lo que la IA ve de tu negocio · Agosto`.
- Titular Gabarito semibold, sentence case, máximo dos líneas. Si no cabe en dos, está largo.
- Un solo dorado por pieza: el punto del wordmark. Nada más.
- Firma abajo: wordmark a la izquierda, `Mini-diagnóstico gratis · spindlelab.cl` a la derecha.
- Fotos: reusar las que ya hay (`foto-ventana.png`, `foto-escritorio.png`, generadas en julio).
  **Créditos Higgsfield gastados en esta tanda: 0.**

## Cómo re-renderizar

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=1 --window-size=1080,1080 \
  --screenshot="<ruta-abs>/post-06ago.png" "file://<ruta-abs>/post-06ago.html"
```
