# Memoria — Bruno (persona-director-creativo)

**Rol:** Artesanía visual — composición, imagen, video, tipografía aplicada, ritmo.
Defino el "cómo se ve"; el "qué decir" es de Renata/Cata.
**Carpeta de trabajo:** la del cliente. Para Praxi: `brand/lanzamiento/` en su repo.
**Skill:** .claude/skills/persona-director-creativo/SKILL.md

## Estado actual
- 2026-09-02 — **SpindleLab, sprint de dirección creativa con Ramón en vivo.** Concepto
  rector cerrado: **"el eje y el circuito"** — SpindleLab no es solo el eje del negocio,
  es el circuito que lo enciende; el argumento pasa de "no apareces en la IA" (territorio
  saturado) a **"por qué tu sitio no convierte"**. Pieza del jue 3 producida con el dominó
  (idea de Ramón): `_reserva/sprint-concepto-02sep/kv-F-domino.png`. Lleva un **"desde"**
  de precio, decisión suya que reencuadra el addendum del 31-ago (la regla era sin
  CARTERA, un "desde" es umbral de entrada). Copy encargado a Renata: el aprobado quedó
  fuera de concepto. **Créditos gastados: 0,24** (dos tandas de `soul_location`).
- 2026-08-31 — **SpindleLab, relanzamiento de septiembre.** Encargo de Marta entregado
  completo (las 3 entregas en una tanda, para el Pase 1+2 del 31-ago): anuncio del motor
  en 3 direcciones, 5 re-renders de agosto, carrusel del chequeo, stories y la pieza del
  8-sep con copy provisional. Todo en `marketing/redes/2026-09-septiembre/` (su README
  tiene el detalle). Créditos Higgsfield: 0. Falta el pase de Ramón.
- 2026-08-07 — **Praxi, campaña de lanzamiento (20-ago).** Reencuadrada al eje
  memoria · evidencia · ejecución. Piezas 01, 02 y los overlays del reel rehechos;
  carrusel v2 a medias; las 5 piezas de siembra bloqueadas por falta de `ffmpeg`.
  Detalle y estado por pieza: `marketing/oficina/clientes/praxi.md`.

## Aprendido a pulso (gotchas)

- **"Facebook está bloqueado" era diagnóstico falso.** `curl` a facebook.com devuelve 200
  por el proxy; lo que fallaba era **Chrome**: no hereda `HTTPS_PROXY` (hay que pasarle
  `--proxy-server`) y su ClientHello post-cuántico moría en el túnel — el síntoma delator
  fue que **también fallaba google.com**, no solo el host "bloqueado". Receta completa en
  `2026-09-septiembre/_reserva/sprint-concepto-02sep/competencia-adlib/hallazgos.md`.
  **Principio: antes de reportar un host como bloqueado, probarlo con `curl` y con OTRO
  host; si los dos caen, el problema es mi herramienta, no la política.** (2-sep)
- **Cambiar el fondo NO es rediseñar la pieza.** Entregué la misma ficha con otra textura
  y Ramón lo cazó al toque. Si el titular, la estructura y la jerarquía son los mismos,
  cambió el papel, no el diseño. (2-sep)
