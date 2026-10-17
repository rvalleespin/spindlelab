# Convierte un borrador (cuerpo en párrafos + línea de baja) en htmlBody + body para Gmail.
# Por qué existe: create_draft con solo `body` autoenlaza los dominios y deja como TEXTO VISIBLE la dirección larga
# https://www.google.com/url?q=...&source=gmail&ust=... (visto el 17-oct-2026 en los 6 borradores de la segunda ola).
# Con htmlBody propio el texto visible queda corto (verifica.spindlelab.cl) y el enlace va en el href.
# Solo se enlazan verifica.spindlelab.cl y spindlelab.cl; el dominio del prospecto va en texto plano.
# NO pasar `body` junto con htmlBody: Gmail autoenlaza la parte de texto y la deja con las direcciones largas. Solo htmlBody.
# La firma es la de la primera ola (tabla con el wordmark), NO la firma de imagen de Gmail: no usar includeSignature.
import re, json, sys
DOM = re.compile(r'(?<![\w@./-])((?:www\.)?[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*\.(?:cl|com|app))((?:/[a-z0-9-]+)*)(?![\w@-])', re.I)
ESTILO = 'font-family:Arial,Helvetica,sans-serif'
SIG = ("<table cellpadding='0' cellspacing='0' style='border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;margin-top:18px'><tr>"
 "<td style='padding-right:16px;vertical-align:middle'><div style='font-size:25px;font-weight:800;line-height:1.0;color:#131A22;letter-spacing:-0.5px'>Spindle<br>Lab<span style='color:#C9A227'>.</span></div></td>"
 "<td style='border-left:2px solid #C9A227;padding-left:16px;vertical-align:middle'><div style='font-size:15px;font-weight:bold;color:#131A22;line-height:1.4'>Ramón Vallejos Espíndola</div>"
 "<div style='font-size:11px;font-weight:bold;letter-spacing:1px;color:#5D6673;line-height:1.4'>FUNDADOR</div>"
 "<div style='font-size:12px;color:#5D6673;line-height:1.4;margin-top:5px'><a href='https://spindlelab.cl' style='color:#131A22;text-decoration:none'>spindlelab.cl</a> <span style='color:#C9A227'>&middot;</span> "
 "<a href='mailto:hola@spindlelab.cl' style='color:#131A22;text-decoration:none'>hola@spindlelab.cl</a></div></td></tr></table>")
def esc(t): return t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
def enlaza(t):
    out, i = [], 0
    for m in DOM.finditer(t):
        out.append(esc(t[i:m.start()]))
        visible = m.group(0)
        if not visible.lower().replace('www.', '').startswith(('verifica.spindlelab.cl', 'spindlelab.cl')):
            out.append(esc(visible))   # el dominio del prospecto va en texto plano, sin enlace (regla del copiloto)
        else:
            out.append(f'<a href="https://{visible}" target="_blank" style="{ESTILO}">{esc(visible)}</a>')
        i = m.end()
    out.append(esc(t[i:]))
    return ''.join(out)
def construir(d):
    ps = ''.join(f'<p style="{ESTILO}">{enlaza(p)}</p>' for p in d['cuerpo'])
    baja = f'<p style="font-size:12px;margin-top:20px;{ESTILO};color:#5D6673">{enlaza(d["baja"])}</p>'
    html = f'<div style="{ESTILO};font-size:14px;line-height:1.55;color:#131A22">{ps}{baja}{SIG}</div>'
    texto = '\n\n'.join(d['cuerpo']) + '\n\n' + d['baja'] + '\n\n--\nRamón Vallejos Espíndola\nFundador, SpindleLab\nspindlelab.cl · hola@spindlelab.cl'
    return html, texto
if __name__ == '__main__':
    arch, ident = sys.argv[1], sys.argv[2]
    d = next(x for x in json.load(open(arch)) if x['id'] == ident)
    h, t = construir(d)
    print(json.dumps({'id': d['id'], 'para': d['para'], 'asunto': d['asunto'], 'htmlBody': h, 'body': t}, ensure_ascii=False))
