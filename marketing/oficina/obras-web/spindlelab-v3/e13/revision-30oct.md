# Revisión del 30-oct: los textos nuevos del v3 frente a la idea del troncal

**Quién:** la sesión que adaptó el v3 al modelo (rama `claude/v3-modelo-nuevo`), a pedido de Ramón: «revisa los textos que van saliendo y voy corrigiendo para que tomes nota; vigilar que no se arranque de la idea del troncal».
**Qué se revisó:** `claude/magical-franklin-ckfki2` en `790f63a0` (30-oct, 14:37), construida aparte: 22 páginas, 0 enlaces rotos, `barrer-terminos.mjs` sobre su `dist`. Textos leídos: `copy/sitio-propio-direcciones.md`, `desvios/texto-30oct.md` y las páginas construidas.
**No se tocó ni se publicó nada de esa rama.** Esta nota es solo lectura sobre ella.

## 1 · Lo que Ramón corrigió o decidió el 30-oct (tomado de sus textos, para no volver a proponerlo)

- **«Te llegan consultas. Veamos dónde se cae el resto.» queda muerto.** «No calienta a nadie.» El negocio principal es el desarrollo web: es la pieza del motor a la que él apela como «spindle».
- **Titular elegido:** «En redes arriendas. Tu sitio es lo único que es tuyo.» + rótulo «Sitios web a medida y marketing con IA». La entradilla y la sección 2 vienen de la dirección B («Todo lo que haces para vender termina en tu sitio»); la sección 2 cierra nombrando los demás servicios.
- **Botón:** «Hablemos de tu sitio» (en el encabezado, «Hablemos»). El recuadro anterior «no se entendía». Quita «Pedir la revisión de una página» de todo el texto visible. El microcopy sostiene los dos casos: con sitio, revisión gratis y respuesta en un día hábil; sin sitio, cómo lo haríamos y cuánto cuesta.
- **Color:** el blanco del botón le molesta. Va el amarillo de Koto `#FFE800` (texto `#060606`), lleno o con contorno.
- **Logo:** la «cruz» de la i «se ve horrible». Dos opciones (i normal con punto redondo, o i con un disco aplanado). Sin elegir.
- **Quién está detrás:** «no está profesional», «no tiene mucha épica». Pasa a tercera persona, sin agencias ni clientes por nombre ni cifras, sin «SpindleLab soy yo» ni «pocos proyectos», sin explicar el nombre literalmente.
- **Para quién:** «empresas que ya venden» queda; se suma que quien parte sin sitio también entra («es lo primero que hacemos»).
- **Ley 21.719:** el 28-oct el Senado aprobó la postergación; la fecha legal sigue siendo el 1-dic-2026 mientras la ley no se publique; no se escribe la fecha nueva (15-oct-2027) porque la Cámara puede cambiarla.

## 2 · Lo que sigue alineado con las reglas del troncal (verificado en el `dist`)

- Precios idénticos a `main` (guardianes del build en verde; $390.000 el sitio, sin cambios).
- Cero rayas largas o medias, cero «¿Listo para…?», cero «24 horas», cero «partners», cero «Más elegido», cero promesas de citación o de puntaje, cero «sin compromiso», cero nombres de agencias o clientes.
- Plazo único: «un día hábil».
- ICP: quien no tiene sitio SÍ es cliente (memoria `spindlelab-icp-sin-sitio`): la home lo dice ahora de frente.
- Mi arreglo de la atribución (captura de `utm_*` en `PaginaA.astro`) sigue en esa rama: el archivo es idéntico al mío.
- Combeau sigue como único caso; Praxi y los cuatro conceptos siguen fuera.
- La idea del troncal («dónde se pierde lo que se invierte») **no se perdió: bajó del titular a «Quién está detrás»** («casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva»).

## 3 · Lo que SÍ se movió respecto de la idea del troncal (decisión de Ramón, pero hay que escribirla)

