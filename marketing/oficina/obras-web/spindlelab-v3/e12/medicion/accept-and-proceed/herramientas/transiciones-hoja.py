"""Lista cada regla de la hoja compartida de Webflow (copia descargada, solo lectura) que declara
transition, animation, @keyframes, cursor, backdrop-filter, mix-blend-mode o :hover, con su @media.
Uso: python3 -I transiciones-hoja.py <hoja.css>"""
import sys, re, json
css = open(sys.argv[1]).read()
out = []
def walk(s, media=''):
    i = 0
    while i < len(s):
        j = s.find('{', i)
        if j < 0: break
        sel = s[i:j].strip()
        depth, k = 1, j + 1
        while depth and k < len(s):
            if s[k] == '{': depth += 1
            elif s[k] == '}': depth -= 1
            k += 1
        body = s[j+1:k-1]
        if sel.startswith('@media') or sel.startswith('@supports'):
            walk(body, sel)
        elif sel.startswith('@keyframes'):
            out.append({'media': media, 'sel': sel, 'decl': body[:300]})
        else:
            decl = [d.strip() for d in body.split(';') if re.match(r'\s*(transition|animation|cursor|backdrop-filter|-webkit-backdrop-filter|mix-blend-mode)', d)]
            if decl or ':hover' in sel:
                out.append({'media': media, 'sel': sel[:160], 'decl': '; '.join(decl) if decl else body[:200]})
        i = k
walk(css)
print(json.dumps(out, ensure_ascii=False, indent=0))
