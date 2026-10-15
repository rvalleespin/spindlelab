# Encargo — el motor de revisión previa (el filtro que decide a quién se le escribe y por qué)

**Abre:** Ramón, 14-oct-2026 · **De:** Marco (inteligencia de mercado)
**Para:** la sesión nueva que construya el motor · **Hermana de:** la sesión de búsqueda de leads
**Origen:** idea 1 del video de los siete hacks, reformulada por Ramón:
*"un mecanismo automático de análisis profundo del sitio que ofrezca soluciones a los problemas.
No solo visibilidad en IA: que sepas que tu sitio no está captando clientes porque le pasa X."*

---

## 1. Qué es, en una línea

El paso que corre **antes** del correo: mira el sitio del prospecto, encuentra **por qué no está
captando clientes**, y deja el hallazgo listo para que el correo salga con un problema real y una
solución que se vende.

**Qué NO es:** un marcador de puntaje con cincuenta recomendaciones. Eso ya existe gratis y es la
forma más rápida de volverse indistinguible (ver §3).

## 2. Dónde se enchufa (y qué NO reemplaza)

```
Dereck (prospección)  →  EL MOTOR (filtro + hipótesis de hallazgo)  →
verificación a mano en navegador  →  Emilia (los 3 toques)  →  Valen (mini-diagnóstico)
```

**El motor filtra y prioriza. No produce el hallazgo que va en el correo.** Esa frontera no se
mueve, y está escrita con un caso que la prueba: **awasi.com saca 100/100 en el chequeo y es de
los peores sitios reales que se revisaron** — el chequeo lee el HTML y no ejecuta JavaScript. La
regla vigente (`estrategia-outbound-verifica-y-cumple.md` §2 y §3) manda entera:

- **El puntaje nunca va en un correo.** Sirve para filtrar candidatos, no para acusar.
- **El hallazgo se comprueba abriendo el sitio**, en dos tramos: ~11 segundos pasivo y después
  con movimiento (hay plugins chilenos que retrasan los scripts hasta el primer gesto).
- **Las tres cosas que no son lo mismo:** que un script se descargue, que deje una cookie, y que
  haya enviado datos. Confundirlas hace el correo refutable en dos minutos.
- **Nada que dependa de la corrida:** si es cierto en dos de tres corridas, no va.

⚠️ **Consecuencia práctica:** la verificación necesita un navegador real. **Esta sesión conviene
abrirla local en el Mac**, no en la nube.

## 3. El descarte 0 ya está hecho. Léelo antes de diseñar

**La categoría está llena, en dos capas** (verificado el 14-oct-2026):

1. **La genérica:** "auditoría gratis de tu sitio" es de lo más comoditizado que existe —
   SEOptimer, Woorank, Semrush, Lighthouse, el grader de HubSpot. Tanto, que `seoptimer` ya es
   palabra negativa en la campaña de Google Ads de la casa.
2. **La de los bots de IA, que es la que duele:** hay al menos media docena de chequeos
   **gratis** que prueban GPTBot, ClaudeBot, PerplexityBot y Google-Extended contra robots.txt,
   validan `llms.txt`, y **uno sondea si un CDN o firewall bloquea a los bots aunque robots.txt
   los permita** — que es la sonda que esta casa agregó como diferencial. Semrush Site Audit
   también marca el bloqueo de GPTBot.

**Por lo tanto: medir más señales no es el foso.** Si el motor crece hacia "más chequeos", en seis
meses está empatado con cosas gratis y en inglés.

**Dónde sí está el foso, y es lo único que hay que defender:**
- **La combinación.** Nadie junta acceso de agentes de IA + Ley 21.719 + ruta de contacto, en
  castellano y con contexto chileno.
- **Que hay alguien que lo arregla.** Un grader entrega una lista y se va.
- **La pregunta.** El chequeo de hoy responde *"¿te puede leer la IA?"*, que al dueño no le duele.
  El motor responde *"¿por qué no me llegan clientes?"*, que es lo único que le quita el sueño.
  Es la regla que ya rige el mini-diagnóstico: **el documento habla el idioma del dueño, no el
  del técnico.**

## 4. Qué mide, agrupado por el problema del dueño

Cada grupo cae en una línea de negocio. Eso es lo que convierte "motor de adquisición" de eslogan
en algo demostrable.

| El dueño siente | Lo que se mira desde afuera | Línea |
|---|---|---|
| "No me llegan consultas" | ¿Hay dónde dejar los datos? Formulario que existe y responde, teléfono clicable en móvil, WhatsApp, agenda online | Desarrollo Web |
| "No sé de dónde vienen los que llegan" | ¿Hay analítica? ¿Hay evento de conversión, o solo pageviews? | Acompañamiento |
| "Me buscan y aparece otro" | Acceso de agentes en vivo, entidad legible, páginas citables | Visibilidad en IA |
| "Me da lata el tema legal" | Política que abre, consentimiento, casilla premarcada, servicios externos | Verifica y Cumple |
| "Mi sitio se ve viejo o lento" | Velocidad real, móvil, señales de confianza: quién está detrás, dirección, equipo | Desarrollo Web |

**La fila que más vale es la segunda, y es la que nadie mide:** si el dueño no puede medir, no ve
la mejora; y si no ve la mejora, no renueva. Esa fila es la que sostiene el Acompañamiento.

## 4-bis. La vara de salida: **el problema que nadie ve** (precisión de Ramón, 14-oct)

La tabla de arriba es **la capa 1: lo visible y automático**. Es lo que el chequeo gratis ya
entrega, es correcto que se regale, y **muestra solo una parte**. Filtra candidatos. No gana una
reunión, porque cualquiera puede obtener eso solo.

