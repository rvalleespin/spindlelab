#!/usr/bin/env bash
# E12 · compuerta 2 · Mide el estado de praxi.coach el día del tablero (encargo del paso 2, criterio 12) y guarda la
# respuesta. Solo un GET a la portada y otro a /planes, sin seguir redirecciones, sin cookies y sin cuerpo guardado:
# nada que toque la producción de Praxi. Sale por el proxy del entorno (HTTPS_PROXY), con TLS verificado; la línea
# «Connection Established» del proxy se descarta.
#
# Uso: bash herramientas/estado-praxi.sh        (escribe datos/estado-praxi.txt)
set -euo pipefail
BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SALIDA="$BASE/datos/estado-praxi.txt"
{
  echo "# praxi.coach, medido $(date -u +%Y-%m-%dT%H:%M:%SZ) con curl $(curl --version | head -1 | cut -d' ' -f2)"
  for ruta in / /planes; do
    echo
    echo "## GET https://praxi.coach${ruta}"
    curl -sS -o /dev/null -D - --max-time 30 "https://praxi.coach${ruta}" | tr -d '\r' | grep -v 'Connection Established' | grep -iE '^(HTTP/|x-vercel-error|server|date|content-type)' || true
  done
} > "$SALIDA"
cat "$SALIDA"
