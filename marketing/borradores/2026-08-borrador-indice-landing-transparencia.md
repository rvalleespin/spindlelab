# BORRADOR para revisión — Índice · Página de Campaña · Transparencia comercial

- **Fecha:** 2026-08-26 · **Estado:** BORRADOR. Nada de esto está implementado ni publicado.
- **Origen:** estudio de los 3 directos (`2026-08-tres-directos-y-landing.md`).
- **Qué necesito de ti:** aprobar / ajustar cada bloque. Marco con ⚠️ las decisiones que son solo tuyas.

---

# 1. EL ÍNDICE (el movimiento delicado)

## 1.1 El principio de diseño

Los tres competidores tienen un instrumento con acrónimo (SAGEO, IViA, AXO, R-VIA, Share of Answer) y **ninguno publica una corrida reproducible**. Por eso el borrador se construye sobre dos decisiones:

1. **Fórmula simple y auditable**, no barroca. La de Nitten pondera 4 dimensiones con decimales; se ve técnica pero nadie la puede reproducir. La nuestra tiene que poder recalcularla un tercero a mano.
2. **El diferencial NO es la fórmula: son las corridas.** Publicamos los prompts exactos, la fecha, el motor y qué respondió cada uno. Eso es lo que ninguno hace.

⚠️ **Regla de marca que hay que sostener:** si publicamos el índice, **publicamos también nuestro propio puntaje — incluido el 0**. Es incómodo y es exactamente lo que lo vuelve creíble. Ninguna de las tres agencias publicaría un cero. Si esto no te acomoda, mejor no publicamos el índice.

## 1.2 El nombre ⚠️ (decisión tuya)

**Importante:** hay que alejarse de "IViA" (Nitten) para no leerse como copia. Tres opciones:

| Opción | Nombre | A favor | En contra |
|---|---|---|---|
| **A** *(mi recomendación)* | **Índice de Citabilidad** | "Citabilidad" ya es palabra tuya (la usas en el sitio y en el método). Es descriptiva, sin acrónimo, y en español claro. Diferencia total con IViA. | Menos "técnica" a primera vista |
| **B** | **El Test de las 15** | 5 prompts × 3 motores = 15 observaciones. Memorable, honesto, imposible de inflar. | Se rompe si algún día amplías el número |
| **C** | **Índice SpindleLab de Visibilidad en IA** | Máxima claridad de entidad (la IA lo atribuye sin ambigüedad) | Largo; suena a auto-bombo |

*(Nota: los tres competidores usan acrónimos. No usar uno puede ser, en sí, el gesto diferenciador.)*

## 1.3 La fórmula (borrador)

Cada combinación **prompt × motor** se puntúa de 0 a 3:

| Puntos | Qué significa |
|---|---|
| **0** | No apareces |
| **1** | Te mencionan al pasar (nombre suelto, sin contexto) |
| **2** | Te mencionan con una descripción correcta de lo que haces |
| **3** | Te nombran entre las primeras opciones o como recomendación principal |

**Índice = (puntos obtenidos ÷ puntos posibles) × 100**

Con el protocolo actual: 5 prompts × 3 motores = **15 observaciones × 3 = 45 puntos posibles**.

**Escala:**

| Rango | Estado |
|---|---|
| 0–10 | Invisible |
| 11–30 | Presencia marginal |
| 31–60 | Presencia establecida |
| 61–85 | Referente de categoría |
| 86–100 | Dominancia de categoría |

**SpindleLab hoy (25-ago-2026): 0 / 45 = 0 — Invisible.**

## 1.4 Qué se publica (esto es el diferencial)

Una página `/indice/` (o dentro de `/metodo/`) con:

1. **La fórmula y la escala**, completas y libres de usar (licencia abierta, como Nitten).
2. **El protocolo**: los **5 prompts exactos**, los 3 motores, la cadencia (mensual), y la regla de que no se cambian para que la comparación sea válida.
3. **Las corridas crudas, con fecha**: qué respondió cada motor a cada prompt, quién apareció. Esto es lo que nadie publica.
4. **Nuestro propio puntaje**, actualizado cada mes. Hoy: 0.
5. Un enlace a la guía del blog ("Cómo elegir y verificar una agencia de AEO/GEO") para cerrar el círculo.

