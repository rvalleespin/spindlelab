# Instagram de SpindleLab: directrices para producir las gráficas

**Para:** la sesión creativa (`persona-director-creativo` + `persona-social-media`)
**De:** la sesión de Verifica y Cumple · 25-sep-2026
**Pedido de Ramón:** que la sesión creativa empiece a hacer las gráficas para publicar en Instagram.

Esto no es una grilla de contenidos. Es lo que hay que saber antes de abrir el editor, más
la decisión de marca que hay que tomar primero, porque si se toma mal hay que rehacer todo.

---

## 1. El estado real del canal, que no es el que dice el repo

**@spindlelab.cl lleva dormida desde el 16 de julio.** El plan de 90 días registra dos
carruseles publicados (8-jul y 16-jul) y nada después: desde agosto todo el contenido se
fue a LinkedIn. Son más de dos meses sin publicar.

Y hay algo peor que el silencio: **lo que está publicado ahí está en una marca que ya no
existe.** Esas piezas son anteriores al 12 de agosto, cuando se aprobó el sistema visual
actual. Lo de julio es navy + Instrument Serif. Lo de hoy es oscuro + Gabarito, sin una
sola serif en ninguna parte.

Consecuencia práctica: **la primera pieza nueva va a chocar visualmente con la grilla que
hay debajo.** Eso no se arregla dibujando, se decide. Las dos salidas razonables son
archivar lo de julio antes de publicar, o publicar tres piezas de una para que el bloque
nuevo domine la vista de perfil. Yo haría lo segundo, es menos destructivo y se ve mejor
antes. **La decisión es de Ramón.**

⚠️ **`QUE-HAY-PUBLICADO.md` solo cubre LinkedIn.** Instagram no tiene registro en el repo.
Antes de programar cualquier cosa, **mirar el canal, no el repo**, y después anotarlo.
Esta regla existe porque el 22-sep se publicó un post duplicado y hubo que retirarlo a los
40 minutos: la planificación se hizo a ciegas.

---

## 2. La decisión que hay que tomar ANTES de dibujar

El contenido que hoy tiene material listo es el de **Verifica y Cumple**. Y acá aparece el
conflicto, porque son dos sistemas visuales distintos y los dos son reales:

| | SpindleLab (spindlelab.cl) | Verifica y Cumple (verifica.spindlelab.cl) |
|---|---|---|
| Fondo | oscuro `#0e141b` | crema `#fffaf0` |
| Texto | `#f2efe8` | tinta `#17163a` |
| Acentos | dorado `#c9a227` · verde petróleo `#2fa99b` | lima `#d6ff3d` · rosa `#ff3ea0` · teja `#b5502c` |

**La cuenta es de SpindleLab, así que las piezas llevan el sistema de SpindleLab.** El
oscuro. Verifica y Cumple aparece adentro como producto con nombre, no como una estética
propia. No es una decisión nueva que yo esté tomando: el 21-sep se decidió que **Verifica y
Cumple es un servicio de SpindleLab SpA y no una marca aparte** (revirtió el "Camino B"), y
el README de `marketing/redes/` ya dice que el estilo oscuro es la regla para TODA pieza
nueva.

**Lo que esto prohíbe, concretamente:** el lima `#d6ff3d` del sitio de VyC no entra como
segundo acento. Un acento por pieza, y en esta marca el acento es el dorado. Mezclar los
dos sistemas en una grilla hace que el perfil se lea como dos cuentas.

---

## 3. El sistema visual, con los tokens verificados hoy

**Los tokens salen del CSS en producción, NUNCA del repo.** `spindlelab-site/` es un sitio
estático que ya no es lo publicado: spindlelab.cl corre un Astro distinto. Producir leyendo
el repo da una pieza en una marca muerta, y ya pasó una vez.

Los verifiqué hoy, 25-sep, y no cambiaron desde agosto:

```
--bg:#0e141b · --surface:#161d26 · --surface-2:#131a22 · --surface-3:#0a0f15
--fg:#f2efe8 · --fg-muted:#9aa4b0 · --fg-faint:#6b7580
--gold:#c9a227 · --gold-2:#dcb52f · --support:#2fa99b
--paper:#f7f5f0 · --hairline:rgba(247,245,240,.1)
```

Cómo volver a leerlos cuando haga falta:

```bash
curl -s https://spindlelab.cl -o live.html
HREF=$(grep -oE '/_astro/[^"]*\.css' live.html | head -1)
curl -sL --compressed "https://spindlelab.cl${HREF}" -o live.css && grep -o ':root{[^}]*}' live.css
```

