# Cómo funciona la Oficina — quién es quién y los flujos

> Complemento del `organigrama-oficina.md`. El organigrama dice **quién existe**;
> esto dice **cómo trabajan juntos** en cada proceso. Última actualización: 2026-07-29.

---

## El equipo de un vistazo (por departamento)

Nombre humano · `skill` — labor en una línea.

**Dirección**
- **Tomás** · `agente-troncal-marketing` — **PM / cabeza operadora.** Le das un
  objetivo y arma el plan, reparte las tareas a los especialistas y lo lleva hasta
  done. Además es el único que escribe el estado compartido y reconcilia lo que
  reportan los demás. Es tu punto de entrada para cualquier proyecto.

**Captación**
- **Dereck** · `buscar-leads` — prospección en Apollo → CSV de decisores con email.
- **Emilia** · `agente-outbound` — convierte ese CSV en secuencia de emails lista para aprobar.
- **Valen** · `mini-diagnostico` — el diagnóstico gratis de 1 página (48h) que engancha.

**Ventas**
- **Raquel** · `agente-crm` — mantiene vivo el pipeline; saca los follow-ups vencidos.

**Marca & Contenido**
- **Renata** · `agente-copywriter` — escribe: artículos, ad copy, guiones, email.
- **Cata** · `persona-social-media` — tono y cadencia de LinkedIn + Instagram.
- **Bruno** · `persona-director-creativo` — carruseles, Reels, key visuals.
- **Marta** · `agente-calendario-editorial` — *(vacante)* el calendario que ordena a los tres.

**Paid Media**
- **Gonzalo** · `persona-paid-media` — Google Ads. Lee libre, escribe solo con OK.
- **Fran** · `persona-meta-ads` — Meta Ads (Facebook + Instagram).

**Entrega**
- **Diego** · `persona-disenador-web` — el sitio propio y los sitios de clientes.
- **Simón** · `agente-seo-aeo` — el servicio core que se cobra: SEO técnico + visibilidad en IA.

**Producto & Diseño** (para los productos propios — Praxi)
- **Nadia** · `producto-ui-ux` — diseño de producto, UI/UX, arquitectura frontend.
- **Pía** · `agente-growth-producto` — onboarding, activación, lifecycle, retención.

**Inteligencia & Datos**
- **Marco** · `agente-inteligencia-mercado` — investiga el mercado y la competencia *antes* de una decisión cara (precio, posicionamiento, nuevo mercado).
- **Nora** · `agente-analitica` — mide qué produjo cada frente *después*; reporte mensual.

**Admin & Finanzas**
- **Monse** · `agente-finanzas` — *(vacante)* cobros por fase, facturación.

**Supervisión**
- **El Sueño** · `dream` — audita 24h del stack y prescribe las 4 mejoras del día.

---

## Los flujos por proceso

### 0. Antes de decidir algo caro (precio, posicionamiento, nuevo mercado)
```
Marco                        [contraste]           decisión
investiga el mercado   →   con datos internos  →  fijar precio / reposicionar /
y la competencia           de Nora                reescribir landing / entrar a
(precios, torta, hueco)                           un mercado nuevo
```
Corre **antes** de los otros flujos. **Marco mira afuera, Nora mira adentro**: sus
hallazgos se cruzan. Sirve a productos propios y a clientes. No inventa cifras —
cita fuentes y entrega lo incómodo si el mercado lo dice.

### 1. Captar un cliente (el embudo comercial)
```
Dereck            Emilia              [Ramón]        Raquel           Valen            [Ramón]
encuentra   →  arma la secuencia  →  aprueba   →  registra al    →  entrega el   →  llamada 20 min
al decisor     de emails (3 toques)   y envía      que responde     diagnóstico      → propuesta
(CSV)          (no envía)                          en el pipeline   gratis           → Ganado ✅ / Perdido ✗
```
El estado lo lleva **Raquel** en `ventas/pipeline.md`. Regla sagrada: **el envío
lo aprueba Ramón, mensaje por mensaje** — ningún agente manda emails solo.

