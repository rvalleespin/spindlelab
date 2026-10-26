#!/bin/bash
# Mira el sitio nuevo de SpindleLab en tu Mac, sin publicar nada.
# Copia el sitio a /tmp (fuera de iCloud, que es donde esto se puede construir sin problemas), lo construye y lo sirve en
# http://localhost:8080 con el mismo servidor local que usa Cloudflare (respeta las redirecciones, la página 404 y el chequeo).
# La primera vez tarda un par de minutos (instala dependencias); las siguientes, unos segundos.
# Para parar: Ctrl+C.
#
#   bash ver-el-sitio.sh
set -e
AQUI="$(cd "$(dirname "$0")" && pwd)"
REPO="$(git -C "$AQUI" rev-parse --show-toplevel)"
DEST=/tmp/spindlelab-v3-ver
mkdir -p "$DEST"
rsync -a --delete --exclude node_modules --exclude dist --exclude .astro --exclude .wrangler "$REPO/spindlelab-astro/" "$DEST/"
cd "$DEST"
[ -d node_modules ] || npm ci --no-audit --no-fund
npx astro build
echo ""
echo "Listo. Abre http://localhost:8080  (Ctrl+C para parar)"
npx wrangler pages dev dist --port 8080
