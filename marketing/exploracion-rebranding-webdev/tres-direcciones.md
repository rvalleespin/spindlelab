# Tres direcciones visuales para el sitio nuevo — elige una

**Rama:** `claude/rebranding-webdev-exploracion` · **27-sep-2026** · `main` sin tocar.
Encargo nuevo de Ramón: diseño web pasa a ser el pilar del negocio, el sitio es el
portafolio, el efecto wow importa, y hay giro de color.

---

## Lo primero: la referencia no es lo que parecía

Fui a mirar **driftime.com** en vez de confiar en la memoria. Es **lienzo claro y
dominado por fotografía**. Lo que produce el wow, textual del análisis: *«imagen de gran
formato con texto mínimo encima»*, *«el portafolio funcionando como prueba de
capacidad»*, *«el wow reside en la contención visual, no en la decoración»*.

El brief original pedía lo contrario: fondo oscuro, **sin imágenes**, solo tipografía.
Eso conserva el ritmo de Driftime y tira a la basura lo que de verdad la hace funcionar.
Y hay un antecedente documentado de por qué es mala idea: colapsar una referencia basada
en imagen a puro texto es uno de los modos de falla típicos del diseño generado por IA.
El fondo oscuro por defecto es otro.

Tres cosas más apuntan al mismo lado:

- **Tu propio manual §04** ya define un sistema dominado por claro: papel/blanco ~70 %,
  tinta ~25 %, dorado 1-2 %. El sitio actual es oscuro-dominante, o sea que hoy **el
  sitio contradice el manual**. Ir a claro no es alejarse de la marca: es volver a ella.
- **Tu voz es «No te prometo. Te muestro.»** Un sitio que vende diseño web tiene que
  mostrar sitios web.
- **El negocio:** si el pilar es diseño, el sitio deja de ser folleto y pasa a ser la
  demo. Quien te evalúa para hacerle una web, juzga tu web.

---

## El bloqueador que hay que resolver sí o sí

Un sitio-portafolio necesita portafolio. Hoy hay **una sola obra terminada**:

| Proyecto | Estado | ¿Se puede mostrar? |
|---|---|---|
| **Bernardo Combeau** (bernardocombeau.cl) | Entregado, aprobado, pagado 100 %, más una ampliación de $120.000 | ⛔ **No todavía.** `proyectos-en-curso.md`: *«Sigue pendiente pedir permiso de caso público — no se ha pedido todavía»* |
| **Módulo 369** (María Loreto) | Arranca 6-oct, primera maqueta en la reunión de inicio | ⛔ No existe aún |

**La acción de mayor impacto no es el rediseño: es pedirle el permiso a Bernardo.** El
documento mismo dice que el momento es bueno (saldo en cero, cliente contento, volvió a
contratar). Sin ese permiso, las direcciones A y C se quedan sin material y quedan en
maqueta. **No le escribí a nadie**, eso lo decides y lo haces tú.

En las maquetas usé su sitio real capturado, porque grises de relleno no permiten juzgar
nada. Es uso **interno**, en una rama que no se publica.

> Aparte: la captura tiró error de certificado, pero era el proxy de mi entorno, no su
> sitio. Verificado: `example.com` falla igual acá, y el certificado real de
> bernardocombeau.cl es un Let's Encrypt válido. **Su sitio está bien.**

---

## Las tres direcciones

Cada una es una apuesta distinta, no tres versiones de la misma. No las promedié a un
punto medio seguro, que es la otra forma típica de arruinar una investigación de
referencias.

### A · «Papel» — el trabajo manda
`/v2/a/` · `renders/10-direccion-A-papel.png`

Lienzo papel, tipografía tinta, y el trabajo a sangre ocupando la pantalla. Copy corto:
el texto presenta y se aparta. Es la lectura fiel de Driftime más un detalle de Colin
Morella (una sola pieza a sangre en vez de grilla de miniaturas).

- **Gana:** es lo que hacen los estudios que venden diseño, y funciona. Cumple tu manual §04.
- **Pierde:** depende por completo de tener obra que mostrar. Hoy tienes una.
- **Riesgo:** con un solo proyecto, un portafolio se ve flaco.

