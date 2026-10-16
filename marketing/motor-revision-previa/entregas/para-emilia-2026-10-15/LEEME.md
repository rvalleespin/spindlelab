# Entrega del motor de revisión previa para Emilia (15-oct-2026, versión 3)

**El motor no escribe el correo ni lo envía.** Entrega el hallazgo y la oferta en el formato que Emilia ya consume. Origen: `corridas/2026-10-15-lote-21-v3/` (21 sitios de Dereck, 3 corridas de navegador cada uno).

| Archivo | Para qué |
|---|---|
| `para-emilia.csv` | **Encabezado idéntico al de los lotes de Dereck:** `empresa,dominio,email,hallazgo_medido,estado`. Entra sin tocar nada. `hallazgo_medido` va en el vocabulario de la sonda a propósito: **no va así al correo**. |
| `para-emilia-detalle.csv` | Por dominio, lo que sí se usa para redactar: `como_decirlo_en_castellano`, `frase_de_arreglo`, `puerta_a_la_reunion`, `servicio_y_desde_publicado`, `precio_en_el_correo`, `linea_de_precio_de_referencia`, `como_comprobarlo`, `que_no_afirmar`, `otras_ofertas_para_la_llamada`. |

## Reglas que Emilia no cambia
1. **Los hechos.** Se redacta con `como_decirlo_en_castellano` y se respeta `que_no_afirmar`. Si una frase le parece mejor y afirma más, no va.
2. **La puerta a la reunión** es la llamada de 20 minutos (decisión de Ramón, 15-oct). Va tal cual en `puerta_a_la_reunion`.
3. **El precio.** Si la oferta es el **kit de Verifica y Cumple**, el correo lleva "Desde $149.000 + IVA, una vez". Para cualquier otra oferta lleva `linea_de_precio_de_referencia` ("Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada") y **no se cita un número como cotización**. El "desde" del servicio publicado está en el detalle por si Ramón quiere usarlo como referencia.
4. **No hay plazo.** Ningún correo aprobado ofrece uno.
5. **Registro singular** (firma Ramón). Las frases salen de una revisión de tono automática, pero las que no son del kit son **BORRADOR** hasta que Ramón las apruebe.

## Qué hacer con cada `estado`
- `medido por el motor, 3 corridas...` → hay oferta: redactar. **Ramón aprueba cada envío.**
- `Sin gancho estable` → no inventar uno.
- `No enviar: ...` → sitio en orden, excluido, o no abre. Un 403 puede ser el firewall del sitio bloqueando la IP del motor, no un sitio caído.

## Lo que sigue pendiente (no es del motor)
Ninguna oferta se ha enviado, así que no hay dato de conversión. La estrategia §3 pide abrir el sitio antes de enviar: el motor hace 3 corridas y guarda capturas, pero **ninguna persona ha verificado estos hallazgos**. Ver `marketing/encargos-otras-sesiones/encargo-motor-a-sesion-de-leads.md` §7 y §8.