### Las cuatro reglas que definen el look

1. **Gabarito bold en titulares. Manrope en cuerpo. Cero serif**, en ninguna parte.
2. **El verde petróleo es el color de las etiquetas** (mayúsculas, tracking .2em) y de los
   remates de titular. No es un color de fondo ni de cuerpo.
3. **El dorado se reserva a UN dato por pieza.** Uno. Si aparece dos veces, saca uno.
4. **El fondo es el hilo de oro**, no tramas ni degradados inventados: `fondo-hilo.jpg` (el
   frame real del hero) bajo un velo `rgba(14,20,27,.86–.96)`. Es la metáfora de la marca,
   *spindle* es huso de hilar. Superficies de vidrio `rgba(255,255,255,.02)` + borde
   `white/10` + radio 16px.

**El gesto que mejor funciona en feed es la cifra dominante:** Gabarito ~210px, un dato
verificado, glosa corta debajo. Le gana al titular explicativo porque detiene el scroll.

---

## 4. De dónde se parte y cómo se produce

- **Plantilla canónica:** `marketing/redes/2026-09-septiembre/base.css`. Los masters, las
  fuentes y `fondo-hilo.jpg` están en `2026-09-septiembre/_sistema/`.
- **Pieza nueva → carpeta del mes** (`2026-10-octubre/`), partiendo de esa base.
- **Cada carpeta es autocontenida:** lleva sus `.woff2`, su `fondo-hilo.jpg` y su `base.css`
  con rutas relativas, o `render.sh` no funciona.
- **Render:** `bash marketing/redes/_tools/render.sh pieza.html 1080 1080`.
- **Tamaños:** 1080×1080 feed y carrusel · 1080×1920 Stories.
- **Reciclar = re-render desde el HTML.** Jamás republicar un PNG viejo.
- **No hay ffmpeg local.** Si se quiere Reel: clips + overlays transparentes + receta de
  montaje para CapCut. No prometer un MP4 con texto quemado.
- **Mirar el PNG antes de darlo por bueno.** La primera vez salió con el texto del sitio de
  fantasma encima porque se recortó una captura en vez de sacar un frame limpio.

---

## 5. Qué publicar

Tres temas con material ya escrito y verificado. Los tres son de oficio, no de venta, que es
lo que funciona en esta marca.

### Pieza 1 — Los tres mitos (carrusel, 4 tarjetas)

Ya está escrito y verificado contra el PDF del Diario Oficial:
`marketing/lanzamiento-vyc-23sep/post-linkedin-tres-mitos.md`. Publicado en LinkedIn el
25-sep, así que el texto está probado.

Una tarjeta por mito, cada una con **lo que la ley SÍ dice y el artículo al lado**:
el delegado no es obligatorio (Art. 50, "podrá designar") · no existen las 72 horas (eso es
europeo; el Art. 14 sexies pide "sin dilaciones indebidas") · el 4% no es lo que arriesga
una pyme (Art. 35, solo para empresas que no son de menor tamaño y que reinciden).

### Pieza 2 — Cifra dominante: **50**

El formato más fuerte del sistema, con el dato más limpio que tenemos. El número gigante en
Gabarito, y debajo: *el artículo que dice "podrá designar". No "deberá".*

Un solo dorado, que va en el 50.

### Pieza 3 — Lo que un chequeo automático no puede ver

El caso real: un sitio saca 100 de 100 en el chequeo y es de los peores que hemos revisado,
porque el chequeo lee el HTML y no ejecuta JavaScript. Habla del oficio, no del producto, y
hace creíble todo lo demás.

⚠️ **Sin nombrar el sitio.** Los prospectos se generalizan, nunca se nombran sin permiso
explícito.

---

## 6. Qué NO publicar

- **Ningún competidor por nombre, marca, URL ni captura.** Se habla de lo que circula, no
  de quién lo dice.
- **Cifras de multas como gancho.** Dos competidores muestran una multa estimada en pesos.
  Es justo el diferencial que estamos construyendo, no lo gastes.
- **El 36 → 73.** La forma de puntuar cambió el 23-sep y ese número ya no se reproduce. Si
  hace falta un número, se corre el chequeo y se usa el del día.
- **Urgencia por la fecha.** Hay un proyecto en el Senado (boletín 18.623-07) que movería la
  vigencia al 1-dic-2027. Lo consulté hoy: sigue en comisión, sin informe, sin votaciones y
  sin indicaciones, con la urgencia Suma del 22-sep vigente. Todo lo anclado a "quedan X
  semanas" envejece el día que se vote.
