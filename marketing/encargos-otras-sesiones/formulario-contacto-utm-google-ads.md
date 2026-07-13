# Encargo: campo de origen + captura UTM en el formulario de contacto

**Para:** la sesión que mantiene `spindlelab-site/` · **De:** sesión de marketing · **Fecha:** 13 jul 2026

## Contexto

La estrategia de marketing (`marketing/estrategia-marketing-spindlelab.md` §6.4) define el criterio de éxito de la futura campaña de Google Ads como "≥2 mini-diagnósticos solicitados desde ads en 60 días, **medido con parámetro UTM + pregunta «¿cómo nos encontraste?»**". Revisé `spindlelab-site/contacto/index.html` y ninguna de las dos piezas existe todavía en el formulario.

Ramón autorizó el cambio puntual, pero no autorizó que esta sesión empuje directo a `main` (correcto — ese archivo es tu territorio). Dejo el cambio ya armado y probado (renderizado con Chromium headless, sin regresiones visuales) para que lo apliques tú.

## Qué falta agregar (dos piezas, ya verificadas)

**1. Un campo opcional "¿Cómo nos encontraste?"** — va justo después de "Qué te interesa" y antes de "Cuéntanos brevemente":

```html
<div class="field">
  <label for="f-origen">¿Cómo nos encontraste? <span class="opt">(opcional)</span></label>
  <select id="f-origen" name="Cómo nos encontró">
    <option value="">Selecciona una opción</option>
    <option>Búsqueda en Google</option>
    <option>Anuncio de Google (Ads)</option>
    <option>LinkedIn</option>
    <option>Instagram</option>
    <option>Recomendación de alguien</option>
    <option>Otro</option>
  </select>
</div>
```

**2. Tres campos ocultos para UTM**, justo antes del botón de submit:

```html
<input type="hidden" name="UTM Source" id="f-utm-source">
<input type="hidden" name="UTM Medium" id="f-utm-medium">
<input type="hidden" name="UTM Campaign" id="f-utm-campaign">
```

**3. El script que los llena**, agregado como un IIFE nuevo justo antes del bloque `(function(){ var form=document.querySelector('.contact-form'); ... form.addEventListener('submit', ...)` ya existente (no reemplaza ese bloque, va antes):

```html
<script>
(function(){
  // Captura UTM de la URL actual y los persiste en sessionStorage para que
  // sobrevivan si el visitante llega a otra página antes de completar el
  // formulario (ej. anuncio -> home -> contacto).
  var params=new URLSearchParams(window.location.search);
  ['utm_source','utm_medium','utm_campaign'].forEach(function(key){
    var val=params.get(key);
    if(val){ try{ sessionStorage.setItem(key,val); }catch(e){} }
  });
  var form=document.querySelector('.contact-form');
  if(!form) return;
  try{
    form.querySelector('#f-utm-source').value=sessionStorage.getItem('utm_source')||'';
    form.querySelector('#f-utm-medium').value=sessionStorage.getItem('utm_medium')||'';
    form.querySelector('#f-utm-campaign').value=sessionStorage.getItem('utm_campaign')||'';
  }catch(e){}
})();
</script>
```

Como Web3Forms reenvía todos los campos del `FormData` (incluidos los `hidden`), esto basta para que el email de notificación llegue con el origen del lead sin tocar nada del backend.

## Qué NO incluye este encargo (a propósito)

El tag de conversión de Google Ads (`gtag.js` + ID de conversión) **no está incluido** — no existe todavía una cuenta de Google Ads creada, y ese ID solo lo entrega la propia consola de Ads al crear la acción de conversión. Es un paso 100% de Ramón (crear la cuenta), y recién después hay algo real que pegar en el sitio. Cuando exista, avisen y coordino el fragmento exacto.

## Verificación ya hecha

Renderizado con `chromium --headless` sirviendo el sitio localmente (`python3 -m http.server`), con `?utm_source=google&utm_medium=cpc&utm_campaign=auditoria-seo` en la URL — el campo nuevo se ve integrado sin romper el layout del formulario, y la lógica de `sessionStorage` es estándar (misma técnica usada en cualquier tracking de UTM cross-page). No se verificó el envío real a Web3Forms end-to-end (eso requeriría un submit real).
