# Encargo: el motor de revisión previa entra al circuito de leads

**De:** sesión del motor · **Para:** sesión de búsqueda de leads (Dereck, Emilia, copiloto) y el troncal · 15-oct-2026
**Estado:** el motor funciona y está probado sobre 33 sitios reales. **Nada de esto se ha enviado jamás**: no hay dato de conversión.
**Decidido por Ramón el 15-oct:** (1) el correo abre la **llamada de 20 minutos**; (2) los precios de lo que no es el kit **se cierran en la llamada**, pero el correo puede apuntar a la **base publicada en el sitio como referencia**. Ver la sección 8.
**Dónde vive:** rama `claude/motor-revision-previa-build`, carpeta `marketing/motor-revision-previa/`. **Todavía no está en `main`**: hay que mergearla (con `merge_method: merge`, la confirma Ramón) para que otra sesión lo vea sin pedirlo por rama.
**Qué NO hizo esta sesión:** no mandó correos, no tocó la estrategia de outbound, el pipeline, `ventas/` ni el sitio.

---

## 1. Qué es, en tres líneas

Un motor que **examina solo, sin que nadie lo ayude, los sitios de una lista de empresas** y, por cada uno, entrega: qué problema tiene que le cuesta clientes, cómo decírselo al dueño, qué arreglo de SpindleLab corresponde y con qué precio documentado. Es la materia prima del correo de Emilia. **No escribe el correo ni lo envía.**

La idea de Ramón: *analizar el sitio, ver la problemática y qué se puede solucionar, y mandar esa solución por correo con la estrategia de venta que esta sesión ya tiene.* Verifica y Cumple se ofrece solo cuando corresponde; si el sitio tiene otra complicación, se ofrece solución para esa; y el correo abre la puerta a una reunión.

## 2. El flujo propuesto

```
 1. Dereck       lista de EMPRESAS (dominio, nombre, rubro)         gratis, sin gastar créditos
        │
 2. MOTOR        node lote.mjs <lista.csv>      automático, ~1,7 min por sitio con 3 en paralelo
        │          descarta: excluidos, ya contactados, sitios que no abren
        │          mide el resto (3 corridas de navegador + celular + enlaces + borde)
        ▼
 3. Dereck       revela el decisor y el correo SOLO de los sitios con oferta     ← ahorra créditos
        │
 4. Emilia       redacta con la estrategia §7 usando para-emilia.csv (+ detalle)
        │
 5. Ramón        aprueba y envía, uno por uno
        │
 6. Copiloto     seguimientos; ANTES del toque 3 corre remedir.mjs sobre ese sitio
        │
 7. Raquel       registra la respuesta junto con la columna `oferta`  → aprende qué convierte
        │
 8. Valen        si hay reunión, el mini-diagnóstico parte de la ficha del motor (ya tiene la evidencia)
```

**Lo nuevo respecto de hoy:** el paso 2 antes del 3, y el paso 6. Hoy Dereck revela el contacto (un crédito de Apollo cada uno) *antes* de saber si hay algo que decir, y el copiloto no puede remedir porque no tiene navegador.

## 3. Qué recibe y qué entrega

**Entrada:** un CSV con columna `dominio` (o `email`, de donde saca el dominio). `empresa` es opcional. **No hace falta ningún correo.**

**Salida,** en `<carpeta>/entrega/`:

| Archivo | Para quién | Qué trae |
|---|---|---|
| `para-emilia.csv` | Emilia | **Encabezado idéntico al de los lotes de Dereck:** `empresa,dominio,email,hallazgo_medido,estado`. Entra sin tocar nada. |
| `para-emilia-detalle.csv` | Emilia | Por dominio: cómo decir el problema en castellano, frase de arreglo, puerta a la reunión, servicio publicado y su "desde", precio que va en el correo (o no), cómo comprobarlo, qué NO afirmar, otras ofertas para la llamada. |
| `<ID>/ficha.md` | Ramón, Valen | Evidencia completa y capturas del sitio. |

**Qué hacer con cada `estado`:** `medido por el motor...` → hay oferta, redactar. `Sin gancho estable` → no inventar uno. `No enviar: ...` → sitio en orden, excluido, o no abre (un 403 puede ser el firewall del sitio bloqueando la IP del motor, no un sitio caído).

## 4. Qué cambia para cada rol

