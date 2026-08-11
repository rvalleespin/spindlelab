# Praxi · Campaña Meta de lanzamiento — Informe

**Cliente/producto:** Praxi (praxi.coach) — app coach de hipertrofia, producto propio de Ramón. Marca distinta a SpindleLab.
**Fecha de montaje:** 10-ago-2026 · **Estado:** PUBLICADA (procesando/en revisión de Meta), sin gasto aún al cierre del informe.
**Persona ejecutora:** Fran (paid media / Meta Ads).

---

## 1. Objetivo de la campaña

**No es vender suscripciones. Es comprar aprendizajes:**
1. Qué ángulo creativo engancha más (medido por CTR).
2. Validar que el funnel funciona (clic → landing → registro).

Es un test A/B de ángulo, con tráfico real y barato hacia la landing.

---

## 2. Infraestructura de la cuenta (IDs)

| Elemento | ID / valor |
|---|---|
| Business Manager | SpindleLab `1025351160247165` (Praxi cuelga del mismo portafolio) |
| Cuenta publicitaria "Praxi" | `act_2120963542133903` — moneda **CLP**, zona horaria **America/Santiago (GMT-4)** (ambas irreversibles) |
| Dataset/Pixel "Praxi" | `2527202034427112` — **CAPI server-side** (endpoint `POST /api/meta/registro` → Graph API), sin pixel de navegador |
| Página FB "Praxi" | ID `1291757354017546` (perfil `61593096477161`) |
| Instagram | `@praxi.coach` |

**Método de pago:** lo agregó Ramón (acción reservada a él).

---

## 3. Estructura montada (1 campaña · 1 conjunto · 2 anuncios)

### Campaña
- **Objetivo:** Tráfico
- **Tipo:** Manual (NO Advantage+ campaign budget)
- A/B test off · sin categoría especial
- Nota: el nombre quedó genérico ("Nueva campaña de Tráfico") — el rename no guardó.

### Conjunto de anuncios — "Chile · 18-40 · intereses fitness · IG+FB manual"
- **Destino:** Sitio web
- **Optimización:** Vistas de página de destino
- **Presupuesto:** **$100.000 CLP TOTAL** (Ramón subió de $50k y asumió el riesgo; advertido que a 21 días ≈ $4.760/día es diluido)
- **Vigencia:** 10 → 31 ago
- **Público (RESTRINGIDO / duro):** Chile · 18-40 · **4 intereses fitness**:
  - Gimnasio (fitness)
  - Fisicoculturismo / Bodybuilding (deporte)
  - Estado físico / Physical fitness (fitness)
  - Halterofilia en los juegos olímpicos
  - Tamaño resultante: **~2,0 – 4,6M**
- **Ubicaciones (acotadas a mano):** solo **Feed FB + Feed IG + Instagram Stories + Instagram Reels**.
  - Desactivado: Audience Network, Búsqueda, Instream, Marketplace, perfiles, notificaciones, Explorar, columna derecha, Threads, FB Stories/Reels, Messenger, WhatsApp.
  - **"Permitir gasto limitado en ubicaciones excluidas" → OFF** (Meta lo re-activa solo al excluir; hubo que destildarlo de nuevo).

### Anuncios A/B
Ambos en el mismo conjunto · identidad Página Praxi + IG @praxi.coach · botón **"Más información"** · **video por colocación** (9x16 Reels/Stories + 4x5 Feed) · **"Retoques de video con IA" y "anuncios multianunciante" APAGADOS** (no alterar el creativo).

**Anuncio A — "a-memoria"**
- Titular: *Un coach que se acuerda*
- Texto: *La mayoría de las apps de entrenamiento son una planilla con botones. Anotas, y ahí queda. Praxi arranca donde quedaste: sabe con cuánto cerraste, cómo terminaste, y si esta vez toca subir. Empieza gratis.*
- URL: `https://praxi.coach?utm_source=meta&utm_medium=paid&utm_campaign=lanzamiento-ago&utm_content=a-memoria`

**Anuncio B — "b-series"**
- Titular: *¿Cuántas de tus series cuentan?*
- Texto: *Terminas la serie, anotas "3x12" y sigues. Pero si la terminaste cómodo, esa serie te cansó más de lo que te sirvió. Praxi cuenta cuáles valieron de verdad y te avisa si te está faltando. Empieza gratis.*
- URL: `https://praxi.coach?...&utm_content=b-series`

> Copy actualizado por Ramón: "Gratis, sin tarjeta" → **"Empieza gratis"** en los 4 campos (se malinterpretaba). Ambos anuncios quedaron publicados con el texto nuevo (b-series estuvo un rato como borrador y se publicó).

**Foto de perfil FB:** estaba en blanco (salía círculo vacío en colocaciones de FB) → se puso el **logo "P."**.

---

## 4. Cómo se lee el test

Los UTM (`utm_content=a-memoria` / `b-series`) permiten separar A vs B en analítica (PostHog). Métrica primaria de decisión: **CTR / costo por clic al landing** por anuncio. Secundaria: registros vía CAPI.

---

## 5. Aprendido a golpes (para la próxima)

- **Carga de archivos a Meta:** la subida automatizada corre en sandbox aparte y **rechaza rutas de disco**. Lo único que funciona: clic en "Subir" → selector nativo de macOS → **Ramón elige el archivo**.
- **UI Meta 2026, objetivo Tráfico:** ya no hay "audiencia original"; el default es **Público Advantage+**. Para audiencia dura: **"Limitar aún más tu público" → "Llegar a un público restringido"**.
- **Ubicaciones manuales:** están en **"Mostrar más opciones de configuración" → "Controles de ubicación"**. Trampa: "Permitir gasto limitado en ubicaciones excluidas" queda marcado → destildar.
- Los checkboxes de sub-ubicaciones **no responden a clic por coordenada** — hay que usar clic por referencia.
- "musculación" no tiene interés directo en Meta → usar "Culturismo/Fisicoculturismo".

---

## 6. Reglas duras (persisten)

- **No encender gasto, subir presupuesto ni confirmar/agregar método de pago sin aprobación EXPLÍCITA de Ramón.**
- Passwords / 2FA / pago → siempre los hace Ramón.
- La campaña quedó **publicada por decisión propia de Ramón** (su acción = su aprobación de gasto).

---

## 7. Qué sigue (solo observar)

1. **Revisión de Meta** — los anuncios están "Procesando". En fitness a veces rebotan por política; si alguno sale Rechazado, revisar el motivo.
2. Cuando pasen a **Activo**, empieza a entregar y a gastar (Meta cobra sobre la marcha por umbrales, no al final).
3. Dejar el reporte A vs B listo en PostHog leyendo `utm_content`.
