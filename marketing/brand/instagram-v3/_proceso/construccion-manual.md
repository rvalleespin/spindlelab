# Lo que dijo quien escribió el manual v3.0

Reescribí el manual de marca como v3.0, con fecha 7-oct-2026. Ahora copia el sistema del sitio v3, y cada valor corregido cita su fuente: el CSS del sitio, la spec, el lock o las decisiones del 7-oct. No hice git y no toqué `spindlelab-astro`.

Archivo: `/home/user/spindlelab/marketing/brand/manual-de-marca.md`

**Hay cinco valores en los que el manual y el kit no coinciden. Hay que elegir uno antes de la QA.** El kit (`instagram-v3/`) apareció mientras escribía. Ajusté el manual al kit donde su razonamiento era igual de sólido que el mío: el radio y el tamaño mínimo del wordmark. Los cinco que quedan distintos:

| Tema | Manual (todo lo del sitio a 390 × 2,77) | Kit |
|---|---|---|
| Margen | 90 px (34 del recorte + 56) | 72 px |
| Display | 108 px | 136 px (`post-titular`) y 132 px (`post-campo`) |
| Texto | h1 100 · h2 61 · guía 55 · cuerpo 47 | h1 76 · h2 56 · guía 44 · cuerpo 40 |
| Llamado y precio | guía 55 / precio 44 | 36 px los dos |
| Cifra de `carrusel-dato` | h1 de 100 px | «8» de 460 px en peso 500 |

En la cifra, el manual lo justifica así: en el sitio ningún texto es más grande que el h1, salvo el display y el wordmark del pie. Una cifra de 460 px en una lámina interior es un segundo grito. La decisión 3 no lo cubre literalmente, porque no está en 800.

Un detalle de copy en `post-campo-desarrollo.html`: dice «con el mismo chequeo». La spec (§7, 5-oct) cambió eso fuera de la home, porque ahí no remite a nada; propone «con el chequeo gratis».

**Qué cambió por sección:**
- **Cabecera:** las piezas de Instagram las rige el §10 y el kit, ya no `marketing/redes/README.md`. Verifica y Cumple queda fuera, con su línea propia. El sitio vivo sigue con su sistema hasta que la v3 se publique. Puse la rama vigente y agregué al estado de decisiones driftime como vara (5-oct) y las decisiones de Instagram (7-oct).
- **§01 Esencia y §03 Monograma:** vigentes. En el monograma solo agregué que no aparece en `/v3/` y que en Instagram el avatar se recorta en círculo.
- **§02 Wordmark:** la forma sigue igual. Corregí el punto: va en papel en el pie del sitio y en el color del texto sobre brasa o petróleo, donde el oro no llega a 3:1. La única placa es la del módulo de navegación. El mínimo de 120 px tiene una excepción medida en ese módulo. Gabarito es un archivo de peso fijo 600, y anoté los dos espaciados que usa el sitio.
- **§04 Color:** tokens copiados de `driftime.css`. El gris oscuro `#161616` reemplaza al azul tinta como superficie, y el gris `#9AA4B0` (8,31:1, no 6,9) reemplaza al humo. El texto sobre un campo va siempre al 100 %; solo superficies y líneas llevan opacidad. Medí cuánto campo hay: home 48,1 %, servicios 45,0 %, el resto 0 %. Saqué «ninguna página sin campo», que sigue abierto en la spec. §04b no cambia.
- **§05 Tipografía:** Inter sale del sistema. Puse la escala real del sitio a 1440 y a 390. El límite de 68 caracteres por línea se implementa en em, no en ch.
- **§06 Punto dorado:** pasa de tres usos a uno, el punto del wordmark, uno por vista o por lámina. El oro dentro de una foto cuenta. §06b sigue igual, con una nota sobre cómo lo usa la v3.
- **§07 Forma y movimiento:** radio de 6 px y 4 px solo en controles y etiquetas. Márgenes y separaciones como dos valores distintos. Aire entre secciones de 180 a 200 px (no 256). Botón papel con texto negro, también sobre campos. Efecto vidrio en dos lugares solamente, sin tarjetas. Sumé una tabla con los componentes del sitio que una pieza puede copiar. En movimiento: la entrada animada existe y hoy ninguna página la usa, el scroll suave de Lenis está en uso y el paralaje está definido pero sin uso.
- **§07b Imagen (nueva):** el banco de fotos con medidas y textos alternativos, los mockups y qué imágenes llevan etiqueta. Raigal siempre rotulado como concepto. La regla de Unsplash de la decisión 6. Medí el oro dentro de las fotos: la foto plana de Combeau modelo y el video del hilo cuentan como oro. También la lista negra y el video.
- **§08 Voz:** sigue igual, más sin «acá», sin voseo e Instagram en plural de marca. Anoté que la skill de voz choca con el «sin acá».
- **§09 Aplicaciones:** retiré las plantillas de posts 1080×1080 y sumé la imagen OG v3 y el kit. El banner de LinkedIn queda por rehacer porque usa una foto de la lista negra.
- **§10 Instagram (nueva):** formatos y zonas seguras con fuente; la traducción del sitio a 1080; márgenes, escala medida y color por pilar; los nueve tipos de pieza del kit; portada, interior y cierre del carrusel; llamado y precio; exportación, lo que no se hace y lo que decide Ramón.
  - **Reels:** la zona segura no es 250/340 como fijaba la decisión 1. Mandé la fuente de Meta: 270 px arriba, 672 abajo, 65 por lado, y libre la columna de íconos de la derecha. Las stories orgánicas siguen en 250/340.
  - **Traducción a 1080:** cada medida del sitio a 390 px de ancho se multiplica por 2,77. Eso incluye el radio, que queda en 17/11 px de lienzo, y el wordmark, que no baja de 70 px.
  - **Medición:** con las fuentes cargadas, «CONTINUIDAD» a 108 px mide 747 px y cabe en los 900 px útiles.
  - **Precio:** como máximo un «Desde $X + IVA» por publicación y nunca la lista completa de precios.
- **Historial:** agregué la v3.0 con qué cambió y por qué (tu pedido del 7-oct); el historial anterior queda intacto.

**Qué decide Ramón antes de la primera publicación (§10.11):**
- Si la bio sigue apuntando al chequeo o pasa a verifica. Si cambia, el llamado «Chequea tu sitio gratis. Enlace en la bio» manda al lugar equivocado.
- Si se queda en 4:5 o pasa a 3:4.
- Confirmar el radio: apliqué la decisión 5 a escala del sitio. Si la quería literal, 6/4 px quedan casi rectos en el teléfono.
- Volver a capturar la cuenta: la última captura es del 25-sep y tiene dos publicaciones sin identificar.

La sección final del manual, «Lo que queda desactualizado fuera de este manual», tiene las rutas exactas para que las actualices. Son las skills `persona-director-creativo` (línea 59), `voz-spindlelab` (`SKILL.md`:43 y `corpus.md`) y `persona-social-media`. En redes: el README, las dos plantillas v2 `_sistema/base.css`, `_tools/render.sh`, `instagram-spindlelab-directrices.md`, `perfil-instagram.md`, las plantillas viejas de posts, los dos borradores de octubre con tema Verifica y `QUE-HAY-PUBLICADO.md`. En la oficina: la ficha `clientes/spindlelab.md`, las memorias de Bruno y Cata y el organigrama (línea 58). También `CLAUDE.md` (líneas 105 y 121) y tres notas de la spec y de `driftime.css` que las corrige su dueño.