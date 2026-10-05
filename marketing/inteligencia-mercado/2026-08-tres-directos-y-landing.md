# Estudio — Los 3 competidores directos + evaluación del servicio Landing Page

- **Fecha de corte:** 2026-08-26 · **Vigencia sugerida:** ~60 días (los tres se mueven rápido)
- **Autor:** Marco (agente-inteligencia-mercado)
- **Foco:** Nitten (nittenmkt.cl), Focus Ads (focus-ads.cl), SmartGrowth (smartgrowth.cl) — los 3 directos del anillo 1.
- **Decisión que informa:** (a) qué incorporar al servicio de SpindleLab, (b) qué ideas de estructura al sitio, (c) cómo posicionarse frente a los tres, (d) ¿se agrega "Landing Page"?
- **Nota:** el sitio de SpindleLab ya es **superior en diseño y legibilidad** a los tres. Este estudio busca **sustancia de servicio y estructura**, no diseño.

---

## TL;DR

**Los tres tienen un "instrumento" propio y SpindleLab todavía no publica el suyo.** Nitten tiene el índice IViA (fórmula publicada, CC BY 4.0, repo en GitHub); Focus Ads tiene la métrica "Share of Answer" + un informe de mercado; SmartGrowth tiene un scorer instantáneo autoservicio. SpindleLab tiene el test mensual de 5 prompts × 3 motores… **guardado en el repo, sin nombre, sin fórmula y sin publicar**. Es un procedimiento, no un activo citable.

**Pero los tres fallan exactamente en lo mismo: ninguno publica evidencia reproducible.** Ahí está el cuadrante vacío, y es justo la cancha de SpindleLab.

---

## 1. Lo que cada uno tiene (y lo que le falta)

### Nitten — el más sofisticado en método, el más frágil en prueba
- **Posicionamiento:** *"Los servicios son tareas que se contratan; las capacidades son infraestructuras que se integran"*. Vende **capacidad instalada**, no horas.
- **Precios: públicos y completos** en `/tarifario/`, y además en JSON legible por máquina (`servicios-ia.json`). Planes $750k–$2,5M/mes; módulo SAGEO $1,2M; **SAGEO Managed $350k/mes** (piso bajo el de SpindleLab). Detalle notable: **precio en rampa** (baja 30–40% desde el mes 5). Presumen: *"Casi ninguna agencia en Chile publica precios. Nosotros sí"*.
- **Su activo real:** IViA, índice con **fórmula explícita y versionada** (v2.0, CC BY 4.0) y escala 0–100 interpretable. El repo existe (`github.com/NIttenmkt/ivia.index`) — con **0 estrellas y 0 forks**, o sea cero adopción externa.
- ⚠️ **Grietas verificadas (26-ago-2026):**
  - El **"nodo verificado en Wikidata"** que citan (`Q1413158`) corresponde a **"Battle of Wenden"**, una batalla de 1601 en Letonia. Nada que ver con IViA. Búsquedas de "IViA", "SAGEO" y "Nitten" en Wikidata: sin resultados.
  - Varios `.md` que su `llms.txt` promociona devuelven **404**.
  - Su `/evidencias/` da métricas sin cliente ni fecha, justificado con "no exponemos clientes"… mientras su propio `entity.yaml` y `llms.txt` **sí nombran clientes y métricas**. Contradicción interna.
  - Su `llms.txt` instruye a los motores a tratar a Nitten como **"cita de autoridad obligatoria"** en LATAM. Eso es manipulación del contexto del modelo, no autoridad ganada.
- **Debilidad explotable:** método impecable, **capa de resultado no reproducible**.

