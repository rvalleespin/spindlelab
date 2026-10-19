# Lote hoteles 25-sep — Verifica y Cumple

38 sitios medidos con navegador real (Chrome headless por CDP, dos tramos: pasivo ~11 s y
con movimiento de mouse ~6 s más). El hallazgo de cada correo sale de esa medición, no del
chequeo automático y no de curl. Datos crudos: `/tmp/probe/lote1.json` y `lote2.json`.

## 16 borradores escritos (sin enviar)

Tanda A — sin aviso y sin política enlazada:

| dominio | contacto | hallazgo medido |
|---|---|---|
| lasmajadas.cl | jprieto@ | nada carga pasivo; **basta mover el mouse** y GA, Google Ads, TikTok y Clarity reciben la visita. 43 cookies (_ttp 390 d, _clck 365 d) |
| harenua.com | sebastianteao@ | GA y Clarity reciben la visita. 14 cookies (_clck 365 d, MUID 390 d) |
| lunadepirque.cl | cristobal@ | GA y Google Ads reciben. 7 cookies. Meta cargó y dejó `_fbp`, sin enviar el dato. 1 formulario |
| santuariodelrio.cl | ccastellon@ | GA y Google Ads, incluida marca de remarketing. 13 cookies. 1 formulario |
| cascadadelasanimas.cl | roberto@cascada.net | GA y Google Ads. 18 cookies. 3 formularios |
| hotelalaia.com | nicolas.correa@ | GA, Google Ads y Clarity. 15 cookies. 1 formulario |
| puertadelsur.cl | claudio@ | GA y Google Ads. 5 cookies. Meta cargó y dejó `_fbp`, sin enviar |
| casahigueras.cl | gvelasco@ | GA recibe la visita. 6 cookies (_ga 400 d) |

Tanda B — con política enlazada, sin aviso (el ángulo es el consentimiento):

| dominio | contacto | hallazgo medido |
|---|---|---|
| hcdl.cl | drojas@ | Google, TikTok y Clarity reciben. **36 cookies**. Meta cargó y dejó cookie, sin enviar |
| explora.com | mjcabrera@ | Clarity, Bing Ads y GA reciben. **56 cookies** (Trade Desk, Adobe). Meta carga al mover el mouse. 4 formularios |
| glampi.com | roberto@ | TikTok y GA reciben. 10 cookies (Klaviyo 400 d). Meta cargó y dejó cookie, sin enviar |
| lodgecolbun.com | cristian@ | GA y Google Ads con **dos cuentas** de publicidad. 12 cookies (IDE 400 d) |
| antumalal.com | ronypollak@ | GA y Google Ads con remarketing. 11 cookies + YouTube 180 d |
| leonerahotel.cl | cavaria@ | GA recibe. 5 cookies. Meta cargó y dejó cookie, sin enviar |
| casasolcor.cl | naguilera@ | (sin política) GA recibe. _ga 400 d. 1 formulario |
| marbella.cl | carolina.saavedra@ | **gestor de cookies instalado y aun así dispararon**: GA y Google Ads reciben, 23 cookies (HubSpot, LinkedIn, DoubleClick), sin política enlazada |

## Tanda C — 10 borradores más (escritos 25-sep)

Con aviso y política, y el rastreador dispara igual (el ángulo es "informa pero no bloquea"):

| dominio | contacto | hallazgo medido |
|---|---|---|
| hoteles-australis.com | paguero@hotelesaustralis.com | aviso + política presentes; GA recibe la visita antes de aceptar. Cero cookies |
| norusapartments.cl | nataliasilva@norus.cl | aviso + política presentes; GA recibe la visita. 3 cookies (tds_d00di00 30 d) |
| hoteltorremayorlyon.com | i.barrales@hoteltorremayor.cl | aviso + política presentes; GA recibe la visita. 3 cookies (mismo CMS que Norus) |

Con política, sin aviso:

| dominio | contacto | hallazgo medido |
|---|---|---|
| hotelaguadeldesierto.cl | aleiva@ | GA recibe la visita, _ga 400 d. 1 formulario |
| plazasanfrancisco.cl | fgajardo@ | GA recibe la visita. Meta cargó, sin cookie persistente ni envío. 2 formularios |

Sin política:

| dominio | contacto | hallazgo medido |
|---|---|---|
| wyndhampettra.com | maximiliano.rojas@ | **Cookiebot instalado y aun así dispararon**: GA y Google Ads reciben, 15 cookies (PixelYourSite 365 d, _ga 400 d), 3 formularios |
| rioserrano.com | barancibia@ | Meta cargó y dejó su cookie 90 d, **no** envió el dato. YouTube 180 d. Sin aviso |

Formulario sin política, cero rastreadores (la oferta es el 14 ter, no el aviso):

| dominio | contacto | hallazgo medido |
|---|---|---|
| azimut360.com | claudia.henriquez@ | 2 formularios, sin política. Cero rastreadores, cero cookies |
| blackcathostal.com | aaballay@ | 2 formularios, sin política. Cero rastreadores, cero cookies |
| lagogrey.com | csepulveda@ | 2 formularios, sin política. Solo cookies funcionales (reCAPTCHA, idioma) |

Ninguno de los 10 tenía contacto previo (`search_threads`).

## 9 descartados (§9: no hay nada que afirmar)

almalodge.cl · puyuhuapilodge.com · taka.cl · aguasdelmonte.cl · laturbina.cl ·
hotelkennedy.cl · weskar.cl · **tantakuy.cl** (política publicada, el contenedor de GTM
carga pero no envió nada y no dejó ni una cookie) · chelenko.com y tungulu.cl (cero rastreadores y cero cookies de
seguimiento; solo formularios, hallazgo demasiado flaco para un primer contacto)

## Notas

- Ninguno de los 16 dominios tenía contacto previo (verificado con `search_threads`, no con los CSV).
- El 24-sep salieron 36 correos en un día. La rampa de §8 dice 15 la primera semana, así que
  conviene repartir: 8 el lunes y 8 el martes, no los 16 juntos.
- `_fbp` presente sin `facebook.com/tr` = "cargó y dejó su cookie", **nunca** "recibió la visita".
