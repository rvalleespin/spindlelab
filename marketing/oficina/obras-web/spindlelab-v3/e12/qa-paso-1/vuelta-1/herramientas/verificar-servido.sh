#!/usr/bin/env bash
# QA E12 paso 1, vuelta 1 (Javiera) · vuelve a leer, en lo servido hoy, las etiquetas del inventario que se pueden
# comprobar desde afuera. No guarda HTML de Combeau (trae sus datos de contacto): solo las líneas que prueban algo.
# Uso: bash verificar-servido.sh > ../crudo/verificar-servido.txt
set -u
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
T=$(mktemp -d)
echo "# $(date -u +%FT%TZ)"
echo "## bernardocombeau.cl"
curl -sS -A "$UA" -D "$T/h" -o "$T/p" https://bernardocombeau.cl/
grep -i '^server\|^x-nf-request-id' "$T/h" | sed 's/x-nf-request-id: .*/x-nf-request-id: (presente)/'
grep -o '<meta name="generator"[^>]*>' "$T/p"
echo "rutas /.netlify/images distintas en la portada: $(grep -o '/.netlify/images[^"]*' "$T/p" | sort -u | wc -l)"
echo "h1 servido: $(grep -o '<h1[^>]*>.\{0,200\}</h1>' "$T/p")"
echo "admin: $(curl -sS -A "$UA" https://bernardocombeau.cl/admin/ | grep -o 'decap-cms@[0-9.]*' | head -1)"
echo "api/auth: $(curl -sS -A "$UA" -o /dev/null -w '%{http_code} %{redirect_url}' https://bernardocombeau.cl/api/auth | sed 's/?.*//')"
echo "beto3 original: $(curl -sS -A "$UA" -o /dev/null -w '%{http_code} %{size_download} B %{content_type}' https://bernardocombeau.cl/uploads/beto3.jpg)"
echo "beto3 por el CDN (828 px): $(curl -sS -A "$UA" -H 'Accept: image/webp,image/*' -o /dev/null -w '%{http_code} %{size_download} B %{content_type}' 'https://bernardocombeau.cl/.netlify/images?url=/uploads/beto3.jpg&w=828&h=828&q=80')"
echo "## verifica.spindlelab.cl"
curl -sS -A "$UA" -D "$T/h" -o "$T/p" https://verifica.spindlelab.cl/
grep -i '^server' "$T/h"
echo "tipos JSON-LD: $(grep -o 'WebApplication\|"WebPage"\|"ProfessionalService"\|"Person"\|"FAQPage"' "$T/p" | sort -u | tr '\n' ' ')"
echo "fechas: $(grep -o 'date[A-Za-z]*": *"[0-9-]*' "$T/p" | sort -u | tr '\n' ' ')"
echo "terceros: $(grep -o 'cloudflareinsights.com/beacon.min.js\|web3forms.com/submit' "$T/p" | sort -u | tr '\n' ' ')"
echo "## spindlelab.cl"
curl -sS -A "$UA" -o "$T/p" https://spindlelab.cl/
grep -o '<meta name="generator"[^>]*>' "$T/p"
css=$(grep -o '/_astro/[^"]*\.css' "$T/p" | head -1)
echo "variables --tw- en $css: $(curl -sS "https://spindlelab.cl$css" | grep -o -- '--tw-[a-z-]*' | wc -l)"
rm -rf "$T"
