# Reporte a la sesión troncal — Visual del relanzamiento de septiembre

**De:** sesión de dirección creativa (`/persona-director-creativo`, Bruno) · **Para:** Tomás (troncal)
**Fecha:** 31-ago-2026 · **Encargo cumplido:** `relanzamiento-sep-visual-bruno.md` (emitido por Marta el 28-ago)
**Cliente:** SpindleLab (la casa)

> **Cómo verificar esto sin creerme.** Todo está en un solo commit, ya en `origin`:
> ```
> git fetch origin claude/relanzamiento-visual-bruno-axki01
> git show 93590e3 --stat
> git diff main...origin/claude/relanzamiento-visual-bruno-axki01
> ```
> Commit `93590e32a63a9bd96b9c4bc4674516d0d7ea2bbc`, rama `claude/relanzamiento-visual-bruno-axki01`,
> confirmada en remoto con `git ls-remote`. **No está en `main`:** falta merge (usar `merge`, no squash).
> Los PNG se miran directo; no hay nada que dar por hecho a partir del mensaje de commit.

---

## 1. Qué se entregó

**20 piezas renderizadas y revisadas una por una**, todas en `marketing/redes/2026-09-septiembre/`
(16 de 1080×1080 + 4 stories de 1080×1920). Las tres entregas del encargo (que vencían el 30-ago,
el 3-sep y el 10-sep) se adelantaron a **una sola tanda**, para que el Pase 1+2 de hoy pueda cubrir
el mes completo en vez de solo la Ventana 1.

| # del encargo | Vencía | Entregado | Archivo |
|---|---|---|---|
| 1 · Anuncio del motor (mar 1-sep) | 30-ago | ✅ **en 3 direcciones** | `anuncio-01sep-v1-cartera` / `-v2-motor` / `-v3-ventana` |
| 2 · Re-render 06ago (jue 3-sep) | 30-ago | ✅ | `post-03sep` |
| 3 · Carrusel del chequeo (vie 4-sep) | 30-ago | ✅ | `carrusel-chequeo/lamina-1..7` |
| 4 · Pieza nueva del mar 8-sep | 3-sep | ⚠️ **maqueta, copy provisional** | `post-08sep` |
| 5 · Re-render 18ago (jue 10-sep) | 3-sep | ✅ | `post-10sep` |
| 6 · Adaptación IG + stories (vie 11-sep) | 3-sep | ✅ | `post-10sep.png` sirve tal cual + `stories-11sep/` |
| 7 · Re-render 20/25/27-ago | 10-sep | ✅ | `post-22sep`, `post-24sep`, `post-29sep` |
| 8 · Adaptación IG de post-25ago (vie 25-sep) | 10-sep | ✅ | `post-24sep.png` sirve tal cual |

**Costo:** 0 créditos de Higgsfield. Todo es HTML→PNG y fotos que ya existían.

## 2. Para registrar en `plan-operativo-90-dias.md`

La producción visual de septiembre está **cerrada**: no quedan piezas por producir para el mes,
salvo re-renders de segundos si cambian decisiones (ver §4). Las filas visuales del calendario de
Marta (`marketing/calendario-editorial.md`, columna "Visual → Bruno") pasan todas a `[x]`
**excepto la del mar 8-sep, que queda `[~]`** hasta que llegue el copy de Renata.

Nada está publicado. La publicación es manual de Ramón, fila por fila, tras su pase.

## 3. Dos hallazgos que exceden mi encargo y son tuyos

**(a) El "48 horas" está obsoleto y sigue vivo en material que se va a usar este mes.**
Lo encontré al auditar la lámina 7 del carrusel, que prometía "lo revisamos gratis en 48 horas".
La promesa vigente es **24 horas** (plantillas v2, y es lo que dice el sitio en `/metodo/` y
`/diagnostico/`). Lo arreglé en mi pieza, pero el problema es más ancho:

