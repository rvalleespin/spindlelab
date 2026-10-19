#!/usr/bin/env python3
"""Arma texto-obra.md desde texto-obra.json, que es la fuente.

Uso:
  python3 md-obra.py                          escribe ../texto-obra.md
  python3 md-obra.py --lector RUTA [ids…]     escribe en RUTA solo el texto visible de las páginas pedidas (por id;
                                              sin ids, todas), sin fuentes, notas ni razonamiento: para la lectura fría

Sin dependencias. Si cambias el texto, cambia el JSON y vuelve a correr esto: el .md no se edita a mano.
"""
import json
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
FUENTE = RAIZ / 'texto-obra.json'
SALIDA = RAIZ / 'texto-obra.md'
MARCA = {'queda': '', 'cambia': ' · **cambia**', 'nuevo': ' · **nuevo**'}


def texto_de(el):
    if el.get('tinta'):
        return f"{el['tinta']} *{el['gris']}*"
    if el.get('opciones'):
        return ' · '.join(el['opciones'])
    if el.get('items'):
        return '\n'.join(f'  - {i}' for i in el['items'])
    if el.get('campos'):
        return '\n'.join(f"  - **{c['rotulo']}:** {c['valor']}" for c in el['campos'])
    if el.get('tramos'):
        filas = []
        for t in el['tramos']:
            nota = f" · *{t['nota']}*" if t.get('nota') else ''
            filas.append(f"  - **{t['nombre']}** · {t['linea']} · {t['bajada']}{nota} → `{t['destino']}`")
        return '\n'.join(filas)
    return el.get('texto', '')


def etiqueta(el):
    rol = el['rol']
    if rol == 'h2' and el.get('nivel') == 3:
        rol = 'h3'
    uso = f" · {el['uso']}" if el.get('uso') else ''
    return f'`{rol}{uso}`'


def linea_md(el):
    cuerpo = texto_de(el)
    marca = MARCA.get(el.get('estado', ''), '')
    s = f'- {etiqueta(el)}{marca} {cuerpo}' if '\n' not in cuerpo else f'- {etiqueta(el)}{marca}\n{cuerpo}'
    extra = []
    if el.get('destino'):
        extra.append(f"→ `{el['destino']}`")
    if el.get('ancla'):
        extra.append(f"id=\"{el['ancla']}\"")
    if el.get('enlaces'):
        extra.append('enlaces: ' + ', '.join(f'«{k}» → `{v}`' for k, v in el['enlaces'].items()))
    if el.get('linea'):
        extra.append(f"línea mono: «{el['linea']}»")
    if el.get('estados'):
        extra.append('; '.join(f'{k}: «{v}»' for k, v in el['estados'].items()))
    if extra:
        s += '  \n  ' + ' · '.join(extra)
    if el.get('donde'):
        s += f"  \n  <sub>Dónde: {el['donde']}</sub>"
    if el.get('antes'):
        antes = el['antes'] if isinstance(el['antes'], str) else json.dumps(el['antes'], ensure_ascii=False)
        s += f'  \n  <sub>Antes: «{antes}»</sub>'
    if el.get('por_que'):
        s += f"  \n  <sub>Por qué: {el['por_que']}</sub>"
    if el.get('fuente'):
        s += f"  \n  <sub>Fuente: {el['fuente']}</sub>"
    if el.get('condicion'):
        s += f"  \n  ⚠ **Condición:** {el['condicion']}"
    if el.get('nota') and isinstance(el['nota'], str):
        s += f"  \n  <sub>Nota: {el['nota']}</sub>"
    return s


def medios_md(medios, out):
    out += ['', '| Medio | Forma | Alt o descripción | Pie |', '|---|---|---|---|']
    for m in medios:
        texto = m.get('alt') or (f"(video) {m['descripcion']}" if m.get('descripcion') else (m.get('nota') or ''))
        pie = m.get('pie', '')
        if m.get('enlace'):
            pie += f" · enlace «{m['enlace']['texto']}» → `{m['enlace']['destino']}`"
        donde = f" ({m['donde']})" if m.get('donde') else ''
        out.append(f"| `{m['archivo']}`{donde} | {m['forma']} | {texto} | {pie} |")