| Rol | Hoy | Con el motor |
|---|---|---|
| **Dereck** | Revela el contacto y después se descubre que no hay nada que decir o que el prospecto está excluido. | Entrega la lista de empresas, corre el motor, y revela contacto **solo de los que tienen oferta**. |
| **Emilia** | Pide el hallazgo al rol de diagnóstico o reusa uno. | Recibe el hallazgo, el castellano, el arreglo y la puerta a la reunión. **Redacta, no cambia hechos.** |
| **Copiloto** | Su toque 3 no puede afirmar nada técnico (no remide). | Corre `remedir.mjs <ficha.json>` y obtiene "el hecho sigue / ya no" con la instrucción de qué afirmar. |
| **Raquel** | Registra respuestas por prospecto. | Registra además qué **oferta** recibió. Sin eso nunca se sabrá si una oferta convierte más que otra. |
| **Ramón** | Abre el sitio a mano antes de enviar. | Ver decisión 3 abajo. |

## 5. Qué ofrece el motor, y con qué precio

El motor elige **una** oferta principal por sitio (la de mayor prioridad que se repite en todas las corridas); el resto queda como "otras ofertas para la llamada". Orden: primero lo que frena la captación (contacto, primera pantalla, celular), luego acceso de la IA, luego Verifica y Cumple **solo si corresponde**, luego fricción del formulario, enlaces rotos, estructura, peso, medición y entidad.

| Oferta | Qué se ve en el sitio | Servicio publicado (spindlelab.cl, 15-oct) | Precio en el correo |
|---|---|---|---|
| Cookies antes del aviso, formulario sin política, política que da 404 | Verificable en 30 s | Kit de Verifica y Cumple | **Precio del kit:** "Desde $149.000 + IVA, una vez" (texto de correos ya aprobados) |
| Contacto ausente o roto, WhatsApp mal formado, celular, formulario largo | Se prueba con un clic | Desarrollo Web (página desde $390.000, sitio desde $690.000) | **Solo referencia:** "Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada" |
| Enlaces rotos, estructura, peso | Se ve en el código o en F12 | Auditoría SEO Técnica (desde $490.000) | **Solo referencia:** "Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada" |
| Robots.txt cerrado a la IA, sin entidad declarada | `/robots.txt`, herramienta gratis | Auditoría de Visibilidad en IA (desde $400.000) | **Solo referencia:** "Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada" |
| Sin Google Analytics ni Tag Manager | Extensión gratuita | Acompañamiento Esencial (desde $590.000 al mes) | **Solo referencia:** "Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada" |

⚠️ **Los precios de `marketing/capacidad-servicios.md` §0 no coinciden con los del sitio** (por ejemplo Visibilidad en IA: $360k allá, "desde $400.000" en el sitio). El motor usa solo el sitio, que es lo que ve el prospecto. El archivo es de julio y conviene alinearlo.

## 6. Lo que está probado, con números reales

**Medido:** 21 sitios de Dereck (contadores y clínicas) + 12 hoteles de una lista nueva. Cero caídas del motor en las corridas finales (una versión anterior se cayó con un sitio: un formulario con un campo llamado `action`; corregido).

| | Resultado |
|---|---|
| Reparto de la oferta principal en los 21 | 13 cookies antes del aviso · 2 formulario sin política · 1 política que da 404 · 1 enlace roto · 1 WhatsApp mal formado · 1 estructura · 1 sin analítica · 1 no abre |
| **Ningún sitio quedó sin oferta**, salvo el que no abre | Antes de ampliar el catálogo, 7 de 21 salían sin gancho. |
| Lista nueva (12 hoteles, sin correos) | **5 descartados solos por estar en la lista de exclusión**, 7 con oferta. Con el flujo actual, a esos 5 se les habría revelado el contacto antes de descubrir que no se les puede escribir. |
| Remedición antes de un seguimiento | Probada en 1 ficha real: "siguen 4 de 4 cookies afirmadas". |

**Verificación independiente** (yo contra los sitios, no contra el código del motor):

| Detector | Resultado | Qué pasó |
|---|---|---|
| Cookies antes del aviso | **13 de 13** confirmados en la ronda anterior (3 corridas, y mirando una por una la captura del tramo con movimiento) | La última corrida automática trae 13 sitios con este hallazgo; no los volví a mirar uno por uno |
| Formulario sin política | 4 de 4 | En uno hay Términos y Condiciones que el motor no lee: ahora lo advierte |
| Política que da 404 | 1 de 1 | |
| Formulario largo | 2 de 2 | |
| Sin título principal | 5 de 6 | El motor contó 0 H1 en una página con 2: ahora exige acuerdo con el HTML crudo |
| "Varios H1" | Conteo cierto, **no es un problema** | Google dice que está bien: dejó de ofrecerse |
| Sin acción de contacto arriba | **0 de 3** | Falsos positivos (tildes en "Contáctanos", botón flotante, tienda). Corregido |
| Peso de la portada | Mide igual que el servidor | Contaba también lo que carga al bajar: ahora solo la carga inicial |
| Medición | Sobreafirmaba | Un sitio Wix mide por dentro: ahora solo afirma "no veo Google Analytics ni Tag Manager" |

