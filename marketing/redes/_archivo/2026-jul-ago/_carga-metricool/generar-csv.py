#!/usr/bin/env python3
# Genera los CSV de carga masiva para Metricool.
# Formato de columnas segun la plantilla oficial: Text, Date, Time, Draft,
# banderas booleanas por red, y Picture Url 1..10.
import csv, os

BASE = os.path.expanduser(
    "~/Library/Mobile Documents/com~apple~CloudDocs/SPINDLELAB/marketing/redes/_carga-metricool"
)

NETWORKS = ["Facebook", "Twitter", "LinkedIn", "GBP", "Instagram",
            "Pinterest", "TikTok", "YouTube", "Threads", "Bluesky"]
PIC_COLS = [f"Picture Url {i}" for i in range(1, 11)]
HEADER = ["Text", "Date", "Time", "Draft"] + NETWORKS + PIC_COLS

# ---------------------------------------------------------------- copys

C_28JUL = """No existe forma de pagarle a OpenAI para que ChatGPT recomiende tu empresa.

Es el mito que más nos toca desarmar. La idea de que ahí hay un espacio publicitario, y que quien lo compra aparece en la respuesta.

ChatGPT, Gemini y Perplexity citan páginas que pueden leer y entender. No avisos.

Dos casos que revisamos este mes: un sitio respondía con error a cualquier lector automatizado, sin excepción. Otro no tenía ni una línea de descripción en la portada. Ninguno de los dos tenía un problema de contenido. Los dos tenían un problema técnico, puntual y arreglable.

El otro mito que suele venir pegado: "si mi sitio se ve bien, está bien". Se ve bien para una persona. Un motor de IA está leyendo otra cosa.

Si alguien te ofreció posicionarte en ChatGPT pagando, pídele que te explique dónde exactamente se compra ese espacio. La respuesta te va a ahorrar plata.

#SEO #IA #Chile"""

C_30JUL = """El error más caro al pedir cotizaciones de SEO no es elegir la más cara. Es comparar dos cosas que no son lo mismo.

Un diagnóstico puntual en Chile se mueve entre $200.000 y $2.500.000 CLP, según el tamaño del sitio. Un acompañamiento mensual va de $80.000 a $1.500.000 CLP, según la profundidad del trabajo.

Son preguntas distintas. Una te dice qué está fallando y por qué. La otra es alguien trabajando en tu sitio todos los meses.

Cuando llegan tres propuestas y una parece mucho más barata, casi siempre es porque está respondiendo la pregunta más chica.

Publicamos la guía completa con las referencias reales del mercado, incluyendo qué cambia cuando entra AEO/GEO. Va en el primer comentario.

#SEO #AEO #Chile"""

C_24JUL_IG = """Le preguntamos a ChatGPT por una asesora de inversiones en Chile. Recomendó tres. Las tres se parecían en algo: una página que un motor de IA puede leer sin problemas.

No es casualidad. Estos modelos no citan al que más gasta en marketing. Citan al que pueden entender.

Abre tu sitio y mira el título de la portada. ¿Dice a qué te dedicas, o solo el nombre de la empresa?

spindlelab.cl

#SEO #InteligenciaArtificial #InversionesChile #Chile"""

C_31JUL_IG = """Una auditoría SEO técnica en Chile cuesta entre $200.000 y $2.500.000 CLP. Un acompañamiento mensual, entre $80.000 y $1.500.000 CLP. Son preguntas distintas: diagnóstico puntual versus trabajo sostenido en el tiempo.

La guía completa: spindlelab.cl/blog/cuanto-cuesta-seo-tecnico-chile

#SEO #Chile #AEO"""

C_06AGO = """Tu sitio se ve impecable. Esto es lo que recibe ChatGPT cuando entra.

Un div vacío. Nada más.

Nos pasó revisando el sitio de una asesora financiera: moderno, rápido, impecable de mirar. Pero está construido como una aplicación de JavaScript, donde el contenido se arma recién en el navegador de la persona. Los rastreadores que alimentan a ChatGPT y Perplexity no ejecutan eso, así que reciben una página en blanco.

Toda la trayectoria, los premios, la prensa. Invisibles.

No es un problema de contenido. Es cómo está construido el sitio, y tiene arreglo.

¿Quieres ver el tuyo como lo ve un rastreador? Abre tu portada, clic derecho, "ver código fuente de la página". Si ahí no aparece tu texto, la IA tampoco lo está viendo.

#SEO #IA #Chile"""