def lista(titulo, items, out):
    if items:
        out.append(f'\n**{titulo}**\n')
        out.extend(f'- {i}' for i in items)


def seccion_md(sec, out):
    out.append(f"\n### {sec['nombre']}\n")
    if sec.get('trabajo'):
        out.append(f"*Trabajo del bloque:* {sec['trabajo']}\n")
    out.extend(linea_md(e) for e in sec.get('elementos', []))
    if sec.get('medios'):
        medios_md(sec['medios'], out)
    lista('Lo que se borró o cambió, y por qué', sec.get('borrado'), out)


def entradas_md(p, out):
    out += ['', '### Las entradas del índice', '', f"*{p.get('orden', '')}*", '',
            '| # | Nombre | Bajada (gris) | Línea mono | Adónde lleva · círculo | Pie o nota |', '|---|---|---|---|---|---|']
    for i, e in enumerate(p['entradas'], 1):
        destino = f"`{e['destino']}` · «{e['cursor']}»" if e.get('destino') else 'sin enlace'
        nota = ' '.join(x for x in [e.get('pie', ''), e.get('nota', '')] if x)
        marca = ' **(cambia)**' if e.get('estado') == 'cambia' else ''
        out.append(f"| {i} | **{e['nombre']}**{marca} | {e['bajada']} | {e['linea']} | {destino} | {nota} |")
    cambian = [e for e in p['entradas'] if e.get('estado') == 'cambia']
    for e in cambian:
        out.append(f"\n<sub>{e['nombre']}: antes «{e['antes']}». {e['por_que']}</sub>")
    out.append('\n<sub>Fuentes por entrada: ' + ' · '.join(f"{e['nombre']}: {e['fuente']}" for e in p['entradas'])
               + '</sub>')


def md(d):
    out = [f"# E12 · {d['documento']}", '',
           f"**{d['fecha']} · {d['quien']}** · rama `claude/magical-franklin-ckfki2` · fuente: `texto-obra.json` (este "
           'archivo sale de ahí con `herramientas/md-obra.py`; no se edita a mano) · se comprueba con '
           '`herramientas/comprobar-obra.py`.', '', f"**Estado:** {d['estado']}", '', '**Manda:**', '']
    out.extend(f'- {m}' for m in d['manda'])
    out += ['', '## Cómo leer esto', '']
    out.extend(f'- {c}' for c in d['convenciones'])
    out.append('- Cada línea empieza con su rol entre comillas invertidas: ' + ', '.join(f'`{k}`' for k in d['roles'])
               + '. *La parte en cursiva* es la continuación en gris.')
    out += ['', '## Lo que decidió Ramón en la compuerta 2, y cómo queda en el texto', '',
            '| # | Decidió | En el texto |', '|---|---|---|']
    out.extend(f"| {x['n']} | {x['decidio']} | {x['en_el_texto']} |" for x in d['decisiones_c2'])
    out += ['', '## Lo común a todas las páginas']
    for bloque, els in d['comun'].items():
        out += ['', f'### {bloque.capitalize()}', '']
        out.extend(linea_md(e) for e in els)
    for p in d['paginas']:
        out += ['', f"## {p['ruta']} · {p['id']}", '']
        if p.get('modo'):
            out.append(f"- *Modo:* {p['modo']}. {p.get('regla', '')}")
        out += [f"- `title` {p.get('title', '')}", f"- `description` {p.get('description', '')}"]
        if p.get('senales'):
            out.append(f"- <sub>Señales: {p['senales']}</sub>")
        if p.get('estructura'):
            out.append(f"- *Estructura:* {p['estructura']}")
        if p.get('protegido'):
            out.append(f"- *Lo que no se toca:* {p['protegido']}")
        for r in p.get('reglas', []):
            out.append(f'- *Regla:* {r}')
        for s in p.get('secciones', []):
            seccion_md(s, out)
        if p.get('entradas'):
            entradas_md(p, out)
        lista('Cambios de registro respecto del caso.md de Bruno (los hechos no cambian)', p.get('cambios_de_registro'),
              out)
    out += ['', '## Afirmaciones por verificar antes de publicar', '']
    out.extend(f"- **{a['texto']}.** {a['estado']}" for a in d['afirmaciones_por_verificar'])
    out += ['', '## Pendientes que no son míos', '']
    for quien, items in d['pendientes'].items():
        out.append(f'\n**{quien}**\n')
        out.extend(f'- {i}' for i in items)
    if d.get('detectores'):
        det = d['detectores']
        out += ['', '## Los dos detectores, corridos sobre este texto', '', det.get('resumen', '')]
        for nombre, filas in det.get('filas', {}).items():
            out += ['', f'**{nombre}**', '', '| Ítem | Resultado |', '|---|---|']
            out.extend(f"| {f['item']} | {f['resultado']} |" for f in filas)
    if d.get('lectura_fria'):
        lf = d['lectura_fria']
        out += ['', '## La lectura fría', '', lf.get('resumen', '')]
        lista('Lo que cambió por ella', lf.get('cambios'), out)
        lista('Lo que dijo y no cambié, y por qué', lf.get('no_cambio'), out)
    out += ['', '## Historial de correcciones', '', '| Fecha | Corrección | Origen |', '|---|---|---|']
    out.extend(f"| {h['fecha']} | {h['que']} | {h['origen']} |" for h in d.get('historial', []))
    return '\n'.join(out) + '\n'


