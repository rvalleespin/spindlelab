# Motor de revisión previa: informe de las 10 primeras corridas

**Para:** el troncal · **De:** sesión de construcción · 14-oct-2026 · rama `claude/motor-revision-previa-build`
**Qué dice la jerarquía que se mide:** `01-jerarquia.md` §6. Dos números por separado: capa 2 *sospechada* y capa 2 *confirmada a mano*.
**Identificadores:** S01 a S10. Los dominios están solo en las fichas internas de `corridas/`; nada de esto sale del repo.

---

## 1. Resultado, sin adornos

| | |
|---|---|
| Capa 2 **sospechada por el motor** | **6 de 10** (S01, S02, S03, S07, S08, S10) |
| Capa 2 **confirmada a mano** | **0 de 6 confirmadas. Pendiente.** Esta sesión es cloud y no puede producir la palabra "verificado". |
| Umbral del encargo (§7.4) | Menos de 5 de 10 **confirmadas** = sigue siendo un chequeo con más pasos. **Hoy no se puede decir que lo supera.** Lo supera si al menos 5 de esas 6 resisten cuando alguien abre el sitio. |

**Hay que decir lo incómodo: los 6 son el mismo hallazgo.** Todos son C1 (rastreadores que
escriben antes de cualquier consentimiento): cookies de Google y, en dos casos, de Meta, ya
escritas en el tramo quieto, sin aviso en pantalla. Es la misma categoría que ya usa la campaña de
Verifica y Cumple. En esta muestra el motor **automatizó un hallazgo conocido**; no descubrió una
categoría nueva. Los otros cuatro candidatos no aportaron nada comprobable (§3).

## 2. Tabla

| ID | resultado | hallazgo | puntero | capa 1 con consecuencia |
|---|---|---|---|---|
| S01 | hallazgo-capa-2 | C1 (estable) | - | - |
| S02 | hallazgo-capa-2 | C1 (estable) | C4 (sospecha) | sin_analitica (ver defecto 3) |
| S03 | hallazgo-capa-2 | C1 (estable) | - | - |
| S04 | solo-capa-1 | - | - | sin_analitica |
| S05 | solo-capa-1 | - | - | sin_ruta_de_contacto_visible; sin_analitica |
| S06 | solo-capa-1 | - | - | sin_analitica |
| S07 | hallazgo-capa-2 | C1 (estable) | - | formulario que pide datos sin enlace a política |
| S08 | hallazgo-capa-2 | C1 (estable) | - | - |
| S09 | solo-capa-1 | - | - | sin_analitica |
| S10 | hallazgo-capa-2 | C1 (estable) | - | formulario que pide datos sin enlace a política |

Reproducible con `node motor/resumen.mjs corridas/2026-10-14`.

## 3. Qué pasó con cada candidato

| | Resultado | Por qué |
|---|---|---|
| **C1** rastreadores | 6 de 10, estable | Cookies visibles ya en el tramo A en las dos corridas. Revisé a la vista la captura del tramo B de dos casos (S01 y S10): no hay aviso de cookies; en S10 hay un modal de captación de leads, que no es un aviso. |
| **C2** medición | 0 | No es el detector demasiado cauto: los 5 sitios con Tag Manager tienen etiquetas de evento o de conversión de Google Ads en el contenedor. Los otros no tenían analítica visible. |
| **C3** borde | 0 como candidato | **2 de 10** (S01 con cuatro agentes, S09 con uno) rechazan al agente de IA por nombre en las dos rondas, pero **ninguno con causa nombrada**. Por la decisión D1 se quedan en capa 1. Es el dato que necesitas para decidir D1: si se relaja, serían 2 de 10 más (aunque S01 ya tenía C1). |
| **C4** entidad | 1 sospecha (S02) | Nunca pasa de sospecha por diseño. |
| **C5** contacto | 0 | 7 de 10 formularios son `no-evaluable` (el envío lo maneja JavaScript o el CMS). El chequeo de correo sin MX **no funciona en este entorno** (defecto 2). |

## 4. Defectos del motor que encontré mientras lo auditaba

1. **S07 se cayó en la primera corrida.** Un formulario con un campo llamado `action` tapa la
   propiedad `form.action` del DOM y devolvía un elemento, no texto. Diagnóstico inicial mío
   equivocado (supuse tiempo agotado). Corregido en la fuente y en el consumidor. Se re-corrió y la
   ficha vigente está en `corridas/2026-10-14-reintento/S07/`. La carpeta original conserva la
   evidencia parcial del fallo y no tiene ficha. **Es un reemplazo anotado; la muestra no cambió.**
2. **El resolutor DNS de este entorno no sirve registros MX** (falla con `ENODATA` hasta para
   gmail.com). El chequeo de "correo sin MX" podía haber dado falsos positivos con dominios que
   solo reciben correo. No disparó en esta muestra porque además exigía que no hubiera registro A,
   pero no era confiable. Ahora hay un control: si el resolutor no puede dar MX de un dominio
   conocido, el chequeo responde `no-evaluable` y **no concluye nada**.
3. **`sin_analitica` se leía solo del HTML.** S02 aparece con ese rótulo aunque la red muestra
   Google Tag cargando (lo inyecta un script). Corregido para que cuente lo visto en la red.
   **No afecta a ningún candidato**, solo ese rótulo de capa 1 en la ficha de S02.
4. Además, la sonda de borde ahora corta a los 8 s por petición y aborta si el sitio no responde al
   agente normal. Se agregó pensando en un riesgo que no era la causa del fallo de S07; queda como
   protección.

Las fichas S01 a S06 y S08 a S10 se generaron **antes** de las correcciones 2 y 3. No hay candidato
afectado; el único cambio visible sería el rótulo de S02.

## 5. Límites de esta medición

- **Un solo rubro.** Los 10 son Contadores: la regla "primeros 10 de los CSV en orden" lo produjo.
  No representa a hoteles, clínicas ni inmobiliarias.
- **Entorno cloud:** IP de datacenter y salida por proxy. Puede distorsionar la sonda de borde y
  cualquier sitio que trate distinto a una IP de datacenter. Hay que repetir C3 desde el Mac.
- **Sin confirmación humana.** Ninguna afirmación de las fichas está verificada.
- **Muestra de 10:** sirve para ver si el motor corre y qué produce, no para estimar tasas.

## 6. Qué haría falta, en orden

1. **Que alguien abra los 6 sitios** (`ficha.md` de cada uno trae la sección "dónde mirar": cookies
   del navegador sin tocar nada ~10 s, y de nuevo tras mover el mouse). Eso convierte "6 sospechados"
   en un número real contra el umbral.
2. **Decidir D1** con el dato de arriba, y **D2** (si C1 sube de posición no cambia nada en esta muestra).
3. **Probar el motor en otro rubro** antes de creer que produce algo más que C1.
4. **Repetir C3 y el chequeo de MX desde el Mac.**

## 7. Para el troncal (no toqué nada de esto)

- La hipótesis de la jerarquía §6 queda a la vista: aquí el candidato dominante es el mismo hecho
  que ya se usa en la campaña. Conviene cruzar, cuando haya volumen, la capa de cada hallazgo con
  las respuestas.
- Las fichas traen la afirmación permitida y la lista de lo que **no** se puede afirmar. Emilia
  debe partir de ahí y no de la frase que le parezca mejor.
