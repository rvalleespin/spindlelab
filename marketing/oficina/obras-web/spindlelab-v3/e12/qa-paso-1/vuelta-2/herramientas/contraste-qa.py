# QA E12 paso 1, vuelta 2 (Javiera) · recalcula, con la fórmula de WCAG 2.1 y sin usar contraste.py de Lucía,
# los pares de contraste que citan el brief de obra (§4), el lock (§5) y el tablero.
# Uso: python3 -I contraste-qa.py <salida.json>
import json, sys

def lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

def L(h):
    r, g, b = rgb(h) if isinstance(h, str) else h
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def ratio(a, b):
    la, lb = L(a), L(b)
    hi, lo = max(la, lb), min(la, lb)
    return round((hi + 0.05) / (lo + 0.05), 2)

def sobre(rgba, fondo):
    (r, g, b), a = rgb(rgba[0]), rgba[1]
    f = rgb(fondo)
    return tuple(round(a * c + (1 - a) * cf) for c, cf in zip((r, g, b), f))

papel, placa, hoja, tinta, gris, senal = '#F6F6F4', '#EFEFEA', '#FFFFFF', '#111111', '#666663', '#0029FF'
pares = {
    'tinta/papel': ratio(tinta, papel), 'tinta/placa': ratio(tinta, placa), 'tinta/hoja': ratio(tinta, hoja),
    'gris/papel': ratio(gris, papel), 'gris/placa': ratio(gris, placa), 'gris/hoja': ratio(gris, hoja),
    'cobalto/papel': ratio(senal, papel), 'cobalto/placa': ratio(senal, placa), 'cobalto/hoja': ratio(senal, hoja),
    'blanco/cobalto': ratio('#FFFFFF', senal), 'tinta/cobalto (foco sobre el círculo)': ratio(tinta, senal),
    'placa/papel': ratio(placa, papel), 'hoja/papel': ratio(hoja, papel),
    'linea .08 sobre papel': ratio(sobre(('#111111', .08), papel), papel),
    'linea .18 sobre papel': ratio(sobre(('#111111', .18), papel), papel),
    '#0B25B7/papel': ratio('#0B25B7', papel), 'blanco/#0B25B7': ratio('#FFFFFF', '#0B25B7'),
    'papel/tinta (texto del botón Mover)': ratio(papel, tinta),
    # referentes
    'Koto #989898/#060606': ratio('#989898', '#060606'), 'Koto blanco/#060606': ratio('#FFFFFF', '#060606'),
    'Koto #595959/#060606': ratio('#595959', '#060606'), 'Koto #141414/#060606': ratio('#141414', '#060606'),
    'A&P negro/#F9F7F3': ratio('#000000', '#F9F7F3'),
    'A&P #8C8C8C a .8 sobre #F9F7F3': ratio(sobre(('#8C8C8C', .8), '#F9F7F3'), '#F9F7F3'),
}
json.dump({'formula': 'WCAG 2.1, luminancia relativa sRGB; transparencias compuestas sobre su fondo', 'pares': pares},
          open(sys.argv[1], 'w'), ensure_ascii=False, indent=1)
for k, v in pares.items():
    print(f'{k:45s} {v}')
