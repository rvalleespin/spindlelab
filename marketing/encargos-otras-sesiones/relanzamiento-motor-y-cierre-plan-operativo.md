# Encargo → Tomás (agente-troncal-marketing): cerrar lo antiguo y registrar el relanzamiento del motor

**De:** sesión fundadora del relanzamiento (28-ago-2026, con Ramón en vivo) · **Para:** Tomás (troncal)
**Por qué tú:** el plan operativo y el pipeline solo los editas tú. Esta sesión preparó todo lo demás
(está commiteado en `main`); acá va lo que te toca consolidar.
**Verificación:** todo lo afirmado abajo tiene commit en `main` — usa `git log --oneline --since=2026-08-27`
y los diffs, no este resumen, como fuente de verdad.

---

## 1. Contexto en 6 líneas (lo que pasó el 27–28 ago)

- El sitio quedó reposicionado al **motor de adquisición** y se publicó **spindlelab.cl/diagnostico**:
  chequeo autoservicio de visibilidad en IA (21 chequeos, sin registro, Cloudflare Function). `/indice/`
  se eliminó (301 → /diagnostico/). El CTA de todo el sitio es el formulario de /contacto/ (dispara
  `generate_lead`); el botón de la nav es "Chequea tu sitio".
- Ramón decidió el relanzamiento: **orgánico primero** (blog + LinkedIn/IG + outbound), pauta = fase 2.
- Se creó a **Marta** (`agente-calendario-editorial`) — tu pendiente "[ ] Fundamentar el frente de Marta"
  queda cerrado: la fundamentación es este encargo + su skill + el plan aprobado por Ramón (28-ago).
- Línea editorial v2 del blog: `marketing/linea-editorial-blog-v2.md`. Calendario sep (formalizado por Marta el 28-ago):
  `marketing/calendario-editorial.md`. Brief de comunicación v2: `marketing/rebranding-2026-08-brief-comunicacion.md`.
- Prospección: **Apollo cancelado (26-ago)**; fuente vigente Google Maps + curl; canon de envíos nuevo
  (3 toques · 10/día · 50/sem); banco de leads de agosto rescatado a `ventas/` (estaba untracked en un worktree).
- **Decisiones de Ramón del 28-ago:** benchmark Research aprobado (agregado, anónimo, auto-excluido);
  Metricool NO (manual en sep); 2ª ola abogados en lotes 10-15/sem con corte si rebote >5%;
  **el 0/15 propio JAMÁS se publica**.

## 2. Cierre de obsoletos en `marketing/plan-operativo-90-dias.md` (congelado desde el 23-jul)

- [ ] **Checkpoints día 30 (5-ago) y día 45 (20-ago): pasaron sin registro.** Déjalo escrito tal cual
      (no reconstruyas lo que no pasó). Al día 45 la meta era ≥1 cliente cerrado: Bernardo cuenta (1),
      pero es pre-plan (cerrado 8-jul por contacto directo, no outbound).
- [ ] **Google Ads:** la campaña se encendió el 14-jul y **se pausó el 25-ago** (encargo
      `google-ads-alinear-pausar-preparar-relanzamiento.md`, COMPLETADO). Las notas de "campaña activa"
      de la semana 5 quedaron obsoletas. El plan de relanzamiento de pauta espera OK de Ramón
      (`marketing/paid-media/2026-08-plan-relanzamiento-google-ads.md`) y es **fase 2**: la "Decisión
      Google Ads semana 12" tal como está escrita ya no aplica (no hubo gasto entre medio).
- [ ] **Test de menciones IA mes 2 (semana 6):** SÍ se hizo, el 25-ago: 0/15
      (`marketing/metricas/test-menciones-ia.md`). Márcalo hecho. **Dato interno: prohibido publicarlo**
      (decisión de Ramón 28-ago).
- [ ] **Meta Ads:** el estado sigue sin levantarse desde julio (la alerta del 23-jul sigue vigente).
      Déjalo como pendiente explícito de `persona-meta-ads`, no lo des por resuelto.
- [ ] **Caso público con nombre: EN RESERVA** (decisión de Ramón, 28-ago): no se pide permiso a
      Bernardo ni a nadie hasta tener **al menos 3 clientes con datos verificables**. SimpleTrust
      queda en pausa formal. El contenido de caso sale anonimizado mientras tanto.
- [ ] **Artículos 3–8 del plan viejo:** márcalos "reemplazados por la línea editorial v2"
      (`marketing/linea-editorial-blog-v2.md`). Los temas 3, 4 y 5 sobreviven ahí reciclados (posts #4,
      #1 y #5 de la v2).
- [ ] Tus otros dos pendientes de memoria: registrar la creación de Emilia y Raquel, y cerrar el de Marta.

## 3. Registrar la fase vigente (semana 9 en adelante)

- [ ] El relanzamiento como fase: campaña orgánica 1–12 sep (calendario en
      `marketing/calendario-editorial.md`), blog 1/semana según línea v2, outbound GMaps con canon nuevo,
      semana 11 vetada (Fiestas Patrias), pauta = fase 2 pendiente de OK.
- [ ] Los pases de Ramón como hitos del plan, **con las fechas corregidas por Marta el 28-ago**
      (las del borrador caían en sábado y una en Fiestas Patrias): **Pase 1+2 lun 31-ago ·
      Pase 3 vie 4-sep · Pase 4 vie 11-sep**. Fuente: `marketing/calendario-editorial.md`.

## 4. Checkpoint día 60 — córrelo tú el 4-sep

Meta original: 1–2 clientes cerrados. Corre el árbol de decisión de §8 de la estrategia con los datos
reales (pipeline, tasa de respuesta 4,3% = 6/141, cadencia, caja de leads) y deja el veredicto escrito
en el plan. Insumo: los 6 respondedores nunca se cargaron al pipeline (punto 5).

## 5. Coordinar a Raquel (CRM)

Los 6 respondedores del outbound de agosto no existen en `ventas/pipeline.md`: Grupo Altum, Cortés
Zamora, BH Abogados, Dentimagen, Clínica Hunza (**rechazó el servicio** — confirmado por Ramón el
28-ago; cargarla como Perdido, no recontactar) y Chef&Hotel (medio, no cliente). Que Raquel los
cargue levantando el estado real desde Gmail
(`search_threads` por dominio), no desde los CSV.

## 6. Qué NO hacer

- No reescribas la historia del plan: lo no hecho se marca como no hecho, con fecha.
- No toques `marketing/calendario-editorial.md` (es de Marta) ni la línea editorial (Ramón la aprueba
  en su Pase 1).
- Nada de esto es público: no dispara posts ni correos.

---

**Estado:** ⬜ pendiente de tomar por Tomás · creado 28-ago-2026
