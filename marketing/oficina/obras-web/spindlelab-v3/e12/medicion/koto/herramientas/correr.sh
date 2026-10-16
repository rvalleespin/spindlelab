#!/usr/bin/env bash
# E12 · Koto · repite la medición completa.
# Uso: bash correr.sh <dir-trabajo>   (p. ej. un directorio temporal; ahí quedan los JSON crudos y las pantallas)
# Escribe en ../capturas/ y deja ../medicion.json. Necesita el proxy del entorno (HTTPS_PROXY) y
# Playwright de spindlelab-astro/node_modules. Tarda ~15 min: Koto se carga por un proxy que a
# veces corta un archivo, y cada página se recarga hasta que JS, CSS y las tres letras llegan enteros.
set -u
H="$(cd "$(dirname "$0")" && pwd)"
K="$(dirname "$H")"
W="${1:?falta el directorio de trabajo}"
mkdir -p "$W/crudo" "$W/cuadros" "$K/capturas"

node "$H/reconocer.mjs" https://koto.com/ "$W/crudo/reconocer-home.json"
python3 -I "$H/letras.py" "$W/crudo/reconocer-home.json" "$W/crudo/letras.json"
node "$H/librerias.mjs" "$W/crudo/librerias.json" https://koto.com/ https://koto.com/work https://koto.com/projects/instagram https://koto.com/about

for pg in home trabajo caso estudio; do
  for an in 1440 390; do
    node "$H/medir.mjs" "$pg" "$an" "$W/crudo" "$K/capturas" || node "$H/medir.mjs" "$pg" "$an" "$W/crudo" "$K/capturas"
  done
  node "$H/medir.mjs" "$pg" 1440 "$W/crudo" "$K/capturas" reducido || node "$H/medir.mjs" "$pg" 1440 "$W/crudo" "$K/capturas" reducido
done

for pg in home trabajo caso estudio; do
  for an in 1440 390; do
    node "$H/capturar.mjs" "$pg" "$an" "$W/cuadros" || node "$H/capturar.mjs" "$pg" "$an" "$W/cuadros"
    python3 -I "$H/coser.py" "$W/cuadros" "$K/capturas" "$pg" "$an"
  done
done

node "$H/interaccion.mjs" "$W/crudo" "$K/capturas"
node "$H/aviso.mjs" "$W/crudo" "$K/capturas"
node "$H/movimiento.mjs" "$W/crudo" "$K/capturas"
node "$H/casos.mjs" "$W/crudo"
python3 -I "$H/pixeles.py" "$W/cuadros" "$W/crudo"
python3 -I "$H/recortes.py" "$W/cuadros" "$W/crudo" "$K/capturas"
python3 -I "$H/armar.py" "$W/crudo" "$K/medicion.json"
