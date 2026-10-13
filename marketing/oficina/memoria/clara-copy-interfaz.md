# Memoria — Clara (web-copy-interfaz)

**Rol:** Copy de interfaz — headline, CTA, labels, errores, estados vacíos, 404.
**Carpeta de trabajo:** `marketing/oficina/obras-web/<cliente>-<obra>/copy-secciones.md`
**Skill:** .claude/skills/web-copy-interfaz/SKILL.md

## Estado actual
- **2026-10-13 — Registro de la obra v3, hecho en la revisión del traspaso (frente E6).**
  Esta memoria seguía diciendo «sin obras propias», y la revisión la tomó como prueba de
  que nadie había tocado el copy del v3, hasta que el crítico de cobertura encontró mi
  trabajo en la spec. Una memoria sin poner al día se lee como un hecho.
- **2026-10-06 — Primera obra: `spindlelab-v3`, en la QA final.** Corregí textos puntuales;
  **no** hice el pase de voz completo. Quedó en el sitio:
  - En los JSON (spec §7, fila «Copy en los JSON (Clara)»): el cierre de Visibilidad como
    afirmación («Te mostramos qué dicen de tu empresa los motores de IA» + «Envíanos tu URL
    y en 24 horas tienes el mini-diagnóstico gratuito.»); «qué mueve la aguja» → «qué
    arreglar primero» (oferta, dos veces) y «Primero lo que hay que arreglar, no lo
    cosmético.» (Auditoría); una sola serie de tres en la home (Acompañamiento con la línea
    de su página, Redes «Orgánico y pauta social en LinkedIn y Meta.»).
  - En Trabajo, la línea de Raigal: «Clínica de implantología. Por ahora, solo la portada:
    …», 22 palabras contra 31 (spec §7, fila de Trabajo del 6-oct; el comentario de
    `v3/trabajo.astro` dice «Redacción final: Clara»).
  - Fuera a propósito: la FAQ de Diagnóstico (`paginas-v3.json`) y el cierre de Nosotros
    (bio de Ramón).
- **2026-10-02 — rol creado.** El copy de pantalla no tenía dueño: lo escribía quien
  construía, en automático, y es la superficie donde el olor a IA se detecta primero.
  Sin obras propias todavía (la primera fue el v3, ver arriba).

## Aprendido a pulso (heredado, antes de mi primera obra)
- **La voz se calibra con textos publicados, no con adjetivos.** Para eso existe
  `voz-spindlelab`: puro corpus, en los dos registros (singular para el perfil
  personal de Ramón, plural para lo que entrega la marca). Crece solo con piezas
  **publicadas**.
- **Reglas de marca que no se negocian y aplican al sitio:** cero prueba social
  inventada; prospectos nunca nombrados sin permiso; la raya no se usa como golpe de
  efecto (es el tell de escritura IA más señalado en el propio manual); pase humano
  antes de publicar.
- **El copy va antes del diseño.** Una composición hecha sobre "Tu título aquí" se
  rompe cuando entra el titular real, y un tablero con relleno no se puede aprobar.
- **El plural de marca es para lo que el negocio entrega**, no para inflar el tamaño:
  "entregamos" sí, "nuestro equipo de expertos" no — el equipo es una persona.
- **Herencia del sitio propio:** quedó una meta description de `/servicios/
  visibilidad-en-ia/` desalineada con el rótulo visible ("Optimización AEO/GEO"). Los
  metadatos son copy también y se revisan en la misma pasada.

## Aprendido en la primera obra (spindlelab-v3, 6–13 oct 2026)
- **Corregir textos sueltos en la QA no es un pase de voz.** El brief de textos pedía que
  alguien pasara el tono antes de que Ramón aprobara, y la condición se perdió al cambiar de
  sesión: nadie pasó `voz-spindlelab` sobre el copy nuevo. Un pase completo es un paso con
  dueño, no algo que se da por hecho porque hubo correcciones.
- **El texto corregido en la página y no en el JSON se queda ahí.** La spec tiene seis filas
  «transitorias» con textos fijos en la página «hasta que Clara corrija el JSON» (diagnóstico,
  contacto, índice de servicios, servicios, trabajo). Mientras tanto el dato y lo visible
  dicen cosas distintas, y quien construya después lee el JSON.
- **Lo heredado del JSON o del sitio publicado no viene verificado.** «Estamos acostumbrados
  a trabajar bajo NDA» y «cinco preguntas fijas por tres motores» venían de ahí y la QA los
  sacó por no tener respaldo (spec §7, 5 y 6-oct).

## Con quién trabajo
- Recibo el brief de **Mauro**; mi texto lo usa **Lucía** en el tablero y **Diego** en
  el código. El formato largo (artículos, guiones, email) es de **Renata**; las
  keywords y la estrategia de contenido, de **Simón**.

## Pendientes que dejé
- [ ] **v3: el pase de voz completo con `voz-spindlelab`, antes de publicar** (frente E8 de
      `obras-web/spindlelab-v3/pendientes-traspaso-revisados.md`). Sobre el copy nuevo:
      home, internas, `oferta-v3.json`, `paginas-v3.json`, `servicios-v3.json` y los textos
      de `v3-chequeo.js`. En la misma pasada: llevar a los JSON los textos de las seis filas
      transitorias de la spec, la guía de la entrada de Desarrollo web (repite casi palabra
      por palabra la línea del campo de la home y la del menú), la línea provisoria del
      índice del blog (`v3/blog/index.astro`: «la final es de Clara») y el paso 01 de
      contacto (spec §7, 6-oct).
      **No se toca lo cerrado por Ramón:** el hero del 10-oct, la bio de Nosotros y los
      «acá» del artículo de los 21 chequeos; los cuerpos de los artículos van verbatim.
      Aprueba Ramón.
- [ ] Armar un inventario base de microcopy del sitio propio (errores de formulario,
      estado vacío, confirmación, 404) para no reescribirlo en cada obra.
