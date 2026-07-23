# Handoff paid media → sesión troncal — Revisión Google Ads 23 jul 2026

Reporte de la sesión especializada de paid media (`/persona-paid-media`) para que la sesión troncal lo reconcilie en `plan-operativo-90-dias.md`. Esta sesión **no** editó el plan directo, por protocolo (`agente-troncal-marketing`, punto 1) y porque `origin/main` había divergido de esta rama en ese archivo.

## Contexto
Primera revisión semanal ejecutada con acceso a navegador real (Claude en Chrome), no con capturas guiadas. Cuenta correcta confirmada: **597-527-6690** (`hola@spindlelab.cl`). Período analizado: 13-23 jul 2026.

## Chequeos de rutina — todo en orden
- **IA Max:** sigue desactivado (verificado en el interruptor de Configuración). Las 2 filas "IA Max" del informe de términos (`agencia de diseño web`, `https posicionamiento club…`) son residuo del período 13-20 jul, no reactivación.
- **Aplicación automática de recomendaciones:** apagada (0/7 y 0/14). Nada se aplica solo.
- **Redes:** solo Búsqueda de Google. **Pujas:** Maximiza las conversiones. **Presupuesto:** 1.500 CLP/día. Sin defaults colados.
- **Negativa `seoptimer`:** activa y marcada "Excluida".
- **Nivel de optimización:** 91,7% (estable vs 91,9% del 20 jul).

## Métricas 13-23 jul (vs línea base 13-20 jul)
| Métrica | 13-20 jul | 13-23 jul |
|---|---|---|
| Impresiones | 138 | 172 |
| Clics | 13 | 16 |
| CTR | 9,56% | 9,30% |
| CPC prom. | 835 | ~886 |
| Costo | 10.858 | 14.173 |
| Conversiones | 0 | 0 |

Lectura: ~1 clic/día, consistente con presupuesto chico. Variaciones de CTR/CPC son ruido con tan pocos clics. Pujas siguen en aprendizaje (no puede salir con 0 conversiones; necesita ~15-30). El 0 en conversiones **no es alarma**: falta de volumen, no problema de medición.

## Términos de búsqueda
Los términos con clics (los que gastan presupuesto) son todos de intención correcta (`analisis seo`, `comprobar seo web`, `evaluar seo de mi web`, `revisar seo`, `analizar seo gratis`, etc.). Sin candidatos nuevos a negativa. No se negativizó nada con "gratis" (la oferta real es gratis). Cola de ~55 términos con 0 clics no revisada fila por fila (no consume presupuesto).

## Cambio ejecutado y aprobado por Ramón: recuperación de calidad del anuncio
- **Hallazgo:** la calidad del anuncio estaba en "Promedio" (el 20 jul se había dejado en "Excelente"). Causa real: **los 4 títulos agregados el 20 jul no habían quedado guardados** — el anuncio tenía solo 9 títulos. (Corrige la hipótesis inicial de que la baja venía de apagar IA Max.)
- **Acción (aprobada por Ramón, guardada y verificada):** se agregaron 6 títulos distintos → el anuncio quedó con **15 títulos** y la calidad subió de "Promedio" a **"Buena"**. Descripciones (4/4) intactas.
- Títulos agregados: `Consultor SEO Técnico`, `SEO para Clínicas Dentales` (ambas keywords que no tenían título propio), `Errores SEO que te Frenan`, `Agenda tu Diagnóstico`, `Posiciona tu Web en Google`, `Más Clientes desde Google`.
- Guardado confirmado: la fila del anuncio pasó de "Y 6 más" a "Y 12 más" (= 15 títulos).

## Nota lista para pegar en plan-operativo-90-dias.md (sub-bullet bajo el ítem "Encender Google Ads" de Semana 5, junto a la Nota 15 jul)
> - **Nota 23 jul — primera revisión semanal (sesión paid media, con navegador):** cuenta 597-527-6690 confirmada. IA Max sigue apagado; auto-aplicación de recomendaciones apagada (0/7, 0/14); redes solo Búsqueda; pujas Maximiza conversiones aún en aprendizaje (0 conversiones, esperado). Métricas 13-23 jul: 172 impr, 16 clics, CTR 9,30%, CPC ~886, costo 14.173, 0 conv. Términos con clics todos de intención correcta, sin negativas nuevas (`seoptimer` sigue excluida). **Se detectó que los 4 títulos agregados el 20 jul no habían quedado guardados** (el anuncio tenía 9 títulos y la calidad había vuelto a "Promedio"); se re-agregaron 6 títulos distintos → 15 títulos, calidad "Promedio" → "Buena", descripciones intactas. Próxima revisión: términos de búsqueda en ~1 semana.

## Verificación pendiente para la troncal (protocolo punto 2)
El estado externo (Google Ads) es verificable con captura si se requiere. El cambio del anuncio quedó guardado en la cuenta; el conteo "Y 12 más" (15 títulos) lo confirma.