El troncal fijó el 23-oct «socio de marketing y crecimiento con IA para empresas que ya venden» y el modelo v1 (Camino A: probar como hipótesis dentro del corte del 3-dic, «sin tocar sitio ni mensaje»). El 30-oct Ramón puso el sitio a medida como línea principal. Tiene respaldo en los datos (los únicos dos clientes son de Desarrollo Web; 0 de 142 en frío), pero cambia lo que se mide:

1. **Si el v3 se publica antes del 3-dic, el corte mide otra oferta** que la de la hipótesis. O el v3 espera, o el modelo se reescribe (v1.1) antes de publicar. Lo decide la troncal con Ramón.
2. **Fuera del sitio todo sigue con la línea anterior:** outbound, bios de LinkedIn, `llms.txt` del sitio vivo, el v2 en producción. La otra sesión también lo anotó para la troncal.
3. **Las imágenes al compartir:** la de la home (`og-e12-marca.jpg`) todavía dice el titular muerto y el rótulo viejo (lo vi); `og-e12-nosotros` y `og-e12-contacto` también están en su lista. **Falta en su lista:** el logo con la cruz de la i está horneado en las ~25 imágenes al compartir; cuando Ramón elija logo hay que regenerarlas todas, con `?v=` nuevo. (`og-posicionamiento.jpg` ya no la usa ninguna página: se puede borrar.)

## 4 · Frases a vigilar (regla en juego)

| Frase | Dónde | Regla | Qué hacer |
|---|---|---|---|
| «casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva» | Home, Quién está detrás | cero afirmaciones sin fuente | que Ramón la confirme como su experiencia, o «muchas veces» |
| «El código de cada entrega lo revisa y lo aprueba él» | por confirmar | solo método verdadero | confirmar que vale para entregas a clientes (en Praxi 50 de 219 commits fueron directo a `main`) |
| «Va en tu dominio, a tu nombre» / entrega del código | borrador de la sección 2 | solo hechos confirmados | no escribirlo hasta que Ramón diga que el dominio queda a nombre del cliente y que se entrega el código |
| «Google y las IA pueden leerlo y citarlo» | sección 2 | no prometer citación | se queda: dice posibilidad, no resultado |
| «lo único que es tuyo» | titular | absoluto | es el gancho que Ramón eligió; la sección 2 debe sostener que también se gestionan las redes (ya lo hace) |
| un solo «yo» en `home.pruebas.propio` | Home | voz singular/plural | decidir: plural («lo corrimos sobre nuestro propio sitio») o dejarlo como hallazgo propio |
| «Fundador y director de SpindleLab» | pie de Quién está detrás | sin sugerir equipo | para una firma de una persona basta «Fundador» |
| botones «Chequear mi sitio ahora, sin registro», «Pedir la revisión…» | home, servicios, método, /diagnostico/ | una sola acción principal | alinear con «Hablemos de tu sitio» o dejar los propios de cada página, pero que el método ya hable también a quien no tiene sitio |

## 5 · Qué hice en esta pasada

- Puse al día mis herramientas: `barrer-terminos.mjs` ya no marca «diseñamos y programamos sitios a medida» (la línea nueva de Ramón) y la guía de roles §3 lo dice.
- **Marqué mi corte `claude/v3-publicacion` como viejo** (ver el aviso arriba de `lista-publicacion.md`): lleva el texto del 26-oct, con el titular que Ramón mató. **No se debe mergear.** Para publicar hay que rearmarlo desde el árbol de la otra rama cuando Ramón cierre el texto, con `armar-corte.mjs` (receta en `lista-publicacion.md`), regenerando el sitemap (`lastmod`), repitiendo la batería de verificación y pidiendo el cierre exprés de Javiera en contexto limpio.
- No cambié la rama de la otra sesión ni mi rama de obra en lo que ellos ya cubren (Ley 21.719, titular, botón): para no duplicar ni pisarnos.
