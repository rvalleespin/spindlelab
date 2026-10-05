# Checklist de entregabilidad — `spindlelab.cl` / `hola@spindlelab.cl`

> **Por qué existe:** el piloto mandó 20 toques 1 (10–14 jul 2026) desde un dominio nuevo,
> con 15 correos en un solo día (14 jul), y sacó 0 respuestas. Antes de reenviar o escalar
> hay que descartar que estén cayendo en spam — si es así, reescribir el mensaje no sirve de
> nada. Este checklist se corre entero **antes** de cualquier nueva tanda.
>
> Última corrida: _(anotar fecha y resultado abajo)_

---

## Regla de oro

Un correo frío llega a la bandeja principal solo si pasa **las tres autenticaciones** (SPF,
DKIM, DMARC) **y** la reputación del dominio no está quemada. Las tres son registros DNS +
config del proveedor de correo. Cualquiera que falle = riesgo de spam.

---

## Paso 0 — ¿Quién hostea el correo? (define dónde vive el DKIM)

Mirar el registro **MX** de `spindlelab.cl`. Dos vías:

- **Terminal:** `dig +short MX spindlelab.cl`
- **Web (sin terminal):** [MXToolbox](https://mxtoolbox.com/) → escribir `spindlelab.cl` → "MX Lookup".

Interpretar:
- Apunta a `...google.com` / `googlemail.com` → **Google Workspace** (selector DKIM = `google`).
- Apunta a `...zoho...` → **Zoho** (selector `zoho` o `zmail`).
- Apunta a `...outlook.com` / `protection.outlook.com` → **Microsoft 365**.
- Otro (hosting con cPanel, etc.) → anotarlo; el selector DKIM lo define ese panel.

➡️ **Anotar el proveedor acá:** ____________________

---

## Paso 1 — SPF

**Qué es:** autoriza qué servidores pueden enviar como `@spindlelab.cl`.

- **Terminal:** `dig +short TXT spindlelab.cl`
- **Web:** MXToolbox → "SPF Record Lookup".

**Aprobado si:**
- Existe **exactamente UN** registro que empieza con `v=spf1`.
- Incluye al proveedor del Paso 0 (ej. Google: `include:_spf.google.com`).
- Termina en `-all` (estricto, ideal) o `~all` (soft, aceptable).

**Reprobado / arreglo:**
- ❌ No existe → crear TXT en la raíz. Google: `v=spf1 include:_spf.google.com -all`.
- ❌ Hay **dos** registros `v=spf1` → SPF se rompe entero. Fusionar en uno solo.
- ❌ Termina en `+all` → cualquiera puede falsificar el dominio. Cambiar a `-all`.

➡️ **Resultado:** ⬜ aprueba ⬜ reprueba — nota: ____________________

---

## Paso 2 — DKIM

**Qué es:** firma criptográfica que prueba que el correo salió de verdad de tu dominio y no
se alteró. **El registro DNS no basta: tiene que estar además ACTIVADO en la consola del
proveedor.**

- **Terminal (probar el selector del proveedor):**
  `dig +short TXT google._domainkey.spindlelab.cl` (cambiar `google` por `zoho`, etc.)
- **Web:** MXToolbox → "DKIM Lookup" → dominio `spindlelab.cl`, selector `google` (o el que
  corresponda).

**Aprobado si:** devuelve un TXT largo con `v=DKIM1; k=rsa; p=<clave larga>` **y** en la
consola del proveedor la firma DKIM figura como *Authenticating / Activada*.

**Reprobado / arreglo:**
- ❌ No devuelve nada → DKIM no publicado. En Google Workspace: Admin → Apps → Gmail →
  *Autenticar correo* → generar clave → publicar el TXT que te da → volver y clic en *Iniciar
  autenticación*. **Ojo: publicar el DNS sin apretar "iniciar" deja DKIM inactivo.**

➡️ **Resultado:** ⬜ aprueba ⬜ reprueba — selector usado: ______ — nota: ____________________

---

## Paso 3 — DMARC

**Qué es:** le dice a Gmail/Outlook qué hacer si SPF o DKIM fallan, y te manda reportes.
Su sola presencia ya es una señal de remitente serio.

- **Terminal:** `dig +short TXT _dmarc.spindlelab.cl`
- **Web:** MXToolbox → "DMARC Lookup".

**Aprobado si:** existe un TXT que empieza con `v=DMARC1;` y tiene una política `p=`.

**Reprobado / arreglo:**
- ❌ No existe → crear TXT en `_dmarc.spindlelab.cl`. Para dominio nuevo, arrancar en modo
  monitor:
  `v=DMARC1; p=none; rua=mailto:hola@spindlelab.cl; fo=1`
  Con eso empiezan a llegar reportes sin bloquear nada. Cuando SPF+DKIM estén sólidos y los
  reportes limpios (2–4 semanas), subir a `p=quarantine`.

➡️ **Resultado:** ⬜ aprueba ⬜ reprueba — política actual `p=`: ______

---

## Paso 4 — Prueba de bandeja real (lo que más importa)

Los registros pueden estar OK y aun así caer en spam por reputación/contenido. Dos pruebas:

### 4a. mail-tester.com (puntaje objetivo)
1. Entrar a [mail-tester.com](https://www.mail-tester.com/) → copiar la dirección que da.
2. Desde `hola@spindlelab.cl`, enviar **un email real de la campaña** (un toque 1 de verdad,
   con su asunto y firma) a esa dirección.
3. Volver a mail-tester y leer el puntaje.

**Aprobado:** **9–10/10.** Menos de 8 → leer qué marca en rojo (casi siempre SPF/DKIM/DMARC,
listas negras, o el HTML/links). Corregir eso antes de reenviar.

### 4b. Test manual a cuentas propias
Enviar el mismo correo a **un Gmail** y **un Outlook/Hotmail** que controles (idealmente que
nunca hayan recibido de ti):
- **¿En qué carpeta cae?** Principal (bien) / Promociones (mejorable) / **Spam (crítico)**.
- En Gmail → abrir el correo → ⋮ → **"Mostrar original"** → confirmar las tres:
  `SPF: PASS · DKIM: PASS · DMARC: PASS`.

➡️ **Resultado:** puntaje mail-tester ___/10 — Gmail: ⬜ Principal ⬜ Promos ⬜ Spam —
Outlook: ⬜ Inbox ⬜ Junk — auth: SPF__ DKIM__ DMARC__

---

## Paso 5 — Reputación y warm-up del dominio (contexto del 0/20)

Aunque las 3 auth aprueben, un dominio **nuevo** que dispara **15 correos en un día** parece
sospechoso para los filtros. Recomendaciones para el relanzamiento:

- **Rampa:** empezar con ~5–10 envíos/día e ir subiendo de a poco a lo largo de 2–3 semanas.
  No volver a mandar 15 de golpe.
- **Google Postmaster Tools** (si es Workspace): dar de alta `spindlelab.cl` para ver
  reputación y % de spam reportado. [postmaster.google.com](https://postmaster.google.com/)
- **Chequear listas negras:** MXToolbox → "Blacklist Check" del dominio y de la IP saliente.
- Sin links acortados, sin adjuntos en el toque 1 (ya está en la plantilla), texto plano >
  HTML recargado.

➡️ **Resultado:** Postmaster ⬜ dado de alta — blacklist: ⬜ limpio ⬜ aparece en: ______

---

## Veredicto

- ⬜ **Verde — reenviar/escalar:** las 3 auth PASS, mail-tester ≥9, cae en Principal.
- ⬜ **Amarillo — corregir antes:** algo en Promos, mail-tester 7–8, o DMARC en `none` sin DKIM.
- ⬜ **Rojo — NO enviar nada:** cae en Spam, alguna auth falla, o aparece en blacklist.
  Arreglar la causa y volver a correr este checklist desde el Paso 1.

**Bitácora de corridas:**

| Fecha | Proveedor | SPF | DKIM | DMARC | mail-tester | Bandeja | Veredicto |
|---|---|---|---|---|---|---|---|
| 29 jul 2026 | Google Workspace (MX `smtp.google.com`) | PASS | PASS | PASS (`quarantine/reject`) | **9.1/10** | **Principal** (test a Gmail) | 🟢 **VERDE** |

**Conclusión 29 jul 2026:** la entregabilidad NO explica el 0/20 del piloto. Base técnica sana
(Google Workspace + DMARC estricto + 9.1 en mail-tester). El silencio se atribuye a **timing
(envíos 10–14 jul, plena vacaciones de invierno en Chile) + muestra chica (0 de 20 es lo
estadísticamente esperable, no una señal)**. Único ítem cosmético pendiente: BIMI (logo en
bandeja), no afecta entrega. Acción: relanzar en la ventana post-vacaciones y subir volumen.