C_11AGO = """Cinco cosas que puedes revisar hoy en tu propio sitio, sin saber nada técnico.

Son las mismas cinco, en el mismo orden, que miramos nosotros cuando revisamos un sitio para ver si la IA puede leerlo.

1. El título de la página. ¿Dice qué hace la empresa y dónde, o solo el nombre?
2. La descripción. ¿Existe, o está vacía o cortada a la mitad?
3. Los datos estructurados. ¿El sitio se identifica bien (clínica dental, asesora financiera) o de forma genérica?
4. El robots.txt. ¿Deja pasar a los rastreadores de IA, o los bloquea sin querer?
5. Las señales de entidad. ¿Hay forma de que un motor sepa que esta empresa es distinta de otra con nombre parecido?

Ninguna requiere rehacer el sitio. Todas definen si apareces cuando alguien pregunta por tu rubro.

El carrusel trae el "así no" y el "así sí" de cada una. Parte por la 4, que es la que más sorprende.

#SEO #AEO #Chile"""

C_13AGO = """¿Sabías que hay clínicas que le dicen a Google, literalmente, que son "una organización"?

Ni dental, ni médica, ni dónde quedan. Y así compiten por aparecer.

Los datos estructurados son la ficha que un sitio le entrega a los buscadores y a la IA para explicar qué es. Revisando clínicas este mes encontramos varias que sí la tienen, pero mal puesta: se declaran como "Organization" genérica en vez de "Dentist". Otras no incluyen el nombre de su fundadora, aunque toda la marca sea su nombre.

Para un motor que arma respuestas por categoría, esa diferencia decide si te incluye o no cuando alguien pregunta por clínicas dentales en su comuna.

Es un arreglo técnico chico con efecto grande.

Si tu sitio lo hizo una agencia, pregúntales qué tipo declara tu ficha. La respuesta te va a decir bastante.

#SEO #AEO #Chile"""

C_14AGO_IG = """¿Sabías que hay clínicas que le dicen a Google, literalmente, que son "una organización"?

Ni dental, ni médica, ni dónde quedan. Y así compiten por aparecer.

Los datos estructurados son la ficha que tu sitio le entrega a los buscadores y a la IA para explicar qué eres. Revisando clínicas este mes encontramos varias que la tienen mal puesta.

Para un motor que arma respuestas por categoría, esa diferencia decide si te incluye o no.

Si tu sitio lo hizo una agencia, pregúntales qué tipo declara tu ficha.

#SEO #InteligenciaArtificial #ChatGPT #Chile #ClinicaDental #AEO #MarketingDigital"""

C_18AGO = """Tu competencia no te gana por presupuesto. Te gana porque a ella sí la pueden leer.

Este mes revisamos más de 20 sitios de empresas chilenas, entre asesoras financieras y clínicas. Varios rankean bien en Google y son ilegibles para los motores de IA: bloqueados por su propio robots.txt, construidos como apps que llegan vacías, o sin señales para desambiguar quiénes son.

Google indexa páginas. La IA arma una respuesta y cita dos o tres fuentes que pueda entender con claridad. Estar en el primer juego no te mete en el segundo.

Búscate en Google y después hazle la misma pregunta a ChatGPT. Compara las dos respuestas. Esa distancia es la que estamos hablando.

#SEO #IA #Chile"""

C_20AGO = """Si tu reputación vive en la prensa y no en tu sitio, para la IA no es tuya.

Es uno de los patrones que más vimos este mes. Empresas con premios, entrevistas y un equipo reconocido, cuya credibilidad está publicada en Diario Financiero, Citywire o la prensa del rubro, pero cuyo sitio no menciona a las personas detrás ni enlaza nada de eso.

Para Google y para los motores de IA, esa autoridad existe en el aire, sin dueño verificable.

En finanzas y en salud, donde nadie contrata a ciegas, esa desconexión sale cara. Y se arregla conectando lo que ya construiste, no construyendo algo nuevo.

Cuenta cuántos enlaces hay en tu sitio a la prensa que te ha nombrado. Si la cuenta da cero, ahí tienes trabajo ya hecho que nadie te está atribuyendo.

#SEO #AEO #Chile"""

