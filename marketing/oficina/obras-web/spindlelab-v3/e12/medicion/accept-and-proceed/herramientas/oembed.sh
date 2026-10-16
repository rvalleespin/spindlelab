#!/bin/sh
# Metadatos del video del hero de la home (título, duración, miniatura) por el oEmbed público de Vimeo.
# El video no se puede reproducir en el Chromium de Playwright (sin H.264); la miniatura muestra qué hay.
# Uso: sh oembed.sh <id/hash>   (ej.: 1224579728/7ee455505f)
curl -sS "https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F$1&width=1440"
