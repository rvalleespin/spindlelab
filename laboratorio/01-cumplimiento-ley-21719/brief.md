# Brief — Cumplimiento web de la Ley 21.719

**Abierto:** 3-sep-2026 · **Pedido por:** Ramón · **Estado:** brief, nada construido
**Fecha que manda todo:** **1 de diciembre de 2026** (entrada en plena vigencia)

---

## 1. La oportunidad, en una línea

La Ley 21.719 de protección de datos personales entra en vigencia el 1-dic-2026. Aplica a
**toda organización que trate datos personales en Chile, sin importar su tamaño** — una pyme
con formulario de contacto ya está tratando datos personales. Buena parte de lo que exige
**es técnico y vive en el sitio web**, que es exactamente el oficio que ya existe acá.

Es demanda forzada por una fecha. No hay que convencer a nadie de que la necesita.

## 2. Lo verificado, y de dónde salió

> ⚠️ **Todo lo de abajo se investigó el 3-sep-2026 con búsqueda web, y las fuentes son
> secundarias: blogs de proveedores y estudios de abogados, no el texto oficial.** Los datos
> eran consistentes entre varias fuentes, pero **antes de construir un producto que hace
> afirmaciones legales hay que verificar contra el texto de la ley** (BCN / Ley Chile) y
> contra lo que publique la Agencia. Esto no es opcional: el producto va a decirle a empresas
> qué les falta para cumplir.

- Publicada el 13-dic-2024, con 24 meses de transición. **Vigencia plena: 1-dic-2026.**
- Modifica la Ley 19.628 de 1999 y acerca a Chile al estándar del RGPD europeo.
- Crea la **Agencia de Protección de Datos Personales (APDP)**, con facultades de fiscalizar
  e investigar de oficio, sancionar, ordenar suspensión de tratamientos y publicar un
  **Registro Nacional de Sanciones**.
- **Multas hasta 20.000 UTM o 4% de los ingresos anuales.** Las empresas pequeñas (Ley
  20.416) reciben amonestación escrita en la **primera** infracción.
- Atenuantes reconocidos: autodenuncia, colaboración, reparación voluntaria y contar con un
  modelo de prevención certificado.
- **Los requisitos que caen en el sitio web:** política de privacidad clara · banner de
  cookies con consentimiento explícito · casilla de consentimiento **desmarcada por
  defecto** · registro de tratamientos · DPAs con proveedores (incluidos los extranjeros) ·
  procedimiento para ejercer derechos ARCOP · notificación de brechas en 72 horas.

**El mercado ya se está formando, con precios conocidos:** ~$49.990 por informe técnico
(Presencia 360) · ~$149.000 por implementación (ProtecciónDatosWeb, regalada como lanzamiento
hasta el 30-nov-2026) · implementación en menos de 30 días (Klevo) · y al menos una
plataforma gratuita (cumple21719.cl). **Demanda validada y presión de precio, las dos cosas.**

Fuentes consultadas (secundarias): preyproject.com/es/blog/ley-de-proteccion-de-datos-en-chile ·
klevo.cl/blog/ley-21719-proteccion-datos-sitio-web-chile-2026/ · privacidadweb.cl/aprende/ley-21719 ·
presencia360.cl · protecciondatosweb.cl · xepelin.com/blog/pymes/desafios-pymes-chile

## 3. Las cuatro ideas, en orden de calce

1. **El chequeo gratuito de Ley 21.719 — el mismo motor, otra checklist.** El chequeo de 21
   señales que ya existe es un Worker que descarga un sitio y evalúa reglas técnicas. Acá
   cambia la checklist, no el producto. Y buena parte del cumplimiento **es detectable
   automáticamente**: si existe política de privacidad, si hay banner, si GA4 o el Pixel de
   Meta **disparan antes del consentimiento**, si la casilla viene premarcada, si hay
   transferencia a terceros países. Eso último es lo que un vendedor de plantillas no puede
   detectar. Gratis, sin registro, con la fecha en pantalla.
2. **Kit de implementación a precio fijo.** Alcance y precio cerrados, dentro del rango que
   ya cobra el mercado. La parte que vale es la recurrente: el registro de tratamientos y los
   DPAs se mantienen, y la normativa se va a mover.
3. **Vender a los proveedores, no a las empresas.** La ley exige DPAs con todo proveedor que
   procese datos: agencias, desarrolladores, integradores de CRM tienen dos problemas —
   cumplir ellos y poder entregarle a sus clientes algo que cumpla. Venderle a una agencia con
   30 clientes alcanza 30 sitios. Venta a pares, white-label.
4. **Descartada con criterio:** la Ley 21.663 de ciberseguridad (ANCI) suena parecida pero
   obliga solo a organismos del Estado y operadores de servicios esenciales. Universo chico,
   venta larga, requisitos que no son este oficio. No confundirla con la otra.

## 4. Guardrails (no negociables)

- **No se da asesoría legal.** El texto de la política de privacidad y la evaluación jurídica
  son de abogado. Acá se hace **la capa técnica**. Consecuencia útil: conviene una alianza con
  un abogado, que además es canal de derivación en las dos direcciones.
- **El chequeo describe, no certifica.** Jamás decirle a una empresa que "cumple". Se reportan
  **señales técnicas presentes o ausentes**, con la instrucción de cómo corregir cada una.
  Decirle "cumples" a quien no cumple es exponerlo a una multa y exponerse a uno mismo.
- **Cero prueba social inventada** y cero cifras sin fuente. Aplica la regla de la casa.
- **Nada de alarmismo.** El gancho es la fecha y el hecho, no el miedo. Nombrar la multa
  máxima como si fuera lo que le va a pasar a una pyme con formulario de contacto es mentir:
  la primera infracción de una empresa pequeña es amonestación escrita.
- **No consume la atención de la agencia.** Costo declarado por pieza, y si choca con un pase
  de contenido o con un cliente, gana la agencia.

## 5. La decisión que Ramón tiene que tomar antes de construir

**¿Esto va bajo la marca SpindleLab o como marca aparte?** No está decidido, y cambia todo lo
demás (dominio, sitio, voz, si el chequeo vive en `spindlelab.cl` o en otro lado).

- **Bajo SpindleLab:** aprovecha credibilidad técnica ya construida y el tráfico del chequeo
  existente. Riesgo: diluye un posicionamiento que se acaba de afilar en SEO técnico + AEO,
  y el comprador de cumplimiento no es el mismo que el de visibilidad.
- **Marca aparte:** posicionamiento limpio y una sola promesa. Riesgo: partir de cero en
  confianza, dominio y contenido, con tres meses de ventana.

**Recomendación de esta sesión:** marca aparte con dominio propio, pero **firmada por Ramón**
(la persona presta la credibilidad, la marca de la agencia no se toca). Decisión pendiente.

## 6. Reparo de fondo, escrito para que no se olvide

**La ventana se cierra el 1-dic-2026.** Después la urgencia baja mucho y lo que queda es el
retainer de mantención, que es bastante más chico. Esto es un **sprint de tres meses**, no un
negocio permanente. Tratarlo como sprint desde el día uno evita la decepción de enero.

## 7. Registro

| Fecha | Qué pasó |
|---|---|
| 2026-09-03 | Brief abierto. Nada construido. Pendiente: decisión de marca (§5) y verificación contra el texto oficial de la ley (§2). |