## 1.5 Cómo se convierte en servicio

- **Auditoría de apertura y cierre con el mismo instrumento**: se mide al cliente el día 0 y al día N. Convierte "monitoreo" (vago) en **"te medimos antes y después con el mismo instrumento y te muestro las corridas"** (vendible, defendible).
- Se agrega como **entregable nombrado** en los planes de Visibilidad en IA y Acompañamiento (donde hoy dice "~10 consultas medidas al mes").

## 1.6 Riesgos que asumimos (dichos de frente)

1. **Publicar un 0 propio.** Es el precio de la credibilidad. Se puede encuadrar bien: *"llevamos semanas online; este es nuestro punto de partida y lo vamos a mostrar mes a mes"*.
2. **Alguien puede usar el índice para medirte a ti.** Justamente: si el instrumento es honesto, tiene que poder usarse en contra. Eso es lo que lo hace instrumento.
3. **Compromiso de cadencia.** Si se publica "mensual", hay que correrlo todos los meses. Un índice abandonado es peor que no tenerlo. ⚠️ **Confirma que puedes sostener la cadencia mensual antes de publicarlo.**

---

# 2. PÁGINA DE CAMPAÑA (la landing)

## 2.1 Decisiones ya tomadas en el estudio
- **NO** es una 7ª solución. Es el **4º pack dentro de Desarrollo Web**, en primera posición.
- Se llama **"Página de Campaña"**, no "Landing Page" (esa palabra tiene precio de referencia público desde $80.000 y arrastra a una comparación que se pierde). El término "landing page" aparece **una vez** en el cuerpo y en el JSON-LD, para captar la búsqueda.

## 2.2 El pack, tal como iría en el sitio (borrador de copy)

> **[ CAMPAÑA ]**
> ### Página de Campaña
> *Una página hecha para convertir la pauta que ya estás pagando.*
>
> **DESDE $390.000** + IVA
>
> - Una página, pensada para una campaña y una oferta
> - Diseño a medida, sin plantilla
> - SEO técnico y medición listas desde el primer día
> - Entrega en ~1 semana
> - Ideal si estás corriendo Google o Meta Ads
>
> `[ Agenda tu diagnóstico ]`

**Y en la letra chica de la sección** se agregaría: *"¿Necesitas más de una página? El Sitio Esencial parte en $690.000."* — para orientar bien y reducir la canibalización.

## 2.3 Cómo queda la escalera completa de Desarrollo Web

| Pack | Desde | Para quién |
|---|---|---|
| **Página de Campaña** *(nuevo)* | **$390.000** | Una campaña, una oferta |
| Sitio Esencial | $690.000 | Home + hasta 5 páginas |
| Sitio Completo *(más elegido)* | $1.190.000 | Home + hasta 12 + blog/CMS |
| Plataforma a Medida | cotización | Integraciones, multi-idioma |

**Referencia:** Bigbuda cobra **$990.000** por su Landing Esencial y **$1.490.000** por la Avanzada. Quedas muy por debajo.

## 2.4 Dónde más se menciona
- En **Paid Media (Google)**: una línea que diga que la pauta puede aterrizar en una Página de Campaña (venta cruzada natural, que hoy estás regalando).
- ⚠️ **Riesgo a tener presente:** el overhead comercial de un ticket de $390k es igual al de uno de $1,19M. Recomiendo venderla **atada a Paid Media**, no como producto suelto que llene la agenda.

---

# 3. TRANSPARENCIA COMERCIAL (lo que ya haces y no dices)

Tres piezas, todas **ya ciertas** en SpindleLab. Solo falta declararlas.

## 3.1 "0% de comisión sobre tu pauta" → en Paid Media (Google)

> **No cobramos comisión sobre tu pauta.**
> Nuestro fee es fijo y no cambia si inviertes más. Si te recomendamos subir el presupuesto, es porque los datos lo respaldan, no porque nos convenga.

*(Focus Ads lo usa de titular y es un argumento fuerte: la mayoría de las agencias cobra un % de lo que gastas, lo que crea un incentivo perverso.)*

