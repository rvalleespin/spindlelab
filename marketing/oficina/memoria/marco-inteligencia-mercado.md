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
- **Segundo estudio cerrado (2026-08-14):** primer estudio para **otro cliente** (Chef&Hotel,
  medio del canal HORECA) — `marketing/inteligencia-mercado/chefandhotel/2026-08-estudio-posicionamiento.md`.
  Decisión: posicionamiento. Conclusión: su directo real es **Canal Horeca** (mismo ICP, se
  deslizó a directorio/media-group); el cuadrante **"autoridad editorial B2B con datos" (modelo
  Hosteltur) está vacío en Chile** y Chef&Hotel es el único con activos para ocuparlo. Movimiento
  #1: informe/benchmark propio por trimestre. Ficha de cliente creada (`clientes/chefandhotel.md`,
  Estado por confirmar). Registro de competidores **propio del cliente** en
  `inteligencia-mercado/chefandhotel/competidores.md` (separado del de SpindleLab).
- **Aprendido:** cada cliente lleva su **propia carpeta de inteligencia y su propio
  `competidores.md`** — no mezclar campos distintos (agencias AEO vs. medios HORECA) en un
  registro. IG quedó pendiente otra vez (sesión cloud sin Chrome).

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

- [ ] Cotización espejo para confirmar precios de Best Solution / ROI / Seonet (no
  publican tarifas).
- [ ] Engagement real (likes/comentarios) de @tairoai para confirmar crecimiento pagado.
