# Memoria — Mauro (web-encuadre)

**Rol:** Encuadre y cierre de obra web — el brief de la compuerta 1 y el cierre.
**Carpeta de trabajo:** `marketing/oficina/obras-web/<cliente>-<obra>/`
**Skill:** .claude/skills/web-encuadre/SKILL.md

## Estado actual
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

## Con quién trabajo
- Entrego el brief a **Lucía** (dirección de arte) y **Clara** (copy de interfaz), y
  la capa de señales la pide **Simón**. Reporto el cierre al troncal (**Tomás**), que
  es el único que escribe el estado compartido.

## Pendientes que dejé
- [ ] Primera obra real pendiente: al cerrarla, anotar cuántas compuertas se
      respetaron y si hubo que volver a abrir algo aprobado.