### 2. Entregar el servicio core (cliente ganado)
```
Raquel              Simón                          Diego                 Nora
marca Ganado  →  auditoría técnica + visibilidad  →  ejecuta en el     →  mide el impacto
                 en IA + plan priorizado             sitio lo que toca    (tráfico, posiciones,
                 (apalanca searchfit)                (schema, meta, vel.)  visibilidad IA) → reporte
```
Detalle de fases en `ventas/proyectos-en-curso.md`. Simón define el **qué y el
porqué**; los cambios en el sitio los ejecuta Diego con sus convenciones.

### 3. Producir contenido (blog + redes)
```
Marta               Renata                    según formato:                 Nora
define el      →  escribe (artículo      →   · blog     → Diego publica   →  mide qué
calendario        long-form, guion,           · social  → Cata (tono)        trae tráfico
del mes           ad copy, email)             · visual  → Bruno (carrusel/Reel)
```
Renata **entrega texto, no publica**. Cada formato lo publica su dueño.

### 4. Correr paid media
```
Renata            Gonzalo / Fran           [Ramón]              Nora
propone      →  montan / ajustan la    →  aprueba cada     →  atribuye: qué leads
el ad copy      campaña (Google/Meta)     cambio (un sí        vinieron de ads, CPL,
                                          por acción)          umbral semana 12
```
Regla: **leer libre, escribir solo con confirmación de Ramón.** Un sí es por acción.

### 5. Lanzar / crecer un producto propio (Praxi)
```
Nadia                  Pía                        Renata            Nora
diseña la pantalla/  →  define activación,     →  copy de       →  analítica de producto
flujo (sistema          onboarding, lifecycle      lifecycle        (activación, retención
anti-slop)              y retención                si hace falta    por cohortes)
```
Corre **en el repo del producto** (Praxi = repo EL COACH BOT), no en el de la
agencia. Nadia y Pía viven en global (cross-proyecto).

### 6. Dirección (transversal, siempre encendida)
**Tomás** es la cabeza operadora: toma el objetivo de Ramón, arma el plan, reparte
las tareas (encargos) a los especialistas, trackea hasta done, y mantiene al día el
estado compartido reconciliando lo que todos reportan. **El Sueño** audita las
últimas 24h del stack completo y deja las 4 prescripciones de mayor impacto del día.

```
Ramón: "quiero lograr X"  →  Tomás arma el plan  →  reparte a los especialistas
   →  trackea y reconcilia  →  reporta a Ramón (con lo que necesita su OK)
```

---

## Las reglas que mantienen todo sincronizado

1. **Un solo dueño del estado compartido: Tomás.** `plan-operativo-90-dias.md`,
   `ventas/pipeline.md` y los trackers de `marketing/outbound/` los escribe el
   troncal (o un sub-rol que siga su protocolo: Raquel, Emilia). Los demás **reportan**.
2. **Coordinación por archivos, no por chat.** Los encargos entre empleados van en
   `marketing/encargos-otras-sesiones/`.
3. **Antes de tocar un doc compartido: sincronizar con `main`.** Y **commitear
   antes de cambiar de rama** en GitHub Desktop (el cambio de rama con trabajo sin
   guardar dispara el auto-stash).
4. **Nadie envía emails ni gasta plata solo.** Outbound y paid: lo aprueba Ramón.
5. **Reglas de marca innegociables:** voz singular/plural, oro escaso (#C9A227, un
   uso por pieza), cero prueba social inventada, prospectos/clientes sin nombrar
   sin permiso, pase humano antes de publicar.
6. **Las skills se escanean al arrancar la sesión.** Una skill nueva no aparece
   hasta cerrar y reabrir Claude Code (`/clear` no basta).

---

## Cómo "contratar" a un empleado (invocarlo)

Abres una sesión de Claude Code parada en el repo de SpindleLab y llamas su skill:
`/agente-crm` (Raquel), `/buscar-leads` (Dereck), `/agente-seo-aeo` (Simón), etc.
Cada uno lee su memoria en `oficina/memoria/<empleado>.md` y arranca con su contexto.
