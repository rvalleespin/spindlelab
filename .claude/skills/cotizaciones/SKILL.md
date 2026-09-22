---
name: cotizaciones
description: Arma y envía una cotización formal de SpindleLab (PDF con 3 planes, fases con pago asociado, condiciones) a partir de una solicitud real (WhatsApp, correo, referido), deja el correo de envío como borrador en hola@spindlelab.cl y registra el prospecto en el pipeline. Usar cuando llega una solicitud de cotización o alguien pide "arma la cotización para X". NUNCA envía el correo solo; el envío lo hace Ramón.
---

# Cotizaciones

Convierte una solicitud en una cotización lista para enviar, con el mismo nivel que la
SPL-COT-2026-014 (Bernardo, aprobada) y la SPL-COT-2026-015 (galería de arte, enviada 22-sep-2026).
Todo lo de acá salió de hacer esas dos, no de teoría.

## Dónde vive cada cosa

- **`COTIZACIONES/`** (raíz del repo, **gitignored**: no viaja a sesiones cloud). Ahí van los PDF,
  los generadores con número, el logo (`logo-spindlelab-nuevo.png`), `MODELO-COTIZACIONES.md` y
  `guiacotizaciones.md`. Esos dos son de julio: **si contradicen esta skill, manda esta skill.**
- **`plantilla_generador.py`** (en esta carpeta): la 015 completa, que es el punto de partida.
- **Precios:** los publicados en el sitio vivo, nunca los del repo ni los de julio:
  `curl -s https://spindlelab.cl/servicios/<slug>/` (slugs: `desarrollo-web`,
  `auditoria-seo-tecnica`, `visibilidad-en-ia`, `acompanamiento-mensual`, `redes-sociales`,
  `paid-media`).

## Método

1. **Aterriza la solicitud.** Quién es (nombre completo), cómo llegó (referido de quién, canal),
   qué pidió de verdad, qué dudas tiene. Si falta algo que cambia el precio (idiomas, panel,
   e-commerce, cantidad de páginas), pregúntalo antes de armar nada.