## 7. Lo que NO está probado (hay que decirlo)

- **Ninguna oferta se ha enviado.** No hay un solo dato de si convierten. 13 de los 21 comparten el mismo gancho (cookies antes del aviso), que además es el que ya usa la campaña de Verifica y Cumple.
- **Dos detectores nuevos no dispararon nunca** (primera pantalla sin contacto, celular). Sin casos, no se sabe si funcionan.
- **Las frases de arreglo de todo lo que no es Verifica y Cumple son BORRADOR.** Solo la del kit viene de correos aprobados.
- **El efecto del WhatsApp sin código de país no está probado:** el motor lee el formato, no tocó el enlace.
- **Todo se mide desde una IP de datacenter.** Un sitio que trate distinto a un datacenter se ve distinto.
- **Nadie ha verificado nada a mano.** La estrategia §3 pide abrir el sitio antes de enviar.

## 8. Decisiones (1 y 2 ya resueltas por Ramón)

1. ✅ **Puerta a la reunión: decidido, la llamada de 20 minutos.** Contradice dos reglas escritas: la estrategia §7 dice "cierre bajo, sin pedir reunión" y `agente-outbound` dice "no agendemos 30 min en el primer toque". El motor entrega: *"Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría"* (o *"Vi otra cosa que no te anoto acá..."* si hay más ofertas). No pide horario ni respuesta. **Pendiente del troncal: reflejar esta decisión en la estrategia §7 y en la skill `agente-outbound`.** El motor no las toca.
2. ✅ **Precios: decidido, se cierran en la llamada, con la base publicada como referencia.** Solo el kit tiene precio propio ("Desde $149.000 + IVA, una vez"). Para lo demás el correo lleva la línea *"Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada"*, y la ficha trae el "desde" del servicio publicado para quien quiera citarlo como referencia, nunca como cotización.
3. **Verificación humana antes de enviar.** El motor hace 3 corridas (la tercera con zona horaria e idioma de Chile) y guarda capturas, y por el método de la auditoría los detectores nuevos aún tienen errores. **Propuesta:** Ramón abre el sitio a mano en los primeros 10 de cada tipo de oferta; cuando un tipo no da ningún falso positivo en 10, pasa a muestreo.
4. **Quién dispara el motor y dónde.** Propuesta: Dereck, justo después de armar la lista de empresas, en la sesión que tenga Node y Chromium (el entorno cloud los tiene; en el Mac no hace falta el proxy).
5. **La columna `oferta` en el registro de envíos y el pipeline**, para medir qué convierte. Son archivos del troncal; el motor no los edita.
6. **La lista de exclusión se lee del repo donde corre el motor.** Si esa copia está atrasada, un excluido recién agregado no se descarta. Hay que traer `main` antes de correr.
7. **Apollo se da de baja.** El flujo "medir antes de enriquecer" no depende de Apollo: sirve con cualquier fuente de empresas (Google Maps, DiarioEmprende, el banco de `ventas/`).

## 9. Cómo correrlo

```bash
# Requisitos: Node 22 y Chromium (el entorno cloud ya los trae; en el Mac, Chrome).
# En el entorno cloud con proxy:  NODE_USE_ENV_PROXY=1

# 1) Lote completo sobre una lista de empresas (sin correos basta). Reanudable si se corta.
NODE_USE_ENV_PROXY=1 node marketing/motor-revision-previa/motor/lote.mjs <lista.csv> \
  --out marketing/motor-revision-previa/corridas/<fecha>-<rubro> --concurrencia 3 --prefijo X
# → <out>/entrega/para-emilia.csv y para-emilia-detalle.csv

# 2) Antes de un seguimiento: ¿el hecho sigue siendo cierto?
NODE_USE_ENV_PROXY=1 node marketing/motor-revision-previa/motor/remedir.mjs <out>/<ID>/ficha.json
```

Un `--prefijo` distinto por lote evita choques de identificadores. Más detalle en `marketing/motor-revision-previa/motor/README.md`.

## 10. Siguiente paso propuesto

1. Ramón decide los puntos 1 a 3 de la sección 8.
2. Mergear la rama a `main` para que la sesión de leads lo vea.
3. Probar el flujo con **un lote real y chico (10 a 15 leads)**, de principio a fin, con Emilia redactando desde `para-emilia.csv` y Ramón aprobando. Ese lote es la primera evidencia de conversión.
4. Con 30 a 40 envíos y la columna `oferta`, decidir qué ofertas se quedan.
