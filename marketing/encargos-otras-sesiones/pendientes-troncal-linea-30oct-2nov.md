# Pendientes de la línea del 30-oct que no son edición de documentos

**Fecha:** 2-nov-2026 · **Origen:** `linea-de-la-casa-30oct-para-la-troncal.md`, contrastado con el repo y con la
rutina viva · **Decisión de Ramón del 2-nov:** el cargo es «Fundador», sin «director».

Tres cosas que alguien tiene que hacer y que ninguna es un cambio de texto en un documento.

## a) Sesión del motor de revisión previa (`claude/motor-revision-previa-build`)

**Verificado con git** sobre `origin/claude/motor-revision-previa-build` (cabeza `8052266a`, 2-nov):

- `marketing/motor-revision-previa/borradores/workflow-revision-primer-toque.js`, línea 32: el revisor
  presenta a SpindleLab como «consultora chilena de SEO técnico, visibilidad en IA y cumplimiento web».
  Es la descripción anterior a la línea del 30-oct.
- `marketing/motor-revision-previa/borradores/html_correo.py`, línea 14: la firma dice `FUNDADOR`. **Eso ya
  coincide con la decisión de Ramón; no hay que cambiarlo.** La nota original lo daba como problema porque el
  sitio decía «Fundador y director».
- Existe además una rama hermana, `claude/motor-revision-previa`. El aviso es para quien trabaje en `-build`.

**Texto de aviso, listo para pegar en esa sesión** (todo lo que va entre las dos líneas con tres acentos graves):

```
Aviso de la troncal, 2-nov-2026. La línea de SpindleLab cambió el 30-oct y ya está publicada en spindlelab.cl. Rótulo: «Sitios web a medida y marketing con IA». Titular: «En redes arriendas. Tu sitio es lo único que es tuyo.» El negocio principal es Desarrollo web: el sitio es el eje y lo demás se le conecta (búsqueda y visibilidad en IA, anuncios en Google y redes, acompañamiento mensual). Acción principal: «Hablemos de tu sitio». Con sitio, revisión gratis de una página con respuesta en un día hábil; sin sitio, se le cuenta cómo se haría y cuánto cuesta. Fuente: marketing/oficina/clientes/spindlelab.md.

Lo que te toca: en marketing/motor-revision-previa/borradores/workflow-revision-primer-toque.js (línea 32) el lector independiente describe a SpindleLab como «consultora chilena de SEO técnico, visibilidad en IA y cumplimiento web». Cámbialo para que juzgue los correos contra la descripción de hoy. Frase propuesta por la troncal para esa línea (ajústala si hace falta): «estudio chileno de sitios web a medida y marketing con IA; los correos de este lote ofrecen Verifica y Cumple, su chequeo de la Ley 21.719 y su kit». No pongas solo el rótulo nuevo: estos correos venden Verifica y Cumple, y el revisor debe saberlo.

El revisor lee el manual de marca y el corpus de voz de la copia donde corre, y los dos ya traen la línea nueva en main (#54): conviene traer main a tu rama. La firma FUNDADOR de html_correo.py está bien: la decisión de Ramón es «Fundador», sin «director». Esto cambia solo el texto del revisor; no toca lotes ni envíos.
```

## b) Piezas gráficas por rehacer (rol Bruno, director creativo)

Las dos llevan todavía la línea anterior. Lo que vi abriendo los PNG:

- **Banner de LinkedIn:** `marketing/brand/redes/banner-linkedin.png` y su variante
  `banner-linkedin-alt-tipografico.png`. Los dos dicen «Tus clientes ya le preguntan a ChatGPT.» y
  «SEO técnico · Visibilidad en IA · Desarrollo web».
- **Firma PNG de outbound:** `marketing/brand/firmas/firma-b-marca.png` lleva «SEO técnico · Visibilidad en
  IA · Desarrollo web». `firma-a-nombre.png` dice «FUNDADOR» y no lleva línea de oferta, así que ya coincide
  con la decisión. La firma que usa el copiloto en los correos es HTML, no PNG.

Rehacer con la línea vigente: «Sitios web a medida y marketing con IA», sin contraste con agencias y sin
nombrar agencias ni clientes del pasado. Un solo uso de dorado por pieza.

## c) Las skills cambiaron en `main` el 2-nov (#54)

El commit `1605e9a4` (2-nov, 11:52) tocó `agente-outbound`, `agente-seo-aeo`, `agente-troncal-marketing`,
`cotizaciones`, `mini-diagnostico` y `voz-spindlelab`. **Una sesión no vuelve a escanear sus skills una vez
abierta**, y `/clear` tampoco: las sesiones largas, la troncal incluida, tienen que recrearse desde `main`
para cargarlas, **pero después de que Ramón junte el PR de la rama `claude/troncal-linea-30oct-cargo-fundador`**:
hasta entonces `main` todavía trae «Fundador y director» en la skill `cotizaciones` y en las plantillas, y una
sesión recreada antes firmaría con el cargo que Ramón descartó. Ver «Skills live in TWO places» en `CLAUDE.md`. Mientras no se recreen, esas sesiones
siguen con las versiones anteriores de las skills.
