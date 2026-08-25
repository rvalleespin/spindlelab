# Memoria — Marco (agente-inteligencia-mercado)

> Inteligencia de mercado y competencia. Actualizar al cerrar cada estudio con:
> competidores nuevos, gotchas de investigación y qué fuentes sirvieron.

## Estado actual

- Rol creado el 2026-08-02 a pedido de Ramón: estudiar la ola de "agencias con IA"
  que aparece en Instagram y ubicar a SpindleLab frente a ella.
- **Primer estudio cerrado (2026-08-02):** `marketing/inteligencia-mercado/2026-08-estudio-agencias-ia.md`.
  Conclusión: SpindleLab apunta al cuadrante correcto (AEO/GEO, 42,9% CAGR); el
  riesgo no es la ola IG (otro cuadrante, comoditizándose) sino el campo directo
  chileno de AEO, más poblado y "legible" de lo asumido (Best Solution, Nitten).
  Recomendación de servicios: potenciar AEO+retainer+mini-diagnóstico, reencuadrar
  auditoría one-shot y Desarrollo Web (no como pilar), agregar autoridad de entidad
  (GEO estratégico), y NO volverse agencia de automatización genérica.
- Fichas en `marketing/inteligencia-mercado/competidores.md`.
- **Segundo estudio cerrado (2026-08-25):** `marketing/inteligencia-mercado/2026-08-mapa-citaciones-ia.md`,
  disparado por el test de menciones Mes 1 (SpindleLab 0/15). **Hallazgo central:** los
  motores no evalúan los sitios, **citan rankings-listicle que las agencias se
  auto-publican** (BigBudá, Milimetrix, Best Solution), cada una #1. Los nombres que la
  IA "recomienda" salen literalmente de esos listicles; SpindleLab no está en ninguno →
  esa **ausencia**, no el servicio, es la causa de la invisibilidad. Palanca #1 = publicar
  **evidencia pública verificable** en el sitio (la mayoría de esos rankings puntúan el
  contenido del sitio, **sin formulario**). Recomendación: artefacto de autoridad propio
  **como evaluador que NO se auto-rankea** (guía-estándar + "Índice de visibilidad en IA"
  con datos reales), copiando la ingeniería de BigBudá (schema/FAQ/`llms.txt`/tabla) pero
  sin el corazón deshonesto de coronarse. 3 movimientos → Renata/Cata (contenido citable),
  outbound (Sortlist/AgenciasB2B/Clutch), Simón/Diego (autoridad de entidad en el sitio).

## Gotchas de investigación (aprendidos / heredados)

- **Instagram requiere Chrome logueado.** Solo la sesión local del Mac de Ramón
  con `claude-in-chrome` puede entrar a IG a fondo (perfiles, Reels, cadencia,
  comentarios, Stories). Sesión cloud → cubre lo público con WebSearch/WebFetch y
  deja IG como pendiente con capturas. (Ver memoria del proyecto: "IG pendiente de
  Chrome logueado".)
- Cada dato con fuente: URL+fecha para web, captura para lo efímero de IG.
- Los competidores SÍ se pueden nombrar (son públicos) — a diferencia de los
  prospectos, que nunca se nombran sin permiso. Ser factual, no difamar.
- La distinción **prueba social real vs inflada** es el eje que más separa a
  SpindleLab de la ola IG — clasificarla siempre, no asumirla.

## Competidores conocidos

Registro vivo en `marketing/inteligencia-mercado/competidores.md`. Los directos
más relevantes hoy: **Best Solution** (el más peligroso, misma esquina AEO-B2B) y
**Nitten** (método propio SAGEO + índice público IViA — la referencia en "proof
legible"). El grueso del campo (ROI, etc.) tiene servicio real pero cero proof
visible: ahí SpindleLab gana solo con mostrar un caso con datos.

## Deep-dive Instagram (2026-08-02, Chrome logueado)

- Búsqueda que sí funciona para encontrar la ola: **"automatizacion con ia"** en el
  buscador de cuentas de IG. ("agencia de ia" trae agencias de **viajes** — matchea
  "via-jes"; inútil.)
- Especímenes fichados: **@autonomia.cl** (Chile, 64 seg), **@vantika.ai** (113 seg),
  **@tairoai** (16,5k seg / 16 posts). Patrón repetido: handle `<marca>.ai`, bio de
  promesa "venden por ti / piloto automático 24/7", entregables chatbots/CRM/leads,
  CTA a demo/booking, cero caso verificable. Barrera de entrada casi nula.
- Gotcha operativo: si se conecta un 2º Chrome a mitad de sesión, hay que
  re-seleccionar el navegador (AskUserQuestion → select_browser). El de Ramón con IG
  logueado fue "Browser 2" (deviceId 1c3897e5-...).

## Pendientes que dejé

- [ ] **PGAS**: apareció en el test de menciones IA pero es **no verificable** (6 búsquedas → 0
  resultados). Probable alucinación / nombre mal transcrito. Confirmar con Ramón antes de fichar.
- [ ] Deep-dive Instagram de los nuevos directos (Focus Ads, Loup, SmartGrowth) — necesita Chrome logueado.
- [ ] Cotización espejo para confirmar precios de Best Solution / ROI / Seonet (no
  publican tarifas).
- [ ] Engagement real (likes/comentarios) de @tairoai para confirmar crecimiento pagado.

## Aprendizajes clave (2026-08-25)

- **La visibilidad en IA se gana en fuentes de terceros, no en el propio sitio a secas.** Los
  motores citan listicles/tablas (formato ~2,5× más citable). Medir el share-of-voice = leer de
  qué fuentes salen los nombres, no solo si apareces.
- **La táctica "publica tu propio ranking y auto-ránkate #1"** ya la corren ≥4 chilenas (BigBudá,
  Best Solution, Milimetrix). Para SpindleLab es **veneno de marca** copiarla igual; el cuadrante
  vacío y defendible es "**el evaluador que no se corona**".
- **Focus Ads** es el competidor nuevo a vigilar: es el único del lote con proof dura (métrica
  "Share of Answer" + benchmark publicado + casos con cifras). Referencia de "cómo se ve el rigor
  hecho legible".