- **Mirar la biblioteca de anuncios ANTES de proponer concepto.** Mi ruta "recomendada"
  resultó ser el anuncio más corrido de la categoría (Webpositer, 6+ variantes de "Si no
  apareces tú, aparece tu competencia"). Media hora de Ad Library habría ahorrado el
  sprint entero. (2-sep)
- **La Ad Library dice qué SOSTIENEN, no qué rinde.** Se mide por antigüedad del ángulo y
  reposición de creatividades (Honoralia: 43 días, 15 piezas), nunca por "está activo".
  Ojo con "total active time <1 hr" en creatividades sueltas: rotan muchísimo. (2-sep)
- **Un relato visual mal armado se anula solo.** La v1 del circuito dejaba encendido el
  tramo posterior al corte: si igual pasa energía, el corte no significa nada. **Revisar
  que la pieza no se contradiga a sí misma, no solo que se vea bien.** (2-sep)
- **Una foto generada trae elementos que contradicen el relato; se arreglan con el
  ENCUADRE, no regenerando.** En el dominó, una ficha del fondo caía en dirección
  contraria y ensuciaba la inercia de la corrida. Reencuadrar costó cero créditos y
  segundos. **Antes de gastar en regenerar, preguntarse si sobra algo que se puede
  sacar del cuadro.** Lo cazó Ramón, no yo: yo miré el PNG y no lo vi. (2-sep)
- **La idea del cliente puede ganarle a la mía, y hay que decirlo.** Yo llevaba una elipse
  tipo constelación; Ramón dijo "dominó" y era mejor: un diagrama se lee, una consecuencia
  se siente. (2-sep)

- **En sesión cloud, Chrome headless pinta ~85 px menos que el `--window-size` pedido:**
  un `--window-size=1080,1080` deja una franja blanca abajo y el PNG sale mutilado, no
  corto. Se renderiza con holgura y se recorta. Script listo:
  `marketing/redes/_tools/render.sh <html> <ancho> <alto>` (sirve igual en Mac). El
  defecto NO se ve en el HTML: solo mirando el PNG. (31-ago)
- **Reciclar una pieza NO es sobrescribirla.** El mes viejo se deja intacto y el
  re-render sale con el nombre de su nueva fecha, en la carpeta del mes nuevo. Si no,
  se pierde el original y nadie puede comparar qué cambió. (31-ago)
- **Al reciclar, auditar la pieza contra el estado ACTUAL del negocio, no solo cambiar
  la firma.** La lámina 7 del carrusel prometía "gratis en 48 horas" cuando la promesa
  ya era 24 y la oferta ya no era un diagnóstico nuestro sino un chequeo autoservicio.
  Nadie lo había pedido; se ve leyendo la pieza al lado del sitio vigente. (31-ago)
- **Un defecto heredado sigue siendo un defecto.** El titular de 3 líneas del 18-ago ya
  chocaba con el wordmark en agosto. Re-renderizar "fiel" lo habría republicado. Se
  arregla y se declara el cambio, no se arrastra. (31-ago)
- **Si falta el copy, se entrega la maqueta marcada, no se traba la entrega.** El dato
  puede salir de una fuente real (el sitio); la redacción se marca como provisional y de
  quién es. Un re-render son segundos. (31-ago)

- **Revisar el titular CONTRA el cuerpo, no cada uno por su lado.** Una pieza puede
  argumentar una cosa y firmarse con otra sin que nadie lo note: la 01 de Praxi
  demostraba memoria en el globo y se titulaba con el eje viejo. (7-ago)
- **El drift guion→pieza no se ve leyendo el texto; se ve mirando la pieza
  montada.** El reel v1 se produjo sobre un ángulo que su propio guion no pedía.
  Al cerrar una pieza de video, releer el guion al lado del montaje. (7-ago)
- **Renderizar y MIRAR siempre.** Tres defectos de la 01 —globo tapando al sujeto,
  440 px muertos, palabra huérfana— eran invisibles en el CSS. (7-ago)
- **Los pesos tipográficos que no se descargan no existen.** Gabarito viene en
  500/600/700; pedirle 800 o 900 renderiza idéntico al 700. Vale para cualquier
  cliente: **verificar qué pesos carga el `layout`, no qué pesos declara la marca.**
- **Preguntar SIEMPRE para qué cliente se produce.** Soy multicliente; una pieza
  impecable en la identidad equivocada está mal. Cargar su ficha primero.
- **No hay `ffmpeg` ni Homebrew en esta máquina.** No prometer un MP4 terminado:
  se entregan clips + overlays transparentes + receta de montaje para CapCut.
- **Trabajar en worktree propio.** Los repos viven en `~/Projects/` (SpindleLab y
  Praxi; se movieron desde iCloud el 1-sep-2026) y hay más de una sesión encima;
  commitear sin worktree hace aterrizar el trabajo en la rama ajena, y el push
  reporta éxito sin empujar nada. La razón es la concurrencia, no dónde viva el repo.
- **Verificar el alfa de los overlays** (color-type del PNG = 6). Un overlay opaco
  tapa el video entero y solo se descubre en el montaje.
- **En pauta, el riesgo de política no está en el copy sino en el metraje.** Para
  salud/fitness en Meta: nada de antes/después ni primeros planos de abdomen.

## Landings con movimiento — técnicas rescatadas (3-sep-2026)

Vienen del *Landing Builder / F.R.A.M.E.* de Ben Corde (video "Páginas Web ANIMADAS con
Claude Design"). **La skill NO se instaló** — falla las 3R y trae reglas ajenas (estética
fija tipo Apple/Linear, testimonios inventados, cero SEO). Lo que se rescató son estas
técnicas de producción, ya traducidas a nuestras herramientas:

- **Hero animado = dos frames + la transición, no un video largo.** Se generan el frame
  inicial y el final de la MISMA escena (un instante después: rotación leve, luz que se
  desplaza, partículas en otro patrón), y solo se anima la transición entre ambos, ~7 s,
  **cámara fija**. Mucho más barato y controlable que pedir un clip largo, y encaja con el
  tope de 2 intentos de video-IA por escena, que **sigue vigente**.
- **Todo con Higgsfield; ChatGPT Images 2 no hace falta.** El archivo original pedía
  ChatGPT Images 2 para los frames. Nosotros ya generamos imagen ahí (`soul_location` para
  fondos editoriales, muy barato) y video también (la cascada del dominó salió con Seedance
  1.5). Un eslabón menos y una suscripción menos.
- **Al generar el frame 2, adjuntar el frame 1 como referencia explícita.** Si no, el
  modelo devuelve otra escena en vez de la misma un instante después. Es problema del
  modelo, no de la herramienta: vale igual con cualquiera.
- **Dos formas de lograr el loop, y la más simple es la que se usa en la práctica.**
  (a) **Mismo frame de inicio y de fin:** en Higgsfield se sube *la misma imagen* como
  start y end frame, y se agrega al prompt `make it perfectly loopable`. Loop perfecto,
  movimiento sutil, cero trabajo en el reproductor. **Esta es la que hace el video.**
  (b) **Dos frames distintos + ping-pong** (reproduce y vuelve al revés), con
  `animation-direction: alternate` o un listener de `onended` que invierta la
  reproducción. Permite más cambio visible, pero es más difícil de acertar.
  *Corrección del 3-sep: la primera versión de esta nota solo traía la variante (b),
  que es la que describe el archivo de la skill; en el video la práctica real es (a).*
- **Cámara fija en el hero.** El movimiento de cámara pelea con el texto encima; el motion
  va dentro de la escena, no en el encuadre.
- **La referencia visual puede venir de donde sea** (Motion Sites —Ramón tiene acceso—, un
  video, una revista). Se extrae el **espíritu**, no se copia el contenido.

**Economía de sesión — el argumento real del video, y sirve para cualquier trabajo en un
constructor visual.** El framework existe porque improvisar dentro de Claude Design se come
la sesión semanal en 20 minutos. La planificación se hace en el chat, que es prácticamente
ilimitado, y al constructor se llega con todo resuelto para gastar un solo one-shot.
Tácticas concretas:

- **Un mensaje con todos los cambios**, no diez mensajes con uno cada uno.
- **Los tweaks del canvas** (los sliders) para colores y estilo, en vez de pedirlos por
  prompt.
- **Dibujar sobre el diseño y dejar comentarios** en lugar de describir el cambio en texto.
- Si el resultado no convence, **refinar con tweaks antes que con prompts nuevos**.

**La entrega (lo que el archivo de la skill omitía):** desde el constructor sale un zip o
un handoff a Claude Code. De ahí a GitHub **primero** (versiones e historial, no se rompe
la página viva) y recién después a producción. Nosotros ya estamos en Cloudflare Pages, y
el video confirma que Cloudflare resuelve dominio y DNS de una.

**Dos límites que no se negocian en este pipeline:**

- **La landing sale como sitio de ejemplo de SpindleLab** (decisión de Ramón, 3-sep). No se
  entrega si no está optimizada bajo nuestros estándares: la pasada de Diego (JSON-LD,
  canonical, meta tags, enlaces internos, sitemap) y el peso del hero medido. Una pieza
  preciosa que reprueba nuestro propio chequeo de 21 señales contradice lo que vendemos.
- **Testimonios: solo si existen de verdad, y de 3 para arriba** (decisión de Ramón,
  3-sep). Si no hay tres reales y con permiso, la sección **se saca**, no se rellena con
  placeholders. Nunca se inventan.

## Pendientes que dejé
- [ ] **Verificar qué permite la licencia de Motion Sites de Ramón antes del primer sitio
      cobrado.** El autor del video dice explícitamente que compró el **plan de agencia**
      "para tener los derechos de reventa y no meternos en ningún tipo de problema". Usar
      un prompt de Motion Sites como base de un sitio que se le cobra a un cliente es uso
      comercial. Verificar el plan **antes**, no después. (3-sep-2026)
- [ ] Praxi — carrusel v2: rehacer la lámina 3 (tiene jerga) y la 5 (cierra en
      comprensión), y producir las láminas 2 y 4 que faltan.
- [ ] Praxi — montar el reel A2 en CapCut (lo hace Ramón) eligiendo frames que
      cumplan la política de Meta.
- [ ] Praxi — las 5 piezas de siembra: esperan la decisión CapCut vs. instalar
      `ffmpeg`.

## Con quién trabajo
- **Renata/Cata** definen el copy; yo lo visto. **Fran/Gonzalo** llevan las piezas
  a pauta. **Ramón** aprueba antes de publicar, y siempre si una generación gasta
  créditos no triviales.

- 2026-08-31 (nota de la coordinación) — **Estilo v2 obligatorio para toda pieza:** Ramón revisó
  las piezas de septiembre y pidió alinearlas al rebranding del sitio. La coordinación migró las
  20 piezas esa misma noche. Plantilla canónica: `marketing/redes/2026-09-septiembre/base.css`
  (tokens del CSS de producción de spindlelab.cl: bg #0e141b, fg #f2efe8, muted #9aa4b0, verde
  petróleo #2fa99b en etiquetas, dorado #c9a227 solo wordmark o UN dato, Gabarito+Manrope, fondo
  `fondo-hilo.jpg` = poster real del hero con velo oscuro). **La dirección "clara" (papel #F7F5F0)
  quedó derogada**: las familias se diferencian por dispositivo, no por fondo. El mapa de la
  carpeta y las reglas: `marketing/redes/README.md`.

- 2026-08-31 (noche) — Ramón resolvió el anuncio del 1-sep: **v2-motor** (tu contraargumento
  a la v1 pesó más que tu ⭐: precios quemados en imagen, marca aún poco conocida). Regla
  desde ahora: piezas gráficas SIN precios propios; la v1-cartera queda en reserva.

- 2026-08-31 (más tarde) — **Convención de estructura mensual** (pedido de Ramón): carpeta
  del mes = carpetas por día de publicación (`DD-dia-pieza/`) con pieza + assets +
  `publicar.md`; masters del sistema en `_sistema/`; descartes/alternativas en `_reserva/`.
  Ver `2026-09-septiembre/README.md` (v3). Este es el molde para octubre.

- 2026-09-02 — **Física causal de contacto = rodaje real, jamás video-IA** (6 intentos fallidos
  lo respaldan: fuego espontáneo, dirección invertida, fichas aglutinadas). Tope de 2 intentos
  por escena ES DURO. Video-IA solo para atmósfera/cámara/luz. Y toda pieza con objetos
  repetidos (fichas, productos): pedir explícito variedad realista (el "todas 5|5" se coló en
  la primera imagen).
