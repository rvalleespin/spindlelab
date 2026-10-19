# REPORTE — Presentación de marca ante clientes (2-sep-2026)

**Para:** Tomás (troncal), para reconciliar con el plan operativo. **De:** sesión de marca
(rama `claude/spindlelab-brand-presentation-b7zspr`). **Origen:** reunión de revisión de
marca del 2-sep; salió que faltaba una presentación con benchmark, gráficas de alcance y
campañas para gerencias de marketing y negocio.

## Qué se entregó (verificable en la rama)

- `marketing/brand/presentacion-marca/presentacion-marca.html` + `.pdf`: 18 láminas, sistema
  visual v2, fuentes y fondo con ruta relativa. Las 18 se renderizaron a PNG y se miraron.
- `marketing/brand/presentacion-marca/README.md`: cómo regenerar, qué dato es real y cuál
  es ilustrativo, checklist antes de enviar.
- `marketing/estrategia-presentacion-marca-2026-09.md`: lectura estratégica, benchmark con
  nombres verificados, 7 mejoras propuestas con dueño sugerido y el registro de la v2.

## Decisiones tomadas que Ramón debe confirmar

1. **Las campañas NO se presentan como reales.** Van como escenarios ilustrativos etiquetados
   (láminas 12 a 14), sobre datos reales (mediana del chequeo, CPC del plan de Ads). Motivo:
   regla de cero prueba social inventada y el problema de confianza que muestra el benchmark.
2. **v2 (3-sep): competidores CON nombre**, por pedido de Ramón. Contradice el brief de comunicación §5; se aplica solo a este material comercial de mano a mano, con hechos verificados en vivo el 2-sep y fecha en la lámina. Si el troncal quiere extender o acotar la regla, es decisión suya.
3. **El 0/15 propio del test de menciones no aparece** (decisión del 28-ago).
4. **Sí aparecen los precios "desde"** del sitio: es material comercial de mano a mano,
   no una pieza de redes; el addendum del 31-ago aplica a redes.
5. **Dato nuevo publicado en el mazo:** spindlelab.cl obtiene 85/100 en su propio chequeo
   (corrido el 2-sep-2026 vía `/api/chequeo`). Volver a correr antes de cada envío.

## v2 (3-sep-2026): ajustes de Ramón aplicados

Situación actual con cifras de fuente primaria (Barómetro Digital Chile 2026, Forrester 2026, Bain, Semrush), idea madre del motor frente a servicios sueltos, benchmark con nombres, textos resumidos, "hueco" fuera, escenarios en 30 y 60 días. Detalle en `marketing/estrategia-presentacion-marca-2026-09.md` §8. **Sitio alineado en esta rama (3-sep, pedido de Ramón):** `spindlelab-astro/public/metodo/index.html` (24 horas · 5 días hábiles · 2 a 3 semanas), FAQ de `servicios/auditoria-seo-tecnica/` (cinco días hábiles) y entrega de `servicios/visibilidad-en-ia/` (~1 semana, visible y JSON-LD). Sale en vivo al mergear a main; verificar con curl después del deploy. v3 del mazo: benchmark como mapa de posicionamiento (lámina 9) + tabla en anexo (19).

## Lo que pide el mazo hacia el resto de la oficina (propuesta, sin encargar)

- Raquel: pedir permiso de caso público (fotógrafo y asesora de inversiones).
- Simón: plantilla real del informe quincenal con el formato de la lámina 14.
- Renata + Diego: Research con las 69 corridas, para que las láminas de evidencia enlacen a
  una URL pública.
- Emilia: abrir el outbound con el argumento del circuito (presupuesto que no convierte).

Nada de esto está hecho ni marcado en `plan-operativo-90-dias.md`. Es del troncal decidir
qué entra.
