# Reel en LinkedIn: publicado en la página de empresa (19-oct-2026)

**Para:** la sesión del canal (rama `claude/relanzamiento-sep-social-wygda1`), que preparó el texto y las instrucciones.
**De:** la sesión de comunicaciones de LinkedIn (Renata), a pedido directo de Ramón ("sí, súbelo con ese texto corregido").

## Qué salió

- **Dónde:** página de empresa **SpindleLab**, video nativo. Verificado: el compositor mostró "SpindleLab · Publicar para Cualquiera" y el comentario salió como SpindleLab, "Autor".
- **Enlace:** `linkedin.com/feed/update/urn:li:ugcPost:7517938366471020544/?actorCompanyId=135255820`. En la lista de la página el mismo post figura también como
  `7517938438629752832` (el identificador "activity" más alto). Para el registro, el que abre el post es el `ugcPost`.
- **Texto publicado (4 párrafos, plural, sin "Si" al inicio, sin raya larga):**

  > Hay una ley nueva en Chile que protege los datos de las personas. Si tu sitio tiene un formulario de contacto, te incluye, aunque tu empresa sea chica.
  >
  > Y no, casi nunca hay que rehacer el sitio. Hay que mirarlo y saber qué le falta.
  >
  > En el video, Ramón lo cuenta en menos de treinta segundos.
  >
  > El chequeo gratis va en el primer comentario.

- **Primer comentario, como SpindleLab, en el mismo minuto:** "El chequeo: https://verifica.spindlelab.cl / Gratis, sin registro, y no guarda el dominio que revisas." Enlace activo.

## Tres cambios respecto del `publicar.md` de su rama (aprobados por Ramón antes de publicar)

1. **"en cuarenta segundos" pasó a "en menos de treinta segundos".** El archivo `verifica.mov` dura **27,93 s**.
2. **Se sacó "Una toma, sin edición."** El video lleva titulares grandes y subtítulos quemados ("¿Hace cuánto que nadie lo revisa?", "Hay una ley nueva."), así que "sin edición" no era cierto.
   Desde el archivo no se puede saber si es una sola toma.
3. **Se sacó del primer comentario** "Y si prefieres que lo miremos nosotros, escríbenos por acá y te mandamos una página con lo que encontramos, gratis, en 24 horas."
   Esa oferta **no existe en `verifica.spindlelab.cl`** (el formulario "Pídelo acá" es para pedir el kit o la revisión trimestral, y responden con qué harían y cuánto cuesta).
   La página gratis en 24 horas es la del diagnóstico de visibilidad en IA (`spindlelab.cl/diagnostico`). Si Ramón quiere ofrecerla también para Verifica, es decisión suya.

**Pedido:** actualizar el `publicar.md` de esa rama con el texto que realmente salió. También tiene una línea vieja en `INSTRUCCIONES-publicar-reel-linkedin.md`, sección 3 ("Acá es al revés: singular"),
que contradice el plural que se decidió el 19-oct.

## Cómo se subió (para no redescubrirlo)

- `verifica.mov` pesa 42,8 MB; **la herramienta de subida del navegador acepta como máximo 10 MB por llamada.** Se recomprimió a MP4 (H.264, 1080×1920, 2,3 Mb/s, AAC 128 kb/s, 27,93 s, 8,4 MB) en la carpeta temporal.
  El original en el escritorio no se tocó. Se comparó un fotograma: titular y subtítulo siguen nítidos.
- **LinkedIn no deja una entrada `<input type=file>` en la página:** la crea al hacer clic en el icono de medios y abre el selector nativo, que el navegador automatizado no puede manejar.
  Se resolvió interceptando `HTMLInputElement.prototype.click` y `showPicker` en la página (guardar el input y anexarlo al `body`, sin abrir el selector), y luego subiendo el archivo a ese input.
  Después: "Siguiente", escribir el texto, "Publicar". LinkedIn procesó el video unos 30 s ("Cargando... Falta menos de un minuto"; hay que quedarse en la página).
- LinkedIn **agregó subtítulos automáticos** al video ("Los subtítulos automáticos se han añadido a tu vídeo", con botón "Editar subtítulos"). El video ya lleva subtítulos quemados; quien active los de LinkedIn verá los dos.
  Queda a criterio de Ramón si los quita desde el post.

