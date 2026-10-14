# Motor de revisión previa: segundo rubro (clínicas)

**Para:** el troncal · **De:** sesión de construcción · 14-oct-2026 · rama `claude/motor-revision-previa-build`
**Continúa:** `02-informe-10-corridas.md` (contadores). Identificadores K01 a K11; los dominios solo están en las fichas internas.
**Muestra:** fijada en `corridas/muestra-clinicas-preregistrada.json` y commiteada **antes** de correr. Primeros 10 de `ventas/clinicas-sin-contactar-5oct.csv`, saltando 4 filas que Dereck ya había marcado como descartadas y 2 ya contactadas.

---

## 1. Resultado

| | Clínicas | Contadores (informe 02) | Total |
|---|---|---|---|
| Corridas válidas | 10 | 10 | 20 |
| Capa 2 **sospechada** por el motor | **7** de 10 | 6 de 10 | **13** de 20 |
| Capa 2 **confirmada por el asistente** | **7 de 7** | 6 de 6 | **13 de 13** |
| **Verificada por una persona** | 0 | 0 | 0 |

**Reemplazo anotado:** K06 salió `no-responde` en la pasada 0 con un **403**. [Probable] Es el
firewall del sitio rechazando esta IP de datacenter, no un sitio caído; el motor lo descarta igual,
pero hay que leerlo así. Según el pre-registro se reemplazó por el siguiente de la lista (**K11**), con
la misma regla de selección.

**El umbral del encargo (5 de 10) se cumple en los dos rubros** con la confirmación del asistente.
Mismas reservas que el informe 02, que siguen en pie: no es una persona abriendo el sitio, la IP es
de datacenter, y las capturas son de la ventana visible.

## 2. Lo incómodo: sigue siendo un solo hallazgo

Los 7 son **C1** (cookies de rastreo escritas antes de cualquier consentimiento), igual que en
contadores. El motor **no produjo ninguna otra categoría** de hallazgo estable en 20 sitios:

| Candidato | Resultado en clínicas |
|---|---|
| **C1** rastreadores | 7 de 10, estable. |
| **C2** medición | 4 punteros (K01, K03, K08, K09), **débiles** (ver §3). Ninguno estable, por diseño. |
| **C3** borde | 0 como candidato. K01 rechaza a un agente de IA por nombre, sin causa nombrada: capa 1 por D1. |
| **C4** entidad | 0. |
| **C5** contacto | 1 puntero débil (K05). Casi seguro es un formulario manejado por JavaScript. |

Dos consecuencias que no conviene esconder:

1. **Un hallazgo que aplica a 13 de cada 20 sitios distingue poco.** [Probable] Sirve como gancho
   porque es verdadero y comprobable, pero no separa a un prospecto de otro.
2. **Es el mismo hallazgo que ya usa la campaña de Verifica y Cumple.** El troncal tiene los datos de
   esa campaña: el motor automatiza ese gancho y lo hace con evidencia más sólida, pero **no hay
   prueba de que convierta mejor**. Lo que aporta hoy es velocidad y menos errores, no una palanca
   nueva.

## 3. Defectos que encontré y corregí

1. **C2 con falso puntero (K03).** K03 tiene aviso de cookies real y no escribe ninguna cookie: es
   un sitio en orden. El motor igual levantó un puntero C2 aunque la analítica ni siquiera se
   disparó (la frena el consentimiento). Ahora C2 es "no evaluable" si la analítica no se dispara.
   **Verificado re-corriendo K03:** sale `sin-hallazgo` con esa nota
   (`corridas/2026-10-14-clinicas-reintento/K03/`). Es el caso que el motor debe saber dejar pasar.
2. **`sin_ruta_de_contacto_visible` falso (K02, K10).** Se calculaba solo del HTML sin ejecutar y no
   ve el botón de WhatsApp que inyecta JavaScript, aunque se ve en la captura. Ahora suma los
   enlaces del DOM ya ejecutado. Comprobado sobre los datos guardados. Las fichas K02 y K10 **no se
   regeneraron** y conservan el rótulo viejo; K11 puede tener el mismo error.
3. **Los 4 punteros C2 son más débiles de lo que parecen.** Tres sitios (K01, K08, K09) usan Google
   directo, sin Tag Manager, y el motor solo lee el HTML de la página: no lee los scripts externos
   donde un plugin podría definir conversiones. "No veo evento" aquí es evidencia floja.

## 4. Cómo se confirmó (idéntico a contadores)

Tercera corrida por sitio con zona horaria `America/Santiago` e idioma `es-CL`
(`corridas/2026-10-14-clinicas-confirmacion/`), y revisión visual del tramo B de los 7.

| | Cookies que se repitieron |
|---|---|
| K01 | 2/2 |
| K02 | 5/5 |
| K05 | 13/13 |
| K07 | 7/7 |
| K08 | 2/2 |
| K09 | 2/2 |
| K10 | 9/9 |

Ningún sitio muestra aviso de cookies en el tramo B. **K10 escribe todas sus cookies solo tras el
primer movimiento del mouse** (nada en el tramo quieto): es el caso para el que existe el segundo
tramo, y el motor lo detectó.

## 5. Qué recomiendo

1. **Entregar el motor como lo que es hoy: un detector confiable de C1**, con punteros débiles para
   lo demás. Es verdadero en dos rubros, repetible y con evidencia.
2. **No construir más detectores todavía.** Ninguno de los otros cuatro tiene un solo caso confirmado.
   Más código sin ese caso es la forma de volverse un chequeo con más pasos.
3. **Que una persona mire los 4 punteros C2 y el C5** (cinco sitios, `ficha.md` dice dónde). Si
   alguno se sostiene, es la primera categoría nueva. Si ninguno, se sabe con certeza que hoy el
   motor solo produce C1.
4. **Cruzar, cuando haya volumen, el gancho C1 contra las respuestas** de la campaña vigente. Es lo
   único que dirá si automatizarlo vale algo más que el tiempo ahorrado.
