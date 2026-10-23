# Publicar · Carrusel "Lo que puedes revisar antes de contratar"

**Canal:** Instagram `spindlelab.cl` · carrusel de 6 láminas, **1080x1350 (4:5)**
**Estado:** LISTO PARA REVISIÓN DE RAMÓN. No publicado. Nada sale de un borrador generado.
**Pieza 2 de 3 del plan** `marketing/redes/2026-10-octubre-posicionamiento/PLAN.md` (§3 día 3, §5 pieza 2). Pilar 3: "Lo que se ve antes de contratar".
**Voz:** plural de marca. **Etiqueta de IA:** no corresponde (pieza tipográfica, sin imagen generada ni foto).
**Depende del sitio nuevo:** sí. Ver "Antes de subir".

**Orden de subida:** `lamina-1.png` → `lamina-6.png`. La portada es la 1.

---

## Cuándo

**Día 3 del calendario: jueves 29-oct-2026, Instagram 19:00**, si el sitio nuevo sale el martes 27-oct. Si el sitio sale otro día, esta pieza va el segundo día de publicación después del go-live, con un día vacío en medio, y la hora se mantiene. Las piezas de septiembre salieron a las 19:00; no hay dato propio para elegir mejor hora, así que se parte de ahí y se mira Insights después.

**Cadencia.** Es la 2.ª publicación de feed de esa semana (la 1.ª es `01-donde-se-cae-una-consulta`, el día 1). El tope de la cuenta es 3 por semana contando Verifica y Cumple: antes de programar, preguntarle a esa sesión si tiene feed agendado en la ventana. Si sale una de Verifica en la misma semana, la que se mueve es la del día 9 (PLAN §3), no esta.

**Familia visual.** Cartera (filas con valor). La pieza del día 1 es ficha tipográfica y la del día 5 es ficha con el botón congelado: nunca dos del mismo dispositivo seguidas.

**Programar solo después de confirmar el go-live.** Programar el lunes para el jueves y descubrir que el sitio no salió es la forma más barata de publicar una pieza que promete precios, método y revisión que todavía no existen.

---

## Pie de foto (copiar y pegar)

Está en `caption.md`, con el alt text de las seis láminas, el primer comentario y los enlaces con UTM. Texto final:

```
Puedes leer cuánto cuesta, cómo trabajamos y cómo revisamos tu sitio antes de hablar con nadie.

Lo dejamos escrito porque es difícil contratar algo que no puedes comparar. Cada solución tiene su precio de partida publicado, con lo que incluye. El método tiene cuatro pasos y el primero es una revisión gratis. Y el chequeo con el que revisamos tu sitio lo puedes correr tú: 21 señales, gratis y sin dejar tu correo.

El chequeo mide si tu sitio está listo para que la IA lo lea, no si hoy te citan.

Córrelo sobre tu sitio en spindlelab.cl/diagnostico. Si prefieres que lo veamos nosotros, pide la revisión de una página en spindlelab.cl/contacto.
```

Hashtags opcionales al final: `#SEO #IA #Chile`.

## Primer comentario

```
El chequeo de las 21 señales, sin registro:
https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=antes-de-contratar
```

## Historia (el mismo día, un minuto)

Compartir el post a historias desde la cuenta de la empresa y desde la personal. Sticker de enlace con la URL del chequeo de arriba (`utm_campaign=antes-de-contratar`). Es la única pieza del plan cuyo enlace de historia va a `/diagnostico/` y no a `/contacto/`, porque su gesto es "corre el chequeo".

---

## Antes de subir (checklist)