Lo que gana la reunión es **la capa 2: el hallazgo que el dueño no podía ver**. Ni él, ni su
desarrollador, ni la agencia que le cobra todos los meses. Esa es la vara con la que se mide este
motor, y es distinta de "cuántas señales revisa".

**Un hallazgo califica como capa 2 si cumple las cuatro:**

1. **No se ve mirando el sitio.** Si el dueño abre su página y lo nota, no es capa 2.
2. **Le cuesta plata o riesgo hoy**, y lo entiende en una frase, sin que nadie le explique qué es
   AEO.
3. **Lo puede comprobar él mismo** una vez que se le señala dónde mirar. Si no es verificable por
   el prospecto, no se escribe.
4. **Exige oficio**, no una llamada a una API. Si una herramienta gratis lo escupe, es capa 1.

**Los que ya están probados en esta casa, como molde:**

- **Trackers que disparan antes del consentimiento.** El caso awasi.com: 100/100 en el chequeo, y
  al abrirlo en un navegador escribe cookies de Analytics, Ads, Meta y Reddit a los diez segundos,
  sin ningún aviso. El dueño no lo ve. El chequeo tampoco: lee HTML y no ejecuta JavaScript.
- **Scripts retrasados hasta el primer gesto** (WP Rocket y similares). En el tramo pasivo el
  sitio parece limpio y no lo está. Dos de doce sitios chilenos cayeron ahí.
- **El bloqueo en el borde:** el CDN o el firewall expulsa a los agentes de IA por nombre aunque
  robots.txt los permita. Invisible desde el HTML.
- **La medición que no mide.** Tiene analítica instalada, cree que está midiendo, y no hay ningún
  evento de conversión: cuenta visitas y las confunde con clientes. Es el de mejor forma de los
  cuatro, porque el dueño está convencido de lo contrario.
- **La entidad partida:** el negocio se llama de tres maneras distintas entre su sitio, su ficha
  de Google y su LinkedIn, así que ningún modelo consolida quién es.
- **Un staging o subdominio viejo indexado**, compitiendo contra la página que sí vende.

**Lo que esto le cambia al motor:** su trabajo no es producir el hallazgo invisible de forma
automática — es **decir dónde mirar** para que la pasada a mano lo encuentre rápido. El motor es
un **detector de sospecha**, no un calificador. Por eso la frontera del §2 no se mueve y por eso
la sesión va local, con navegador.

## 5. El límite honesto, que se escribe antes de la primera línea de código

Desde afuera y sin accesos, el motor detecta **ausencia y rotura**, no rendimiento. Puede decir
"no hay formulario" o "el enlace a la política no abre". **No** puede decir "tu formulario
convierte mal". Eso no es debilidad: es la frontera entre el instrumento gratis y el trabajo que
se cobra.

**Y una jerarquía, o se convierte en SEOptimer en español:** una sola corrección por prospecto, la
de mayor impacto, con el orden de la casa — **acceso > entidad > citabilidad**, y la ruta de
contacto antes que todo lo demás cuando falta (si no hay dónde dejar los datos, nada más importa).

## 6. El tono de lo que produce: se regala el hallazgo, se vende el arreglo

Decisión de Ramón (14-oct): **el correo no entrega el problema y se despide.** Llega con una
solución que se vende.

Esto **no** deroga lo gratis: el chequeo público y el mini-diagnóstico siguen siendo la puerta de
entrada, y en Google Ads "gratis" sigue sin negativizarse porque la oferta real es gratis. Lo que
manda es la doctrina que ya existe: **regala el paso 1 y deja visible la ruta completa. Si lo
regalado es la única necesidad visible, el prospecto lo arregla solo y la venta muere.**

**Cómo suena, y cómo no:**

| ❌ No | ✅ Sí |
|---|---|
| "Te ofrecemos la solución perfecta a tu problema" | "Esto se arregla. Lo hacemos nosotros y toma una semana." |
| "Impulsa tu negocio con nuestras soluciones" | "Si quieres, lo dejamos andando." |
| Lista de cinco hallazgos | Uno, el de mayor impacto, y la ruta completa visible detrás |
| Un hallazgo que el dueño ya conocía | El que no podía ver, dicho de forma que lo compruebe en un minuto |

El primero promete perfección y es castellano de folleto, el olor a IA más detectable que hay. El
segundo afirma **capacidad y plazo**, que es más duro y es verificable. Registro plural (lo
entrega el negocio). Cargar `voz-spindlelab` antes de escribir cualquier salida.

## 7. Qué tiene que entregar la sesión

1. **La jerarquía escrita**, antes del código: qué se mira, en qué orden, y cuál gana cuando hay
   varias cosas malas.
2. **El motor**, corriendo sobre un dominio y devolviendo: la corrección de mayor impacto, su
   evidencia, y a qué línea de servicio pertenece.
3. **El formato de salida que Emilia pueda usar** sin reescribir: hallazgo + evidencia + la
   frase de arreglo, en el tono de §6.
4. **Las 10 primeras corridas sobre sitios reales**, contando no cuántas produjeron *un
   hallazgo*, sino **cuántas produjeron un hallazgo de capa 2** — de los que el dueño no podía
   ver solo (§4-bis). Esa es la vara. Si menos de la mitad lo produce, el motor todavía es un
   chequeo con más pasos y se dice, en vez de seguir puliéndolo.

## 8. Lo que la sesión NO hace

- **No manda correos.** Deja el hallazgo; Emilia escribe y Ramón envía.
- **No nombra prospectos** fuera del repo ni en nada público sin permiso.
- **No inventa un hallazgo** ni redondea una evidencia para que el correo quede mejor.
- **No toca** la estrategia de outbound, el pipeline ni el sitio. Reporta al troncal.
