// Extraído VERBATIM de /contacto/ para la maqueta V2. No modificar la lógica:
// captura UTM, honeypot y eventos de conversión ya están resueltos ahí.
(function(){
  var btn=document.querySelector('.menu-btn'),links=document.getElementById('nav-links');
  if(btn){btn.addEventListener('click',function(){
    var open=links.classList.toggle('open');
    btn.setAttribute('aria-expanded',open);
  });}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  }else{
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
  }
})();
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
(function(){
  var form=document.querySelector('.contact-form');
  if(!form) return;
  var success=document.querySelector('.form-success');
  var status=form.querySelector('.form-status');
  var btn=form.querySelector('button[type="submit"]');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    btn.disabled=true; btn.textContent='Enviando…';
    status.className='form-status';
    var consintio=!!form.elements['Consiento'] && form.elements['Consiento'].checked;
    fetch(form.action, {
      method:'POST',
      headers:{'Accept':'application/json'},
      body:new FormData(form)
    }).then(function(r){return r.json();}).then(function(data){
      if(!data.success) throw new Error(data.message||'Error');
      form.hidden=true;
      success.hidden=false;
      // El evento de conversión pasa por DOS permisos, y los dos tienen que estar: la
      // casilla del formulario (consintio) y las cookies de medición. El segundo se pregunta
      // a consent-banner.js y no se deduce de que gtag o fbq existan: gtag() existe siempre,
      // y fbq sigue existiendo en una pestaña donde se rechazó desde otra. Con la condición
      // vieja, ese Lead salía a Meta y el generate_lead a Google después del rechazo.
      //
      // Y va dentro de un try: esto corre DESPUÉS de que el envío ya salió bien. Si algo de
      // la medición fallara acá, el catch de abajo le mostraría "Algo falló al enviar" a
      // alguien cuyo mensaje sí llegó. La medición nunca puede romper el formulario.
      var hayPermiso = !!(window.__spindlelabHayPermiso && window.__spindlelabHayPermiso());
      if(consintio && hayPermiso){
        try {
          gtag('event','generate_lead',{form_id:'contacto'});
          if(window.fbq){ fbq('track','Lead',{content_name:'contacto'}); }
        } catch(e) {}
      }
    }).catch(function(){
      status.textContent='Algo falló al enviar. Escríbenos directo a hola@spindlelab.cl mientras lo revisamos.';
      status.className='form-status show err';
      btn.disabled=false; btn.textContent='Enviar →';
    });
  });
})();
