# Memoria — Marta (agente-calendario-editorial)

**Rol:** convierte la estrategia del mes en el calendario ejecutable que ordena a Renata/Cata/Bruno/Diego por fecha, canal, voz y dueño; agrupa los pases humanos de Ramón en tandas.
**Carpeta de trabajo:** `marketing/calendario-editorial.md` (+ grillas mensuales en `marketing/redes/`)
**Skill:** .claude/skills/agente-calendario-editorial/SKILL.md

## Estado actual
- 2026-08-28 — **Empleada recién creada** (la vacante venía declarada en el organigrama desde el 2-ago). Existo porque el flujo de contenido arrancaba en un rol que no existía: 12 posts de agosto quedaron redactados y sin publicar, y el calendario del trimestre pedido en `encargos-otras-sesiones/reposicionamiento-redes.md` nunca se hizo.
- 2026-08-28 (misma tarde) — **Primer encargo ejecutado:** calendario de septiembre formalizado en `marketing/calendario-editorial.md` (verificado archivo por archivo contra el inventario) y 5 encargos emitidos: `relanzamiento-sep-{copy-renata,visual-bruno,social-cata,leads-dereck,outbound-emilia}.md`. Tandas reprogramadas: Pase 1+2 lun 31-ago (~120 min) · Pase 3 vie 4-sep (~60) · Pase 4 vie 11-sep (~45, adelantado a ANTES de Fiestas para que Ramón vuelva con todo aprobado). Pendiente: aprobación de Ramón en el Pase 1.
- En reserva para octubre: post-13ago, carrusel-linkedin.pdf, ad-resumen.png y 6 textos de agosto no usados. Blog oct: #5–#7 + Research #10 (necesita las corridas que Emilia guarda de sus lotes).

## Aprendido a pulso (gotchas)
- **Semana 11 (15–21 sep) es intocable**: Fiestas Patrias, Chile se detiene. Cero lanzamientos, cero lotes. Está heredado del plan operativo (§semana 11).
- **La cadencia pactada de SpindleLab** vive en `oficina/clientes/spindlelab.md` (sección Redes): página LinkedIn mar+jue 09:00 (plural), personal de Ramón mié 12:30 (singular, texto puro), IG viernes 19:00. Los links van en el primer comentario.
- **Publicación manual** (decisión de Ramón 28-ago): Metricool de pago se reevalúa en octubre. No planificar como si hubiera programador automático.
- **El puntaje propio del test de menciones (0/15) jamás se publica** (decisión de Ramón 28-ago). Ninguna fila del calendario puede contener piezas que lo mencionen.
- Las piezas de agosto llevan la etiqueta y la firma quemadas en el HTML fuente: reciclarlas = pedir a Bruno re-render con etiqueta/firma nuevas, no republicar el PNG viejo.
- **2026-08-28 — Verificar los días de semana con `date`, SIEMPRE.** El borrador fundacional asumió que el 1-sep-2026 era lunes (es martes): sus 4 tandas caían 3 en sábado, una en pleno Fiestas Patrias, y todas las filas estaban corridas un día. Un calendario es lo primero que se invalida con un día de semana mal puesto; ningún documento heredado se toma como fuente de fechas sin `date -d`.
- Las direcciones visuales reales de las piezas (para alternar familias) no están todas en el README de posts-agosto: se leen del HTML (`class="post a|b"`; 06=A, 13=A tinta, 18=B, 20=A, 25=B, 27=A tinta).

## Pendientes
- [x] Formalizar `marketing/calendario-editorial.md` de septiembre. (28-ago)
- [ ] Tras el Pase 1 (lun 31-ago): registrar la etiqueta de serie confirmada y la decisión R8 (video); ajustar el calendario si Ramón cambia algo.
- [ ] Cierre de mes de septiembre (mié 30-sep): publicado vs planificado, primera lectura de qué funcionó, calendario de octubre.
