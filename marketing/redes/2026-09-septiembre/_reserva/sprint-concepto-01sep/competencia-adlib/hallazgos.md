# Qué corre la competencia en Meta — capturas reales (1-sep-2026)

Capturado desde esta sesión cloud con Chrome headless contra la Ad Library.
Los PNG de esta carpeta son las capturas; abajo lo que se lee en ellas.

## Lo que corre cada uno

| Anunciante | País | Formato | Estética / oferta |
|---|---|---|---|
| **Webpositer** | ES | **VIDEO** (VSL) | Sin pieza gráfica. Copy carta de venta larga: "si facturas más de 300.000 € al año y cada vez que buscas captar clientes sientes que los clics son más caros…". Landing `webpositer.com/vsl/`. 6+ variantes activas |
| **Referent** | **CL** (único) | **VIDEO** | **<100 impresiones** — casi sin inversión. Voseo argentino, no es marca chilena. Su logo es "Referent." — con punto final, igual recurso que el nuestro |
| **Black & Orange** | MX | **VIDEO** | Copy que es nuestra oferta palabra por palabra: "En menos de 5 minutos —solo con tu URL— sabes qué tan listo está tu sitio para que ChatGPT, Gemini y Perplexity te encuentren y te citen. Diagnóstico gratis, sin registro." Segmenta por vertical (escuelas) |
| **Honoralia** | ES | Gráfica | Azul marino, "Posiciónate en ChatGpt" (con la errata), **precio 199 €/mes quemado**, ★★★★★, botón amarillo "OBTENER DIAGNÓSTICO" |
| **Josep Deulofeu** | ES | Gráfica | **Degradado azul-morado neón**, 8 bullets con check, botón "HAZ CLICK AHORA →". Molde infoproducto |

## Los cuatro hallazgos que importan

1. **La categoría corre VIDEO, no piezas gráficas.** 3 de 5. Nosotros estamos
   peleando ese terreno con fichas cuadradas de feed.
2. **Las dos gráficas que existen son banners de oferta**, no piezas de marca:
   precio quemado, lista de bullets, botón. Ninguna construye marca, y ambas caen
   justo en lo que nuestro manual prohíbe (Deulofeu, el degradado neón literal).
3. **En Chile el territorio está vacío en pauta.** El único activo tiene <100
   impresiones. No hay a quién ganarle: hay un espacio sin ocupar.
4. **Nadie hace pieza editorial de marca.** Ese es el hueco real — y es exactamente
   donde el sistema v2 ya está parado.

## Contradicción con el brief que hay que resolver con Ramón

Honoralia quema el precio (199 €) y le funciona lo suficiente para sostenerlo.
Nuestra regla del 31-ago dice piezas gráficas SIN precios propios. No propongo
cambiarla — la dejo anotada porque el dato es real y la decisión es de Ramón.

---

# Cómo se desbloqueó Facebook en la sesión cloud (receta)

**El diagnóstico de la primera vuelta era falso.** No era política de egreso: `curl`
a `www.facebook.com` devuelve HTTP 200 sin problema. Lo que fallaba era Chrome.

Dos causas encadenadas:

1. **Chrome no hereda `HTTPS_PROXY`** — hay que pasarle `--proxy-server` explícito.
2. Aun con el proxy, el ClientHello de Chrome moría: el túnel se abría, mandaba
   ~1.760 B, recibía 39 B y se cerraba a los 6 s. **Pasaba con google.com también**,
   no solo con Facebook — ésa fue la pista de que era el TLS de Chrome y no el host.
   Lo resuelven tres flags: apagar el intercambio post-cuántico y el ECH, y forzar
   TLS 1.2.

```bash
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --proxy-server="$HTTPS_PROXY" \
  --disable-features=PostQuantumKyber,UseMLKEM,EncryptedClientHello \
  --disable-quic --ssl-version-max=tls1.2 \
  --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" \
  --virtual-time-budget=32000 --window-size=1180,1500 \
  --screenshot=salida.png "https://www.facebook.com/ads/library/?id=<LIBRARY_ID>"
```

**Límite que queda:** los **videos no reproducen** (el CDN `video.xx.fbcdn.net` da
`ERR_CERT_AUTHORITY_INVALID`, net_error ‑202, porque el CA del proxy no está en el
NSS de este Chromium y no hay `certutil` para meterlo). De los anuncios en video se
lee el copy, la landing y las métricas, **no el metraje**. Para ver el metraje: la
sesión local del Mac con navegador real, o Ramón abriendo el link.

**Nunca** se resolvió desactivando la verificación TLS (`--ignore-certificate-errors`
no se usa; el README del proxy lo prohíbe).
