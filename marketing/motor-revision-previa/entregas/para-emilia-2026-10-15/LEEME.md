# Entrega del motor de revisión previa para Emilia (15-oct-2026)

**De:** sesión de construcción del motor · **Para:** Emilia (agente-outbound) y el troncal
**El motor no escribe el correo ni lo envía.** Entrega el hallazgo en el formato que Emilia ya consume.

## Qué hay

| Archivo | Para qué |
|---|---|
| `para-emilia.csv` | **Encabezado idéntico al de los lotes de Dereck:** `empresa,dominio,email,hallazgo_medido,estado`. Entra a Emilia sin tocar nada. |
| `para-emilia-detalle.csv` | Lo que no cabe en esas 5 columnas, por dominio: cómo decirlo en castellano, el arreglo que se vende, cómo comprobarlo, qué NO afirmar. |

Cada fila del detalle apunta a su `ficha.md` en `corridas/`, con las capturas de evidencia.

## Cómo encaja en el circuito

```
Dereck (leads) → MOTOR (analiza el sitio: problema + qué se puede arreglar)
              → para-emilia.csv → Emilia (escribe con la estrategia de venta que ya tiene)
              → Ramón abre el sitio a mano y aprueba → envía
```

La estrategia de venta del correo **no se toca**: la forma, el largo, el asunto y el cierre siguen
siendo los de `estrategia-outbound-verifica-y-cumple.md` §7. El motor aporta la materia prima.

## Lo que Emilia necesita saber de esta entrega

1. **Ningún hallazgo está verificado por una persona.** Están medidos en dos corridas y confirmados en
   una tercera por el asistente, con capturas. La estrategia §2 y §3 piden abrir el sitio en un
   navegador antes de que el hallazgo vaya en un correo: eso sigue pendiente y es de Ramón.
2. **`hallazgo_medido` está en el vocabulario de la sonda a propósito** (cookies, proveedores), como en los
   lotes anteriores. **No va así al correo.** La columna `como_decirlo_en_castellano` del detalle es la
   consecuencia en llano, sin nombres de cookies. La estrategia §7 pide exactamente eso.
3. **El arreglo y el precio salen solo de lo documentado.** El kit de Verifica y Cumple
   ("Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez") es
   texto de correos ya aprobados. **No se ofrece plazo**, porque ningún correo aprobado lo hace.
4. **Qué hacer con cada estado:**
   - `medido 14-oct por el motor, confirmado en 3a corrida...` → hay hallazgo; verificar a mano y escribir.
   - `Sin gancho estable...` → no inventar uno. Emilia lo pide o lo reusa, según su método.
   - `No enviar: ...` → sitio en orden o descartado. Un 403 al abrirlo puede ser el firewall del sitio
     bloqueando la IP de datacenter del motor, no un sitio caído.
5. **Todos son el mismo hallazgo** (cookies de rastreo escritas antes de cualquier aviso). Con un gancho que
   aplica a 13 de cada 20 sitios, conviene variar el párrafo del dolor, como pide la estrategia §7 (regla 6).

## Lo que el motor NO hace

No envía, no registra en el pipeline, no edita la lista de exclusión, no toca la estrategia. Consultó
`ventas/lista-exclusion.csv` y lo ya contactado antes de medir cada dominio.
