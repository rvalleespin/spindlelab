#!/usr/bin/env bash
# E12 · Evidencia de que Geist y Geist Mono son la letra por defecto de la plantilla de Next.js.
# Baja el layout de las dos plantillas de create-next-app (la última publicada en npm) y guarda las primeras
# líneas con la versión y la fecha. Uso: bash evidencia-next.sh <carpeta del tablero>
set -euo pipefail
base="${1:-$(dirname "$0")/..}"
mkdir -p "$base/datos"
v=$(curl -sS --max-time 30 https://registry.npmjs.org/create-next-app/latest | python3 -I -c "import json,sys; print(json.load(sys.stdin)['version'])")
out="$base/datos/create-next-app-layout.txt"
{
  echo "# create-next-app@${v} · leído el $(date -u +%Y-%m-%dT%H:%MZ) desde unpkg.com"
  for t in app app-tw; do
    echo "## dist/templates/${t}/ts/app/layout.tsx (primeras 14 líneas)"
    curl -sS --max-time 30 "https://unpkg.com/create-next-app@${v}/dist/templates/${t}/ts/app/layout.tsx" | head -14
  done
} > "$out"
echo "listo $out"