### B · «Instrumento» — el sitio hace algo delante tuyo
`/v2/b/` · `renders/11-direccion-B-instrumento.png`

El wow no es pictórico, es funcional: la portada **es** la herramienta. Titular «No te
prometo. Te muestro.», y debajo el chequeo real, con el dominio y la salida en
monoespaciada. El panel se muestra en su **estado vacío**, esperando dominio: no inventé
resultados de ejemplo, porque una prueba falsa en la portada de quien vende auditorías es
exactamente lo que tu manual prohíbe.

- **Gana:** es la única que **no necesita permiso de nadie** y se puede construir ya. Es
  la más difícil de copiar: los demás muestran fotos, este trabaja. Y es coherente con
  vender SEO técnico.
- **Pierde:** no luce el oficio de diseño. Si el pilar es diseño web, esta dirección
  argumenta por el otro pilar.
- **A revisar:** «No te prometo. Te muestro.» está en **singular**, y tu §07 reserva el
  singular para lo observacional y usa plural para lo que entrega la empresa. La dejé
  literal porque es la frase de la casa, pero conviene que la decidas.

### C · «Galería» — cada proyecto como objeto
`/v2/c/` · `renders/12-direccion-C-galeria.png`

Lock principal: Cardan Made (lienzo saturado que convierte cada pieza en objeto de
galería), estructura de revista de Beans Agency. Paspartú de papel, márgenes anchos, la
pieza enmarcada.

**Acá está el giro de color que pediste, y es concreto:** el lienzo **no** es el negro
del sitio de hoy. Es **negro cálido `#14110E`** en vez del azulado `#0E141B`. Sobre un
negro frío el dorado de marca tira a mostaza; sobre este lee como dorado. En el render de
C se ve la comparación por accidente: la franja azulada de abajo es el negro actual.

- **Gana:** es la más memorable y la que más se aleja del sitio de todos los demás.
- **Pierde:** es oscura, y oscuro-por-defecto es el tic más reconocible del diseño
  generado. Acá está justificado (galería), pero hay que sostenerlo.
- **Ojo:** `#14110E` **no está en el manual**. Es una extensión propuesta que tendrías
  que aprobar. Contraste verificado: papel 17,3:1 y dorado 7,8:1 sobre ese fondo.

---

## Lo que se corrigió de la versión anterior

- **El punto del wordmark volvió a dorado.** La maqueta anterior lo apagaba a gris para
  gastar el dorado en el titular. El manual §02 es explícito: el punto final es SIEMPRE
  dorado, y está *«prohibido: punto de otro color o apagado»*. Además, recolorear un
  carácter suelto solo para dar «gusto» es un tic reconocible de diseño generado.
- **La costura del lienzo.** El fondo estaba declarado en `html` y en `body` a la vez, y
  el `html` gana: las páginas claras quedaban con una franja azulada asomando abajo.
  Ahora se declara solo en `body`.
- **Huérfanas tipográficas** en los titulares de A y B, corregidas.
- **Las tres pasan sin desborde horizontal a 390 px** (`scrollWidth == clientWidth`).

---

## Lo que sigue pendiente y no lo toca este cambio

Los precios quedan **exactamente como están**. Y los dos problemas de la **oferta** siguen
abiertos, porque son de estructura comercial y no se arreglan con diseño:

1. Acompañamiento Mensual a $590.000/mes contra tu propio precedente de $50.000/mes.
2. La vigilancia de menciones en IA, que `capacidad-servicios.md` marca ❌ porque no
   escala más allá de 1-2 clientes.

---

## Lo que necesito de ti

1. **Cuál de las tres**, o qué cruce (B tiene el mejor argumento comercial, A y C el mejor
   argumento de oficio; una portada puede abrir con A y meter el instrumento de B más abajo).
2. **¿Pides el permiso a Bernardo?** Sin eso, A y C no pasan de maqueta.
3. **¿Apruebas `#14110E`** como extensión de paleta, si eliges C?

Con eso construyo la home completa en la dirección elegida. **Nada se mergea ni se publica
sin que lo digas.**