- [ ] **Confirmar que el sitio nuevo ya está publicado.** La home trae el H1 «Te llegan consultas. Veamos dónde se cae el resto.», `/contacto/` conserva `UTM Source`, `UTM Medium` y `UTM Campaign`, y `/metodo/` trae los cuatro pasos con la frase «Cada fase termina con algo que apruebas antes de seguir.» Si el método publicado dice otra cosa, se corrige la lámina 3 (`lamina-3.html`) y se re-renderiza.
- [ ] **Re-verificar los seis precios el mismo día** contra el sitio vivo (comando abajo), y las tres notas de fila de la lámina 2: "pauta aparte" (Google Ads), "el creativo lo pones tú" (redes) y "una página para una campaña" (web: el precio de $390.000 es el de la página de campaña; el sitio esencial parte en $690.000). Si cambia algo, se edita `lamina-2.html`, se re-renderiza y se actualiza `fuentes.md`. Verificados el 23-oct-2026.
- [ ] **Re-verificar "mínimo 3 meses"** en Acompañamiento mensual (mismo comando). La lámina 2 ya no lo dice de Google Ads: ver el pendiente de abajo.
- [ ] **PENDIENTE DE RAMÓN (decisión, antes de publicar): ¿Google Ads tiene un mínimo de 3 meses?** Hoy lo dice solo `/servicios/paid-media/` ("Mínimo 3 meses", también en el sitio vivo). Ningún documento comercial lo respalda (`informe-revision-externa`, `capacidad-servicios`, ventas) y el FAQ de la home nuevo solo lo declara para el acompañamiento mensual, así que una imagen que lo muestre contradiría la home. Por eso la lámina lo omite. Si **no** existe: corregir la página de Paid media (equipo del sitio). Si **sí** existe: agregarlo al FAQ de la home y a `copy-secciones.md` §2.8, y recién entonces volver a poner "mínimo 3 meses" en esa fila (`lamina-2.html`) y en `caption.md`.
- [ ] **Re-correr el chequeo sobre spindlelab.cl** y contar: 21 señales, 5 de acceso (30 puntos), 8 de entidad (40), 8 de citabilidad (30) (comando abajo). Verificado el 23-oct-2026.
- [ ] **Releer `/diagnostico/`:** que siga diciendo "Gratis y sin dejar tu correo", "No mide si hoy te citan" y, en el bloque "¿Te pueden leer?", que lo que importa es que entren "los bots en vivo" (la lámina 4 lo dice así; bloquear a los bots que entrenan no quita citas).
- [ ] Mirar la cuenta de Instagram, no el repo (regla de `QUE-HAY-PUBLICADO.md`): seguidores, bio, orden de enlaces, etiqueta "Perfil generado con IA". Anotarlo.
- [ ] Preguntarle a la sesión de Verifica y Cumple si tiene feed agendado esa semana (tope 3).
- [ ] Mirar las 6 láminas en el teléfono antes de programar: texto legible, sin cortes.
- [ ] Chequeo de aperturas y cierres de `pulso-redes`, mirando el canal y no este repo. Según `QUE-HAY-PUBLICADO.md` (que no vi contrastado con el canal), las piezas recientes de Instagram abren con una pregunta ("¿Estás seguro?", "¿Tienes un formulario de contacto?") o con un título de lista ("Las 12 cosas"); esta abre con una afirmación al lector ("Puedes leer") y cierra en la oferta, sin "Dejo X en el primer comentario".
- [ ] **Etiqueta de IA: no corresponde.** Ninguna lámina lleva imagen generada. La cuenta sigue con su propia etiqueta "Perfil generado con IA" (es de la cuenta, no de esta pieza; decisión pendiente de Ramón desde el 25-sep).
- [ ] Después de publicar: recargar, confirmar que salió y que el primer comentario quedó, anotar hora real en `QUE-HAY-PUBLICADO.md`.

**Comandos de verificación (correr el día de publicar):**

```
# precios y mínimos, uno por uno
for s in auditoria-seo-tecnica visibilidad-en-ia paid-media redes-sociales desarrollo-web acompanamiento-mensual; do
  echo "== $s"; curl -sL "https://spindlelab.cl/servicios/$s/" | grep -o '\$[0-9.]*\|[Mm]ínimo 3 meses' | sort -u
done

# las 21 señales y su reparto 30/40/30
curl -s "https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl" | python3 -c "
import sys,json; from collections import defaultdict
d=json.load(sys.stdin); g=defaultdict(lambda:[0,0])
for i in d['items']: g[i['bloque']][0]+=1; g[i['bloque']][1]+=i['peso']
print(len(d['items']), dict(g))"
```

