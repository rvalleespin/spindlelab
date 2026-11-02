# marketing/redes — mapa de la carpeta

**Ordenada el 31-ago-2026** (sesión coordinadora, pedido de Ramón). Regla de la carpeta:
en la raíz vive SOLO lo que la campaña activa usa; lo superado va a `_archivo/` con fecha.

**Puesta al día del 2-nov-2026 (línea de la casa del 30-oct).** Septiembre pasa a archivo con la línea
anterior («motor de adquisición»). La carpeta activa es `2026-10-octubre-posicionamiento/`, por
realinear con la línea vigente: «Sitios web a medida y marketing con IA», «En redes arriendas. Tu sitio
es lo único que es tuyo.» y «Hablemos de tu sitio». Qué hay realmente publicado se lee de
`QUE-HAY-PUBLICADO.md` y del canal, no de este mapa.

## Qué hay (y qué es cada cosa)

| Carpeta / archivo | Qué es | Estado |
|---|---|---|
| `2026-10-octubre-posicionamiento/` | **Carpeta activa.** `PLAN.md` y las piezas de Instagram del posicionamiento nuevo (`01-donde-se-cae-una-consulta/`, `02-antes-de-contratar/`, `03-probado-primero-en-lo-nuestro/` en reserva por la decisión A del plan, `04-bots-que-buscan-y-bots-que-entrenan/`). Nacieron del titular del 23-oct y **están por realinear con la línea del 30-oct**: el `PLAN.md` y las piezas 01, 02 y 03 traen su nota «Antes de publicar (2-nov)» con la frase que cambia y por cuál. La 04 no trae nota (su `caption.md` dice que no depende del sitio nuevo). Ninguna figura en `QUE-HAY-PUBLICADO.md`; confirmarlo en el canal antes de programar | VIGENTE, por realinear ⭐ |
| `2026-09-septiembre/` | Campaña de septiembre, organizada como cola de publicación: una carpeta por día (`01-mar-anuncio-motor/` … `29-mar-post-cierre/`) con pieza + `publicar.md` (hora, texto, 1er comentario, checklist); masters en `_sistema/`, alternativas en `_reserva/`. **Línea anterior («motor de adquisición»), superada por la del 30-oct.** La reserva `_reserva/anuncio-motor-v2` **no se reprograma**. Sigue en la raíz solo porque su `base.css` y sus masters son la plantilla de las piezas nuevas (ver «El estilo visual vigente») | ARCHIVO (2-nov-2026) |
| `2026-10-octubre/`, `2026-10-octubre-linkedin/`, `2026-10-octubre-verifica/` | Otras carpetas de octubre (posts de LinkedIn por fecha, piezas de Verifica y Cumple). **No se revisaron en esta puesta al día**: este mapa no las describe una por una | VER `QUE-HAY-PUBLICADO.md` |
| `posts-agosto/` | Fuente de los re-renders de septiembre (los HTML se siguen usando); `post-13ago` EN RESERVA para octubre | FUENTE — no mover |
| `carrusel-03-cinco-chequeos/` | Fuente del carrusel de septiembre; `carrusel-linkedin.pdf` y `ad-resumen.png` EN RESERVA | FUENTE — no mover |
| `stories-01/` | Fuente de las stories del 11-sep | FUENTE — no mover |
| `grilla-agosto-2026.md` | Banco de 12 textos de agosto; alimenta captions de septiembre (plazo en horas corregido el 31-ago; hoy se dice «respuesta en un día hábil») | FUENTE |
| `marca-personal/` | Kit de perfil LinkedIn de Ramón + banco de 10 posts personales (Renata, 31-ago) | VIGENTE |
| `_tools/render.sh` | HTML→PNG con Chrome headless (`bash _tools/render.sh pieza.html [w] [h]`) | HERRAMIENTA |
| `_archivo/2026-jul-ago/` | Todo lo superado: era Metricool, reels nunca publicados, ensayos y handoffs de julio, planes de agosto | ARCHIVO |

## El estilo visual vigente (v2, 31-ago) — regla para TODA pieza nueva

Las piezas siguen el **estilo live del sitio en producción** (aprobado 12-ago, aplicado a
todo septiembre el 31-ago). La plantilla canónica es **`2026-09-septiembre/base.css`**;
los tokens NO se inventan, salen del CSS de producción de spindlelab.cl:

- Fondo `#0e141b` con el frame real del hero (`fondo-hilo.jpg` = `/video/hero-hilo-de-oro.jpg`)
  bajo un velo `rgba(14,20,27,.86–.96)`.
- Texto `#f2efe8` · secundario `#9aa4b0` · terciario `#6b7580` · líneas `rgba(247,245,240,.10–.14)`.
- **Etiquetas y kickers en verde petróleo `#2fa99b`** · **dorado `#c9a227` SOLO en el punto del
  wordmark o en UN dato** (p. ej. el número grande del carrusel).
- Tipografía: **Gabarito** (títulos) + **Manrope** (texto). Inter quedó de fallback.
- Ya **no existe la dirección "clara" (papel)**: todo es oscuro como el sitio. Las familias
  visuales se diferencian por dispositivo (ficha tipográfica / foto-ventana / código / cartera),
  no por fondo claro-oscuro.
- Cada carpeta de piezas es autocontenida: lleva sus `.woff2`, su `fondo-hilo.jpg` y su `base.css`
  con rutas relativas, para que `render.sh` funcione desde cualquier lado.

## Reglas de operación

1. Pieza nueva → carpeta del mes (`2026-MM-<mes>/`), partiendo de `2026-09-septiembre/base.css`.
2. Reciclar una pieza = re-render desde el HTML con etiqueta/firma nuevas. **Jamás republicar un PNG viejo.**
3. Al cerrar un mes: lo no reutilizable se mueve a `_archivo/<año-mes>/` en el mismo commit del cierre.
4. Los PNG se miran antes de darse por buenos (regla de Bruno).
