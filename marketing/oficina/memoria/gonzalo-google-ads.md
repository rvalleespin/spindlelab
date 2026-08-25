# Memoria — Gonzalo (persona-paid-media)

**Rol:** Paid media / SEM (hoy Google Ads). Alta intención, presupuesto controlado, cazar
defaults dañinos. Propongo, no ejecuto gasto — aprueba Ramón.
**Cuenta:** `597-527-6690` ("Spindlelab"), login `hola@spindlelab.cl` (`authuser=1`).
La 2ª cuenta `manuvalleespin@gmail.com` (`497-377-4579`) está **vacía** y Chrome la abre
por defecto → verificar el número antes de diagnosticar.
**Skill:** .claude/skills/persona-paid-media/SKILL.md · **Ficha:** `oficina/clientes/spindlelab.md`

## Estado actual (2026-08-25)
- **`Campaign #1`** (Búsqueda) está **DETENIDA** (pausada, sin gasto). No re-encender sin OK.
- **Alineación al sitio nuevo — HECHA y verificada esta sesión:**
  - **Plazo 48h → 24h** en el RSA (3 lugares): T4 `Mini-diagnóstico en 24 h`, T5
    `Diagnóstico Técnico en 24 h` (reframe: evita implicar que la auditoría completa —2-3
    sem— se hace en 24h), Desc.2 `Mini-diagnóstico gratis en 24 horas: …`. Guardado y
    confirmado reabriendo el editor.
  - **Discurso:** ya calzaba (todo SEO técnico / visibilidad en IA / diagnóstico / dev web).
    Nada de "agencia 360". Sin cambios.
  - **URLs de los 7 sitelinks:** todas a rutas vivas del sitio nuevo
    (`/servicios/auditoria-seo-tecnica/`, `/metodo/`, `/servicios/visibilidad-en-ia/`,
    `/servicios/`, `/blog/`, `/servicios/acompanamiento-mensual/`, `/servicios/desarrollo-web/`).
  - **UTM:** estaba inconsistente (3/7 sitelinks lo tenían, del 23-jul; los 4 del 13-jul no).
    Se **agregó el UTM** `utm_source=google&utm_medium=cpc&utm_campaign=auditoria-seo` a los
    4 que faltaban → los 7 sitelinks + el anuncio ahora consistentes, **sin duplicar**.
- **Plan de relanzamiento AEO/GEO** (propuesta, no encendido):
  `marketing/paid-media/2026-08-plan-relanzamiento-google-ads.md`.

## Aprendido a pulso (gotchas)
- **El editor de RSA (`/aw/ads/edit/search`) es inestable vía la extensión de Chrome:**
  auto-abre un panel **"Ask Advisor"** (IA) que hace polling continuo y deja la página
  "ocupada" (screenshots/read_page se cuelgan). **Cerrar el panel apenas carga** (botón
  "Cerrar" del panel) estabiliza. Editar por **ref**, no por coordenadas.
- **`Cmd+A` NO selecciona** en estos campos (escribe una "a" literal y el texto queda
  anexado). Para reemplazar: **triple-clic → Backspace → verificar vacío (JS activeElement)
  → escribir**. Siempre verificar el valor final por JS antes de Guardar.
- **URLs de sitelinks:** no hay columna de URL en el informe; se leen abriendo el editor
  (clic en el título → "Editar" → campo "URL final") o por el `aria-label` del botón
  "Editar esta columna Recurso" (contiene `finalUrls:`), que rinde en hover por fila.
- **javascript_tool** bloquea devolver strings que parezcan query-string → devolver solo
  `origin+pathname` y las **claves** de los params, o comparaciones booleanas.
- **"Última actualización" del informe de recursos no refresca al instante** tras guardar
  — verificar leyendo la finalUrls real, no la fecha. Editar un recurso lo manda a
  "Pendiente / En proceso de revisión" (normal).
- **La conexión de la extensión se cae/reconecta** (nombre del device cambió `Browser 1`→
  `ramon`); tras reconectar, refrescar refs. Si `list_connected_browsers` viene `[]`, pedir
  a Ramón que abra el panel lateral de Claude en Chrome y reintentar.

## Pendientes / a vigilar
- [ ] **Presupuesto: discrepancia** — ficha dice **$1.500/día**, la cuenta muestra
  **CLP 3.000/día**. Confirmar con Ramón el número real (no lo toqué; campaña detenida).
- [ ] **IA Max:** no alcancé a auditar la columna de tipo de concordancia esta sesión
  (campaña detenida, foco en copy/UTM). Chequear que siga OFF al relanzar.
- [ ] **Extensión de llamada:** los 3 números están **rechazados (sin verificar)** →
  verificar teléfono o quitar la extensión antes de relanzar.
- [ ] **No hay callouts ni fragmentos estructurados** → oportunidad para el relanzamiento
  (propuestos en el plan).
- [ ] El plan de relanzamiento vive en `claude/jolly-fermi-f2799a` — falta commit/merge a `main`.

## Con quién trabajo
- Reporto a **Tomás** (troncal). Con **Nora** (mide `generate_lead`), **Diego** (URLs/rutas
  del sitio) y **Fran** (Meta). Encargos entran por `marketing/encargos-otras-sesiones/`.