- `marketing/redes/grilla-agosto-2026.md:191` — **este importa**: es la fuente de la que Cata saca
  los captions de los posts reciclados de septiembre. Si nadie lo corrige, el caption sale con la
  promesa vieja aunque la imagen esté bien.
- Material de banco/archivo con el mismo error (menos urgente, pero envenena cualquier reciclaje
  futuro): `redes/ideas-instagram-formatos-distintos.md`, `redes/calendario-carga-jul-ago-2026.md`,
  `redes/post-2026-07-23-tres-hallazgos/copy-post.md`, `redes/reel-no-es-presupuesto/` (3 archivos)
  y `redes/reel-agosto-robots/_v1-descartado/`.

**No lo toqué**: el copy no es mío, y varios de esos archivos son de otras sesiones. Sugiero
encargo a Cata para la grilla de agosto (bloqueante para septiembre) y un barrido posterior del resto.

**(b) Un defecto visual heredado que se iba a republicar tal cual.** El titular de tres líneas del
post del 18-ago chocaba con el wordmark **ya en el PNG de agosto**. Un re-render "fiel" lo habría
publicado igual. Lo corregí subiendo la banda de 432 a 480 px y lo declaré en el README. Vale como
regla general: **reciclar exige auditar la pieza contra el estado actual del negocio, no solo
cambiarle la firma.**

## 4. Lo que está bloqueado, y por quién

| Bloqueo | De quién | Impacto si no se resuelve hoy |
|---|---|---|
| Elegir v1/v2/v3 del anuncio del 1-sep | **Ramón** (Pase 1+2) | No sale la pieza del martes |
| Confirmar la etiqueta de serie ("Chequea tu sitio · Septiembre") | **Ramón** (Pase 1+2) | Ninguno: produje con la propuesta; si cambia, re-render de las 10 piezas en ~20 s |
| Copy definitivo del post del mar 8-sep | **Renata** (no entregó al 31-ago) | La maqueta se aprueba igual en el Pase 3; el texto entra con un re-render |
| Captions y primeros comentarios de todo | **Cata** | No bloquea la imagen; bloquea publicar |

**Decisión de criterio que le corresponde a Ramón, no a mí, y está planteada en el README:** en
agosto dejé los precios *fuera* de la imagen a propósito (un precio quemado envejece mal). En la
v1 del anuncio hago lo contrario, porque ahí el precio publicado **es** la noticia y es un post
fechado, no un creativo perenne. Si pesa más el criterio de agosto, la pieza correcta es la v2.

## 5. Decisiones de archivo que afectan a otras sesiones

- **No se sobrescribió nada de `posts-agosto/`.** Cada reciclado sale con el nombre de su fecha de
  septiembre en la carpeta nueva; agosto queda como archivo. Le dejé un aviso arriba del
  `posts-agosto/README.md` para que nadie publique por error un PNG con la firma vieja.
- **`post-13ago`, `carrusel-linkedin.pdf` y `ad-resumen.png` intactos** (reserva de octubre / fase 2
  de pauta), como pedía el encargo.
- **Nuevo:** `marketing/redes/_tools/render.sh`. Resuelve un gotcha real del entorno cloud (Chrome
  headless pinta ~85 px menos que el `--window-size` pedido y deja una franja blanca abajo, sin
  avisar). Sirve igual en el Mac. Cualquier sesión que renderice piezas debería usarlo.

## 6. Vetos verificados

Pieza por pieza, con `grep` sobre los 11 HTML entregados: **cero** apariciones del 0/15 propio,
de `/indice/`, del "Índice de Citabilidad", de competidores por nombre y de em-dash. Los seis
precios de la v1 son los "desde $" reales de las seis páginas de `/servicios/`, con "+ IVA"
declarado en la propia pieza. Cero prueba social inventada: no hay ningún cliente, cifra de
resultado ni testimonio en ninguna pieza.

**Estado:** ✅ entregado · pendiente de merge a `main` y del pase de Ramón.