Resultado esperado hoy: `21 {'acceso': [5, 30], 'entidad': [8, 40], 'citabilidad': [8, 30]}`.

---

## Notas de publicación

- **Los precios están en una imagen.** Envejecen y no se pueden editar sin re-renderizar. Por eso la lámina 2 lleva "octubre 2026" y el pie de foto no los repite. Si pasa un mes largo antes de publicar, repetir la verificación.
- **La lámina 3 hereda un matiz del copy del sitio.** «Cada fase termina con algo que apruebas» está probado en Desarrollo Web y no en los otros servicios (copy-secciones §11). "O te entregamos las especificaciones para que lo implemente tu equipo" está declarado: entregar especificaciones se puede, implementar sobre un sitio ajeno no se ha ejercido nunca. Son frases del sitio publicado; si el sitio las cambia, esta lámina las cambia.
- **Google Ads no lleva "mínimo 3 meses" en la lámina (corregido tras la revisión independiente).** La v1 lo agregó a esa fila porque `/servicios/paid-media/` lo dice, pero es la única fuente: el FAQ de la home y el resto de los documentos comerciales lo declaran solo para el acompañamiento. Una imagen no puede decir más que la home. Queda como decisión de Ramón (checklist). Mientras tanto la fila solo dice "pauta aparte", que sí está en todas las fuentes.
- **Tres filas de la lámina 2 llevan su condición (corregido tras la revisión independiente).** Redes: "el creativo lo pones tú" (`/servicios/redes-sociales/`: "Desde $390.000/mes · el creativo lo pones tú"; FAQ: "No los producimos"). Web: la fila se llama "Página web a medida" y dice "una página para una campaña", porque $390.000 es el pack de una página; el sitio esencial parte en $690.000. Una pieza cuya premisa es "puedes leer cuánto cuesta antes de hablar con nadie" no puede dejar que el lector entienda que el precio incluye lo que no incluye.
- **"Cómo medimos" ya no nombra al chequeo (corregido tras la revisión independiente).** `/diagnostico/` separa dos cosas: el chequeo "lee tu sitio" y "cómo medimos si la IA te nombra" es otro protocolo (cinco preguntas fijas por tres motores). La v1 llamaba "cómo medimos" a las 21 señales y la lámina 5 decía enseguida que eso "no mide si hoy te citan". Ahora la portada dice "cómo revisamos tu sitio" y la lámina 4 se rotula "Qué mira el chequeo". La pieza no muestra el protocolo de medición mensual; si algún día se quiere, es otra lámina y con sus cinco preguntas y tres motores reales.
- **Una sola vez el límite (corregido tras la revisión independiente).** La v1 decía el mismo límite (el puntaje de tu sitio no dice si te citan ni garantiza que te recomienden) cinco veces entre la lámina 5 y el pie. `copy-secciones.md` §1.4 pide decirlo una vez. Quedan el titular de la lámina 5, una línea de apoyo que explica el porqué, y una frase en el pie. Sale "Un puntaje alto tampoco garantiza que ChatGPT te recomiende" (sigue en el FAQ de `/diagnostico/`).
- **Cero plazos.** La revisión no dice "en un día hábil" ni "24 horas": la revisión de octubre de un prospecto tardó 31 h contra 24 prometidas y el plazo está sin decidir (copy-secciones, decisión 2).
- **La lámina 5 no dice que "lo hacemos a mano".** `/diagnostico/` agrega "Eso lo hacemos a mano" tras "hay que preguntarle a los motores". Se dejó fuera: la consulta real a ChatGPT es hoy un paso manual de Ramón y no una parte fija de la revisión (decisión 7). Si esa decisión cambia, se agrega.
- **Aviso para el equipo del sitio (no se toca desde esta carpeta).** `spindlelab-astro/functions/api/chequeo.js` (línea 1224, bloque `acceso`) todavía dice "Si los bots de IA no entran, nada más importa." sin distinguir a los bots que entrenan; la página `/diagnostico/` sí lo distingue ("los bots en vivo"). La lámina 4 sigue a la página. Conviene alinear el resultado del chequeo con la página.
- **Formato 4:5 (1080x1350), no cuadrado.** El plan hablaba de 1080x1080, pero con seis filas de precios y cuatro pasos el cuadrado obligaba a letra chica. En 4:5 el texto de apoyo no baja de 26 px (las etiquetas en mayúscula van de 21 a 22 px; las notas de fila de la lámina 2 son de 26 px en minúscula normal). La grilla del perfil recorta al centro (3:4) y todo el texto de la portada queda dentro de esa zona (márgenes de 80 px). Si Ramón prefiere cuadrado para igualar las otras dos piezas del plan, hay que rehacer la maquetación, no solo cambiar el tamaño.
- **Enlaces.** Ningún enlace del pie ni de las láminas es tocable. La dirección está escrita completa (sin "link en la bio": el bio puede apuntar a otro producto según el orden de enlaces de ese día). El UTM vive en el sticker de la historia y en el primer comentario.
- **Se lee por Insights y GA4, no por el correo.** El chequeo no captura leads. Lo que sí es lectura de esta pieza: guardados y compartidos (es una pieza para mandarle a quien pregunta "¿y cómo trabajan?"), toques del sticker de la historia y visitas a `/diagnostico/` con `utm_campaign=antes-de-contratar`. No se promete ninguna cifra.
- **No es la palanca del plan de ventas** (PLAN §0.6): con 19 seguidores, el valor es que el perfil diga lo mismo que el sitio y que Ramón tenga algo que mandar por correo o WhatsApp.

