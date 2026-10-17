#!/usr/bin/env python3
"""Sirve la dirección A en local y deja correr el chequeo de verdad.

GET /api/chequeo?dominio=… se reenvía a https://spindlelab.cl/api/chequeo (el chequeo en producción, la misma API que
usa el sitio; solo lee la portada del dominio que se escribe y no guarda nada). Lo demás, archivos de proto/a.
Sin este servidor (por ejemplo, abriendo el HTML como archivo o en el tablero), el chequeo muestra su error real.

Uso: python3 -I servir.py [puerto]   (por defecto, uno libre; lo imprime)
"""
import http.server
import socket
import sys
import urllib.parse
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"


class Manejador(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(RAIZ), **k)

    def log_message(self, *a):
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        if u.path == "/api/chequeo":
            q = urllib.parse.parse_qs(u.query).get("dominio", [""])[0]
            destino = "https://spindlelab.cl/api/chequeo?dominio=" + urllib.parse.quote(q)
            try:
                with urllib.request.urlopen(urllib.request.Request(destino, headers={"User-Agent": UA}), timeout=60) as r:
                    cuerpo, estado = r.read(), r.status
            except urllib.error.HTTPError as err:
                cuerpo, estado = err.read(), err.code
            except Exception:  # noqa: BLE001
                cuerpo, estado = b'{"ok":false,"error":"No pudimos completar el chequeo."}', 502
            self.send_response(estado)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(cuerpo)))
            self.end_headers()
            self.wfile.write(cuerpo)
            return
        rango = self.headers.get("Range")
        archivo = Path(self.translate_path(u.path))
        if rango and archivo.is_file() and rango.startswith("bytes="):
            # Rango de bytes para los videos (Chromium los pide así para hacer bucle sin volver a bajar todo)
            total = archivo.stat().st_size
            ini, _, fin = rango[6:].partition("-")
            ini = int(ini or 0)
            fin = min(int(fin) if fin else total - 1, total - 1)
            if ini >= total:
                self.send_response(416)
                self.send_header("Content-Range", f"bytes */{total}")
                self.end_headers()
                return
            with open(archivo, "rb") as fh:
                fh.seek(ini)
                datos = fh.read(fin - ini + 1)
            self.send_response(206)
            self.send_header("Content-Type", self.guess_type(str(archivo)))
            self.send_header("Content-Range", f"bytes {ini}-{fin}/{total}")
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Length", str(len(datos)))
            self.end_headers()
            self.wfile.write(datos)
            return
        return super().do_GET()


def libre():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


if __name__ == "__main__":
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else libre()
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", puerto), Manejador)
    print(f"http://127.0.0.1:{puerto}/", flush=True)
    srv.serve_forever()