C_21AGO_IG = """Si tu reputación vive en la prensa y no en tu sitio, para la IA no es tuya.

Premios, entrevistas, un equipo reconocido. Si tu sitio no los menciona ni los enlaza, esa credibilidad existe en el aire, sin dueño verificable.

Para Google y para los motores de IA, no hay forma de atribuírtela.

Cuenta cuántos enlaces hay en tu sitio a la prensa que te ha nombrado. Si la cuenta da cero, ahí tienes trabajo ya hecho que nadie te está atribuyendo.

#SEO #InteligenciaArtificial #Chile #MarcaPersonal #AEO #MarketingDigital"""

C_25AGO = """Lo que arreglamos casi nunca es rehacer el sitio.

"¿Y esto cuánto cuesta?" es la pregunta que más nos hacen. La respuesta honesta es que depende de qué esté fallando, pero casi siempre son cuatro señales técnicas:

Un título que diga qué haces y dónde. Datos estructurados bien puestos. Desbloquear a los rastreadores de IA. Conectar tu autoridad con tu dominio.

Nada de eso es un rediseño. Como referencia de mercado, un diagnóstico técnico en Chile parte desde unos $200.000 y un acompañamiento mensual desde unos $80.000.

El mini-diagnóstico que te muestra en qué estado estás es gratis y llega en 48 horas. Pídelo, míralo, y decides después.

#SEO #Chile"""

C_27AGO = """Nadie puede garantizarte que vas a aparecer primero en ChatGPT. Quien te lo prometa, miente.

Cerramos el mes con la promesa que no te vamos a hacer.

Lo que sí se puede: que tu sitio sea legible, citable y esté bien identificado. Esa es la condición para siquiera entrar en la conversación. El resto lo decide el motor, con señales que se construyen, no que se compran.

Este mes mostramos, con casos reales, la diferencia entre lo que la IA ve y lo que no ve de un negocio: un robots.txt que bloqueaba a todos los rastreadores, sitios que llegan vacíos, clínicas declaradas como "una organización", reputación sin dueño verificable.

Si quieres saber de qué lado está el tuyo, el mini-diagnóstico es gratis.

#SEO #IA #Chile"""

C_28AGO_IG = """Nadie puede garantizarte que vas a aparecer primero en ChatGPT. Quien te lo prometa, miente.

Lo que sí se puede: que tu sitio sea legible, citable y esté bien identificado. Esa es la condición para siquiera entrar en la conversación.

El resto lo decide el motor, con señales que se construyen, no que se compran.

Cerramos agosto mostrando, con casos reales, la diferencia entre lo que la IA ve y lo que no ve de un negocio. Mini-diagnóstico gratis, link en bio.

#SEO #InteligenciaArtificial #ChatGPT #Chile #AEO #MarketingDigital"""

C_29JUL_P = """Un dueño de clínica mira las visitas de su sitio, ve que llevan meses bajando y concluye lo lógico: la web no me está trayendo pacientes, mejor pongo esa plata en publicidad.

Es una decisión razonable con la información que tiene. Y muchas veces es justo la contraria a la que le conviene.

Lo que cambió no es que la gente dejara de buscar. Es dónde termina la búsqueda. Alguien le pregunta a ChatGPT por una clínica en su comuna, recibe tres nombres con una línea sobre cada uno, y llama al que le hizo más sentido. Nunca entró a ninguno de los tres sitios.

Ese paciente no aparece en Analytics. Pero la frase que lo convenció salió de una página web. La diferencia es que la leyó una máquina, no él.

Ahí está lo incómodo: tu sitio puede estar decidiendo más que nunca quién te elige, justo mientras sus números de visitas te dicen que ya no importa. Y si tomas la decisión mirando solo el tráfico, terminas recortando en lo único que la IA lee de ti.

El sitio dejó de ser un folleto y pasó a ser la fuente. Eso cambia qué hay que arreglar. Casi nunca es rediseñar. Es ordenar lo que ya está escrito para que una máquina pueda entenderlo, atribuírtelo y citarlo cuando alguien pregunta por tu rubro.

De esto me dedico en SpindleLab. Antes de que hablemos de nada, hazte el favor de preguntarle hoy a ChatGPT por tu rubro en tu comuna y fíjate quién aparece. Si no eres tú, ahí tienes la respuesta que Analytics no te estaba dando.

#SEO #IA #AEO #Chile"""

