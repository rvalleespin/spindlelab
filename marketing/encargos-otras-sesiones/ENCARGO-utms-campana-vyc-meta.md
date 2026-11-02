# UTMs de la campaña de Verifica y Cumple — CORREGIDO: no hay nada que editar

**De:** la sesión de Verifica y Cumple · 2-nov-2026
**Estado:** este encargo quedó sin objeto. Se conserva porque el error que lo originó vale
la pena no repetirlo.

---

## Lo que yo afirmé, y era falso

Dije, varias veces y con seguridad, que **«los anuncios no llevan utm: enlazan a
`https://verifica.spindlelab.cl/` pelado»**, y escribí un encargo para que alguien los
agregara a los 36 anuncios.

Estaba equivocado. La sesión de Meta Ads lo corrigió: **los 36 anuncios tienen los UTM desde
el 23-oct**, en el campo «Parámetros de URL» a nivel de anuncio:

```
utm_source=meta&utm_medium=paid&utm_campaign=vy…&utm_content={{ad.name}}&utm_term={{adset.name}}
```

## Por qué me equivoqué, que es lo que importa

Leí `link_url` de los creativos por la API y vino vacío. **`link_url` vacío no prueba nada
sobre los UTM:** Meta guarda los parámetros de URL en otro campo (`url_tags`), y además estos
creativos se arman desde publicaciones de Instagram existentes (`object_story_id`), donde el
destino tampoco vive en `link_url`.

O sea: leí un campo, no encontré lo que buscaba, y concluí que no existía en ninguna parte.
Es el mismo error que esta misma sesión cometió con `spindlelab-site/` —mirar la copia
equivocada y sacar una conclusión sobre el todo— dos veces el mismo día.

⚠️ **Y no se puede verificar con la MCP de Meta que tenemos:** `url_tags` no es un campo
consultable (`ads_get_field_context` lo da como desconocido), y la vista previa del anuncio
tampoco expone el destino. Así que yo no podía confirmarlo ni desmentirlo, y lo afirmé igual.
Lo correcto habría sido decir que no podía verlo.

## Lo que sí estaba roto, y ya está arreglado

El contador por origen del servidor estaba ciego: clasificaba con el referer y la URL de la
*llamada a la API*, no los de la página, así que todo caía en `propio` aunque el utm llegara
perfecto. Eso se arregló y está desplegado (commit `8a03cd91`), verificado contra el KV de
producción.

**Consecuencia buena:** como los anuncios ya traían el utm, el contador arreglado empieza a
separar el tráfico de Meta **desde ya, sin tocar nada en Ads Manager.**

## Lo que quedaba abierto, y en qué quedó

«Falta verificar que el sitio los conserve hasta el pedido.» Correcto, y era lo único real.
Revisado y cubierto con pruebas el 2-nov:

| tramo | estado |
|---|---|
| La página lee los utm de SU url al cargar | ✅ probado ejecutando la función de la página |
| Viajan en el cuerpo del POST, no en la URL de la API | ✅ probado |
| `UTMS` está en el mismo ámbito que el envío | ✅ probado (el fallo sería mudo) |
| El servidor los guarda en la fila del pedido | ✅ ya estaba probado |
| Se recortan a 200 y se limpian los caracteres de control | ✅ probado en los dos lados |

Validado rompiendo el código: hacer que la página lea la URL equivocada tumba tres
aserciones; sacar `utms` del cuerpo tumba otra.

**Lo que sigue sin probarse, y no se puede forzar:** un pedido REAL con utm. Las 21 filas que
hay en la base son todas internas, de nuestras pruebas del checkout. La primera compra de
verdad es la que lo confirma.

## Lo que sí hay que hacer con la campaña

Nada de UTMs. Lo que queda es la decisión del 4-7 de noviembre, con estos números medidos:
9.843 impresiones → 515 clics → 490 visitas → 24-35 chequeos en once días → 0 pedidos. El
corte grande estaba en que el campo del dominio quedaba 1,4 pantallas bajo el pliegue en
teléfono, y eso se arregló hoy y está desplegado.