- **Nada que insinúe que el chequeo dice si alguien cumple.** No lo dice.
- **Cero cifra, cliente o testimonio que no exista.**
- **Cero raya larga.** Es el tell de escritura con IA y está prohibido en las reglas de esta
  marca.


⚠️ **Dos precisiones verificadas el 25-sep contra el PDF, que corrigen material anterior:**
1. **El 4% es solo de las infracciones gravísimas.** El Art. 35 dice "2% o 4% ... según se
   trate de infracciones graves o gravísimas, respectivamente". En las graves el tope es 2%.
   El post del 25-sep decía "grave o gravísima" para el 4% y se corrigió en LinkedIn ese día.
2. **Estos artículos son de la ley 19.628, no de la 21.719.** La 21.719 tiene tres artículos
   permanentes; su artículo primero mete las modificaciones en la 19.628. Al citar, decir
   "el artículo 50 de la ley 19.628, en el texto que le puso la 21.719", o anclar al PDF del
   Diario Oficial. Quien busque el "artículo 50 de la 21.719" no lo encuentra.

⚠️ **La API de la BCN sirve la Ley 21.719 truncada** (salta del Art. 16 sexies al 20 y corta
en el 22, sin el capítulo de sanciones). Cualquier artículo se verifica en el PDF del Diario
Oficial, N° 44.023 del 13-dic-2024, CVE 2583630. De ahí salió un error nuestro que citaba el
Art. 51 en vez del 50.

---

## 7. Registro y voz

- **Instagram es la marca hablando: plural.** "Publicamos", "entregamos". El singular
  ("revisé", "le pregunté a ChatGPT") es del perfil personal de Ramón en LinkedIn y no se
  mezcla en la misma pieza.
- La voz está en `.claude/skills/voz-spindlelab/` con el corpus de lo que él ya publicó. Se
  lee antes de escribir, no después.
- **Todo pasa por el ojo de Ramón antes de salir.** Nada se publica desde un borrador
  generado.

---

## 8. Cadencia, y por qué es corta

Ramón tiene media jornada a la semana para todo esto, y el outbound va primero porque es
donde se corta el embudo. Entonces: **un lote de tres piezas para partir, no una grilla del
mes.** Se publican, se mira qué pasa, y recién ahí se decide el resto.

**Cómo se mide si sirve.** No por reacciones. Por chequeos corridos en Cloudflare
(Workers & Pages → verificaycumple → Métricas → Solicitudes) el día de la publicación y el
siguiente. Si sube el alcance pero no se mueven los chequeos, el tema interesa y la
invitación no funciona.

---

## 9. Antes de la primera pieza

- [ ] **Mirar la cuenta.** Cuántos seguidores tiene hoy, qué se ve en la grilla, si quedó
      en cuenta profesional. El repo no lo sabe.
- [ ] **Decidir con Ramón qué pasa con lo de julio** (archivar o dejar que el bloque nuevo
      lo empuje). Ver §1.
- [x] ~~**Revisar la biografía.**~~ **Resuelto el 25-sep con Ramón: el mini-diagnóstico ya no
      se ofrece.** El bio nuevo está escrito en `marketing/brand/redes/perfil-instagram.md` y
      apunta al **chequeo de visibilidad en IA**, `spindlelab.cl/diagnostico/`. Falta que
      alguien lo pegue en la cuenta. ⚠️ **No confundir con el chequeo de la Ley 21.719**
      (`verifica.spindlelab.cl`): ese es otro producto, con su propio dominio, y no va en el
      bio de esta cuenta.
- [ ] **Abrir el registro de Instagram**, al lado del de LinkedIn en
      `marketing/redes/QUE-HAY-PUBLICADO.md`, o como archivo propio.

## Criterio de término

- [ ] Las tres piezas renderizadas a 1080×1080, y **miradas** en PNG.
- [ ] Sistema oscuro de SpindleLab. Un solo dorado por pieza. Cero serif. Cero lima de VyC.
- [ ] Tokens leídos de producción, no del repo.
- [ ] Cada artículo de la ley verificado contra el PDF del Diario Oficial.
- [ ] Ningún competidor ni prospecto nombrado.
- [ ] El HTML fuente guardado junto al PNG, en `marketing/redes/2026-10-octubre/`.
- [ ] Queda para revisión de Ramón, no publicado directo.
