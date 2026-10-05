# Piezas visuales — septiembre 2026 · campaña "el motor + el chequeo"

**Produce:** Bruno (persona-director-creativo) · **Encargo:** `marketing/encargos-otras-sesiones/relanzamiento-sep-visual-bruno.md`
**Calendario madre:** `marketing/calendario-editorial.md` · **Cliente:** SpindleLab (la casa)
**Estado: 31-ago-2026 — todo renderizado y revisado PNG a PNG. Nada publicado. Falta el pase de Ramón.**

---

## Decisión de carpeta (léela antes de buscar un archivo)

El encargo pedía "re-render de `posts-agosto/post-06ago`". **No sobrescribí nada de agosto.**
Cada pieza reciclada vive acá con el nombre de su fecha de publicación de septiembre, y
`posts-agosto/` queda intacto como archivo del mes anterior (ahí siguen las piezas en reserva).
Así esta carpeta es **todo lo que Ramón publica en septiembre, y nada más**.

| Publica | Archivo | Origen | Dirección |
|---|---|---|---|
| **Mar 1-sep** · página | `anuncio-01sep-v1-cartera.png` ⭐ / `-v2-motor.png` / `-v3-ventana.png` | NUEVA (3 direcciones, elige Ramón) | A-tinta / A-tinta / B |
| **Jue 3-sep** · página | `post-03sep.png` | `posts-agosto/post-06ago` | A-papel |
| **Vie 4-sep** · IG | `carrusel-chequeo/lamina-1..7.png` | `carrusel-03-cinco-chequeos` | carrusel |
| **Mar 8-sep** · página | `post-08sep.png` ⚠️ copy provisional | NUEVA | A-tinta |
| **Jue 10-sep** · página | `post-10sep.png` | `posts-agosto/post-18ago` | B |
| **Vie 11-sep** · IG | `post-10sep.png` (misma imagen) + `stories-11sep/story-1..4.png` | derivado + `stories-01` | B + stories |
| **Mar 22-sep** · página | `post-22sep.png` | `posts-agosto/post-20ago` | A-papel |
| **Jue 24-sep** · página | `post-24sep.png` | `posts-agosto/post-25ago` | B |
| **Vie 25-sep** · IG | `post-24sep.png` (misma imagen) | derivado | B |
| **Mar 29-sep** · página | `post-29sep.png` | `posts-agosto/post-27ago` | A-tinta |

**Alternancia verificada** en la página, con el anuncio en v1 o v2 (A-tinta):
A-tinta → A-papel → A-tinta → B → A-papel → B → A-tinta. Ninguna pieza contigua repite registro.
Si Ramón elige la **v3 (ventana)**, la secuencia arranca en B → A-papel → A-tinta → B… también válida,
**pero** la v3 usa `foto-escritorio.png`, la misma del 24-sep: la foto se repetiría dos veces en el mes.

---

## El sistema del mes (qué cambió respecto de agosto)

Dos strings, quemados en el HTML de cada pieza, y nada más:

| | Agosto | Septiembre |
|---|---|---|
| Etiqueta de serie | `Lo que la IA ve de tu negocio · Agosto` | `Chequea tu sitio · Septiembre` |
| Firma | `Mini-diagnóstico gratis · spindlelab.cl` | `Chequea tu sitio gratis · spindlelab.cl/diagnostico` |

Se mantiene todo lo demás: direcciones A (ficha, papel o tinta) y B (ventana), Gabarito para
titulares, Inter para el cuerpo, **un solo dorado por pieza** (el punto del wordmark), 1080×1080.

**La etiqueta es la propuesta de Marta, aún sin confirmar por Ramón.** Si cambia en el Pase 1+2,
el re-render de las 10 piezas es un `sed` y ~20 segundos. No es motivo para trabar el pase.

---

## Las tres direcciones del anuncio (mar 1-sep) — hay que elegir una

Las tres dicen lo mismo con distinta evidencia. Ninguna inventa un dato: los precios salen de las
seis páginas de `/servicios/` y el eje/método, de `/metodo/` y del home.

- **v1 · La cartera** ⭐ *(mi recomendación)*. A-tinta. Las seis soluciones con su "desde $" en una
  rejilla. Es literalmente el cambio que se anuncia: el brief lo llama "el cambio más comunicable",
  y la pieza **lo muestra** en vez de decir que ocurrió. Es lo que hace clic en un feed de agencias
  que esconden el precio.
