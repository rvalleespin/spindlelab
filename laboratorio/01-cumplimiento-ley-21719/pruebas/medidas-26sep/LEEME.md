# Treinta y cuatro mediciones reales, del 26-sep-2026

Mismo método que `medidas-25sep/`: Chrome abierto por CDP en un contexto nuevo, sin un solo
clic, llamando al **mismo `medirConNavegador`** que corre en producción. Lo único local fue
el cliente WebSocket.

Existen por una razón concreta: **el arreglo del motivo `portero` no podía probarse con
casos inventados.** La regla vieja ("si TODAS las cookies son de un gestor de bots, no vimos
la página") se caía con una sola cookie corriente al lado, y la prueba que la cuidaba estaba
escrita con el mismo supuesto que el código — afirmaba que una página con 20 peticiones y
4.000 letras cuyas únicas cookies fueran `_abck` y `bm_sz` era una pared. Nadie lo había
medido. Cuando se midió, resultó ser al revés.

## Qué se midió

| archivo | qué es |
|---|---|
| `censo.json` | Las 34 portadas, ordenadas por número de peticiones, con su título, su cantidad de letras y los nombres y dominios de todas sus cookies. Es la tabla de la que sale el corte de `MAX_PETICIONES_PARED`. |
| `santander.json` | La pared de Akamai, medida de nuevo un día después: 8 peticiones, 435 letras, `_abck` y `bm_sz`. Confirma la medición del 25-sep desde otra corrida. |
| `itau.json` | **El caso que rompe la regla vieja.** Portada entera de un banco (119 peticiones, 5.244 letras) detrás de Imperva, con `nlbi_`, `visid_incap_`, `incap_ses_` y `reese84` de primera parte. La vimos completa; no es ninguna pared. |
| `scotiabank.json` | Lo mismo con Akamai: 212 peticiones, 7.583 letras, y `_abck`, `bm_sz` y `ALTDCAKAMAI` de primera parte, al lado de un montón de cookies propias. |

El censo sirve además para el **otro** falso verde que se cerró el mismo día: el ítem de
cookies afirmaba en absoluto que el sitio "no dejó ninguna cookie de rastreo", cuando la
puerta de escape para el rastreador que no está en el catálogo solo existe para cookies de
otro dominio. En el censo hay cinco familias de rastreo escritas **como propias** y ninguna
está en nuestro catálogo: `_ym_*` (Yandex Metrica, en sodimac.cl), `__rtbh.*` (RTB House, en
wom.cl, jumbo.cl y bci.cl), `_vwo_*` y `_vis_opt_*` (VWO, en entel.cl y skyairline.com),
`_conv_v`/`_conv_s` (Convert, en wom.cl) y `dtCookie*` (Dynatrace, en aguasandinas.cl). El
§32 de `prueba-profundo.mjs` las lee de acá, no de una lista escrita a mano.

Las doce portadas chicas del censo (`bollek.cl`, `nucleosalud.cl`, `addwise.cl`,
`clinicaavaria.cl`, `clinicaopia.cl`, `lartodontologia.cl`, `dentalnaran.cl`, `morapavic.cl`,
`beladent.cl`, `ceof.cl`, `simsabogados.cl`, `pmyasociados.cl`) salieron de las listas de
outbound: son prospectos de verdad, del tamaño exacto al que un corte mal puesto le quitaría
el informe. La más flaca de ellas trae 75 peticiones.

## Lo que dice la tabla

    3 peticiones     bancoestado.cl, latamairlines.com   paredes (las atrapa el texto)
    8 peticiones     santander.cl                        pared (la que se escapaba)
   23 peticiones     tuane.cl                            portada REAL más flaca
   75 a 715          las otras 30                        portadas reales

Entre la pared y la portada real más pobre hay un hueco, y el corte va dentro: **12**. No hay
ninguna portada real medida con 12 peticiones o menos, ni acá ni en el banco viejo, donde la
más flaca es time.cl con 18.

## Cómo se rehacen

Con Chrome headless en un puerto de CDP y un cliente `{ enviar, al }` de veinte líneas sobre
el `WebSocket` global de node, llamando a `medirConNavegador(cliente, url, dominio, {})`. Si
se rehacen, **las cifras de `prueba-profundo.mjs` cambian con ellas**: son un retrato de esos
sitios en una fecha, no constantes. La pared de un banco puede no estar mañana, y una portada
que hoy trae 23 peticiones puede traer 200 el mes que viene.