## Texto alternativo por lámina

Está completo en `caption.md`. Resumen:
1. Portada: "Puedes leer cuánto cuesta, cómo trabajamos y cómo revisamos tu sitio antes de hablar con nadie."
2. Seis soluciones con precio de partida, más IVA, octubre 2026, con sus condiciones de fila (pauta aparte, el creativo lo pones tú, una página para una campaña, mínimo 3 meses solo en acompañamiento).
3. Los cuatro pasos del método y "Cada fase termina con algo que apruebas antes de seguir."
4. "Qué mira el chequeo": "21 señales", tres preguntas con 30, 40 y 30 puntos; gratis y sin dejar el correo.
5. "Lo que no mide el chequeo": "No mide si hoy te citan." y una línea de apoyo (depende de fuentes externas; hay que preguntarle a los motores).
6. "Córrelo sobre tu sitio, sin registro." con spindlelab.cl/diagnostico y, en letra chica, spindlelab.cl/contacto.

---

## De dónde sale cada dato

El detalle afirmación por afirmación, con archivo y comando, está en `fuentes.md`. Resumen:

| Dato | Fuente |
|---|---|
| Seis precios, "desde", más IVA, "pauta aparte", "el creativo lo pones tú", "una página para una campaña", "mínimo 3 meses" (solo acompañamiento) | `spindlelab-astro/public/servicios/*/index.html` (las seis); comparados con el sitio vivo el 23-oct |
| Cuatro pasos y "Cada fase termina con algo que apruebas" | `copy-secciones.md` §2.4 y §6; `spindlelab-astro/public/metodo/index.html` |
| 21 señales, 30/40/30, gratis y sin correo | `spindlelab-astro/functions/api/chequeo.js`; `public/diagnostico/index.html`; API consultada el 23-oct |
| Lo que el chequeo no mide; fuentes de terceros; "si los bots en vivo no entran" | `public/diagnostico/index.html` (bloque "Lo que este chequeo no mide", FAQ y bloque "¿Te pueden leer?") |
| Revisión gratis de una página | `public/diagnostico/index.html`, `public/contacto/index.html`, `copy-secciones.md` §2.1 |

---

## Chequeo de marca (hecho, no supuesto)

