# Verificaciones del plan de Instagram (23-oct-2026)

**Uso: interno.** Este archivo tiene dominios de prospectos y sus hallazgos reales, solo para poder re-verificarlos. **No se copia a ninguna pieza, a ningún `publicar.md`, `caption.md` ni `fuentes.md` de `marketing/redes/`.** El plan (`marketing/redes/2026-10-octubre-posicionamiento/PLAN.md`, sección 9) guarda únicamente el resultado, sin dominios ni nombres.

**Hecho por:** Marta (calendario) · **Qué es:** la tabla que estaba en la sección 9 del plan, movida acá en el pase de corrección del 23-oct, más lo que se comprobó después (secciones B y C).

**Recordatorio:** el estado de un prospecto vive en Gmail, no en estos archivos. Que una fila de seguimiento esté vacía no prueba que no haya respuesta.

## A. Tabla original del 23-oct (movida desde el plan)

| Qué | Cómo | Resultado |
|---|---|---|
| Precios de las seis soluciones | `curl` a `spindlelab.cl/servicios/*` y comparación con `spindlelab-astro/public/servicios/*` | Coinciden con el copy §2.5: auditoría desde $490.000, visibilidad en IA desde $400.000, Google Ads desde $350.000 al mes, redes desde $390.000 al mes, desarrollo web desde $390.000, acompañamiento desde $590.000 al mes (mínimo 3 meses) |
| 21 señales y 30/40/30 | `curl "https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl"` | 21 ítems: 5 de acceso (30 puntos), 8 de entidad (40), 8 de citabilidad (30). El sitio actual marca 85. No se cita |
| Título de portada de una sola palabra | `curl` a las portadas de `altis.cl` y `paragonadvisors.cl` (lote frente A §4 y §5) | Siguen igual. Una sin meta description; la otra con la descripción escrita como lista de palabras en mayúsculas |
| Portada sin texto sin JavaScript | `curl` a `vicapital.cl` (lote frente A §1) | 2.521 bytes y cero caracteres de texto visible en el HTML (ver la precisión en la sección B) |
| Título de clínica con dos sedes (lote frente B §2) | `curl` a `terre.cl` | **Ya no sirve:** el título hoy incluye especialidad y ciudad |
| Bloqueo 403 o Cloudflare a lectores automáticos (lotes frentes B y C) | `curl` con dos agentes a dos sitios | **Ya no sirve:** devuelven 200 con la página completa |
| Bloqueo 503 a lectores automáticos (lote frente A §3) | `curl` a `vision.cl` | **No verificable:** el dominio sin `www` no conecta y `www.vision.cl` responde 200 vacío. No se usa |
| `robots.txt` que bloquea a siete rastreadores | `curl` a `clinicaopia.cl/robots.txt` | **Ya no sirve:** hoy es el de Shopify por defecto. Además, esos rastreadores son de entrenamiento: ver riesgo 7 del plan |
| Página de equipo con error 404 (lote frente A §2) | `curl` a `dorco.cl/nuestro-equipo.html` | Sigue en 404, pero el HTML de la portada no trae ningún enlace a una página de equipo. No se usa |
| Bernardo en línea | `curl` a `bernardocombeau.cl` | 200, título "Bernardo Combeau, Fotografía" |
| Fechas | cálculo del calendario | 27-oct es martes; 31-oct cae sábado y 1-nov domingo |

**Cuenta:** nueve hechos de prospectos vueltos a probar. **Cuatro siguen vigentes** (los dos títulos de una palabra, la portada con el cuerpo vacío y la página de equipo en 404), **cuatro caducaron** (el título de la clínica, los dos bloqueos a lectores automáticos y el `robots.txt`) y **uno no se pudo verificar** (el 503). La pieza 1 usa tres de los cuatro vigentes: los dos títulos y la portada con el cuerpo vacío.

### Cómo re-correr los tres hechos de la pieza 1 el día de producir

```
curl -sL https://altis.cl/ | grep -io '<title[^>]*>[^<]*</title>'
curl -sL https://paragonadvisors.cl/ | grep -io '<title[^>]*>[^<]*</title>'
curl -sL https://vicapital.cl/ | wc -c      # y mirar que el body no traiga texto sin JavaScript
```

Si alguno cambió, la lámina correspondiente se reescribe en pasado ("en julio encontramos...") o se saca.

## B. Re-corrida del pase de corrección (23-oct, por la tarde)

| Qué | Resultado |
|---|---|
| `altis.cl`, `<title>` | `<title>Altis</title>`; HTML de unos 32 KB |
| `paragonadvisors.cl`, `<title>` | `<title>Paragon</title>`; HTML de unos 32 KB |
| `vicapital.cl`, tamaño y cabecera | 2.521 bytes. **El `<head>` sí trae** `<title>Multi Family Office Chile \| VICAPITAL</title>`, `meta description` y un bloque JSON-LD; lo que llega vacío es el cuerpo (la aplicación se arma con JavaScript). Por eso la lámina 3 de la pieza 1 habla del **cuerpo** de la portada y no dice que el sitio sea ilegible ni que "no se pueda citar": el nombre y el rubro están en el `<head>`, y Googlebot ejecuta JavaScript |

## C. Lo que la revisión independiente sumó (sin cerrar)

- **Quién recibió qué en julio.** En `marketing/outbound/semana-02/lote-1-frente-a.md`, la tabla de seguimiento marca los tres correos como enviados el 10-jul (filas 1, 4 y 5) y las columnas Respuesta y Diagnóstico están vacías. El correo de la fila 4 dice literalmente que "el título de la página principal es una sola palabra" y entre paréntesis nombra la palabra; el de la fila 1 describe la portada casi vacía para quien no ejecuta JavaScript; el de la fila 5 abre por la descripción en mayúsculas (el título de una palabra figura como hallazgo en el archivo). Es decir, **los tres recibieron su propio hallazgo y al menos uno recibió la frase casi igual a la de la lámina 2.** Comprobado en el archivo.
- **Siguen en la secuencia de toques 2 y 3.** Lo dice la revisión independiente; **no lo comprobé** (el estado real está en Gmail). Es el motivo de la Decisión D del plan: la mitigación "confirmar en Gmail que no respondieron ni pidieron baja" no cubre a quien sigue en secuencia ni a quien se reconoce en un hallazgo escrito casi igual.
- **Casillero abierto:** la verificación en Gmail de los tres prospectos de origen de la pieza 1 **no se ha hecho**. Es puerta dura para programar la pieza 1 si la Decisión D la mantiene.
- **El sitio vivo todavía dice lo anterior.** `curl` del 23-oct: `spindlelab.cl/metodo/` describe el método anterior (diagnóstico técnico, estrategia AEO/GEO, implementación...) y `spindlelab.cl/contacto/` dice "diagnóstico gratis" (conserva los campos `UTM Source`, `UTM Medium` y `UTM Campaign`). La redacción nueva ("revisión", los cuatro pasos nuevos) solo existe en el sitio nuevo. De ahí que la lámina 3 de la pieza 2 y las piezas con oferta de revisión esperen el go-live, y que el chequeo (`/diagnostico/`) no.
- **Un `robots.txt` que bloquea a GPTBot y ClaudeBot** se presentó como "el hallazgo más fuerte del lote" en `marketing/outbound/semana-03/lote-1-frente-b.md` (prospecto 7). El chequeo público dice que bloquear a los rastreadores que entrenan no quita citas hoy. Ver la nota para la troncal en la sección 5 del plan (imagen de los bots).