C_05AGO_P = """Hay empresas chilenas con 30 años de trayectoria que, para ChatGPT, casi no existen.

No es una frase de efecto. Este mes estuve revisando sitios de asesoras financieras y clínicas, y el patrón se repite: reputación enorme construida offline, y un sitio que los motores de IA no logran leer bien. Cuando un cliente investiga preguntándole a la IA, esa trayectoria no aparece en la respuesta.

Lo interesante es que casi nunca es falta de contenido. Es la capa técnica: cómo está construido el sitio, qué le deja leer a los buscadores, qué señales da de quién es.

En SpindleLab me dedico a cerrar esa brecha. Si tienes la duda de qué ve la IA cuando le preguntan por tu empresa, lo reviso y te lo muestro. spindlelab.cl"""

C_12AGO_P = """Encontré algo casi cómico revisando empresas chilenas: varias tienen un problema de identidad frente a la IA.

Le preguntas a ChatGPT por ellas y responde con otra cosa que se llama igual. Una asesora financiera que comparte nombre con una farmacéutica que cotiza en el Nasdaq. Una boutique de inversiones que comparte nombre con un software de simulación. La IA, sin señales claras, elige al más famoso, y no eres tú.

Se arregla dándole al sitio las señales que le dicen a un motor "esta empresa es esta, no aquella". Es técnico y es concreto.

En SpindleLab reviso justo este tipo de cosas. Si tienes un nombre que se presta a confusión, quizás la IA te esté confundiendo ahora mismo."""

C_19AGO_P = """Un mes revisando sitios chilenos me dejó una conclusión clara: la mayoría de las empresas que miré tienen un problema de visibilidad frente a la IA, y en casi todos los casos es técnico y arreglable, no de fondo.

Eso me gusta, porque significa que quien lo ordena ahora toma ventaja mientras el espacio todavía está abierto. No es magia ni promesas de aparecer primero. Es hacer legible lo que ya existe.

Si te interesa saber en qué punto está tu empresa, lo reviso sin costo. Sin apuro y sin venta."""

C_26AGO_P = """Cierro agosto con una idea que se me hizo más clara revisando sitios todo el mes: la visibilidad en IA no se trata de gritar más fuerte, sino de ser entendible.

Las empresas que van a ganar este espacio no son las que más gastan. Son las que ordenan su sitio para que una máquina pueda leerlo, entenderlo y citarlo. Es menos glamoroso que una campaña, y mucho más decisivo.

Si en algún momento quieres una lectura honesta de cómo está tu empresa frente a la IA, esa puerta está abierta. spindlelab.cl"""

# ------------------------------------------------- filas (marca EMPRESA)
# (texto, fecha, hora, linkedin, instagram, [archivos de pieza])
EMPRESA = [
    (C_24JUL_IG, "2026-07-24", "19:00:00", False, True,  ["01-24jul-ig.png"]),
    (C_28JUL,    "2026-07-28", "09:00:00", True,  False, []),
    (C_30JUL,    "2026-07-30", "09:00:00", True,  False, []),
    (C_31JUL_IG, "2026-07-31", "19:00:00", False, True,  ["02-31jul-ig.png"]),
    (C_06AGO,    "2026-08-06", "09:00:00", True,  False, ["03-06ago.png"]),
    (C_11AGO,    "2026-08-11", "19:00:00", False, True,
     [f"04-11ago-carrusel-{i}.png" for i in range(1, 8)]),
    (C_13AGO,    "2026-08-13", "09:00:00", True,  False, ["05-13ago.png"]),
    (C_14AGO_IG, "2026-08-14", "19:00:00", False, True,  ["05-13ago.png"]),
    (C_18AGO,    "2026-08-18", "09:00:00", True,  False, ["06-18ago.png"]),
    (C_20AGO,    "2026-08-20", "09:00:00", True,  False, ["07-20ago.png"]),
    (C_21AGO_IG, "2026-08-21", "19:00:00", False, True,  ["07-20ago.png"]),
    (C_25AGO,    "2026-08-25", "09:00:00", True,  False, ["08-25ago.png"]),
    (C_27AGO,    "2026-08-27", "09:00:00", True,  False, ["09-27ago.png"]),
    (C_28AGO_IG, "2026-08-28", "19:00:00", False, True,  ["09-27ago.png"]),
]

