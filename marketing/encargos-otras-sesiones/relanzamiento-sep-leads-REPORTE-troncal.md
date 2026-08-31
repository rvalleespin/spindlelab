# Informe al troncal — Leads relanzamiento septiembre

**De:** Dereck (buscar-leads) · **Para:** Tomás (troncal) · **Fecha:** 31-ago-2026
**Encargo origen:** `relanzamiento-sep-leads-dereck.md` (de Marta) · **Estado: ✅ COMPLETO (ambas entregas)**

## Resumen ejecutivo
Se levantaron **70 leads limpios y dedupeados** para los lotes de septiembre, sin costo de plataforma (Apollo cancelado; fuente Google Maps + curl). Cubre prácticamente la necesidad de la campaña. Listo para Emilia.

## Números
| Rubro | Meta | Entregado | Estado |
|---|---|---|---|
| Inmobiliarias / corredoras | ~40 | **38** | ✅ en meta |
| Contadores | ~40 | **32** | 🟨 -8 del redondo |
| **Total limpios** | ~80 | **70** | 🟩 cubre semanas 1, 2 y reanudación |

- **Entrega 1 (dedup, era sáb 29):** 17 muestras cruzadas contra 141 enviados + 157 abogados → **0 colisiones**.
- **Entrega 2 (ampliación, era mié 3-sep):** adelantada a hoy. Inmobiliarias 10→38, contadores 7→32 (+53 net-new).
- CSV: `ventas/contactos-google-maps-inmobiliarias.csv` (38), `ventas/contactos-google-maps-contadores.csv` (32). Cada fila con email real + hallazgo verificado (gancho de Emilia) + marca de dedup.

## Encaje con el canon de envíos
Canon septiembre: **10/día · tope 50/sem · 3 toques · semana 15–21 vetada**. Con 70 leads limpios se cubren los lotes de las semanas 1, 2 y la reanudación (22-sep+). El déficit son ~8 contadores para llegar al 40 redondo.

## Costo y método
- **$0** (Apollo dado de baja el 26-ago; no reactivar sin OK de Ramón).
- Google Maps (dominio) + curl (email público + auditoría del sitio). 8 búsquedas rubro×comuna (Las Condes, Providencia, Ñuñoa, Vitacura, Sto Centro, Maipú, La Florida).
- Ratio usable ~55–70%. Attrition normal: sitios que bloquean curl (403/Cloudflare), solo-formulario, dominios parkeados, caídos (500). Descartados los gigantes off-ICP (SOCOVESA, Big-4, franquicias Remax/Coldwell).

## Handoff
CSV limpio → **Emilia** (`relanzamiento-sep-outbound-emilia.md`) para armar los lotes. Todo dedupeado; puede tomar cualquier fila sin re-chequear.

## Riesgos / decisiones para el troncal
1. **Contadores en 32 vs 40.** Menor. Se puede toppear ~8 en una corrida corta (semi-manual, necesita el navegador del iMac) antes de que Emilia agote la lista. Decisión: ¿lo cierro ahora o vamos con 70?
2. **⚠️ Bug del Copiloto outbound (afecta ENVÍOS).** La rutina de follow-ups estuvo poniendo el destinatario en `hola@spindlelab.cl` (a sí mismo) e hipervinculando el dominio; 3 follow-ups se auto-enviaron el 28-ago (prospectos sin toque 2, ya recuperados en borrador). El parche está listo pero **en pausa por decisión de Ramón hasta que salgan las nuevas indicaciones de la campaña.** Mientras siga corriendo, repetirá el error a diario. Decisión: priorizar el parche o pausar la rutina.
3. **Fuente semi-manual.** Google Maps necesita navegador logueado → no corre en rutina de nube como la de abogados. La reposición de leads es por tandas a pedido, no automática.

## Pendiente menor
Toppear ~8 contadores para el 40 (opcional, según lo que Emilia necesite para los lotes).
