# Memoria — Mauro (web-encuadre)

**Rol:** Encuadre y cierre de obra web — el brief de la compuerta 1 y el cierre.
**Carpeta de trabajo:** `marketing/oficina/obras-web/<cliente>-<obra>/`
**Skill:** .claude/skills/web-encuadre/SKILL.md

## Estado actual
- **2026-10-23 · Obra E12 (spindlelab-v3 sobre A · Archivo) cerrada con reparos.** Brief del 16-oct, compuerta 1 el
  16-oct y compuerta 2 el 19-oct, construida por Diego en cinco tandas, QA de obra de Javiera (vuelta 1 Rechazado,
  vuelta 2 Con reparos, `f3044fc`). Cierre: capturas de las 27 rutas a 390, 768 y 1440 (`capturas/e12/`), lo que queda con
  su dueño (`pendientes-traspaso-revisados.md` §0), la fila de cierre en el §7 de la spec, las memorias de los roles y el
  encargo del manual de marca nuevo para la troncal (`encargos-otras-sesiones/encargo-manual-marca-e12.md`). Nada
  publicado; publicar espera R1 de Ramón y la lista rehecha sobre E12.
- **2026-10-02 — rol creado.** Nace del Estudio Web (`.claude/skills/estudio-web/`),
  armado para cortar la causa real de las múltiples pasadas: el encargo llegaba en
  prosa y el constructor interpretaba. Sin obras propias todavía.

## Aprendido a pulso (heredado, antes de mi primera obra)
- **La causa de las pasadas no es el constructor, es el acuerdo.** En sep-2026 tres
  direcciones para una landing de cliente se rechazaron recién al verlas construidas
  ("muy básico", "super cloud"). No hubo brief con criterios verificables ni
  aprobación del lenguaje visual antes de construir.
- **El inventario de activos decide la mitad del diseño.** En el sitio propio, el slot
  de "caso real con datos" de la home quedó **reservado** hasta tener permiso de un
  cliente, en vez de rellenarse. Esa decisión se toma en el brief, no en la fase de
  construcción: una sección prometida sin activo acaba en stock genérico o en prueba
  social inventada.
- **Antes de dar un repo de cliente por disponible, `git ls-remote --heads origin`.**
  En sep-2026 dos sesiones trabajaron el mismo encargo en paralelo en el repo de un
  cliente y una rama quedó superseded. El encuadre tiene que decir en qué rama se
  trabaja y verificar que nadie más esté ahí.
- **Si esta sesión no es dueña del repo del sitio, la obra se entrega como encargo**
  en `marketing/encargos-otras-sesiones/`, no se empuja (protocolo de la oficina).

## Aprendido en la primera obra (spindlelab-v3, 5–6 oct 2026)
- **Compuertas respetadas: las dos.** Gate 1 (seguir iterando, éxito = conversión, reabrir
  el hero) y gate 2 (dirección A). Después Ramón amplió el alcance a todo el sitio con
  driftime como referencia: se escribió como decisión en la spec (§0), no se reabrió nada.
- **Lo que no decide el constructor se separa a tiempo** y se le lleva a Ramón en una
  lista corta: sección de preguntas en la home, imagen OG (toca Layout), cadencia de un
  plan, texto verbatim publicado. Mezclarlo con los arreglos frena la obra.
- **La obra larga se respalda sola**: commits WIP cada 20 minutos, porque el contenedor se
  reinició tres veces y el límite de uso cortó la orquestación cuatro.

## Aprendido en la revisión del traspaso (spindlelab-v3, 10–13 oct 2026)
- **Un traspaso de otra sesión se verifica ítem por ítem antes de actuar, y la verificación
  también.** De los 95 ítems del traspaso viejo, solo 11 seguían vivos tal como estaban
  escritos: 28 ya estaban resueltos en la rama vigente, 19 los había dejado obsoletos una
  decisión posterior de Ramón (el hero del 10-oct entre ellas) y 33 seguían vivos con otras
  rutas, cifras o alcance. Ejecutado tal cual, habría rehecho trabajo y reabierto el hero. Un
  escéptico corrigió 11 de los 95 veredictos del primer verificador y el crítico de
  cobertura tumbó un «resuelto» (P92). El traspaso tampoco acertaba en lo que afirmaba como
  hecho: el PR #41 «no comparte ancestro con `main`» y «toca 141 archivos» salieron de un
  `git merge-base` vacío, que en un clon superficial no prueba nada (la referencia no
  resolvió). Su autor lo corrigió (c9d6f6a) y GitHub lo confirma: 1 commit, 1 archivo, +61.