NOMBRES = {'h1': 'TITULAR', 'h2': 'TÍTULO DE SECCIÓN', 'entradilla': 'BAJADA', 'parrafo': 'TEXTO',
           'boton': 'BOTÓN O ENLACE', 'nota': 'TEXTO CHICO', 'rotulo': 'ETIQUETA', 'ficha': 'FICHA', 'cita': 'CITA',
           'subtítulo': 'SUBTÍTULO'}


def visible(el):
    """Solo lo que se ve en pantalla, sin fuentes ni condiciones."""
    if el.get('uso') in ('referencia', 'nombre accesible', 'solo lector de pantalla', 'cursor', 'error', 'estado'):
        return None
    if el.get('uso') == 'alt':
        return f"[IMAGEN O VIDEO: {el['texto']}]"
    if el.get('tramos'):
        return '[VIDEO CON PIEZAS QUE PASAN; BAJO EL VIDEO, LA FICHA DE CADA UNA]\n' + '\n'.join(
            f"   {t['nombre']} ({t['linea']}): {t['bajada']}" + (f" {t['nota']}" if t.get('nota') else '')
            for t in el['tramos'])
    t = el['texto'] if el.get('tinta') else texto_de(el).replace('*', '')
    rol = el['rol']
    if rol == 'h2' and el.get('nivel') == 3:
        rol = 'subtítulo'
    return f'[{NOMBRES.get(rol, rol)}] {t}'


def lector(d, ids):
    out = []
    for p in d['paginas']:
        if ids and p['id'] not in ids:
            continue
        out += ['', '=' * 60, f"PÁGINA: {p['ruta']}", '=' * 60]
        for s in p.get('secciones', []):
            out.append('')
            for e in s.get('elementos', []):
                v = visible(e)
                if v:
                    out.append(v)
            for m in s.get('medios', []):
                if m.get('alt'):
                    out.append(f"[IMAGEN: {m['alt']}]" + (f" (pie: {m['pie']})" if m.get('pie') else ''))
                elif m.get('descripcion'):
                    out.append(f"[VIDEO: {m['descripcion']}]" + (f" (pie: {m['pie']})" if m.get('pie') else ''))
        if p.get('entradas'):
            out.append('')
            for e in p['entradas']:
                pie = f" (pie: {e['pie']})" if e.get('pie') else ''
                out.append(f"[PIEZA DEL ÍNDICE] {e['nombre']} · {e['linea']}\n   {e['bajada']}{pie}")
    return '\n'.join(out).strip() + '\n'


if __name__ == '__main__':
    d = json.loads(FUENTE.read_text(encoding='utf-8'))
    if '--lector' in sys.argv:
        i = sys.argv.index('--lector')
        destino = Path(sys.argv[i + 1])
        destino.write_text(lector(d, sys.argv[i + 2:]), encoding='utf-8')
        print(f'texto para el lector: {destino}')
    else:
        SALIDA.write_text(md(d), encoding='utf-8')
        print(f'escrito: {SALIDA}')
