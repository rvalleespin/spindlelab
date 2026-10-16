"""Arma medicion.json: el resumen por tema (cada valor con su página, ancho y selector) y, al final, la
medición cruda de cada página y ancho, más interacción, movimiento, contenido, librerías, contraste y
área de color. Uso: python3 -I armar-medicion.py <carpeta-temporal> <salida.json>
La carpeta temporal es la que llenan medir.mjs (json/), interaccion.mjs, movimiento.mjs, contenido.mjs,
librerias.mjs, contraste.py y area-color.py."""
import sys, json, os
T, OUT = sys.argv[1], sys.argv[2]
L = lambda n: json.load(open(os.path.join(T, n)))
crudo = {k[:-5]: L('json/' + k) for k in sorted(os.listdir(os.path.join(T, 'json')))}
inter, mov, cont, libs, contr, area = L('interaccion.json'), L('movimiento.json'), L('contenido.json'), L('librerias.json'), L('contraste.json'), L('area-color.json')
hoja = L('hoja-transiciones.json')

def nodo(pag, ancho, pred):
    d = crudo[f'{pag}-{ancho}']
    for t in d['textos']:
        if pred(t):
            return {'pagina': pag, 'ancho': ancho, 'selector': t['sel'], 'texto': t['texto'][:60], 'familia': t['familia'].split(',')[0].strip('"'), 'tam': t['tam'], 'interlinea': t['interlinea'], 'tracking': t['tracking'], 'peso': t['peso'], 'caja': t['caja'], 'color': t['color'], 'fondo': t['fondo']['color']}
    return None

roles = []
def rol(nombre, pag, pred, nota=''):
    roles.append({'rol': nombre, '1440': nodo(pag, 1440, pred), '390': nodo(pag, 390, pred), 'nota': nota})
rol('Display de contenido', 'trabajo', lambda t: t['tag'] == 'h1', 'NO HAY display: el texto de contenido más grande del sitio es el h1 de página, 35 px. Lo único grande es el reloj de inactividad (180 px, ver interaccion.relojInactividad).')
rol('Bajada de página (misma línea que el h1, en gris)', 'trabajo', lambda t: 'page-title' in t['sel'] and 'text-grey' in t['sel'])
rol('Título de caso + bajada (ambos en negro)', 'caso', lambda t: t['tag'] == 'h1')
rol('Bajada del caso', 'caso', lambda t: 'case-study-title' in t['sel'] and t['tag'] != 'h1')
rol('Título de sección (h2)', 'home', lambda t: 'page-section-title' in t['sel'])
rol('Título de tarjeta en la home', 'home', lambda t: 'cms-card-title-text' in t['sel'] and t['color'] == '#000000')
rol('Título de tarjeta en el índice', 'trabajo', lambda t: 'cms-card-title-text' in t['sel'] and t['tag'] == 'h3')
rol('Bajada de tarjeta en el índice (gris, mismo tamaño)', 'trabajo', lambda t: 'headline' in t['sel'])
rol('Cuerpo (texto del caso, dentro de Read More)', 'caso', lambda t: 'case-study-rich-text' in t['sel'] and t['tag'] == 'p' and len(t['texto']) > 30, 'Medido con el pliegue cerrado (opacidad 0); mismo estilo abierto (capturas/caso-texto-abierto-1440-*.jpg).')
rol('Subtítulo dentro del cuerpo (strong)', 'caso', lambda t: t['tag'] == 'strong', 'Único uso del peso 700 en todo el sitio.')
rol('Cuerpo en tema oscuro (estudio)', 'estudio', lambda t: t['tag'] in ('li', 'p') and 'quote' not in t['sel'] and t['tam'] == '17px')
rol('Navegación de cabecera', 'home', lambda t: 'header-nav-link-text' in t['sel'], 'A 390 no está a la vista: va en el menú (35/48 y 20/24, ver interaccion.menu390).')
rol('Botón (texto)', 'caso', lambda t: 'button-text-1' in t['sel'])
rol('Etiqueta de pilar', 'trabajo', lambda t: 'tag-text' in t['sel'])
rol('Texto secundario (descripción EVA, manifiesto del pie)', 'home', lambda t: t['tam'] == '14px' and t['interlinea'] == '24px')
rol('Enlaces grandes del pie', 'home', lambda t: 'h5' in t['sel'] and 'text-grey' in t['sel'])
rol('Legal del pie', 'home', lambda t: 'footer-legals' in t['sel'] and t['color'] == '#000000')
rol('Acreditaciones del pie', 'home', lambda t: 'footer-accreditation' in t['sel'])
rol('Reloj de cabecera y pie', 'home', lambda t: 'header-and-footer-clock-text' in t['sel'])
rol('Texto del cursor propio', 'home', lambda t: 'custom-cursor-text' in t['sel'])

