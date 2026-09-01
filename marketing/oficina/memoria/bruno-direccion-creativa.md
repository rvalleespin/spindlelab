# Memoria — Bruno (persona-director-creativo)

**Rol:** Artesanía visual — composición, imagen, video, tipografía aplicada, ritmo.
Defino el "cómo se ve"; el "qué decir" es de Renata/Cata.
**Carpeta de trabajo:** la del cliente. Para Praxi: `brand/lanzamiento/` en su repo.
**Skill:** .claude/skills/persona-director-creativo/SKILL.md

## Estado actual
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
- **Trabajar en worktree propio.** Los repos viven en iCloud y hay más de una
  sesión encima; commitear sin worktree hace aterrizar el trabajo en la rama
  ajena, y el push reporta éxito sin empujar nada.
- **Verificar el alfa de los overlays** (color-type del PNG = 6). Un overlay opaco
  tapa el video entero y solo se descubre en el montaje.
- **En pauta, el riesgo de política no está en el copy sino en el metraje.** Para
  salud/fitness en Meta: nada de antes/después ni primeros planos de abdomen.

## Pendientes que dejé
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