- **Un dorado por lámina.** Láminas 1, 2, 3, 5 y 6: el punto del wordmark. Lámina 4: el número "21", y ahí el punto del wordmark va en crema `#f2efe8`, como lo resuelve la pieza modelo de octubre. Contado sobre los PNG (ver "Producción"). Las notas de fila de la lámina 2 siguen en verde petróleo (etiqueta), no en dorado.
- **Verde petróleo solo en etiquetas:** el rótulo de arriba de cada lámina, la numeración 01 a 04, las notas de fila de la lámina 2 ("pauta aparte", "el creativo lo pones tú", "una página para una campaña", "mínimo 3 meses") y el rótulo "El chequeo, gratis". Nunca en el cuerpo.
- **Cero serif.** Gabarito en titulares, Manrope en cuerpo.
- **Cero Title Case** ("Auditoría SEO técnica", "Página web a medida").
- **Cero raya larga ni media**, ni en las láminas ni en el pie de foto ni en estos archivos.
- **Cero "¿Listo para…?".** El cierre dice qué pasa al hacer clic: correr el chequeo o pedir la revisión.
- **Cero cifras de resultados, clientes, logos o testimonios.** Las únicas cifras son precios publicados, el número de señales y su peso.
- **Cero nombres de prospectos y cero Ley 21.719.** La campaña de Verifica y Cumple queda en su línea.
- **Registro plural** ("dejamos", "revisamos", "pide la revisión"), tuteo para el lector.
- **Apertura y cierre distintos** de las otras piezas del plan: el pie abre con una afirmación al lector, no con "Si" ni con una pregunta, y cierra en la oferta.

## Producción

`bash marketing/redes/_tools/render.sh lamina-N.html 1080 1350` desde esta carpeta. Los estilos propios del carrusel están en `antes.css`, que extiende `base.css` (copia exacta de `2026-09-septiembre/_sistema/base.css`, sin tocar) y solo sube el alto a 1350. Reciclar es volver a renderizar desde el HTML, nunca republicar el PNG.

**Verificación sobre los PNG finales (23-oct-2026), medida y no supuesta.** Tras la revisión independiente se re-renderizaron las láminas 1, 2, 4 y 5 (las únicas con cambios) y se volvió a medir todo, sobre las seis:
- Los seis PNG miden 1080x1350 y los seis fueron abiertos y mirados uno por uno.
- **Oro contado sobre los píxeles:** láminas 1, 2, 3, 5 y 6 tienen una sola zona dorada (el punto del wordmark, 56 px). La lámina 4 tiene solo el "21" (las dos cifras) y ningún dorado en el wordmark. Ninguna lámina tiene dos usos.
- **Márgenes medidos en el DOM del render:** todo el texto queda entre x=80 y x=1000 (margen de 80 px a cada lado). Hueco entre el último texto del cuerpo y el wordmark: lámina 1, 368 px; lámina 2, 66 px (la más cargada tras agregar dos notas de fila); lámina 3, 73 px; lámina 4, 179 px; lámina 5, 324 px; lámina 6, 309 px.
- **Sin desbordes ni solapes:** ningún elemento sale de su caja. La lámina 3, la más cargada, tuvo un solape entre su cierre y el pie en la primera pasada; se compactó y se volvió a medir.
- **Tipografías:** solo Gabarito y Manrope, ambas cargadas desde la carpeta (rutas relativas); el signo "¿" y la "ñ" salen en Gabarito, sin caer a una fuente de reemplazo.
- **Tamaño de texto:** el apoyo no baja de 26 px, y eso incluye las notas de fila de la lámina 2 (26 px, minúscula normal, sin tracking; antes eran 19 px en mayúscula). Las etiquetas en mayúscula van de 21 a 22 px (rótulo superior, numeración y "El chequeo, gratis"). Revisado también en una hoja de contactos a 390 px de ancho: las notas se leen.
- **Nota de origen:** el README de `marketing/redes/` nombra la plantilla como `2026-09-septiembre/base.css`; el archivo vive en `2026-09-septiembre/_sistema/base.css`. De ahí salió la copia de esta carpeta.