2. **Número correlativo.** `ls COTIZACIONES/` y toma el siguiente `SPL-COT-AAAA-NNN`.
3. **Lee los precios del sitio** y mapea la solicitud a **tres planes publicados**, con el ★
   en el que cubre lo pedido (normalmente el del medio). Si ningún plan publicado cubre algo
   (p. ej. una tienda), va como "Se cotiza tras una reunión", igual que en el sitio.
   **No inventes precios intermedios**: Ramón lo corrigió en la 015 ("los precios están en el
   sitio").
4. **Referentes.** Si el trabajo es de diseño, pídele a Ramón los que eligió (los trae él).
   Lee cada sitio (WebFetch) y escribe en la columna "Qué tomamos para tu…" **qué se toma
   concretamente**, no una descripción del sitio. Si no aplica (una auditoría), la sección no va.
5. **Resuelve las dudas técnicas del cliente con datos verificados hoy.** Hosting, correos,
   pasarela: revisa la página de precios de cada proveedor en el momento y cítalo. Lo que se
   propuso en la 015 (verificado 22-sep-2026):
   - Hosting: **Cloudflare Pages**, gratis, uso comercial permitido, sin cobro por tráfico,
     20.000 archivos por sitio.
   - ⚠️ **Vercel Hobby prohíbe uso comercial**, incluido que te paguen por hacer el sitio. No
     proponerlo para un cliente.
   - Correos: **Zoho Mail** gratis (5 casillas, 5 GB, sin IMAP) o **Google Workspace Business
     Starter** (~$6.500 CLP por casilla al mes, 30 GB).
   - Todo contratado **a nombre del cliente**.
6. **Genera el PDF** desde la plantilla (ver *Cómo correr el generador*). Revisa el render
   página por página: ningún título solo al pie de una página (usa `CondPageBreak`), ninguna
   etiqueta de fila partida.
7. **Pule la redacción** con `voz-spindlelab` (o `/agente-copywriter`), respetando las reglas
   de abajo. Muéstrale el PDF a Ramón y espera su visto bueno.
8. **Correo de envío como borrador** en Gmail (conector de Gmail = hola@spindlelab.cl; confírmalo
   con `search_threads in:sent`). Ver *El correo*.
9. **Cuando Ramón diga que lo envió, verifica en Gmail** (`in:anywhere <correo>`: debe estar con
   label SENT y un tamaño que delate el adjunto) y recién ahí **registra en `ventas/pipeline.md`**
   (etapa "4. Propuesta formal enviada") con próximo paso con fecha. Commit y push.

## Reglas del documento (aprendidas en la 014 y la 015)

- **"El proyecto" habla solo del proyecto del cliente:** qué pidió, cómo crece, qué va a manejar
  él mismo. **Nada del método interno** (agente, Claude Code, supervisión humana, "el ahorro de
  la IA baja el precio") **ni mención a otros clientes**, aunque venga referido por uno.
  Ramón lo sacó de la 015: "no vienen al caso". La fase 3 se llama "Desarrollo", sin "IA".
- **IVA: los precios publicados son + IVA**, y así se escribe, explícito, en la nota de planes y
  en condiciones. (El modelo de julio decía "IVA incluido": quedó obsoleto.)
- **Sin descuento de lanzamiento** salvo que Ramón lo pida: el −20% de julio no está en el sitio.
- **Pagos 30/40/30** atados a entregables (inicio / staging aprobado / entrega), nunca a fechas.
  Cierra fases con: "Nada avanza a la fase siguiente sin tu aprobación."
- **Tuteo y plural** ("te proponemos", "tu galería"). Sin guion largo, sin superlativos, sin
  frases que solo califican a la anterior ("la imagen manda", "(para eso está)").
- **Cifras de mercado honestas:** compara el precio **con IVA** contra el rango. En la 015 el
  borrador decía "parte baja" y era falso; decía la verdad "bajo el rango de agencias y dentro
  del rango freelance local".
- **Alcance y límites siempre:** tope de carga inicial, qué provee el cliente, qué cubre la
  garantía de 30 días (solo errores de funcionamiento), qué no incluye la tienda (comisiones,
  envíos). Si el plan tiene tope de páginas y el cliente crea contenido desde el panel, aclara
  que esas páginas no cuentan en el tope.
- **Firma final:** `SpindleLab · Ramón Vallejos Espíndola · Fundador · hola@spindlelab.cl`.

## El correo

- Asunto: **"Cotización sitio web | SpindleLab"** (sobrio, sin "oferta").
- Registro de correo cálido, no outbound: frases cortas, sin listas, sin repetir precios.
  Retoma el canal por donde llegó ("Como conversamos por WhatsApp…"), resume la idea, dice qué
  plan recomiendas y por qué, responde sus dudas en una línea, menciona fases y el staging antes
  del segundo pago. Cierre: "¿Qué te parece si lo conversamos durante la semana?", **sin fecha
  impuesta**.
- **El PDF no se adjunta por el conector**: habría que transcribir ~50.000 caracteres en base64
  y un error lo corrompe. Crea el borrador solo con texto y dile a Ramón que adjunte el PDF.
- **Nunca `send_message`.** Borrador y link; el envío es de Ramón.

## Cómo correr el generador

`reportlab` no está en el Python del sistema. Usa un venv en el scratchpad:

```bash
python3 -m venv "$SCRATCH/venv" && "$SCRATCH/venv/bin/pip" install -q reportlab pymupdf
cp .claude/skills/cotizaciones/plantilla_generador.py COTIZACIONES/SPL-COT-AAAA-NNN_generador.py
"$SCRATCH/venv/bin/python" COTIZACIONES/SPL-COT-AAAA-NNN_generador.py
```

Para revisar el render: con `fitz` (pymupdf) exporta cada página a PNG en el scratchpad y léelas.
El generador resuelve el logo y la salida relativo a su propia carpeta, así que tiene que quedar
en `COTIZACIONES/`.

## Después del envío

- Seguimiento a los **3 a 5 días**, con fecha en el pipeline.
- Si el cliente responde "yo te aviso", **pídele el día en ese mismo mensaje**. Contestar
  "quedo atento" es como murieron Legal Prisma y Chef & Hotel
  (`ventas/pipeline-reconstruido-2026-09-22.md`).
- **Facturación:** contrato nuevo → **SpindleLab SpA, + IVA**. Antes de cobrar el anticipo,
  confirma que la SpA ya puede emitir factura.

## Checklist antes de mostrarle el PDF a Ramón

- [ ] N.º correlativo, fecha de hoy, nombre completo del cliente, validez 30 días
- [ ] Tres planes con precios **publicados**, ★ en el recomendado, "+ IVA" explícito
- [ ] "El proyecto" sin método interno ni otros clientes
- [ ] Referentes con "qué tomamos", o sección eliminada si no aplica
- [ ] Datos de terceros (hosting, correos) verificados hoy y citados
- [ ] Fases con pago por entregable, garantía definida, topes de alcance
- [ ] Sin guion largo; render revisado página por página