PERSONAL = [
    (C_29JUL_P, "2026-07-29", "12:30:00"),
    (C_05AGO_P, "2026-08-05", "12:30:00"),
    (C_12AGO_P, "2026-08-12", "12:30:00"),
    (C_19AGO_P, "2026-08-19", "12:30:00"),
    (C_26AGO_P, "2026-08-26", "12:30:00"),
]


# Enlaces públicos de Google Drive (carpeta "SpindleLab redes jul-ago", 24 jul 2026).
# Metricool exige que la URL termine en view?usp=sharing.
DRIVE = {
    "01-24jul-ig.png":         "18iSMMK7TcELPaxskkl6aw7zkpZTHRn4-",
    "02-31jul-ig.png":         "1OuV6YDBmU_QHYLlMdkCti2iwhEHkBY8Q",
    "03-06ago.png":            "1kEVCCseEf0OPIXR7Dgwi2lqDlHQz8zLO",
    "04-11ago-carrusel-1.png": "18Co8BIlKTJO7PhupO6kof5rXoSvytDND",
    "04-11ago-carrusel-2.png": "1G55NBupPojbpOCJmlcEMRfsco7EfWWAQ",
    "04-11ago-carrusel-3.png": "1YoeM6M8MzJHnU1EoBwMBincmt404TY24",
    "04-11ago-carrusel-4.png": "1a8DS_ldNb07AkStnkGpg8foFQgSllycS",
    "04-11ago-carrusel-5.png": "11zwtLo1i7nrHygNG0mEJ1oyUH1ZF1bgZ",
    "04-11ago-carrusel-6.png": "1OsE2OnP-yJeIV1RDM_BP-rYfbnChfLzb",
    "04-11ago-carrusel-7.png": "1DiLd6ZLvKbYHMn36MdXaYiLGN8yi85LN",
    "05-13ago.png":            "1_1hrCGr8tBE0AfA5_tH-uwnLlohZcJAC",
    "06-18ago.png":            "1VKu0ljTPvbQpOP0gfuYED8rm8IJX9IZY",
    "07-20ago.png":            "19LuzB2NXSVxbjb6qkjp3Eytv_usokSk_",
    "08-25ago.png":            "1Cog-KNCq1nC2O1S3iHK8rGVQEgJfeQ3v",
    "09-27ago.png":            "1qbbtcoxGA9XgASdGPhlp28gyk08H14FP",
}


def enlace(nombre):
    return f"https://drive.google.com/file/d/{DRIVE[nombre]}/view?usp=sharing"


def row(text, date, time, linkedin, instagram, pics):
    r = {c: "" for c in HEADER}
    r["Text"], r["Date"], r["Time"], r["Draft"] = text, date, time, "FALSE"
    for n in NETWORKS:
        r[n] = "FALSE"
    if linkedin:
        r["LinkedIn"] = "TRUE"
    if instagram:
        r["Instagram"] = "TRUE"
    for i, f in enumerate(pics[:10]):
        r[f"Picture Url {i+1}"] = enlace(f)
    return [r[c] for c in HEADER]


for name, rows in (("carga-metricool-empresa.csv",
                    [row(*e) for e in EMPRESA]),
                   ("carga-metricool-personal.csv",
                    [row(t, d, h, True, False, []) for t, d, h in PERSONAL])):
    path = os.path.join(BASE, name)
    with open(path, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh, quoting=csv.QUOTE_ALL)
        w.writerow(HEADER)
        w.writerows(rows)
    print(f"{name}: {len(rows)} filas")
