# Sirve el tablero envuelto como lo publica Artifact (esqueleto con doctype y viewport) y el resto tal cual
import http.server, os, sys
RAIZ = sys.argv[1]
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s, *a, **k): super().__init__(*a, directory=RAIZ, **k)
    def do_GET(s):
        if s.path in ('/', '/index.html'):
            body = open(os.path.join(RAIZ, 'tablero.html'), encoding='utf-8').read()
            html = '<!doctype html><html lang="es"><head><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' + body.replace('<style>', '</head><body><style>', 0) + '</body></html>'
            # simple: no partimos head/body, el navegador corrige
            html = '<!doctype html><html lang="es"><head><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>' + body + '</body></html>'
            b = html.encode('utf-8'); s.send_response(200); s.send_header('content-type','text/html; charset=utf-8'); s.send_header('content-length',str(len(b))); s.end_headers(); s.wfile.write(b); return
        return super().do_GET()
http.server.ThreadingHTTPServer(('127.0.0.1', 8792), H).serve_forever()