## El compartir de Ramón (decidido el 19-oct: "sí, escríbeme el comentario para compartirlo")

Lo comparte él desde su perfil, **con comentario propio, nunca el botón pelado**, y desde la **URL pública** del post (sin `?actorCompanyId=`), no desde la vista de administrador, que fija la identidad en la página
(`https://www.linkedin.com/feed/update/urn:li:ugcPost:7517938366471020544/`). Esta sesión no lo hace: es contenido en su perfil.

**Comentario del compartir (singular, sin enlace, sin "Si" al inicio):**

> El chequeo gratis del que habla este post de la página de SpindleLab lo armé yo.
>
> Revisa cinco cosas de tu sitio: si enlaza una política de privacidad que abre, si abre por https, si pide permiso antes de cargar rastreadores, si algún formulario trae la casilla de "acepto" ya marcada y qué servicios externos carga. No pide registro ni guarda el dominio.
>
> Pruébalo con el tuyo. El enlace está en el primer comentario.

**Primer comentario de Ramón bajo su compartir** (el enlace no va en el cuerpo, igual que en todos sus posts): "El chequeo: https://verifica.spindlelab.cl"

Respaldo de cada afirmación: las cinco cosas y "no pide registro ni guarda el dominio" salen de `verifica.spindlelab.cl`, sección "Lo que sí revisamos" y pie de página, leídas el 13 y el 19-oct. "Lo armé yo" es un hecho de Ramón (es el autor del servicio).

## Compartir de Ramón: hecho (19-oct, 10:40) y medición a las 48 h

- **Compartido** por Ramón desde su perfil, con el comentario propuesto (verificado en su perfil: texto idéntico y el video de la página embebido). Enlace: `linkedin.com/feed/update/urn:li:activity:7517942732221313024/`.
- ⚠️ **Al ratito de compartir (10:53) su compartir tenía 0 comentarios**: el primer comentario con el enlace (`El chequeo: https://verifica.spindlelab.cl`) todavía no estaba, y el texto dice "El enlace está en el primer comentario".
  Se le preguntó si lo pone esta sesión. Ver el estado en la próxima actualización de este archivo.
- **Medición pedida por Ramón: a las 48 horas** (miércoles 21-oct, ~10:45). Recordatorio agendado en el calendario de `hola@spindlelab.cl` con `manuvalleespin@gmail.com` como invitado (aceptado el método el 15-oct).
  Cómo medir: página `linkedin.com/company/135255820/admin/analytics/updates/`, tabla "Interacción con el contenido", fila del reel (impresiones, visualizaciones, clics, reacciones, comentarios, compartidos);
  y en el perfil de Ramón (`/in/me/recent-activity/shares/`), las impresiones de su compartir. Además, si en el chequeo aparecieron revisiones de origen orgánico (Cloudflare), anotarlas.

**Línea base, lunes 19-oct, ~10:58 hora de Chile (35 min después de publicar el reel y 18 después del compartir):**

| Pieza | Impresiones | Visualizaciones | Reacciones | Comentarios | Compartidos |
|---|---|---|---|---|---|
| Reel en la página | 4 | 6 | 0 | 1 (el de la página, con el enlace) | 1 (el de Ramón) |
| Compartir de Ramón en su perfil | 3 | n/d | 0 | 0 | n/d |

Para comparar, los dos posts de texto anteriores de la página: 15-oct, 12 impresiones; 13-oct, 60. La página tiene 13 seguidores y 8 de 50 créditos de invitación.

## Lo que sigue pendiente (no es de esta sesión)

- **El compartir de Ramón desde su perfil**, con comentario propio. La página tiene 13 seguidores; sin eso casi no llega a nadie. **Ramón aún no ha dicho si lo quiere** (el 25-sep rechazó un compartir). No se hizo.
- A los contactos, pedirles **comentar**, no compartir (ver las instrucciones).
- A las 48 h: impresiones del post y revisiones orgánicas del chequeo.
- Registrado en `marketing/redes/QUE-HAY-PUBLICADO.md` con el identificador.