## 3.2 Criterios de elegibilidad: a quién NO le vendemos ⚠️ (decisión tuya)

Bloque corto en `/servicios/` o `/nosotros/`. Borrador:

> **Con quién trabajamos mejor (y con quién no)**
> Trabajamos bien con empresas B2B y de sectores donde la confianza importa: finanzas, salud, legal. Necesitamos que tengas un negocio andando, alguien que pueda aprobar decisiones, y ganas de mirar los datos.
> **No somos la mejor opción si** buscas resultados en 30 días, si necesitas que alguien produzca todo el contenido creativo, o si esperas que te garanticen el primer lugar. Eso no lo hacemos, y preferimos decirlo antes.

⚠️ Filtra prospectos (bueno) pero también cierra puertas. Dime si te acomoda o si lo suavizamos.

## 3.3 Compromisos técnicos numéricos → en Desarrollo Web

> **Lo que te comprometemos, en números**
> Todo sitio que entregamos cumple: **LCP < 2,5s · INP < 200ms · CLS < 0,1** (los umbrales de Google, medibles por cualquiera con PageSpeed Insights). Si no los cumple al entregar, lo arreglamos sin costo.

*(Es verificable por terceros. Focus Ads lo hace y es una señal potente. ⚠️ Confirma que estás dispuesto a comprometerlo por escrito.)*

---

# 4. IDEAS DE SITIO (las chicas, sin decisión de marca)

Estas las puedo implementar sin riesgo si me das el OK global:

| # | Qué | Dónde | Por qué |
|---|---|---|---|
| 1 | **Página de tarifario único** con las 6 soluciones y todos sus packs en una tabla comparable | `/precios/` nueva | Es la página que un comprador le manda a su jefe. Nitten la tiene y funciona |
| 2 | **RUT, razón social y fecha de constitución** visibles | footer o `/nosotros/` | Señal de confianza real y gratis. SpindleLab SpA, RUT 78.474.925-8 |
| 3 | **Bloque "Soluciones relacionadas"** al pie de cada ficha | las 6 fichas | Enlazado cruzado sistemático, reparte autoridad |
| 4 | **Hub `/recursos/`** con las herramientas y guías, ninguna tras formulario | nueva | Focus Ads tiene 23 recursos no-gated. Alimenta AEO y genera citaciones |

---

# 5. LO QUE NO RECOMIENDO HACER (aunque ellos lo hagan)

- ❌ **Scorer instantáneo automático** (SmartGrowth): suena bien, pero un puntaje automático sin corrida real contradice tu propio índice. Si el índice se mide a mano y con evidencia, un widget que escupe un número al instante lo desmiente. **Mejor mantener el mini-diagnóstico humano en 24h como gancho.**
- ❌ **Precio en rampa** (Nitten, -30% desde el mes 5): honesto en teoría, pero complica la venta de un operador único.
- ❌ **Auto-rankearse en un listicle propio**, `llms.txt` con instrucciones a los motores, o nodos de entidad falsos. Es lo que hace la competencia y es exactamente lo que tu marca ataca.

---

# 6. RESUMEN DE DECISIONES QUE NECESITO DE TI

| # | Decisión | Opciones |
|---|---|---|
| 1 | **Nombre del índice** | A) Índice de Citabilidad *(recomendado)* · B) El Test de las 15 · C) Índice SpindleLab de Visibilidad en IA |
| 2 | **¿Publicamos nuestro propio 0?** | Sí (es lo que lo hace creíble) / No (entonces no publicamos índice) |
| 3 | **¿Puedes sostener la cadencia mensual?** | Sí / Trimestral / Mejor no comprometer cadencia |
| 4 | **Página de Campaña: ¿nombre y precio?** | "Página de Campaña" desde $390.000 / ajustar |
| 5 | **Criterios de elegibilidad** | Publicar tal cual / suavizar / no publicar |
| 6 | **Compromisos técnicos numéricos** | Publicar / no comprometer por escrito |
| 7 | **Ideas de sitio (§4)** | Las 4 / algunas / ninguna |
