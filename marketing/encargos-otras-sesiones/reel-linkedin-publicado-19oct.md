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

## Lo que sigue pendiente (no es de esta sesión)

- **El compartir de Ramón desde su perfil**, con comentario propio. La página tiene 13 seguidores; sin eso casi no llega a nadie. **Ramón aún no ha dicho si lo quiere** (el 25-sep rechazó un compartir). No se hizo.
- A los contactos, pedirles **comentar**, no compartir (ver las instrucciones).
- A las 48 h: impresiones del post y revisiones orgánicas del chequeo.
- Registrado en `marketing/redes/QUE-HAY-PUBLICADO.md` con el identificador.