## Aprendido en E12 (spindlelab-v3, 16 al 23-oct 2026)
- **Las dos compuertas se respetaron y nada aprobado se reabrió**, aunque la obra nació de dos cambios de dirección en
  dos días (15-oct, E9 a E10; 16-oct, E10 a E12). Lo que lo hizo posible: el cambio se encuadró como obra nueva, y lo
  anterior quedó en pausa como historia, sin borrarse (E10, E11, la spec de driftime, la dirección B).
- **Cada pregunta, con lo que pasa si no se contesta.** En la compuerta 2 Ramón contestó de la 1 a la 5 y no de la 6 a la
  10; como cada una llevaba escrito su valor por defecto, nada se frenó y nadie tuvo que volver a preguntar.
- **La pregunta que toca producción, en una línea, con su condición medible y la opción recomendada.** «¿Le agregamos
  cinco opciones que solo use /v3/? Las 20 páginas publicadas quedarían idénticas byte a byte»: «Sí, agrégalas», el mismo
  día (19-oct, 11:44), y la condición se midió en cada tanda.
- **Lo que se escribe «para el día del corte» queda atado al build que describe.** La lista de publicación del 13-oct
  quedó describiendo un sitio que ya no existe cuando cambió la dirección; se marca con su commit y se re-ensaya.
- **Al cierre, lo declarado y abierto se junta en una sola lista con dueño.** Estaba repartido en cinco tandas de
  `desvios.md` y en el acta; sin juntarlo, cada punto quedaba esperando a alguien que no sabía que lo esperaban.
- **Un criterio que ninguna fase tiene asignado rebota hasta el cierre.** El 13 (lectores fríos sobre el sitio
  construido) no lo corrió nadie en la construcción ni en la QA, y llegó al cierre. Lo corrí con lectores en contexto
  aparte (`claude -p`, sin herramientas ni contexto), donde yo solo armé la entrada desde el `dist/`: el lector es frío
  aunque quien lo encarga no lo sea. Y encontró lo que nadie había visto, porque la lectura fría anterior era del texto, no
  de la página: los tres lectores entienden qué hacemos, pero «SEO técnico» y «visibilidad en IA» se entienden recién en
  Servicios. El brief tiene que decir quién corre cada criterio y en qué fase.
- **La obra larga se respalda sola, otra vez:** E12 duró del 16 al 23-oct con cortes por el límite de uso (la vuelta 1 de
  la QA, del 19 al 23-oct; este mismo cierre, después de las capturas). Los commits «en avance» guardaron todo.

## Con quién trabajo
- Entrego el brief a **Lucía** (dirección de arte) y **Clara** (copy de interfaz), y
  la capa de señales la pide **Simón**. Reporto el cierre al troncal (**Tomás**), que
  es el único que escribe el estado compartido.

## Pendientes que dejé
- [x] Primera obra real pendiente: al cerrarla, anotar cuántas compuertas se
      respetaron y si hubo que volver a abrir algo aprobado. **E12 (23-oct): las dos, y nada se reabrió** (arriba).
- [ ] **E12:** encuadrar la publicación del v3 cuando Ramón conteste R1: la lista rehecha sobre E12, con Diego y Simón
      (`pendientes-traspaso-revisados.md` §0.2, punto 4).
- [x] **E12, criterio 13:** corrido en el cierre con tres lectores en contexto aparte (`e12/cierre/criterio-13/`). No se
      cumple entero (tropiezan con términos sin explicar en la primera pantalla): va a Clara y a Ramón (§0.2, punto 10).
