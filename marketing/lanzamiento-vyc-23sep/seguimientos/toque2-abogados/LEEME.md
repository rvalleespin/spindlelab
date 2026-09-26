# Toque 2 de los 20 abogados que se habían quedado sin seguimiento

**Estado: los 20 escritos, ninguno enviado.** No se abrió Gmail, no salió nada.
Cada archivo es `<dominio>.txt` con `Para:`, `Asunto:` y el cuerpo. Se pegan de a uno.

**El asunto es `Re:` del original**, así que va como respuesta dentro del mismo hilo del
24-sep, no como correo nuevo. Eso importa: un "Re:" que cae fuera del hilo se lee como spam.

---

## Por qué existen estos 20

El 24-sep salieron **36 correos**, no 15 como decía el repo: 26 a estudios de abogados y 10 a
hoteles y clínicas. El material de seguimiento cubría 15. Estos 20 son los abogados que
quedaron con el toque 1 afuera y nada preparado, que es el peor lugar donde dejar un prospecto,
porque las respuestas de una secuencia de tres toques aparecen en el segundo y el tercero.

Falta uno de los 21: **lembeye.cl**. La socia está con postnatal y su automático deriva a una
colega, a quien Ramón ya escribió el 25-sep. Ese hilo corre desde otra fecha y no lleva "Re:".

⚠️ **Cuatro abogados del CSV nunca recibieron toque 1** (grupoaltum.cl, bhabogados.cl,
cepabogados.cl, lscgroup.cl). A ellos les corresponde un correo nuevo, no un seguimiento.

---

## Cómo se hicieron, y por qué se puede confiar en cada frase

Cada sitio se abrió con la sonda, hoy, en dos tramos: 11 segundos quieto y después mouse y
scroll sin clics. El segundo tramo no es opcional: varios sitios chilenos retrasan sus scripts
hasta el primer gesto.

**Todo se midió dos veces, y lo que cambió entre corridas no entró al correo.** Esa regla sacó
varias cosas: los conteos de peticiones de pgb y gtm, el host de Clarity en munoz, los "364
días" de la cookie de LinkedIn en omatusdelaparra.

**Un revisor independiente midió los 20 de nuevo y refutó nueve.** Entre ellos, pgb abría
diciendo que el sitio "no carga un solo rastreador de terceros" y sí manda telemetría a Wix;
aem presentaba dos cookies `_ga` como "las dos son tuyas", cuando las escribe Google. Todos
corregidos y vueltos a medir.

**Y una que conviene recordar:** la refutación de gtm decía que el mapa de Google cargaba solo
en el segundo tramo. Al remedirlo, cargó en el primero en una corrida y en el segundo en otra.
O sea que ni el correo ni su refutación aguantaban. El correo hoy no afirma nada sobre cuándo
carga el mapa. **La evidencia de quien corrige también se recuenta.**

---

## Antes de mandar cada uno

1. **Busca al prospecto en la lista de exclusión**, por correo y por dominio:
   `grep -i -E "<correo>|<dominio>" ventas/lista-exclusion.csv`
   Hoy no hay ninguna baja pedida, pero eso puede cambiar entre que lees esto y envías.
2. **Pégalo dentro del hilo del 24-sep**, respondiendo. No como correo nuevo.
3. **De a uno, desde tu correo.** Nada de envío masivo.

## Si alguien pide la baja

Sale de la lista el mismo día, se confirma en una línea y no se insiste. La regla completa está
en `ventas/LEEME-lista-exclusion.md`.

---

## Los dos que más prometen

- **hjmc.cl**: su botón "Contáctanos" apunta a `mailto:info@hjcm.cl`, con las letras cambiadas,
  y ese dominio no existe. Todo lo que escriban ahí se pierde. Es un favor, no una venta.
- **carvallo.cl**: el dominio sin `www` no resuelve en ningún servidor de nombres.

Los dos son problemas que le cuestan clientes hoy y no tienen nada que ver con la ley. Si
alguno de los 20 abre conversación, lo más probable es que sea uno de esos dos.