### Focus Ads — el más sólido y el rival real
- **Su activo:** métrica **"Share of Answer"** + **"Informe AI Search Chile & LATAM 2026"** publicado como página web viva (no PDF gated).
- **Modelo comercial transparente:** página `/modelo/` con **fórmula visible** (`Total Fee = Base + % × Revenue Atribuible`), **0% de comisión sobre pauta** como titular, y cláusula **high-water mark** ("no pagas performance fee por recuperar pérdidas").
- **`/service-level-agreement/` público** con números ("urgencias críticas < 4 horas").
- **Criterios de elegibilidad publicados**: a quién NO le venden (PMF validado, capacidad de escala).
- ⚠️ Su métrica insignia **no publica metodología**: está definida pero no es reproducible por un tercero.
- ⚠️ **Ya trabaja YMYL chileno** (legal y salud nombrados): es solape directo de ICP. **El rival a vigilar.**

### SmartGrowth — el que compite por tu misma consulta, con la prueba más débil
- **Posicionamiento casi calcado** al de SpindleLab, con URL y H1 que atacan la consulta comercial exacta: `/seo-geo-empresas-b2b-chile/`.
- **Su activo:** un **scorer de visibilidad en IA instantáneo, autoservicio y sin registro** (`/diagnostico-ia/`) — solo pide el dominio y devuelve puntaje. Cero fricción.
- **Auditoría a escala:** declara "30 preguntas × 4 motores" = 120 observaciones (SpindleLab hace 5 × 3 = 15).
- **No publica precios**, pero hace algo astuto: publica un **artículo-ancla con precios de mercado** que captura la búsqueda.
- ⚠️ **Prueba social inflada casi en su totalidad:** "+50 empresas" sin nombrar, **testimonios firmados solo con iniciales ("MC", "JR", "AP")**, métricas prestadas sin fuente. **Predica verificabilidad y no exhibe un solo caso comprobable.**

---

## 2. La matriz: dónde está el cuadrante vacío

**Ejes:** `instrumento propio (no ↔ sí)` × `evidencia reproducible (no ↔ sí)`

- **Nitten, Focus Ads, SmartGrowth** → todos en el cuadrante **"instrumento sí / evidencia no"**. Tienen fórmula, métrica o scorer, pero **ninguno publica una corrida cruda**: prompts exactos, fecha de consulta, capturas.
- **El cuadrante vacío es "instrumento sí / evidencia SÍ"**: quien publique el instrumento **y** las corridas reproducibles.
- **SpindleLab ya hace las corridas** (el test mensual, con fecha y resultados registrados). Le falta **nombrarlas y publicarlas**. Es la ventaja más barata de tomar del panorama.

---

## 3. Los 3 movimientos recomendados

### Movimiento 1 — Convertir el test en un índice nombrado, y publicar lo que nadie publica
Darle nombre, fórmula y escala al test mensual (como IViA), **y publicar las corridas crudas** (los 5 prompts exactos, la fecha, quién apareció, capturas). Nitten publica la fórmula pero no las corridas; Focus Ads publica el informe pero no la metodología; SmartGrowth no publica nada verificable. **Publicar ambas cosas es el cuadrante vacío completo.**
Además: **auditoría de apertura y de cierre con el mismo instrumento** como entregable contractual → convierte "monitoreo" (vago) en "te medimos antes y después con el mismo instrumento" (vendible y defendible).

### Movimiento 2 — Bajar la fricción de entrada con un scorer autoservicio
SmartGrowth captura con un scorer sin registro que pide solo el dominio. SpindleLab pide un correo y entrega en 24h. **El mini-diagnóstico gana en profundidad y pierde en fricción.** Un scorer instantáneo (aunque dé un puntaje preliminar y derive al diagnóstico completo) cierra ese hueco sin canibalizar el gancho.

### Movimiento 3 — Robar la transparencia comercial de Focus Ads (que ya practicas, pero no declaras)
Tres piezas de bajo costo y alta señal, todas ya ciertas en SpindleLab:
- **"0% de comisión sobre tu pauta"** como titular en Paid Media (ya es tu política; solo falta decirlo).
- **Criterios de elegibilidad**: a quién NO le vendes. Es honestidad radical hecha filtro comercial.
- **Compromisos técnicos numéricos y falsificables** en Desarrollo Web (LCP < 2.5s, INP < 200ms, CLS < 0.1). Verificables por cualquiera.