- **v2 · El motor**. A-tinta. El eje + las tres piezas + las cuatro fases del método. Muestra la
  *estructura* en vez del precio: envejece mejor (los precios cambian, el motor no) y es la pieza
  que yo reusaría como creativo de pauta. Si Ramón no quiere precio quemado en imagen, esta es.
- **v3 · La ventana**. B, foto + banda. Poco texto, el registro más humano y el que mejor entrega
  Meta Ads. Cuesta la repetición de foto del 24-sep.

**El desacuerdo que hay que resolver, y es de Ramón:** en agosto dejé los precios *fuera* de la
imagen del post del 25 a propósito (un precio quemado envejece mal y se saca de contexto al
compartirse). Acá lo hago al revés — porque en esta pieza el precio publicado **es** la noticia, no
un dato de apoyo, y porque es un post fechado, no un creativo perenne. Si el criterio de agosto
pesa más, la respuesta es la v2.

---

## Lo que sí toqué de contenido, y por qué (revísalo)

1. **`post-10sep` (ex 18ago): la banda pasó de 432 a 480 px** (foto 648 → 600). El titular de tres
   líneas ya chocaba con el wordmark **en el original de agosto** — no lo rompí yo, lo heredé.
   Es el único cambio de forma en un reciclado. Si prefieres fidelidad total al original, se
   revierte quitando dos `style` del HTML.
2. **`carrusel-chequeo/lamina-7`: se cayó el "gratis en 48 horas"**. Estaba obsoleto por dos
   razones: la promesa vigente es **24 horas** (plantillas v2) y el CTA del mes ya no es un
   diagnóstico que hacemos nosotros, sino el chequeo que corre el propio visitante. Quedó:
   "Estos 5 y los 16 que faltan, en un solo chequeo. Gratis, sin registro, en tu propio dominio."
3. **`carrusel-chequeo/lamina-1`: la bajada pasó a "Y otras 16 que el chequeo corre por ti, gratis"**
   (antes: "Son las mismas que revisamos en cada auditoría"). Es el re-apunte que pedía el encargo.
   Las láminas 2 a 6 **no se tocaron**: no llevan firma, ni CTA, ni etiqueta de agosto.
4. **`stories-11sep`: los frames 1, 2 y 3 de `stories-01` calzan tal cual** y se copiaron sin
   cambios. Solo el frame 4 (el del CTA) se rehízo: decía "Mini-diagnóstico gratis, en 48 horas"
   y enlazaba a la home.

⚠️ **`post-08sep` va con copy provisional.** Al cierre de esta entrega Renata no había subido el
texto del post del 8-sep. El titular ("¿Qué mira exactamente un chequeo de visibilidad en IA?") y
los tres bloques con sus pesos (30/40/30) salen de la metodología publicada en `/diagnostico/`, así
que el **dato** es real y verificable; la **redacción** es mía y le corresponde a Renata/Cata.
Cuando llegue su texto son dos strings y un re-render. Está acá para que la maqueta se apruebe en
el Pase 3 sin esperar al copy.

---

## Lo que NO toqué (encargo explícito)

`posts-agosto/post-13ago`, `carrusel-03-cinco-chequeos/carrusel-linkedin.pdf` y
`carrusel-03-cinco-chequeos/ad-resumen.png`: quedan en reserva para octubre / fase 2 de pauta.

## Vetos verificados pieza por pieza

Ninguna pieza contiene el 0/15 propio, ni enlaza o nombra `/indice/`, ni nombra a un competidor,
ni usa prueba social inventada, ni em-dash de muletilla. Los precios son los seis "desde $" reales
del sitio, con "+ IVA" declarado en la propia pieza.

## Cómo re-renderizar

```bash
marketing/redes/_tools/render.sh <pieza>.html 1080 1080     # feed / carrusel
marketing/redes/_tools/render.sh <pieza>.html 1080 1920     # story
```

El script resuelve un gotcha del entorno cloud: Chrome headless pinta solo ~85 px menos que el
`--window-size` que se le pide, así que un `--window-size=1080,1080` deja una franja blanca abajo.
El script renderiza con holgura y recorta al tamaño exacto. En un Mac con Chrome real funciona
igual (detecta el binario solo).

**Créditos de Higgsfield gastados en esta tanda: 0.** Todo es HTML→PNG y fotos ya existentes.

## Pendiente / de quién es

