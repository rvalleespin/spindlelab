# Contactos ya enviados — registro y recomendación

**Actualizado:** 26-ago-2026 · **Fuente:** Gmail `hola@spindlelab.cl` (el estado real de un prospecto vive en Gmail, no en los CSV de leads).
**Archivo:** [`REGISTRO-enviados.csv`](REGISTRO-enviados.csv) — 141 contactos, con rubro, fecha del primer toque, nº de toques, estado y acción recomendada.

> ⛔ **Regla de dedup (28-ago):** ningún CSV nuevo pasa a redacción sin cruzarse
> antes contra este registro. Canon de envíos: 3 toques máx · 10/día · 50/semana.

## Foto rápida
| | |
|---|---|
| **Total contactados** | 141 |
| Salud (dental/estética/médico) | 72 |
| Abogados | 68 |
| Media/Turismo | 1 |
| **Respondieron (activos)** | 6 |
| Rebotes (muertos) | 3 |
| Abogados nuevos en curso (rutina hace toque 2) | 36 |
| Para guardar y reactivar | 96 |

## Recomendación: ¿seguir insistiendo o guardar?

**Regla corta: NO insistir más allá del toque 2. Guardar y reactivar más adelante con un gancho nuevo.**

Por qué guardar en vez de insistir:
- Con **un solo buzón** (hola@), un tercer correo en frío a quien no contestó **quema reputación de dominio** y sube el riesgo de spam justo cuando la rutina necesita seguir entregando.
- La tasa de respuesta de un 3er toque en frío es marginal. El retorno está en **gente nueva** (por eso la cosecha de Apollo) y en **cerrar a los que ya respondieron**.
- Reactivar en 4-6 semanas rinde mucho más **con un motivo real nuevo**: un caso de éxito (prueba social cuando cierres el primer cliente) o un ángulo distinto. No un "te vuelvo a insistir".

### Qué hacer con cada grupo
1. **Respondieron (6) → GESTIONAR YA.** Aquí está el dinero. Son:
   - `ivalenzuela@grupoaltum.cl` (abogados) — mini-diagnóstico en curso.
   - `gzamora@corteszamora.cl` (abogados) — conversación viva.
   - `vtagle@bhabogados.cl` (abogados) — respondió 25-ago.
   - `pcalvache@dentimagen.cl` (dental) — intercambios previos.
   - `cdelacruz@clinicahunza.cl` (dental) — respondió el 19-ago **rechazando el servicio** (confirmado por Ramón, 28-ago). Cerrado, no recontactar.
   - `revista@chefandhotel.cl` — es una **revista/medio**, no un cliente típico; sirve para prensa/visibilidad, tratar aparte.
2. **Abogados nuevos, sin respuesta (36) → EN CURSO.** No tocar a mano: el copiloto les manda el toque 2 solo. Después de eso, pasan a "guardar".
3. **Resto sin respuesta (96) → GUARDAR.** Ya tienen sus 2 toques. Archivar y reactivar en 4-6 semanas con gancho nuevo.
4. **Rebotes (3) → DESCARTAR.** No reintentar: `zenclinic.cl`, `acodontologia.cl`, `dentalschneider.cl` (email inexistente).

## Cómo se usa este registro
- **Dedup:** cualquier extracción o rutina debe cruzar contra este archivo (columna `email`) para no re-contactar.
- **Reactivación:** cuando toque, filtrar por `accion = GUARDAR` y `primer_toque` de hace ≥4 semanas.
- Se regenera leyendo Gmail; no editar a mano salvo para notas.
