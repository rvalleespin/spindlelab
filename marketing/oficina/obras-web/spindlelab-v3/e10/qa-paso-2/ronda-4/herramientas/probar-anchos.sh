#!/usr/bin/env bash
# Ronda 4 (Javiera) · ¿anchos.mjs ve el caso de la ronda 3? Prueba fuera del repo, sin tocarlo:
#   1. copia proto/ a una carpeta temporal y le pone el taller.css de ANTES del arreglo (9b4a39b^);
#   2. la sirve en 8775;
#   3. corre el anchos.mjs ACTUAL del repo (sin cambios, BASE=8775): tiene que fallar (código 1) en la home de Taller;
#   4. corre el anchos.mjs de ANTES (9b4a39b^, solo con REPO en ruta absoluta) contra lo mismo: no lo veía (código 0).
# Uso: bash probar-anchos.sh <carpeta-temporal> <carpeta-datos>
set -u
TMP="$1"; DATOS="$2"
REPO=/home/user/spindlelab
T=marketing/oficina/obras-web/spindlelab-v3/tableros/e10-direcciones
ANCHOS=360,390,768,1000,1023,1024,1100,1180,1258,1259,1280,1299,1300,1440,1920
rm -rf "$TMP/proto-viejo" && cp -r "$REPO/$T/proto" "$TMP/proto-viejo"
git -C "$REPO" show "9b4a39b^:$T/proto/e10/taller.css" > "$TMP/proto-viejo/e10/taller.css"
git -C "$REPO" show "9b4a39b^:$T/herramientas/anchos.mjs" | sed "s#^const REPO = .*#const REPO = '$REPO';#" > "$TMP/anchos-viejo.mjs"
python3 -m http.server 8775 --bind 127.0.0.1 --directory "$TMP/proto-viejo" > "$TMP/srv8775.log" 2>&1 &
SRV=$!; sleep 1
kill -0 "$SRV" 2>/dev/null || { echo "no se pudo servir en 8775 (¿puerto ocupado?): ver $TMP/srv8775.log"; exit 2; }
trap 'kill $SRV' EXIT
(cd "$REPO/$T" && BASE=http://127.0.0.1:8775 node herramientas/anchos.mjs --anchos "$ANCHOS" > "$DATOS/anchos-repo-contra-css-viejo.txt" 2>&1); echo "anchos.mjs actual contra el CSS viejo: código $?"
BASE=http://127.0.0.1:8775 node "$TMP/anchos-viejo.mjs" --anchos "$ANCHOS" > "$DATOS/anchos-viejo-contra-css-viejo.txt" 2>&1; echo "anchos.mjs viejo contra el CSS viejo: código $?"
git -C "$REPO" status --porcelain -- "$T"   # vacío: el repo no se tocó
