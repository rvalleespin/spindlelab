# Memoria — Clara (web-copy-interfaz)

**Rol:** Copy de interfaz — headline, CTA, labels, errores, estados vacíos, 404.
**Carpeta de trabajo:** `marketing/oficina/obras-web/<cliente>-<obra>/copy-secciones.md`
**Skill:** .claude/skills/web-copy-interfaz/SKILL.md

## Estado actual
- **2026-10-14 · El pase de voz completo del v3 está hecho (frente E8, P0.3 de la lista de
  publicación).** 886 filas: las 851 ranuras abiertas del inventario (el 100 %) y 35 del
  encargo de la oferta de Marco. Cambian 141, se mantienen 690 (cada una con su motivo),
  54 esperan R2 y 1 es un dato a verificar. Lo aplicó Diego (`3877e51`, `2dbaa09`, `eaa0c33`,
  arreglos en `f0d911c`) y Javiera lo aprobó en la ronda 2 (`e8/acta-qa-E8.md`). Mi
  entregable es `obras-web/spindlelab-v3/e8/copy-secciones.md`, con la hoja de voz al lado
  (`e8/hoja-de-voz.md`). Las seis filas transitorias de la spec quedaron cerradas (§7,
  14-oct). Nada se publicó: lo lee Ramón en la vista previa (P0.4).
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

## Aprendido en el pase de voz (spindlelab-v3, E8, 14 oct 2026)
- **Migrar antes de editar.** Antes de cambiar una palabra, Diego llevó al JSON todo lo que las
  plantillas escribían encima del dato (`28c5d85`), y lo midió: 0 diferencias en las 21 rutas.
  Recién ahí cada ranura tuvo una sola fuente, y el pase se pudo aplicar por puntero, con la
  aserción valor = texto de hoy, y auditar después diferencia por diferencia (245 de 245).
  Editar el JSON sin migrar habría sido escribir sobre hojas que nadie ve.
- **La trampa de los parches.** Había tres clases: los que tapan el JSON entero, los que solo
  actúan si el JSON trae la frase vieja exacta y los que reemplazan frases sueltas. La primera
  hace invisible lo que se edite debajo. Las otras dos fallan en silencio: si el JSON cambia,
  el parche deja de calzar y vuelve lo que tapaba («Equipo dedicado», «acostumbrados a
  trabajar bajo NDA», «motor»), en la página y en el JSON-LD, sin que el build avise. El pase dejó tres parches nuevos de esa clase (la frase
  «chequeo gratis» en `ENLACES` y dos espacios duros por `.replace`): quien cambie esos textos
  revisa el parche en el mismo commit. Antes de reescribir una frase, pregunto de dónde sale lo
  que se ve, no lo que dice el JSON.
- **Un encargo de otra sesión trae datos ajenos, y se verifican antes de entrar.** El de Marco
  decía que el 36 → 100 de spindlelab.cl era «con el mismo instrumento que está en el hero». Corrí
  los dos: el 100 es del chequeo de la Ley 21.719 (verifica.spindlelab.cl), y el chequeo de IA del
  hero le daba 85 ese mismo día. El 10-sep tampoco tenía fuente (el 36 es del 9-sep), el addendum
  cruzaba los precios de la Auditoría y de Visibilidad, y su premisa de que Google-Extended es solo
  de entrenamiento la contradice la documentación de Google. Si la cifra hubiera entrado tal cual,
  el sitio habría dicho algo falso con nuestro propio instrumento como prueba. Lo que se adaptó
  quedó dicho en el documento, con la razón («Qué se adaptó, y por qué»).

## Con quién trabajo
- Recibo el brief de **Mauro**; mi texto lo usa **Lucía** en el tablero y **Diego** en
  el código. El formato largo (artículos, guiones, email) es de **Renata**; las
  keywords y la estrategia de contenido, de **Simón**.

## Pendientes que dejé
- [ ] **v3, antes de la lectura de aprobación de Ramón (P0.4):** proponerle la frase de la
      prueba de Trabajo que tropieza en voz alta, «como si el aviso de cookies frena…» →
      «por ejemplo, si el aviso de cookies frena…» (acta E8, ronda 2, defecto 1; confirmación 9
      de `e8/e8-antes-despues.md`). Si la acepta, es un encargo exprés con su fila en
      `copy-secciones.md`.
- [ ] **v3, cuando Ramón conteste:** R2 (el texto de cada lugar para cada respuesta está en el
      anexo A de `copy-secciones.md`), R4 y R7 (anexo C) y los dos plazos que faltan. El borrador
      de `llms.txt` (anexo B) espera P11 de la lista de publicación.
- [x] **v3: el pase de voz completo con `voz-spindlelab`, antes de publicar.** Hecho el 14-oct
      (ver «Estado actual»). Lo que decía este pendiente (frente E8 de
      `obras-web/spindlelab-v3/pendientes-traspaso-revisados.md`): sobre el copy nuevo,
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
