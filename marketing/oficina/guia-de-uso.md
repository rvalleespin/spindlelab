# Guía de uso de la Oficina — ayuda de memoria

> Para tener a mano al arrancar cualquier proyecto. El organigrama dice quién es
> quién; los flujos dicen cómo se pasan la posta; **esto dice qué escribir tú**.
> Última actualización: 2026-08-02.

---

## Cómo poner a trabajar a un empleado

1. Abre Claude Code **parado en el repo** que corresponde:
   - Trabajo de **agencia / clientes** → repo de SpindleLab.
   - Trabajo de **un producto propio** (Praxi, lo que venga) → repo de ese producto.
2. Escribe `/` + el nombre de la skill (ej. `/agente-crm`). El agente lee su
   memoria en `oficina/memoria/` y arranca con su contexto.
3. **Si la skill es nueva y no aparece: cierra Claude Code y ábrelo de nuevo**
   (se escanean al arrancar; `/clear` no basta).

---

## El atajo: si no sabes por dónde empezar, llama a Tomás

Para un **objetivo completo** ("conseguir 5 clientes dentales", "lanzar la landing
de Praxi", "sacar la campaña de agosto"), no tienes que orquestar tú: llama a
**Tomás** (`/agente-troncal-marketing`), la **cabeza operadora**. Él arma el plan,
decide qué agente hace qué, reparte las tareas y lo lleva hasta done — y te avisa
dónde necesita tu OK (envíos, gasto) o tu decisión. La tabla de abajo es para
cuando quieres llamar directo a un especialista para una tarea puntual.

## "Quiero X → llamo a Y" (la tabla de memoria)

| Necesito… | Empleado | Comando |
|---|---|---|
| Investigar mercado/competencia **antes** de decidir precio o posicionamiento | Vera | `/agente-inteligencia-mercado` |
| Encontrar clientes / armar lista de leads | Dereck | `/buscar-leads` |
| Convertir esa lista en emails listos para enviar | Emilia | `/agente-outbound` |
| Un diagnóstico gratis que enganche a un prospecto | Valen | `/mini-diagnostico` |
| Poner el pipeline al día / ver qué tengo pendiente en ventas | Raquel | `/agente-crm` |
| Entregarle el servicio a un cliente **ganado** (SEO técnico + IA) | Simón | `/agente-seo-aeo` |
| Escribir un artículo / ad copy / guion de Reel / email | Renata | `/agente-copywriter` |
| Un post de redes con el tono y la cadencia correctos | Cata | `/persona-social-media` |
| Una pieza visual (carrusel, Reel, key visual) | Bruno | `/persona-director-creativo` |
| Revisar/ajustar Google Ads | Gonzalo | `/persona-paid-media` |
| Montar/gestionar Meta Ads | Fran | `/persona-meta-ads` |
| Tocar el sitio web o publicar un blog | Diego | `/persona-disenador-web` |
| Diseñar una pantalla / flujo / feature de un producto | Nadia | `/producto-ui-ux` |
| Onboarding / activación / retención de un producto | Pía | `/agente-growth-producto` |
| Medir resultados / armar un reporte / atribución | Nora | `/agente-analitica` |
| **Lograr un objetivo completo** (que alguien arme el plan y dirija a los demás) | Tomás (PM) | `/agente-troncal-marketing` |

---

## Secuencias típicas (elige según lo que estés haciendo)

**A · Conseguir un cliente nuevo (agencia)**
`Vera` (¿vale la pena el nicho? ¿qué cobran?) → `Dereck` (leads) → `Emilia`
(secuencia) → **tú apruebas y envías** → `Raquel` (pipeline) → `Valen`
(diagnóstico) → cierre → `Simón` (entrega) → `Nora` (mide).

**B · Lanzar o crecer un producto propio (Praxi y lo que venga)**
`Vera` (mercado, precio, hueco) → `Nadia` (diseño) → `Pía` (activación/retención)
→ `Renata` (copy de lifecycle) → `Nora` (analítica de producto).

**C · Campaña de contenido**
`Vera`/tema → `Renata` (escribe) → publica: `Diego` (blog) / `Cata` (redes) /
`Bruno` (visual) → `Nora` (mide qué trae tráfico).

**D · Campaña paga**
`Renata` (ad copy) → `Gonzalo`/`Fran` (montan) → **tú apruebas cada cambio** →
`Nora` (atribuye: leads de ads, CPL).

**E · Antes de una decisión cara (precio, posicionamiento, entrar a un mercado)**
`Vera` (mira afuera) → `Nora` (contrasta con datos internos) → decisión.

---

## Reglas de oro (para no meter la pata)

1. **Tú apruebas todo lo que envía un email o gasta plata.** Outbound (Emilia) y
   paid (Gonzalo/Fran) proponen; el disparo lo das tú, uno por uno.
2. **Un solo dueño del estado compartido: Tomás.** `pipeline.md`, `plan-operativo`
   y los trackers los escribe el troncal. Los demás reportan, no editan directo.
3. **Commitea antes de cambiar de rama** en GitHub Desktop, o el trabajo sin
   guardar se va al stash (ya nos pasó dos veces).
4. **Reinicia Claude Code** para que aparezca una skill recién creada.
5. **Cero datos inventados.** Nora y Vera citan fuentes; Renata no fabrica prueba
   social; los prospectos/clientes no se nombran sin permiso.
6. **El repo manda.** Las skills viven en el repo (versionadas) y en global (para
   verlas en todos lados). Si divergen, la del repo es la buena.

---

## Cross-proyecto vs. agencia

- **Sirven a TUS productos (viven en global, se ven desde cualquier repo):**
  Vera (mercado), Nadia (diseño de producto), Pía (growth). El producto tiene su
  propio repo y su propia marca — leer su `CLAUDE.md` antes de tocar.
- **Son de la agencia (viven en el repo de SpindleLab):** Dereck, Emilia, Valen,
  Raquel, Simón, Renata, Cata, Bruno, Gonzalo, Fran, Diego, Tomás.
- **Transversal a todo:** Nora (mide agencia y producto), El Sueño (audita el stack).

---

## Dónde está todo

- `oficina/organigrama-oficina.md` — quién es quién, la planilla completa.
- `oficina/flujos-de-trabajo.md` — los flujos por proceso.
- `oficina/memoria/<empleado>.md` — lo que cada uno aprendió a pulso.
- Artefactos vivos en claude.ai: **Inventario de skills** y **Cómo funciona la oficina**.