M = {
 'fecha': '2026-10-16',
 'medidoPor': 'Lucía (dirección de arte web), obra E12 del sitio SpindleLab v3',
 'sitio': 'https://acceptandproceed.com/ (redirige a www.acceptandproceed.com)',
 'medidoCon': 'Chromium 141.0.7390.37 headless (Playwright 1.63.0 de spindlelab-astro), proxy de la sesión con verificación TLS; sin desafío anti-robots ni aviso de cookies',
 'metodo': 'Cada página se carga a 1440×900 (dpr 1) y a 390×844 (dpr 2, agente de iPhone, táctil). Se espera document.fonts.ready, se baja entera en pasos de 0,6 pantallas (dispara los IntersectionObserver de .placeholder_wrap y las imágenes diferidas), se esperan las imágenes, se vuelve arriba y se lee getComputedStyle de cada nodo con texto propio, de las grillas, contenedores, bordes, medios, fondos y enlaces (herramientas/medir.mjs). Hover, cursor, menú y reloj con el mouse real de Playwright (interaccion.mjs). Movimiento con getAnimations(), muestreo por cuadro (requestAnimationFrame) y cuadros de pantalla con su tiempo, normal y con prefers-reduced-motion: reduce (movimiento.mjs). Transiciones declaradas, leídas de la hoja compartida de Webflow descargada (transiciones-hoja.py). Letras: tabla name y métricas de los archivos servidos (leer-fuente.py, solo lectura). Contraste WCAG 2.x componiendo el alfa sobre el fondo (contraste.py). Área de color: cada píxel de la captura completa asignado al color de la paleta más cercano (area-color.py).',
 'limitaciones': [
  'Los videos son iframes de Vimeo en modo fondo (background=1, autoplay, loop, muted). El Chromium de Playwright no trae H.264 (canPlayType avc1 = "", MediaSource avc1 = false) y el reproductor muestra «Player error». En las capturas se ocultan esos iframes y se ve el póster que el propio sitio pone debajo (la miniatura del mismo video). El póster del hero de la home es un JPEG blanco puro (media RGB 255,255,255): la primera pantalla de la home sale en blanco en la captura; capturas/home-hero-fotograma-vimeo.jpg es la miniatura oficial de ese video según el oEmbed público de Vimeo («AP Nike Additional Layer», 97 s, 1440×810, subido el 2026-09-07).',
  'Al fallar, los iframes de Vimeo toman el foco y desplazan la página (medido: /work saltaba solo a scrollY 4643, activeElement = IFRAME). Es efecto del error, no necesariamente del sitio con el video andando. En interaccion.mjs y movimiento.mjs se bloquean (route abort) y se ocultan; medir.mjs vuelve arriba con scrollTo antes de leer.',
  'Los cuadros de carga se toman con capturas sucesivas; cada captura demora ~100-250 ms, así que los tiempos son aproximados (cada cuadro lleva el performance.now() real del momento).',
  'El reloj muestra la hora local del visitante (new Date()); el contenedor está en UTC, por eso las capturas dicen 17:xx a las 14:xx de Chile.',
 ],
 'paginas': {
  'home': {'url': 'https://acceptandproceed.com/', 'por': 'logo «Accept & Proceed»', 'alto1440': crudo['home-1440']['alto'], 'alto390': crudo['home-390']['alto'], 'pantallas1440': round(crudo['home-1440']['alto'] / 900, 1), 'h1': 0, 'palabras': crudo['home-1440']['palabrasMain']},
  'trabajo': {'url': 'https://acceptandproceed.com/work', 'por': 'Work (navegación)', 'alto1440': crudo['trabajo-1440']['alto'], 'alto390': crudo['trabajo-390']['alto'], 'pantallas1440': round(crudo['trabajo-1440']['alto'] / 900, 1), 'proyectos': len(cont['indice']), 'palabras': crudo['trabajo-1440']['palabrasMain']},
  'caso': {'url': 'https://acceptandproceed.com/work/ibm-watsonx-orchestrate', 'por': 'Work → segundo del índice. Se eligió IBM watsonx Orchestrate y no Vans (el primero) porque es el caso B2B de tecnología e IA, el más cercano a la parte «Logic» de SpindleLab; los 20 casos usan la misma plantilla (medido: mismas secciones case-study-s1 a s5 y el mismo bloque Impact en los 20, ver contenido.impactEnLos20Casos).', 'alto1440': crudo['caso-1440']['alto'], 'alto390': crudo['caso-390']['alto'], 'pantallas1440': round(crudo['caso-1440']['alto'] / 900, 1), 'palabras': crudo['caso-1440']['palabrasMain']},
  'estudio': {'url': 'https://acceptandproceed.com/about', 'por': 'About (navegación)', 'alto1440': crudo['estudio-1440']['alto'], 'alto390': crudo['estudio-390']['alto'], 'tema': 'oscuro (body.body-dark): la única página oscura de las cuatro', 'palabras': crudo['estudio-1440']['palabrasMain']},
 },
 'tipografia': {
  'familias': {
   'Messina Sans': {'archivos': 'OTF servidos desde cdn.prod.website-files.com (Webflow), @font-face con font-display: swap', 'pesosDeclarados': ['300', '300 itálica', '400', '400 itálica', '700', '700 itálica'], 'pesosUsados': {'400': 'todo el sitio', '700': 'solo los cuatro <strong> del texto del caso (The Context, The Approach, The Design, The Impact)'}, 'fundicion': 'Luzi Type (Suiza)', 'disenador': 'Luzi Gantenbein', 'anio': 2015, 'version': '1.000', 'licencia': 'Comercial. Tabla name 13: una licencia por dominio, web solo por @font-face autoalojado, prohíbe convertir y modificar.', 'metricas': {'alturaMayuscula_em': 0.75, 'alturaX_em': 0.542}, 'seUsa': False},
   'Letterform Variations 04 DM': {'archivo': 'TTF de 643 KB (cdn.prod.website-files.com)', 'disenador': 'Nigel Cottier (process-pattern.com), 2020', 'variable': 'eje wdth 100-200; el sitio lo usa a font-variation-settings "wdth" 130', 'rol': 'solo los relojes: HH:MM de 33,67 px en el pie (a 1440) y HH:MM:SS de 180 px en el salvapantallas de inactividad. Glifos modulares de puntos y conectores', 'credito': '«Clock by Nigel Cottier, Site made by ON.» en el pie', 'seUsa': False},
   'webflow-icons': {'rol': 'fuente de íconos de Webflow, declarada; ningún nodo con texto la usa'},
   'monoespaciada': 'NO HAY. Cero nodos en mono en las cuatro páginas y los dos anchos.',
   'serif': 'NO HAY.',
  },
  'porRol': roles,
  'loQueImporta': [
   'Una sola familia y un solo peso (Messina Sans 400) para todo el contenido. El 700 aparece 4 veces, escondido en el pliegue del caso.',
   'Escala corta y chica: 35 · 24 · 20 · 17 · 14 · 10 · 7,5 px a 1440. El h1 de página mide 35 px; la home no tiene h1.',
   'Tracking −0,01 em en todos los textos de lectura (−0,35 px a 35, −0,17 px a 17); botones y etiquetas en normal.',
   'Caja de oración en el 100 % de los nodos: cero text-transform, cero mayúsculas de estilo.',
   'La jerarquía la hace el color dentro de la misma línea (título negro + bajada gris del mismo tamaño: «Work / We expand what is possible…», «Vans / Building rules…») y la posición en la retícula (todos los títulos de página empiezan en la columna 5), no el tamaño.',
   'A 390 casi no cambia: el h1 sigue en 35 px; baja la bajada de 35 a 24, la tarjeta de la home de 20 a 17, la etiqueta de 14 a 10 y el botón de 17 a 14.',
  ],
 },
 'color': {
  'variablesRoot': crudo['home-1440']['vars'],
  'usos': [
   {'color': '#f9f7f3 (--primary)', 'rol': 'lienzo de home, índice y caso; texto del tema oscuro', 'donde': 'body.body-light', 'area1440': {'home': area['home-1440']['papel #f9f7f3'], 'trabajo': area['trabajo-1440']['papel #f9f7f3'], 'caso': area['caso-1440']['papel #f9f7f3']}},
   {'color': '#000000 (--secondary)', 'rol': 'todo el texto principal, filetes de la tabla EVA, ícono del menú', 'donde': 'h1, h2, h3, p, .black-h-line', 'area1440': {'home': area['home-1440']['negro #000000'], 'trabajo': area['trabajo-1440']['negro #000000'], 'caso': area['caso-1440']['negro #000000']}},
   {'color': '#8c8c8c con alfa 0,8 (--mid-grey-80) = #a2a1a0 sobre papel', 'rol': 'bajadas (17 a 35 px), texto y borde de etiquetas, enlaces del pie, cuerpo del tema oscuro', 'donde': '.text-grey, .tag, .headline'},
   {'color': '#ecebe7 (--grey-1)', 'rol': 'pie; botón en reposo; pastilla del enlace activo y en hover (≥1440); botón del menú; primer tono de los bloques de carga', 'donde': '.footer-inner-wrap, .button, .header-nav-link.w--current, .placeholder_wrap::before', 'area1440': {'home': area['home-1440']['gris-1 #ecebe7 (pie)'], 'trabajo': area['trabajo-1440']['gris-1 #ecebe7 (pie)'], 'caso': area['caso-1440']['gris-1 #ecebe7 (pie)']}},
   {'color': '#E9E8E6 y #F1EFEC', 'rol': 'tonos de los bloques de carga .fifty-percent y .twenty-five-percent («50 % y 25 % de grey-1», comentario en el CSS en línea)', 'donde': '.placeholder_wrap.fifty-percent::before, .twenty-five-percent::before'},
   {'color': '#ffffff', 'rol': 'banda «Endless Vital Activity» de la home (1440×832); texto sobre la tarjeta grande; texto del cursor', 'donde': '.home-s4.eva-animated-background', 'area1440': {'home': '14,5 % por el bloque (28,0 % de píxeles blancos contando el póster blanco del hero)'}},
   {'color': '#151515 (--body-background-dark-theme) y #262626 (--footer-background-dark-theme)', 'rol': 'tema oscuro de About: lienzo y pie', 'donde': 'body.body-dark, .footer-inner-wrap.dark-theme', 'area1440': {'estudio': f"{area['estudio-1440']['tarjeta de tema oscuro #151515']} % y {area['estudio-1440']['pie oscuro #262626']} %"}},
   {'color': 'rgba(23,23,23,0.2) + backdrop-filter blur(5px)', 'rol': 'el cursor propio (vidrio esmerilado gris)', 'donde': '.custom-cursor'},
   {'color': 'rgba(249,247,243,0.8) + backdrop-filter blur(15px)', 'rol': 'cabecera fija, menú abierto a 390, salvapantallas del reloj', 'donde': '.header-bg + .header, .clock-overlay'},
  ],
  'acento': 'NINGUNO. No hay un solo elemento de interfaz con color saturado. Todo el color sale de las imágenes y videos: ' + ', '.join(f"{k} {v['de eso, color saturado (S>0,25)']} %" for k, v in area.items() if k.endswith('1440')) + ' del área de la página a 1440 es píxel saturado (S > 0,25), y todo cae dentro de imágenes.',
  'areaPorPagina': area,
  'estados': {
   'enlaceCabecera_1440': 'reposo transparente; hover y actual: pastilla #ecebe7 de 100×40, radio 100 px, transición background-color .2s (solo desde 1440: @media min-width 1440)',
   'enlaceCabecera_menor1440': 'hover a color --mid-grey, que vale black: no cambia nada a la vista',
   'boton': 'reposo #ecebe7 con texto negro, 140×40, radio 20 px; hover filter: invert(1) en .2s (queda casi negro #131418 con texto blanco)',
   'tarjeta': 'hover: la imagen escala 1,03 dentro de su caja recortada (transform .3s ease-out); el título no cambia; el cursor pasa a pastilla «View Project»',
   'enlacesDeTexto': 'color a --mid-grey (negro) o a #8c8c8c en .2s',
   'botonMenu': 'hover filter: invert()',
   'medido': inter.get('enlaceCabecera'), 'botonMedido': inter.get('boton'), 'tarjetaMedida': inter.get('tarjetaHover'),
  },
  'contraste': contr,
 },
 'reticula': {
  '1440': {'columnas': 8, 'anchoColumna': '148px', 'gutter': '24px', 'margenLateral': '44px', 'anchoContenido': '1352px', 'selector': 'div.container.main-grid (padding 0 44px) y div.cms-collection-list.main-grid', 'pagina': 'home, trabajo, caso, estudio'},
  '390': {'columnas': 6, 'anchoColumna': '46.33px', 'gutter': '16px', 'margenLateral': '16px', 'anchoContenido': '358px', 'selector': 'mismos'},
  'porAncho': inter.get('cabeceraPorAncho'),
  'maximoDeAncho': 'div.container.header-container: max-width 1920px; desde 1920 la grilla pasa a 12 columnas de 130 px, gutter 24, margen 48. No hay un contenedor estrecho: el contenido llena los 1352 px.',
  'columna5': 'Todo título e introducción de página arranca en la columna 5 (x = 732 a 1440): h1 «Work» y «About», título del caso, botón Read More, manifiesto y reloj del pie. Las columnas 1-4 de la primera pantalla quedan vacías (salvo el botón de vista del caso, 40 px). La navegación cae en el mismo eje (pastillas de 100 px desde x = 703; el texto en x ≈ 733).',
  'indiceDeTrabajo': {
   'tipo': 'NI BENTO NI LISTA: pares de tarjetas por fila, alineadas arriba, con columnas vacías entre ellas; sin bordes, sin sombras, sin fondo de tarjeta',
   'patron1440': 'se repite cada 3 filas: [col 1-2 | col 5-8], [col 1-4 | col 6-8], [col 1-3 | col 4-7]. Una tarjeta chica (2 col, 320 px) abre cada ciclo',
   'filas': [{'y': e['y'], 'x': e['x'], 'w': e['w'], 'h': e['h']} for e in crudo['trabajo-1440']['enlaces'] if 'cms-card-link' in e['sel']],
   'separacionFilas': 'row-gap 149px (div.cms-collection-list.main-grid); a 390, 56px',
   'proporciones': '16:9 (1,778) en 12 de 20 y 3:2 (1,5) en 6; dos sueltas de 1,677 y 1,518. Radio 8 px (--image-border-radius). object-fit cover',
   'pieDeTarjeta': 'título (17/24 negro) + bajada (17/24 gris) + etiquetas de pilar con pictograma',
   '390': 'una columna de 358 px, mismas proporciones, 56 px entre tarjetas',
   'home': 'Featured Projects (6): [col 1-4 | col 6-8], [col 1-8 a todo el ancho, con título y bajada en blanco encima de la imagen], [col 2-7 centrada], [col 1-3 | col 5-8] (CSS en línea: .cms-collection-list-item:nth-child(6n+…))',
  },
  'caso': {
   'hero': 'imagen a sangre 1440×960 (3:2), radio 0, desde y = 0 bajo la cabecera translúcida. A 390 es OTRA imagen, vertical (0,916), 429×468: dirección de arte por ancho',
   'introduccion': 'título + bajada (35/42 negro), etiqueta y botón Read More en la columna 5-8; texto completo plegado',
   'bloques': '13 bloques de imagen o video en 12 filas, una sola columna de composición variable. Anchos medidos (en columnas de 8): 8, 8, 6 centrado, 5 a la derecha, 5 a la izquierda, 8, 4 + 2, 6 centrado, a sangre (1440 px, radio 0), 6 centrado, 5 a la derecha, 8. 4 de los 13 son video (Vimeo). 128 px entre filas (row-gap). Sin pies de foto',
   'bloquesMedidos': [{'tipo': m['tipo'], 'y': m['y'], 'x': m['x'], 'w': m['w'], 'h': m['h'], 'proporcion': m['proporcion'], 'radio': m['radio']} for m in crudo['caso-1440']['medios'] if m['w'] > 300 and m['y'] > 3000 and m['tipo'] == 'img'],
   'vistaGrilla': 'botón de 40 px en la columna 1 (ícono de cuatro cuadrados / de lista): cambia los bloques a una hoja de contactos de 3 columnas de 434,7 px (capturas/caso-vista-grilla-1440.jpg)',
   '390': 'todo a una columna de 358 px; la imagen a sangre sigue a sangre (390 px, radio 0)',
  },
  'filetes1px': {
   'resumen': 'Solo tres usos en las cuatro páginas. Ninguna caja con borde, ninguna línea de retícula visible, ninguna marca de registro.',
   'usos': [
    'borde de la etiqueta de pilar: 1px #8c8c8c a0,8, radio 3,4 px, 28 px de alto (24 a 390), con un separador vertical de 1 px entre el pictograma (20×20) y el texto (div.tag.project-tag, div.tag-separator)',
    'tabla de episodios de Endless Vital Activity en la home: 6 filetes negros de 1px (div.black-h-line, border-top), 1014 px de largo, desde x = 382 hasta el margen derecho (≈ columnas 3 a 8) (capturas/lista-eva-filetes-1440.jpg)',
    'subrayado de 1px de los enlaces a Instagram dentro de esa tabla',
   ],
   'medidos': {k: crudo[k]['bordes'] for k in ['home-1440', 'trabajo-1440', 'caso-1440', 'estudio-1440']},
  },
  'radios': {'imagenYVideo': '8px (--image-border-radius)', 'aSangre': '0', 'boton': '20px (140×40)', 'pastillas': '100px (nav, cursor, botón de menú)', 'etiqueta': '3.4px'},
  'ritmo': 'separación entre filas del índice 149 px; entre bloques del caso 128 px (--s12); tokens de espaciado --s1…--s15 = 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96, 128, 152, 200, 312 px',
  'cabecera': '64 px fija; logo en PNG (a-and-p-logo-2x.png, 164×21,5) en x 44; navegación en el eje de la columna 5; «Endless Vital Activity» a la derecha. Fondo papel 80 % con blur 15 px',
  'pie': 'grilla de 8: Socials (col 1), Contact (col 3), manifiesto 14/24 (col 5-6) y reloj (col 5); créditos 10/16 a la derecha (x 1172); acreditaciones B Corp y 1 % for the Planet a 7,5 px',
 },
 'interaccion': {
  'cursorPropio': {
   'existe': True,
   'cursorNativo': 'oculto: body, a y botones con cursor: none (≥992 px). Desde 991 hacia abajo vuelve el cursor del sistema y el propio no se muestra (CSS .custom-cursor-wrap{display:none} y el script corta en innerWidth <= 991)',
   'forma': 'círculo 16×16, rgba(23,23,23,0.2), backdrop-filter blur(5px), radio 100px. Ni borde ni color',
   'sobreProyecto': 'pastilla 139,5×40 con «View Project» en Messina 17 px blanco, padding 20,5 px (cc-type="grow", cc-text en el enlace). Sobre «Read More» del podcast dice «Read More»; sobre el cierre de los overlays, «Close»',
   'sobreEnlacesYBotones': 'se apaga (opacity 0, cc-type="fade-out"): manda el hover del propio elemento (pastilla o inversión)',
   'sobreLogo': 'crece a 32 px (clase link)',
   'transicion': 'all .2s ease-out (tamaño, opacidad); el texto entra con una grilla de 0fr a 1fr',
   'seguimiento': 'Webflow IX2, evento MOUSE_MOVE continuo sobre .custom-cursor-wrap (100vw×100vh, centrado, translate de −50 % a +50 % según el mouse en el viewport), smoothing 50. Medido con un salto de 800 px: 50 % en ' + str(inter['cursorSeguimiento']['ms50']) + ' ms, 90 % en ' + str(inter['cursorSeguimiento']['ms90']) + ' ms, 99 % en ' + str(inter['cursorSeguimiento']['ms99']) + ' ms. Sigue pegado, sin inercia visible',
   'medido': {'reposo': inter['cursorReposo'], 'sobreProyecto': inter['cursorSobreProyecto'], 'seguimiento': inter['cursorSeguimiento']},
   'capturas': ['cursor-reposo-1440.jpg', 'cursor-sobre-proyecto-detalle-1440.jpg', 'tarjeta-hover-con-cursor-1440.jpg', 'tarjeta-reposo-1440.jpg'],
  },
  'menu': {'1440': 'navegación a la vista solo desde 1440 exacto', 'menor1440': 'hamburguesa en todo ancho bajo 1440 (medido a 1280 y 1439)', '390': inter.get('menu390'), 'apertura': 'cabecera a 100vh, fondo papel 80 % + blur 15 px sobre la página, enlaces que aparecen a los 200 ms con la misma curva de carga; ícono de dos rayas de 16×2 px que gira a X (45°, .3s ease-out)', 'capturas': ['menu-cerrado-390.jpg', 'menu-abierto-390.jpg', 'cabecera-1280-menu.jpg']},
  'cabecera': inter.get('cabeceraAlDesplazar'),
  'relojInactividad': inter.get('relojInactividad'),
  'relojPie': inter.get('relojPie'),
  'readMoreDelCaso': {'altoAbierto': mov['readMore']['altoFinal'], 'curva': '1s cubic-bezier(.165,.84,.44,1) (.case-study-hidden-details-wrap)', 'medido': mov['readMore']},
  'vistaGrillaDelCaso': mov.get('vistaGrilla'),
  'boton': inter.get('boton'),
  'etiqueta': inter.get('etiqueta'),
 },
 'movimiento': {
  'librerias': {
   'webflowIX2': 'sí: cursor, cabecera al desplazar, overlays del podcast y de video (eventos MOUSE_MOVE, PAGE_SCROLL_UP/DOWN, MOUSE_CLICK)',
   'lenis': 'sí, 1.1.8 desde unpkg: lerp 0.1, smoothWheel true, syncTouch false (a 390 el toque es nativo). Instanciado con wrapper: document.body',
   'gsap': 'GSAP 3.10.4 (cdnjs) + CustomEase 3.12.5 (jsdelivr; otra versión) + Observer, SOLO en la home, para un carrusel de hero que ya no existe: el script lanza TypeError (null.addEventListener) y no anima nada. Curva creada: CustomEase "slideEase" 0.10, 0.00, 0.10, 1; 2 s por cambio, 4 s de intervalo',
   'jquery': '3.5.1 (Webflow)',
   'finsweet': 'Attributes accordion y a11y (jsdelivr)',
   'noHay': 'Framer Motion, Motion One, Barba, Swup, Three.js, ScrollTrigger, SplitText',
   'medido': libs,
  },
  'carga': {
   'como': 'Cada bloque (.placeholder_wrap) se pinta primero como un rectángulo gris con el radio de su imagen (opacity .4s ease-in-out): la página aparece como su propio esqueleto. A los 600 ms del DOMContentLoaded (400 + 200) el contenido entra: opacity 0→1 y translateY(2vmin)→0 en 1,5 s cubic-bezier(0, .56, .46, 1). Los bloques .fifty-percent duran 1,35 s con 150 ms de retardo y los .twenty-five-percent 1,2 s con 300 ms: el escalonado va por clase, no por índice',
   'cuadros': {'msDesdeNavegacion': mov['normal']['cuadrosCarga'], 'captura': 'capturas/carga-secuencia-normal.jpg'},
   'animacionesVivasDuranteLaCarga': mov['normal']['animacionesDuranteCarga'],
  },
  'alBajar': {'como': 'lo mismo, disparado por IntersectionObserver con threshold 0.3', 'animacionesVivas': mov['normal']['animacionesDuranteAparicion'], 'cuadros': mov['normal']['aparicion'], 'captura': 'capturas/aparicion-al-bajar-normal.jpg'},
  'salidaDePagina': {'como': 'todo enlace interno hace preventDefault; los bloques suben a −2vmin y se apagan en .5 s cubic-bezier(.9, 0, .9, 1) (.45 s y .4 s con 50 y 100 ms en las variantes) y la navegación ocurre a los 400 ms (600 en tema oscuro). No hay transición de página compartida: es salida + carga normal', 'medido': mov['normal']['salidaDePagina']},
  'scrollSuave': {'lenis': mov['normal']['lenis'], 'rueda100px': mov['normal']['rueda100'], 'rueda600px': mov['normal']['rueda600']},
  'hover': '.2s ease-out (cursor, nav, botones, enlaces), .3s ease-out (escala de imagen 1,03), .7s ease-out (salvapantallas), .4s cubic-bezier(.215,.61,.355,1) (fondo del menú)',
  'transicionesDeLaHoja': hoja,
  'prefersReducedMotion': {
   'reglas': '0 en la hoja compartida y 0 en los estilos en línea',
   'medido': 'con reducedMotion: reduce todo sigue igual: Lenis (100 px al 90 % en ' + str(mov['reducido']['rueda100']['ms90']) + ' ms contra ' + str(mov['normal']['rueda100']['ms90']) + '), las mismas transiciones de 1,2 a 1,5 s al aparecer, el cursor (90 % en ' + str(mov['reducido']['cursorSeguimiento']['ms90']) + ' ms) y el autoplay de video. No respeta la preferencia.',
   'reducido': mov['reducido'],
   'captura': 'capturas/carga-secuencia-reducido.jpg, capturas/aparicion-al-bajar-reducido.jpg',
  },
 },
 'contenido': {
  'titularesTextuales': [
   {'texto': 'We expand what is possible for brands and turn their ambition into action.', 'donde': 'trabajo, p.h4.text-grey.page-title (35 px gris, bajo «Work»)'},
   {'texto': "We're a team of designers, strategists, system-thinkers.", 'donde': 'estudio, p.h4.text-grey.page-title'},
   {'texto': 'Our work shapes what brands do, not just what they say.', 'donde': 'estudio, h2.h6.page-section-title'},
   {'texto': 'We work with brave brands.', 'donde': 'contact, p.h4.text-grey.page-title'},
   {'texto': 'Building rules for the brand that broke them', 'donde': 'trabajo y home, bajada de Vans'},
   {'texto': 'Translating complex technologies into human experiences', 'donde': 'caso, bajada del h1'},
   {'texto': 'Accept & Proceed is a design agency that builds resilience for a world in the making by shaping what brands do, not just what they say. Because we believe better futures are designed into existence. What do you believe?', 'donde': 'pie, p.p3 (14/24): el único «manifiesto» del sitio, y está en el pie'},
  ],
  'largo': 'Bajadas de proyecto: 6 a 15 palabras, mediana 10,5; las 20 empiezan con un gerundio (Building, Translating, Combining, Making, Fusing, Crafting…). Títulos de proyecto: mediana 3 palabras (el nombre del cliente o del proyecto). Palabras visibles en main: home 433, trabajo 341, caso 418 (315 dentro de Read More), estudio 191.',
  'tono': 'Primera persona plural, declarativo, abstracto («resilience for a world in the making», «brave brands»); cero cifras en titulares; los llamados son verbos de navegación («View Project», «Read More», «Listen», «See More»), ningún llamado de venta. La home no dice qué hacen: no tiene h1 y abre con un video.',
  'caso': {
   'estructura': 'hero a sangre → título + bajada + etiqueta de pilar → Read More (plegado: The Context / The Approach / The Design / The Impact, 315 palabras) → bloque Impact (Press / Outcome / Metric, también plegado) → 14 bloques visuales sin pie → Credits (nombres por rol, 14 px) → Related Projects (3 tarjetas cuadradas de 320)',
   'metricas': 'En el texto: «The activation engaged thousands of visitors across all four days of THINK Boston», «the experience is now being translated into 7 touring versions, rolling out across the 10+ global conferences IBM attends». Son cuentas de alcance y entregables, no resultados de negocio. El rótulo «Metric» del bloque Impact está vacío.',
   'textoCompleto': next(c for c in cont['casos'] if 'watsonx' in c['url']),
  },
  'impactEnLos20Casos': {
   'resumen': '«Metric» vacío en 20 de 20 casos. «Outcome» con palabras sueltas (Awareness, Engagement, Activation, Education, Community…) en 11 de 20. «Press» con medios o premios (Hypebeast, ArchDaily, Creative Boom, D&AD, It’s Nice That, Dezeen…) en 5 de 20 (4 casos distintos: Nike Move to Zero aparece dos veces en el índice). Ninguna cifra en el bloque Impact.',
   'porCaso': [{'h1': c.get('h1'), 'bajada': c.get('bajada'), 'impact': c.get('impact')} for c in cont['casos']],
  },
  'indice': cont['indice'],
  'telemetria': 'La única «telemetría» es el reloj: HH:MM del visitante en el pie (Letterform Variations, 33,67 px) y el salvapantallas HH:MM:SS de 180 px a los 60 s sin actividad. No hay coordenadas, estados, versiones ni etiquetas de laboratorio. Las etiquetas de proyecto son tres pilares con pictograma propio: New Ambition, New Expressions, New Connections.',
  'paginasCompletas': {k: v for k, v in cont.items() if k.startswith('http')},
 },
 'queLoHaceVerseAsi': [
  'El trabajo es lo grande y la letra es chica: el texto de contenido no pasa de 35 px, un solo peso, sin mayúsculas. Contando píxeles a 1440, la imagen y el video son el 25 % del índice y el 52 % del caso (en la home, 17 % más los 810 px del hero, que en la captura es un póster blanco), a sangre o en hasta 8 columnas. La home no tiene frase ni h1: abre con 810 px de video.',
  'Asimetría con aire medido, no bento: pares de tarjetas que dejan columnas vacías, en un patrón de tres filas que se repite, 149 px entre filas, y todo título anclado a la columna 5. Ni cajas ni bordes: el orden lo da la retícula, no las líneas.',
  'La carga es parte del diseño: la página se dibuja primero como su propio esqueleto gris con los radios reales, y el contenido sube 2vmin en 1,2-1,5 s con una curva propia, escalonado por clase; al irse, se apaga hacia arriba en .5 s. Igual en cada página.',
  'Detalles de taller sin color: un cursor de vidrio esmerilado que se vuelve pastilla «View Project», un reloj en una letra variable hecha para ellos que se convierte en salvapantallas, y cero acento en la interfaz (todo el color lo ponen las imágenes).',
 ],
 'contraElBrief': [
  {'brief': 'Titular a escala monumental pegado a los márgenes', 'medido': 'máximo 35 px de contenido; la home sin h1; lo monumental es la imagen'},
  {'brief': 'Bento brutalista con bordes visibles de 1 px', 'medido': 'cero cajas con borde; 1 px solo en etiquetas y en una tabla de episodios'},
  {'brief': 'Mono para telemetría y etiquetas «[ LAB_STATUS ]»', 'medido': 'cero mono; la única telemetría es un reloj en una letra variable propia'},
  {'brief': 'Cursor magnético de acento azul con texto', 'medido': 'cursor gris translúcido con blur, sin color; sí cambia a pastilla con texto sobre proyectos'},
  {'brief': 'Framer Motion con resortes, sin ease-in-out', 'medido': 'transiciones CSS con curvas propias (0,.56,.46,1 de 1,2-1,5 s) + Lenis; GSAP cargado pero muerto'},
  {'brief': 'Casos con métrica C-Level', 'medido': '«Metric» vacío en los 20 casos; cifras solo de alcance y en prosa plegada'},
 ],
 'defectosMedidos_noCopiar': [
  'Contraste: el gris de bajadas, etiquetas y enlaces del pie da 2,40:1 sobre papel y 2,22:1 sobre el pie; en el tema oscuro 3,92:1 en el cuerpo de 17 px. Texto blanco sobre el póster claro de la tarjeta grande: 1,25:1.',
  'prefers-reduced-motion ignorado (0 reglas; medido igual con reduce).',
  'Home sin h1; texto legal de 7,5 px.',
  'Errores de consola en todas las páginas: «observer is not defined» (2 a 8 por página, el IntersectionObserver de las apariciones) y en la home TypeError del carrusel muerto.',
  'Menú hamburguesa en todo ancho bajo 1440 px.',
  'Contenido: «Discussin Reinvention», bajada de AWO cortada («…matter to everyone through»), sección «We design new expressions» repetida en About, «Nike Move to Zero» dos veces en el índice, «Read Story», «Privacy» y «Data Policy» con href="#".',
 ],
 'capturas': {
  'carpeta': 'capturas/ (JPEG calidad 80; las completas en tramos de ≤ 4000 px de alto; a 390 son dpr 2, 780 px de ancho)',
  'paginas': sorted(f for f in os.listdir(os.path.join(os.path.dirname(OUT), 'capturas')) if 'completa' in f or 'pantalla1' in f),
  'detalles': sorted(f for f in os.listdir(os.path.join(os.path.dirname(OUT), 'capturas')) if 'completa' not in f and 'pantalla1' not in f),
  'nota': 'Para estudio interno. Nada de sus recursos (letras, imágenes, video, código) se copia al sitio.',
 },
 'crudo': crudo,
}
json.dump(M, open(OUT, 'w'), ensure_ascii=False, separators=(',', ':'))
print('ok', os.path.getsize(OUT) // 1024, 'KB')