- **Ramón:** elegir v1/v2/v3 del anuncio · confirmar la etiqueta de serie · pase de las 10 piezas.
- **Renata/Cata:** copy definitivo de `post-08sep` · captions y primeros comentarios de todo.
- **Bruno (yo):** re-render inmediato si cambia la etiqueta, la dirección elegida o el copy del 8-sep.

---

## v2 — Migración al estilo live (31-ago, noche; sesión coordinadora, pedido de Ramón)

Ramón revisó las piezas y detectó que la v1 heredaba el sistema de AGOSTO (papel/tinta
`#131A22` + Inter), no el rebranding del sitio. Se migraron las 20 piezas (9 feed + 7
láminas + 4 stories) esa misma noche:

- **Tokens del CSS de producción** de spindlelab.cl (no inventados): bg `#0e141b`,
  fg `#f2efe8`, muted `#9aa4b0`, hairlines `rgba(247,245,240,.1)`.
- **Fondo:** `fondo-hilo.jpg` (poster real del hero, `/video/hero-hilo-de-oro.jpg`)
  bajo velo `rgba(14,20,27,.86–.96)` en todas las piezas.
- **Etiquetas de serie y kickers → verde petróleo `#2fa99b`** (antes gris).
- **Cuerpo → Manrope** (el sitio dejó Inter); Gabarito sigue en títulos.
- **La dirección "clara" quedó derogada**: `.a` ya no tiene variante papel; las
  familias se diferencian por dispositivo (ficha / foto-ventana / código / cartera).
- Dorado: solo el punto del wordmark o UN dato (los números del carrusel).
- Assets nuevos por carpeta (autocontención): `fondo-hilo.jpg` + `manrope.woff2`
  en la raíz, en `carrusel-chequeo/` y en `stories-11sep/`.
- Re-render de las 20 piezas con `_tools/render.sh`; PNGs mirados.

Regla desde ahora: toda pieza nueva parte de ESTE `base.css`. Mapa de la carpeta:
`marketing/redes/README.md`.

---

## v3 — Estructura por día de publicación (31-ago, pedido de Ramón)

La carpeta se reorganizó como **cola de publicación**: una carpeta por día, con TODO lo
del día adentro (pieza + `publicar.md` con hora, texto listo para pegar, primer
comentario y checklist). El día de publicar: abrir la carpeta del día y nada más.

| Carpeta | Día · canal | Estado del copy |
|---|---|---|
| `01-mar-anuncio-motor/` | mar 1 · página | ✅ listo (v2-motor, decisión 31-ago) |
| `02-mie-personal-ancla/` | mié 2 · personal | ✅ listo |
| `03-jue-post-chatgpt/` | jue 3 · página | ✅ listo (+ ese día Diego publica blog #1) |
| `04-vie-carrusel-ig/` | vie 4 · IG | ✅ listo (⚠️ bio → /diagnostico antes) |
| `08-mar-post-blog1/` | mar 8 · página | ✅ listo (visual: titular provisional) |
| `09-mie-personal-hallazgo/` | mié 9 · personal | 🟡 dato resuelto, Renata escribe Plan A |
| `10/11/22/23/24/25/29-*` | resto del mes | ⬜ copy de Cata (Entregas 2 y 3) |
| `_sistema/` | — | masters del estilo v2 (base.css, fuentes, fondo) |
| `_reserva/` | — | anuncio v1-cartera y v3-ventana (no publicar) |

Convenciones: cada carpeta con HTML lleva su copia de los assets (autocontención para
`render.sh`); el copy pendiente se pega en el `publicar.md` del día, nunca en archivos
sueltos en la raíz; el estándar de primeros comentarios vive en
`estandar-primeros-comentarios.md`. **Esta estructura es el molde para octubre.**

---

## v4 — Semana 1 intensificada (1-sep, pedido de Ramón: cadencia agresiva)

La ventana 1-12 sep pasó de 5 a ~17 toques sin bajar calidad: cross-posting a IG (casi
gratis), stories ya producidas repartidas (mié/vie/mar/jue), dos piezas nuevas con datos
reales (07-lun cifra 45/100 · 12-vie documento PDF de los 21 chequeos) y el gancho
CIRCUITO en todo. La ancla personal pasó al JUE 3 12:30 (el dominó abrió el perfil
personal el mar 1). Programación en Metricool (decisión 1-sep); primeros comentarios a
mano si el plan no los soporta. Carpetas nuevas: `07-lun-cifra-corredoras/`,
`12-vie-documento-linkedin/`, más `caption-ig-cross.md` en el 03 y
`plan-stories-semana.md` en el 11.
