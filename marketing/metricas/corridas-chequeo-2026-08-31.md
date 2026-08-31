# Corridas del chequeo público — 31-ago-2026

**Quién y cómo:** sesión coordinadora, sobre los 70 leads limpios de Dereck (`ventas/contactos-google-maps-*.csv`),
vía `GET https://spindlelab.cl/api/chequeo?dominio=X` (la misma herramienta pública de /diagnostico/). SpindleLab
auto-excluido de la muestra. Crudos por dominio en los `.jsonl` de esta carpeta.

**Para qué:** (1) el post personal del mié 9-sep (Renata pidió ≥20 corridas del mismo rubro: HAY DOS RUBROS COMPLETOS);
(2) los ganchos de los lotes de Emilia (puntaje real por prospecto, sin re-correr); (3) semilla del Research de octubre (#10).

**Caveat de honestidad (regla de la ficha de Valen):** para sitios detrás de Cloudflare el chequeo corre de Worker a
Worker y NO ve reglas de bots inyectadas en el borde: los chequeos de acceso pueden salir mejor de lo real. Si un
dato de acceso se va a citar en público o en un correo, confirmarlo contra el robots.txt directo del sitio.

## Inmobiliarias — 38 corridas ok

- Puntaje: mín 34 · mediana 45 · máx 82 (sobre 100)
- Bajo 50 puntos: 24 de 38 · entre 50-69: 10 · 70 o más: 4
- Sitios tras Cloudflare (caveat de acceso): 29 de 38

| Chequeo que falla | Sitios que lo fallan (de 38) |
|---|---|
| Tienes preguntas frecuentes marcadas (`faq`) | 37 |
| Respondes preguntas en tus títulos (`preguntas`) | 36 |
| Te conectas con al menos 3 perfiles externos (`sameas`) | 35 |
| Hay una persona con credenciales detrás (`autor`) | 35 |
| Tu entidad tiene dirección y contacto (`entidad-completa`) | 35 |
| Tu contenido tiene fecha (`fecha`) | 30 |
| Tu negocio está declarado como entidad (`entidad`) | 28 |
| Tienes llms.txt (`llms`) | 27 |
| Hay un solo H1 (`h1`) | 25 |
| Tienes datos estructurados (`jsonld`) | 24 |
| Tienes meta description útil (`desc`) | 23 |
| Declaras la URL canónica (`canonical`) | 17 |

### Por dominio (interno, para los ganchos de Emilia; NO citar nombres en público)

| Dominio | Puntaje | Chequeos fallados |
|---|---|---|
| reinmobiliaria.cl | 34/100 | 14 de 21 |
| romopropiedades.cl | 34/100 | 15 de 21 |
| fernandezpropiedades.cl | 37/100 | 14 de 21 |
| fpropiedades.cl | 37/100 | 14 de 21 |
| vidalriedel.cl | 37/100 | 14 de 21 |
| novaportapropiedades.cl | 38/100 | 13 de 21 |
| corredoresintegrados.cl | 40/100 | 13 de 21 |
| dubpropiedades.cl | 40/100 | 13 de 21 |
| catabrochet.cl | 41/100 | 13 de 21 |
| fuentespropiedades.com | 41/100 | 12 de 21 |
| goycooleapropiedades.cl | 41/100 | 13 de 21 |
| mtcpropiedades.cl | 41/100 | 12 de 21 |
| propiedadesmila.cl | 41/100 | 13 de 21 |
| urbac.cl | 41/100 | 13 de 21 |
| gesinpropiedades.cl | 42/100 | 12 de 21 |
| gestall.cl | 43/100 | 12 de 21 |
| migliardipropiedades.cl | 43/100 | 11 de 21 |
| casaschic.cl | 45/100 | 11 de 21 |
| corredorag.cl | 45/100 | 11 de 21 |
| freedominmobiliario.cl | 45/100 | 11 de 21 |
| propiedadescima.com | 45/100 | 11 de 21 |
| donec.cl | 47/100 | 10 de 21 |
| vanguardiapropiedades.com | 47/100 | 10 de 21 |
| vivax.cl | 47/100 | 11 de 21 |
| inversionesalval.cl | 53/100 | 10 de 21 |
| ppartnersgroup.com | 54/100 | 9 de 21 |
| ialtura.cl | 56/100 | 10 de 21 |
| schumacherpropiedades.cl | 57/100 | 9 de 21 |
| gpremium.cl | 63/100 | 7 de 21 |
| silvecpropiedades.cl | 63/100 | 8 de 21 |
| jlbpropiedades.cl | 67/100 | 7 de 21 |
| sociasinmobiliarias.cl | 67/100 | 7 de 21 |
| anticapropiedades.cl | 68/100 | 7 de 21 |
| boettcher.cl | 68/100 | 7 de 21 |
| bram.cl | 73/100 | 6 de 21 |
| rento.cl | 73/100 | 6 de 21 |
| polarispropiedades.cl | 79/100 | 4 de 21 |
| propietat.cl | 82/100 | 4 de 21 |

## Contadores — 31 corridas ok (1 fallida: chileaudita.cl)

- Puntaje: mín 30 · mediana 58 · máx 79 (sobre 100)
- Bajo 50 puntos: 12 de 31 · entre 50-69: 13 · 70 o más: 6
- Sitios tras Cloudflare (caveat de acceso): 21 de 31

| Chequeo que falla | Sitios que lo fallan (de 31) |
|---|---|
| Tienes preguntas frecuentes marcadas (`faq`) | 30 |
| Hay una persona con credenciales detrás (`autor`) | 29 |
| Te conectas con al menos 3 perfiles externos (`sameas`) | 28 |
| Respondes preguntas en tus títulos (`preguntas`) | 28 |
| Tu entidad tiene dirección y contacto (`entidad-completa`) | 25 |
| Tienes llms.txt (`llms`) | 22 |
| Tu contenido tiene fecha (`fecha`) | 21 |
| Tienes meta description útil (`desc`) | 17 |
| Tu negocio está declarado como entidad (`entidad`) | 15 |
| Tienes sitemap.xml (`sitemap`) | 15 |
| Tienes datos estructurados (`jsonld`) | 12 |
| Hay un solo H1 (`h1`) | 11 |

### Por dominio (interno, para los ganchos de Emilia; NO citar nombres en público)

| Dominio | Puntaje | Chequeos fallados |
|---|---|---|
| neosit.cl | 30/100 | 16 de 21 |
| jabconsultores.cl | 37/100 | 13 de 21 |
| taxwork.cl | 39/100 | 13 de 21 |
| aucont.cl | 40/100 | 12 de 21 |
| checkcontabilidades.cl | 41/100 | 12 de 21 |
| rsla.cl | 42/100 | 12 de 21 |
| a2rcontadores.cl | 43/100 | 11 de 21 |
| oscplus.cl | 44/100 | 11 de 21 |
| bustamantecia.cl | 45/100 | 11 de 21 |
| clavetributariacontadores.cl | 45/100 | 11 de 21 |
| greentax.cl | 45/100 | 11 de 21 |
| ayrcontax.cl | 49/100 | 10 de 21 |
| goauditores.cl | 55/100 | 9 de 21 |
| hyl.cl | 55/100 | 10 de 21 |
| santiagocontadores.cl | 56/100 | 10 de 21 |
| astauditores.cl | 58/100 | 9 de 21 |
| contable.app | 62/100 | 8 de 21 |
| tuoficinacontable.cl | 63/100 | 8 de 21 |
| acontables.cl | 65/100 | 7 de 21 |
| adactiva.cl | 65/100 | 8 de 21 |
| alfaroypinto.com | 65/100 | 7 de 21 |
| pcmservicioscontables.cl | 66/100 | 7 de 21 |
| cyc-ca.com | 67/100 | 6 de 21 |
| mcontabilidad.cl | 67/100 | 7 de 21 |
| benaventeymartinez.cl | 69/100 | 6 de 21 |
| f5contable.cl | 70/100 | 6 de 21 |
| amgestemp.cl | 73/100 | 5 de 21 |
| lofwork.cl | 74/100 | 5 de 21 |
| contarmeasesora.cl | 75/100 | 5 de 21 |
| akcontadores.cl | 79/100 | 4 de 21 |
| bschileconsultores.cl | 79/100 | 4 de 21 |