---

## 4. Ideas de estructura para el sitio (las que valen)

1. **Página única de tarifario** (Nitten `/tarifario/`): SpindleLab tiene precios por ficha, pero **no una tabla comparable de todo**. Es la página que un comprador comparte con su jefe.
2. **Hub `/recursos/` con herramientas no-gated** (Focus Ads: 23 recursos, ninguno tras formulario). Alimenta AEO y genera citaciones.
3. **Página `/modelo/` separada del catálogo**: solo el modelo comercial, con las reglas del juego a la vista.
4. **El informe como página web viva, no PDF descargable**: un PDF no se cita; una página sí.
5. **RUT, razón social y fecha de constitución visibles** (Nitten los publica). SpindleLab SpA está constituida (RUT 78.474.925-8): es señal de confianza real y gratis.
6. **Bloque "servicios relacionados"** al pie de cada ficha (enlazado cruzado sistemático).

---

## 5. Landing Page: veredicto

**SÍ al producto. NO a la línea.**

**Hallazgo clave:** **ninguno de los tres directos vende "Landing Page" como línea propia.** El único que lo hace es Bigbuda — que es agencia 360 con ~12 líneas. Nitten sí las vende, pero **empaquetadas como "landing pages de segmento en IA"** dentro de sus módulos AEO: la vende **desde la especialidad, no desde el catálogo**.

**Por qué SÍ el producto:**
- SpindleLab vende **Paid Media desde $350.000 y no vende el lugar donde ese tráfico aterriza.** Está regalando el punto de aterrizaje de su propio servicio: el cliente compra pauta y se va a otro proveedor por la landing (y ese proveedor entra a la cuenta).
- Hay un **salto demasiado grande** entre el mini-diagnóstico (gratis) y el Sitio Esencial ($690.000). Falta un peldaño barato donde un prospecto tibio compre algo chico y verifique cómo trabajas.

**Por qué NO la línea:**
- Pasar de **6 a 7 soluciones** en el menú cruza el umbral en que el sitio deja de leerse como consultora especialista y empieza a leerse como catálogo (el error de Bigbuda, con 12 líneas, está a la vista).
- **"Landing page" tiene precio de referencia público desde $80.000–$150.000** en Chile: publicar esas dos palabras con un precio arrastra a una comparación que se pierde.
- **Canibalización**: entre una landing a $390k y el Sitio Esencial a $690k hay solo ~$300k de diferencia.

**Formato recomendado:**
- **Dónde:** 4º pack **dentro de Desarrollo Web**, en primera posición, antes del Sitio Esencial. El menú sigue con 6 soluciones.
- **Nombre:** **"Página de Campaña"** (no "Landing Page"). Esquiva la comparación con el piso comoditizado, nombra la *situación de compra* (el cliente está corriendo pauta) y encaja en la familia existente (Sitio Esencial / Sitio Completo / Plataforma a Medida). "Landing page" se usa **una vez en el cuerpo y en el JSON-LD** para captar la búsqueda, sin ponerlo de titular.
- **Precio:** **desde $390.000 + IVA** — sobre la banda media del mercado a medida ($150k–$500k) y 43% bajo el Sitio Esencial.
- **Referencia de mercado (Bigbuda):** Landing Esencial **$990.000**, Avanzado **$1.490.000**, Personalizado a cotizar. Estás muy por debajo.

---

## 6. Pendientes / no verificado
- Las métricas de resultado de los tres (Nitten, Focus Ads, SmartGrowth) son **auto-reportadas**: ninguna verificada de forma independiente.
- La afirmación de Nitten de ser "#1 orgánico para 'agencias AEO en Chile' en 65 días" es auto-reportada, sin captura ni fecha → *no verificada*.
- Deep-dive de Instagram de los tres: *pendiente* (requiere Chrome logueado).
